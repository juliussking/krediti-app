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

      <div>
        <label class="text-xs text-gray-500 font-medium">Cargo</label>
        <select v-model="filters.status"
          class="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none">
          <option value="">Selecione</option>
          <option value="Ativo">Admin</option>
          <option value="Vencido">Gerente</option>
          <option value="Quitado">Atendente</option>
        </select>
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
        buttonSize="h-9 lg:w-25" type="button" :disabled="filterUserLoading">
        Limpar

      </DefaultButton>


      <DefaultButton @click="applyFilters"
        buttonClass="bg-gradient-to-tl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        buttonSize="h-9 lg:w-25 p-3" type="submit" :disabled="filterUserLoading">
        <div class="flex justify-center items-center gap-2">
          <span v-if="filterUserLoading">
            <Loading color="text-white" />
          </span>
          <span v-else>Aplicar</span>
        </div>
      </DefaultButton>
    </div>
  </div>

  <div
    class="mb-4 p-5 relative overflow-hidden bg-white shadow shadow-sm shadow-blue-50 rounded-xl border border-gray-200">
    <div class="min-h-[650px] overflow-hidden relative">
      <div class="relative overflow-visible">
        <table class="hidden sm:table min-w-full text-sm divide-y divide-gray-200">
          <thead class="text-gray-600 text-left border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 font-normal">Nome</th>
              <th class="px-6 py-3 font-normal">Telefone</th>
              <th class="px-6 py-3 font-normal">Cargo</th>

              <th class="px-6 py-3 font-normal">E-mail</th>
              <th class="px-6 py-3 font-normal">Criado em</th>
              <th class="px-6 py-3 font-normal text-center">Ações</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr v-for="user, index in users" :key="user.id" class="hover:bg-gray-50 divide-y divide-gray-200">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatPhone(user.phone) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                Admin
                <!-- <span :class="{
              'text-green-900 bg-green-300 px-2 py-1 rounded-full': client.status === 'Ativo',
              'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': client.status === 'Quitado',
              'text-red-700 bg-red-200 px-2 py-1 rounded-full': client.status === 'Vencido',
              'text-gray-500 border border-gray-400 px-2 py-1 rounded-full': client.status === 'Novo'
            }">
              {{ client.status }}
            </span> -->
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(user.created_at) }}</td>
              <td class="text-center" @click.stop>
                <DropUsersTable :user="user" :index="index+1" @deleteUser="openDeleteDialog" />


              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile -->
        <div class="sm:hidden divide-y divide-gray-100 pb-15">
          <div v-for="(user, index) in users" :key="user.id" class="p-4 flex flex-col gap-2 border-b hover:bg-gray-50">
            <div class="flex justify-between items-center relative">
              <h3 class="font-semibold text-gray-800">{{ user.name }}</h3>
              <DropUsersTable :user="user" :index="index-1" @deleteUser="openDeleteDialog" />
            </div>
            <p class="text-gray-600 text-sm"><span class="font-semibold">Telefone:</span> {{ formatPhone(user.phone) }}
            </p>
            <p class="text-gray-600 text-sm"><span class="font-semibold">Cargo:</span> Admin </p>
            <p class="text-gray-600 text-sm"><span class="font-semibold">E-mail:</span> {{ user.email }}</p>
            <p class="text-gray-600 text-sm"><span class="font-semibold">Criado em:</span> {{
              formatDate(user.created_at) }}</p>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="w-full bg-white absolute bottom-0">
        <Paginate :links="userStore.meta.links" @change="applyFilters" :loading="filterUserLoading" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { ref, onMounted, computed } from 'vue';
import Paginate from './Paginate.vue';
import { formatDate, formatPhone } from '@/utils/helpers';
import DefaultButton from '../DefaultButton.vue';
import Loading from '../layout/Loading.vue';
import qs from 'qs';
import DropUsersTable from './DropUsersTable.vue';

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const showFilter = ref(false);


const filters = ref({
  search: '',
  status: '',
  person_type: '',
  role: '',
  dateStart: '',
  dateEnd: '',
});

const hasFilters = computed(() => {
  return Object.values(filters.value).some(value => value !== '');
});

const filterUserLoading = ref(false);

function resetFilters() {
  filters.value = {
    search: '',
    status: '',
    person_type: '',
    role: '',
    dateStart: '',
    dateEnd: '',
  };
}

function openDeleteDialog(user) {
  userToDelete.value = user;
  deleteClientModal.open();
}

function applyFilters(url = null) {

  filterUserLoading.value = true

  const queryObject = qs.stringify({
    filter: {
      search: filters.value.search || undefined,
      status: filters.value.status || undefined,
      person_type: filters.value.person_type || undefined,
      role: filters.value.role || undefined,
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
    userStore.getWithFilters(`${url}&${queryObject}`).finally(() => {
      filterUserLoading.value = false
      showFilter.value = false
    });
  } else {
    userStore.getWithFilters(`page=1&${queryObject}`).finally(() => {
      filterUserLoading.value = false
      showFilter.value = false
    });
  }
}

onMounted(() => {
  userStore.getUser();
});
</script>
