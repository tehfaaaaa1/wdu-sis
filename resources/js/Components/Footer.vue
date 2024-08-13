<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
</script>

<template>

    
        <footer style="background-color: #215232;" class="p-3.5">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between">
                    <div class="block lg:flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <Link :href="route('dashboard')">
                            <ApplicationMark class="block w-72" />
                            </Link>
                        </div>

                        <!-- Navigation Links -->
                        <div class="block space-x-2 lg:-my-px lg:ms-10 lg:flex">
                            <NavLink :href="route('dashboard')">
                                Dashboard
                            </NavLink>
                            <NavLink v-if="$page.props.auth.user.usertype === 'admin'" :href="route('dashboard.admin')">
                                Admin Panel
                            </NavLink>
                            <NavLink :href="route('surveys')">
                                Surveys
                            </NavLink>
                            <NavLink v-if="$page.props.auth.user.usertype === 'admin' ||
                                $page.props.auth.user.usertype === 'Pic WDU'" :href="route('users')">
                                User
                            </NavLink>
                        </div>
                    </div>

                    <!-- Contact -->
                    <div class="flex">

                        <!-- Navigation Links -->
                        <div class="space-x-1 lg:flex">
                            <NavLink :href>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6">
                                    <path fill-rule="evenodd"
                                        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </NavLink>
                            <NavLink :href>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6">
                                    <path
                                        d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                    <path
                                        d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                </svg>
                            </NavLink>
                            <NavLink :href>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6">
                                    <path fill-rule="evenodd"
                                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </NavLink>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Responsive Navigation Menu -->
            <div :class="{ 'block': showingNavigationDropdown, 'hidden': !showingNavigationDropdown }"
                class="lg:hidden">
                <div class="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink v-if="$page.props.auth.user.usertype === 'admin'"
                        :href="route('dashboard.admin')" :active="route().current('dashboard.admin')">
                        Admin Panel
                    </ResponsiveNavLink>
                    <ResponsiveNavLink :href="route('surveys')" :active="route().current('surveys')">
                        Surveys
                    </ResponsiveNavLink>
                    <ResponsiveNavLink v-if="$page.props.auth.user.usertype === 'admin' ||
                        $page.props.auth.user.usertype === 'Pic WDU'" :href="route('users')"
                        :active="route().current('users')">
                        User
                    </ResponsiveNavLink>
                </div>
            </div>
        </footer>



</template>