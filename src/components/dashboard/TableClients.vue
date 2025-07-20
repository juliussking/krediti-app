<template>
  <div class="bg-white shadow rounded overflow-x-auto">
    <div class="p-4 border-b border-gray-200 flex justify-between">
      <h2 class="text-lg font-semibold text-gray-800">Clientes</h2>
      <RouterLink :to="{ name: 'client-register' }"
        class="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100  cursor-pointer mr-3">
        Novo cliente
      </RouterLink>

    </div>
    <table class="min-w-full divide-y divide-gray-200 text-sm">
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
          <td class="px-6 py-4">{{ client.name }}</td>
          <td class="px-6 py-4">{{ client.phone }}</td>
          <td class="px-6 py-4">
            <span :class="{
              'text-green-900 bg-green-300 px-2 py-1 rounded-full': client.status === 'Ativo',
              'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': client.status === 'Quitado',
              'text-red-700 bg-red-200 px-2 py-1 rounded-full': client.status === 'Vencido'
            }">

              {{ client.status }}
            </span>
          </td>
          <td class="px-6 py-4">{{ client.person_type }}</td>
          <td class="px-6 py-4">{{ client.birth_date }}</td>
          <td class="text-center relative" @click.stop>

            <DropClientsTable :client="client" @deleteClient="openDeleteDialog" />

          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <BaseModal v-model="deleteClientModal.isOpen.value" modalTitle="Excluir cliente"
    buttonConfirmClass="bg-red-600 hover:bg-red-700 text-white"
    buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800" cancelText="Cancelar" confirmText="Sim, excluir"
    @confirm="deleteClient(clientToDelete.id)" buttonSize="w-25 px-2 py-1" :loading="deleteClientModal.loading.value">
    <ErrorFeedbackMessage :feedbackMessage="feedbackMessage" />

    <p class="text-gray-800">Tem certeza que deseja excluir o cliente <span class="font-semibold">
        {{ clientToDelete.name }}</span>?
    </p>
  </BaseModal>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { useModal } from '@/composables/useModal';
const deleteClientModal = useModal();

import { useClientStore } from '@/stores/client';
const clientStore = useClientStore();
import DropClientsTable from './DropClientsTable.vue';
import BaseModal from '../layout/BaseModal.vue';
import ErrorFeedbackMessage from '../FeedbackMessage.vue';

const clientToDelete = ref({});

const feedbackMessage = ref('');

function openDeleteDialog(client) {
  clientToDelete.value = client;
  deleteClientModal.open();
}

function deleteClient(clientId) {

  feedbackMessage.value = ''

  deleteClientModal.loading.value = true

  return clientStore.deleteClient(clientId)
    .then(() => {

      deleteClientModal.close();

    }).catch((error) => {

      feedbackMessage.value = error.message

    });
}

onMounted(() => {
  clientStore.getClients();
  clientStore.getStatistics();
});


</script>
