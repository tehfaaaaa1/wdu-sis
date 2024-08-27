<script setup>
import { ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';


const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    response:Object,
    totalres:Object
});
const project = props.projects[0]
const client = props.clients[0]
const clientSlug = client.slug;
const projectSlug = project.slug;
console.log(projectSlug)
</script>

<template>
    <AppLayout title="Isi Survey">
        <main class="min-h-screen">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>a</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-500">
                        <p class="text-base text-justify line-clamp-3"></p>
                        <div class="p-5 mt-2 border-2 border-gray-400">
                            <h2 class="font-semibold text-lg">Summary</h2>
                            <p class="font-medium">{{ props.totalres }} Response</p>
                        </div>
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-auto">
                    <thead class="text-xs text-white uppercase bg-primary">
                        <tr>
                            <th scope="col" class="px-6 py-3 w-1/12">No.</th> 
                            <th scope="col" class="px-6 py-3">Nama</th>
                            <th scope="col" class="px-6 py-3">Email</th>
                            <!-- <th scope="col" class="px-6 py-3"></th> -->
                            <th scope="col" class="px-6 py-3">Wilayah/Daerah</th>
                            <th scope="col" class="px-6 py-3 md:w-1/6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(responses, index) in response" :key="index" class="bg-white border-b hover:bg-gray-50">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ index + 1 }}
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500">
                                {{responses.user.name}}
                            </td>
                                <td class="px-6 py-4">
                                {{ responses.user.email }}
                                </td>
                            <td class="px-6 py-4">
                                Futuh
                            </td>
                            <td class="px-6 py-4">
                                <a :href="route('report_surveys', [clientSlug, projectSlug, props.surveys.id, responses.id])"
                                class="font-medium text-blue-600 hover:underline mr-4">Lihat Hasil</a>
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
