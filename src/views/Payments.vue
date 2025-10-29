<template>
  <!-- Cabeçalho -->
  <div class="flex justify-between items-center mb-3 py-5">
    <div class="title">
      <h1 class="text-3xl text-gray-800 font-bold">Pagamentos</h1>
      <p class="text-gray-500">Acompanhe e gerencie os pagamentos realizados</p>
    </div>

    <div class="button flex items-center gap-3">
      <DefaultButton
        buttonClass="bg-gradient-to-tl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        buttonSize="h-9 px-5"
        type="button">
        Novo pagamento
      </DefaultButton>
      
    </div>
  </div>

  <!-- Cards de estatísticas -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
    <CardTop>
      <template v-slot:cardTitle>
        Total de pagamentos
      </template>
      <template v-slot:mainInfo>
        {{ paymentStore.meta.payments_count }}
      </template>
      <template v-slot:subInfo>
        <span :class="[paymentStore.meta.payments_count > 0 ? 'text-green-500' : 'text-gray-500']">
          {{ paymentStore.meta.payments_count > 0 ? 'Registrados no sistema' : 'Nenhum pagamento ainda' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-blue-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#2B7FFF" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h4v2h-6V7h2v6z" />
          </svg>
        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Fator
      </template>
      <template v-slot:mainInfo>
        {{ paymentStore.meta.payments_fator }}
      </template>
      <template v-slot:subInfo>
        <span :class="[paymentStore.meta.payments_fator > 0 ? 'text-indigo-500' : 'text-gray-500']">
          {{ paymentStore.meta.payments_fator > 0 ? 'Pagamentos com fator' : 'Nenhum fator' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-indigo-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#4F46E5" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10h5v2h-7V7h2v5z" />
          </svg>
        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Total
      </template>
      <template v-slot:mainInfo>
        {{ paymentStore.meta.payments_total }}
      </template>
      <template v-slot:subInfo>
        <span :class="[paymentStore.meta.payments_total > 0 ? 'text-orange-500' : 'text-gray-500']">
          {{ paymentStore.meta.payments_total > 0 ? 'Pagamentos totais' : 'Nenhum total' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-orange-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#E0700A" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6v6l4 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Parciais
      </template>
      <template v-slot:mainInfo>
        {{ paymentStore.meta.payments_parcial }}
      </template>
      <template v-slot:subInfo>
        <span :class="[paymentStore.meta.payments_parcial > 0 ? 'text-sky-500' : 'text-gray-500']">
          {{ paymentStore.meta.payments_parcial > 0 ? 'Pagamentos parciais' : 'Nenhum parcial' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-sky-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#0EA5E9" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 9h-6v2h6v-2z" />
          </svg>
        </div>
      </template>
    </CardTop>
  </div>

  <!-- Tabela -->
  <div class="lg:col-span-3 xl:col-span-5 mt-3">
    <TablePayments />
  </div>
</template>

<script setup>
import CardTop from '@/components/dashboard/CardTop.vue'
import TablePayments from '@/components/TablePayments.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { usePaymentStore } from '@/stores/payment'
import { ref } from 'vue'

const paymentStore = usePaymentStore()
const selectedYear = ref('2025')
</script>

<style scoped>
.icon svg {
  width: 28px;
  height: 28px;
}
</style>
