<template>
    <div v-if="links.length > 0">

        <div class="flex justify-center space-x-2 bg-white py-2">
            <template v-for="(link, linkIndex) in links" :key="linkIndex">
                <div v-if="link.url === null"></div>

                <Link v-else
                    class="transition mr-1 px-4 py-3 text-sm leading-4 text-gray-400 ring-1 ring-gray-200 rounded hover:bg-gray-100 focus:bg-gray-100 inline-block outline-0"
                    :class="{ 'bg-secondary hover:brightness-90 focus:brightness-90 focus:bg-secondary text-white hover:bg-secondary': link.active }"
                    :href="link.url">                    
                    <span v-html="link.label"></span>
                </Link>
            </template>
        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { defineEmits } from 'vue';
const props = defineProps({
    links: {
        type: Object,
        required: true,
        default: () => ({
            prev_page_url: null,
            next_page_url: null
        })
    }
});

if(props.links.find(l=> l.label == 'pagination.next')){
    props.links.find(l=> l.label == 'pagination.next').label = 'Next'
}
if(props.links.find(l=> l.label == 'pagination.previous')){
    props.links.find(l=> l.label == 'pagination.previous').label = 'Previous'
}
</script>
