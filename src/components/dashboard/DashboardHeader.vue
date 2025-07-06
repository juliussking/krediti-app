<template>
    <div class="flex justify-between items-center mb-3">

     <h1 class="text-xl text-gray-800 font-semibold">Visão geral</h1>     
     <select class="border border-gray-300 p-1 rounded w-[150px] text-gray-800 bg-white"
     v-model="dateStore.selectedYear"
     >
       <option value="2024">2024</option>
       <option value="2025">2025</option>

     </select>
    </div>
</template>
<script setup>
import { useDateStore } from '@/stores/date'

const dateStore = useDateStore()

</script>