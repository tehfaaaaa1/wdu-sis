<template>

    <div ref="editor"></div>

</template>
<script setup>
import Quill from 'quill';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { onMounted, ref, defineEmits } from 'vue';

const props = defineProps({
    modelValue: { type: String, default: '' }
})
const editor = ref(null);
const toolbarOptions = {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],  [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }], 
            [{ 'align': [] }],
        ],
    },
    theme: 'snow',
    formats: ["bold", "underline", "header", "italic", "link", "list", "indent", "color", "background", "align"],
    placeholder: "Type something in here!",
}
const emit = defineEmits(['update:modelValue']);
onMounted(() => {
    const quill = new Quill(editor.value, { ...toolbarOptions });
    quill.root.innerHTML = props.modelValue;

    quill.on('text-change', function () {
        
        emit('update:modelValue', quill.getText() ? quill.root.innerHTML : '');
    })

    // currentValue = props.modelValue;
})
</script>