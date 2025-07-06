<template>

  <div class="flex justify-between items-center mb-3">

    <h1 class="text-xl text-gray-800 font-semibold">Equipe</h1>
    <select class="border border-gray-300 p-1 rounded w-[150px] text-gray-800 bg-white">
      <option value="2024">2024</option>
      <option value="2025">2025</option>

    </select>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
    <CardTop cardTitleColor="text-transparent bg-clip-text bg-green-500 bg-gradient-to-r to-blue-600"
      cardLineColor="bg-green-400 bg-gradient-to-r to-blue-600">
      <template v-slot:mainInfo>
        573
      </template>

      <template v-slot:subInfo>
        Clientes
      </template>
    </CardTop>

    <CardTop cardTitleColor="text-transparent bg-clip-text bg-indigo-500 bg-gradient-to-r to-purple-600"
      cardLineColor="bg-indigo-400 bg-gradient-to-r to-purple-600">
      <template v-slot:mainInfo>
        423
      </template>

      <template v-slot:subInfo>
        Clientes ativos
      </template>
    </CardTop>

    <CardTop cardTitleColor="text-transparent bg-clip-text bg-orange-500 bg-gradient-to-r to-red-600"
      cardLineColor="bg-orange-400 bg-gradient-to-r to-red-600">
      <template v-slot:mainInfo>
        132
      </template>

      <template v-slot:subInfo>
        Clientes vencidos
      </template>
    </CardTop>

    <CardTop cardTitleColor="text-transparent bg-clip-text bg-sky-500 bg-gradient-to-r to-indigo-600"
      cardLineColor="bg-sky-400 bg-gradient-to-r to-indigo-600">
      <template v-slot:mainInfo>
        387
      </template>

      <template v-slot:subInfo>
        Clientes quitados
      </template>
    </CardTop>
  </div>

  <div class="chart bg-white lg:col-span-3 xl:col-span-5 border border-gray-200 mt-3">
    <TableUser />
  </div>
</template>

<script setup>
import CardTop from '@/components/dashboard/CardTop.vue';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import TableUser from '@/components/dashboard/TableUser.vue';
</script>