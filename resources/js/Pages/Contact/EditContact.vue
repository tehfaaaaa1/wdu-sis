<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    contact: {
        type: Object,
        required : true
    },
    recipient: Object
});
const form = useForm({
    first_name: props.contact.first_name,
    last_name: props.contact.last_name,
    email: props.contact.email,
    company:props.contact.company,
    occupation:props.contact.occupation,
})
const submit = ()=>{
    form.get(route('update-contact', [props.recipient.slug ,props.contact.id]))
}
</script>
<template>
    <AppLayout title="Edit Contact">
        <div class="mt-6">
            <div class="w-full sm:max-w-md mt-6 mb-6 px-6 py-4 bg-white border-2 mx-auto shadow-md overflow-hidden sm:rounded-lg">
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Change Data</h2>
                <form action="" @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="email" value="Email"/>
                        <TextInput id="email" v-model="form.email" type="email" placeholder="Email"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autofocus />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>
                    <div class="relative mt-4">
                        <InputLabel for="first_name" value="First Name"/>
                        <TextInput id="first_name" v-model="form.first_name" type="text" placeholder="First Name"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autofocus />
                        <InputError class="mt-2" :message="form.errors.first_name" />
                    </div>
                    <div class="relative mt-4">
                        <InputLabel for="last_name" value="Last Name"/>
                        <TextInput id="last_name" v-model="form.last_name" type="text" placeholder="Last Name"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autofocus />
                        <InputError class="mt-2" :message="form.errors.last_name" />
                    </div>
                    <div class="relative mt-4">
                        <InputLabel for="company" value="Company"/>
                        <TextInput id="company" v-model="form.company" type="text" placeholder="Company"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autofocus />
                        <InputError class="mt-2" :message="form.errors.company" />
                    </div>
                    <div class="relative mt-4">
                        <InputLabel for="occupation" value="Occupation"/>
                        <TextInput id="occupation" v-model="form.occupation" type="text" placeholder="Occupation"
                            class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10"
                            required autofocus />
                        <InputError class="mt-x2" :message="form.errors.occupation" />
                    </div>
                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Change Data
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>