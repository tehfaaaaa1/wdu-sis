<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
import NavLinkBlue from '@/Components/NavLinkBlue.vue';


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
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NavLink :href="route('listclient')" class="!py-0 focus:!rounded-sm focus:!ring-0 focus:!border-0 !m-0 hover:!ring-0 hover:underline !font-semibold !text-lg text-ijo-terang"><span class="text-black">Client&nbsp;</span> {{ client.client_name }}</NavLink> 
            </div>
        </template>
        <main class="min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full">
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
                            <img :src="`/img/${client.image}`" alt="" class="h-60 w-full object-scale-down border-b-1 border-gray-400 mb-5">
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
                                <!-- <th scope="col" class="px-6 py-3 w-1/6">Responses</th> -->
                                <!-- <th scope="col" class="px-6 py-3">Team</th> -->
                                <th scope="col" class="px-6 py-3 md:w-1/5 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in filteredProjects" :key="project.id"
                                class="bg-white border-b hover:bg-gray-50">
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                    {{ project.project_name }}
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500">
                                    {{ project.desc }}
                                </td>
                                <!-- <td class="px-6 py-4">
                                    100
                                </td> -->
                                <td class="px-6 py-6">
                                    <NavLinkBlue :href="route('listsurvey', [clientSlug, project.slug])"
                                        class="w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent focus:!ring-secondary transition">
                                        Lihat Kuisioner
                                    </NavLinkBlue>
                                    <div v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                        class="mt-5 text-center">
                                        <a class="font-medium text-blue-600 focus:outline-none focus:ring-2 focus:shadow-sm focus:ring-blue-500 py-1 focus:rounded-sm px-2 hover:underline mr-4"
                                            :href="route('edit_projects', [clientSlug, project.id])">Edit</a>

                                        <a class="font-medium text-red-600 hover:underline cursor-pointer"
                                            @click="hapus(clientSlug, project.id)">Hapus
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
