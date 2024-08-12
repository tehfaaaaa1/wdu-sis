<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
</script>

<template>
    <AppLayout title="Survey">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Surveys
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg min-h-80">
                    <!-- <Welcome /> -->
                    <div class="flex justify-between items-center">
                        <div class="p-6">
                            <h1 class="text-3xl font-bold">Welcome back, {{ $page.props.auth.user.name }}</h1>
                            <p class="text-gray-500 mt-2">Check the latest updates here.</p>
                        </div>
                        <div class="hidden md:block">
                            <img src="/img/Group 63.png" alt="" width="300">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
