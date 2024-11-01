<script setup>
import { ref, watch } from 'vue'
import Tiptap from '@/Components/Tiptap.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import LeftSticky from '@/Components/LeftSticky.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useForm } from '@inertiajs/vue3';
import { debounce } from 'lodash';
import Dropdown from '@/Components/Dropdown.vue';

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
        td: [{ texts: text, files: file, types: element.types, open: false }]
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
// watch(() => content.value,
//     debounce((newVal) => {
//         console.log(content.value, newVal)
//     }, 3000),
//     { deep: true }
// )
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
        <style scoped>
#mail-content {
    min-height: 100vh;
}
/* texts */
.texts{
    width: 600px;
}
.texts .output{
    padding: 0.4rem 0.8rem;
}
/* image */
.image {
    width: 600px;
    min-height: 3rem;
    display: inline-flex;
    align-items: center;
    position: relative;
}
.image .img {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: inherit;
}
/* Button */
.button {
    width: 600px;
    padding: 0.75rem 0;
    text-align: center;
}
.button .mail {
    background-color: #5EB54D;
    padding: 0.5rem 1.25rem;
    text-align: center;
    color: white;
    font-size: 14px;
    border-radius: 6px;
    width: 176px;
    /* line-height: 1px; */
}
/* divider */
.divider {
    padding: 1rem 0;
    width: 600px;
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
const openEditor = ref(false)
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
                            <table class="prose mt-20" id="mail-content"
                                style="width: 600px; background-color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1); table-layout: auto;">
                                <tbody style="width: 100%; height: inherit;">
                                    <VueDraggable v-model="content[0].tr" group="content" class="min-h-[300px] w-full">
                                        <tr v-for="(tr, tr_index) in content[0].tr" class="" :key="tr_index"
                                            style="width: 100%;">
                                            <td v-for="(td, index) in tr.td" :key="index" style="width: 100%;" class="relative">
                                                <!-- {{ td }} -->
                                                <div class="texts hover:ring-2 hover:ring-primary" v-if="td.types == 'Text'"
                                                :class="td.open ? 'ring-2 ring-primary':''" @click="td.open = true" @focusout="td.open = false">
                                                    <Tiptap v-model="td.texts" />
                                                    <!-- <div class="output" v-html="td.texts"></div> -->
                                                </div>
                                                <div class="image hover:ring-2 hover:ring-primary"
                                                    v-if="td.types == 'Image'">
                                                    <input type="file" @input="handleImage($event, tr_index, index)"
                                                        name="" :id="'file' + [index]"
                                                        class="absolute left-0 right-0 mx-auto block w-1/2 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white"
                                                        :class="td.files[0].files ? 'bg-transparent file:bg-transparent text-transparent file:text-transparent w-full h-full' : ''">
                                                    <div class="img" v-if="td.files[0].files != '' "
                                                        v-for="(img, index) in td.files" :key="index">
                                                        <img :src="img.files" alt="" style="width: 600px; max-height: 600px; object-fit: contain;">
                                                    </div>
                                                </div>
                                                <div class="button hover:ring-2 hover:ring-primary"
                                                    v-if="td.types == 'Button'">
                                                    <button class="bg-primary px-3 py-1.5 rounded-md">
                                                        <input
                                                            class="btn-input placeholder:text-sm text-center bg-transparent w-full p-0 text-sm text-white placeholder:text-white border-none hover:ring-0 focus:ring-0"
                                                            type="text" v-model="td.texts" placeholder="Input Text Here"
                                                            name="" id="">
                                                    </button>
                                                    <button class="mail">
                                                        {{ td.texts }}
                                                    </button>
                                                </div>
                                                <div class="divider hover:ring-2 hover:ring-primary" v-if="td.types == 'Divider'">
                                                    <div class="line"></div>
                                                </div>
                                                <div v-show="td.open" class="absolute -right-8 bottom-2 z-10 bg-white" @click="td.open = true">
                                                    <Dropdown>
                                                            <template #trigger>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                    </svg>
                                                            </template>
                                                            <template #content>  </template>
                                                    </Dropdown>
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
<style scoped>
#mail-content {
    min-height: 100vh;
}
/* texts */
.texts{
    width: 600px;
}
.texts .output{
    padding: 0.4rem 0.8rem;
}
/* image */
.image {
    width: 600px;
    min-height: 3rem;
    display: inline-flex;
    align-items: center;
    position: relative;
}
.image .img {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: inherit;
}
/* Button */
.button {
    width: 600px;
    padding: 0.75rem 0;
    text-align: center;
}
.button .mail {
    background-color: #5EB54D;
    padding: 0.5rem 1.25rem;
    text-align: center;
    color: white;
    font-size: 14px;
    border-radius: 6px;
    width: 176px;
    /* line-height: 1px; */
}
/* divider */
.divider {
    padding: 1rem 0;
    width: 600px;
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