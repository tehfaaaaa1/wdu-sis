<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';

// Define props to receive data
const props = defineProps({
    projects: Array,
    clients: Array,
    provinces: Array,
    cities: Array,
    regencies: Array
});

// Extract project and client
const project = props.projects[0];
const client = props.clients[0];

// Form setup
const form = useForm({
    title: '',
    desc: '',
    target_response: '',
    project_id: project['id'],
    project_slug: project['slug'],
    client_slug: client['slug'],
    selectedProvince: '',
    selectedCity: '',
    selectedRegency: '',
});

// Reactive properties
const provinces = ref(props.provinces);
const cities = ref([]);
const regencies = ref([]);
const selectedProvince = ref('');
const selectedCity = ref('');

// Watch for changes in selectedProvince to update cities
watch(() => form.selectedProvince, (provinceId) => {
    if (provinceId) {
        // Update cities based on selected province
        cities.value = props.cities.filter(city => city.province_id === provinceId);
        selectedCity.value = ''; // Reset city and regency selections
        form.selectedCity = '';
        regencies.value = [];
    }
});

// Watch for changes in selectedCity to update regencies
watch(() => form.selectedCity, (cityId) => {
    if (cityId) {
        // Update regencies based on selected city
        regencies.value = props.regencies.filter(regency => regency.city_id === cityId);
        form.selectedRegency = ''; // Reset regency selection
    }
});

// Handle form submission
const submit = () => {
    form.post(route('create_survey', [form.client_slug, form.project_slug]), {
        data: {
            target_response: form.target_response,
            selectedProvince: form.selectedProvince,
            selectedCity: form.selectedCity,
            selectedRegency: form.selectedRegency,
        },
    });
};
</script>

<template>
    <AppLayout title="Create Survey">
        <div class="px-4">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New Survey</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="title" />
                        <TextInput id="title" v-model="form.title" type="text" placeholder="Title" required autofocus autocomplete="title" />
                        <InputError class="mt-2" :message="form.errors.title" />
                    </div>
                    <div class="mt-4 relative">
                        <textarea id="desc" v-model="form.desc" placeholder="Description" required autocomplete="desc"
                            class="block placeholder-primary w-full h-28 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        <InputError class="mt-2" :message="form.errors.desc" />
                    </div>
                    <div class="mt-4 relative">
                        <InputLabel for="target_response" />
                        <TextInput id="target_response" v-model="form.target_response" type="number" placeholder="Target Responden" required autofocus autocomplete="target_response" />
                        <InputError class="mt-2" :message="form.errors.target_response" />
                    </div>
                    <div class="mt-4 relative">
                        <InputLabel for="province" />
                        <Dropdown id="province" :options="provinces" v-model="form.selectedProvince" placeholder="Select Province" />
                    </div>
                    <div v-if="cities.length > 0" class="mt-4 relative">
                        <InputLabel for="city" />
                        <Dropdown id="city" :options="cities" v-model="form.selectedCity" placeholder="Select City" />
                    </div>
                    <div v-if="regencies.length > 0" class="mt-4 relative">
                        <InputLabel for="regency" />
                        <Dropdown id="regency" :options="regencies" v-model="form.selectedRegency" placeholder="Select Regency" />
                    </div>
                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Add Survey
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </div>
    </AppLayout>
</template>
