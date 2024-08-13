<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';

const form = useForm({
    title: '',
    desc: '',
});

const submit = () => {
    form.post(route('create_survey'));
};
</script>

<template>
    
    <AppLayout title="Create User">

        <div class="mt-6 sm:-mt-4 px-4">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New Surey</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="title" />
                        <TextInput id="name" v-model="form.title" type="text" placeholder="Title"
                            class=""
                            required autofocus autocomplete="title" />
                        <InputError class="mt-2" :message="form.errors.title" />
                    </div>

                    <div class="mt-4 relative">
                        <textarea id="password_confirmation" v-model="form.desc"
                            placeholder="Description"
                            class="block text-primary placeholder-primary w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autocomplete="desc" />

                        <InputError class="mt-2" :message="form.errors.password_confirmation" />
                    </div>


                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Add Survey
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
