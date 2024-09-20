<script setup>
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';

const props = defineProps({
    surveys: Array,
    projects: Array,
    clients: Array,
    user: Object,
    userTarget: Array,  
    provinces: Array,   
    cities: Array,
    regencies: Array
});

const form = useForm({ search: '' });
const submit = () => form.get(route('surveys'));

const selectedProvince = ref(null);
const selectedSurveyId = ref(null);
const showDeleteModal = ref(false);

const client = props.clients[0];
const clientSlug = client.slug;
const project = props.projects[0];
const projectSlug = project.slug;

const hapus = (cliSlug, proSlug, id) => {
    selectedSurveyId.value = id;
    showDeleteModal.value = true;
};

const confirmDeletion = () => {
    form.get(route('delete_surveys', [clientSlug, projectSlug, selectedSurveyId.value]), {
        onFinish: () => (showDeleteModal.value = false)
    });
};

const cancelDeletion = () => (showDeleteModal.value = false);

const searchQuery = ref('');
const filteredSurveys = computed(() => {
    return props.surveys.filter(survey => {
        return (
            survey.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            survey.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});

const hasFilledSurvey = (survey) => {
    return survey.response.some(res => res.user_id === props.user.id);
};
const hasPubllish = (survey) => {
    return survey.status ==  0;
};

const getSelectedProvinces = (survey, provinces) => {
    if (!survey || !Array.isArray(provinces)) {
        console.error('Invalid data:', survey, provinces);
        return { list: [], total: 0 }; 
    }

    let provinceTargets;

    try {
        provinceTargets = typeof survey.province_targets === 'string'
            ? JSON.parse(survey.province_targets)
            : survey.province_targets;
    } catch (error) {
        console.error('Error parsing province_targets:', error);
        return { list: [], total: 0 };  
    }

    if (!Array.isArray(provinceTargets) || provinceTargets.length === 0) {
        console.log('No provinces found in province_targets:', provinceTargets);
        return { list: [], total: 0 };  
    }

    const totalTargetResponse = provinceTargets.reduce((total, target) => {
        const targetResponse = parseInt(target.target_response, 10);
        return total + (isNaN(targetResponse) ? 0 : targetResponse);
    }, 0);


    const provinceList = provinceTargets.map(target => {
        if (!target || !target.province_id) {
            console.error('Invalid target data:', target);
            return { name: 'Unknown Province', response: '0' };
        }
        const province = provinces.find(p => p.id === target.province_id);
        const provinceName = province ? province.name : 'Unknown Province';
        const targetResponse = target.target_response || '0';
        return { name: provinceName, response: targetResponse };
    });

    return { list: provinceList, total: totalTargetResponse };
};


console.log('Provinces prop:', props.provinces);
console.log('Props:', props); 


const getSurveySubmissions = (surveyId) => {
    return props.userTarget[surveyId] || 0;
};
</script>

<template>
    <AppLayout title="List Kuisioner">
        <template #header>
            <NavLink :href="route('projects', clientSlug)" class="!p-0 focus:!border-0 !m-0 !font-semibold !text-lg text-ijo-terang">
                <span class="text-black">Project&nbsp;</span> {{ project.project_name }}
            </NavLink>
        </template>

        <main class="min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div v-if="$page.props.flash.question_added" @click="$page.props.flash.question_added = false"
                    class="fixed z-50 bottom-10 right-10 bg-ijo-terang hover:bg-primary w-1/4 h-20 flex justify-center items-center rounded-lg cursor-pointer">
                    <p class="text-center text-white font-medium text-lg">{{ $page.props.flash.question_added }}</p>
                    <svg class="ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full">
                        <NavLink :href="route('create_surveys', [clientSlug, projectSlug])"
                            v-if="$page.props.auth.user.usertype === 'superadmin'"
                            class="bg-primary text-white font-medium text-sm px-6 mr-5 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition focus:ring-2 focus:ring-primary">
                            Tambah Kuisioner
                        </NavLink>
                        <NavLink :href="route('projects', [clientSlug])"
                            class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition focus:ring-2 focus:ring-primary">
                            Back to Project
                        </NavLink>
                    </div>

                    <div class="flex items-center px-4 py-2 text-sm w-60">
                        <input type="text" v-model="searchQuery"
                            class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Search">
                    </div>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
                            <div class="flex justify-between w-full ">
                                <div>
                                    {{ project['project_name'] }}
                                    <p class="mt-1 mb-4 text-sm font-normal text-gray-500">{{ project['desc'] }}</p>
                                </div>
                            </div>
                            <div class="border-b-2 border-gray-300"></div>
                        </caption>

                        <thead class="text-xs text-white uppercase bg-primary">
                            <tr>
                                <th scope="col" class="px-6 py-3 w-1/5">Survey Title</th>
                                <th scope="col" class="px-6 py-3 w-1/4">Description</th>
                                <th scope="col" class="px-6 py-3 ">Target</th>
                                <th scope="col" class="px-6 py-3 ">Status</th>
                                <th scope="col" class="px-6 py-3 md:w-1/4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="survey in filteredSurveys" :key="survey.id" class="bg-white border-b hover:bg-gray-50">
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900">{{ survey.title }}</td>
                                <td class="px-6 py-4 font-medium text-gray-c900 sm:text-gray-500">{{ survey.desc }}</td>
                                <td class="px-6 py-4">
                                    {{ getSurveySubmissions(survey.id) }} / <b>{{ getSelectedProvinces(survey, props.provinces).total }}</b><br>
                                    Target Lokasi :
                                    <ul>
                                        <li v-for="(province, index) in getSelectedProvinces(survey, props.provinces).list" :key="index">
                                             {{ province.name }} ({{ province.response }}) 
                                        </li>
                                    </ul>
                                </td>
                                <td class="px-6 py-4">
                                    <p v-if="survey.status == 0"> Ditutup</p>
                                    <p v-if="survey.status == 1"> Dibuka</p>
                                </td>
                                <td class="px-6 py-6">
                                    <div class="grid grid-cols-2 gap-x-2 justify-center content-center">
                                        <div v-if="hasFilledSurvey(survey)"
                                            :class="props.user.current_team_id == 1 && props.user.usertype == 'user' ? 'col-span-2' : ''">
                                            <p class="text-center" :class="props.user.usertype == 'superadmin' ? 'mt-3': ''">Anda Sudah Mengisi Survey Ini</p>
                                        </div>
                                        <div class="m-auto" v-else-if="hasPubllish(survey) && !hasFilledSurvey(survey)"
                                            :class="props.user.current_team_id == 1 && props.user.usertype == 'user' ? 'col-span-2' : ''">
                                            <p class="text-center">Kuisioner Ditutup</p>
                                        </div>
                                        <NavLink v-else
                                            :href="props.user.biodata_id == null ? route('biodata', [clientSlug, projectSlug, survey.id, $page.props.auth.user.id]) : route('edit_bio', [clientSlug, projectSlug, survey.id, $page.props.auth.user.id])"
                                            class="w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition"
                                            :class="props.user.current_team_id == 1 && props.user.usertype == 'user' ? 'col-span-2' : ''">
                                            Isi Kuisioner
                                        </NavLink>

                                    <NavLink :href="route('response', [clientSlug, projectSlug, survey.id])" v-if="$page.props.auth.user.current_team_id !=1 || props.user.usertype == 'superadmin'"
                                        class="w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary focus:!ring-secondary hover:outline hover:outline-primary transition">
                                        Cek Respon
                                    </NavLink>
                                    
                                    <NavLink :href="route('question_surveys', [clientSlug, projectSlug, survey.id])"
                                        v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                        class="col-span-2 w-full flex justify-center py-2.5 text-white bg-primary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition">
                                        Tambah pertanyaan
                                    </NavLink>

                                    <div v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                        class="mt-5 text-center col-span-2">
                                        <a :href="route('edit_surveys', [clientSlug, projectSlug, survey.id])"
                                            class="font-medium text-blue-600 hover:underline mr-4 focus p-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-sm focus:rounded-sm">Edit</a>
                                        <a @click="hapus(clientSlug, projectSlug, survey.id)" class="font-medium text-red-600 hover:underline cursor-pointer p-1">Delete</a>
                                    </div>
                                    </div>
                                       
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <DeleteConfirmation v-if="showDeleteModal" :show="showDeleteModal" @confirm="confirmDeletion" @cancel="cancelDeletion" />
                </div>
            </div>
        </main>
    </AppLayout>
</template>
