<script setup>
import NavLinkBlue from '@/Components/NavLinkBlue.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    response: Object,
    totalres: Object,
    provinces: Array,
    cities: Array
});

const project = props.projects[0];
const client = props.clients[0];
const clientSlug = client.slug;
const projectSlug = project.slug;

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
            return { name: 'Unknown Province', response: '0', cities: [], regencies: [] };
        }
        const province = provinces.find(p => p.id === target.province_id);
        const provinceName = province ? province.name : 'Unknown Province';
        const targetResponse = target.target_response || '0';

        const cityList = target.cities ? target.cities.map(city => {
            const foundCity = props.cities ? props.cities.find(c => c.id === city.city_id) : null;
            const cityName = foundCity ? foundCity.name : 'No name for City';
            return {
                name: cityName,
                response: city.target_response_city || '0'
            };
        }) : [];

        const regencyList = target.regencies ? target.regencies.map(regency => {
            return {
                name: `Regency ID ${regency.regency_id}`,
                response: regency.target_response_regency || '0'
            };
        }) : [];

        return { name: provinceName, response: targetResponse, cities: cityList, regencies: regencyList };
    });

    return { list: provinceList, total: totalTargetResponse };
};

</script>

<template>
    <AppLayout title="Monitor Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-ijo-terang text-white rounded-t-md">
                    <h2>{{ props.surveys.title }}</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-500">
                        <p class="text-base text-justify line-clamp-3"></p>
                        <div class="p-5 mt-2 border-2 border-gray-400">
                            <div class="flex justify-between items-center w-full">
                                <h2 class="font-semibold text-lg">Summary</h2>
                                <NavLinkBlue :href="route('allreport', [clientSlug, projectSlug, props.surveys.id])"
                                    class="bg-secondary text-white">
                                    Lihat Statistik
                                </NavLinkBlue>
                            </div>
                            <p class="font-medium">Wilayah:</p>
                            <ul>
                                <li v-for="(province, index) in getSelectedProvinces(props.surveys, props.provinces).list"
                                    :key="index">
                                    {{ province.name }} ({{ province.response }})
                                    <ul>
                                        <li v-for="(city, cityIndex) in province.cities" :key="cityIndex">
                                            - {{ city.name }} ({{ city.response }})
                                        </li>
                                        <li v-for="(regency, regencyIndex) in province.regencies" :key="regencyIndex">
                                            - {{ regency.name }} ({{ regency.response }})
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <br>
                            <p class="font-medium">Respon:</p>
                            <p>{{ props.totalres }} / {{ getSelectedProvinces(props.surveys, props.provinces).total }}</p>
                            <br>
                            <p class="font-medium">Status: <b>{{ props.surveys.status ? 'DIBUKA' : 'DITUTUP' }}</b></p>
                            <a :href="route('export-response', [clientSlug, projectSlug, props.surveys.id])"
                                class="text-blue-500 underline hover:text-blue-600">Export List Response</a>
                        </div>
                    </div>
                    <div class="relative overflow-x-auto shadow-md mt-4">
                        <h3 class="text-center mb-3 text-xl font-semibold">List Respon</h3>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-auto">
                            <thead class="text-xs text-white uppercase bg-primary">
                                <tr>
                                    <th scope="col" class="px-6 py-3 w-1/12">No.</th>
                                    <th scope="col" class="px-6 py-3">Nama</th>
                                    <th scope="col" class="px-6 py-3">Email</th>
                                    <th scope="col" class="px-6 py-3">Wilayah/Daerah</th>
                                    <th scope="col" class="px-6 py-3 md:w-1/5 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(responses, index) in response" :key="index"
                                    class="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500">
                                        {{ responses.user.name }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ responses.user.email }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ responses.user.biodata ? responses.user.biodata.alamat : 'Tidak ada alamat' }}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <a :href="route('report_surveys', [clientSlug, projectSlug, props.surveys.id, responses.id])"
                                            class="font-medium text-center text-blue-600 hover:underline py-1 px-2 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-blue-500 focus:shadow-sm">Lihat
                                            Hasil</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
