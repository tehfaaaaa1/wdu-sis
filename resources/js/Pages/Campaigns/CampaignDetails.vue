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
const editSender = ref(false);
const addSender = ref(false);
const changeSender = ref(false);

const editRecipient = ref(false);
const addRecipient = ref(false);
const addRecipientNew = ref(false);
console.log(props.campaign)
const form = useForm({
    name: props.campaign.name,
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
    <AppLayout title="Campaign Details">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <a :href="route('campaigns')"
                    class="mb-3 inline-flex items-center rounded-md px-5 py-2 bg-red-500  text-sm font-semibold leading-6 text-white shadow-sm transition hover:outline-none focus:outline-none hover:ring-2 focus:ring-2 hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500" >
                    Back
                </a>
                <form action="" @submit.prevent="submit" class="bg-white block rounded-sm">
                    <div class="p-3 border-b" style="border-color: rgb(128, 128, 128);">
                        <!-- <h1 class="text-xl font-medium">{{ campaign.name }}</h1> -->
                        <input type="text" v-model="form.name" class="border-0 border-b-2 p-1 focus:ring-0 focus:outline-none border-primary focus:border-primary text-xl font-semibold">
                        <p class="text-sm text-gray-500">Draft | Created at {{ created }}</p>
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
                                    @click="campaign.sender ?  (editSender = ! editSender, changeSender || addSenderNew? addSender = false : addSender = !addSender, changeSender = false , addSenderNew = false) 
                                    : ( editSender = ! editSender, !editSender ? changeSender = false : changeSender = !changeSender, addSenderNew = false) ">
                                        {{ editSender ? 'Close Sender' :(campaign.sender_id == null ? 'Choose Sender' : 'Edit Sender') }}
                                </SecondaryButton>
                            </div>
                            <!-- edit Sender -->
                            <transition
                            enter-active-class="transition ease-out duration-150 delay-150"
                            enter-from-class="transform opacity-0 -translate-y-3"
                            enter-to-class="transform opacity-100 translate-y-0"
                            leave-active-class="transition ease-out duration-75 delay-0"
                            leave-from-class="transform opacity-100 translate-y-0"
                            leave-to-class="transform opacity-0 -translate-y-5">
                            <div class="min-h-80 shadow-md border-1 border-primary" v-show="editSender">
                                <!-- Sender Data -->
                                <transition
                                enter-active-class="transition ease-out duration-150 delay-150"
                                enter-from-class="transform opacity-0 -translate-y-3"
                                enter-to-class="transform opacity-100 translate-y-0"
                                leave-active-class="transition ease-out duration-0 delay-0"
                                leave-from-class="transform opacity-0 translate-y-0"
                                leave-to-class="transform opacity-0 -translate-y-3">
                                <form action="" @submit.prevent="dataSender" class="w-full px-4 pt-3 pb-3 my-3 shadow-md rounded-md border-1 border min-h-80 flex flex-col justify-between border-primary" v-show="addSender">
                                        <div class="block w-full p-2">
                                            <h2 class="text-center text-lg font-medium mb-2">Sender Data</h2>
                                            <div class="sm:flex justify-between mb-4">
                                                     <p class="">Name</p>
                                                     <input class="text-sm rounded-md border-primary sm:w-1/3" type="text" name="sender_name" id="" 
                                                     v-model="form.sender_name">
                                            </div>
                                            <div class="sm:flex justify-between mb-4">
                                                     <p class="">Email</p>
                                                     <input class="text-sm rounded-md border-primary sm:w-1/3" type="email" name="sender_email" id="" 
                                                     v-model="form.sender_email">
                                            </div>
                                            <div class="sm:flex justify-between mb-4">
                                                     <p class="">Reply Address</p>
                                                     <input class="text-sm rounded-md border-primary sm:w-1/3 " type="email" name="sender_reply" id="" 
                                                     v-model="form.sender_reply">
                                            </div>
                                        </div>
                                        <div class="flex gap-x-3">
                                            <div class="my-2">
                                                <PrimaryButton type="button" @click="dataSender" class="!px-2 !font-medium sm:!px-6 sm:py-2.5">Save Sender</PrimaryButton>
                                            </div>
                                            <div class="my-2">
                                                <SecondaryButton class="!px-2 !my-0 !font-medium sm:!px-6 sm:py-2.5" type="button" 
                                                @click="changeSender = !changeSender; addSender= false">
                                                Change Sender</SecondaryButton>
                                            </div>
                                        </div>
                                </form>
                                </transition>
    
                                <!-- Change Sender -->
                                 <transition 
                                    enter-active-class="transition ease-out duration-150 delay-150"
                                    enter-from-class="transform opacity-0 -translate-y-3"
                                    enter-to-class="transform opacity-100 translate-y-0"
                                    leave-active-class="transition ease-out duration-0 delay-0"
                                    leave-from-class="transform opacity-0 translate-y-0"
                                    leave-to-class="transform opacity-0 -translate-y-3">
                                     <div class="w-full px-4 pt-3 pb-3 my-3 shadow-md rounded-md border-1 border min-h-80 flex flex-col justify-between border-primary"
                                     v-show="changeSender">
                                     <div class="">
                                        <h2 class="text-center text-lg font-medium mb-2">{{campaign.sender? ' Change' : 'Choose'}}</h2>
                                        <div class="" v-for="(sender, rIndex) in senders" :key="rIndex">
                                            <input type="radio" :id="'sender_' + sender.id"
                                                    class="checked:text-primary focus:ring-primary my-2" v-model="form.sender_id"
                                                    :value="sender.id" />
                                            <label :for="'sender_' + sender.id" class="pl-1.5 text-sm">
                                                {{ sender.email }}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="flex gap-x-3 items-center">
                                        <div class="my-2" v-show="campaign.sender" >
                                            <button type="button" @click="addSender= !addSender; changeSender = false; addSenderNew= false"
                                            class="inline-flex items-center rounded-md px-5 py-2.5 bg-red-500  text-sm font-semibold leading-6 text-white shadow-sm transition hover:outline-none focus:outline-none hover:ring-2 focus:ring-2 hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500">
                                                {{ campaign.sender_id ? 'Back' :'Close' }}
                                            </button>
                                        </div>
                                        <div class="my-2">
                                            <PrimaryButton class="!px-2 !my-0 !font-medium sm:!px-6 sm:py-2.5" type="button" v-show="changeSender"
                                            @click="addSenderNew = !addSenderNew; changeSender = false">Add New Sender</PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                 </transition>
    
                                <!-- Add New Sender -->
                                <transition
                                enter-active-class="transition ease-out duration-150 delay-150"
                                enter-from-class="transform opacity-0 -translate-y-3"
                                enter-to-class="transform opacity-100 translate-y-0"
                                leave-active-class="transition ease-out duration-0 delay-0"
                                leave-from-class="transform opacity-0 translate-y-0"
                                leave-to-class="transform opacity-0 -translate-y-3">
                                <form action="" @submit.prevent="newSender"class="w-full px-4 pt-3 pb-3 my-3 shadow-md rounded-md border-1 border min-h-80 flex flex-col justify-between border-primary" v-show="addSenderNew" >
                                    <div class="block w-full p-2">
                                        <h2 class="text-center text-lg font-medium mb-4 ">Add New Sender</h2>
                                        <div class="sm:flex justify-between mb-4">
                                            <p> Name</p>
                                            <input type="text" name="" v-model="senderNew.sender_name" required
                                            class="text-sm rounded-md border-primary sm:w-1/3" placeholder="Name"> 
                                        </div>
                                        <div class="sm:flex justify-between mb-4">
                                            <p>Email</p>
                                            <input type="email" name="" v-model="senderNew.sender_email" required
                                            class="text-sm rounded-md border-primary sm:w-1/3" placeholder="Email">
                                        </div>
                                        <div class="sm:flex justify-between mb-4">
                                            <p>Reply Address</p>
                                            <input type="email" name="" v-model="senderNew.sender_reply" required
                                            class="text-sm rounded-md border-primary sm:w-1/3" placeholder="Reply Address">
                                        </div>
                                    </div>
                                        <div class="flex gap-x-3 items-center">
                                            <div class="my-2">
                                                    <button type="button"  @click="changeSender = !changeSender; addSenderNew= false"
                                                    class="inline-flex items-center rounded-md px-5 py-2.5 bg-red-500  text-sm font-semibold leading-6 text-white shadow-sm transition hover:outline-none focus:outline-none hover:ring-2 focus:ring-2 hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500">
                                                        Back
                                                    </button>
                                                </div>
                                            <div class="my-2">
                                                <PrimaryButton class="!px-2 !font-medium sm:!px-6 sm:py-2.5">Create Sender</PrimaryButton>
                                            </div>
                                        </div>
                                    
                                </form>
                                </transition>
                            </div>
                            </transition>
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
                                    <SecondaryButton class="!my-0" type="button" @click="editRecipient = !editRecipient, !editRecipient ? addRecipient = false : addRecipient = !addRecipient, addRecipientNew = false">
                                        {{ addRecipient || addRecipientNew ? 'Close Recipient' :(campaign.recipient_id == null ? 'Choose Recipient' : 'Change Recipient') }}
                                    </SecondaryButton>
                                </div>
                            </div>
                            <!-- Edit Recipient -->
                            <transition
                            enter-active-class="transition ease-out duration-150 delay-0"
                            enter-from-class="transform opacity-0 -translate-y-3"
                            enter-to-class="transform opacity-100 translate-y-0"
                            leave-active-class="transition ease-out duration-75 delay-50"
                            leave-from-class="transform opacity-100 translate-y-0"
                            leave-to-class="transform opacity-0 -translate-y-5">
                            <div class="min-h-60 shadow-sm border-1 border-primary" v-show="editRecipient">
                                <!-- Choose Recipient -->
                                <transition
                                enter-active-class="transition ease-out duration-150 delay-150"
                                enter-from-class="transform opacity-0 -translate-y-3"
                                enter-to-class="transform opacity-100 translate-y-0"
                                leave-active-class="transition ease-out duration-0 delay-0"
                                leave-from-class="transform opacity-0 translate-y-0"
                                leave-to-class="transform opacity-0 -translate-y-3">
                                    <div class="w-full px-4 pt-3 pb-3 my-3 shadow-md rounded-md border-1 border min-h-60 flex flex-col justify-between border-primary" v-show="addRecipient">
                                        <div class="">
                                            <h2 class="text-center text-lg font-medium mb-2">Choose</h2>
                                            <div class="" v-for="(recipient, rIndex) in recipients" :key="rIndex">
                                                <input type="radio" :id="'recipient_' + recipient.id" name="recipient_id"
                                                    class="checked:text-primary focus:ring-primary my-1.5" v-model="form.recipient_id"
                                                    :value="recipient.id" />
                                                <label :for="'recipient_' + recipient.id" class="pl-1.5 text-sm">
                                                    {{ recipient.name }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="">
                                            <PrimaryButton class="mt-4" type="button"
                                                    @click="addRecipientNew = ! addRecipientNew, addRecipient = ! addRecipient">Add New Recipient</PrimaryButton>
                                        </div>
                                    </div>
                                </transition>
    
                                <!-- Add New Recipient -->
                                <transition
                                enter-active-class="transition ease-out duration-150 delay-150"
                                enter-from-class="transform opacity-0 -translate-y-3"
                                enter-to-class="transform opacity-100 translate-y-0"
                                leave-active-class="transition ease-out duration-0 delay-0"
                                leave-from-class="transform opacity-0 translate-y-0"
                                leave-to-class="transform opacity-0 -translate-y-3">
                                <form @submit.prevent="newRecipient" class="w-full px-4 pt-3 pb-3 my-3 shadow-md rounded-md border-1 border min-h-60 flex flex-col justify-between border-primary" v-show="addRecipientNew">
                                    <div class="block w-full p-2">
                                        <h1 class="text-center text-lg font-medium mb-4 ">Add New Recipient</h1>
                                        <div class="sm:flex justify-between mb-4">
                                            <p>Recipient Name</p>
                                            <input type="text"v-model="RecipientNew.name" required name="" id="" class="text-sm rounded-md border-primary sm:w-1/3"  placeholder="Recipient Name">
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-x-2">
                                        <div class="my-2">
                                                <button type="button"  @click="addRecipient = !addRecipient; addRecipientNew= false"
                                                    class="inline-flex items-center rounded-md px-5 py-2.5 bg-red-500  text-sm font-semibold leading-6 text-white shadow-sm transition hover:outline-none focus:outline-none hover:ring-2 focus:ring-2 hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500">
                                                        Back
                                                    </button>
                                            </div>
                                            <div class="my-2">
                                                <PrimaryButton class="!px-2 !font-medium sm:!px-6 sm:py-2.5" type="button" @click="newRecipient">Add Recipient</PrimaryButton>
                                            </div>
                                    </div>
                                </form>
                                </transition>
                            </div>
                            </transition>

                            
                        </div>
                    </div>
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Content</h1>
                        <div class="block w-full px-3">
                            Content
                        </div>
                    </div>
                    <div class="p-4">
                        <PrimaryButton class=" justify-center mt-2 !font-semibold" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Save All Changes
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