    <script setup>
    import { ref } from 'vue';
    import { computed } from 'vue';
    import AppLayout from '@/Layouts/AppLayout.vue';

    const props = defineProps({
        surveys: Object,
        projects: Object,
        clients: Object,
        page: Array,
        responses: [Array, Object],
        answer: Array,
        biodata: Object,
        start: String,
        submit: String,
        provinces: Array,
    });

    const project = props.projects[0]
    const client = props.clients[0]

    const provinceName = computed(() => {
        const province = props.provinces.find(p => p.id === props.biodata.province_id);
        return province ? province.name : 'Unknown Province';
    });

    const checked = (choice, q) => {
        return q.answer.some(ans => ans.answer == choice.id && ans.response_id == props.responses.id);
    };

</script>

    <template>
        <AppLayout title="Hasil Survey">
            <main class="min-h-screen">
                <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <div class="bg-white">

                        <div class="p-5 mt-2 border-2 border-gray-300">
                            <h2 class="font-semibold text-lg mb-2">Biodata Responden</h2>
                            <h3 class="font-medium">Nama Responden: {{ props.biodata.nama_responden }}</h3>
                            <h3 class="font-medium">Alamat: {{ props.biodata.alamat }}</h3>
                            <h3 class="font-medium">Asal Provinsi: {{ provinceName }}</h3>
                            <h3 class="font-medium">Nomor Telp: {{ props.biodata.no_hp }}</h3>
                            <h3 class="font-medium">Instansi: {{ props.biodata.instansi }}</h3>
                            <h3 class="font-medium">Waktu Mulai: {{ props.start }}</h3>
                            <h3 class="font-medium">Waktu Submit: {{ props.submit }}</h3>
                        </div>
                    </div>
                    <div class="border w-full border-gray-400 my-6"></div>
                    <div class="mb-5" v-for="(page, ind) in page" :key="ind">
                        <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                            <h2>{{ page.page_name }}</h2>
                        </div>
                        <div class="bg-white rounded-b-md">
                            <div class="p-5 flex w-full">
                                <form class="w-full">
                                    <div v-for="(question, index) in page.question.sort((a, b) => a.order - b.order)"
                                        :key="index">
                                        <div class="block mb-2.5"
                                            v-if="question.question_type_id <= 3 || question.question_type_id == 6">
                                            <div class="font-semibold flex gap-x-1">{{ index + 1 }}. <label
                                                    v-html="question.question_text" class="output"></label></div>
                                            <!-- Handling radio inputs for question type 2 -->
                                            <div
                                                v-if="question.question_type_id == 2 || question.question_type_id == 6">
                                                <div v-for="(list, i) in question.choice" :key="i"
                                                    class="flex items-center gap-x-3">
                                                    <input type="radio" :name="'radio' + list.id"
                                                        :id="'radio' + list.id" :checked="checked(list, question)"
                                                        disabled>
                                                    <span class="font-bold">{{ list.scale }}</span>
                                                    <label :for="'radio' + list.id" class="">
                                                        {{ list.value }}
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- Handle checkbox for question type 3 -->
                                            <div class="" v-if="question.question_type_id === 3">
                                                <div class="" v-for="(list, i) in question.choice" :key="i">
                                                    <input type="checkbox" :name="'checkbox' + list.id"
                                                        :id="'checkbox' + list.id" :checked="checked(list, question)"
                                                        disabled>
                                                    <label :for="'checkbox' + list.id" class="px-3">{{ list.value
                                                        }}</label>
                                                </div>
                                            </div>
                                            <!-- Handling textarea for question type 1 -->
                                            <div v-if="question.question_type_id == 1">
                                                <div class="px-5 mt-2" v-for="answe in answer">
                                                    <input v-if="answe.question_id == question.id" type="text"
                                                        :value="answe.answer" disabled class="rounded w-full">
                                                </div>
                                            </div>
                                            <div v-if="question.question_type_id == 4">
                                                <img :src="'/img/' + question.question_text" />
                                            </div>
                                            <div v-html="question.question_text" v-if="question.question_type_id == 5"
                                                class="output"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    </template>
<style>
@import url('/resources/css/quill-overwrite.css');
</style>