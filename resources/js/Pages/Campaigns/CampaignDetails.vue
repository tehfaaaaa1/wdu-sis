<script setup>
import NavLink from '@/Components/NavLink.vue';
import NavLinkBlue from '@/Components/NavLinkBlue.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref, watch, onMounted } from 'vue';
import Campaign from './Campaign.vue';
import { camelCase } from 'lodash';

const props = defineProps({
    campaign: Object,
    created: String,
    recipients: Object,
    senders: Object,
})
const addSenderNew = ref(false);
const addSender = ref(false);
const changeSender = ref(false);
const addRecipient = ref(false);
const addRecipientNew = ref(false);
console.log(props.campaign)
const form = useForm({
    subject: props.campaign.subject ?? '',
    sender_id: props.campaign.sender_id ?? '',
    recipient_id: props.campaign.recipient_id ?? '',
    isi: props.campaign.content ?? '',
    sender_name: props.campaign.sender?.name,
    sender_email: props.campaign.sender?.email,
    sender_reply: props.campaign.sender?.reply_address
})
const senderNew = useForm({
    sender_name: '',
    sender_email: '',
    sender_reply: ''
})
const RecipientNew = useForm({
    name:''
})
const submit = () => {
    form.post(route('campaign-data', [props.campaign.slug]),
    {onsucces: window.location.reload()})
}
const newSender = () => {
    senderNew.post(route('add-sender', [props.campaign.slug]))
}
const newRecipient = () => {
    RecipientNew.post(route('add-recipient', [props.campaign.slug]),
    )
}
const dataSender = ()=>{
    form.post(route('update-sender',[props.campaign.sender.id, props.campaign.slug]) , 
    {onsucces: window.location.reload()})
}
</script>
<template>
    <AppLayout title=" Campaign Details">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <a :href="route('campaigns')"
                    class="mb-3 inline-flex items-center rounded-md px-5 py-2 bg-red-500  text-sm font-semibold leading-6 text-white shadow-sm transition hover:outline-none focus:outline-none hover:ring-2 focus:ring-2 hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500" >
                    Back
                </a>
                <form action="" @submit.prevent="submit" class="bg-white block rounded-sm">
                    <div class="p-3 border-b" style="border-color: rgb(128, 128, 128);">
                        <h1 class="text-xl font-medium">{{ campaign.name }}</h1>
                        <p class="text-sm text-gray-500">Draft | Created on {{ created }}</p>
                    </div>
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Subject</h1>
                        <input v-model="form.subject" type="text" placeholder="Subject"
                            class="w-full px-3 h-10 rounded-md text-sm" />
                    </div>
                    <!-- Sender -->
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Sender</h1>
                        <div class="relative px-3 w-full">
                            <div :class="campaign.sender_id == null ? 'block' : 'flex justify-between'" class="w-full">
                                <h2>{{ campaign.sender?.email ?? 'Choose the sender or create new.' }}</h2>
                                <SecondaryButton class="!m-0" type="button"
                                    @click="campaign.sender ?  (addSender = !addSender, changeSender = !changeSender ,addSenderNew ==true ? addSenderNew = false :'') 
                                    : ( changeSender = !changeSender, addSenderNew = false) ">
                                    {{ campaign.sender_id == null ? 'Choose Sender' : 'Edit Sender' }}
                                </SecondaryButton>
                            </div>
                            <!-- Sender Data -->
                            <div class="w-full px-4 pt-3 pb-5 my-3 shadow-md rounded-md border-1 border border-primary" v-show="addSender">
                                <form action="" @submit.prevent="dataSender">
                                    <H2 class="text-center text-lg font-medium mb-2">Sender Data</H2>
                                    <div class="block w-full p-2">
                                        <div class="flex justify-between mb-4">
                                            <p class="">Name</p>
                                            <input class="text-sm rounded-md border-primary w-1/3" type="text" name="sender_name" id="" 
                                            v-model="form.sender_name">
                                        </div>
                                        <div class="flex justify-between mb-4">
                                            <p class="">Email</p>
                                            <input class="text-sm rounded-md border-primary w-1/3 " type="email" name="sender_email" id="" 
                                            v-model="form.sender_email">
                                        </div>
                                        <div class="flex justify-between mb-4">
                                            <p class="">Reply address</p>
                                            <input class="text-sm rounded-md border-primary w-1/3 " type="email" name="sender_reply" id="" 
                                            v-model="form.sender_reply">
                                        </div>
                                        <div class="">
                                            <PrimaryButton>Save Sender</PrimaryButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- Change Sender -->
                            <div class="w-full px-4 pt-3 pb-5 my-3 shadow-md rounded-md border-1 border border-primary" 
                            v-show="changeSender">
                            <h2 class="text-center text-lg font-medium mb-2">{{campaign.sender? ' Change' : 'Choose'}}</h2>
                                <div class="" v-for="(sender, rIndex) in senders" :key="rIndex">
                                    <input type="radio" :id="'sender_' + sender.id"
                                        class="checked:text-primary focus:ring-primary my-2" v-model="form.sender_id"
                                        :value="sender.id" />
                                    <label :for="'sender_' + sender.id" class="pl-1.5 text-sm">
                                        {{ sender.email }}
                                    </label>
                                </div>
                                <PrimaryButton class="mt-4" type="button" v-show="changeSender"
                                    @click="addSenderNew = ! addSenderNew">Add New Sender</PrimaryButton>
                            </div>
                            <!-- Add New Sender -->
                            <div class="block" v-show="addSenderNew">
                                <input type="text" name="" placeholder="name" v-model="senderNew.sender_name">
                                <input type="email" name="" placeholder="email" v-model="senderNew.sender_email">
                                <input type="email" name="" placeholder="Reply Address" v-model="senderNew.sender_reply">
                                <button type="button" @click="newSender">Add</button>
                            </div>
                        </div>
                    </div>
                    <!-- Recipient -->
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Recipient</h1>
                        <div class="block px-3 w-full">
                            <div :class="campaign.recipient_id == null ? 'block' : 'flex justify-between'"
                                class="w-full">
                                <h2>{{ campaign.recipient?.name ?? 'Choose the recipient or create new.' }}</h2>
                                <div class="flex gap-x-2 items-center">
                                    <div class="" v-if="campaign.recipient_id">
                                        <NavLinkBlue :href="route('recipient-details',[campaign.recipient.slug])" class="bg-secondary !my-0 text-white">See Details</NavLinkBlue>
                                    </div>
                                    <SecondaryButton class="!my-0" type="button" @click="addRecipient = !addRecipient; addRecipientNew = false">
                                        {{ campaign.recipient_id == null ? 'Choose Recipient' : 'Change Recipient' }}
                                    </SecondaryButton>
                                </div>
                            </div>
                            <!-- Choose Recipient -->
                            <div class="w-full px-4 pt-3 pb-5 my-3 shadow-md rounded-md border-1 border border-primary" v-show="addRecipient">
                                <h2 class="text-center text-lg font-medium mb-2">Choose</h2>
                                <div class="" v-for="(recipient, rIndex) in recipients" :key="rIndex">
                                    <input type="radio" :id="'recipient_' + recipient.id" name="recipient_id"
                                        class="checked:text-primary focus:ring-primary my-1.5" v-model="form.recipient_id"
                                        :value="recipient.id" />
                                    <label :for="'recipient_' + recipient.id" class="pl-1.5 text-sm">
                                        {{ recipient.name }}
                                    </label>
                                </div>
                                <PrimaryButton class="mt-4" type="button" v-show="addRecipient"
                                    @click="addRecipientNew = ! addRecipientNew">Add New Recipient</PrimaryButton>
                            </div>
                            <div class="" v-show="addRecipientNew">
                                <input type="text" placeholder="Recipient Name" v-model="RecipientNew.name" name="" id="">
                                <button type="button" @click="newRecipient">Add</button>
                            </div>
                            
                        </div>
                    </div>
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Content</h1>
                        <div class="block w-full px-3">
                            Content
                        </div>
                    </div>
                    <div class="p-4">
                        <PrimaryButton class=" justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </main>
    </AppLayout>
</template>

<style scoped>
.form-field {
    display: flex;
    border-bottom: 1px solid gray;
    padding: 1rem;
    min-height: 5rem;
}

.form-field:last-child {
    border: 0;
}

.form-field h2 {
    margin-bottom: 0.25rem;
}
</style>