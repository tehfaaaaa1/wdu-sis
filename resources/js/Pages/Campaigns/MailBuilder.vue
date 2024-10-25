<script setup>
import { ref, watch } from 'vue'
import Tiptap from '@/Components/Tiptap.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import LeftSticky from '@/Components/LeftSticky.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useForm } from '@inertiajs/vue3';
import { debounce } from 'lodash';

const content = ref([{
    tr: [{
        td: [
            // { types: 'Divider', name: 'Divider' },
        ],
    }]
}])
const elementOrLayout = ref('element')

const elementsType = ref([
    { types: 'Text', name: 'Text', texts: '' },
    { types: 'Image', name: 'Image', files: '', texts: '' },
    { types: 'Button', name: 'Button', texts: '' },
    { types: 'Divider', name: 'Divider' },
]);

function cloneElement(element) {
    let text = []
    let file = []
    switch (element.name) {
        case 'Text':
        case 'Button':
            text = ''
            break;
        case 'Image':
            file = [{ files: '' }]
            break;

        default:
            break;
    }
    return {
        td: [{ texts: text, files: file, types: element.types }]
    };
}
const handleImage = (event, tr_index, td_index) => {
    content.value[0].tr[tr_index].td[td_index].texts = event.target.files[0];
    content.value[0].tr[tr_index].td[td_index].files[0].files = event.target.files[0];
    var input = event.target;
    if (input.files) {
        if (content.value[0].tr[tr_index].td[td_index].files[0].files.size / 1024 > 2048) {
            alert('EXCEED IMAGE SIZE LIMIT');
            exit;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
            content.value[0].tr[tr_index].td[td_index].files[0].files = e.target.result;
        }
        reader.readAsDataURL(input.files[0])
    }
}
watch(() => content.value,
    debounce((newVal) => {
        console.log(content.value, newVal)
    }, 3000),
    { deep: true }
)
const form = useForm({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>'
})

const mail = ref()
const exportToHTML = () => {
    const element = mail.value
    const htmlContent = element.outerHTML

    const fullHTML = `
    <!DOCTYPE html>
    <head>
        <title>Exported Content</title>
    </head>
    <body>
        ${htmlContent}
    </body>
    </html>
    `

    const blob = new Blob([fullHTML], { type: 'text/html' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'exported-content.html'

    link.click()
}

</script>

<template>
    <AppLayout title="Build Email">
        <main class="min-h-screen">
            <header class="bg-white grid grid-cols-2 items-center border-b border-gray-300 sticky top-0 z-50">
                <button @click="exportToHTML">Save</button>
            </header>
            <LeftSticky class="top-6">
                <div class="flex" id="element-or-layout">
                    <h1 @click="elementOrLayout = 'element'"
                        class="bg-white text-center font-semibold py-2.5 border-b-2 select-none cursor-pointer w-full"
                        :class="{ 'border-ijo-terang': elementOrLayout == 'element' }">
                        Elements
                    </h1>
                    <h1 @click="elementOrLayout = 'layout'"
                        class="bg-white text-center font-semibold py-2.5 border-b-2 select-none cursor-pointer w-full"
                        :class="{ 'border-ijo-terang': elementOrLayout == 'layout' }">
                        Layout
                    </h1>
                </div>
                <div class="" id="add-element" v-if="elementOrLayout == 'element'">
                    <VueDraggable v-model="elementsType" :group="{ name: 'content', pull: 'clone', put: false }"
                        :animation="150" :clone="cloneElement" :sort="false" class="grid grid-cols-2">
                        <div v-for="item in elementsType" :key="item.types" class="bg-white border-b border-gray-300 py-2 px-4 flex justify-center
                            items-center cursor-grab hover:font-semibold">
                            <span>{{ item.name }}</span>
                        </div>
                    </VueDraggable>
                </div>
                <div class="bg-white" id="add-flow" v-if="elementOrLayout == 'layout'">
                    <div class="border-b border-gray-300 py-2 px-4">
                        Layout
                    </div>
                </div>
            </LeftSticky>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" ref="mail" id="mail">
                <tbody>
                    <tr>
                        <td align="center" bgcolor="#f4f4f4" style="padding: 20px;">
                            <table id="mail-content"
                                style="width: 600px; background-color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1); table-layout: auto;">
                                <tbody style="width: inherit; height: inherit;">
                                    <VueDraggable v-model="content[0].tr" group="content"
                                        style="height: 100%; width: 100%;">
                                        <tr v-for="(tr, tr_index) in content[0].tr" :key="tr_index"
                                            style="width: 100%;">
                                            <td v-for="(td, index) in tr.td" :key="index">
                                                <!-- {{ td }} -->
                                                <div class="texts" v-if="td.types == 'Text'">
                                                    <Tiptap v-model="td.texts" />
                                                </div>
                                                <div class="image" v-if="td.types == 'Image'">
                                                    <!-- {{ td }} -->
                                                    <input type="file" @input="handleImage($event, tr_index, index)"
                                                        name="" :id="'file' + [index]"
                                                        class="absolute left-0 right-0 mx-auto block w-1/2 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white"
                                                        :class="td.files[0].files ? 'bg-transparent file:bg-transparent text-transparent file:text-transparent w-full h-full' : ''">
                                                    <div class="" v-for="(img, index) in td.files" :key="index">
                                                        <img :src="img.files" alt="">
                                                    </div>
                                                </div>
                                                <div class="button " v-if="td.types == 'Button'">
                                                    <button :value="td.texts">
                                                        <input class="btn-input " type="text" v-model="td.texts"
                                                            placeholder="Input Text Here" name="" id="">
                                                    </button>
                                                </div>
                                                <div class="divider" v-if="td.types == 'Divider'">
                                                    <div class="line">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </VueDraggable>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </AppLayout>
</template>
<style>
#mail-content {
    height: 100vh;
}

.image {
    width: 100%;
    min-height: 5rem;
    display: inline-flex;
    align-items: center;
    position: relative;
}

.image:hover {
    outline: 2px solid #5EB54D;
}

.button {
    width: inherit;
    padding: 0.75rem 0;
    text-align: center;
}

.button:hover {
    outline: 2px solid #5EB54D;
}

.button button {
    display: inline-flex;
    align-items: center;
    border: transparent;
    size: 14px;
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.btn-input {
    background-color: transparent;
    border-radius: 6px;
    border: transparent;
    color: white;
    padding: 0.5rem 1rem;
    background-color: #5EB54D;
    text-align: center;
}

.btn-input::placeholder {
    color: white;
}

.btn-input:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    ;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}

.divider {
    padding: 1.2rem 0;
    width: inherit;
}

.divider:hover {
    outline: 2px solid #5EB54D;
    cursor: pointer;
}

.divider .line {
    width: 80%;
    height: 0.2rem;
    background-color: #5EB54D;
    margin: auto;
    border-radius: 2px;
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
