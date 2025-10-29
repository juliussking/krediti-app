<template>
  <!-- Sidebar -->
  <nav
    :class="[
      'sidebar w-[250px] h-screen bg-white border-r border-gray-200 shadow-md absolute lg:sticky lg:top-0 z-30',
      toggleStore.sidebar ? 'ml-0' : 'ml-[-250px] lg:ml-0',
      'transition-all ease-in-out duration-300'
    ]"
  >
    <!-- Botão toggle mobile -->
    <div
      :class="[
        'flex lg:hidden justify-center items-center h-10 w-10 absolute cursor-pointer',
        toggleStore.sidebar
          ? 'top-3 right-[-20px] bg-white shadow-md rounded-full'
          : 'top-[-45px] right-[-45px]'
      ]"
      @click="toggleStore.toggleSidebar"
    >
      <span
        :class="[
          'material-symbols-outlined text-lg transition-colors duration-200',
          toggleStore.sidebar ? 'text-gray-900' : 'text-white'
        ]"
      >
        {{ toggleStore.sidebar ? 'close' : 'menu' }}
      </span>
    </div>

    <!-- Logo desktop -->
    <div class="hidden lg:block px-4 py-6">
      <SidebarLogo />
    </div>

    <!-- Menu -->
    <div class="px-4">
      <SidebarMenuItems />
    </div>
  </nav>

  <!-- Overlay mobile -->
  <div
    class="fixed inset-0 bg-black/20 z-20 lg:hidden transition-opacity duration-300"
    v-if="toggleStore.sidebar"
    @click="toggleStore.toggleSidebar"
  ></div>
</template>

<script setup>
import SidebarLogo from './SidebarLogo.vue'
import SidebarMenuItems from './SidebarMenuItems.vue'

import { useToggleStore } from '@/stores/toggle';
const toggleStore = useToggleStore();


</script>
