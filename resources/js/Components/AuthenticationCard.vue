<template>
    <div class="min-h-screen block lg:flex lg:flex-col sm:justify-center sm:pt-0">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm lg:-mt-5 sm:mb-10 sm:mt-10 p-6 md:p-0">
            <slot name="logo" />
        </div>

        <div class="w-full sm:max-w-md mt-6 mb-6 px-6 py-4 bg-white border-2 mx-auto shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
