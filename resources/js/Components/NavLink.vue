<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: String,
    active: Boolean,
});

const classes = computed(() => {
    return props.active
        ? 'inline-flex items-center px-4 my-3 bg-secondary rounded-md border-secondary text-sm text-white font-medium leading-5 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'inline-flex items-center px-4 my-3 rounded-md border-transparent text-sm font-medium leading-5 text-white hover:text-secondary hover:bg-white focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out';
});
</script>

<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
<<<<<<< HEAD
</template>
=======
</template>
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
