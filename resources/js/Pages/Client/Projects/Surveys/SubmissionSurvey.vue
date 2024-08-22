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
import NavLink from '@/Components/NavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';

const props = defineProps({ surveys: Object, projects: Object })


const form = useForm({
    title: '',
    desc: '',
});
const submit = () => {
    form.put(route('update_survey', props.surveys.id));
};

console.log(props)
    
</script>

<template>
    <AppLayout title="Isi Survey">

        <main class="min-h-screen ">
            <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>{{ props.surveys.title }}</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-500">
                        <p class="text-base text-justify line-clamp-3">
                            {{ props.surveys.desc }}
                        </p>
                    </div>
                    <div class="p-5">
                        <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, accusantium. Consectetur
                            optio alias architecto veniam iure expedita repudiandae voluptates praesentium, vero fugiat,
                            obcaecati, dignissimos dolorum eveniet provident distinctio ex magni!</h1>
                    </div>
                    <div class="p-5 flex justify-center">
                        <PrimaryButton class="flex justify-center w-1/4 md:mb-10"
                            :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Submit Survey
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>