<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import axios from 'axios';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

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
axios.get(route('provinces.index')).then(response => {
    provinces.value = response.data;
});

// Fetch cities and regencies for a specific province
const fetchCitiesAndRegencies = async (provinceId, provinceIndex) => {
    try {
        const [cityResponse, regencyResponse] = await Promise.all([
            axios.get(route('cities.index', { province_id: provinceId })),
            axios.get(route('regencies.index', { province_id: provinceId })),
        ]);

        form.province_targets[provinceIndex].cities = cityResponse.data;
        form.province_targets[provinceIndex].regencies = regencyResponse.data;
    } catch (error) {
        console.error('Error fetching cities and regencies:', error);
    }
};

// Toggle province target and fetch cities/regencies
const toggleProvinceTarget = async (provinceId) => {
    const index = form.province_targets.findIndex(p => p.province_id === provinceId);

    if (index === -1) {
        const selectedProvince = provinces.value.find(province => province.id === provinceId);
        form.province_targets.push({
            province_id: provinceId,
            province_name: selectedProvince.name,
            target_response: '',
            target_response_regency: '',
            cities: [],
            regencies: [],
        });
        const newIndex = form.province_targets.length - 1;
        await fetchCitiesAndRegencies(provinceId, newIndex);
    } else {
        form.province_targets.splice(index, 1);
    }
};

// Handle submit
const submit = () => {
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
                    </div>

                    <div class="mt-4 relative">
                        <h3 class="text-center">Provinces:</h3>
                        <div class="grid grid-cols-3 mt-1 text-xs gap-2">
                            <div v-for="province in provinces" :key="province.id" class="flex items-center gap-0.5">
                                <input class="checked:text-primary checked:ring-primary focus:ring-primary" type="checkbox" :id="`province-${province.id}`" @change="toggleProvinceTarget(province.id)" />
                                <label :for="`province-${province.id}`" class="ml-2">{{ province.name }}</label>
                            </div>
                        </div>
                    </div>

                    <div v-for="(provinceTarget, index) in form.province_targets" :key="index" class="mt-4 relative">
                        <h4 class="text-primary font-semibold">{{ provinceTarget.province_name }}</h4>
                        <h5 class="text-primary">Target Response:</h5>
                        <TextInput v-model="provinceTarget.target_response" type="number" placeholder="Enter target response" class="w-full" />

                        <h3 class="text-center mt-5">Cities:</h3>
                        <div class="grid grid-cols-3 mt-1">
                            <div v-for="city in provinceTarget.cities" :key="city.id" class="flex items-center mb-2">
                                <div class="text-xs">
                                    <input type="checkbox" :id="`city-${city.id}`" @change="toggleCity(provinceTarget.province_id, city.id)" />
                                    <label :for="`city-${city.id}`" class="ml-2">{{ city.name }}</label>
                                </div>
                            </div>
                        </div>

                        <div v-for="cityTarget in provinceTarget.cities" :key="cityTarget.city_id">
                            <div v-if="cityTarget.showCityResponse">
                                <h4 class="mt-3 text-primary font-semibold">{{ cityTarget.city_name }}</h4>
                                <h5 class="text-primary">Target Response City:</h5>
                                <TextInput v-model="cityTarget.target_response_city" type="number" placeholder="Enter city's target response" class="w-full" />
                            </div>
                        </div>

                        <h3 class="text-center mt-5">Regencies:</h3>
                        <div class="grid grid-cols-3 mt-1">
                            <div v-for="regency in provinceTarget.regencies" :key="regency.id" class="flex items-center mb-2">
                                <div class="text-xs">
                                    <input type="checkbox" :id="`regency-${regency.id}`" @change="toggleRegency(provinceTarget.province_id, regency.id)" />
                                    <label :for="`regency-${regency.id}`" class="ml-2">{{ regency.name }}</label>
                                </div>
                            </div>
                        </div>

                        <div v-for="regencyTarget in provinceTarget.regencies" :key="regencyTarget.regency_id">
                            <div v-if="regencyTarget.showRegencyResponse">
                                <h4 class="mt-3 text-primary font-semibold">{{ regencyTarget.regency_name }}</h4>
                                <h5 class="text-primary">Target Response Regency:</h5>
                                <TextInput v-model="provinceTarget.target_response_regency" type="number" placeholder="Enter regency's target response" class="w-full" />
                                <InputError class="mt-2" :message="form.errors[`province_targets.${index}.target_response_regency`]" />
                            </div>
                        </div>
                    </div>

                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Add Survey
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
