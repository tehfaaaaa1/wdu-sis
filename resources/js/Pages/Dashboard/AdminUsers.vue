<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { ref, computed } from 'vue';

const props = defineProps({
    users: Array,
});

const searchQuery = ref('');
const filteredUsers = computed(() => {
    return props.users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.usertype.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.team.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});
</script>

<template>
    <AppLayout title="Admin Panel">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Admin Panel
            </h2>
        </template>
        <div class="flex">
            <div class="w-1/6 min-h-screen pt-10 bg-gray-800">
                <ResponsiveNavLink :href="route('dashboard.admin')" :active="route().current('dashboard.admin')">
                    Projects
                </ResponsiveNavLink>
                <ResponsiveNavLink :href="route('dashboard.admin_users')"
                    :active="route().current('dashboard.admin_users')">
                    Users
                </ResponsiveNavLink>
            </div>
            <div class="w-full">
                <div class="max-w-7xl mx-auto py-9 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center mx-3 mb-6">
                        <h2 class="font-semibold text-2xl border-b-4 border-gray-700">
                            Users
                        </h2>
                        <div class="">
                            <Dropdown align="right">
                                <template #trigger>
                                    <span class="inline-flex rounded-md">
                                        <button type="button"
                                            class="inline-flex items-center px-16 py-3 border border-primary text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                                            Filter
                                            <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </span>
                                </template>

                                <template #content>
                                    <div class="block px-4 py-2 text-xs text-gray-400">
                                        Filter Users
                                    </div>
                                    <div class="flex items-center px-4 py-2 text-sm">
                                        <input type="text"
                                            class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary"
                                            v-model="searchQuery"
                                            placeholder="Search">
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                            <thead class="text-xs text-white uppercase bg-primary">
                                <tr>
                                    <th scope="col" class="px-6 py-3 hidden sm:block">Name</th>
                                    <th scope="col" class="px-6 py-3">Email</th>
                                    <th scope="col" class="px-6 py-3">User Type</th>
                                    <th scope="col" class="px-6 py-3">Team</th> <!-- New Team Column -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in filteredUsers" :key="user.id"
                                    class="bg-white border-b hover:bg-gray-50">
                                    <td scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hidden sm:block">
                                        {{ user.name }}
                                    </td>
                                    <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500 truncate">
                                        {{ user.email }}
                                    </td>
                                    <td class="px-6 py-4 truncate">
                                        {{ user.usertype }}
                                    </td>
                                    <td class="px-6 py-4 truncate">
                                        {{ user.team }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
