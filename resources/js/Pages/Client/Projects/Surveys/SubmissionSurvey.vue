<script setup>
import { useForm } from '@inertiajs/vue3';
import { computed, onMounted, watch, ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Pagination from '@/Components/Pagination.vue';
const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Array,
    pagee: Object,
    responses: Object,
    prevUrl: Object,
    flow: Object
});
const currentIndex = ref(0)
const totalPage = computed(()=>props.pagee.length-1)
const lastPage = computed(()=> currentIndex.value == totalPage.value)

const currentPage = computed(()=>{
    return props.pagee[currentIndex.value]
})
const project = props.projects[0];
const client = props.clients[0];
// // LocalStorage key for saving form state
// const storageKey = `survey_${props.surveys.id}_${pages.id}`;
const form = useForm({
    page: props.pagee.map((page) => ({
        page_id: page.id,
        flow: page.flow ?? null,
        order: page.order,
        back: null,
        question: page.question,
        answer: page.question.sort((a,b)=> a.order-b.order).map(() => ({
            texts: '',
            radios: [],
            checkboxes: [],
        }))
    })),
    project_slug: project['slug'],
    client_slug: client['slug'],
    // resId: props.responses 
});
const flow =computed(()=> form.page[currentIndex.value].flow.find(p=> p.question_page_id == form.page[currentIndex.value].page_id || p.next_page_order == form.page[currentIndex.value].order) ?? null) 

let backOrder = null 
let logic = null

function nextPage(){
    if(flow.value && form.page[currentIndex.value].answer.some(a=> a.radios == flow.value.question_choice_id)){
            backOrder = flow.value.current_page_order
            currentIndex.value += flow.value.next_page_order - (1 + currentIndex.value);
            form.page[currentIndex.value].back = backOrder;
            logic = currentIndex.value
    } else {
        if(backOrder && logic != currentIndex.value){
            form.page[logic].back = null 
        }
        currentIndex.value++;
    }
}
function prevPage(){
    if(form.page[currentIndex.value].back){
        currentIndex.value = form.page[currentIndex.value].back-1
    }else{
        currentIndex.value--;
    }
}

const submit = () => {
    form.post(route('submit_survey', [form.client_slug, form.project_slug, props.surveys.id]), {
        preserveState: true,
        onSuccess: () => {
            localStorage.clear()
        }
    });
};

</script>

<template>
    <AppLayout title="Isi Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="" >
                    <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md select-none">
                        <h2>{{currentPage.id + '.' + currentPage.page_name }}</h2>
                    </div>
                    <div class="bg-white rounded-b-md">
                        <div class="border-b-2 p-5 border-gray-500">
                            <p class="text-base text-justify select-none">{{ props.surveys.desc }}</p>
                        </div>
                        <div class="p-5 flex w-full">
                            <form @submit.prevent="submit" class="w-full">
                                <div v-for="(question, index) in currentPage.question" :key="index" class="block mb-4">
                                    <p>{{ index + 1 }}. <label>{{ question.question_text }}</label></p>

                                    <!-- Handling radio inputs for question type 2 -->
                                    <div v-if="question.question_type_id == 2">
                                        <div v-for="(list, i) in question.choice" :key="i">
                                            <input v-if="list.question_id === question.id" type="radio"
                                                :id="'qradio' + (list.question_id) + '-option' + (i + 1)"
                                                :value="list.id" v-model="form.page[currentIndex].answer[index].radios" />
                                            <label v-if="list.question_id === question.id" class="px-3"
                                                :for="'qradio' + (list.question_id) + '-option' + (i + 1)">
                                                {{ list.value }}
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Handling checkbox for question type 3 -->
                                    <div v-if="question.question_type_id == 3">
                                        <div v-for="(list, i) in question.choice" :key="i">
                                            <input v-if="list.question_id === question.id" type="checkbox"
                                                :id="'qcheck' + (list.question_id) + '-option' + (i + 1)"
                                                :value="list.id" v-model="form.page[currentIndex].answer[index].checkboxes" />
                                            <label class="px-3"
                                                :for="'qcheck' + (list.question_id) + '-option' + (i + 1)">
                                                {{ list.value }}
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Handling textarea for question type 1 -->
                                    <div v-if="question.question_type_id == 1">
                                        <textarea title="Answer" placeholder="Jawaban open-ended" class="w-full h-20"
                                            v-model="form.page[currentIndex].answer[index].texts" />
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <button v-if="currentIndex > 0" class="border-2 border-primary px-3 py-2" type="button" @click="prevPage">previous</button>
                                    <button @click="nextPage" type="button" class="border-2 border-primary px-3 py-2" v-if="!lastPage">Next</button>

                                   <PrimaryButton class="flex justify-center md:mb-6 text-center" v-if="lastPage" :class="{ 'opacity-25': form.processing }":disabled="form.processing">
                                       Submit Survey
                                    </PrimaryButton>
                                    <!-- <Pagination class="flex justify-center md:mb-6 text-center" :links="{prev_page_url: urlPrev, next_page_url: nextPage}" /> -->
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>