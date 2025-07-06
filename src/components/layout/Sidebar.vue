<template>

    <nav :class="[`sidebar w-[250px] h-screen bg-white border-r border-gray-300 absolute lg:sticky lg:top-0  z-3`, toggleStore.sidebar ? 'ml-0' : 'ml-[-250px] lg:ml-0', 'transition-all ease-in-out duration-300']">

        <div
            :class="[`flex lg:hidden justify-center items-center h-[40px] w-[40px] absolute`, toggleStore.sidebar ? 'top-3 right-[-20px] bg-white shadow-md rounded-full' : 'top-[-45px] right-[-45px]']"
            @click="toggleStore.toggleSidebar"
            >
            <span :class="[`material-symbols-outlined cursor-pointer`, toggleStore.sidebar ? 'text-gray-900' : 'text-white']">
               {{ toggleStore.sidebar ? 'close' : 'menu' }}
            </span>
        </div>

        <div class="hidden lg:block">
            <SidebarLogo />
        </div>

        <SidebarMenuItems />

    </nav>

    <!-- //Overlay -->
    <div class="bg-gray-900/20 z-2 h-full w-full absolute lg:hidden"
    @click="toggleStore.toggleSidebar"
    v-if="toggleStore.sidebar"
    >

    </div>

</template>
<script setup>
import SidebarLogo from './SidebarLogo.vue'
import SidebarMenuItems from './SidebarMenuItems.vue'

import { useToggleStore } from '@/stores/toggle';
const toggleStore = useToggleStore();


</script>
