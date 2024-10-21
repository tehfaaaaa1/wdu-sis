<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue';
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
import { isEmpty } from 'lodash';
import Pagination from '@/Components/Pagination.vue';
const props = defineProps({
    contact: Object,
    search: Object
})
const form = useForm({
    search: ''
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
const search =()=>{
    form.get(route('list-contact'))
}
const cancelDeletion = () => {
    showDeleteModal.value = false;
}
console.log(props.search)
</script>
<template>
    <AppLayout title="List Contact">
        <div class="mx-auto rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="flex items-center mb-5 w-full" :class="(props.search == null || props.search?.includes('page')) || isEmpty(contact.data) ? 'justify-end' : 'justify-between'">

                <div class="" v-if="(props.search && !props.search?.includes('page'))  && !isEmpty(contact.data)">
                    <a :href="route('list-contact')" class="font-medium text-base text-white hover:bg-white hover:text-secondary hover:ring-2 hover:ring-secondary transition px-4 py-2.5 bg-secondary rounded">
                        Reset 
                    </a>
                </div>
                <div class="flex">
                    <input type="text" v-model="form.search" @keyup.enter="search"
                        class="w-full md:h-10 border-primary rounded-s-md text-sm placeholder:text-center placeholder:font-thin focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Search">
                        <button type="button" @click="search" class=" hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary transition bg-primary p-2 rounded-r-md md:h-10 text-white text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="relative overflow-x-auto pb-8">
                <div class=" shadow-md sm:rounded-lg">
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
                            <tr v-for="(contact, index) in contact.data" :key="index"
                                class="bg-white border-b hover:bg-gray-50 group">
                                <td scope="row" class="px-6 py-2.5 font-medium text-gray-900 break-words">
                                    {{ contact.email }}
                                </td>
                                <td class="px-6 py-2.5 font-medium text-gray-900 sm:text-gray-500 break-words">
                                    {{ contact.first_name }}
                                </td>
                                <td class="px-6 py-2.5">
                                    {{ contact.last_name }}
                                </td>
                                <td class="px-6 py-2.5">
                                    {{ contact.company }}
                                </td>
                                <td class="px-6 py-2.5">
                                    {{ contact.occupation }}
                                    
                                </td>
                                <td class="px-6 py-2.5 flex justify-end">
                                    <Dropdown width="36">
                                        <template #trigger>
                                            <div class="collapse group-hover:visible w-12 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:ring-1 ring-inset ring-gray-300 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                </svg>
                                            </div>
                                        </template>
                                        <template #content>
                                            <div class="py-1">
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
                    <div class="px-6 py-4 bg-white text-center" v-if="isEmpty(contact.data)">
                        <p class="font-semibold">Data Yang Dicari Tidak ada</p>
                        <br>
                        <a :href="route('list-contact')"
                            class="font-medium text-base text-white hover:bg-white hover:text-secondary hover:ring-2 hover:ring-secondary transition px-4 py-2.5 bg-secondary rounded">Kembali</a>
                        <div class="my-3" />
                    </div>
                    <div class="" v-if="!isEmpty(contact.data)">
                        <Pagination :links="contact.links" />
                    </div>
                </div>
            </div>
        </div>
        <DeleteConfirmation :show="showDeleteModal" @confirm="confirmDeletion" @cancel="cancelDeletion" />
    </AppLayout>
</template>