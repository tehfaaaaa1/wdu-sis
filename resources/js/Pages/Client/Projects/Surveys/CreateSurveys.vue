<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import axios from 'axios';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    projects: Array,
    clients: Array,
});

const form = useForm({
    title: '',
    desc: '',
    project_id: props.projects[0]?.id || null,
    project_slug: props.projects[0]?.slug || null,
    client_slug: props.clients[0]?.slug || null,
    province_targets: [],
});

const provinces = ref([]);

// Fetch provinces
axios.get(route('provinces.index')).then(response => {
    provinces.value = response.data;
});

// Fetch cities and regencies for a selected province
const fetchCitiesAndRegencies = async (provinceId, provinceIndex) => {
    try {
        const [cityResponse, regencyResponse] = await Promise.all([
            axios.get(route('cities.index', { province_id: provinceId })),
            axios.get(route('regencies.index', { province_id: provinceId })),
        ]);

        form.province_targets[provinceIndex].cities = cityResponse.data.map(city => ({
            city_id: city.id,
            city_name: city.name,
            target_response_city: '',
            showCityResponse: false,
        }));

        form.province_targets[provinceIndex].regencies = regencyResponse.data.map(regency => ({
            regency_id: regency.id,
            regency_name: regency.name,
            target_response_regency: '',
            showRegencyResponse: false,
        }));
    } catch (error) {
        console.error('Error fetching cities and regencies:', error);
    }
};

const toggleProvinceTarget = async (provinceId) => {
    const index = form.province_targets.findIndex(p => p.province_id === provinceId);

    if (index === -1) {
        const selectedProvince = provinces.value.find(province => province.id === provinceId);
        form.province_targets.push({
            province_id: provinceId,
            province_name: selectedProvince.name,
            target_response: '',
            cities: [],
            regencies: [],
            showCityRegency: false,
        });
        const newIndex = form.province_targets.length - 1;
        await fetchCitiesAndRegencies(provinceId, newIndex);
    } else {
        form.province_targets.splice(index, 1);
    }
};

const toggleCityRegency = (provinceTarget) => {
    provinceTarget.showCityRegency = !provinceTarget.showCityRegency;

    if (!provinceTarget.showCityRegency) {
        provinceTarget.cities.forEach(city => {
            city.target_response_city = city.target_response_city || ''; 
        });
        provinceTarget.regencies.forEach(regency => {
            regency.target_response_regency = regency.target_response_regency || '';
        });
    }
};

const toggleCity = (provinceId, cityId) => {
    const provinceTarget = form.province_targets.find(p => p.province_id === provinceId);
    const cityTarget = provinceTarget.cities.find(city => city.city_id === cityId);

    cityTarget.showCityResponse = !cityTarget.showCityResponse;

    if (!cityTarget.showCityResponse) {
        cityTarget.target_response_city = cityTarget.target_response_city || ''; 
    }
};


const toggleRegency = (provinceId, regencyId) => {
    const provinceTarget = form.province_targets.find(p => p.province_id === provinceId);
    const regencyTarget = provinceTarget.regencies.find(regency => regency.regency_id === regencyId);
    
    regencyTarget.showRegencyResponse = !regencyTarget.showRegencyResponse;

    if (!regencyTarget.showRegencyResponse) {
        regencyTarget.target_response_regency = regencyTarget.target_response_regency || '';  
    }
};

const updateProvinceTargetResponse = (provinceTarget) => {
    const totalCityResponse = provinceTarget.cities.reduce((acc, city) => {
        return acc + (city.showCityResponse ? Number(city.target_response_city) : 0);
    }, 0);

    const totalRegencyResponse = provinceTarget.regencies.reduce((acc, regency) => {
        return acc + (regency.showRegencyResponse ? Number(regency.target_response_regency) : 0);
    }, 0);

    const cityRegencyTotal = totalCityResponse + totalRegencyResponse;

    if (cityRegencyTotal > 0) {
        provinceTarget.target_response = cityRegencyTotal;
    }
};

watch(form.province_targets, (newTargets) => {
    newTargets.forEach(updateProvinceTargetResponse);
}, { deep: true });

const submit = () => {
    const selectedProvinceTargets = form.province_targets.map(province => ({
        province_id: province.province_id,
        target_response: province.target_response,
        cities: province.cities.filter(city => city.showCityResponse).map(city => ({
            city_id: city.city_id,
            target_response_city: city.target_response_city,
        })),
        regencies: province.regencies.filter(regency => regency.showRegencyResponse).map(regency => ({
            regency_id: regency.regency_id,
            target_response_regency: regency.target_response_regency,
        })),
    }));

    form.province_targets = selectedProvinceTargets;

    form.post(route('create_survey', [form.client_slug, form.project_slug]));
};
</script>


