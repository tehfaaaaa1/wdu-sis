<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({users: Object})

const form = useForm({
    name: props.users.name,
    email: props.users.email,
    password: '',
    password_confirmation: '',
    terms: false,
    usertype: props.users.usertype,
});

const submit = () => {
    form.post(route('create_user'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>

    <AppLayout title="Create User">

        <div class="mt-6 sm:-mt-4 px-4">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New User</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <!-- <InputLabel for="name" value="Name" /> -->
                        <TextInput id="name" v-model="form.name" type="text" placeholder="Nama"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autofocus autocomplete="name" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <div class="mt-4 relative">
                        <!-- <InputLabel for="email" value="Email" /> -->
                        <TextInput id="email" v-model="form.email" type="email" placeholder="Email"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autocomplete="username" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <div class="mt-4 relative">
                        <div class="w-full grid grid-rows-3 grid-flow-col gap-2 text-gray-700">
                            {{ form.usertype }}
                            <div class="flex items-center">
                                <input type="radio" name="pick" id="pick1" class="checked:text-primary" v-model="form.usertype" value="superadmin">
                                <label for="pick1" class="pl-1.5">Super Admin</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="pick" id="pick2" class="checked:text-primary" v-model="form.usertype" value="admin">
                                <label for="pick2" class="pl-1.5">Admin</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="pick" id="pick3" class="checked:text-primary" v-model="form.usertype" value="korlap">
                                <label for="pick3" class="pl-1.5">Korlap</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="pick" id="pick4" class="checked:text-primary" v-model="form.usertype" value="enum">
                                <label for="pick4" class="pl-1.5">Enum</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="pick" id="pick5" class="checked:text-primary" v-model="form.usertype" value="klien">
                                <label for="pick5" class="pl-1.5">Klien</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="pick" id="pick6" class="checked:text-primary" v-model="form.usertype" value="user">
                                <label for="pick6" class="pl-1.5">User</label>
                            </div>
                        </div>
                        <InputError class="mt-2" :message="form.errors.usertype" />
                    </div>

                    <div class="mt-4 relative">
                        <!-- <InputLabel for="password" value="Password" /> -->
                        <TextInput id="password" v-model="form.password" type="password" placeholder="Password"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autocomplete="new-password" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div class="mt-4 relative">
                        <!-- <InputLabel for="password_confirmation" value="Confirm Password" /> -->
                        <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
                            placeholder="Confirm Password"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autocomplete="new-password" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6 absolute right-3 top-1.5 text-primary">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>

                        <InputError class="mt-2" :message="form.errors.password_confirmation" />
                    </div>

                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Create User
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </div>

        <!-- <div class="hidden">
                <img src="/img/Group 63.png" alt="">
            </div> -->

    </AppLayout>


</template>
