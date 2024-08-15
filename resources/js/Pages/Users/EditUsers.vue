<script setup>
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';

// Ensure that 'props.users' is passed from the parent component or controller.
const props = defineProps({
  users: {
    type: Object,
    required: true,
  },
});

const form = useForm({
  name: props.users.name || '',
  email: props.users.email || '',
  password: '',
  password_confirmation: '',
  usertype: props.users.usertype || '',
});

const submit = () => {
  form.put(route('update_user', props.users.id), {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>


<template>
    <AppLayout title="Edit User">
      <div class="mt-6 sm:-mt-4 px-4">
        <AuthenticationCard>
          <template #logo>
            <AuthenticationCardLogo />
          </template>
          <h2 class="text-primary font-semibold text-2xl text-center mb-4">Update User</h2>
          <form @submit.prevent="submit">
            <div class="relative">
              <TextInput id="name" v-model="form.name" type="text" placeholder="Name"
                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                required autofocus autocomplete="name" />
              <InputError class="mt-2" :message="form.errors.name" />
            </div>
  
            <div class="mt-4 relative">
              <TextInput id="email" v-model="form.email" type="email" placeholder="Email"
                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                required autocomplete="username" />
              <InputError class="mt-2" :message="form.errors.email" />
            </div>
  
            <div class="mt-4 relative">
              <div class="w-full grid grid-rows-3 grid-flow-col gap-2 text-gray-700">
                <div class="flex items-center">
                  <input type="radio" name="pick" id="pick1" v-model="form.usertype" value="superadmin">
                  <label for="pick1" class="pl-1.5">Super Admin</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" name="pick" id="pick2" v-model="form.usertype" value="admin">
                  <label for="pick2" class="pl-1.5">Admin</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" name="pick" id="pick3" v-model="form.usertype" value="korlap">
                  <label for="pick3" class="pl-1.5">Korlap</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" name="pick" id="pick4" v-model="form.usertype" value="enum">
                  <label for="pick4" class="pl-1.5">Enum</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" name="pick" id="pick5" v-model="form.usertype" value="klien">
                  <label for="pick5" class="pl-1.5">Klien</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" name="pick" id="pick6" v-model="form.usertype" value="user">
                  <label for="pick6" class="pl-1.5">User</label>
                </div>
              </div>
              <InputError class="mt-2" :message="form.errors.usertype" />
            </div>
  
            <div class="mt-4 relative">
              <TextInput id="password" v-model="form.password" type="password" placeholder="Password"
                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                autocomplete="new-password" />
              <InputError class="mt-2" :message="form.errors.password" />
            </div>
  
            <div class="mt-4 relative">
              <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
                placeholder="Confirm Password"
                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                autocomplete="new-password" />
              <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>
  
            <div class="my-4 text-center">
              <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing">
                Update User
              </PrimaryButton>
            </div>
          </form>
        </AuthenticationCard>
      </div>
    </AppLayout>
  </template>
  