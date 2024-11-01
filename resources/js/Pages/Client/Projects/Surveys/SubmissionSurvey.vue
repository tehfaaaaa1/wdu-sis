<script setup>
import { useForm } from '@inertiajs/vue3';
import { computed, ref, watch, onMounted } from 'vue';
import { Head } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { debounce } from 'lodash';
import DialogModal from '@/Components/DialogModal.vue';
const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Array,
    pagee: Object,
    responses: Object,
    prevUrl: Object,
    flow: Object,
});
const currentIndex = ref(0)
const totalPage = computed(() => props.pagee.length - 1)
const lastPage = computed(() => currentIndex.value == totalPage.value)

const currentPage = computed(() => {
    return props.pagee[currentIndex.value]
})
const project = props.projects[0];
const client = props.clients[0];
// LocalStorage key for saving form state
const storageKey = `survey_id_${props.surveys.id}`;
const form = useForm({
    page: props.pagee.map((page) => ({
        page_id: page.id,
        page_name: page.page_name,
        flow: page.flow ?? null,
        order: page.order,
        back: null,
        question: page.question,
        answer: page.question.sort((a, b) => a.order - b.order).map(() => ({
            texts: '',
            radios: [],
            checkboxes: [],
        }))
    })),
    project_slug: project['slug'],
    client_slug: client['slug'],
});

const flow = computed(() => 
form.page[currentIndex.value].flow.find(p => p.current_page_id == form.page[currentIndex.value].page_id ?? null))

function nextPage() {
    if(flow.value){
        let nextpage = form.page.find(p=> p.page_id == flow.value.next_page_id)
        if(flow.value.question_id && form.page[currentIndex.value].answer.some(a => a.radios == flow.value.question_choice_id)){
            nextpage.back = currentIndex.value
            currentIndex.value = nextpage.order -1
            console.log(nextpage)
        } else{ 
            nextpage.back = null
            currentIndex.value ++;
        }
    } else{
        currentIndex.value ++;
    }      
}
function prevPage() {
    if (form.page[currentIndex.value].back != null) {
        currentIndex.value = form.page[currentIndex.value].back
    } else {
        currentIndex.value--;
    }
}

const formClosed = ref()
onMounted(() => {
    const savedForm = localStorage.getItem(storageKey);
    if (savedForm) {
        form.page = JSON.parse(savedForm);
    }
    let showhideQ = currentPage.value.question
    showhideQ.forEach(function (element, index) {
        if (form.page[currentIndex.value].answer.some(a => a.radios == element.question_choice_id)) {
            if (element.question_logic_type_id == 2) {
                element.question_logic_type_id = 3
            } else if (element.question_logic_type_id == 3) {
                element.question_logic_type_id = 2
            }
        } else if (form.page[currentIndex.value].answer.some(a => a.radios == element.question_choice_id)) {
            let ps = props.page[currentIndex.value].question.find(q => q.id == element.id)
            element.question_logic_type_id = ps.logic_type
        }
    });

    window.Echo.private(`survey.${props.surveys.id}`).listen('.formClosed', (e) => {
        if(e.survey.status ==0){
            formClosed.value = true;
        } else {
            formClosed.value = false
        }
    });
    if(props.surveys.status == 0){
        formClosed.value = true
    }
});
watch(() => form.page,
    debounce((newVal) => {
        localStorage.setItem(storageKey, JSON.stringify(newVal));
    }, 300),
    { deep: true }
);

const submit = () => {
    form.post(route('submit_survey', [form.client_slug, form.project_slug, props.surveys.id]), {
        preserveState: true,
        onSuccess: () => {
            localStorage.removeItem(storageKey)
        }
    });
};
const showhide = (pgindex, qindex, value) => {
    const currentQuestions = currentPage.value.question;
    const currentQuestion = currentQuestions[qindex];

    // Helper function to reset answers based on question type
    const resetAnswer = (element, index) => {
        if (element.question_type_id === 1) {
            form.page[pgindex].answer[index].texts = '';
        } else if (element.question_type_id === 2) {
            form.page[pgindex].answer[index].radios = [];
        } else if (element.question_type_id === 3) {
            form.page[pgindex].answer[index].checkboxes = [];
        }
    };

    // Recursive function to reset answers for all child questions (only downward)
    const resetChildAnswers = (parentQuestion) => {
        currentQuestions.forEach((element, index) => {
            if (parentQuestion.choice.some(c => c.id === element.question_choice_id)) {
                resetAnswer(element, index);
                // Recursively reset child answers of the current child
                resetChildAnswers(element);  // Only flow downward to children
            }
        });
    };

    // Main logic to show/hide questions and reset answers
    currentQuestions.forEach((element, index) => {
        if (value === element.question_choice_id) {
            // Show the question
            if (element.question_logic_type_id === 2) {
                element.question_logic_type_id = 1;
            }
            // Hide the question
            else if (element.question_logic_type_id === 3) {
                element.question_logic_type_id = 2;
            }
        } else if (value !== element.question_choice_id && element.id !== currentQuestion.id) {
            const matchedQuestion = currentQuestions.find(que =>
                que.choice.some(c => c.id === currentQuestion.question_choice_id)
            ) || false;

            const parentQuestion = matchedQuestion ? currentQuestions.find(quee =>
                quee.choice.some(c => c.id === matchedQuestion.question_choice_id)
            ) : null;

            // Identify only children and descendants
            const team = matchedQuestion ? currentQuestions.filter(qq => qq.id != currentQuestion.id &&
                matchedQuestion.choice.some(cc => cc.id === qq.question_choice_id)
            ) : [];

            const originalQuestion = props.page[currentIndex.value].question.find(q => q.id === element.id);

            const s = team ? currentQuestions.filter(p => team.some(t => t.choice.some(c => c.id == p.question_choice_id))) : null
            // Ensure no change to any ancestors (only affect children)
            if (
                currentQuestion.question_choice_id !== element.question_choice_id &&
                matchedQuestion?.question_choice_id !== element.question_choice_id &&
                !team.some(t => t.question_choice_id === element.question_choice_id) && // Fix here: ensure no child shares same question_choice_id
                parentQuestion?.question_choice_id !== element.question_choice_id &&
                !s.some(ss => ss.question_choice_id === element.question_choice_id)
            ) {
                console.log(matchedQuestion, element, team, parentQuestion, s);
                element.question_logic_type_id = originalQuestion.logic_type;
            }

            // Only reset descendants (not siblings or parents)
            if (currentQuestion.choice.some(c => c.id === element.question_choice_id)) {
                resetAnswer(element, index);
                // Reset child questions recursively (downward flow only)
                resetChildAnswers(element);
            }
        }
    });
};
</script>

