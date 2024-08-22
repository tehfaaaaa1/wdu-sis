<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

const props = defineProps({ surveys: Object, projects: Object, clients:Object})
const project = props.projects[0];
const client = props.clients[0];

// Note: Customize the functions below if needed
const questions = ref([{ id: 1, soal: '', texts: [], radios: [], types: [] }])
const radios = ref([])
const texts = ref([])

function addQuestion() {
    questions.value.push({ id: questions.value.length + 1, soal: '', texts: [], radios: [], types: [] });
}

function textQuestion(question) {
    if (question.types.length > 0 && !question.types.includes('Text')) {
        // Clear previous type and data if it isn't Text
        clearQuestionType(question);
    }
    if (!question.types.includes('Text')) {
        const text = { isi: '' };
        question.texts.push(text);
        question.types.push('Text');
    }
}

function radioQuestion(question) {
    if (question.types.length > 0 && !question.types.includes('Radio')) {
        // Clear previous type and data if it isn't Text
        clearQuestionType(question);
    }
    if (!question.types.includes('Radio')) {
        const radio = { pilih: '' };
        question.radios.push(radio);
        question.types.push('Radio'); // Track the type
    }
}

function clearQuestionType(question) {
    // Clear the existing type and its associated data
    if (question.types.includes('Text')) {
        question.texts = [];  // Clear text data
    } else if (question.types.includes('Radio')) {
        question.radios = [];  // Clear choice data
    }

    // Clear the type
    question.types = [];
}

function isTypeAdded(question, type) {
    return question.types.includes(type);
}


const form = useForm({
    question_text: questions.value,
    project_slug: project['slug'],
    client_slug: client['slug'],
});

const submit = () => {
    form.post(route('question_store' ,[props.surveys.id ,form.client_slug, form.project_slug]));
};

console.log(form.question_text)
</script>

<template>
    <AppLayout title="Isi Survey">

        <main class="min-h-screen ">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>{{ props.surveys.title }}</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-300">
                        <p class="text-base text-justify line-clamp-3">
                            {{ props.surveys.desc }}
                        </p>
                    </div>
                    <form action="" @submit.prevent =submit >
                        <div id="questions" v-for="question in questions" > <!-- v-for here -->
                            <div>
                                <div class="p-5 flex items-center">
                                    <!-- Order of question -->
                                    <p>{{ question.id }}</p>
    
                                    <!-- Insert text here -->
                                    <input v-model="question.soal" type="text" placeholder="Insert question here"
                                        class="text-sm w-full mx-4 rounded-md">

                                <!-- Insert text here -->
                                <input v-model="question.soal" type="text" placeholder="Insert question here"
                                    class="text-sm w-full mx-4 rounded-md">

                                <!-- Question types -->
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <button type="button"
                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                                            Question Type
                                            <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </template>

                                    <template #content>
                                        <div @click="textQuestion(question)"
                                            class="block px-4 py-2 text-sm cursor-pointer">
                                            Text
                                        </div>
                                        <div @click="radioQuestion(question)"
                                            class="block px-4 py-2 text-sm cursor-pointer">
                                            Single Choice
                                        </div>
                                        <div class="block px-4 py-2 text-sm cursor-pointer">
                                            Multiple Choice
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>

                            <!-- text -->
                            <div class="px-5" v-for="(text, index) in question.texts" :key="index">
                                <textarea v-model="text.isi" :name="'text-' + question.id" :id="'text-' + question.id"
                                    placeholder="Jawaban" class="w-full text-sm rounded-md bg-gray-200" disabled />
                            </div>
                            <!-- single choice -->
                            <div class="px-5" v-for="(radio, index) in question.radios" :key="index">
                                <div class="flex items-center mb-2">
                                    &#x2022;
                                    <input type="text" v-model="radio.pilih" :name="'radio-' + question.id"
                                        :id="'radio-' + question.id" placeholder="Insert single choice here"
                                        class="text-sm mx-4 rounded-md block w-1/4">
                                </div>
                            </div>
                            </div>
                        </div>
                        <!-- End question -->

                        <div class="pt-2 flex justify-center">
                            <a
                                class="w-1/4 mb-10 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200"
                                @click="addQuestion">
                                Add Questions
                            </a>
                        </div>
                        <div class="border-b-2 border-gray-300" />
                        <div class="pt-5 flex justify-center">
                            <PrimaryButton class="flex justify-center w-1/4 md:mb-10"
                                :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                Submit Questions
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </AppLayout>
</template>