<script setup>
import BarChart from '@/Components/BarChart.vue';
import PieChart from '@/Components/PieChart.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { elements, Tooltip } from 'chart.js';
import { ref } from 'vue';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Array,
    responses: [Array, Object],
    answer: Array,
    biodata: Object
});
const project = props.projects[0]
const client = props.clients[0]
const BackgroundColors = ['#41B883', '#E46651', '#00D8FF', '#FFAF00', '#cc66ff']
const PieChartData = (
    props.page.map((page) => ({
        question: page.question.map(() => ({
            labels: [],
            datasets: [{
                label: ['Response'],
                backgroundColor: BackgroundColors,
                data: [],
            }],
        }))
    }))
)

const BarChartData = (
    props.page.map((page) => ({
        question: page.question.map((q) => ({
            labels: ['Response'],
            datasets: q.choice.map((c, index) => ({
                label: c.value + ' (' + ((q.answer.filter(a => a.answer == c.id).length * 100) / q.answer.length).toFixed(2) + '%)',
                backgroundColor: BackgroundColors[index],
                data: [q.answer.filter(a => a.answer == c.id).length]
            }))
        }))
    }))
)

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Data Kuisioner',
        },
    },
};


const count = (pgind, qind, choice, answer, question) => {
    const all = answer.length
    if (PieChartData[pgind].question[qind].labels.length != choice.length) {
        choice.forEach((element, ind) => {
            const persentage = ((answer.filter(a => a.answer == element.id).length * 100) / all).toFixed(2)
            if (question.question_type_id == 2 || question.question_type_id == 6) {
                PieChartData[pgind].question[qind].labels.push(element.value + ' (' + persentage + '%)')
                PieChartData[pgind].question[qind].datasets[0].data.push(answer.filter(a => a.answer == element.id).length)
            }
        })
    } else {
        return false
    }
}
const showAllanswer = ref(props.page.map((p) => ({
    q: p.question.map(() => ({
        value: false
    }))
})))

</script>

<template>
    <AppLayout title="Hasil Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="mb-5 overflow-x-auto" v-for="(page, ind) in page" :key="ind">
                    <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                        <h2>{{ page.page_name }}</h2>
                    </div>
                    <div class="bg-white rounded-b-md overflow-x-auto">
                        <div class="p-5 flex w-full">
                            <form class="w-full">
                                <div v-for="(question, index) in page.question.sort((a, b) => a.order - b.order)"
                                    :key="index">
                                    <div class="block mb-2.5">
                                        <div class="font-semibold flex gap-x-1"
                                            v-if="question.question_type_id <= 3 || question.question_type_id == 6">
                                            {{ index + 1 }}. <label v-html="question.question_text"
                                                class="output"></label>{{ ' (' + responses.length + ' Response)' }}
                                        </div>
                                        <!-- Handling radio inputs for question type 2 -->
                                        <div v-if="question.question_type_id == 2 || question.question_type_id == 6"
                                            class="flex gap-x-10">
                                            <div>
                                                <div v-for="(list, i) in question.choice" :key="i" class="flex gap-x-3">
                                                    <input type="radio" :name="'radio' + list.id"
                                                        :id="'radio' + list.id" disabled>
                                                    <span>{{ list.scale }}</span>
                                                    <label :for="'radio' + list.id">
                                                        {{ list.value }}
                                                    </label>
                                                </div>
                                            </div>
                                            <PieChart :chart-data="PieChartData[ind].question[index]"
                                                :key="count(ind, index, question.choice, question.answer, question)"
                                                :chart-options="chartOptions" />
                                        </div>
                                        <!-- Handle checkbox for question type 3 -->
                                        <div class="flex gap-x-10" v-if="question.question_type_id === 3">
                                            <div>
                                                <div v-for="(list, i) in question.choice" :key="i">
                                                    <input type="checkbox" :name="'checkbox' + list.id"
                                                        :id="'checkbox' + list.id" disabled>
                                                    <label :for="'checkbox' + list.id" class="px-3">
                                                        {{ list.value }}
                                                    </label>
                                                </div>
                                            </div>
                                            <BarChart :chart-data="BarChartData[ind].question[index]"
                                                :key="count(ind, index, question.choice, question.answer, question)"
                                                :chart-options="chartOptions" />
                                        </div>
                                        <div v-if="question.question_type_id == 4">
                                            <img :src="'/img/' + question.question_text"
                                                style="max-width: 500px; max-height: 300px; width: auto; height: auto; display: block; margin: 0 auto;"
                                                alt="Image" />
                                        </div>
                                        <div class="output" v-if="question.question_type_id == 5"
                                            v-html="question.question_text"></div>
                                        <!-- Handling textarea for question type 1 -->
                                        <div v-if="question.question_type_id == 1">
                                            <div class="px-5 mt-2 " v-for="(answe, Aindex) in question.answer"
                                                :key="Aindex">
                                                <div class=""
                                                    v-if="Aindex < 3 || showAllanswer[ind].q[index].value == true">
                                                    <input v-if="answe.question_id == question.id" type="text"
                                                        :value="answe.answer" disabled class="rounded w-full">
                                                </div>
                                            </div>
                                            <div class="flex justify-center mt-2"
                                                v-if="showAllanswer[ind].q[index].value == false && question.answer.length > 3">
                                                <button
                                                    class="text-sm text-secondary border-b border-transparent hover:border-secondary transition p-1 focus:border-secondary focus:outline-none"
                                                    type="button" @click="showAllanswer[ind].q[index].value = true">
                                                    Show {{ question.answer.length - 3 }} More
                                                </button>
                                            </div>
                                            <div class="flex justify-center mt-2"
                                                v-else-if="showAllanswer[ind].q[index].value == true && question.answer.length > 3">
                                                <button type="button"
                                                    class="text-sm text-secondary border-b border-transparent hover:border-secondary transition p-1 focus:border-secondary focus:outline-none"
                                                    @click="showAllanswer[ind].q[index].value = false">Show
                                                    Less</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
<style>
@import url('/resources/css/quill-overwrite.css');
</style>