<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import { VueDraggable } from 'vue-draggable-plus';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
import DialogModal from '@/Components/DialogModal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextEditor from '@/Components/TextEditor.vue';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Object,
    flows: Object,
    surveyall: Object
})
const project = props.projects[0];
const client = props.clients[0];
const MAX_RADIO_CHOICES = 5;
let question;
const showAddPage = ref(false)
const showDeleteModal = ref(false);
const showLogicModal = ref(false);
const openDropdown = ref(false);
const QuestionOrFlow = ref('question') // 'question' or 'flow'
// Note: Customize the functions below if needed
const pages = ref(props.page.sort((a, b) => a.order - b.order).map((page) => {
    page.question.sort((a, b) => a.order - b.order)
    question = page.question.map((item) => {
        let tipe = []
        let text = []
        let choice = []
        let files = []
        let lastCindex = ''
        switch (item.question_type_id) {
            case 1:
                tipe = ['Text']
                text = [{ isi: '' }]
                break;
            case 2:
                tipe = ['Radio']
                choice = item.choice.map((isi) => {
                    return { pilih: isi.value, cId: isi.id, c_order: isi.order }
                })
                lastCindex = choice.length - 1
                break;
            case 3:
                tipe = ['Checkbox']
                choice = item.choice.map((isi) => {
                    return { pilih: isi.value, cId: isi.id, c_order: isi.order }
                })
                lastCindex = choice.length - 1
                break;
            case 4:
                tipe = ['Image']
                files = [{ files: item.question_text }]
                break;
            case 5:
                tipe = ['Paragraph']
                break;
            default:
                break;
        }
        return { id: item.id, soal: item.question_text, order: item.order, texts: text, types: tipe, required: item.required, choices: choice, files: files, lastChoiceIndex: lastCindex }
    })
    return { id: page.id, order: page.order, name: page.page_name, question: question }
}))

if (pages.value.length == 0) {
    pages.value.push({ name: 'title', question: [] })
}

const questionsType = ref([
    { types: 'Text', name: 'Text', texts: '' },
    { types: 'Radio', name: 'Single Choice', choices: '' },
    { types: 'Checkbox', name: 'Multiple Choice', choices: '' },
    { types: 'Radio', name: 'Yes / No', choices: '' },
]);

const descType = ref([
    { types: 'Image', name: 'Image', files: '' },
    { types: 'Paragraph', name: 'Paragraph' },
])

function cloneQuestion(element) {
    let texts = []
    let choice = []
    let required = 0
    let lastCindex = ''
    switch (element.name) {
        case 'Text':
            texts = [{ isi: '' }]
            break;
        case 'Single Choice':
            choice = [{ pilih: '' }]
            lastCindex = choice.length - 1
            break;
        case 'Yes / No':
            choice = [{ pilih: 'Yes' }, { pilih: 'No' }]
            lastCindex = choice.length - 1
            break;
        case 'Multiple Choice':
            choice = [{ pilih: '' }]
            lastCindex = choice.length - 1
            break;

        default:
            break;
    }
    return {
        soal: '', texts: texts, choices: choice, types: [element.types], required, lastChoiceIndex: lastCindex
    };
}

function cloneDesc(element) {
    let file = []
    switch (element.name) {
        case 'Image':
            file = [{ files: '' }]
            break;

        default:
            break;
    }
    return {
        soal: '', types: [element.types], files: file
    };
}

// Page functions
function addNewPage() {
    pages.value.push({ name: form.page_name, question: [] });
    form.reset('page_name');
    showAddPage.value = false;
}
const deletePageId = ref(null);
const hapus = (index) => {
    deletePageId.value = index;
    showDeleteModal.value = true;
};
const confirmDeletion = (page) => {
    page.splice(deletePageId.value, 1);
    showDeleteModal.value = false;
    openDropdown.value = false;
    p(pages)
};
const p = (page) => {
    if (page.value.length == 0) {
        pages.value.push({ name: 'title', question: [] })
    }
}
const cancelDeletion = () => (showDeleteModal.value = false);

// Log Update
// const logUpdate = (newQuestions) => {
//     console.log('Questions updated:', JSON.stringify(newQuestions, null, 2));
// };

