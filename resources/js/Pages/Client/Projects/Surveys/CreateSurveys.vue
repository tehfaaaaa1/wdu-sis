<script setup>
import { ref, watch } from 'vue';
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
    target_response: '',
    project_id: props.projects[0]?.id || null,
    project_slug: props.projects[0]?.slug || null,
    client_slug: props.clients[0]?.slug || null,
    province_id: '',
    city_id: '',
    regency_id: ''
});

const provinces = ref([]);
//const cities = ref([]);
//const regencies = ref([]);

axios.get(route('provinces.index')).then(response => {
    provinces.value = response.data;
});

watch(() => form.province_id, (newProvinceId) => {
    if (newProvinceId) {
        const selectedProvince = provinces.value.find(province => province.id === newProvinceId);
        form.target_response = selectedProvince ? selectedProvince.target_response : '';
    }
});

const submit = () => {
    form.post(route('create_survey', [form.client_slug, form.project_slug]), {
        data: {
            target_response: form.target_response,
            province_id: form.province_id
        },
    });
};
</script>

<template>
    <AppLayout title="Create Survey">
        <div class="mt-6 sm:mt-1 px-1">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New Survey</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="title" />
                        <TextInput id="title" v-model="form.title" type="text" placeholder="Title" required autofocus
                            autocomplete="title" />
                        <InputError class="mt-2" :message="form.errors.title" />
                    </div>

                    <div class="mt-4 relative">
                        <textarea id="desc" v-model="form.desc" placeholder="Description" required autocomplete="desc"
                            class="block text-primary placeholder-primary w-full h-28 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                        <InputError class="mt-2" :message="form.errors.desc" />
                    </div>

                    <div class="mt-4 relative">
                        <h2 class="text-primary font-semibold text-1xl text-left mb-1">Survey Target:</h2>
                    </div>
                    <div class="mt-4 relative flex items-center" v-for="province in provinces" :key="province.id">
                        <input type="checkbox" :value="province.id" :id="'province-' + province.id">
                        <label :for="'province-' + province.id" class="px-2">{{ province.name }}</label>
                        <InputError class="mt-2" :message="form.errors.province_id" />
                    </div>

                    <div class="mt-4 relative">
                        <InputLabel for="target_response" />
                        <TextInput id="target_response" v-model="form.target_response" type="number"
                            placeholder="Target Response" required autofocus autocomplete="target_response" />
                        <InputError class="mt-2" :message="form.errors.target_response" />
                    </div>

                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Add Survey
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </div>
    </AppLayout>
</template>
