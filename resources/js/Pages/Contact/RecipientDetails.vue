<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import NavLink from '@/Components/NavLink.vue';
import {ref} from 'vue';
import { useForm } from '@inertiajs/vue3';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
const props = defineProps({
    recipient: Object,
    contact: Object
})
const showRemoveModal = ref(false);
const selectedContactId = ref(null);
const hapus = (id) => {
    selectedContactId.value = id;
    showRemoveModal.value = true;
};
const form = useForm([

])
const confirmRemove = () => {   
    form.get(route('remove-contact', [props.recipient[0].slug,selectedContactId.value]), {
        onFinish: () => {
            showRemoveModal.value = false;
        }
    })
}

const cancelRemove = () => {
    showRemoveModal.value = false;
}

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
                <div class="relative overflow-auto pb-20">
                    <div class="shadow-md sm:rounded-lg">
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
                                <tr v-for="(contact_rec, index) in props.contact" :key="index"
                                    class="bg-white border-b hover:bg-gray-50 group">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words">
                                        {{ contact_rec.email_contact.email }}
                                    </td>
                                    <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500 break-words">
                                        {{ contact_rec.email_contact.first_name }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ contact_rec.email_contact.last_name }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ contact_rec.email_contact.company }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ contact_rec.email_contact.occupation }}
                                    </td>
                                    <td class="px-6 py-4 text-end">
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
                                                <div class="py-1 text-start">
                                                    <a :href="route('edit-contact', [recipient[0].slug,contact_rec?.email_contact?.id])"
                                                        :class="'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'">Edit
                                                    </a>
                                                    <a @click ="hapus(contact_rec.id)"
                                                        :class="'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'">Remove
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
            </div>
        </main>
        <div v-show="showRemoveModal" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        <div class="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Confirm Remove</h2>
            <p class="text-gray-600 mb-6">Are you sure want to Remove? This action cannot be undone.</p>
            <div class="flex justify-end space-x-4">    
                <button @click="cancelRemove" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                    Cancel
                </button>
                <button @click="confirmRemove" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    Remove
                </button>
            </div>
        </div>
    </div>
    </AppLayout>
</template>