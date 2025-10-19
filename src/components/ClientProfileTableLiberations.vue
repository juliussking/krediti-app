<template>

  <div class="p-4 border-b border-gray-200 flex justify-between ">
    <h2 class="text-lg font-semibold text-gray-800">Liberações</h2>
  </div>

  <div v-if="clientProfile.liberations?.length === 0" class="solictation">

    <h2 class="text-lg font-semibold text-gray-500 text-sm italic">Nenhuma liberação registrada</h2>

  </div>


  <div v-else class="bg-white shadow rounded overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
        <tr>
          <th class="px-6 py-3">ID</th>
          <th class="px-6 py-3">Liberado por</th>
          <th class="px-6 py-3">Cliente</th>
          <th class="px-6 py-3">Valor</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Data</th>
          <th class="px-6 py-3 text-center">Ação</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="liberation in clientProfile?.liberations" :key="liberation.id" class="hover:bg-gray-50">

          <td class="px-6 py-4 whitespace-nowrap">

            {{ liberation.id }}

          </td>

          <td class="px-6 py-4 font-semibold">

            {{ liberation.user_name }}

          </td>

          <td class="px-6 py-4 whitespace-nowrap">

            {{ liberation.client_name }}

          </td>

          <td class="px-6 py-4 font-semibold">

            {{ formatCurrency(liberation.amount) }}

          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="{
              'text-green-900 bg-green-300 px-2 py-1 rounded-full': liberation.status === 'Ativa',
              'text-red-900 bg-red-300 px-2 py-1 rounded-full': liberation.status === 'Vencida',
              'text-gray-700 bg-gray-200 px-2 py-1 rounded-full': liberation.status === 'Pendente',
              'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': liberation.status === 'Quitada'
            }">

              {{ liberation.status }}

            </span>
          </td>
          <td class="px-6 py-4 font-semibold">

            {{ formatDate(liberation.liberation_date) }}

          </td>
          <td class="px-6 py-4 relative">

           <RouterLink :to="{ name: 'receive-payment', query: { liberationId: liberation.id, clientName: liberation.client_name } }" :class="[
            active ? 'bg-blue-50 text-blue-500' : 'text-gray-800',
            'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
          ]">
            <span class="material-symbols-outlined">
              payments
            </span>
            Receber pagamento
          </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';




import { useClientStore } from '@/stores/client';
const clientStore = useClientStore();
const { clientProfile } = storeToRefs(clientStore);

import { formatCurrency, formatDate } from '@/utils/helpers';
import { RouterLink } from 'vue-router';




</script>
