<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { Text } from 'vue';
import Checkbox from '@/Components/Checkbox.vue';
// import Link from '@inertiajs/vue3';
const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Array,
    pagee:Object
});

const project = props.projects[0];
const client = props.clients[0];

// Initialize the form using useForm
const form = useForm({
    page: props.page.map((page) => ({
        question: page.question,
        answer: page.question.map(() => ({
            texts : '',
            radios: [],
            checkboxes: [],
        }))
    })),
    project_slug: project['slug'],
    client_slug: client['slug'],
});

// Submit handler for the form
const submit = () => {
    form.post(route('submit_survey', [form.client_slug, form.project_slug, props.surveys.id]), { preserveState: true });
};
    console.log(props.pagee)
</script>

<template>
    <AppLayout title="Isi Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class=""v-for="(page, ind) in pagee.data" :key="ind">
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
                                                    :value="list.value" v-model="form.page[ind].answer[index].radios" />
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
                                                    :value="list.value" v-model="form.page[ind].answer[index].checkboxes" />
                                                <label class="px-3" :for="'qcheck' + (list.question_id) + '-option' + (i + 1)">
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
                                    <a type="button" v-if="pagee.prev_page_url != null" class="inline-flex items-center rounded-md px-5 bg-secondary py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ijo-terang focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition flex justify-center md:mb-6 text-center" :href="pagee.prev_page_url">Previous</a>
                                    
                                    <PrimaryButton class="flex justify-center md:mb-6 text-center" v-if="pagee.next_page_url == null"
                                        :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                        Submit Survey
                                    </PrimaryButton>

                                    <a type="button" class="inline-flex items-center rounded-md px-5 bg-secondary py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ijo-terang focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition flex justify-center md:mb-6 text-center" v-if="pagee.next_page_url != null" :href="pagee.next_page_url">
                                        Next
                                    </a>
                                <!-- Display answers for debugging -->
                                <!-- <pre>{{ form.answer }}</pre> -->
    
                                <!-- Submit Button -->
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
