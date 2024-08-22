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
import { ref, computed } from 'vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';


const props = defineProps({
    surveys: Array,
    projects: Array,
    clients: Array
})
const form = useForm({
    search: '',
});

const submit = () => {
    form.get(route('surveys'));
};


const selectedSurveyId = ref(null);
const showDeleteModal = ref(false);

/*
const hapus = (slug, id) => {
    if (confirm('delete this survey')) {
        form.get(route('delete_surveys', slug, id));
    }
};
*/
const client = props.clients[0];
const clientSlug = client.slug;

const project = props.projects[0];
const projectSlug = project.slug;
const hapus = (id) => {
    selectedSurveyId.value = id;
    showDeleteModal.value = true;
}

const confirmDeletion = () => {
    form.get(route('delete_surveys', [projectSlug, selectedSurveyId.value]), {
        onFinish: () => {
            showDeleteModal.value = false;
        }
    })
}

const cancelDeletion = () => {
    showDeleteModal.value = false;
}

const searchQuery = ref('')
const filteredSurveys = computed(() => {
    return props.surveys.filter(surveys => {
        return (
            surveys.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            surveys.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});

</script>

<template>
    <AppLayout title="List Survey">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Survey Project {{ project.project_name }}
            </h2>
        </template>
        <main class="min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full">
                        <NavLink :href="route('create_surveys', [clientSlug, projectSlug])"
                            v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                            class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">
                            Add Survey
                        </NavLink>
                    </div>
                    <div class="flex items-center px-4 py-2 text-sm w-60">
                        <input type="text" v-model="searchQuery"
                            class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary"
                            placeholder="Search">
                    </div>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
                            <div class="flex justify-between w-full ">
                                <div>
                                    {{ project['project_name'] }}
                                    <p class="mt-1 mb-4 text-sm font-normal text-gray-500">
                                        {{ project['desc'] }}
                                    </p>                                
                                </div>
                                <div>
                                    <NavLink :href="route('projects', [clientSlug])"
                                        v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                        class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">
                                        Back to Project
                                    </NavLink>
                                </div>
                            </div>
                            <div class="border-b-2 border-gray-300"></div>
                        </caption>
                        <thead class="text-xs text-white uppercase bg-primary">
                            <tr>
                                <th scope="col" class="px-6 py-3 w-1/4">Survey Title</th>
                                <th scope="col" class="px-6 py-3">Description</th>
                                <th scope="col" class="px-6 py-3 w-1/6">Responses</th>
                                <!-- <th scope="col" class="px-6 py-3">Team</th> -->
                                <th scope="col" class="px-6 py-3 md:w-1/4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="survey in filteredSurveys" :key="survey.id"
                                class="bg-white border-b hover:bg-gray-50">
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                    {{ survey.title }}
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500">
                                    {{ survey.desc }}
                                </td>
                                <td class="px-6 py-4">
                                    100
                                </td>
                                <td class="px-6 py-6 grid grid-cols-2 gap-x-2 justify-center">
                                    <NavLink :href="route('submission_surveys', [clientSlug, projectSlug, survey.id])"
                                        :class="$page.props.auth.user.current_team_id === 1 && $page.props.auth.user.usertype === 'user' ? 'col-span-2' : ''"
                                        class="w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition hover:duration-200">
                                        Isi Survey
                                    </NavLink>
                                    <NavLink :href="route('submission_surveys', [clientSlug, projectSlug, survey.id])"
                                        v-if="$page.props.auth.user.current_team_id !== 1 || $page.props.auth.user.usertype !== 'user'"
                                        class="w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition hover:duration-200">
                                        Cek Respon
                                    </NavLink>
                                    <NavLink :href="route('submission_surveys', [clientSlug, projectSlug, survey.id])"
                                        v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                        class="col-span-2 w-full flex justify-center py-2.5 my-0 text-white bg-primary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition hover:duration-200">
                                        Tambah pertanyaan
                                    </NavLink>
                                    <div v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                        class="mt-5 text-center col-span-2">
                                        <a :href="route('edit_surveys', [clientSlug, projectSlug, survey.id])"
                                            class="font-medium text-blue-600 hover:underline mr-4">Edit</a>
                                        <a @click.prevent="hapus([clientSlug, projectSlug, survey.id])"
                                            class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
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
