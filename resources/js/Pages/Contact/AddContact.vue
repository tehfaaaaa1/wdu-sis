<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useForm } from '@inertiajs/vue3';
const props =defineProps({
    recipient:Object
})
const form = useForm({
    email:'',
    first_name:'',
    last_name:'',
    file: ''
})
const contacts = ref([{
    email:'',
    first_name:'',
    last_name:'',
    company:'',
    occupation:''
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
const addcontact = () => {
    form.transform(()=>({
        data:contacts.value
    })).post(route('store-contact', [props.recipient.id]))
}
const importContact = () => {
    form.transform(()=>({
        file:form.file
    })).post(route('contact.import', [props.recipient.id]))
}
</script>
<template>
    <AppLayout title="Recipient Details">
        <main class="min-h-screen">
            <form @submit.prevent="importContact">
                <h1 class="text-lg font-semibold">Import File</h1>
                <input type="file" @change="form.file = $event.target.files[0]">
                <button type="submit">Import</button>
            </form>
            <div class="mx-auto mt-5 rounded-md max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
                <form @submit.prevent="addcontact">
                    <div class="" v-for="(contact, index) in contacts" :key="index">
                        <div class="flex">
                            <input type="email" placeholder="Email" v-model="contacts[index].email"/>
                            <input type="text" placeholder="First Name" v-model="contacts[index].first_name"/>
                            <input type="text" placeholder="Last Name" v-model="contacts[index].last_name"/>
                            <input type="text" placeholder="Company" v-model="contacts[index].company"/>
                            <input type="text" placeholder="Occupation" v-model="contacts[index].occupation"/>
                        </div>
                    </div>
                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Add Contact
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </main>    
    </AppLayout>
</template>