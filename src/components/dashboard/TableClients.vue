<template>
  <div
    class="mb-4 p-5 relative overflow-hidden bg-white shadow shadow-sm shadow-blue-50 rounded-xl border border-gray-200">
    <!-- Título -->
    <div class="title flex items-center gap-2 absolute top-4 left-4 text-gray-600">
      <span class="material-symbols-outlined">filter_list</span>
      <p>Filtros</p>
    </div>

    <!-- Campos -->
    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Nome/email -->
      <div>
        <label class="text-xs text-gray-500 font-medium">Nome/email</label>
        <input v-model="filters.search" type="text" placeholder="Digite nome ou email"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
      </div>

      <!-- Status -->
      <div>
        <label class="text-xs text-gray-500 font-medium">Status</label>
        <select v-model="filters.status"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
          <option value="">Selecione</option>
          <option value="Ativo">Ativos</option>
          <option value="Vencido">Vencidos</option>
          <option value="Quitado">Quitados</option>
        </select>
      </div>

      <!-- Tipo de pessoa -->
      <div>
        <label class="text-xs text-gray-500 font-medium">Tipo de pessoa</label>
        <select v-model="filters.person_type"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
          <option value="">Selecione</option>
          <option value="fisica">Física</option>
          <option value="juridica">Jurídica</option>
        </select>
      </div>

      <!-- Datas -->
      <div class="flex flex-col justify-end">
        <p class="text-xs text-gray-500 font-medium mb-1">Data de cadastro</p>
        <div class="flex flex-col sm:flex-row gap-2">
          <input v-model="filters.dateStart" type="date"
            class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
          <input v-model="filters.dateEnd" type="date"
            class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div v-if="hasFilters" class="flex flex-col sm:flex-row justify-end sm:items-center gap-3 mt-6">

      <DefaultButton @click="resetFilters" buttonClass="bg-transparent text-gray-500 hover:underline"
        buttonSize="h-9 lg:w-25" type="button" :disabled="filterClientLoading">
        Limpar

      </DefaultButton>


      <DefaultButton @click="applyFilters"
        buttonClass="bg-gradient-to-tl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        buttonSize="h-9 lg:w-25 p-3" type="submit" :disabled="filterClientLoading">
        <div class="flex justify-center items-center gap-2">
          <span v-if="filterClientLoading">
            <Loading color="text-white" />
          </span>
          <span v-else>Aplicar</span>
        </div>
      </DefaultButton>
    </div>
  </div>


  <div
    class="min-h-[650px] overflow-hidden relative bg-white shadow shadow-sm shadow-blue-50 rounded-xl border border-gray-200">
    <!-- Tabela responsiva -->
    <div class="relative overflow-visible">
      <table class="hidden sm:table min-w-full text-sm">
        <thead class="text-gray-600 text-left border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 font-normal">Nome</th>
            <th class="px-6 py-3 font-normal">Telefone</th>
            <th class="px-6 py-3 font-normal">Status</th>
            <th class="px-6 py-3 font-normal">Tipo de pessoa</th>
            <th class="px-6 py-3 font-normal">Data de cadastro</th>
            <th class="px-6 py-3 font-normal text-center">Ações</th>
          </tr>
        </thead>

        <tbody class="divide- divide-gray-100">
          <tr v-for="client, index in clientStore.clients" :key="client.id"
            class="hover:bg-gray-50 divide-y divide-gray-200">
            <td class="px-6 py-4 whitespace-nowrap">{{ client.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatPhone(client.phone) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{
                'text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-300 hover:bg-green-200': client.status === 'Ativo',
                'text-orange-700 bg-orange-100 px-2 py-1 rounded-full border border-orange-300 hover:bg-orange-200': client.status === 'Quitado',
                'text-red-700 bg-red-100 px-2 py-1 rounded-full border border-red-300 hover:bg-red-200': client.status === 'Vencido',
                'text-gray-500 border border-gray-400 px-2 py-1 rounded-full hover:bg-gray-200': client.status === 'Novo'
              }">
                {{ client.status }}
              </span>
            </td>
            <td class="px-6 py-4">{{ client.person_type }}</td>
            <td class="px-6 py-4">{{ formatDate(client.created_at) }}</td>
            <td class="text-center border-b border-gray-200 " @click.stop>
              <DropClientsTable :client="client" :index="index + 1" @deleteClient="openDeleteDialog" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Versão mobile -->
      <div class="sm:hidden divide-y divide-gray-100 pb-15">
        <div v-for="client, index in clientStore.clients" :key="client.id"
          class="p-4 flex flex-col gap-2 border-b hover:bg-gray-50">
          <div class="flex justify-between items-center relative">
            <h3 class="font-semibold text-gray-800">{{ client.name }}</h3>
            <DropClientsTable :client="client" :index="index - 1" @deleteClient="openDeleteDialog" />
          </div>
          <p class="text-gray-600 text-sm"><span class="font-semibold">Telefone:</span> {{ formatPhone(client.phone)
          }}
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
    <div class="w-full bg-white absolute bottom-0">
      <Paginate :links="clientStore.meta.links" @change="applyFilters" :loading="filterClientLoading" />
    </div>
  </div>
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useClientStore } from '@/stores/client';
import { useModal } from '@/composables/useModal';
import DropClientsTable from './DropClientsTable.vue';
import BaseModal from '../layout/BaseModal.vue';
import ErrorFeedbackMessage from '../FeedbackMessage.vue';
import { formatDate, formatPhone } from '@/utils/helpers';
import Paginate from './Paginate.vue';
import qs from 'qs';
import Loading from '../layout/Loading.vue';
import DefaultButton from '../DefaultButton.vue';




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
  person_type: ''
});

const hasFilters = computed(() => {
  return Object.values(filters.value).some(value => value !== '');
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

  applyFilters();
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
