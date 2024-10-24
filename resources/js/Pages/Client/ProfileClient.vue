<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import HeaderText from '@/Components/HeaderText.vue';

const { props } = usePage();
const client = props.client;
const projects = props.project;
const clientSlug = client.slug;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

// const readmore = ref(false)
const isTruncated = ref(false);
const showFullText = ref(false);       
const elementRef = ref(null);

const toggleText = () => {
    showFullText.value = !showFullText.value;
};
// Function to check if the element is truncated
const checkTruncation = () => {
    const element = elementRef.value;
    if (element) {
        isTruncated.value = element.scrollHeight > element.offsetHeight;
    }
};
// Watch for changes in showFullText
watch(showFullText, async () => {
    await nextTick();
    checkTruncation();
    console.log(elementRef.value.scrollHeight)
});

onMounted(async () => {
    await nextTick(); // Ensure the DOM and styles are applied before checking
    checkTruncation();
});
</script>

<template>
    <AppLayout title="Profile Client">
        <template #header>
            <HeaderText :href="route('listclient')">
                <span class="text-black">Profile Client - </span>{{ client.client_name }}
            </HeaderText>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="py-12 bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto flex flex-col items-center">
                    <img :src="`/img/${client.image}`" alt=""
                        class="h-60 w-full object-scale-down border-b-1 border-gray-400">
                        <div class="mx-4 px-4 mt-3 py-5">
                        <div ref="elementRef" class="text-base text-justify leading-5 tracking-wide"
                            :class="{ 'line-clamp-3': !showFullText }">
                            {{ client.desc }}
                        </div>
                        <SecondaryButton @click="toggleText" v-if="isTruncated && !showFullText">
                            Expand
                        </SecondaryButton>
                        <SecondaryButton @click="toggleText" v-if="showFullText">
                            Collapse
                        </SecondaryButton>
                        <div class="mt-5 grid grid-cols-2 gap-2">
                            <div>Instansi</div>
                            <div class="font-bold">{{ client.client_name }}</div>
                            <div>Alamat</div>
                            <div class="font-bold">{{ client.alamat }}</div>
                            <div>Kontak</div>
                            <div class="font-bold">{{ client.phone }}</div>
                            <div>Tanggal Tender</div>
                            <div class="font-bold">{{ formatDate(client.date) }}</div>
                            <div>Project</div>
                            <ul class="list-decimal mx-4">
                                <li v-for="project in projects" :key="project.id" class="mb-2">
                                    <a :href="route('listsurvey', [clientSlug, project.slug])"
                                        class="flex items-center gap-x-1 hover:text-primary transition">
                                        <strong>{{ project.project_name }}</strong>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"     stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </a>
                                    <div class="text-sm text-gray-600">
                                        {{ project.desc }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        Tanggal: {{ formatDate(project.created_at) }}
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
