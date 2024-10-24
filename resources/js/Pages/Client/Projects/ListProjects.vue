<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
import NavLinkBlue from '@/Components/NavLinkBlue.vue';
import HeaderText from '@/Components/HeaderText.vue';


const props = defineProps({ projects: Object, clients: Object })
const showDeleteModal = ref(false);
const selectedProjectId = ref(null);

const searchQuery = ref('');

const form = useForm({
    search: '',
});

/*
const hapus = (id) => {
    if (confirm('delete this Project and All Survey ')) {
        form.get(route('delete_project', id));
    }
};*/
const client = props.clients[0];
const clientSlug = client.slug;
const clientImage = client.image;

const hapus = (slug, id) => {
    selectedProjectId.value = id;
    showDeleteModal.value = true;
};

const confirmDeletion = () => {
    form.get(route('delete_project', [clientSlug, selectedProjectId.value]), {
        onFinish: () => {
            showDeleteModal.value = false;
        }
    })
}

const cancelDeletion = () => {
    showDeleteModal.value = false;
}
const filteredProjects = computed(() => {
    return props.projects.filter(projects => {
        return (
            projects.project_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            projects.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});

</script>

<template>
    <AppLayout title="List Project">
        <template #header>
            <HeaderText :href="route('listclient')">
                <span class="text-black">Client - </span>{{ client.client_name }}
            </HeaderText>
        </template>
        <main class="min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full flex items-center gap-x-5">
                        <NavLink :href="route('create_projects', clientSlug)"
                            v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                            class="bg-primary mb-0 text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-white hover:text-primary transition">
                            Add Project
                        </NavLink>
                    </div>
                    <div class="flex items-center px-4 py-2 text-sm w-60">
                        <input type="text" v-model="searchQuery"
                            class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Search">
                    </div>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <caption class="p-5 text-lg font-semibold rtl:text-right text-gray-900 bg-white text-center">
                            <img :src="`/img/${client.image}`" alt=""
                                class="h-60 w-full object-scale-down border-b-1 border-gray-400 mb-5">
                            {{ client['client_name'] }}
                            <p class="mt-1 mb-4 text-sm font-normal text-gray-500">
                                {{ client['desc'] }}
                            </p>
                            <div class="border-b-2 border-gray-300"></div>
                        </caption>
                        <thead class="text-xs text-white uppercase bg-primary">
                            <tr>
                                <th scope="col" class="px-6 py-3 w-1/4">Project Title</th>
                                <th scope="col" class="px-6 py-3">Description</th>
                                <th scope="col" class="px-6 py-3 md:w-1/5 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in filteredProjects" :key="project.id"
                                class="bg-white border-b hover:bg-gray-50">
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                    <a :href="route('listsurvey', [clientSlug, project.slug])"
                                        class="text-blue-600 hover:underline text-base">
                                        {{ project.project_name }}
                                    </a>
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500">
                                    {{ project.desc }}
                                </td>
                                <td class="px-6 py-6">
                                    <div v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                        class="flex justify-center">
                                        <a class="text-blue-600 p-3 hover:bg-gray-200 rounded-md"
                                            :href="route('edit_projects', [clientSlug, project.id])">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </a>

                                        <a class="text-red-600 cursor-pointer p-3 hover:bg-gray-200 rounded-md"
                                            @click="hapus(clientSlug, project.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
        <DeleteConfirmation :show="showDeleteModal" @confirm="confirmDeletion" @cancel="cancelDeletion" />
    </AppLayout>
</template>
