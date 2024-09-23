<script setup>
import PieChart from '@/Components/PieChart.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

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
const count = (choice, answer) => {
    let all = answer.length
    choice.forEach(element => {
        console.log(element.value + '. ' + (answer.filter(a => a.answer == element.id).length / all) * 100 + ' %')
    });
}

const chartData = {
  labels: ['Dawei', 'Jaki', 'Kinich', 'Fei Yu-Ching'],
  datasets: [
    {
      label: 'Orang2 pintar 👍',
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Smart People Distribution',
    },
  },
};
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
                        <div class="p-5 flex w-full">
                            <form class="w-full">
                                <div v-for="(question, index) in page.question.sort((a, b) => a.order - b.order)"
                                    :key="index">
                                    <div class="block mb-2.5">
                                        <p class="font-semibold">{{ index + 1 }}. <label>{{
                                            question.question_text }}</label></p>
                                        <!-- Handling radio inputs for question type 2 -->
                                        <div v-if="question.question_type_id == 2">
                                            <div v-for="(list, i) in question.choice" :key="i">
                                                <input type="radio" :name="'radio' + list.id" :id="'radio' + list.id"
                                                    disabled>
                                                <label :for="'radio' + list.id" class="px-3">{{ list.value }}</label>
                                            </div>
                                            {{ question.answer }}
                                            <PieChart :chart-data="chartData" :chart-options="chartOptions" />
                                        </div>

                                        <!-- Handle checkbox for question type 3 -->
                                        <div class="" v-if="question.question_type_id === 3">
                                            <div class="" v-for="(list, i) in question.choice" :key="i">
                                                <input type="checkbox" :name="'checkbox' + list.id"
                                                    :id="'checkbox' + list.id" disabled>
                                                <label :for="'checkbox' + list.id" class="px-3">{{ list.value }}</label>
                                            </div>
                                            {{ count(question.choice, question.answer) }}
                                        </div>

                                        <!-- Handling textarea for question type 1 -->
                                        <div v-if="question.question_type_id == 1">
                                            <div class="px-5 mt-2" v-for="answe in question.answer">
                                                <input v-if="answe.question_id == question.id" type="text"
                                                    :value="answe.answer" disabled class="rounded w-full">
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
