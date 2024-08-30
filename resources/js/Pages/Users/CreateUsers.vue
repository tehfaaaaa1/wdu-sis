<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
const props = defineProps({
    teams: Array, 
    client: Array
});

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    usertype: 'user',
    team_id: null, 
    client_id: '', 
});

const isAdmin = ref(false);
watch(isAdmin, (newVal) => {
    form.usertype = newVal ? 'admin' : 'user';
});

const submit = () => {
    form.post(route('create_user'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
console.log(props.client)
</script>

<template>
    <AppLayout title="Create User">
        <div class="mt-6 sm:-mt-4 px-4">
            <AuthenticationCard>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New User</h2>
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
                        <TextInput id="password" v-model="form.password" type="password" placeholder="Password"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autocomplete="new-password" />
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div class="mt-4 relative">
                        <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password"
                            placeholder="Confirm Password"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autocomplete="new-password" />
                        <InputError class="mt-2" :message="form.errors.password_confirmation" />
                    </div>

                    <div class="mt-4 relative">
                        <h2 class="text-primary font-semibold text-2xl text-center mb-4">Team Select</h2>

                        <div class="items-center mb-4">
                            <input
                                type="checkbox"
                                id="make-admin"
                                class="checked:text-primary"
                                v-model="isAdmin"
                            />
                            <label for="make-admin" class="pl-1.5">Make an admin?</label>
                        </div>

                        <div class="w-full grid grid-cols-2 gap-2 text-gray-700">
                            <div
                                v-for="team in props.teams"
                                :key="team.id"
                                class="flex items-center"
                            >
                                <input
                                    type="radio"
                                    :id="'team_' + team.id"
                                    name="team_id"
                                    class="checked:text-primary"
                                    v-model="form.team_id"
                                    :value="team.id"
                                />
                                <label :for="'team_' + team.id" class="pl-1.5">{{ team.name }}</label>
                            </div>
                        </div>
                        <InputError class="mt-2" :message="form.errors.team_id" />
                    </div>
                    <div class="mt-4 relative">
                        <h2 class="text-primary font-semibold text-lg mb-4">Client Select</h2>                                       
                                <div class="py-1" v-for="c in client">    
                                    <input type="radio" :id="'client_' + c.id" name="client_id" class="checked:text-primary" v-model="form.client_id" :value="c.id">
                                    <label :for="'clietn_'+c.id" class="ml-2">{{ c.client_name }}</label>
                                </div>


                    </div>

                    <div class="my-4 text-center">
                        <PrimaryButton
                            class="w-full justify-center mt-2"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        >
                            Create User
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </div>
    </AppLayout>
</template>