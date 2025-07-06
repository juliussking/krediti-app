<template>
  <div class="bg-white shadow rounded overflow-x-auto">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">Usuários</h2>
    </div>
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
        <tr>
          <th class="px-6 py-3">Nome</th>
          <th class="px-6 py-3">E-mail</th>
          <th class="px-6 py-3">Criado em</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 cursor-pointer"
        @click="$router.push({ name: 'client-profile', params: { id: user.id } })"
        >
          <td class="px-6 py-4">{{ user.name }}</td>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4">{{ user.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

onMounted(() => {
  userStore.getUser();
});
</script>
