<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link } from '@inertiajs/vue3';

const props = defineProps({
    surveys: Object,
    projects: Object,
    clients: Object,
    user: Object,
    biodata: Object,
});

const project = props.projects[0];
const client = props.clients[0];
const bio = props.biodata[0];
const form = useForm({
    nama: bio['nama_responden'],
    alamat: bio['alamat'],
    no_hp: String(bio['no_hp']),
    instansi: bio['instansi'],
    project_slug: project['slug'],
    client_slug: client['slug'],
    province_id: null,
});

const provinces = ref([]);

// Fetch provinces
axios.get(route('provinces.index')).then(response => {
    provinces.value = response.data;
});

const submit = () => {
    form.put(route('update_bio', [form.client_slug, form.project_slug, props.surveys.id, props.user.id]), {
        onSuccess: () => {
            console.log("Biodata updated successfully!");
        },
        onError: (errors) => {
            console.error("Failed to update biodata:", errors);
        }
    });
};
</script>

<template>
    <Head :title="'Biodata'" />
    <main class="min-h-screen bg-gray-300">
        <div class="mx-auto max-w-xl lg:max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="text-center text-2xl font-semibold py-4 bg-primary text-white rounded-t-md">
                <h2>Isi Biodata</h2>
            </div>
            <div class="bg-white rounded-b-md">
                <div class="border-b-2 p-5 border-gray-500">
                    <p class="text-base text-justify line-clamp-3 font-medium">Pastikan Biodata di bawah sudah sesuai!</p>
                </div>
                <form @submit.prevent="submit" enctype="multipart/form-data">
                    <div class="relative px-5 mt-3">
                        <label>Nama</label>
                        <TextInput v-model="form.nama" type="text" placeholder="Nama"
                            class="block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            required />
                        <InputError class="mt-2" :message="form.errors.nama" />
                    </div>
                    <div class="mt-4 relative px-5">
                        <label>Alamat</label>
                        <TextInput v-model="form.alamat" type="text" placeholder="Alamat"
                            class="block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            required />
                        <InputError class="mt-2" :message="form.errors.alamat" />
                    </div>
                    <div class="mt-4 relative px-5">
                        <label for="province">Provinsi Asal</label>
                        <select v-model="form.province_id" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" required>
                            <option value="" disabled selected>Pilih Provinsi</option>
                            <option v-for="province in provinces" :key="province.id" :value="province.id">
                                {{ province.name }}
                            </option>
                        </select>
                        <InputError class="mt-2" :message="form.errors.province_id" />
                    </div>
                    <div class="mt-4 relative px-5">
                        <label>Nomor Handphone</label>
                        <TextInput v-model="form.no_hp" type="number" placeholder="No Hp"
                            class="block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            required />
                        <InputError class="mt-2" :message="form.errors.no_hp" />
                    </div>
                    <div class="mt-4 relative px-5">
                        <label>Instansi</label>
                        <TextInput v-model="form.instansi" type="text" placeholder="Instansi"
                            class="block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            required />
                        <InputError class="mt-2" :message="form.errors.instansi" />
                    </div>
                    <div class="pt-5 flex justify-center">
                        <PrimaryButton class="my-5 p-5 justify-center" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Konfirmasi
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

label {
    color: lightslategray;
}
</style>
