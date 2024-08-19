<script setup>
import { ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';


const props = defineProps({ projects: Object, })

const searchQuery = ref('');

const hapus = (id) => {
    if (confirm('delete this Project')) {
        form.get(route('delete_project', id));
    }
};
console.log(props.projects)
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
    <AppLayout title="List Projects">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Projects
            </h2>
        </template>
        <main class="min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full">
                        <NavLink :href="route('create_projects')"
                            v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                            class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">
                            Add Projects
                        </NavLink>
                    </div>
                    <div class="flex items-center px-4 py-2 text-sm w-60">
                        <input type="text" v-model="searchQuery"
                            class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary"
                            placeholder="Search">
                    </div>
                </div>

                <!-- May need to make this a component -->
                <div class="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 content-stretch">
                    <div v-for="project in filteredProjects" :key="project.id"
                        class="grid grid-cols-1 gap-2 content-between rounded-md shadow-lg outline outline-2 outline-gray-300 h-auto bg-white mx-5 sm:mx-0">
                        <div class="">
                            <img :src="'../img/'+project.image" alt="" class="h-40 w-full object-cover ">
                            <div class="px-4 mt-3">  
                                <h1 class="text-xl mb-1 font-medium truncate">{{ project.project_name }}</h1>
                                <p class=" text-base text-justify line-clamp-3 leading-5 tracking-wide">
                                    {{ project.desc }}
                                </p>
                            </div>
                        </div>
                        <div class="pb-3 px-3 mx-5 sm:mx-0">
                            <div class="flex justify-center mt-3">
                                <PrimaryButton class=""
                                    :href="route('listsurvey', project.slug)">
                                    Check Project
                                </PrimaryButton>
                            </div>
                            <div v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                                class="relative inline-block text-left w-full">
                                <div class="flex justify-end">
                                    <Dropdown>
                                        <template #trigger>
                                            <div
                                                class="inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-pointer">
                                                <div class="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-6 right-0">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </template>
                                        <template #content>
                                            <div class="py-1">
                                                <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                                    :href="route('edit_projects', project.id)">Edit Project</a>

                                                <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                                    @click="hapus(project.id)" class="cursor-pointer">Hapus Project</a>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </AppLayout>
</template>
