<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex items-center rounded-md px-5 bg-secondary py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-transparent hover:ring-2 hover:ring-secondary hover:text-secondary outline-none focus-visible:ring-2 focus-visible:ring-secondary transition">
        <slot />
    </button>
</template>
