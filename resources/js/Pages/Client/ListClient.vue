<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';


const props = defineProps({ clients: Object, })
const showDeleteModal = ref(false);
const selectedClientId = ref(null);

const searchQuery = ref('');

const form = useForm({
    search: '',
});

const hapus = (id) => {
    selectedClientId.value = id;
    showDeleteModal.value = true;
};

const confirmDeletion = () => {
    form.get(route('delete_client', selectedClientId.value), {
        onFinish: () => {
            showDeleteModal.value = false;
        }
    })
}

const cancelDeletion = () => {
    showDeleteModal.value = false;
}


const filteredClients = computed(() => {
    return props.clients.filter(clients => {
        return (
            clients.client_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            clients.alamat.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            clients.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});

</script>

<template>
    <AppLayout title="List Clients">
        <!-- <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Client
            </h2>
        </template> -->
        <main class="min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full">
                        <NavLink :href="route('create_client_page')"
                            v-if="$page.props.auth.user.usertype === 'admin' || $page.props.auth.user.usertype === 'superadmin'"
                            class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-white hover:text-primarytransition">
                            Add Clients
                        </NavLink>
                    </div>
                    <div class="flex items-center px-4 py-2 text-sm w-60">
                        <input type="text" v-model="searchQuery"
                            class="w-full me-3 border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring-1 focus:ring-primary focus:border-primary"
                            placeholder="Search">
                    </div>
                </div>

                <div
                    class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center content-stretch">
                    <div v-for="client in filteredClients" :key="client.id"
                        :class="client.id == $page.props.auth.user.client_id || $page.props.auth.user.usertype === 'superadmin' ? 'grid grid-cols-1 gap-2 content-between rounded-md shadow-lg outline outline-2 outline-gray-300 h-auto bg-white mx-5 sm:mx-0' : 'hidden'">
                        <div class="">
                            <img :src="'../img/' + client.image" alt=""
                                class="h-40 w-full object-scale-down border-b-1 border-gray-400">
                            <div class="px-4 mt-3">
                                <h1 class="text-xl mb-1 font-medium truncate">{{ client.client_name }}</h1>
                                <div class="flex items-center mb-1.5 gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-5 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <h1 class="text-base font-medium truncate text-gray-500">{{ client.alamat }}
                                    </h1>
                                </div>
                                <p
                                    class="text-lg md:text-base text-justify line-clamp-3 leading-5 tracking-wide text-gray-600">
                                    {{ client.desc }}
                                </p>
                            </div>
                        </div>
                        <div class="pb-3 px-3 mx-5 sm:mx-0">
                            <div class="flex justify-center mt-3">
                                <NavLink
                                    class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-white hover:text-primary hover:border-primary transition mr-4"
                                    :href="route('profile_client', client.id)">
                                    Profile
                                </NavLink>
                                <NavLink
                                    class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-white hover:text-primary hover:border-primary transition"
                                    :href="route('projects', client.slug)">
                                    See Projects
                                </NavLink>
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
                                                <a :class="'text-gray-700 block px-4 py-2 text-sm'"
                                                    :href="route('edit_client', client.id)">Edit Client</a>

                                                <a :class="'text-gray-700 block px-4 py-2 text-sm'"
                                                    @click="hapus(client.id)" class="cursor-pointer">Delete Client</a>
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
        <DeleteConfirmation :show="showDeleteModal" @confirm="confirmDeletion" @cancel="cancelDeletion" />
    </AppLayout>
</template>
