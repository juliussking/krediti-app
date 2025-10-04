<template>
  <div class="bg-white shadow rounded min-h-[650px] overflow-x-auto">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">Usuários</h2>
    </div>
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
        <tr>
          <th class="px-6 py-3">Nome</th>
          <th class="px-6 py-3">Telefone</th>
          <th class="px-6 py-3">E-mail</th>
          <th class="px-6 py-3">Criado em</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 cursor-pointer"
        @click="$router.push({ name: 'client-profile', params: { id: user.id } })"
        >
          <td class="px-6 py-4">{{ user.name }}</td>
          <td class="px-6 py-4">{{ formatPhone(user.phone) }}</td>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4">{{ formatDate(user.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
    <Paginate 
  :currentPage="userStore.meta.current_page"
  :totalPages="userStore.meta.last_page"
  @change="userStore.getUserPage($event)"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

import { formatDate, formatPhone } from '@/utils/helpers';
import Paginate from './Paginate.vue';

onMounted(() => {
  userStore.getUser();
  userStore.getUserPage();
});
</script>
