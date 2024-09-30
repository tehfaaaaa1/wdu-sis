<script setup>
import Dropdown from '@/Components/Dropdown.vue';
import DropdownAlt from '@/Components/DropdownAlt.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue';
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
        ) ;
    });
});
const selectedSurvey = ref('')
const selectedUser = ref('') 
const isi =(surveyTitle)=>{
    search.value = surveyTitle
}
</script>
<template>
    <AppLayout title="Email">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="bg-white p-3 rounded-md">
                    <h1 class="text-lg font-semibold">Email Send</h1>
                    <input type="email" name="" id="" class=" border-primary rounded-md text-sm placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-none focus:shadow-md"
                    placeholder="Email">
                    <div class="flex items-center mt-2" name='content'>
                        <!-- <h2 class="font-semibold text-black">Pilih Survey</h2> -->
                        <div class="relative">
                            <h1>Pilih Survey</h1>
                            <Dropdown width="96" align="left">
                                <template #trigger>
                                    <input type="text" name="" id="" v-model="search" @click="search = ''" class="w-full mb-2 border-primary rounded-md text-sm placeholder:font-thin focus:ring-2 focus:ring-primary focus:border-transparent  focus:shadow-md"
                                    placeholder="Search Survey">
                                </template>
                                <template #content>
                                    <div class="cursor-pointer p-2 grid " :class="filteredSurveys.length < 5 ? 'grid-cols-1' : 'grid-cols-2'">
                                        <div class="w-full  text-gray-700 cursor-pointer rounded-sm hover:bg-gray-200 " v-for="survey in filteredSurveys" @input="isi(survey.title)">
                                            <input type="radio" name="" :id="'survey_'+survey.id" :value="survey" v-model="selectedSurvey" class="hidden w-full">
                                            <label class="text-sm cursor-pointer block px-2 py-1 h-full" :for="'survey_'+survey.id">{{ survey.title}}</label>
                                        </div>
                                        <p v-if="filteredSurveys.length == 0" class="px-2 text-sm text-gray-700 ">Tidak Ada Survey Yang Sesuai</p>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="" v-if="selectedSurvey">
                        <h2 class="font-semibold text-black">Pilih Akun</h2>
                        <div class="w-full grid grid-cols-2 gap-2 text-gray-700">
                            <div class="" v-for="user in users.filter(user => user.client_id == selectedSurvey.project.client.id && selectedSurvey.response.every(res=>res.user_id != user.id))">
                                <input type="radio" :id="'user_'+ user.id" name="user_id" class="checked:text-primary focus:ring-primary" v-model="selectedUser" :value="user">
                                <label :for="'user_'+ user.id" class="pl-1.5 text-sm">{{user.name }} {{ selectedSurvey.response.some(res=>res.user_id == user.id) ? '(sudah Mengisi)' : '(Belum Mengisi)' }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </AppLayout>
</template>