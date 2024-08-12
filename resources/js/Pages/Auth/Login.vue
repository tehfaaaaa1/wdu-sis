<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in"/>

    <div class="flex items-center p-6 sm:p-0">
        <AuthenticationCard class="xl:w-1/2 w-full">
            <template #logo>
                <AuthenticationCardLogo />
            </template>
            <h2 class="text-primary font-semibold text-xl md:text-2xl text-center mt-4 mb-2 md:mb-10">Login</h2>

            <form @submit.prevent="submit" class="space-y-6">
                <div class="mt-4 relative">
                    <InputLabel for="email" />
                    <TextInput id="email" v-model="form.email" type="email" placeholder="Email"
                        class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset text-sm lg:text-base focus:ring-primary sm:text-sm sm:leading-6"
                        required autocomplete="username" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <div class="mt-4 relative">
                    <InputLabel for="password" />
                    <TextInput id="password" v-model="form.password" type="password" placeholder="Password"
                        class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset text-sm md:text-base focus:ring-primary sm:text-sm sm:leading-6" required autocomplete="new-password" />
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <InputError class="mt-2" :message="form.errors.password" />
                </div>
                <div class="block mt-4">
                        <label class="flex items-center">
                            <Checkbox v-model:checked="form.remember" name="remember" />
                            <span class="ms-2 text-sm text-secondary">Remember me</span>
                        </label>
                        <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-primary hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Forgot your password?
                        </Link>
                    </div>
                    
                    <div class="flex items-center justify-center mt-4">
                        <PrimaryButton class="flex justify-center mt-5 md:mb-10" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Log in
                        </PrimaryButton>
                    </div>


            </form>
        </AuthenticationCard>
        
        <div class="xl:block hidden">
            <img src="/img/Group 63.png" alt="">
        </div>
    </div>


    <!-- <div class="container mx-auto sm:max-w-xl md:max-w-5xl lg:flex lg:max-w-full ">
        <div class="lg:mx-12 lg:w-1/2">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm sm:mt-16 lg:mt-32" >
                <AuthenticationCardLogo />
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full w-full sm:max-w-md px-10 py-4 bg-white shadow-lg overflow-hidden sm:rounded-lg mx-6">
            <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-primary">
                    Sign in to your account
            </h2>
                <form @submit.prevent="submit" class="space-y-6 my-2">
                    <div class="mt-5">
                        <div class="mt-2 relative">
                            <InputLabel for="email" />
                            <input id="email" v-model="form.email" type="email" class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Email" autofocus autocomplete="username" required>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                            </svg>
                            <InputError class="mt-2" :message="form.errors.email" />
                        </div>
                    </div>

                    <div>
                        <div class="mt-2 relative">
                            <InputLabel for="password" />
                            <input id="password" v-model="form.password" type="password" class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Password" autocomplete="current-password" required>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
                            <InputError class="mt-2" :message="form.errors.password" />
                            </svg>
                        </div>
                    </div>
                    <div class="block mt-4">
                        <label class="flex items-center">
                            <Checkbox v-model:checked="form.remember" name="remember" />
                            <span class="ms-2 text-sm text-secondary">Remember me</span>
                        </label>
                        <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-primary hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Forgot your password?
                        </Link>
                    </div>
                    
                    <div class="flex items-center justify-center mt-4">
                        <PrimaryButton class="flex justify-center mt-5 mb-10" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
                
            </div>
        </div>
        <div class="hidden lg:block">
            <img src="/img/Group 63.png" class="absolute right-0" alt="">
        </div>
    </div>
        
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div> -->
</template>
