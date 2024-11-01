<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 cursor-auto">
        <div class="absolute inset-0 bg-gray-600 opacity-25"></div>
        <div class="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Confirm deletion</h2>
            <p class="text-gray-600 mb-6">Are you sure want to delete? This action cannot be undone.</p>
            <div class="flex justify-end space-x-4">
                <button @click="cancel" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                    Cancel
                </button>
                <button @click="confirm" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
    },
    emits: ['confirm', 'cancel'],
    methods: {
        confirm() {
            this.$emit('confirm');
        },
        cancel() {
            this.$emit('cancel');
        },
    },
};
</script>