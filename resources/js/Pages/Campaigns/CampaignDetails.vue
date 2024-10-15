<script setup>
import NavLink from '@/Components/NavLink.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    campaign: Object,
    created: String,
    recipients: Object
})
const addRecipient = ref(false);
const form = useForm({
    subject: props.campaign.subject ?? '',
    sender:props.campaign.sender ?? '',
    recipient_id : props.campaign.recipient_id ?? '',
    isi:props.campaign.content ?? ''
})
const submit = ()=>{
    form.post(route('campaign-data', [props.campaign.id]))
}
</script>
<template>
    <AppLayout title=" Campaign Details">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <NavLink :href="route('campaigns')">Back</NavLink>
                <div class="mb-3">
                    <h1 class="text-xl font-medium">{{ campaign.name }}</h1>
                    <p>Draft | Created on {{ created }}</p>
                </div>
                <form action="" @submit.prevent="submit" class="bg-white block rounded-sm">
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Subject</h1>
                        <input v-model="form.subject" type="text" placeholder="Subject"/>
                    </div>
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Sender</h1>
                        <div class="block">
                            <h2>{{ campaign.sender ?? 'Who is Sending This Email' }}</h2>
                            <PrimaryButton v-if="campaign.subject == null">Add Sender Details</PrimaryButton>
                        </div>
                    </div>
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Recipient</h1>
                        <div class="block px-3 w-full">
                            <div :class="campaign.recipient_id == null ? 'block' : 'flex justify-between'" class="w-full">
                                <h2>{{ campaign.recipient?.name ?? 'Choose the recipient or create new.' }}</h2>
                                <SecondaryButton type="button" @click="addRecipient =! addRecipient">
                                    {{ campaign.recipient_id == null ? 'Add Recipient' : 'Edit Recipient' }}
                                </SecondaryButton>
                            </div>

                            <div class="w-full p-3 shadow-md rounded-sm" v-show="addRecipient">
                                <div class="" v-for="(recipient, rIndex) in recipients" :key="rIndex">
                                    <input type="radio" :id="'recipient_' + recipient.id" name="recipient_id" class="checked:text-primary focus:ring-primary"
                                    v-model="form.recipient_id" :value="recipient.id" />
                                <label :for="'recipient_' + recipient.id" class="pl-1.5 text-sm">{{ recipient.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-field">
                        <h1 class="font-medium w-1/5">Content</h1>
                        <div class="block">
                           Content
                        </div>
                    </div>
                    <div class="m-4">
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
}

.form-field:last-child {
    border: 0;
}

.form-field h2 {
    margin-bottom: 0.25rem;
}
</style>