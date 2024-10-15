<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
    recipients: Object
})
const ShowCreate = ref(false)
const RecipientName = ref(null)
const newRecipient = () => {
    RecipientName.value = null
}
const form = useForm({
    name: null
})
const createRecipient = () => {
    form.transform(() => ({
        name: RecipientName.value
    })).post(route('create-recipient'), { onSuccess: ShowCreate.value = false })
}
</script>
<template>
    <AppLayout title="Recipient">
        <main class="min-h-screen">
            <div class="mx-auto rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex gap-x-5 mb-5">
                    <SecondaryButton @click="ShowCreate = true; newRecipient()">
                        Create Recipient
                    </SecondaryButton>
                </div>
                <div class="bg-white shadow-md rounded-md border-t-6 border-primary">
                    <h2 class="font-semibold text-lg p-3">All Recipients</h2>
                    <div class="border-b border-gray-200"></div>
                    <div class="block" v-for="(recipient, index) in recipients" :key="index">
                        <div class="flex items-center w-full p-3 hover:bg-gray-50 item-row">
                            <div class="block">
                                <a :href="route('add-contact', [recipient.id])">{{ recipient.name }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogModal :show="ShowCreate" @close="ShowCreate = false">
                <template #title>
                    <div>
                        Create Recipient
                    </div>
                </template>
                <template #content>
                    <div class="block w-full border border-gray-300 p-4">
                        <div class="flex justify-between items-center text-base">
                            Recipient name
                            <input v-model="RecipientName" type="text" placeholder="Recipient Name"
                                class="border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-gray-500 focus:ring-inset text-sm lg:text-sm sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </template>
                <template #footer>
                    <div class="flex items-center justify-between w-full">
                        <button type="button"
                            class="inline-flex items-center rounded-md px-5 bg-red-500 py-2 text-sm mr-3 font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition"
                            @click="ShowCreate = false">
                            Back
                        </button>
                        <PrimaryButton @click="createRecipient()">Save</PrimaryButton>
                    </div>
                </template>
            </DialogModal>
        </main>
    </AppLayout>
</template>

<style scoped>
.item-row p {
    font-size: 14px;
    color: gray;
}

.item-row:hover a {
    color: #5EB54D;
}

.item-row:not(:last-child) {
    border-bottom: 1px solid rgb(229, 231, 235);
}
</style>