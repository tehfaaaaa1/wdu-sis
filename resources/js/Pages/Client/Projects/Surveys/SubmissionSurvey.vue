<script setup>
import { ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    listquestion: Object,
    totalrespon: Object,
    choice:Object
});
const project = props.projects[0]
const client = props.clients[0]

// Initialize the answers array
const answers = ref([]);

// Initialize the form using useForm
const form = useForm({
    answer: [],    
    question: props.listquestion,
    project_slug: project['slug'],
    client_slug: client['slug'],
});

// On component mount, initialize the answers array based on the listquestion prop
onMounted(() => {
    answers.value = props.listquestion.map(() => ({
        jawaban: [] // Initialize based on question type
    }));
});

// Submit handler for the form
const submit = () => {
    form.post(route('submit_survey', [form.client_slug, form.project_slug, props.surveys.id]));
};
console.log(props.listquestion)
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
                            <div class="">
                            </div>
                            <div v-for="(question, index) in listquestion" :key="index">
                                <div class="block">
                                    <p>{{ index + 1 }}. <label>{{ question.question_text }}</label></p>

                                    <!-- Handling radio inputs for question type 2 -->
                                    <div v-if="question.question_type_id == 2">
                                        <div v-for="(list, i) in question.choice" :key="i">
                                            <input v-if="list.question_id === question.id" type="radio"
                                                :id="'option' + (i + 1)" :value="list.value" 
                                                :name="`question-${question.id}`" v-model="form.answer[index]" />
                                            <label v-if="list.question_id === question.id" class="px-3"
                                                :for="'option' + (i + 1)">
                                                {{ list.value }}
                                            </label>
                                        </div>
                                    </div>


                                    <div v-if="question.question_type_id == 3">
                                        <div v-for="(list, i) in question.choice" :key="i">
                                            <input v-if="list.question_id === question.id" type="checkbox"
                                                :id="'option' + (i + 1)" :true-value="list.value "
                                                :name="`question-${question.id}` + (i + 1)" v-model="form.answer[list.id]" />
                                            <label v-if="list.question_id === question.id" class="px-3"
                                                :for="'option' + (i + 1)">
                                                {{ list.value }}
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Handling textarea for question type 1 -->
                                    <div v-if="question.question_type_id == 1">
                                        <!-- Conditional rendering to ensure v-model only binds when the value exists -->
                                        <textarea title="Answer" placeholder="Jawaban open-ended" class="text-sm"
                                            v-model="form.answer[index]" />
                                    </div>
                                </div>
                            </div>

                            <!-- Display answers for debugging -->
                            <!-- <pre>{{ form.answer }}</pre> -->

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
