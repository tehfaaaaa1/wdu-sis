<script setup>
import DialogModal from '@/Components/DialogModal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
const props = defineProps({
    survey: Object,
    users: Object,
    response: Object,
    campaigns: Object
})
const search = ref('')
const filteredSurveys = computed(() => {
    return props.survey.filter(survey => {
        return (
            survey.title.toLowerCase().includes(search.value.toLowerCase())
        );
    });
});
const form = useForm({
    selectedSurvey: '',
    selectedUser: '',
    file: '',
})
const isi = (surveyTitle) => {
    search.value = surveyTitle
}
const ShowCreate = ref(false)
const CampaignName = ref(null)
const newCampaign = () => {
    CampaignName.value = null
}
const createCampaign = () => {
    form.transform(() => ({
        name: CampaignName.value
    })).post(route('create-campaign'), { onSuccess: ShowCreate.value = false })
}
</script>
<template>
    <AppLayout title="Campaign">
        <main class="min-h-screen">
            <div class="mx-auto rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <!-- <form @submit.prevent="importContact">
                    <h1 class="text-lg font-semibold">Import File</h1>
                    <input type="file" @change="form.file = $event.target.files[0]">
                    <button type="submit">Import</button>
                </form> -->
                <div class="mb-5">
                    <SecondaryButton class="mb-0" @click="ShowCreate = true; newCampaign()">
                        Create Campaign
                    </SecondaryButton>
                </div>
                <div class="bg-white shadow-md rounded-md border-t-6 border-primary">
                    <h2 class="font-semibold text-lg p-3">All Campaigns</h2>
                    <div class="border-b border-gray-200"></div>
                    <div class="block" v-for="(campaign, index) in campaigns" :key="index">
                        <div class="flex items-center w-full p-3 hover:bg-gray-50 item-row">
                            <div class="block">
                                <a :href="route('campaign-details', [campaign.slug])">{{ campaign.name }}</a>
                                <p>Draft | Sent On {{ campaign.dibuat }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogModal :show="ShowCreate" @close="ShowCreate = false">
                    <template #title>
                        <div>
                            Create Campaign
                        </div>
                    </template>
                    <template #content>
                        <div class="block w-full border border-gray-300 p-4">
                            <div class="flex justify-between items-center text-base">
                                Campaign name
                                <input v-model="CampaignName" type="text" placeholder="Campaign Name"
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
                            <PrimaryButton @click="createCampaign()">Save</PrimaryButton>
                        </div>
                    </template>
                </DialogModal>
            </div>
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