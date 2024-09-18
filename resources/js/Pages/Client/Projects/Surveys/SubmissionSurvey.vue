<script setup>
import { useForm } from '@inertiajs/vue3';
import { onMounted, watch } from 'vue';
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
    prevUrl: Object
});

const project = props.projects[0];
const client = props.clients[0];
const pages = props.page[0];
// LocalStorage key for saving form state
const storageKey = `survey_${props.surveys.id}_${pages.id}`;
const form = useForm({
    page: props.pagee.data.map((page) => ({
        page_id: page.id,
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
console.log(form.page)
let urlPrev = props.prevUrl
let nextPage = props.pagee.next_page_url ?? null
if(props.pagee.prev_page_url == null){
    urlPrev = null
}
// Restore form state from localStorage (if it exists)
onMounted(() => {
    const savedForm = localStorage.getItem(storageKey);
    if (savedForm) {
        form.page = JSON.parse(savedForm);
    }
});

// Watch for form changes and save to localStorage
watch(() => form.page, (newVal) => {
    nextPage = props.pagee.path+'?page=3'
    if(form.page.some(a=> a.answer.some(c=>c.radios == 227)) && props.pagee.next_page_url != null){
    }
    localStorage.setItem(storageKey, JSON.stringify(newVal));
}, { deep: true });

const getAllSurveyData = () => {
    const allData = [];
    // Loop through localStorage keys and gather survey-related data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`survey_${props.surveys.id}_`)) {
            const surveyData = JSON.parse(localStorage.getItem(key));
            allData.push(...surveyData);  // Combine data from all pages
        }
    }
    return allData;
};
const submit = () => {
    const allData = getAllSurveyData();

    form.page = allData;

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
                <div class="" v-for="(page, ind) in pagee.data" :key="ind">
                    <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md select-none">
                        <h2>{{ page.page_name }}</h2>
                    </div>
                    <div class="bg-white rounded-b-md">
                        <div class="border-b-2 p-5 border-gray-500">
                            <p class="text-base text-justify select-none">{{ props.surveys.desc }}</p>
                        </div>
                        <div class="p-5 flex w-full">
                            <form @submit.prevent="submit" class="w-full">
                                <div v-for="(question, index) in page.question" :key="index" class="block mb-4">
                                    <p>{{ index + 1 }}. <label>{{ question.question_text }}</label></p>

                                    <!-- Handling radio inputs for question type 2 -->
                                    <div v-if="question.question_type_id == 2">
                                        <div v-for="(list, i) in question.choice" :key="i">
                                            <input v-if="list.question_id === question.id" type="radio"
                                                :id="'qradio' + (list.question_id) + '-option' + (i + 1)"
                                                :value="list.id" v-model="form.page[ind].answer[index].radios" />
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
                                                :value="list.id" v-model="form.page[ind].answer[index].checkboxes" />
                                            <label class="px-3"
                                                :for="'qcheck' + (list.question_id) + '-option' + (i + 1)">
                                                {{ list.value }}
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Handling textarea for question type 1 -->
                                    <div v-if="question.question_type_id == 1">
                                        <textarea title="Answer" placeholder="Jawaban open-ended" class="w-full h-20"
                                            v-model="form.page[ind].answer[index].texts" />
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <Pagination class="flex justify-center md:mb-6 text-center" :links="{prev_page_url: urlPrev, next_page_url: nextPage}" />

                                    <PrimaryButton class="flex justify-center md:mb-6 text-center"
                                    v-if="pagee.next_page_url == null" :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing">
                                      Submit Survey
                                  </PrimaryButton>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
