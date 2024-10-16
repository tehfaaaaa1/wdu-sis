<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import DropdownAlt from '@/Components/DropdownAlt.vue';
import DeleteConfirmation from '@/Components/DeleteConfirmation.vue';
import { useForm, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import NavLink from '@/Components/NavLink.vue';
import Pagination from '@/Components/Pagination.vue';
import { isEmpty } from 'lodash';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    users: Object,
    client: Object,
    team: Object
});

const form = useForm({
    client: props.client.map(() => ({
        isi: [],
    })),
    team: props.team.map(() => ({
        tim: [],
    })),
    search: '',
    noteam: '',
    noclient: '',
});
const showDeleteModal = ref(false);
const selectedUserId = ref(null);

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
const search = () => {
    form.get(route('users'))
}

</script>


<template>
    <AppLayout title="Users">
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center mb-5">
                <div class="w-1/2 sm:w-full">
                    <SecondaryButton @click="() => form.get(route('users.create'))">
                        Create User
                    </SecondaryButton>
                </div>
                <div class="w-1/4 flex items-center py-2 text-sm">
                    <input type="text" v-model="form.search" @keyup.enter="search"
                        class="w-full me-3 border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="Search">
                    <div class="relative" id="filter">
                        <DropdownAlt width="52">
                            <template #trigger>
                                <button class="bg-secondary hover:bg-biru-gelap transition p-2 px-4 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-5 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                    </svg>
                                </button>
                            </template>

                            <template #content>
                                <div class="p-3">
                                    <div class="Teams">
                                        <p class="text-xs text-gray-500 mb-1">Teams</p>
                                        <div class="mb-1.5">
                                            <input type="checkbox" class="checked:text-primary focus:ring-primary"
                                                v-model="form.noteam" id="noteam" name="noteam" value="">
                                            <label class="px-2" for="noteam">No Team</label>
                                        </div>
                                        <div class="mb-1.5 flex items-center" v-for="(t, index) in team" :key="index">
                                            <input type="checkbox" class="checked:text-primary focus:ring-primary"
                                                :id="'team' + t.id" :name="'team' + t.id" v-model="form.team[index].tim"
                                                :value="t.name">
                                            <label class="px-2" :for="'team' + t.id">{{ t.name }}</label>
                                        </div>
                                        <hr class="my-3">
                                    </div>
                                    <div class="Client">
                                        <p class="text-xs text-gray-500 mb-1">Clients</p>
                                        <div class="No Client mb-1.5">
                                            <input type="checkbox" class="checked:text-primary focus:ring-primary"
                                                v-model="form.noclient" id="noclient" name="noclient" value="">
                                            <label class="px-2" for="noclient">No Client</label>
                                        </div>
                                        <div class="mb-1.5 flex items-center" v-for="(c, index) in client" :key="index">
                                            <input type="checkbox" class="checked:text-primary focus:ring-primary"
                                                :id="'client' + c.id + index" :name="'client' + c.id + index"
                                                v-model="form.client[index].isi" :value="c.slug">
                                            <label class="px-2" :for="'client' + c.id + index">
                                                {{ c.client_name }}
                                            </label>
                                        </div>
                                        <hr class="my-3">
                                    </div>
                                    <button type="button" @click="search"
                                        class="w-full hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary transition bg-primary py-2 rounded-md text-white text-center">Filter</button>
                                </div>
                            </template>
                        </DropdownAlt>
                    </div>
                </div>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-fixed">
                    <thead class="text-xs text-white uppercase bg-primary">
                        <tr>
                            <th scope="col" class="px-6 py-3">Name</th>
                            <th scope="col" class="px-6 py-3">Email</th>
                            <th scope="col" class="px-6 py-3 w-[10%]">User Type</th>
                            <th scope="col" class="px-6 py-3">Team</th>
                            <th scope="col" class="px-6 py-3">Client</th>
                            <th scope="col" class="px-6 py-3 md:w-1/6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users.data" :key="user.id" class="bg-white border-b hover:bg-gray-50">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                {{ user.name }}
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500 break-words">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.usertype }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.current_team != null ? user.current_team.name : 'No Team' }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.client != null ? user.client.client_name : 'No Client' }}
                            </td>
                            <td class="px-6 py-4">
                                <a :href="route('edit_user', user.id)"
                                    class="font-medium text-blue-600 hover:underline mr-4 py-1 focus:outline-none focus:ring-2 focus:rounded-sm focus:ring-blue-500 focus:shadow-sm">Edit</a>
                                <a @click="hapus(user.id)"
                                    class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="px-6 py-4 bg-white text-center" v-if="isEmpty(users.data)">
                    <p class="font-semibold">User Tersebut Tidak Ada</p>
                    <br>
                    <a :href="route('users')"
                        class="font-medium text-base text-white hover:bg-white hover:text-secondary hover:ring-2 hover:ring-secondary transition px-4 py-2.5 bg-secondary rounded">Kembali</a>
                    <div class="my-3" />
                </div>
                <div class="" v-if="!isEmpty(users.data)">
                    <Pagination :links="users.links" />
                </div>
            </div>
        </main>

        <DeleteConfirmation :show="showDeleteModal" @confirm="confirmDeletion" @cancel="cancelDeletion" />
    </AppLayout>
</template>