<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex items-center rounded-md px-5 py-2.5 bg-secondary text-white border-transparent  text-sm font-medium leading-6 shadow-sm hover:bg-transparent hover:ring-2 hover:ring-secondary hover:text-secondary outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out">
        <slot />
    </button>
</template>
