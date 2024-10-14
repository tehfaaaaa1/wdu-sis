<script setup>
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
const props = defineProps({
    campaign: Object,
    created: Object
})

</script>
<template>
    <AppLayout title=" Campaign Details">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="mb-3">
                    <h1 class="text-xl ms-2 font-medium">{{ campaign.name }}</h1>
                    <p>draft| Created on {{ created }}</p>
                </div>
                <form action="" class="bg-white p-4 block rounded-sm">
                    <div class="flex">
                        <h1 class="font-medium w-1/5">Subject</h1>
                        <input type="text" placeholder="Subject"/>
                    </div>
                    <div class="flex">
                        <h1 class="font-medium w-1/5">Sender</h1>
                        <div class="block">
                            <h2>{{ campaign.sender ?? 'Who is Sending This Email' }}</h2>
                            <PrimaryButton v-if="campaign.subject == null">Add Sender Details</PrimaryButton>
                        </div>
                    </div>
                    <div class="flex">
                        <h1 class="font-medium w-1/5">Recipient</h1>
                        <div class="block">
                            <h2>{{ campaign.recipient_id ?? 'Choose the recipient or create new.' }}</h2>
                            <PrimaryButton v-if="campaign.subject == null">Add Recipient</PrimaryButton>
                        </div>
                    </div>
                    <div class="flex">
                        <h1 class="font-medium w-1/5">Content</h1>
                        <div class="block">
                           Content
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </AppLayout>
</template>
