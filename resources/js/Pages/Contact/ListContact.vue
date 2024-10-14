<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import NavLink from '@/Components/NavLink.vue';
const props = defineProps({
    contact: Object
})           

</script>
<template>
    <AppLayout title="List Contact">
        <div class="mx-auto mt-5 rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center mb-5">
                <div class="w-1/2 sm:w-full">
                    <NavLink :href="route('list-recipient')" class="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-white hover:text-primary transition">
                        Recipient
                    </NavLink>
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
                            <th scope="col" class="px-6 py-3 md:w-1/6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(contact, index) in contact" :key="index" class="bg-white border-b hover:bg-gray-50">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                {{ contact.email }}
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500 break-words">
                                {{ contact.first_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ contact.last_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{  contact.company }}
                            </td>
                            <td class="px-6 py-4">
                                {{ contact.occupation }}
                            </td>
                            <td class="px-6 py-4">
                                <!-- <a :href="route('edit_user', user.id)"
                                    class="font-medium text-blue-600 hover:underline mr-4 py-1 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-blue-500 focus:shadow-sm">Edit</a>
                                <a @click="hapus(user.id)"
                                    class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a> -->
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
    </AppLayout>
</template>