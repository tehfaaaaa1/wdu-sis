<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';

const { props } = usePage();
const client = props.client;
const projects = props.project;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

const clientSlug = client.slug;
</script>

<template>
    <AppLayout title="Profile Client">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Profile Client - {{ client.client_name }}
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="py-12 bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto flex flex-col items-center">
                    <img :src="`/img/${client.image}`" alt="" class="h-60 w-full object-scale-down border-b-1 border-gray-400">
                    <div class="mx-4 px-4 mt-3 py-5">
                        <p class="text-base text-justify line-clamp-3 leading-5 tracking-wide">
                            {{ client.desc }}
                        </p>

                        <div class="mt-5 grid grid-cols-2 gap-2">
                            <div>Instansi</div>
                            <div class="font-bold">{{ client.client_name }}</div>
                            <div>Alamat</div>
                            <div class="font-bold">{{ client.alamat }}</div>
                            <div>Tanggal Tender</div>
                            <div class="font-bold">{{ formatDate(client.date) }}</div>
                            <div>Project</div>
                            <ul class="list-decimal mx-4">
                                <li v-for="project in projects" :key="project.id" class="mb-2">
                                    <div class="flex items-center space-x-2">
                                        <strong>{{ project.project_name }}</strong>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        {{ project.desc }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        Tanggal: {{ formatDate(project.created_at) }}
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
 