<template>
    <AppLayout title="Create Survey">
        <div class="mt-6 sm:mt-1 px-1">
            <div class="w-full sm:max-w-lg mt-6 mb-6 px-6 py-4 bg-white border-2 mx-auto shadow-md overflow-hidden sm:rounded-lg">
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New Survey</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="title" />
                        <TextInput id="title" v-model="form.title" type="text" placeholder="Title" required autofocus autocomplete="title" />
                        <InputError class="mt-2" :message="form.errors.title" />
                    </div>
                    
                    <div class="mt-4 relative">
                        <textarea id="desc" v-model="form.desc" placeholder="Description" required autocomplete="desc"
                            class="block text-primary placeholder-primary w-full h-28 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        <InputError class="mt-2" :message="form.errors.desc" />
                    </div>
                    
                    <div class="mt-4 relative">
                        <h2 class="text-primary font-semibold text-1xl text-left">Survey Target:</h2>
                        <p class="text-gray-500 text-xs">*Pilihlah lokasi target survei beserta jumlah target survei berdasarkan provinsi.</p>
                        <p class="text-gray-500 text-xs mb-5">*Apabila dipilih berdasarkan Kota/Kabupaten, selanjutnya pilih <b>"Add Cities/Regencies"</b> tanpa mengisi jumlah target survei provinsi.</p>
                    </div>

                    <div class="mt-4 relative">
                        <h3 class="text-center">Provinces:</h3>
                        <div class="grid grid-cols-3 mt-1 text-xs gap-2">
                            <div v-for="province in provinces" :key="province.id" class="flex items-center gap-0.5">
                                <input class="checked:text-primary checked:ring-primary focus:ring-primary" type="checkbox" :id="`province-${province.id}`" @change="toggleProvinceTarget(province.id)" />
                                <label :for="`province-${province.id}`" class="ml-2">{{province.name}}</label>
                            </div>
                        </div>
                    </div>

                    <div v-for="(provinceTarget, index) in form.province_targets" :key="provinceTarget.province_id" class="mt-4 relative">
                        <h4 class="text-primary font-semibold">{{ provinceTarget.province_name }}</h4>
                        <h5 class="text-primary text-sm">Target Response:</h5>
                        
                        <div class="flex items-center space-x-4">
                            <TextInput 
                                v-model="provinceTarget.target_response" 
                                type="number" 
                                placeholder="Target response for province" 
                                class="w-full h-10" 
                                :readonly="provinceTarget.cities.some(city => city.showCityResponse) || provinceTarget.regencies.some(regency => regency.showRegencyResponse)" 
                            />

                            <div class="text-right">
                                <SecondaryButton @click="toggleCityRegency(provinceTarget)" type="button" class="h-10 flex items-center justify-center text-xs">
                                    {{ provinceTarget.showCityRegency ? 'Hide Cities/Regencies' : 'Show Cities/Regencies' }}
                                </SecondaryButton>
                            </div>
                        </div>
                        <div v-if="provinceTarget.showCityRegency">
                            <h3 class="text-center mt-5">Cities:</h3>
                            <div class="grid grid-cols-3 mt-1">
                                <div v-for="city in provinceTarget.cities" :key="city.city_id" class="flex items-center mb-2">
                                    <div class="text-xs">
                                        <input type="checkbox" :id="`city-${city.city_id}`" @change="toggleCity(provinceTarget.province_id, city.city_id)" :checked="city.showCityResponse" />
                                        <label :for="`city-${city.city_id}`" class="ml-2">{{ city.city_name }}</label>
                                    </div>
                                </div>
                            </div>

                            <div v-for="cityTarget in provinceTarget.cities" :key="cityTarget.city_id">
                                <div v-if="cityTarget.showCityResponse">
                                    <h4 class="text-primary font-semibold mt-2">{{ cityTarget.city_name }}</h4>
                                    <h5 class="text-primary text-sm">Target Response City:</h5>
                                    <TextInput 
                                        id="city-response" 
                                        v-model="cityTarget.target_response_city" 
                                        type="number" 
                                        class="w-full" 
                                    />
                                </div>
                            </div>

                            <h3 class="text-center mt-5">Regencies:</h3>
                            <div class="grid grid-cols-3 mt-1">
                                <div v-for="regency in provinceTarget.regencies" :key="regency.regency_id" class="flex items-center mb-2">
                                    <div class="text-xs">
                                        <input type="checkbox" :id="`regency-${regency.regency_id}`" @change="toggleRegency(provinceTarget.province_id, regency.regency_id)" :checked="regency.showRegencyResponse" />
                                        <label :for="`regency-${regency.regency_id}`" class="ml-2">{{ regency.regency_name }}</label>
                                    </div>
                                </div>
                            </div>

                            <div v-for="regencyTarget in provinceTarget.regencies" :key="regencyTarget.regency_id">
                                <div v-if="regencyTarget.showRegencyResponse">
                                    <h5 class="text-primary text-sm">Target Response Regency:</h5>
                                    <TextInput 
                                        id="regency-response" 
                                        v-model="regencyTarget.target_response_regency" 
                                        type="number" 
                                        class="w-full" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">Save</PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
input[readonly]{
    background-color: #d3d3d3;
    opacity: 1;
    cursor: default;
}
</style>