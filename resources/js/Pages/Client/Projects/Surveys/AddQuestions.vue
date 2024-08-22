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

const props = defineProps({ surveys: Object, projects: Object })

const questions = ref([])
const choices = ref([])
const texts = ref([])

const form = useForm({
    title: '',
    desc: '',
});

let idquestion =1
function addQuestion(){
    const question={
        id: idquestion++,
        soal: '',
    }
    questions.value.push(question)
}
let idchoice =1
function radioQuestion(){
    const choice={
        id: idchoice++,
        pilih: '',
    }
    choices.value.push(choice)
}
let idtext = 1  
function textQuestion(){
    const text={
        id: idtext++,
        isi: '',
    }
    texts.value.push(text)
}
console.log(props)

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
                    <form action="" method="post" @submit.prevent >
                        <div id="questions" v-for="question in questions" > <!-- v-for here -->
                            <div>
                                <div class="p-5 flex items-center">
                                    <!-- Order of question -->
                                    <p>{{ question.id }}</p>
    
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
                                            <div @click="textQuestion" class="block px-4 py-2 text-sm cursor-pointer">
                                                Text
                                            </div>
                                            <div @click="radioQuestion" class="block px-4 py-2 text-sm cursor-pointer">
                                                Single Choice
                                            </div>
                                            <div class="block px-4 py-2 text-sm cursor-pointer">
                                                Multiple Choice
                                            </div>
                                        </template>
                                    </Dropdown>
                                    
                                </div>
                                <!-- single choice -->
                                <div class="p-5" v-for="choice in choices">
                                    <p>1</p>
                                    <input type="text" v-model="choice.pilih" name="1" id="q1" placeholder="Insert single choice here"
                                        class="text-sm mx-4 rounded-md">
                                </div>
                                <!-- text -->
                                <div class="p-5" v-for="text in texts">
                                    <p>1</p>
                                    <textarea v-model="text.isi" name="1" id="q1" placeholder="jawaban"
                                        class="text-sm mx-4 rounded-md"/>
                                </div>
                            </div>
                            <!-- single choice -->
                            <div class="" v-for="choice in choices">
                                     <div class="p-5">
                                         <p>{{ choice.id }}</p>
                                         <input type="text" v-model="choice.pilih" :name="idchoice" :id="idchoice" placeholder="Insert single choice here" class="text-sm mx-4 rounded-md">
                                     </div>
                                 </div>
                                 <!-- text -->
                                    <div class="" v-for="text in texts">
                                        <div class="">
                                            <div class="p-5" >
                                                <p>{{ text.id }}</p>
                                                <textarea v-model="text.isi" name="1" id="q1" placeholder="jawaban"
                                                class="text-sm mx-4 rounded-md"/>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                        <!-- End question -->

                        <div class="pt-2 flex justify-center">
                            <button
                                class="w-1/4 mb-10 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200"
                                 @click="addQuestion">
                                Add Questions
                            </button>
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