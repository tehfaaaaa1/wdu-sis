<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
const props = defineProps({
    recipient: Object
})
const form = useForm({
    email: '',
    first_name: '',
    last_name: '',
    file: ''
})
const contacts = ref([{
    email: '',
    first_name: '',
    last_name: '',
    company: '',
    occupation: ''
}])
// onMounted(() => {
//     if(contacts.value.length<=5){
//         for (let index = 1; index < 5; index++) {
//             contacts.value.push({
//             email:'',
//             first_name:'',
//             last_name:'',
//             company:'',
//             occupation:''})
//         }
//     }
// })
const add = ()=>{
    contacts.value.push({
            email:'',
            first_name:'',
            last_name:'',
            company:'',
            occupation:''})
    }
const addcontact = () => {
    form.transform(() => ({
        data: contacts.value
    })).post(route('store-contact', [props.recipient.id]))
}
const importContact = () => {
    form.transform(() => ({
        file: form.file
    })).post(route('contact.import', [props.recipient.id]))
}
</script>
<template>
    <AppLayout title="Recipient Details">
        <main class="min-h-screen scroll-smooth">
            <h1 class="bg-white border-b border-gray-200 h-10 flex items-center w-full px-6 text-lg">{{
                props.recipient.name }}</h1>
            <div class="bg-white shadow-md border-t-6 border-primary mx-auto mt-10 rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <form @submit.prevent="importContact" class="p-3">
                    <h1 class="text-lg font-semibold">Import File</h1>
                    <div class="flex items-center gap-x-5">
                        <input type="file" @change="form.file = $event.target.files[0]"
                        class=" text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none
                        file:py-2.5 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white">
                        <SecondaryButton class="!my-0 !py-2.5" type="submit">Import</SecondaryButton>
                    </div>
                </form>
                <div class="border-b border-gray-300 mb-3"></div>
                <div class="block">
                    <form @submit.prevent="addcontact">
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg gap-x-3">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 border-separate">
                                <thead class="text uppercase">
                                    <tr>
                                        <th scope="col" class="sticky left-0 px-6 py-3 bg-white border-r border-gray-300">Email</th>
                                        <th scope="col" class="px-6 py-3">First Name</th>
                                        <th scope="col" class="px-6 py-3">Last Name</th>
                                        <th scope="col" class="px-6 py-3">Company</th>
                                        <th scope="col" class="px-6 py-3">Occupation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="relative" v-for="(contact, index) in contacts" :key="index">
                                        <td class="bg-white sticky left-0 px-6 py-4 font-medium text-gray-900 border-r border-gray-300"><input type="email" placeholder="Email" v-model="contacts[index].email" /></td>
                                        <td class="px-6 py-4 font-medium text-gray-900"> <input type="text" placeholder="First Name" v-model="contacts[index].first_name" /></td>
                                        <td class="px-6 py-4 font-medium text-gray-900"><input type="text" placeholder="Last Name" v-model="contacts[index].last_name" /></td>
                                        <td class="px-6 py-4 font-medium text-gray-900"> <input type="text" placeholder="Company" v-model="contacts[index].company" /></td>
                                        <td class="px-6 py-4 font-medium text-gray-900"><input type="text" placeholder="Occupation" v-model="contacts[index].occupation" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="button" @click="add">Add</button>
                        <div class="my-4 text-center">
                            <PrimaryButton class="px-2 justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                                :disabled="form.processing">
                                Add Contact
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </AppLayout>
</template>

<style scoped>
.shadow-right {
    box-shadow: 10px 0px 5px -1px #888;
}
</style>