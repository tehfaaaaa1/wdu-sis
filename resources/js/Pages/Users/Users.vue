<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
import { useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    users: Array,
});

const form = useForm({});
const showDeleteModal = ref(false);
const selectedUserId = ref(null);
const searchQuery = ref('');

const hapus = (id) => {
    selectedUserId.value = id;
    showDeleteModal.value = true;
};

const confirmDeletion = () => {
    form.get(route('delete_user', selectedUserId.value), {
        onFinish: () => {
            showDeleteModal.value = false;
        }
    });
};

const cancelDeletion = () => {
    showDeleteModal.value = false;
};

const filteredUsers = computed(() => {
    return props.users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.usertype.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.team.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.client.toLowerCase().includes(searchQuery.value.toLocaleLowerCase())
        );
    });
});
</script>


<template>
    <AppLayout title="Users">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Users
            </h2>
        </template>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center mx-3 mb-6">
                <div class="w-1/2 sm:w-full">
                    <NavLink :href="route('users.create')"
                        class="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">
                        Add User
                    </NavLink>
                </div>
                <div class="flex items-center px-4 py-2 text-sm">
                    <input type="text" v-model="searchQuery" class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Search">
                </div>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-fixed">
                    <thead class="text-xs text-white uppercase bg-primary">
                        <tr>
                            <th scope="col" class="px-6 py-3">Name</th>
                            <th scope="col" class="px-6 py-3">Email</th>
                            <th scope="col" class="px-6 py-3">User Type</th>
                            <th scope="col" class="px-6 py-3">Team</th>
                            <th scope="col" class="px-6 py-3">Client</th>
                            <th scope="col" class="px-6 py-3 md:w-1/6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in filteredUsers" :key="user.id" class="bg-white border-b hover:bg-gray-50">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ user.name }}
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.usertype }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.team }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.client }}
                            </td>
                            <td class="px-6 py-4">
                                <a :href="route('edit_user', user.id)"   
                                    class="font-medium text-blue-600 hover:underline mr-4 py-1 px-2 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-blue-500 focus:shadow-sm">Edit</a>
                                <a @click="hapus(user.id)"
                                    class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <DeleteConfirmation :show="showDeleteModal" @confirm="confirmDeletion" @cancel="cancelDeletion" />
    </AppLayout>
</template>