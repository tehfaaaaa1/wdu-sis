<script setup>
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Tiptap from '@/Components/Tiptap.vue';
import AppLayout from '@/Layouts/AppLayout.vue';


</script>

<template>
    <AppLayout title="Build Email">
        <main class="min-h-screen">
            <div class="mx-auto max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-center mb-6">
                    <div class="max-w-[350px]">
                        <AuthenticationCardLogo />
                    </div>
                </div>
                <Tiptap />
            </div>
        </main>
    </AppLayout>
</template>