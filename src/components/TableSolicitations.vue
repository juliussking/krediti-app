<template>
  <!-- Filtro -->
  <div
    class="mb-4 p-5 relative overflow-hidden bg-white shadow shadow-sm shadow-blue-50 rounded-xl border border-gray-200">
    <!-- Título -->
    <div class="title flex items-center gap-2 absolute text-gray-600 relative">
      <span class="material-symbols-outlined">filter_list</span>
      <p>Filtros</p>
    </div>

    <!-- Campos -->
    <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label class="text-xs text-gray-500 font-medium">Status</label>
        <select
          v-model="filters.status"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
          <option value="">Todos</option>
          <option value="Aprovada">Aprovada</option>
          <option value="Recusada">Recusada</option>
          <option value="Pendente">Pendente</option>
          <option value="Contra-oferta">Contra-oferta</option>
        </select>
      </div>

      <div>
        <label class="text-xs text-gray-500 font-medium">Cliente/Usuário</label>
        <input
          v-model="filters.search"
          type="text"
          placeholder="Filtre por cliente ou usuário"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="text-xs text-gray-500 font-medium">Valor solicitado</label>
        <input
          v-model="filters.amount_requested"
          type="number"
          placeholder="Ex: 1500"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="text-xs text-gray-500 font-medium">Valor aprovado</label>
        <input
          v-model="filters.amount_approved"
          type="number"
          placeholder="Ex: 1200"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="text-xs text-gray-500 font-medium">Contra-proposta</label>
        <input
          v-model="filters.counteroffer"
          type="number"
          placeholder="Ex: 1300"
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

      <div>
        <label class="text-xs text-gray-500 font-medium">Taxa</label>
        <select
          v-model="filters.tax"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
          <option value="">Todas</option>
          <option value="1.19">1.19</option>
          <option value="1.23">1.23</option>
          <option value="1.25">1.25</option>
          <option value="1.31">1.31</option>
        </select>
      </div>

      <!-- Datas -->
      <div class="flex flex-col justify-end">
        <p class="text-xs text-gray-500 font-medium mb-1">Data de criação</p>
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
        :disabled="filterClientLoading">
        Limpar
      </button>

      <button
        @click="applyFilters"
        class="bg-gradient-to-tl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all h-9 lg:w-25 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2"
        type="submit"
        :disabled="filterClientLoading">
        <span v-if="filterClientLoading">
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
              <th class="px-6 py-3 font-normal">Feita por</th>
              <th class="px-6 py-3 font-normal">Valor solicitado</th>
              <th class="px-6 py-3 font-normal">Contra-oferta</th>
              <th class="px-6 py-3 font-normal">Valor aprovado</th>
              <th class="px-6 py-3 font-normal">Taxa</th>
              <th class="px-6 py-3 font-normal">Total</th>
              <th class="px-6 py-3 font-normal">Status</th>
              <th class="px-6 py-3 font-normal">Criada em</th>
              <th class="px-6 py-3 font-normal text-center">Ação</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="solicitation in solicitationStore.solicitations"
              :key="solicitation.id"
              class="hover:bg-gray-50 divide-y divide-gray-200 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">{{ solicitation.user_name }}</td>
              <td class="px-6 py-4 font-semibold">{{ formatCurrency(solicitation.amount_requested) }}</td>
              <td class="px-6 py-4 font-semibold">{{ formatCurrency(solicitation.counteroffer) }}</td>
              <td class="px-6 py-4 font-semibold">{{ formatCurrency(solicitation.amount_approved) }}</td>
              <td class="px-6 py-4">{{ solicitation.tax }}</td>
              <td class="px-6 py-4 font-semibold">{{ formatCurrency(solicitation.total) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'text-green-900 bg-green-300 px-2 py-1 rounded-full': solicitation.status === 'Aprovada',
                    'text-red-900 bg-red-300 px-2 py-1 rounded-full': solicitation.status === 'Recusada',
                    'text-gray-700 bg-gray-200 px-2 py-1 rounded-full': solicitation.status === 'Pendente',
                    'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': solicitation.status === 'Contra-oferta'
                  }">
                  {{ solicitation.status }}
                </span>
              </td>
              <td class="px-6 py-4 font-semibold">{{ formatDate(solicitation.solicitation_date) }}</td>
              <td class="text-center" @click.stop>
                <DropSolicitationTable
                  :solicitation="solicitation"
                  @deleteSolicitation="deleteSolicitation"
                  @approveSolicitation="approveSolicitation"
                  @counterofferSolicitation="counterofferSolicitation"
                  @recuseSolicitation="recuseSolicitation" />
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile -->
        <div class="sm:hidden divide-y divide-gray-100 pb-15">
          <div
            v-for="solicitation in solicitationStore.solicitations"
            :key="solicitation.id"
            class="p-4 flex flex-col gap-2 border-b hover:bg-gray-50">
            <div class="flex justify-between items-center relative">
              <h3 class="font-semibold text-gray-800">{{ solicitation.user_name }}</h3>
              <DropSolicitationTable
                :solicitation="solicitation"
                @deleteSolicitation="deleteSolicitation"
                @approveSolicitation="approveSolicitation"
                @counterofferSolicitation="counterofferSolicitation"
                @recuseSolicitation="recuseSolicitation" />
            </div>
            <p class="text-gray-600 text-sm">
              <span class="font-semibold">Valor solicitado:</span>
              {{ formatCurrency(solicitation.amount_requested) }}
            </p>
            <p class="text-gray-600 text-sm">
              <span class="font-semibold">Status:</span> {{ solicitation.status }}
            </p>
            <p class="text-gray-600 text-sm">
              <span class="font-semibold">Criada em:</span> {{ formatDate(solicitation.solicitation_date) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="w-full bg-white absolute bottom-0">
        <Paginate :links="solicitationStore.meta.links" @change="applyFilters" :loading="filterClientLoading" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSolicitationStore } from '@/stores/solicitation'
import DropSolicitationTable from './dashboard/DropSolicitationTable.vue'
import Paginate from './dashboard/Paginate.vue'
import { formatCurrency, formatDate } from '@/utils/helpers'
import qs from 'qs'
import Loading from './layout/Loading.vue'

import { useToast } from 'vue-toastification';

const toast = useToast();

const solicitationStore = useSolicitationStore()
const filterClientLoading = ref(false)

const filters = ref({
  search: '',
  status: '',
  tax: '',
  amount_requested: '',
  total: '',
  amount_approved: '',
  counteroffer: '',
  startDate: '',
  endDate: ''
})

const hasFilters = computed(() => Object.values(filters.value).some(value => value !== ''))

function resetFilters() {
  filters.value = {
    search: '',
    status: '',
    tax: '',
    amount_requested: '',
    amount_approved: '',
    counteroffer: '',
    startDate: '',
    endDate: '',
    total: ''
  }
}

function applyFilters(url = null) {
  filterClientLoading.value = true

  const queryObject = qs.stringify(
    {
      filter: {
        search: filters.value.search || undefined,
        status: filters.value.status || undefined,
        tax: filters.value.tax || undefined,
        total: filters.value.total || undefined,
        amount_requested: filters.value.amount_requested || undefined,
        amount_approved: filters.value.amount_approved || undefined,
        counteroffer: filters.value.counteroffer || undefined,
        created_at: {
          start: filters.value.startDate || undefined,
          end: filters.value.endDate || undefined
        }
      }
    },
    { encode: false, skipNulls: true }
  )

  const base = url ? url : '?page=1'
  solicitationStore.getWithFilters(`${base}&${queryObject}`)
  .then(() => {

    toast.success('Filtros aplicados com sucesso!');
    
  }).catch(() => {
    toast.error('Erro ao aplicar filtros, tente novamente!');
  })
  .finally(() => {
    filterClientLoading.value = false
  })
}

onMounted(() => solicitationStore.getSolicitations())
</script>