// QUESTIONS OVER HERE
// Question 
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
        if (!question.choices.length) {
            const checkbox = { pilih: '' };
            question.choices.push(checkbox);
        }
        question.types.push('Radio'); // Track the type
    }
}
function checkboxQuestion(question) {
    if (question.types.length > 0 && !question.types.includes('Checkbox')) {
        // Clear previous type and data if it isn't Text
        clearQuestionType(question);
    }
    if (!question.types.includes('Checkbox')) {
        if (!question.choices.length) {
            const checkbox = { pilih: '' };
            question.choices.push(checkbox);
        }
        question.types.push('Checkbox'); // Track the type

        question.lastChoiceIndex = question.choices.length - 1; // update radio index
    }
}

// add
function AddRadioOption(question) {
    const radio = { pilih: '' };
    question.choices.push(radio);
    // question.types.push('Radio'); // Track the type

    question.lastChoiceIndex = question.choices.length - 1;
}
function AddCheckboxOption(question) {
    const checkbox = { pilih: '' };
    question.choices.push(checkbox);
    // question.types.push('Checkbox'); // Track the type

    question.lastChoiceIndex = question.choices.length - 1;
}

// delete
function deleteRadio(question, index) {
    if (question.lastChoiceIndex >= 1) {
        question.choices.splice(index, 1)
        question.lastChoiceIndex = question.choices.length - 1; // update radio index
    }
}
function deleteCheckbox(question, index) {
    if (question.lastChoiceIndex >= 1) {
        question.choices.splice(index, 1)
        question.lastChoiceIndex = question.choices.length - 1; // update radio index
    }
}

function clearQuestionType(question) {
    // Clear the existing type and its associated data
    if (question.types.includes('Text')) {
        question.texts = [];  // Clear text data
    } else if (question.types.includes('Radio') || question.types.includes('Checkbox')) {
        question.choices = question.choices;  // Clear choice data
    }

    // Clear the type
    question.types = [];
}

function isTypeAdded(question, type) {
    return question.types.includes(type);
}

function remove(page, index) {
    page.question.splice(index, 1);
}

const form = useForm({
    page_name: '',
    project_slug: project['slug'],
    client_slug: client['slug'],
});

// Save Mechanic
const savingStatus = ref('')
const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ''; // This is required for the alert to be shown in some browsers
    return '';
};

const submitForm = () => {
    savingStatus.value = 'saving';
    form.transform(() => ({
        data: pages.value,
        survey: props.surveys.id,
        project_slug: project['slug'],
        client_slug: client['slug'],
    })).post(route('manual-save-question', [form.client_slug, form.project_slug, props.surveys.id]), {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
            // Automatically clear the status after 3 seconds
            setTimeout(() => {
                savingStatus.value = '';
            }, 3000); // 3000ms = 3 seconds
            console.log('success')
            savingStatus.value = 'saved';
            window.removeEventListener('beforeunload', handleBeforeUnload);
        },
        onError: (error) => {
            setTimeout(() => {
                savingStatus.value = '';
            }, 3000); // 3000ms = 3 seconds
            console.error('Error saving:', error);
            savingStatus.value = 'error';
        },
    });

};
const status = () => {
    form.transform(() => ({
        surveyId: props.surveys.id,
        surveyStatus: props.surveys.status
    })).patch(route('changeStatus', [form.client_slug, form.project_slug, props.surveys.id]))
}

onMounted(() => {
    // Attach the event listener when the component is mounted
    window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
    // Remove the event listener when the component is unmounted
    window.removeEventListener('beforeunload', handleBeforeUnload);
});
// PAGE FLOW
const selectedPage = ref('')
const selectedQuestion = ref('')
const selectedChoice = ref('')
const selectedNextPage = ref('')
const flowName = ref(null)
const flowId = ref(null)
const floww = (flow) => {
    selectedPage.value = props.page.find(p => p.id == flow.question_page_id)
    selectedQuestion.value = selectedPage.value.question.find(a => a.id == flow.question_id)
    selectedChoice.value = selectedQuestion.value.choice.find(c => c.id == flow.question_choice_id)
    selectedNextPage.value = props.page.find(a => a.order == flow.next_page_order)
    flowName.value = flow.flow_name
    flowId.value = flow.id
}
const newFlow = () => {
    selectedPage.value = ''
    selectedQuestion.value = ''
    selectedChoice.value = ''
    selectedNextPage.value = ''
    flowName.value = null
}
const createFlow = () => {
    form.transform(() => ({
        page: selectedPage.value,
        question: selectedQuestion.value,
        choice: selectedChoice.value,
        next: selectedNextPage.value,
        name: flowName.value,
        flow_id: flowId.value ?? null
    })).post(route('save-flow', [form.client_slug, form.project_slug, props.surveys.id]),
        { onSuccess: showLogicModal.value = false });
}

