<template>
    <div>

        <div class="flex flex-wrap -mb-1">
            <template v-for="(link, linkIndex) in links" :key="linkIndex">
                <div class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                    v-html="link.label"></div>
                <Link
                    class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded hover:bg-white focus:border-indigo-500 inline-block focus:text-indigo-500"
                    :class="{ 'bg-blue-700 text-white': link.active }" :href="link.url">
                <span v-html="link.label"></span>
                </Link>
            </template>
        </div>

    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
defineProps({
    links: Array
});
</script>