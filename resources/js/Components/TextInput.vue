<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: String,
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input
        ref="input"
<<<<<<< HEAD
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
=======
        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset text-sm lg:text-base focus:ring-primary sm:text-sm sm:leading-6"
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>
