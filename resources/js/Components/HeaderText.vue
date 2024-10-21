<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            <a :href="href" class="hover:underline text-primary flex items-center gap-x-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 text-gray-500" v-show="show == true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <p>
                    <slot />
                </p>
            </a>
        </h2>
    </div>
</template>
<script setup>
const props = defineProps({
    href: String,
    show: {
        type: Boolean,
        default: true,
    },
})
</script>