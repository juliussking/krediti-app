<template>
  <div class="p-4 border-b border-gray-200 flex justify-between overflow-x-auto">
    <h2 class="text-lg font-semibold text-gray-800">Contatos de referência</h2>

    <p class="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100  cursor-pointer mr-3">
      Novo contato</p>
  </div>
  <div v-if="clientProfile.solicitations?.length === 0" class="solictation">

    <h2 class="text-lg font-semibold text-gray-500 text-sm italic">Nenhuma solicitação registrada</h2>

  </div>


  <div v-else class="bg-white shadow rounded overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
        <tr>
          <th class="px-6 py-3">Nome</th>
          <th class="px-6 py-3">Telefone</th>
          <th class="px-6 py-3">Relação</th>
          <th class="px-6 py-3">Observação</th>
          <th class="px-6 py-3 text-center">Ação</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="contact in clientStore.clientProfileReferenceContacts" :key="contact.id" class="hover:bg-gray-50">

          <td class="px-6 py-4 whitespace-nowrap">
            <input type="text" :class="[
                  !contact.name ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editReferences ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="contact.name" :value="contact.name ?? 'Nao cadastrado'"
                  :readonly="!editReferences">
          </td>
          
          <td class="px-6 py-4">
            <input type="text" :class="[
                  !contact.phone ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editReferences ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="contact.phone" :value="contact.phone ?? 'Nao cadastrado'"
                  :readonly="!editReferences">
          </td>
          
          <td class="px-6 py-4">
            <input type="text" :class="[
                  !contact.relation ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editReferences ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="contact.relation" :value="contact.relation ?? 'Nao cadastrado'"
                  :readonly="!editReferences">
          </td>
          
          <td class="px-6 py-4">
            <input type="text" :class="[
                  !contact.observations ? 'text-gray-500 font-normal italic' : 'text-gray-800',
                  editReferences ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="contact.observations" :value="contact.observations ?? 'Nenhuma observação'"
                  :readonly="!editReferences">
          </td>
          <td class="px-6 py-4 relative">

            <DropReferenceContactsTable :contact="clientProfile" />

          </td>
        </tr>
      </tbody>
    </table>


  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';


import { useClientStore } from '@/stores/client';
import { ref } from 'vue';
import DropReferenceContactsTable from './dashboard/DropReferenceContactsTable.vue';
const clientStore = useClientStore();
const { clientProfile } = storeToRefs(clientStore);

const editReferences = ref(false);

</script>