<template>

    <Head :title="'Isi Survey'" />
    <div class="min-h-screen bg-gray-300">
        <DialogModal :show="formClosed">
            <template #title>
                <div class="text-center">
                    PEMBERITAHUAN
                </div>
            </template>

            <template #content>
                <div class="border border-gray-300 p-4">
                    FORM TELAH DITUTUP
                </div>
            </template>

            <template #footer>
                <div class="flex items-center justify-between w-full">
                    <a :href="route('listsurvey', [client.slug, project.slug])"
                        class="inline-flex items-center rounded-md px-5 py-2 bg-red-500 text-sm mr-3 font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition">
                        Back
                    </a>
                </div>
            </template>
        </DialogModal>
        <main class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="bg-primary text-white rounded-t-md select-none py-1.5" />
            <div class="bg-white rounded-b-md">
                <h2 class="text-center text-xl font-semibold py-4 border-b border-gray-400">
                    {{ currentPage.page_name }}</h2>

                <form @submit.prevent="submit" class="w-full">
                    <div class="p-5 pb-1">
                        <div v-for="(question, qIndex) in currentPage.question" :key="qIndex" class="mb-4">
                            <div v-if="(question.question_type_id <= 3 || question.question_type_id == 6) && question.question_logic_type_id != 2 ">
                                <label v-html="question.question_text" class="output"></label>

                                <!-- Handling radio inputs for question type 2 -->
                                <div v-if="(question.question_type_id == 2  || question.question_type_id == 6) && question.question_logic_type_id != 2">
                                    <div v-for="(list, i) in question.choice" :key="i">
                                        <input v-if="list.question_id === question.id" type="radio"
                                            :id="'qradio' + (list.question_id) + '-option' + (i + 1)" :value="list.id"
                                            @input="showhide(currentIndex, qIndex, list.id)"
                                            v-model="form.page[currentIndex].answer[qIndex].radios" />
                                        <label v-if="list.question_id === question.id" class="px-3"
                                            :for="'qradio' + (list.question_id) + '-option' + (i + 1)">
                                            {{ list.value }}
                                        </label>
                                    </div>
                                </div>

                                <!-- Handling checkbox for question type 3 -->
                                <div v-if="question.question_type_id == 3 && question.question_logic_type_id != 2">
                                    <div v-for="(list, i) in question.choice" :key="i">
                                        <input v-if="list.question_id === question.id" type="checkbox"
                                            :id="'qcheck' + (list.question_id) + '-option' + (i + 1)" :value="list.id"
                                            v-model="form.page[currentIndex].answer[qIndex].checkboxes" />
                                        <label class="px-3" :for="'qcheck' + (list.question_id) + '-option' + (i + 1)">
                                            {{ list.value }}
                                        </label>
                                    </div>
                                </div>

                                <!-- Handling textarea for question type 1 -->
                                <div v-if="question.question_type_id == 1 && question.question_logic_type_id != 2">
                                    <textarea title="Answer" placeholder="Jawaban open-ended" class="w-full h-20"
                                        v-model="form.page[currentIndex].answer[qIndex].texts" />
                                </div>

                            </div>

                            <!-- Handling Descriptions -->
                            <div v-if="question.question_type_id == 4">
                                <img :src="'/img/' + question.question_text" 
                                style="max-width: 500px; max-height: 300px; width: auto; height: auto; display: block; margin: 0 auto;" 
                                alt="Image" />
                            </div>

                            <div v-html="question.question_text" class="output" v-if="question.question_type_id == 5">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center border-t border-gray-400 py-4 px-5">
                        <button v-if="currentIndex > 0" class="border-2 border-primary px-3 py-2 text-sm" type="button"
                            @click="prevPage">Previous</button>
                        <button @click="nextPage" type="button" class="border-2 border-primary px-3 py-2 text-sm"
                            v-if="!lastPage">Next</button>

                        <PrimaryButton class="flex justify-center text-center" v-if="lastPage"
                            :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Submit Survey
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<style>
@import url('/resources/css/quill-overwrite.css');

.ql-align-center {
    text-align: center;
}

.ql-align-right {
    text-align: right;
}

.ql-align-justify {
    text-align: justify;
}
</style>