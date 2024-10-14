<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed } from 'vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useForm } from '@inertiajs/vue3';
import NavLink from '@/Components/NavLink.vue';

const props =defineProps({
    recipient:Object,
    contact:Object
})
console.log(props.recipient)
</script>
<template>
    <AppLayout title="Recipient Details">
        <main class="min-h-screen">
            <div class="mx-auto mt-5 rounded-md max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-5">
                    <div class="w-1/2 sm:w-full">
                        <NavLink :href="route('add-contact',[recipient[0].id])"
                            class="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-white hover:text-primary transition">
                            Add Contact
                        </NavLink>
                    </div>
                </div>
                <div class="bg-white rounded-sm">
                    <div class="" v-for="(rec, index) in props.contact" :key="index">
                        {{ rec.email_contact.email }}
                    </div>
                </div>
            </div>
        </main>    
    </AppLayout>
</template>