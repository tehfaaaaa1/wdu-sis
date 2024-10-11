<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: String,
    active: Boolean,
});

const classes = computed(() => {
    return props.active
        ? 'inline-flex items-center px-4 py-3 my-3 bg-primary rounded-md border-secondary text-sm text-white font-medium leading-5 hover:bg-ijo-gelap focus:outline-none focus:border-primary transition duration-150 ease-in-out focus:!text-white focus:ring-2 focus:ring-primary'
        : 'inline-flex items-center px-4 py-3 my-3 rounded-md border-transparent text-sm font-medium leading-5 text-black hover:text-primary hover:ring-2 hover:ring-primary hover:bg-white focus:outline-none focus:ring-2 focus:hover:!ring-primary focus:ring-primary transition duration-150 ease-in-out';
});
</script>

<template>
    <Link :href="href" :class="classes">
    <slot />
    </Link>
</template>
