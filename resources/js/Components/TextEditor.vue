<template>
    <QuillyEditor ref="editor" v-model="model" :options="toolbarOptions" class="" />
</template>

<script setup lang="ts">
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { QuillyEditor } from 'vue-quilly';
import { onMounted, ref } from 'vue';

const toolbarOptions = {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
        ],
    },
    placeholder: 'Insert text here...',
    readOnly: false
};

const editor = ref<InstanceType<typeof QuillyEditor>>();
const model = ref<string>('<p>Hello Quilly!</p>');

let quill: Quill | null = null;

onMounted(() => {
    quill = editor.value?.initialize(Quill)!;
});
</script>

<style scoped>
.ql-container {
    height: 200px;
}
</style>
