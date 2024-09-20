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
    province_targets: [], // Start empty
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
                        <TextInput id="title" v-model="form.title" type="text" placeholder="Title" required autofocus autocomplete="title" />
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
                        <h3>Select Provinces:</h3>
                        <div class="grid grid-rows-13 grid-flow-col">
                            <div v-for="province in provinces" :key="province.id" class="flex items-center mb-2">
                                <input  class="checked:text-primary checked:ring-primary focus:ring-primary" type="checkbox" :id="`province-${province.id}`" @change="toggleProvinceTarget(province.id)" />
                                <label :for="`province-${province.id}`" class="ml-2">{{province.name}}</label>
                            </div>
                        </div>
                    </div>

                    <div v-for="(provinceTarget, index) in form.province_targets" :key="index" class="mt-4 relative">
                        <h4 class="text-primary font-semibold">{{ provinceTarget.province_name }}</h4>
                        <div class="mt-2">
                            <InputLabel :for="`target_response_${provinceTarget.province_id}`" />
                            <TextInput :id="`target_response_${provinceTarget.province_id}`" v-model="provinceTarget.target_response" type="number" placeholder="Target Response" required />
                            <InputError class="mt-2" :message="form.errors.province_targets?.[index]?.target_response" />
                        </div>
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
