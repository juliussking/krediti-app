<template>
    <div class="sidebarTitle text-gray-800 font-bold p-3 text-center text-5xl" @click="toggleStore.toggleSidebar">

        Krediti
    </div>
</template>
<script setup>
import { useToggleStore } from '@/stores/toggle';
const toggleStore = useToggleStore();

</script>