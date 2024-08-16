<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto">
                    <!-- <Welcome /> -->
                    <div class="flex flex-row items-center w-full">
                        <div class="p-6 basis-1/2">
                            <h1 class="text-3xl ps-3 font-bold">Welcome back, {{ $page.props.auth.user.name }}</h1>
                            <p class="text-gray-500 ps-3">Check the latest updates here.</p>
                        </div>
                        <div class="hidden md:flex justify-end shadow-md m-3 rounded-lg basis-1/2 ">
                            <img src="/img/wdu-Building.jpg" alt="" class="rounded-lg">
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    </AppLayout>
</template>
