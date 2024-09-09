<script setup>
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    listquestion: Array,
    choice: Array,
    responses: Array,
    answer: Array,
    user: Object
});
const project = props.projects[0]
const client = props.clients[0]

const hasil = ref([{ soal: [] }])
console.log(hasil.value)
</script>

<template>
    <AppLayout title="Hasil Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>{{ props.surveys.title }}</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-500">
                        <p class="text-base text-justify line-clamp-3">{{ props.surveys.desc }}</p>
                        <div class="p-5 mt-2 border-2 border-gray-400">
                            <h2 class="font-semibold text-lg">{{ props.user.name }}</h2>
                        </div>
                    </div>
                    <div class="p-5 flex w-full">
                        <form class="w-full">
                            <div v-for="(question, index) in props.listquestion" :key="index">
                                <div class="block mb-2">
                                    <p class="font-semibold">{{ index + 1 }}. <label>{{ question.question_text }}</label></p>

                                    <!-- Handling radio inputs for question type 2 -->
                                    <div v-if="question.question_type_id == 2">
                                        <div class="ps-5" v-for="answe in answer">
                                            <div v-if="answe.question_id === question.id"
                                                v-for="(list, i) in props.choice" :key="i">
                                                <ul class="list-disc">
                                                    <li
                                                        v-if="list.question_id === question.id && answe.question_id === question.id">
                                                        {{ list.value }}</li>
                                                </ul>
                                            </div>
                                            <p v-if="answe.question_id === question.id" class="font-semibold">Jawaban :
                                                {{ answe.answer }}</p>
                                        </div>
                                    </div>

                                    <!-- Handle checkbox for question type 3 -->
                                    <div class="" v-if="question.question_type_id === 3">
                                        <div class="ps-5" v-for="(list, i) in choice" :key="i">
                                            <div class="" v-if="list.question_id === question.id">
                                                <ul class="list-square">
                                                    <li>{{ list.value }}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="">
                                            <p>Jawaban : </p>
                                            <div class="ps-5" v-for="answe in answer">
                                                <ul class="list-square">
                                                    <p v-if="answe.question_id === question.id" class="font-semibold">
                                                        {{ answe.answer }}</p>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Handling textarea for question type 1 -->
                                    <div v-if="question.question_type_id == 1">
                                        <!-- Conditional rendering to ensure v-model only binds when the value exists -->
                                        <div class="ps-5" v-for="answe in answer">
                                            <p v-if="answe.question_id === question.id" class="font-semibold">Jawaban :
                                                {{ answe.answer }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Display answers for debugging -->
                            <!-- <pre>{{ form.answer }}</pre> -->
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
