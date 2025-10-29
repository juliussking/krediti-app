<template>
  <!-- Filtro -->
  <div
    class="mb-4 p-5 relative overflow-hidden bg-white shadow shadow-sm shadow-blue-50 rounded-xl border border-gray-200">
    <!-- Título -->
    <div class="title flex items-center gap-2 absolute top-4 left-4 text-gray-600">
      <span class="material-symbols-outlined">filter_list</span>
      <p>Filtros</p>
    </div>

    <!-- Campos -->
    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label class="text-xs text-gray-500 font-medium">Tipo de pagamento</label>
        <select
          v-model="filters.payment_type"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
          <option value="">Todos</option>
          <option value="Total">Total</option>
          <option value="Parcial">Parcial</option>
          <option value="Fator">Fator</option>
          <option value="Novo">Novo</option>
        </select>
      </div>

      <div>
        <label class="text-xs text-gray-500 font-medium">Cliente / Usuário</label>
        <input
          v-model="filters.search"
          type="text"
          placeholder="Filtre por cliente ou usuário"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="text-xs text-gray-500 font-medium">Valor recebido</label>
        <input
          v-model="filters.amount"
          type="number"
          placeholder="Ex: 1200"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="text-xs text-gray-500 font-medium">Total</label>
        <input
          v-model="filters.total"
          type="number"
          placeholder="Ex: 2000"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      </div>

      <div class="flex flex-col justify-end">
        <p class="text-xs text-gray-500 font-medium mb-1">Data do pagamento</p>
        <div class="flex flex-col sm:flex-row gap-2">
          <input
            v-model="filters.startDate"
            type="date"
            class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
          <input
            v-model="filters.endDate"
            type="date"
            class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div v-if="hasFilters" class="flex flex-col sm:flex-row justify-end sm:items-center gap-3 mt-6">
      <button
        @click="resetFilters"
        class="bg-transparent text-gray-500 hover:underline h-9 lg:w-25 text-sm"
        type="button"
        :disabled="filterPaymentLoading">
        Limpar
      </button>

      <button
        @click="applyFilters"
        class="bg-gradient-to-tl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all h-9 lg:w-25 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2"
        type="submit"
        :disabled="filterPaymentLoading">
        <span v-if="filterPaymentLoading">
          <Loading color="text-white" />
        </span>
        <span v-else>Aplicar</span>
      </button>
    </div>
  </div>

  <!-- Tabela -->
  <div
    class="mb-4 p-5 relative overflow-hidden bg-white shadow shadow-sm shadow-blue-50 rounded-xl border border-gray-200">
    <div class="min-h-[650px] overflow-hidden relative">
      <div class="relative overflow-visible">
        <table class="hidden sm:table min-w-full text-sm divide-y divide-gray-200">
          <thead class="text-gray-600 text-left border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 font-normal">ID</th>
              <th class="px-6 py-3 font-normal">Cliente</th>
              <th class="px-6 py-3 font-normal">Recebido por</th>
              <th class="px-6 py-3 font-normal">Valor</th>
              <th class="px-6 py-3 font-normal">Total</th>
              <th class="px-6 py-3 font-normal">Tipo de pagamento</th>
              <th class="px-6 py-3 font-normal">Data</th>
              <th class="px-6 py-3 font-normal text-center">Ação</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="payment in paymentStore.payments"
              :key="payment.id"
              class="hover:bg-gray-50 divide-y divide-gray-200 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">{{ payment.id }}</td>
              <td class="px-6 py-4 font-semibold">{{ payment.client_name }}</td>
              <td class="px-6 py-4">{{ payment.user_name }}</td>
              <td class="px-6 py-4 font-semibold">{{ formatCurrency(payment.amount) }}</td>
              <td class="px-6 py-4 font-semibold">{{ formatCurrency(payment.client_debit) }}</td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'text-green-900 bg-green-300 px-2 py-1 rounded-full': payment.payment_type === 'Fator',
                    'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': payment.payment_type === 'Total',
                    'text-blue-700 bg-blue-200 px-2 py-1 rounded-full': payment.payment_type === 'Parcial',
                    'text-gray-500 border border-gray-400 px-2 py-1 rounded-full': payment.payment_type === 'Novo'
                  }">
                  {{ payment.payment_type }}
                </span>
              </td>
              <td class="px-6 py-4">{{ formatDate(payment.payment_date) }}</td>
              <td class="text-center" @click.stop>
                <DropPaymentsTable
                  :payments="paymentStore.payments"
                  @deletePayment="deletePayment" />
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile -->
        <div class="sm:hidden divide-y divide-gray-100 pb-15">
          <div
            v-for="payment in paymentStore.payments"
            :key="payment.id"
            class="p-4 flex flex-col gap-2 border-b hover:bg-gray-50">
            <div class="flex justify-between items-center relative">
              <h3 class="font-semibold text-gray-800">{{ payment.client_name }}</h3>
              <DropPaymentsTable :payments="paymentStore.payments" @deletePayment="deletePayment" />
            </div>
            <p class="text-gray-600 text-sm"><span class="font-semibold">ID:</span> {{ payment.id }}</p>
            <p class="text-gray-600 text-sm"><span class="font-semibold">Recebido por:</span> {{ payment.user_name }}</p>
            <p class="text-gray-600 text-sm"><span class="font-semibold">Valor:</span> {{ formatCurrency(payment.amount) }}</p>
            <p class="text-gray-600 text-sm"><span class="font-semibold">Total:</span> {{ formatCurrency(payment.client_debit) }}</p>
            <p class="text-gray-600 text-sm">
              <span class="font-semibold">Tipo:</span>
              <span
                :class="{
                  'text-green-900 bg-green-300 px-2 py-1 rounded-full': payment.payment_type === 'Fator',
                  'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': payment.payment_type === 'Total',
                  'text-blue-700 bg-blue-200 px-2 py-1 rounded-full': payment.payment_type === 'Parcial',
                  'text-gray-500 border border-gray-400 px-2 py-1 rounded-full': payment.payment_type === 'Novo'
                }">
                {{ payment.payment_type }}
              </span>
            </p>
            <p class="text-gray-600 text-sm"><span class="font-semibold">Data:</span> {{ formatDate(payment.payment_date) }}</p>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="w-full bg-white absolute bottom-0">
        <Paginate
          :links="paymentStore.meta.links"
          @change="applyFilters"
          :loading="filterPaymentLoading" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/payment'
