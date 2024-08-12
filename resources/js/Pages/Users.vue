<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

defineProps({ users: Object })
</script>

<template>
    <AppLayout title="Users">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Users
            </h2>
        </template>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="flex justify-between mx-3 mb-6">
                <div class="">
                    <input type="text"
                        class="border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary"
                        placeholder="Search">
                </div>
                <div class="">
                    <Dropdown align="right">
                        <template #trigger>
                            <span class="inline-flex rounded-md">
                                <button type="button"
                                    class="inline-flex items-center px-16 py-2 border border-primary text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                                    Filter

                                    <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                            </span>
                        </template>

                        <template #content>
                            <!-- Account Management -->
                            <div class="block px-4 py-2 text-xs text-gray-400">
                                Filter Users
                            </div>

                            <div class="flex items-center px-4 py-2 text-sm">
                                <input type="checkbox" name="filter" id="admin" value="admin" class="rounded-sm">
                                <label for="admin" class="ps-2 w-full">Admin</label>
                            </div>
                            <div class="flex items-center px-4 py-2 text-sm">
                                <input type="checkbox" name="filter" id="pic_wdu" value="pic_wdu" class="rounded-sm">
                                <label for="pic_wdu" class="ps-2 w-full">PIC WDU</label>
                            </div>
                            <div class="flex items-center px-4 py-2 text-sm">
                                <input type="checkbox" name="filter" id="korlap" value="korlap" class="rounded-sm">
                                <label for="korlap" class="ps-2 w-full">Koordinator Lapangan</label>
                            </div>
                            <div class="flex items-center px-4 py-2 text-sm">
                                <input type="checkbox" name="filter" id="enum" value="enum" class="rounded-sm">
                                <label for="enum" class="ps-2 w-full">Enum</label>
                            </div>
                            <div class="flex items-center px-4 py-2 text-sm">
                                <input type="checkbox" name="filter" id="klien" value="klien" class="rounded-sm">
                                <label for="klien" class="ps-2 w-full">Klien</label>
                            </div>


                            <!-- <DropdownLink v-if="$page.props.jetstream.hasApiFeatures"
                                    :href="route('api-tokens.index')">
                                    API Tokens
                                </DropdownLink> -->

                            <div class="border-t border-gray-200" />

                            <!-- Authentication -->
                            <form @submit.prevent="logout">
                                <DropdownLink as="button">
                                    Log Out
                                </DropdownLink>
                            </form>
                        </template>
                    </Dropdown>
                </div>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                    <thead class="text-xs text-white uppercase bg-primary">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3 hidden sm:block">
                                Password
                            </th>
                            <th scope="col" class="px-6 py-3 md:w-1/6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" class="bg-white border-b hover:bg-gray-50">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ user.name }}
                            </th>
                            <td class="px-6 py-4">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4 hidden sm:block truncate">
                                {{ user.password }}
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 hover:underline mr-4">Edit</a>
                                <a href="#" class="font-medium text-red-600 hover:underline">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </AppLayout>
</template>
