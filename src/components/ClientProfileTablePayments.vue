<template>
  <div class="p-4 border-b border-gray-200 flex justify-between">
    <h2 class="text-lg font-semibold text-gray-800 nowrap">Pagamentos</h2>
    <p class="text-sm text-green-600 font-semibold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100  cursor-pointer mr-3">
      Novo pagamento</p>
  </div>
  <div v-if="clientProfile.payments?.length === 0">

    <h2 class="text-lg font-semibold text-gray-500 text-sm italic">Nenhuma solicitação registrada</h2>

  </div>
  <div class="bg-white shadow rounded overflow-x-auto">

    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
        <tr>
          <th class="px-6 py-3">Valor</th>
          <th class="px-6 py-3">Total</th>
          <th class="px-6 py-3">Tipo de pagamento</th>
          <th class="px-6 py-3">Recebido por</th>
          <th class="px-6 py-3">Pago em</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="payment in clientProfile?.payments" :key="payment.id" class="hover:bg-gray-50 cursor-pointer"
          @click="$router.push({ name: 'client-profile', params: { id: payment.id } })">
          <td class="px-6 py-4 font-semibold">{{ formatCurrency(payment.amount) }}</td>
          <td class="px-6 py-4 font-semibold">{{ formatCurrency(payment.total) }}</td>
          <td class="px-6 py-4">
            <span :class="{
              'text-green-900 bg-green-300 px-2 py-1 rounded-full': payment.payment_type === 'Fator',
              'text-blue-900 bg-blue-300 px-2 py-1 rounded-full': payment.payment_type === 'Abatimento',
              'text-orange-700 bg-orange-200 px-2 py-1 rounded-full': payment.payment_type === 'Resgate'
            }">

              {{ payment.payment_type }}
            </span>
          </td>
          <td class="px-6 py-4">{{ payment.user_name }}</td>
          <td class="px-6 py-4 font-semibold">

            {{ formatDate(payment.payment_date) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useClientStore } from '@/stores/client';
import { storeToRefs } from 'pinia';
const clientStore = useClientStore();
const { clientProfile } = storeToRefs(clientStore);

import { formatDate, formatCurrency } from '@/utils/helpers';


</script>
