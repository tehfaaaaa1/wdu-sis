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

const props = defineProps({ projects: Object })

const form = useForm({
    project_name: props.projects.project_name,
    desc: props.projects.desc,
    image: props.projects.image
});

const submit = () => {
    form.put(route('update_projects', props.projects.id));
};
</script>

<template>

    <AppLayout title="Edit Project">

        <div class="mt-6 sm:mt-4 px-4">
            <AuthenticationCard>
                <template #logo>
                    <AuthenticationCardLogo />
                </template>
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Edit Project</h2>
                <form @submit.prevent="submit"  enctype="multipart/form-data">
                    <div class="relative">
                        <InputLabel for="project_name" />
                        <TextInput id="name" v-model="form.project_name" type="text" placeholder="Project Name" class=""
                            required autofocus autocomplete="project_name" />
                        <InputError class="mt-2" :message="form.errors.project_name" />
                    </div>
                    <div class="mt-4 relative">
                        <textarea id="desc" v-model="form.desc" placeholder="Description"
                            class="block text-primary placeholder-primary w-full h-48 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            required autocomplete="desc" />

                        <InputError class="mt-2" :message="form.errors.desc" />
                    </div>
                    <div class="mt-4 relative">
                        <label class="block mb-2 text-base font-medium text-primary" for="file_input">Upload
                            file</label>
                        <input @input="form.image = $event.target.files[0]"
                            class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none
                            file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white" id="file_input"
                            type="file" accept=".png, .jpg, .jpeg">
                        <InputError class="mt-2" :message="form.errors.image" />
                        <img v-if="props.projects.image != null" :src="'../../img/' + props.projects.image" alt=""
                            class="h-20 mt-2  ">
                        <p class="mt-1 text-sm text-gray-500" id="file_input_help">PNG, JPG/JPEG (max file size : 2 MB).
                        </p>
                    </div>


                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Edit Project
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </div>
    </AppLayout>


</template>
