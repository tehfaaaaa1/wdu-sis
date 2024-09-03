<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import { VueDraggable } from 'vue-draggable-plus';

const props = defineProps({ surveys: Object, projects: Object, clients: Object })
const project = props.projects[0];
const client = props.clients[0];
const MAX_RADIO_CHOICES = 5;

// Note: Customize the functions below if needed
const questions = ref([{ id: 1, soal: '', texts: [], radios: [], checkbox: [], types: [], required: 0 }]);
const questionsType = ref([
    { types: 'Text', name: 'Text', texts: '' },
    { types: 'Radio', name: 'Single Choice', radios: '' },
    { types: 'Checkbox', name: 'Multiple Choice', checkbox: '' },
    { types: 'Radio', name: 'Yes / No', radios: '' },
]);

function clone(element) {
    const len = questions.value.length + 1;
    let texts = []
    let radios = []
    let checkbox = []
    let required = 0
    switch (element.name) {
        case 'Text':
            texts = [{ isi: '' }]
            break;
        case 'Single Choice':
            radios = [{ pilih: '' }]
            break;
        case 'Yes / No':
            radios = [{ pilih: 'Yes' }, { pilih: 'No' }]
            break;
        case 'Multiple Choice':
            checkbox = [{ pilih: '' }]
            break;

        default:
            break;
    }
    return {
        id: len, soal: '', texts: texts, radios: radios, checkbox: checkbox, types: [element.types], required
    };
}

// Log Update
// const logUpdate = (newQuestions) => {
//     console.log('Questions updated:', JSON.stringify(newQuestions, null, 2));
// };

// Text
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

// Radio
function radioQuestion(question) {
    if (question.types.length > 0 && !question.types.includes('Radio')) {
        // Clear previous type and data if it isn't Text
        clearQuestionType(question);
    }
    if (!question.types.includes('Radio')) {
        const radio = { pilih: '' };
        question.radios.push(radio);
        question.types.push('Radio'); // Track the type

        question.lastRadioIndex = question.radios.length - 1; // update radio index
    }
}

function AddRadioOption(question) {
    const radio = { pilih: '' };
    question.radios.push(radio);
    question.types.push('Radio'); // Track the type

    question.lastRadioIndex = question.radios.length - 1;
}

function deleteRadio(question) {
    if (question.lastRadioIndex >= 1) {
        question.radios.splice(question, 1)
        question.lastRadioIndex = question.radios.length - 1; // update radio index
    }
}

// Checkbox
function checkboxQuestion(question) {
    if (question.types.length > 0 && !question.types.includes('Checkbox')) {
        // Clear previous type and data if it isn't Text
        clearQuestionType(question);
    }
    if (!question.types.includes('Checkbox')) {
        const checkbox = { pilih: '' };
        question.checkbox.push(checkbox);
        question.types.push('Checkbox'); // Track the type

        question.lastCheckboxIndex = question.checkbox.length - 1; // update radio index
    }
}

function AddCheckboxOption(question) {
    const checkbox = { pilih: '' };
    question.checkbox.push(checkbox);
    question.types.push('Checkbox'); // Track the type

    question.lastCheckboxIndex = question.checkbox.length - 1;
}

function deleteCheckbox(question) {
    if (question.lastCheckboxIndex >= 1) {
        question.checkbox.splice(question, 1)
        question.lastCheckboxIndex = question.checkbox.length - 1; // update radio index
    }
}

function clearQuestionType(question) {
    // Clear the existing type and its associated data
    if (question.types.includes('Text')) {
        question.texts = [];  // Clear text data
    } else if (question.types.includes('Radio')) {
        question.radios = [];  // Clear choice data
    } else if (question.types.includes('Checkbox')) {
        question.checkbox = [];  // Clear choice data
    }

    // Clear the type
    question.types = [];
}

function isTypeAdded(question, type) {
    return question.types.includes(type);
}

function remove(index) {
    questions.value.splice(index, 1);
}

const form = useForm({
    project_slug: project['slug'],
    client_slug: client['slug'],
});

const submit = () => {
    form.transform(() => ({
        data: questions.value,
        survey: props.surveys.id,
        project_slug: project['slug'],
        client_slug: client['slug'],
    })).post(route('question_store', [props.surveys.id, form.client_slug, form.project_slug]), { preserveState: true });
};

</script>

