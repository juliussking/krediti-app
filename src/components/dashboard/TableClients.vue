<template>
  <div class="bg-white shadow rounded min-h-[650px] overflow-hidden relative">
    <!-- Cabeçalho -->
    <div class="p-4 border-b border-gray-200 flex sm:flex-row sm:items-center justify-between gap-3">
      <h2 class="text-lg font-semibold text-gray-800">Clientes</h2>

      <div class="flex items-center gap-3 relative">
        <!-- Botão filtro -->
        <button @click="showFilter = !showFilter"
          class="flex items-center gap-1 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer">
          <span class="material-symbols-outlined text-[20px] ">filter_list</span>
          <span class="text-sm font-medium hidden sm:inline">Filtros</span>
        </button>

        <!-- Botão Novo Cliente -->
        <RouterLink :to="{ name: 'client-register' }"
          class="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-2 rounded hover:bg-blue-100 cursor-pointer">
          Novo cliente
        </RouterLink>

        <!-- Dropdown de Filtros -->

        <div v-if="showFilter"
          class="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:w-[350px] animate-fadeIn">

          <!-- Cabeçalho -->
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-gray-800 font-semibold text-sm">Filtrar clientes</h3>
            <span class="material-symbols-outlined cursor-pointer text-gray-600 hover:text-gray-800"
              @click="showFilter = false">
              close
            </span>
          </div>

          <!-- Situação -->
          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Status</label>
            <select v-model="filters.status"
              class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
              <option value="">Todos</option>
              <option value="Ativo">Ativos</option>
              <option value="Vencido">Vencidos</option>
              <option value="Quitado">Quitados</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Tipo de pessoa</label>
            <select v-model="filters.person_type"
              class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
              <option value="">Todos</option>
              <option value="fisica">Física</option>
              <option value="juridica">Juridica</option>
            </select>
          </div>

          <!-- Nome ou ID -->
          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Nome/email</label>
            <input v-model="filters.search" type="text" placeholder="Digite nome ou email"
              class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
          </div>

          <!-- Datas -->
          <div class="mb-3">
            <p class="text-xs text-gray-500 font-medium mb-1">Data de cadastro</p>
            <div class="flex gap-2">
              <input v-model="filters.registerStart" type="date"
                class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
              <input v-model="filters.registerEnd" type="date"
                class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
            </div>
          </div>

          <!-- <div class="mb-3">
    <p class="text-xs text-gray-500 font-medium mb-1">Data de nascimento</p>
    <div class="flex gap-2">
      <input v-model="filters.birthStart" type="date"
             class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      <input v-model="filters.birthEnd" type="date"
             class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
    </div>
  </div> -->

          <!-- Botões -->
          <div class="flex justify-between mt-4">
            <button @click="resetFilters" class="text-gray-600 text-sm hover:text-gray-800">Limpar</button>
            <button @click="applyFilters"
              class="text-sm font-semibold text-white text-center bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md w-20">

              <span v-if="!filterClientLoading">Aplicar</span>
              <Loading v-if="filterClientLoading" />

            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Tabela responsiva -->
    <div class="overflow-x-auto">
      <table class="hidden sm:table min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
          <tr>
            <th class="px-6 py-3">Nome</th>
            <th class="px-6 py-3">Telefone</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Tipo de pessoa</th>
            <th class="px-6 py-3">Data de nascimento</th>
            <th class="px-6 py-3 text-center">Ações</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr v-for="client in clientStore.clients" :key="client.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">{{ client.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatPhone(client.phone) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{
                'text-green-900 bg-green-300 px-2 py-1 rounded-full': client.status === 'Ativo',
                'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': client.status === 'Quitado',
                'text-red-700 bg-red-200 px-2 py-1 rounded-full': client.status === 'Vencido',
                'text-gray-500 border border-gray-400 px-2 py-1 rounded-full': client.status === 'Novo'
              }">
                {{ client.status }}
              </span>
            </td>
            <td class="px-6 py-4">{{ client.person_type }}</td>
            <td class="px-6 py-4">{{ formatDate(client.birth_date) }}</td>
            <td class="text-center" @click.stop>
              <DropClientsTable :client="client" @deleteClient="openDeleteDialog" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Versão mobile -->
      <div class="sm:hidden divide-y divide-gray-100">
        <div v-for="client in clientStore.clients" :key="client.id"
          class="p-4 flex flex-col gap-2 border-b hover:bg-gray-50">
          <div class="flex justify-between items-center relative">
            <h3 class="font-semibold text-gray-800">{{ client.name }}</h3>
            <DropClientsTable :client="client" @deleteClient="openDeleteDialog" />
          </div>
          <p class="text-gray-600 text-sm"><span class="font-semibold">Telefone:</span> {{ formatPhone(client.phone) }}
          </p>
          <p class="text-gray-600 text-sm"><span class="font-semibold">Tipo:</span> {{ client.person_type }}</p>
          <p class="text-gray-600 text-sm"><span class="font-semibold">Nascimento:</span> {{
            formatDate(client.birth_date) }}</p>
          <p class="text-sm">
            <span :class="{
              'text-green-900 bg-green-300 px-2 py-1 rounded-full': client.status === 'Ativo',
              'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': client.status === 'Quitado',
              'text-red-700 bg-red-200 px-2 py-1 rounded-full': client.status === 'Vencido',
              'text-gray-500 border border-gray-400 px-2 py-1 rounded-full': client.status === 'Novo'
            }">
              {{ client.status }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <Paginate :links="clientStore.meta.links" @change="applyFilters" :loading="filterClientLoading" />

    <!-- Modal -->
    <BaseModal v-model="deleteClientModal.isOpen.value" modalTitle="Excluir cliente"
      buttonConfirmClass="bg-red-600 hover:bg-red-700 text-white"
      buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800" cancelText="Cancelar" confirmText="Sim, excluir"
      @confirm="deleteClient(clientToDelete.id)" buttonSize="w-25 px-2 py-1" :loading="deleteClientModal.loading.value">
      <ErrorFeedbackMessage :feedbackMessage="feedbackMessage" />
      <p class="text-gray-800">
        Tem certeza que deseja excluir o cliente
        <span class="font-semibold">{{ clientToDelete.name }}</span>?
      </p>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useClientStore } from '@/stores/client';
import { useModal } from '@/composables/useModal';
import DropClientsTable from './DropClientsTable.vue';
import BaseModal from '../layout/BaseModal.vue';
import ErrorFeedbackMessage from '../FeedbackMessage.vue';
import { formatDate, formatPhone } from '@/utils/helpers';
import Paginate from './Paginate.vue';
import qs from 'qs';
import Loading from '../layout/Loading.vue';




const clientStore = useClientStore();
const deleteClientModal = useModal();
const clientToDelete = ref({});
const feedbackMessage = ref('');
const showFilter = ref(false);



const filters = ref({
  status: '',
  search: '',
  dateStart: '',
  dateEnd: '',
  birthStart: '',
  birthEnd: '',
  person_type: ''
});

const filterClientLoading = ref(false);

function applyFilters(url = null) {

  filterClientLoading.value = true

  const queryObject = qs.stringify({
    filter: {
      search: filters.value.search || undefined,
      status: filters.value.status || undefined,
      person_type: filters.value.person_type || undefined,
      created_at: {
        start: filters.value.dateStart || undefined,
        end: filters.value.dateEnd || undefined
      }
    },
  },
    {
      encode: false,
      skipNulls: true
    });

  if (url) {
    clientStore.getWithFilters(`${url}&${queryObject}`).finally(() => {
      filterClientLoading.value = false
      showFilter.value = false
    });
  } else {
    // Primeira requisição (ou mudança de filtros)
    clientStore.getWithFilters(`?page=1&${queryObject}`).finally(() => {
      filterClientLoading.value = false
      showFilter.value = false
    });
  }
}

function openDeleteDialog(client) {
  clientToDelete.value = client;
  deleteClientModal.open();
}

function deleteClient(clientId) {
  feedbackMessage.value = '';
  deleteClientModal.loading.value = true;

  return clientStore
    .deleteClient(clientId)
    .then(() => deleteClientModal.close())
    .catch((error) => (feedbackMessage.value = error.message));
}

function resetFilters() {
  filters.value = {
    status: '', search: '', dateStart: '', dateEnd: '', birthEnd: '', birthStart: '', person_type: ''
  };
}

onMounted(() => {
  clientStore.getClients();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out;
}
</style>
