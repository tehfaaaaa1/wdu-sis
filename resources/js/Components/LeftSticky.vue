<template>
    <aside class="sticky bg-gray-200 min-h-full z-30" :class="topPosClass">
        <div class="absolute lg:w-1/5">
            <slot />
        </div>
    </aside>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    top: {
        type: String, default: '0'
    }
})

const topPosClass = computed(() => {
    return {
        '0': 'top-0',
        '11': 'top-11',
    }[props.top.toString()];
});
</script>