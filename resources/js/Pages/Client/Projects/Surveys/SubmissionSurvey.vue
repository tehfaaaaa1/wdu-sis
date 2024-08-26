<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
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
import { ref } from 'vue';
const props = defineProps({ surveys: Object, projects: Object, clients:Object, listquestion:Array, choice:Array})
const answers = ref([{id: 1, jawaban: ''}])    

const form = useForm({
    answer: '',
    desc: '',
});
const submit = () => {
    form.put(route('update_survey', props.surveys.id));
};
console.log(props.choice)
</script>

<template>
    <AppLayout title="Isi Survey">
        <main class="min-h-screen ">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>{{ props.surveys.title }}</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-500">
                        <p class="text-base text-justify line-clamp-3">
                            {{ props.surveys.desc }}
                        </p>
                    </div>
                    <div class="p-5">
                        <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, accusantium. Consectetur
                            optio alias architecto veniam iure expedita repudiandae voluptates praesentium, vero fugiat,
                            obcaecati, dignissimos dolorum eveniet provident distinctio ex magni!</h1>
                    </div>
                        <div class="p-5 flex">
                            <form action="" @submit.prevent="submit">
                            <div class="" v-for="(question, index) in listquestion" :key="index">
                                <div class="flex">
                                    <p>{{ index+1 }}. </p>
                                    <label>{{ question.question_text}} </label>
                                    <div v-if="question.question_type_id == 2 ">
                                        <div class="" v-for="(list, index) in choice" :key="index">
                                            <p v-if="question.id == list.question_id">{{ list.value }}</p>
                                        </div>
                                    </div>  
                                    <div class="" v-if="question.question_type_id == 1">
                                        <div class="" v-for="answer in answers">
                                            <textarea v-model="answer.jawaban">
                                                
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <PrimaryButton class="flex justify-center md:mb-10"
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