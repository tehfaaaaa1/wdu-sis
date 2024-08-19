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

    <Head title="Log in" />

    <div class="flex items-center justify-center xl:justify-between p-6 sm:p-0">
        <AuthenticationCard class="xl:w-1/2">
            <template #logo>
                <AuthenticationCardLogo />
            </template>
            <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
                {{ status }}
            </div>
            <h2 class="text-primary font-semibold text-xl md:text-2xl text-center mt-4 mb-2 md:mb-10">Sign In to Your
                Account</h2>

            <form @submit.prevent="submit" class="space-y-6">
                <div class="mt-4 relative">
                    <InputLabel for="email" />
                    <TextInput id="email" v-model="form.email" type="email" placeholder="Email"
                        class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset text-sm lg:text-base focus:ring-primary sm:text-sm sm:leading-6 pr-10"
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
                        class="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-primary focus:ring-2 focus:ring-inset text-sm md:text-base focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                        required autocomplete="new-password" />

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
                    <!-- <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-primary hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Forgot your password?
                        </Link> -->
                </div>

                <div class="flex items-center justify-center mt-4">
                    <PrimaryButton class="flex justify-center w-full md:mb-10"
                        :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Log in 
                    </PrimaryButton>
                </div>


            </form>
        </AuthenticationCard>

        <div class="xl:block hidden w-1/2 rounded-lg mr-6 h-[93vh] bg-no-repeat bg-bottom border-2 brightne border-gray-300 shadow-2xl "
            style="background-image: url('/img/wdu-building.jpg')">
            <!-- <div class="h-full shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-500 brightness-50 opacity-15 p-5"></div> -->
        </div>
    </div>
</template>
