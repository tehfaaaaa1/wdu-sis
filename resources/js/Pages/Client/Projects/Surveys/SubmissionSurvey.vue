<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    listquestion: Array,
    totalrespon: Number,
});

const project = props.projects[0];
const client = props.clients[0];

// Initialize the form using useForm
const form = useForm({
    answer: props.listquestion.map(() => ({
        texts: '',
        radios: '',
        checkboxes: []
    })),
    question: props.listquestion,
    project_slug: project['slug'],
    client_slug: client['slug'],
});

// Submit handler for the form
const submit = () => {
    form.post(route('submit_survey', [form.client_slug, form.project_slug, props.surveys.id]));
};

console.log(props.listquestion);
</script>

<template>
    <AppLayout title="Isi Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>{{ props.surveys.title }}</h2>
                    <div class="">
                        {{ props.totalrespon }}
                    </div>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-500">
                        <p class="text-base text-justify line-clamp-3">{{ props.surveys.desc }}</p>
                    </div>
                    <div class="p-5 flex w-full">
                        <form @submit.prevent="submit">
                            <div v-for="(question, index) in props.listquestion" :key="index" class="block mb-4">
                                <p>{{ index + 1 }}. <label>{{ question.question_text }}</label></p>

                                <!-- Handling radio inputs for question type 2 -->
                                <div v-if="question.question_type_id == 2">
                                    <div v-for="(list, i) in question.choice" :key="i">
                                        <input v-if="list.question_id === question.id" type="radio"
                                            :id="'qradio' + (list.question_id) + '-option' + (i + 1)"
                                            :value="list.value" v-model="form.answer[index].radios" />
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
                                            :value="list.value"
                                            v-model="form.answer[index].checkboxes" />
                                        <label class="px-3"
                                            :for="'qcheck' + (list.question_id) + '-option' + (i + 1)">
                                            {{ list.value }}
                                        </label>
                                    </div>
                                </div>

                                <!-- Handling textarea for question type 1 -->
                                <div v-if="question.question_type_id == 1">
                                    <textarea title="Answer" placeholder="Jawaban open-ended" class="text-sm"
                                        v-model="form.answer[index].texts" />
                                </div>
                            </div>

                            <!-- Display answers for debugging -->
                            <pre>{{ form.answer }}</pre>

                            <!-- Submit Button -->
                            <PrimaryButton class="flex justify-center md:mb-6 text-center"
                                :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                Submit Survey
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
