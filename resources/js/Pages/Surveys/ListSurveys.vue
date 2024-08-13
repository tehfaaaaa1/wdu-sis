<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';

defineProps({surveys: Object})
const form = useForm({
    search: '',
});

const submit = () => {
    form.get(route('surveys'));
};

const hapus = (id) => {
    if (confirm('delete this survey')) {
        form.get(route('delete_surveys', id));
    }
};
</script>

<template>
    <AppLayout title="List Survey">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Surveys
            </h2>
        </template>
        <main class="min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between mb-5">
                    <div class="w-1/2 sm:w-full">
                        <NavLink :href="route('create_surveys')" 
                            class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">Add Survey
                        </NavLink>
                    </div>
                    <form @submit.prevent="submit">
                        <div class="flex justify-center">
                            <TextInput name="search" id="search" v-model="form.search" placeholder="Search" class="rounded-r-none text-sm border-primary text-center"/>
                            <PrimaryButton class="w-full rounded-r-md rounded-l-none justify-center px-0" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5   stroke-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>                        
                            </PrimaryButton> 
                        </div>
                    </form>
                </div>
            </div>
            <div class="container mx-auto flex flex-wrap justify-center lg:justify-evenly xl:justify-between gap-5">
                <div v-for="survey in surveys" class="rounded-md shadow-lg outline outline-2 outline-gray-300 w-full md:w-330 px-5 py-4 bg-white mx-5 sm:mx-0">
                    <h1 class="text-2xl text-center mb-2 font-medium">{{ survey.title }}</h1>
                    <p class="my-3 text-base text-justify line-clamp-3">
                        {{survey.desc}}
                    </p>  
                    <p class="text-center text-gray-600 mb-3 text-sm">
                       Created at:  {{ survey.created_at }}
                    </p>
                    <p class="text-center text-gray-600 mb-3 text-sm">
                       Updated at:  {{ survey.updated_at }}
                    </p>
                    <div class="flex justify-center">
                        <button class="p-3 px-6 bg-secondary text-white rounded-md text-sm hover:bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200">
                            Check Survey
                        </button>
                    </div>
                    <div class="relative inline-block text-left w-full">
                        <div class="flex justify-end">
                            <Dropdown>
                                <template #trigger>
                                    <div class="inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                                        <div class="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 right-0">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </template>
                                <template #content>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Jawaban</a>

                                            <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" :href="route('edit_surveys',survey.id)">Edit Surveys</a>

                                            <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click="hapus(survey.id)" class="cursor-pointer">Hapus Surveys</a>
                                        </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        
    </AppLayout>
</template>