import DropPaymentsTable from './dashboard/DropPaymentsTable.vue'
import Paginate from './dashboard/Paginate.vue'
import { formatCurrency, formatDate } from '@/utils/helpers'
import Loading from './layout/Loading.vue'
import qs from 'qs'

const paymentStore = usePaymentStore()
const filterPaymentLoading = ref(false)

const filters = ref({
  search: '',
  payment_type: '',
  amount: '',
  total: '',
  startDate: '',
  endDate: ''
})

const hasFilters = computed(() => Object.values(filters.value).some(v => v !== ''))

function resetFilters() {
  filters.value = { search: '', payment_type: '', amount: '', total: '', startDate: '', endDate: '' }
}

function applyFilters(url = null) {
  filterPaymentLoading.value = true

  const queryObject = qs.stringify(
    {
      filter: {
        search: filters.value.search || undefined,
        payment_type: filters.value.payment_type || undefined,
        amount: filters.value.amount || undefined,
        total: filters.value.total || undefined,
        payment_date: {
          start: filters.value.startDate || undefined,
          end: filters.value.endDate || undefined
        }
      }
    },
    { encode: false, skipNulls: true }
  )

  const base = url ? url : '?page=1'
  paymentStore.getWithFilters(`${base}&${queryObject}`).finally(() => {
    filterPaymentLoading.value = false
  })
}

function deletePayment(id) {
  paymentStore.deletePayment(id)
}

onMounted(() => paymentStore.getPayments())
</script>
