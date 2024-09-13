<template>
    <div class="flex flex-wrap -mb-1 justify-between space-x-4">
        <!-- Previous Button -->
        <Link v-if="links.prev_page_url"
            class="inline-flex items-center rounded-md px-5 bg-secondary py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ijo-terang focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition"
            :href="links.prev_page_url"
            @click.prevent="navigate(links.prev_page_url)"
            >
            Previous
        </Link>

        <!-- Next Button -->
        <Link v-if="links.next_page_url"
            class="inline-flex items-center rounded-md px-5 bg-secondary py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ijo-terang focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition"
            :href="links.next_page_url"
            @click.prevent="navigate(links.next_page_url)"
            >
            Next
        </Link>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { defineEmits } from 'vue';

defineProps({
    links: {
        type: Object,
        required: true,
        default: () => ({
            prev_page_url: null,
            next_page_url: null
        })
    }
});

const emit = defineEmits(['navigate']);
const navigate = (url) => {
    emit('navigate', url)
}
</script>
