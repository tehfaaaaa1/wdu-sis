<script setup>
import { ref, watch } from 'vue'
import Tiptap from '@/Components/Tiptap.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import LeftSticky from '@/Components/LeftSticky.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useForm } from '@inertiajs/vue3';

const content = ref([{
    tr: [{
        td: [
            { types: 'Text', name: 'Text', texts: '' },
            { types: 'Image', name: 'Image', files: '' },
            { types: 'Button', name: 'Button', texts: '' },
        ],
    }]
}])
const elementOrLayout = ref('element')

const elementsType = ref([
    { types: 'Text', name: 'Text', texts: '' },
    { types: 'Image', name: 'Image', files: '' },
    { types: 'Button', name: 'Button', texts: '' },
    { types: 'Divider', name: 'Divider' },
]);

function cloneElement(element) {
    let text = []
    let file = []
    switch (element.name) {
        case 'Text':
        case 'Button':
            text = [{ isi: '' }]
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
watch(content.value, () => {
    console.log(content.value)
}, { deep: true })
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
            <LeftSticky>
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
                <tr>
                    <td align="center" bgcolor="#f4f4f4" style="padding: 20px;">
                        <table id="mail-content"
                            style="width: 600px; background-color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);">
                            <VueDraggable v-model="content[0].tr" group="content" class="h-full" id="drag-tr">
                                <tr v-for="(tr, tr_index) in content[0].tr" :key="tr_index"
                                    style="background-color: red;">
                                    <td v-for="(td, index) in tr.td" :key="index">
                                        {{ td.types }}
                                    </td>
                                </tr>
                            </VueDraggable>
                        </table>
                    </td>
                </tr>
            </table>
        </main>
    </AppLayout>
</template>

<style scoped lang="scss">
#mail-content {
    min-height: 100vh;
}

#drag-tr {
    width: 100%;

    tr {
        width: 100%;

        &:hover {
            outline: 2px solid red;
        }
    }
}
</style>