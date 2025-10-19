<template>
  <div class="bg-white shadow rounded min-h-[650px] overflow-hidden relative">
    <!-- Cabeçalho -->
    <div class="p-4 border-b border-gray-200 flex sm:flex-row sm:items-center justify-between gap-3">
      <h2 class="text-lg font-semibold text-gray-800">Pagamentos</h2>

      <div class="flex items-center gap-3 relative">
        <!-- Botão filtro -->
        <button
          @click="showFilter = !showFilter"
          class="flex items-center gap-1 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[20px]">filter_list</span>
          <span class="text-sm font-medium hidden sm:inline">Filtros</span>
        </button>

        <!-- Botão Nova Solicitação -->
        <p
          class="text-sm text-green-600 font-semibold bg-green-50 px-3 py-2 rounded hover:bg-green-100 cursor-pointer"
        >
          Novo pagamento
        </p>

        <!-- Dropdown de Filtros -->
        <div
          v-if="showFilter"
          class="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:w-[350px] animate-fadeIn"
        >
          <!-- Cabeçalho -->
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-gray-800 font-semibold text-sm">Filtrar pagamentos</h3>
            <span
              class="material-symbols-outlined cursor-pointer text-gray-600 hover:text-gray-800"
              @click="showFilter = false"
              >close</span
            >
          </div>

          <!-- Status -->
          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Status</label>
            <select
              v-model="filters.status"
              class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Todos</option>
              <option value="Aprovada">Total</option>
              <option value="Recusada">Fator</option>
              <option value="Pendente">Parcial</option>
            </select>
          </div>

          <!-- Nome ou ID -->
          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Nome / ID</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Digite nome ou ID"
              class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <!-- Data de criação -->
          <div class="mb-3">
            <p class="text-xs text-gray-500 font-medium mb-1">Data de pagamento</p>
            <div class="flex gap-2">
              <input
                v-model="filters.startDate"
                type="date"
                class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
              />
              <input
                v-model="filters.endDate"
                type="date"
                class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <!-- Botões -->
          <div class="flex justify-between mt-4">
            <button @click="resetFilters" class="text-gray-600 text-sm hover:text-gray-800 cursor-pointer">
              Limpar
            </button>
            <button
              @click="applyFilters"
              class="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md cursor-pointer"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto">
      <table class="hidden sm:table min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
          <tr>
            <th class="px-6 py-3">ID</th>
            <th class="px-6 py-3">Cliente</th>
            <th class="px-6 py-3">Recebido por</th>
            <th class="px-6 py-3">Valor</th>
            <th class="px-6 py-3">Total</th>
            <th class="px-6 py-3">Tipo de pagamento</th>
            <th class="px-6 py-3">Data</th>
            <th class="px-6 py-3 text-center">Ação</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="payment in paymentStore.payments"
            :key="payment.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{payment.id}}</td>
            <td class="px-6 py-4 font-semibold">
              {{payment.user_name}}
            </td>
            <td class="px-6 py-4">{{payment.client_name}}</td>
            <td class="px-6 py-4 font-semibold">{{ formatCurrency(payment.amount) }}</td>
            <td class="px-6 py-4 font-semibold">{{ formatCurrency(payment.client_debit) }}</td>
            <td class="px-6 py-4">
              <span :class="{
                'text-green-900 bg-green-300 px-2 py-1 rounded-full': payment.payment_type === 'Fator',
                'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': payment.payment_type === 'Total',
                'text-blue-700 bg-blue-200 px-2 py-1 rounded-full': payment.payment_type === 'Parcial',
                'text-gray-500 border border-gray-400 px-2 py-1 rounded-full': payment.payment_type === 'Novo'
              }">
                {{ payment.payment_type }}
              </span>
            </td>
            <td class="px-6 py-4">{{ formatDate(payment.payment_date) }}</td>
            <td class="px-6 py-4 relative text-center">
              <DropPaymentsTable
                :payments="paymentStore.payments"
                @deletePayment="deletePayment"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Versão mobile -->
     <div class="sm:hidden divide-y divide-gray-100">
        <div
          v-for="payment in paymentStore.payments"
          :key="payment.id"
          class="p-4 flex flex-col gap-2 border-b hover:bg-gray-50"
        >
          <div class="flex justify-between items-center relative">
            <h3 class="font-semibold text-gray-800">{{payment.client_name}}</h3>
            <DropSolicitationTable
              :solicitation="payment"
              
            />
          </div>
          <p class="text-gray-600 text-sm">
            <span class="font-semibold">ID:</span>
            {{ payment.id }}
          </p>
          <p class="text-gray-600 text-sm">
            <span class="font-semibold">Recebido por:</span> 
            {{ payment.user_name }}
          </p>
          <p class="text-gray-600 text-sm">
            <span class="font-semibold">Valor:</span>
            {{ formatCurrency(payment.amount) }}
          </p>
          <p class="text-gray-600 text-sm">
            <span class="font-semibold">Total:</span>
            {{ formatCurrency(payment.client_debit) }}
          </p>
          <p class="text-gray-600 text-sm">
            <span class="font-semibold">Tipo:</span>
            <span :class="{
                'text-green-900 bg-green-300 px-2 py-1 rounded-full': payment.payment_type === 'Fator',
                'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': payment.payment_type === 'Total',
                'text-blue-700 bg-blue-200 px-2 py-1 rounded-full': payment.payment_type === 'Parcial',
                'text-gray-500 border border-gray-400 px-2 py-1 rounded-full': payment.payment_type === 'Novo'
              }">
                {{ payment.payment_type }}
              </span>
          </p>
          <p class="text-gray-600 text-sm">
            <span class="font-semibold">Data:</span>
            {{ formatDate(payment.payment_date) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <Paginate
    :currentPage="paymentStore.meta.current_page"
    :totalPages="paymentStore.meta.last_page"
    @change="paymentStore.getPaymentPage($event)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/payment'
import DropSolicitationTable from './dashboard/DropSolicitationTable.vue'
import Paginate from './dashboard/Paginate.vue'
import { formatCurrency, formatDate } from '@/utils/helpers'
import DropPaymentsTable from './dashboard/DropPaymentsTable.vue'

const paymentStore = usePaymentStore()

const showFilter = ref(false)
const filters = ref({
  status: '',
  search: '',
  startDate: '',
  endDate: ''
})

function resetFilters() {
  filters.value = { status: '', search: '', startDate: '', endDate: '' }
}

function applyFilters() {
  showFilter.value = false
  paymentStore.getPayments(filters.value)
}

function deletePayment(id) {
  paymentStore.deletePayment(id)
}

onMounted(() => paymentStore.getPayments())
</script>
