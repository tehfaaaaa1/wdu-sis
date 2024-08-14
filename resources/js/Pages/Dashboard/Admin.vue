<script setup>
import NavLink from '@/Components/NavLink.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Admin Panel
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="w-1/2 sm:w-full">
                    <NavLink :href="route('create_surveys')"
                        class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">
                        Add Survey
                    </NavLink>
                </div>
                <div class="w-1/2 sm:w-full">
                    <NavLink :href="route('create_surveys')"
                        class="bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">
                        Add Project
                    </NavLink>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
