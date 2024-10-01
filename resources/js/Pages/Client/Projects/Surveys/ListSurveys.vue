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
    userTarget: Object,  
    provinces: Array,   
    cities: Array,
    regencies: Array
});

const form = useForm({ search: '' });

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

const getSelectedProvinces = (survey) => {
    let provinceTargets = parseProvinceTargets(survey);
    const totalTargetResponse = provinceTargets.reduce((total, target) => {
        const targetResponse = parseInt(target.target_response, 10);
        return total + (isNaN(targetResponse) ? 0 : targetResponse);
    }, 0);

    const provinceList = provinceTargets.map(target => {
        const province = props.provinces.find(p => p.id === target.province_id);
        const provinceName = province ? province.name : 'Unknown Province';
        const targetResponse = target.target_response || '0';
        return { name: provinceName, response: targetResponse };
    });

    return { list: provinceList, total: totalTargetResponse };
};

const getCitiesAndRegencies = (survey) => {
    let provinceTargets = parseProvinceTargets(survey);
    
    const provincesData = provinceTargets.map(target => {
        const provinceId = target.province_id;
        
        const foundProvince = props.provinces.find(p => p.id === provinceId);
        const provinceName = foundProvince ? foundProvince.name : 'Unknown Province';

        const cities = (target.cities || []).map(city => {
            const foundCity = props.cities.find(c => c.id === city.city_id);
            const cityName = foundCity ? foundCity.name : 'Unknown City';
            const targetResponseCity = city.target_response_city || '0';
            return { 
                city_name: cityName, 
                responseCity: targetResponseCity, 
                name: provinceName, 
                isPlaceholder: false 
            };
        });

        const citiesDisplay = cities.length > 0 ? cities : [{ city_name: 'No city listed', responseCity: '0', isPlaceholder: true }];

        const regencies = (target.regencies || []).map(regency => {
            const foundRegency = props.regencies.find(r => r.id === regency.regency_id);
            const regencyName = foundRegency ? foundRegency.name : 'Unknown Regency';
            const targetResponseRegency = regency.target_response_regency || '0';
            return { 
                regency_name: regencyName, 
                responseRegency: targetResponseRegency,
                isPlaceholder: false 
            };
        });

        const regenciesDisplay = regencies.length > 0 ? regencies : [{ regency_name: 'No regency listed', responseRegency: '0', isPlaceholder: true }];

        return {
            province_name: provinceName,    
            cities: citiesDisplay,
            regencies: regenciesDisplay,
            target_response: target.target_response
        };
    });

    return provincesData;
};



const parseProvinceTargets = (survey) => {
    try {
        return typeof survey.province_targets === 'string'
            ? JSON.parse(survey.province_targets)
            : survey.province_targets || [];
    } catch (error) {
        console.error('Error parsing province_targets:', error);
        return [];
    }
};




