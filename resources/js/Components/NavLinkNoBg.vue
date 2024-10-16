<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: String,
    active: Boolean,
});

const classes = computed(() => {
    return props.active
        ? 'inline-flex items-center px-4 py-3 border-secondary text-sm text-gray-700 font-thin leading-5 bg-primary text-white hover:bg-ijo-gelap focus:outline-none focus:border-primary transition duration-150 ease-in-out focus:!text-white focus:ring-2 focus:ring-primary'
        : 'inline-flex items-center px-4 py-3 border-transparent text-sm text-gray-700 font-thin leading-5 text-black hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-0 transition duration-150 ease-in-out';
});
</script>

<template>
    <Link :href="href" :class="classes">
    <slot />
    </Link>
</template>
