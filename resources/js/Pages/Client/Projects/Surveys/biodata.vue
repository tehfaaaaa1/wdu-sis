<script setup>
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';


const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    user: Object
});

const project = props.projects[0]
const client = props.clients[0]
const form = useForm({
    nama: '',
    alamat: '',
    no_hp: '',
    instansi: '',
    project_slug: project['slug'],
    client_slug: client['slug'],
});

const submit = () => {
    form.post(route('add_bio', [form.client_slug, form.project_slug, props.surveys.id, props.user.id]));
}
</script>

<template>
    <AppLayout title="Isi Biodata">
        <main class="min-h-screen">
            <div class="mx-auto max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md">
                    <h2>Isi Biodata</h2>
                </div>
                <div class="bg-white rounded-b-md">
                    <div class="border-b-2 p-5 border-gray-500">
                        <p class="text-base text-justify line-clamp-3 font-medium">Pastikan Biodata di bawah sudah sesuai!</p>
                    </div>
                    <form action="" @submit.prevent=submit>
                        <div class="relative px-5 mt-3">
                            <label for="">Nama</label>
                            <TextInput v-model="form.nama" type="text" placeholder="Nama"
                                class="block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                required />
                            <InputError class="mt-2" :message="form.errors.name" />
                        </div>
                        <div class="mt-4 relative px-5">
                            <label for="">Alamat</label>
                            <TextInput v-model="form.alamat" type="text" placeholder="Alamat"
                                class="block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                required />
                            <InputError class="mt-2" :message="form.errors.email" />
                        </div>

                        <div class="mt-4 relative px-5">
                            <label for="">Nomor Handphone</label>
                            <TextInput v-model="form.no_hp" type="number" placeholder="No Hp"
                                class="block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                required />
                            <InputError class="mt-2" :message="form.errors.password" />
                        </div>

                        <div class="mt-4 relative px-5">
                            <label for="">Nama Instansi</label>
                            <TextInput v-model="form.instansi" type="text" placeholder="Instansi"
                                class="block !w-1/3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                required />
                            <InputError class="mt-2" :message="form.errors.password_confirmation" />
                        </div>
                        <div class="pt-5 flex justify-center">
                            <PrimaryButton class="flex justify-center w-1/4 md:mb-10"
                                :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                Konfirmasi
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
