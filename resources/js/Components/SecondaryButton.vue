<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex bg-primary text-white items-center px-6 py-3 my-3 rounded-md border-transparent text-sm leading-5 font-medium hover:text-primary hover:ring-2 hover:ring-primary hover:bg-transparent focus:outline-none focus:ring-2 focus:hover:ring-primary focus:ring-primary transition duration-150 ease-in-out">
        <slot />
    </button>
</template>
