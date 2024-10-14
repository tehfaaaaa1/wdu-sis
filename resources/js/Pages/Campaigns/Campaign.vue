<script setup>
import DialogModal from '@/Components/DialogModal.vue';
import Dropdown from '@/Components/Dropdown.vue';
import NavLink from '@/Components/NavLink.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import Show from '../Profile/Show.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
const props = defineProps({
    survey: Object,
    users: Object,
    response: Object
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
const submit = () => {
    form.get(route('email.send'), {
        onFinish: () => form.reset(),
    });
};

const importContact = () => {
    form.post(route('contact.import'))
}
const ShowCreate = ref(false)
const CampaignName = ref(null)
const newCampaign = ()=>{
    CampaignName.value = null
}
const createCampaign =()=>{
    form.transform(()=>({
        name: CampaignName.value
    })).post(route('create-campaign'), {onSuccess:ShowCreate.value = false})
}
</script>
<template>
    <AppLayout title="Campaign">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <!-- <form @submit.prevent="importContact">
                    <h1 class="text-lg font-semibold">Import File</h1>
                    <input type="file" @change="form.file = $event.target.files[0]">
                    <button type="submit">Import</button>
                </form> -->
                <div class="">
                    <SecondaryButton @click="ShowCreate = true; newCampaign()">
                        Create Campaign
                    </SecondaryButton>
                </div>
                <form class="bg-white p-3 rounded-md" @submit.prevent="submit">
                    <h1 class="text-lg font-semibold">Email Send</h1>
                    <input type="email" name="" id=""
                        class=" border-primary rounded-md text-sm placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md"
                        placeholder="Email">
                    <div class="flex items-center mt-2" name='content'>
                        <!-- <h2 class="font-semibold text-black">Pilih Survey</h2> -->
                        <div class="relative">
                            <h1>Pilih Survey</h1>
                            <Dropdown width="96" align="left">
                                <template #trigger>
                                    <input type="text" name="" id="" v-model="search" @click="search = ''"
                                        class="w-full mb-2 border-primary rounded-md text-sm placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-transparent  focus:shadow-md"
                                        placeholder="Search Survey">
                                </template>
                                <template #content>
                                    <div class="cursor-pointer p-2 grid "
                                        :class="filteredSurveys.length < 5 ? 'grid-cols-1' : 'grid-cols-2'">
                                        <div class="w-full  text-gray-700 cursor-pointer rounded-sm hover:bg-gray-200 "
                                            v-for="survey in filteredSurveys" @input="isi(survey.title)">
                                            <input type="radio" name="" :id="'survey_' + survey.id" :value="survey"
                                                v-model="form.selectedSurvey" class="hidden w-full">
                                            <label class="text-sm cursor-pointer block px-2 py-1 h-full"
                                                :for="'survey_' + survey.id">{{ survey.title }}</label>
                                        </div>
                                        <p v-if="filteredSurveys.length == 0" class="px-2 text-sm text-gray-700 ">Tidak
                                            Ada Survey Yang Sesuai</p>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="" v-if="form.selectedSurvey">
                        <h2 class="font-semibold text-black">Pilih Akun</h2>
                        <div class="w-full grid grid-cols-2 gap-2 text-gray-700">
                            <div class=""
                                v-for="user in users.filter(user => user.client_id == form.selectedSurvey.project.client.id && form.selectedSurvey.response.every(res => res.user_id != user.id))">
                                <input type="radio" :id="'user_' + user.id" name="user_id"
                                    class="checked:text-primary focus:ring-primary" v-model="form.selectedUser"
                                    :value="user">
                                <label :for="'user_' + user.id" class="pl-1.5 text-sm">{{ user.name }} {{
                                    form.selectedSurvey.response.some(res => res.user_id == user.id) ? '(sudah Mengisi)'
                                        :
                                        '(Belum Mengisi)'
                                }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="my-4">
                        <PrimaryButton class="justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Send Email
                        </PrimaryButton>
                    </div>
                </form>

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
                                <input v-model="CampaignName" type="text" placeholder="Campaign Name" class="border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-gray-500 focus:ring-inset text-sm lg:text-sm sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </template>
                    <template #footer>
                        <div class="flex items-center justify-between w-full">
                            <button type="button" class="inline-flex items-center rounded-md px-5 bg-red-500 py-2 text-sm mr-3 font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition" @click="ShowCreate = false">
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