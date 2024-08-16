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

const props = defineProps({surveys: Object, projects: Object})
const project = props.projects[0]
const form = useForm({
    title: props.surveys.title,     
    desc: props.surveys.desc,
    project_id: props.surveys.project_id,
    slug: project['slug'],
});

const submit = () => {
    form.put(route('update_survey', [props.surveys.id, project['slug']]));
};

console.log(props.surveys.id)  
</script>

<template>
    
    <AppLayout title="Edit Survey">

        <div class="mt-6 sm:-mt-4 px-4">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Edit Surey</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="title" />
                        <TextInput id="name" v-model="form.title" type="text" placeholder="Title"
                            class=""
                            required autofocus autocomplete="title" />
                        <InputError class="mt-2" :message="form.errors.title" />
                    </div>

                    <div class="mt-4 relative">
                        <TextInput id="password_confirmation" v-model="form.desc"
                            placeholder="Description"
                            class=""
                            required autocomplete="desc" />

                        <InputError class="mt-2" :message="form.errors.password_confirmation" />
                    </div>


                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Edit Survey
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </div>
    </AppLayout>


</template>