const hapusFlow = ref(false)
const confirmDeletionFlow = (flow) => {
    form.get(route('delete-flow', [form.client_slug, form.project_slug, props.surveys.id, flow]), { onSuccess: hapusFlow.value = false });
}

// PREVIEW IMAGE
const handleImage = (event, pgindex, qindex) => {
    pages.value[pgindex].question[qindex].soal = event.target.files[0];
    pages.value[pgindex].question[qindex].files[0].files = event.target.files[0];
    var input = event.target;
    if (input.files) {
        if (pages.value[pgindex].question[qindex].files[0].files.size / 1024 > 2048) {
            alert('EXCEED IMAGE SIZE LIMIT');
            exit;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
            pages.value[pgindex].question[qindex].files[0].files = e.target.result;
        }
        reader.readAsDataURL(input.files[0])
    }
}
const page_index = ref(null);
const qIndex = ref(null);
const textEditor = ref(false);
console.log(pages.value[0])
const openTextEditor = (pgindex, q_index) => {
    textEditor.value = !textEditor.value
    page_index.value = pgindex
    qIndex.value = q_index
}
</script>

<template>
    <AppLayout title="Tambah Pertanyaan Survey">

        <main class="min-h-screen relative">
            <header class="bg-white grid grid-cols-2 items-center border-b border-gray-300 sticky top-0 z-50">
                <div class="flex items-center gap-x-4">
                    <a :href="route('listsurvey', [client['slug'], project['slug']])"
                        class="flex justify-center items-center font-semibold text-white focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-red-500 bg-red-500 py-2.5 ps-4 pe-8 gap-1 hover:bg-red-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        Back
                    </a>
                    <h2 class="text-center font-semibold text-xl">
                        {{ props.surveys.title }}
                    </h2>
                </div>
                <div class="grid grid-cols-2 items-center justify-items-end">
                    <div class="save-status flex justify-start">
                        <p v-if="savingStatus === 'saving'" class="text-wrap">Saving...</p>
                        <p v-if="savingStatus === 'saved'" class="font-semibold text-wrap">All changes saved.</p>
                        <p v-if="savingStatus === 'error'" class="font-semibold text-wrap">Error saving data.</p>
                    </div>
                    <div class="save-publish flex items-center gap-4">
                        <form class="bg-white" @submit.prevent="submitForm">
                            <button type="submit"
                                class="py-2 px-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:rounded-sm text-sky-500 hover:text-sky-600 font-semibold flex justify-center items-center gap-2 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Save Questions
                            </button>
                        </form>
                        <form @submit.prevent="status">
                            <button type="submit"
                                class="py-2.5 px-10 flex focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-secondary justify-center items-center font-semibold text-white bg-secondary hover:bg-[#016094] transition">
                                {{ props.surveys.status == 0 ? 'Publish' : 'Unpublish' }}
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <div class="absolute h-[96.5%] w-full bg-white opacity-50 z-40" v-if="props.surveys.status == 1"></div>

            <aside class="sticky bg-gray-200 min-h-full top-11 z-30">
                <div class="absolute lg:w-1/5">
                    <div class="flex" id="question-or-flow">
                        <h1 @click="QuestionOrFlow = 'question'"
                            class="bg-white text-center font-semibold py-2.5 border-b-2 select-none cursor-pointer w-full"
                            :class="{ 'border-ijo-terang': QuestionOrFlow == 'question' }">
                            Questions
                        </h1>
                        <h1 @click="QuestionOrFlow = 'flow'"
                            class="bg-white text-center font-semibold py-2.5 border-b-2 select-none cursor-pointer w-full"
                            :class="{ 'border-ijo-terang': QuestionOrFlow == 'flow' }">
                            Flows
                        </h1>
                    </div>
                    <div class="" id="add-question" v-if="QuestionOrFlow == 'question'">
                        <p
                            class="bg-white text-center font-semibold py-2.5 border-b-2 select-none cursor-pointer w-full">
                            Questions</p>
                        <VueDraggable v-model="questionsType" :group="{ name: 'questions', pull: 'clone', put: false }"
                            :animation="150" :clone="cloneQuestion" :sort="false" class="list-qtype">
                            <div v-for="item in questionsType" :key="item.types" class="list-qtype-item bg-white border-b border-gray-300 py-2 px-4 flex justify-between
                                items-center cursor-grab hover:font-semibold">
                                <span>{{ item.name }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </VueDraggable>

                        <p
                            class="bg-white text-center font-semibold py-2.5 border-b-2 select-none cursor-pointer w-full">
                            Descriptions</p>
                        <VueDraggable v-model="descType" :group="{ name: 'questions', pull: 'clone', put: false }"
                            :animation="150" :clone="cloneDesc" :sort="false" class="list-qtype">
                            <div v-for="item in descType" :key="item.types" class="list-qtype-item bg-white border-b border-gray-300 py-2 px-4 flex justify-between
                                items-center cursor-grab hover:font-semibold">
                                <span>{{ item.name }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </VueDraggable>

                        <button type="button" class="bg-white border-gray-300 py-2 focus: px-4 flex justify-between
                        items-center w-full hover:font-semibold" @click="showAddPage = !showAddPage"
                            :class="{ 'border-b': !showAddPage }">
                            Add Page
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="transform scale-95" enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform scale-95">
                            <form action="" v-if="showAddPage" @submit.prevent="addNewPage()"
                                class="w-full flex justify-between items-center bg-white border-b border-gray-300 px-4">
                                <input type="text" id="showAddPage" v-model="form.page_name"
                                    class="text-sm w-full -ms-1 me-4 mb-2 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-600"
                                    placeholder="Enter page name">
                                <button type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="size-6 transition hover:text-sky-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                </button>
                            </form>
                        </transition>
                    </div>
                    <div class="bg-white" id="add-flow" v-if="QuestionOrFlow == 'flow'">
                        <div class="border-b border-gray-300 py-2 px-4">
                            <div class="flows" v-for="(flow, index) in flows" :key="index"
                                @click="showLogicModal = true; floww(flow)">
                                <!-- All created flows will be listed here -->
                                {{ index + 1 + '. ' + flow.flow_name }}
                            </div>
                        </div>
                        <div class="border-0 border-gray-300 py-2 px-4">
                            <button type="button"
                                class="w-full text-center border border-primary p-3 hover:bg-primary hover:text-white transition cursor-pointer"
                                @click="showLogicModal = true; newFlow()">Tambah Flow Baru</button>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Might try to make this as component -->
            <div v-show="textEditor" class="fixed inset-0 z-30" @click="textEditor = false"
                @focusout="textEditor = false" />
            <aside class="w-[26%] min-h-fit sticky top-11 bg-white z-40 float-right p-3 pt-0" v-if="textEditor">
                <!-- Isi text editor sidebar -->
                <div class="" v-show="textEditor">
                    <h2 class="bg-white text-center font-semibold py-2.5 select-none w-full">
                        Text Editor</h2>
                    <TextEditor v-model="pages[page_index].question[qIndex].soal" class="h-20 mx-1"
                        v-if="page_index != null" />
                </div>
            </aside>

            <form class="mx-auto max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <VueDraggable v-model="pages" group="pages" :animation="150" class="select-none"
                    :class="'pb-8 rounded-md'" handle=".handle">
                    <div class="rounded-md relative" v-for="(page, page_index) in pages" :key="page_index">
                        <div
                            class="p-5 rounded-t-md border-b border-gray-300 bg-primary flex items-center relative handle cursor-grab">
                            <input type="text" :id="'page-name-' + page_index" v-model="page.name" placeholder="Title"
                                class="w-full bg-transparent text-white border-0 border-b border-white placeholder:font-normal placeholder-gray-100 focus:ring-0 focus:border-b-2 focus:border-white transition" />
                            <div class="absolute -right-16 z-10 mt-2 origin-top-right">
                                <button type="button" @click="hapus(page_index)"
                                    class="cursor-pointer block bg-white p-3 rounded-full border focus:outline-none focus:ring-1 focus:ring-red-500 border-gray-300 shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6 text-red-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                            <DeleteConfirmation v-if="showDeleteModal" :show="showDeleteModal"
                                @confirm="confirmDeletion(pages)" @cancel="cancelDeletion" />
                        </div>
                        <!-- vue draggable : @update:modelValue="logUpdate" -->
                        <VueDraggable v-model="page.question" group="questions" :animation="150" class="list-questions"
                            :class="'bg-white pb-8 rounded-md'" handle=".handle" :scroll-sensitivity="200">
                            <div v-for="(item, index) in page.question" :key="index" class="list-questions-item">
                                <div class="p-5 gap-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="size-10 cursor-grab handle border-2 rounded-md border-gray-800">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                    <!-- Insert question here -->
                                    <div v-if="item.types[0] != 'Image'" @click="openTextEditor(page_index, index)"
                                        v-html="item.soal || ''" type="text" placeholder="Insert question here"
                                        class="text-sm w-full mx-1 rounded-md cursor-pointer" />
                                    <input v-if="item.types[0] == 'Image'" type="file" accept=".png, .jpg, .jpeg"
                                        id="file_input" @input="handleImage($event, page_index, index)"
                                        class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white">

                                    <!-- Question types -->
                                    <Dropdown align="right" width="48"
                                        v-if="!descType.some(obj => obj.types == item.types)">
                                        <template #trigger>
                                            <button type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                                                <p v-for="type in item.types">
                                                    {{ type ?? 'Question Type' }}
                                                </p>
                                                <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </template>
                                        <template #content class="">
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
                                                    false-value="0" :id="'q' + index + '-required'"
                                                    class="cursor-pointer">
                                                <label :for="'q' + index + '-required'"
                                                    class="pl-2 cursor-pointer select-none w-full">Required</label>
                                            </div>
                                        </template>
                                    </Dropdown>
                                    <!-- delete question -->
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" @click="remove(page, index)"
                                        class="size-10 text-red-600 cursor-pointer z-30"
                                        :class="{ 'size-8': item.files }">
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
                                <div class="px-5" v-for="(radio, index) in item.choices" :key="index"
                                    v-if="item.types.includes('Radio')">
                                    <div class="flex items-center mb-2">
                                        <span class="select-none">O</span>
                                        <input type="text" v-model="radio.pilih" :name="'radio-' + item.id"
                                            :id="'radio' + (index + 1) + '-q' + (item.id)"
                                            placeholder="Insert single choice"
                                            class="text-sm mx-4 block w-1/4 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-600">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="size-6 text-red-600 cursor-pointer"
                                            @click="deleteRadio(item, index)">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                    </div>
                                    <div class="ml-7"
                                        v-if="index === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES">
                                        <a class="w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer"
                                            @click="AddRadioOption(item)">
                                            Add Options
                                        </a>
                                    </div>
                                </div>

                                <!-- multiple choice -->
                                <div class="px-5" v-for="(checkbox, index) in item.choices" :key="index"
                                    v-if="item.types.includes('Checkbox')">
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
                                        v-if="index === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES">
                                        <a class="w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer"
                                            @click="AddCheckboxOption(item)">
                                            Add Options
                                        </a>
                                    </div>
                                </div>

                                <!-- Image -->
                                <div class="px-5 flex justify-center" v-for="(image, index) in item.files" :key="index">
                                    <img v-if="image.files != item.soal" :src="image.files" alt="Preview">
                                    <img v-else :src="'/img/' + item.soal" alt="Preview Image">

                                </div>
                            </div>
                        </VueDraggable>
                        <div class="border border-gray-500 my-5"
                            v-if="pages.length > 1 && page_index != pages.length - 1"></div>
                    </div>
                </VueDraggable>
            </form>

            <DialogModal :show="showLogicModal" @close="showLogicModal = false">
                <template #title>
                    <div>
                        Tambah Logika/Flow Halaman
                    </div>
                </template>

                <template #content>
                    <div class="border border-gray-300 p-4">
                        <h3 class="font-bold mb-2 text-red-500">Reminder : <u>Simpan Pertanyaan</u> terlebih dahulu!
                        </h3>
                        <h3 class="font-bold mb-2 text-red-500">Jika tidak ada pertanyaan berarti anda belum save</h3>
                        <div class="flows-dropdown-label">
                            Halaman Awal
                            <select class="flows-dropdown" v-model="selectedPage"
                                @change="selectedQuestion = null; selectedNextPage = null">
                                <option :value="''" disabled>Halaman</option>
                                <option :value="page" v-for="page in props.page">{{ page.page_name }}</option>
                            </select>
                        </div>
                        <div class="flows-dropdown-label" v-if="selectedPage" @change="selectedChoice = ''">
                            Pertanyaan
                            <select class="flows-dropdown" v-model="selectedQuestion">
                                <option :value="null" disabled>Pertanyaan</option>
                                <option :value="question"
                                    v-for="question in selectedPage.question.filter(prop => prop.question_type_id == 2)">
                                    {{
                                        question.question_text }}</option>
                            </select>
                        </div>
                        <div class="flows-dropdown-label" v-if="selectedQuestion && selectedPage">
                            Pilihan Jawaban
                            <select class="flows-dropdown" v-model="selectedChoice">
                                <option :value="''" disabled>Pilihan Jawaban</option>
                                <option :value="option" v-for="option in selectedQuestion.choice">{{ option.value }}
                                </option>
                            </select>
                        </div>
                        <div class="flows-dropdown-label" v-if="selectedPage">
                            Halaman Tujuan
                            <select class="flows-dropdown" v-model="selectedNextPage">
                                <option :value="null" disabled>Tujuan Halaman</option>
                                <option :value="nextpage"
                                    v-for="nextpage in props.page.filter(page => page != selectedPage)">{{
                                        nextpage.page_name }}
                                </option>
                            </select>
                        </div>
                        <div class="flows-dropdown-label" v-if="selectedPage">
                            Nama Flow
                            <input type="text" class="w-[30%]" v-model="flowName" placeholder="Nama Flow">
                        </div>
                        <div class="flows-dropdown-label" :class="{ '!justify-center': hapusFlow == true }"
                            v-if="selectedPage">
                            <a @click="hapusFlow = !hapusFlow" v-if="!hapusFlow"
                                class="font-medium text-base text-red-600 hover:underline cursor-pointer">Delete</a>
                            <div class="inset-0 flex items-center justify-center" v-if="hapusFlow">
                                <!-- <div class="absolute inset-0 bg-gray-600 opacity-75"></div> -->
                                <div class="bg-white p-6 rounded-lg shadow-lg z-10">
                                    <h2 class="text-lg font-semibold text-gray-800 mb-4">Confirm deletion</h2>
                                    <p class="text-gray-600 mb-6">Are you sure want to delete? This action cannot be
                                        undone.</p>
                                    <div class="flex justify-end space-x-4">
                                        <button @click="hapusFlow = !hapusFlow"
                                            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                                            Cancel
                                        </button>
                                        <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                            @click="confirmDeletionFlow(flowId)">
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template #footer>
                    <div class="flex items-center justify-between w-full">
                        <SecondaryButton @click="showLogicModal = false" class="hover:bg-red-500 hover:text-white">Back
                        </SecondaryButton>
                        <PrimaryButton @click="createFlow()">Save</PrimaryButton>
                    </div>
                </template>
            </DialogModal>
        </main>
    </AppLayout>
</template>

<style scoped>
.list-questions:empty {
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
    background-color: grey;
}

.list-questions:empty:before {
    content: 'Tambah Pertanyaan Baru';
    color: white;
    font-weight: bold;
    font-size: 18px;
}

.flows {
    padding: 0.75rem;
    border: 1px dashed #5EB54D;
    cursor: pointer;
    transition: all 100ms;
}

.flows:hover {
    background-color: #5EB54D;
    color: white;
}

.flows-dropdown {
    width: 30%;
    cursor: pointer;
}

.flows-dropdown-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 1rem;
}
</style>