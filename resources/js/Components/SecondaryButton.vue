<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex items-center rounded-md px-5 py-2.5 my-3 bg-primary text-white border-transparent text-sm font-medium leading-6 shadow-sm hover:bg-transparent hover:ring-2 hover:text-primary hover:ring-primary outline-none focus:ring-2 focus:hover:ring-primary focus:ring-primary transition duration-150 ease-in-out">
        <slot />
    </button>
</template>
