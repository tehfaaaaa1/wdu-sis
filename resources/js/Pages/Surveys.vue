<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
import Dropdown from '@/Components/Dropdown.vue';
import TextInput from '@/Components/TextInput.vue';
</script>

<template>
    <AppLayout title="Survey">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Surveys
            </h2>
        </template>
        <main class="min-h-screen w-full bg-cover bg-repeat bg-[url('/img/bg-dashboard.png')]">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between mb-6">
                    <div class="">
                        <button
                            class="bg-primary text-white font-medium px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition">Add Survey
                        </button>
                    </div>
                    <div class="relative">
                        <TextInput type="text" name="search" id="search" placeholder="Search" class="py-2 ps-9 text-gray-400 placeholder:text-gray-400"/>
                        <div class="absolute top-2 left-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        </div>
                    </div>
                </div>

                <div class="container mx-auto flex flex-wrap justify-center lg:justify-evenly xl:justify-between gap-5">
                    <div class="rounded-md shadow-lg outline outline-2 outline-gray-300 w-full md:w-330 px-5 py-4 bg-white">
                        <h1 class="text-2xl text-center mb-2 font-medium">Survey</h1>
                        <p class="my-3 text-base text-justify">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
                            voluptatibus ab facilis velit voluptates rem, suscipit sequi ipsum.
                        </p>
                        <p class="text-center text-gray-600 mb-3 text-sm">
                            Created Survey at: 05-08-2024
                        </p>
                        <div class="flex justify-center">
                            <button
                                class="p-3 px-6 bg-secondary text-white rounded-md text-sm hover:bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200">
                                    Check Survey
                            </button>
                        </div>
                        <div class="relative inline-block text-left w-full mt-2">
                            <div class="flex justify-end">    
                                <Dropdown>
                                    <template #trigger>
                                        <div class="inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                                            <div class="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"stroke="currentColor" class="size-6 right-0">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </template>
                                    <template #content>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Jawaban
                                            </a>
                                        </div>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Survey
                                            </a>
                                        </div>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Hapus Survey
                                            </a>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-md shadow-lg outline outline-2 outline-gray-300 w-full md:w-330 px-5 py-4 bg-white">
                        <h1 class="text-2xl text-center mb-2 font-medium">Survey</h1>
                        <p class="my-3 text-base text-justify">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
                            voluptatibus ab facilis velit voluptates rem, suscipit sequi ipsum.
                        </p>
                        <p class="text-center text-gray-600 mb-3 text-sm">
                            Created Survey at: 05-08-2024
                        </p>
                        <div class="flex justify-center">
                            <button
                                class="p-3 px-6 bg-secondary text-white rounded-md text-sm hover:bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200">
                                    Check Survey
                            </button>
                        </div>
                        <div class="relative inline-block text-left w-full mt-2">
                            <div class="flex justify-end">    
                                <Dropdown>
                                    <template #trigger>
                                        <div class="inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                                            <div class="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"stroke="currentColor" class="size-6 right-0">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </template>
                                    <template #content>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Jawaban
                                            </a>
                                        </div>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Survey
                                            </a>
                                        </div>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Hapus Survey
                                            </a>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-md shadow-lg outline outline-2 outline-gray-300 w-full md:w-330 px-5 py-4 bg-white">
                        <h1 class="text-2xl text-center mb-2 font-medium">Survey</h1>
                        <p class="my-3 text-base text-justify">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
                            voluptatibus ab facilis velit voluptates rem, suscipit sequi ipsum.
                        </p>
                        <p class="text-center text-gray-600 mb-3 text-sm">
                            Created Survey at: 05-08-2024
                        </p>
                        <div class="flex justify-center">
                            <button
                                class="p-3 px-6 bg-secondary text-white rounded-md text-sm hover:bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200">
                                    Check Survey
                            </button>
                        </div>
                        <div class="relative inline-block text-left w-full mt-2">
                            <div class="flex justify-end">    
                                <Dropdown>
                                    <template #trigger>
                                        <div class="inline-flex w-12 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                                            <div class="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"stroke="currentColor" class="size-6 right-0">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </template>
                                    <template #content>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Jawaban
                                            </a>
                                        </div>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Survey
                                            </a>
                                        </div>
                                        <div class="py-1">
                                            <a href="#":class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Hapus Survey
                                            </a>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </main>
    </AppLayout>
</template>
