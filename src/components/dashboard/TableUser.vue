<template>
  <div class="bg-white shadow rounded min-h-[650px] overflow-hidden relative">
    <!-- Cabeçalho -->
    <div class="p-4 border-b border-gray-200 flex sm:flex-row sm:items-center justify-between gap-3">
      <h2 class="text-lg font-semibold text-gray-800">Usuários</h2>

      <div class="flex items-center gap-3 relative">
        <!-- Botão filtro -->
        <button @click="showFilter = !showFilter"
          class="flex items-center gap-1 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">filter_list</span>
          <span class="text-sm font-medium hidden sm:inline">Filtros</span>
        </button>

        <!-- Botão Novo Usuário -->
        <RouterLink :to="{ name: 'user-register' }"
          class="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-2 rounded hover:bg-blue-100 cursor-pointer">
          Novo usuário
        </RouterLink>

        <!-- Dropdown de Filtros -->
        <div v-if="showFilter"
          class="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:w-[350px] animate-fadeIn">
          
          <!-- Cabeçalho -->
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-gray-800 font-semibold text-sm">Filtrar usuários</h3>
            <span class="material-symbols-outlined cursor-pointer text-gray-600 hover:text-gray-800"
                  @click="showFilter = false">close</span>
          </div>

          <!-- Status -->
          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Status</label>
            <select v-model="filters.status"
                    class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
              <option value="">Todos</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <!-- Tipo de usuário -->
          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Tipo de usuário</label>
            <select v-model="filters.type"
                    class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
              <option value="">Todos</option>
              <option value="admin">Admin</option>
              <option value="usuario">Usuário</option>
            </select>
          </div>

          <!-- Nome ou ID -->
          <div class="mb-3">
            <label class="text-xs text-gray-500 font-medium">Nome ou ID</label>
            <input v-model="filters.search" type="text" placeholder="Digite nome ou ID"
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

          <div class="mb-3">
            <p class="text-xs text-gray-500 font-medium mb-1">Data de nascimento</p>
            <div class="flex gap-2">
              <input v-model="filters.birthStart" type="date"
                     class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
              <input v-model="filters.birthEnd" type="date"
                     class="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none" />
            </div>
          </div>

          <!-- Botões -->
          <div class="flex justify-between mt-4">
            <button @click="resetFilters" class="text-gray-600 text-sm hover:text-gray-800">Limpar</button>
            <button @click="applyFilters"
                    class="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela e Paginação -->
    <div class="overflow-x-auto">
      <table class="hidden sm:table min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
          <tr>
            <th class="px-6 py-3">Nome</th>
            <th class="px-6 py-3">Telefone</th>
            <th class="px-6 py-3">E-mail</th>
            <th class="px-6 py-3">Criado em</th>
            <th class="px-6 py-3 text-center">Ações</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatPhone(user.phone) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(user.created_at) }}</td>
            <td class="text-center" @click.stop>
              <DropClientsTable :client="user" @deleteClient="openDeleteDialog" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Versão mobile -->
      <div class="sm:hidden divide-y divide-gray-100">
        <div v-for="user in users" :key="user.id" class="p-4 flex flex-col gap-2 border-b hover:bg-gray-50">
          <div class="flex justify-between items-center relative">
            <h3 class="font-semibold text-gray-800">{{ user.name }}</h3>
            <DropClientsTable :client="user" @deleteClient="openDeleteDialog" />
          </div>
          <p class="text-gray-600 text-sm"><span class="font-semibold">Telefone:</span> {{ formatPhone(user.phone) }}</p>
          <p class="text-gray-600 text-sm"><span class="font-semibold">E-mail:</span> {{ user.email }}</p>
          <p class="text-gray-600 text-sm"><span class="font-semibold">Criado em:</span> {{ formatDate(user.created_at) }}</p>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <Paginate 
      :currentPage="userStore.meta.current_page"
      :totalPages="userStore.meta.last_page"
      @change="userStore.getUserPage($event)"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { ref, onMounted } from 'vue';
import DropClientsTable from './DropClientsTable.vue';
import Paginate from './Paginate.vue';
import { formatDate, formatPhone } from '@/utils/helpers';

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const showFilter = ref(false);
const filters = ref({
  status: '',
  type: '',
  search: '',
  registerStart: '',
  registerEnd: '',
  birthStart: '',
  birthEnd: ''
});

function resetFilters() {
  filters.value = {
    status: '',
    type: '',
    search: '',
    registerStart: '',
    registerEnd: '',
    birthStart: '',
    birthEnd: ''
  };
}

function openDeleteDialog(user) {
  userToDelete.value = user;
  deleteClientModal.open();
}

function applyFilters() {
  showFilter.value = false;
  userStore.getUsers(filters.value);
}

onMounted(() => {
  userStore.getUser();
  userStore.getUserPage();
});
</script>
