<script setup>
import { useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
const props = defineProps({ clients: Object })
const client = props.clients[0];
const form = useForm({
    project_name: '',
    desc: '',
    image: '',
    client_id: client['id'],
    clientSlug: client['slug']
});

const submit = () => {
    form.post(route('create_project', form.clientSlug));
};
</script>

<template>
    <AppLayout title="Create Project">
        <div class="px-4">
            <AuthenticationCard class="absolute top-0 right-0 left-0">
                <h2 class="text-primary font-semibold text-2xl text-center mb-4">Create New Project</h2>
                <form @submit.prevent="submit">
                    <div class="relative">
                        <InputLabel for="project_name" />
                        <TextInput id="projectname" v-model="form.project_name" type="text" placeholder="Project Name"
                            class="" required autofocus autocomplete="project_name" />
                        <InputError class="mt-2" :message="form.errors.project_name" />
                    </div>
                    <div class="mt-4 relative">
                        <textarea id="desc" v-model="form.desc" placeholder="Description"
                            class="block w-full h-40 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 text-gray-700"
                            required autocomplete="desc" />
                        <InputError class="mt-2" :message="form.errors.desc" />
                    </div>
                    <div class="my-4 text-center">
                        <PrimaryButton class="w-full justify-center mt-2 " :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Add project
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </div>
    </AppLayout>
</template>