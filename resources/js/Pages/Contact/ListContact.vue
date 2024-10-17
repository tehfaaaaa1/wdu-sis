<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';

const props = defineProps({
    contact: Object
})
const form = useForm({

})

const showDeleteModal = ref(false);
const selectedContactId = ref(null);
const hapus = (id) => {
    selectedContactId.value = id;
    showDeleteModal.value = true;
};

const confirmDeletion = () => {
    form.get(route('delete-contact', selectedContactId.value), {
        onFinish: () => {
            showDeleteModal.value = false;
        }
    })
}

const cancelDeletion = () => {
    showDeleteModal.value = false;
}
</script>
<template>
    <AppLayout title="List Contact">
        <div class="mx-auto rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center mb-5">
                <div class="w-1/2 sm:w-full">
                    <!-- <NavLink :href="routae('list-recipient')"
                        class="bg-primary !mb-0 !mt-3 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-white hover:text-primary transition">
                        Recipient
                    </NavLink> -->
                </div>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-fixed">
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
                        <tr v-for="(contact, index) in contact" :key="index"
                            class="bg-white border-b hover:bg-gray-50 group">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words">
                                {{ contact.email }}
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500 break-words">
                                {{ contact.first_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ contact.last_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ contact.company }}
                            </td>
                            <td class="px-6 py-4">
                                {{ contact.occupation }}
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
                                        <div class="py-1 sticky bg-white z-50">
                                            <a :href="route('edit-contact-2',[contact.id])"
                                                :class="'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'">Edit
                                            </a>
                                            <a @click ="hapus(contact.id)"   
                                                :class="'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'">Delete
                                            </a>
                                        </div>
                                    </template>
                                </Dropdown>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div class="px-6 py-4 bg-white text-center" v-if="isEmpty(users.data)">
                    <p class="font-semibold">User Tersebut Tidak Ada</p>
                    <br>
                    <a :href="route('users')"
                        class="font-medium text-base text-white hover:bg-white hover:text-secondary hover:ring-2 hover:ring-secondary transition px-4 py-2.5 bg-secondary rounded">Kembali</a>
                    <div class="my-3" />
                </div>
                <div class="" v-if="!isEmpty(users.data)">
                    <Pagination :links="users.links" />
                </div> -->
            </div>
        </div>
        <DeleteConfirmation :show="showDeleteModal" @confirm="confirmDeletion" @cancel="cancelDeletion" />
    </AppLayout>
</template>