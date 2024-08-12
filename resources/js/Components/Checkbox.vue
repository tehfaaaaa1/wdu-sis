<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:checked']);

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        default: false,
    },
    value: {
        type: String,
        default: null,
    },
});

const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit('update:checked', val);
    },
});
</script>


<template>
<<<<<<< HEAD
    <input
        v-model="proxyChecked"
        type="checkbox"
        :value="value"
        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
    >
=======
    <input v-model="proxyChecked" type="checkbox" :value="value" class="rounded border-secondary text-secondary shadow-sm focus:ring-secondary">
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e
</template>
