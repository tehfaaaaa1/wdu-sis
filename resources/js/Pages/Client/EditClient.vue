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

const props = defineProps({ clients: Object })
const handleImage = (event) => {
    form.image = event.target.files[0];
}
const form = useForm({
    client_name: props.clients.client_name,
    alamat: props.clients.alamat,
    phone: props.clients.phone,
    desc: props.clients.desc,
    image: null,
});

const submit = () => {
    form.put(route('update_client', props.clients.id), {
        preserveScroll: true,
        onSuccess: () => form.reset()
    });
};
</script>

<template>

    <AppLayout title="Edit Client">

        <div class="mt-6 sm:mt-0 px-4">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Edit Client</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="client_name" />
                        <TextInput id="client_name" v-model="form.client_name" type="text" placeholder="Client Name"
                            class="" required autofocus autocomplete="client_name" />
                        <InputError class="mt-2" :message="form.errors.client_name" />
                    </div>
                    <div class="mt-4 relative">
                        <InputLabel for="alamat" value="Alamat"/>
                        <TextInput id="alamat" v-model="form.alamat" type="text" placeholder="Alamat" class="" required
                            autofocus autocomplete="alamat" />
                        <InputError class="mt-2" :message="form.errors.alamat" />
                    </div>
                    <div class="mt-4 relative">
                    <InputLabel for="phone" value="Phone"/>
                        <TextInput id="phone" v-model="form.phone" type="number" placeholder="Phone" class="" required
                            autofocus autocomplete="phone" />
                        <InputError class="mt-2" :message="form.errors.phone" />
                    </div>
                    <div class="mt-4 relative">
                        <textarea id="desc" v-model="form.desc" placeholder="Description"
                            class="block w-full h-32 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 text-gray-700"
                            required autocomplete="desc" />
                        <InputError class="mt-2" :message="form.errors.desc" />
                    </div>
                    <div class="mt-4 relative">
                        <label class="block mb-2 text-base font-medium text-primary" for="file_input">Upload
                            photo</label>
                        <!-- Below input throws validation required for all text inputs above.  -->
                        <!-- <input @input="form.image = $event.target.files[0]" -->
                        <!-- Turns all the inputs to null. Why -->
                        <input @change="handleImage" enctype="multipart/form-data"
                            class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none
                            file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white" id="file_input"
                            type="file" accept="image/*"/>
                        <p class="mt-1 text-sm text-gray-500" id="file_input_help">PNG, JPG/JPEG (max file size : 2 MB).
                            Transparent
                            Background.</p>
                            <InputError class="mt-2" :message="form.errors.client_name" />
                    </div>
                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Edit Client
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

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
