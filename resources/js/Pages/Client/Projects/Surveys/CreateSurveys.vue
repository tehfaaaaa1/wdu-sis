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
    province_targets: [],
    city_id: '',
    regency_id: '',
});

const provinces = ref([]);

axios.get(route('provinces.index')).then(response => {
    provinces.value = response.data;
});

const toggleProvinceTarget = (provinceId) => {
    const index = form.province_targets.findIndex(p => p.province_id === provinceId);
    if (index === -1) {
        const selectedProvince = provinces.value.find(province => province.id === provinceId);
        form.province_targets.push({ province_id: provinceId, target_response: '', province_name: selectedProvince.name });
    } else {
        form.province_targets.splice(index, 1); // Remove if unchecked
    }
};

const submit = () => {
    form.post(route('create_survey', [form.client_slug, form.project_slug]), {
        data: {
            title: form.title,
            desc: form.desc,
            project_id: form.project_id,
            city_id: form.city_id,
            regency_id: form.regency_id,
            province_targets: form.province_targets,
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
                    <div class="mt-4 relative">
                        <InputLabel for="province_id" />
                        <select v-model="form.province_id" class="block w-full rounded-md shadow-sm">
                            <option value="">Select Province</option>
                            <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
                        </select>
                        <InputError class="mt-2" :message="form.errors.province_id" />
                    </div>
                    
                    <div class="mt-4 relative">
                        <InputLabel for="target_response" />
                        <TextInput id="target_response" v-model="form.target_response" type="number" placeholder="Target Response" required autofocus autocomplete="target_response" />
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