const getSurveySubmissions = (surveyId) => {
    return props.userTarget[surveyId] || 0;
};
</script>

    <template>
        <AppLayout title="List Kuisioner">
            <template #header>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <NavLink :href="route('projects', clientSlug)" class="!py-0 focus:!rounded-sm focus:!ring-0 focus:!border-0 !m-0 hover:ring-0 hover:underline !font-semibold !text-lg text-ijo-terang ">
                        <span class="text-black">Project&nbsp;</span> {{ project.project_name }}
                    </NavLink>
                </div>
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
                            <NavLink :href="route('create_surveys', [ clientSlug, projectSlug])"
                                v-if="$page.props.auth.user.usertype === 'superadmin'"
                                class="bg-primary text-white font-medium text-sm px-6 mr-5 py-2 rounded-m hover:bg-white hover:text-primary transition focus:ring-2 focus:ring-primary">
                                Tambah Kuisioner
                            </NavLink>
                            <NavLink :href="route('projects', [clientSlug])"
                                class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-white hover:text-primary transition focus:ring-2 focus:ring-primary">
                                Back to Project
                            </NavLink>
                        </div>

                        <div class="flex items-center px-4 py-2 text-sm w-60">
                            <input type="text" v-model="searchQuery"
                                class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-none focus:shadow-md"
                                placeholder="Search">
                        </div>
                    </div>

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-gray-500 text-left">
                            <caption class="p-5 text-lg font-semibold rtl:text-right text-gray-900 bg-white text-center">
                                <img :src="`/img/${client.image}`" alt="" class="h-60 w-full object-scale-down border-b-1 border-gray-400 mb-5">
                                {{ client['client_name'] }}
                                <p class="mt-1 mb-4 text-sm font-normal text-gray-500">
                                    {{ client['desc'] }}
                                </p>
                                <div class="border-b-2 border-gray-300 mb-5"></div>
                                    {{ project['project_name'] }}
                                <p class="text-sm font-normal text-gray-500">
                                    {{ project['desc'] }}
                                </p>
                            </caption>  

                            <thead class="text-xs text-center text-white uppercase bg-primary">
                                <tr>
                                    <th scope="col" class="px-6 py-3 w-1/5">Survey Title</th>
                                    <th scope="col" class="px-6 py-3 w-1/4">Description</th>
                                    <th scope="col" class="px-6 py-3" v-if="$page.props.auth.user.current_team_id !=1 || props.user.usertype == 'superadmin'">Target</th>
                                    <th scope="col" class="px-6 py-3 ">Status</th>
                                    <th scope="col" class="px-6 py-3 md:w-1/4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="survey in filteredSurveys" :key="survey.id" class="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900">{{ survey.title }}</td>
                                    <td class="px-6 py-4 font-medium text-gray-c900 sm:text-gray-500">{{ survey.desc }}</td>
                                    <td class="px-6 py-4" v-if="$page.props.auth.user.current_team_id !=1 || props.user.usertype == 'superadmin'">
                                        <div class="mt-5"></div>
                                        <ul>
                                            <li v-for="(province, index) in getCitiesAndRegencies(survey)" :key="index">
                                                <div class="font-bold">Province</div>
                                                - {{ province.province_name }} <b>({{ province.target_response }})</b>
                                                <ul>
                                                    <div class="font-bold px-2 mt-1">City</div>
                                                    <li v-for="(city, cityIndex) in province.cities" :key="cityIndex" 
                                                        :class="{ 'text-gray-500 italic': city.isPlaceholder, 'px-2': true }">
                                                        - {{ city.city_name }} <b v-if="!city.isPlaceholder">({{ city.responseCity }})</b>
                                                    </li>
                                                </ul>
                                                <div class="font-bold px-2 mt-1">Regency</div>
                                                <ul>
                                                    <li v-for="(regency, regencyIndex) in province.regencies" :key="regencyIndex" 
                                                        :class="{ 'text-gray-500 italic': regency.isPlaceholder, 'px-2': true }">
                                                        - {{ regency.regency_name }} <b v-if="!regency.isPlaceholder">({{ regency.responseRegency }})</b>
                                                    </li>
                                                    <br>
                                                </ul>
                                            </li>
                                            <div v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                                class="text-center col-span-2 mb-3">
                                                <a :href="route('location_surveys', [clientSlug, projectSlug, survey.id])" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Details click here
                                                </a>
                                            </div>
                                        </ul>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-xl" v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'">
                                            <div class="square" >
                                                {{ getSurveySubmissions(survey.id) }}/<b> {{ getSelectedProvinces(survey).total }}</b><br>
                                                <br>
                                            </div>
                                        </div>
                                        <div class="flex justify-center">
                                            <p v-if="survey.status == 0" class="w-24 bg-auto bg-red-100 text-red-800 text-xs font-medium rounded text-center mt-3 p-2">DITUTUP</p>
                                            <p v-if="survey.status == 1" class="w-24 bg-auto bg-green-100 text-green-800 text-xs font-medium rounded text-center mt-3 p-2">DIBUKA</p>
                                        </div>
                                    </td>
                                    <td class="px-6 py-6">
                                        <div class="grid grid-cols-2 gap-x-2 justify-center content-center">
                                            <div v-if="hasFilledSurvey(survey)"
                                                :class="props.user.current_team_id == 1 && props.user.usertype == 'user' ? 'col-span-2' : ''">
                                                <p class="text-center" :class="props.user.current_team_id != 1 || props.user.usertype == 'superadmin' ? 'mt-3': ''">Anda Sudah Mengisi Survey Ini</p>
                                            </div>
                                            <div class="m-auto" v-else-if="hasPubllish(survey) && !hasFilledSurvey(survey)"
                                                :class="props.user.current_team_id == 1 && props.user.usertype == 'user' ? 'col-span-2' : ''">
                                                <p class="text-center">Kuisioner Ditutup</p>
                                            </div>
                                            <NavLink v-else
                                                :href="props.user.biodata_id == null ? route('biodata', [clientSlug, projectSlug, survey.id, $page.props.auth.user.id]) : route('edit_bio', [clientSlug, projectSlug, survey.id, $page.props.auth.user.id])"
                                                class="w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:text-secondary focus:hover:!ring-secondary hover:!ring-secondary focus:!ring-secondary transition "
                                                :class="props.user.current_team_id == 1 && props.user.usertype == 'user' ? 'col-span-2' : ''">
                                                Isi Kuisioner
                                            </NavLink>

                                        <NavLink :href="route('response', [clientSlug, projectSlug, survey.id])" v-if="$page.props.auth.user.current_team_id !=1 || props.user.usertype == 'superadmin'"
                                            class="w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:text-secondary focus:hover:!ring-secondary hover:!ring-secondary focus:!ring-secondary transition ">
                                            Cek Respon
                                        </NavLink>
                                        
                                        <NavLink :href="route('question_surveys', [clientSlug, projectSlug, survey.id])"
                                            v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                            class="col-span-2 w-full flex justify-center py-2.5 text-white bg-primary rounded-md text-sm hover:bg-transparent hover:!text-primary transition">
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

<style scoped>
.square {
    width: 100px;
    height: 50px;
    border: 1px solid #6db445;
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
</style>
