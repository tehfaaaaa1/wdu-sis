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
    client_name: '',
    alamat: '',
    desc: '',
    image: '',
});

const submit = () => {
    form.post(route('create_client'));
};
</script>

<template>

    <AppLayout title="Create Client">

        <div class="mt-6 sm:mt-0 px-4">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New Client</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="client_name" />
                        <TextInput id="client_name" v-model="form.client_name" type="text" placeholder="Client Name"
                            class="" required autofocus autocomplete="client_name" />
                        <InputError class="mt-2" :message="form.errors.client_name" />
                    </div>
                    <div class="mt-4 relative">
                        <InputLabel for="alamat" />
                        <TextInput id="alamat" v-model="form.alamat" type="text" placeholder="Alamat"
                            class="" required autofocus autocomplete="alamat" />
                        <InputError class="mt-2" :message="form.errors.alamat" />
                    </div>
                    <div class="mt-4 relative">
                        <textarea id="desc" v-model="form.desc" placeholder="Description"
                            class="block w-full h-32 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 text-gray-700"
                            required autocomplete="desc" />
                        <InputError class="mt-2" :message="form.errors.desc" />
                    </div>
                    <div class="mt-4 relative">
                        <label class="block mb-2 text-base font-medium text-primary"
                            for="file_input">Upload photo</label>
                        <input @input="form.image =$event.target.files[0]"
                            class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none
                            file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white"
                            id="file_input" type="file" accept=".png, .jpg, .jpeg">
                            <p class="mt-1 text-sm text-gray-500" id="file_input_help">PNG, JPG/JPEG (max file size : 2 MB). Transparent Background.</p>
                    </div>
                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2 " :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Add client
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
