<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import axios from 'axios';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
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
    province_targets: [], // This will hold cities, regencies, and their province_id
});

const provinces = ref([]);
const cities = ref([]);
const regencies = ref([]);
const selectedProvince = ref(null);

// Fetch provinces on load
axios.get(route('provinces.index')).then(response => {
    provinces.value = response.data;
});

// Fetch cities and regencies when a province is selected
const fetchCitiesAndRegencies = (provinceId) => {
    // Clear cities and regencies list before fetching new ones
    cities.value = [];
    regencies.value = [];
    
    axios.get(route('cities.index', { province_id: provinceId }))
        .then(response => {
            cities.value = response.data;
        })
        .catch(error => {
            console.error('Error fetching cities:', error);
        });

    axios.get(route('regencies.index', { province_id: provinceId }))
        .then(response => {
            regencies.value = response.data;
        })
        .catch(error => {
            console.error('Error fetching regencies:', error);
        });
};

// Toggle the selected province and fetch cities/regencies
const toggleProvinceTarget = (provinceId) => {
    const index = form.province_targets.findIndex(p => p.province_id === provinceId);
    if (index === -1) {
        const selected = provinces.value.find(province => province.id === provinceId);
        form.province_targets.push({
            province_id: provinceId,
            target_response: '',
            province_name: selected.name,
            cities: [], // For storing selected cities
            regencies: [] // For storing selected regencies
        });
        selectedProvince.value = provinceId;
        fetchCitiesAndRegencies(provinceId);  // Fetch the related cities and regencies
    } else {
        form.province_targets.splice(index, 1);
        selectedProvince.value = null;
        // Clear cities and regencies list after deselecting the province
        cities.value = [];
        regencies.value = [];
    }
};

// Toggle city selection for the province
const toggleCity = (provinceId, cityId) => {
    const provinceIndex = form.province_targets.findIndex(p => p.province_id === provinceId);
    const cityIndex = form.province_targets[provinceIndex].cities.indexOf(cityId);

    if (cityIndex === -1) {
        form.province_targets[provinceIndex].cities.push(cityId);
    } else {
        form.province_targets[provinceIndex].cities.splice(cityIndex, 1);
    }
};

// Toggle regency selection for the province
const toggleRegency = (provinceId, regencyId) => {
    const provinceIndex = form.province_targets.findIndex(p => p.province_id === provinceId);
    const regencyIndex = form.province_targets[provinceIndex].regencies.indexOf(regencyId);

    if (regencyIndex === -1) {
        form.province_targets[provinceIndex].regencies.push(regencyId);
    } else {
        form.province_targets[provinceIndex].regencies.splice(regencyIndex, 1);
    }
};

// Submit form
const submit = () => {
    form.post(route('create_survey', [form.client_slug, form.project_slug]), {
        data: {
            title: form.title,
            desc: form.desc,
            project_id: form.project_id,
            province_targets: form.province_targets,
        },
    });
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
                        <div class="grid grid-rows-13 grid-flow-col text-xs">
                            <div v-for="province in provinces" :key="province.id" class="flex items-center mb-2">
                                <input class="checked:text-primary checked:ring-primary focus:ring-primary" type="checkbox" :id="`province-${province.id}`" @change="toggleProvinceTarget(province.id)" />
                                <label :for="`province-${province.id}`" class="ml-2">{{province.name}}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Cities and Regencies checkboxes for selected provinces -->
                    <div v-for="(provinceTarget, index) in form.province_targets" :key="index" class="mt-4 relative">
                        <h4 class="text-primary font-semibold">{{ provinceTarget.province_name }}</h4>

                        <!-- Cities Checkboxes -->
                        <h5 class="mt-2 text-primary">Select Cities:</h5>
                        <div v-for="city in cities" :key="city.id" class="flex items-center mb-2">
                            <input type="checkbox" :id="`city-${city.id}`" @change="toggleCity(provinceTarget.province_id, city.id)" />
                            <label :for="`city-${city.id}`" class="ml-2">{{ city.name }}</label>
                        </div>

                        <!-- Regencies Checkboxes -->
                        <h5 class="mt-4 text-primary">Select Regencies:</h5>
                        <div v-for="regency in regencies" :key="regency.id" class="flex items-center mb-2">
                            <input type="checkbox" :id="`regency-${regency.id}`" @change="toggleRegency(provinceTarget.province_id, regency.id)" />
                            <label :for="`regency-${regency.id}`" class="ml-2">{{ regency.name }}</label>
                        </div>

                        <PrimaryButton class="w-half align-right mt-2" :class="{ 'opacity-25': form.processing}" :disabled="form.processing">
                            Update Target
                        </PrimaryButton>
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
