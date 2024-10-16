<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    recipient: Object,
    contact: Object
})
console.log(props.recipient)
</script>
<template>
    <AppLayout title="Recipient Details">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full">
                        <NavLink :href="route('add-contact', [recipient[0].slug])"
                            class="bg-primary mb-0 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-white hover:text-primary transition">
                            Add Contact
                        </NavLink>
                    </div>
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-fixed">
                        <caption class="p-5 text-lg font-semibold rtl:text-right text-gray-900 bg-white text-center">
                            {{ recipient[0].name }}
                            <p class="mt-1 mb-4 text-sm font-normal text-gray-500">
                                <!-- {{ client['desc'] }} -->
                            </p>
                            <div class="border-b-2 border-gray-300 mb-5"></div>
                            <!-- {{ project['project_name'] }} -->
                            <p class="text-sm font-normal text-gray-500">
                                <!-- {{ project['desc'] }} -->
                            </p>
                        </caption>
                        <thead class="text-xs text-white uppercase bg-primary">
                            <tr>
                                <th scope="col" class="px-6 py-3">Email</th>
                                <th scope="col" class="px-6 py-3">First Name</th>
                                <th scope="col" class="px-6 py-3">Last Name</th>
                                <th scope="col" class="px-6 py-3">Company</th>
                                <th scope="col" class="px-6 py-3">Occupation</th>
                                <th scope="col" class="px-6 py-3 md:w-1/12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(contact, index) in props.contact" :key="index"
                                class="bg-white border-b hover:bg-gray-50 group">
                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words">
                                    {{ contact.email_contact.email }}
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500 break-words">
                                    {{ contact.email_contact.first_name }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ contact.email_contact.last_name }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ contact.email_contact.company }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ contact.email_contact.occupation }}
                                </td>
                                <td class="px-6 py-4 flex justify-end">
                                    <Dropdown width="36">
                                        <template #trigger>
                                            <div
                                                class="collapse group-hover:visible w-12 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:ring-1 ring-inset ring-gray-300 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                </svg>
                                            </div>
                                        </template>
                                        <template #content>
                                            <div class="py-1">
                                                <a
                                                    :class="'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'">Edit
                                                </a>
                                                <a
                                                    :class="'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'">Delete
                                                </a>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </AppLayout>
</template>