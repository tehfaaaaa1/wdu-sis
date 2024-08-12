<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex items-center rounded-md bg-secondary px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ijo-terang focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition">
        <slot />
    </button>
</template>