<template>
    <AppLayout title="Tambah Pertanyaan Survey">

        <main class="min-h-screen relative">
            <aside class="sticky bg-gray-200 min-h-full top-0 z-50">
                <div class="absolute lg:w-1/5">
                    <h1 class="bg-white text-center text-lg font-semibold py-2.5 border-b-2 border-ijo-terang">Add
                        Questions
                    </h1>
                    <VueDraggable v-model="questionsType" :group="{ name: 'questions', pull: 'clone', put: false }"
                        :animation="150" :clone="clone" :sort="false" class="list-qtype">
                        <div v-for="item in questionsType" :key="item.types" class="list-qtype-item bg-white border-b border-gray-300 py-2 px-4 flex justify-between
                            items-center cursor-pointer">
                            <span>{{ item.name }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </VueDraggable>
                </div>
            </aside>
            <div class="mx-auto lg:max-w-2xl xl:max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>{{ props.surveys.title }}</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="p-5 border-gray-300">
                        <p class="text-base text-justify line-clamp-3">
                            {{ props.surveys.desc }}
                        </p>
                        <h2 class="mt-3 pt-3 border-t-2 border-gray-300 text-center font-medium text-xl">Tambah
                            Pertanyaan</h2>
                    </div>
                    <form action="" @submit.prevent=submit>
                        <VueDraggable v-model="questions" group="questions" @update:modelValue="logUpdate"
                            :animation="150" class="list-questions" handle=".handle">
                            <div v-for="(item, index) in questions" :key="item.id" class="list-questions-item">
                                <div class="p-5 gap-2 flex items-center">
                                    <!-- Order of question -->
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="size-10 cursor-move handle border-2 rounded-md border-gray-800">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>

                                    <p class="ml-2">{{ index + 1 }}.</p>

                                    <!-- Insert question here -->
                                    <input v-model="item.soal" type="text" placeholder="Insert question here"
                                        class="text-sm w-full mx-1 rounded-md">

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
                                            <div @click="textQuestion(item)"
                                                class="block px-4 py-2 text-sm cursor-pointer">
                                                Text
                                            </div>
                                            <div @click="radioQuestion(item)"
                                                class="block px-4 py-2 text-sm cursor-pointer">
                                                Single Choice
                                            </div>
                                            <div @click="checkboxQuestion(item)"
                                                class="block px-4 py-2 text-sm cursor-pointer">
                                                Multiple Choice
                                            </div>
                                            <div class="block border-t border-gray-300 py-2 text-center">
                                                <input type="checkbox" v-model="item.required" true-value="1"
                                                    false-value="0" :id="'q' + index + '-required'" class="cursor-pointer">
                                                <label :for="'q' + index + '-required'"
                                                    class="pl-2 cursor-pointer select-none w-full">Required</label>
                                            </div>
                                        </template>
                                    </Dropdown>
                                    <!-- delete question -->
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" @click="remove(index)"
                                        class="size-10 text-red-600 cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>

                                <!-- Required notification -->
                                <div v-if="item.required == 1" class="px-5 mb-2 text-red-500">* Required</div>

                                <!-- Question Choices -->
                                <!-- text -->
                                <div class="px-5" v-for="(text, index) in item.texts" :key="index">
                                    <textarea v-model="text.isi" :name="'text-' + item.id" :id="'text-' + item.id"
                                        placeholder="Jawaban" class="w-full text-sm rounded-md bg-gray-200" disabled />
                                </div>

                                <!-- single choice -->
                                <div class="px-5" v-for="(radio, index) in item.radios" :key="index">
                                    <div class="flex items-center mb-2">
                                        <span class="select-none">O</span>
                                        <input type="text" v-model="radio.pilih" :name="'radio-' + item.id"
                                            :id="'radio' + (index + 1) + '-q' + (item.id)"
                                            placeholder="Insert single choice here"
                                            class="text-sm mx-4 rounded-md block w-1/4">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="size-6 text-red-600 cursor-pointer"
                                            @click="deleteRadio(item, index)">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                    </div>
                                    <div class="ml-7"
                                        v-if="index === item.radios.length - 1 && item.radios.length < MAX_RADIO_CHOICES">
                                        <a class="w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer"
                                            @click="AddRadioOption(item)">
                                            Add Options
                                        </a>
                                    </div>
                                </div>

                                <!-- multiple choice -->
                                <div class="px-5" v-for="(checkbox, index) in item.checkbox" :key="index">
                                    <div class="flex items-center mb-2">
                                        <span class="select-none">&#9634;</span>
                                        <input type="text" v-model="checkbox.pilih" :name="'checkbox-' + item.id"
                                            :id="'checkbox' + (index + 1) + '-q' + (item.id)"
                                            placeholder="Insert multiple choice here"
                                            class="text-sm mx-4 rounded-md block w-1/4">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="size-6 text-red-600 cursor-pointer"
                                            @click="deleteCheckbox(item, index)">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                    </div>
                                    <div class="ml-7"
                                        v-if="index === item.checkbox.length - 1 && item.checkbox.length < MAX_RADIO_CHOICES">
                                        <a class="w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer"
                                            @click="AddCheckboxOption(item)">
                                            Add Options
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </VueDraggable>
                        
                        <div class="border-b-2 border-gray-300 mt-6" />
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