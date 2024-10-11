<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex items-center rounded-md px-5 bg-secondary py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-biru-gelap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition">
        <slot />
    </button>
</template>
