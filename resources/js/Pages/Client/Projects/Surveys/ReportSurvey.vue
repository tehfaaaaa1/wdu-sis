<script setup>
import { ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Array,
    responses: Array,
    answer: Array,
    user: Object
});
const project = props.projects[0]
const client = props.clients[0]

const hasil = ref([{ soal: [] }])
console.log(props.page)
</script>

<template>
    <AppLayout title="Hasil Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="mb-5" v-for="(page, ind) in page" :key="ind">
                    <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                        <h2>{{ page.page_name }}</h2>
                    </div>
                    <div class="bg-white rounded-b-md">
                        <div class="border-b-2 p-5 border-gray-500">
                            <div class="p-5 mt-2 border-2 border-gray-400">
                                <h2 class="font-semibold text-lg">{{ props.user.name }}</h2>
                            </div>
                        </div>
                        <div class="p-5 flex w-full">
                            <form class="w-full">
                                <div v-for="(question, index) in page.question" :key="index">
                                    <div class="block mb-2">
                                        <p class="font-semibold">{{ index + 1 }}. <label>{{ question.question_text }}</label></p>
    
                                        <!-- Handling radio inputs for question type 2 -->
                                        <div v-if="question.question_type_id == 2">
                                            <!-- <div class="ps-5" v-for="answe in question.answer"> -->
                                                <div v-for="(list, i) in question.choice" :key="i">
                                                    <input type="radio" :name="'radio'+ list.id" :id="'radio'+ list.id" :checked="question.answer[i]">
                                                    <label :for="'radio'+list.id">{{list.value}}</label>
                                                    <!-- {{ question.answer[i] }} -->
                                                </div>
                                                <!-- <p class="font-semibold">Jawaban :
                                                    {{ answe.answer }}</p>
                                            </div> -->
                                        </div>
    
                                        <!-- Handle checkbox for question type 3 -->
                                        <div class="" v-if="question.question_type_id === 3">
                                            <div class="" v-for="(list, i) in question.choice" :key="i">
                                                <input type="checkbox" :name="'checkbox'+list.id" :id="'checkbox'+list.id" :checked="question.answer[i]">
                                                <label :for="'checkbox'+list.id">{{ list.value }}</label>
                                                <!-- {{ question.answer[i] }} -->
                                            </div>  
                                        </div>
                                        <!-- Handling textarea for question type 1 -->
                                        <div v-if="question.question_type_id == 1">
                                            <!-- Conditional rendering to ensure v-model only binds when the value exists -->
                                            <div class="ps-5" v-for="answe in question.answer">
                                                <!-- <p class="font-semibold">Jawaban :
                                                    {{ answe.answer }}</p> -->
                                                <input type="text" :value="answe.answer" disabled>
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
            </div>
        </main>
    </AppLayout>
</template>
