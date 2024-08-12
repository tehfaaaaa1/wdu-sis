<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
<<<<<<< HEAD
    <button     :type="type" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150">
=======
    <button :type="type" class="inline-flex items-center w-full rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ijo-terang focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition">
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e
        <slot />
    </button>
</template>
