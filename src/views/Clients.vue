<template>
  <div class="flex justify-between items-center mb-3 py-5">

    <div class="title">

      <h1 class="text-3xl text-gray-800 font-bold">Clientes</h1>
      <p class="text-gray-500">Gerencie seus clientes</p>
    </div>
    <div class="button">
      <RouterLink :to="{ name: 'client-register' }">
      <DefaultButton
        buttonClass="bg-gradient-to-tl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        buttonSize="h-9 px-5" type="button">Novo cliente
      </DefaultButton>
      </RouterLink>
    </div>

  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
    <CardTop>
      <template v-slot:cardTitle>
        Total de clientes
      </template>
      <template v-slot:mainInfo>
        {{ clientStore.clients_count }}
      </template>

      <template v-slot:subInfo>
        <span :class="[ clientStore.meta.clients_new_this_month == 0 ? 'text-gray-500' : 'text-green-500']">
          {{ clientStore.meta.clients_new_this_month > 0 ? clientStore.meta.clients_new_this_month  : 'Nenhum cliente cadastrado esse mês' }}
        </span>
        <span 
          v-if="clientStore.meta.clients_new_this_month > 0" 
          class="ml-1">
          novos clientes esse mês
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-blue-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#2B7FFF">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7.5 9A3.5 3.5 0 1 0 4 5.5 3.504 3.504 0 0 0 7.5 9zm0-6A2.5 2.5 0 1 1 5 5.5 2.503 2.503 0 0 1 7.5 3zm2.713 14a5.456 5.456 0 0 0-.188 1H2v-3.5A4.505 4.505 0 0 1 6.5 10h2a4.503 4.503 0 0 1 4.414 3.649 5.518 5.518 0 0 0-.936.632A3.495 3.495 0 0 0 8.5 11h-2A3.504 3.504 0 0 0 3 14.5V17zm6.287-4A3.5 3.5 0 1 0 13 9.5a3.504 3.504 0 0 0 3.5 3.5zm0-6A2.5 2.5 0 1 1 14 9.5 2.503 2.503 0 0 1 16.5 7zM22 18.5a4.505 4.505 0 0 0-4.5-4.5h-2a4.505 4.505 0 0 0-4.5 4.5V22h11zM21 21h-9v-2.5a3.504 3.504 0 0 1 3.5-3.5h2a3.504 3.504 0 0 1 3.5 3.5z">
              </path>
              <path fill="none" d="M0 0h24v24H0z"></path>
            </g>
          </svg>
        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Total de clientes ativos
      </template>
      <template v-slot:mainInfo>
        {{ clientStore.clients_active }}
      </template>

      <template 
      v-slot:subInfo>
        <span 
        v-if="clientStore.meta.percent_client_active_this_month_vs_last_month !== 0"
        :class="['font-semibold', clientStore.meta.percent_client_active_this_month_vs_last_month < 0 ? 'text-red-400' : 'text-green-500']">
          {{ clientStore.meta.percent_client_active_this_month_vs_last_month}}%
          <span class="text-gray-500">vs mês anterior</span>
        </span>

        <span
        v-else
        >Total</span>

      </template>
      <template v-slot:icon>
        <div class="icon bg-green-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 19.2857L15.8 21L20 17M4 21C4 17.134 7.13401 14 11 14C12.4872 14 13.8662 14.4638 15 15.2547M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
              stroke="#00C951" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>



        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Total de clientes vencidos
      </template>
      <template v-slot:mainInfo>
        {{ clientStore.clients_due }}
      </template>

      <template 
      v-slot:subInfo>
        <span 
        v-if="clientStore.meta.percent_client_due_this_month_vs_last_month !== 0"
        :class="['font-semibold', clientStore.meta.percent_client_due_this_month_vs_last_month < 0 ? 'text-red-400' : 'text-green-500']">
          {{ clientStore.meta.percent_client_due_this_month_vs_last_month}}%
          <span class="text-gray-500">vs mês anterior</span>
        </span>

        <span
        v-else
        >Total</span>

      </template>
      <template v-slot:icon>
        <div class="icon bg-red-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 7L19 10M19 10L22 7M19 10V4M16 21V19.8C16 18.1198 16 17.2798 15.673 16.638C15.3854 16.0735 14.9265 15.6146 14.362 15.327C13.7202 15 12.8802 15 11.2 15H6.8C5.11984 15 4.27976 15 3.63803 15.327C3.07354 15.6146 2.6146 16.0735 2.32698 16.638C2 17.2798 2 18.1198 2 19.8V21M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z"
              stroke="#C31314" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Total de clientes quitados
      </template>
      <template v-slot:mainInfo>
        {{ clientStore.clients_paid_off }}
      </template>

      <template 
      v-slot:subInfo>
        <span 
        v-if="clientStore.meta.percent_client_paid_off_this_month_vs_last_month !== 0"
        :class="['font-semibold', clientStore.meta.percent_client_paid_off_this_month_vs_last_month < 0 ? 'text-red-400' : 'text-green-500']">
          {{ clientStore.meta.percent_client_paid_off_this_month_vs_last_month}}%
          <span class="text-gray-500">vs mês anterior</span>
        </span>

        <span
        v-else
        >Total</span>

      </template>
      <template v-slot:icon>
        <div class="icon bg-orange-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e0700a">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 10.5l-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L18 14l1.47 2.977 3.285.478-2.377 2.318.56 3.272L18 21.5z">
                </path>
              </g>
            </g>
          </svg>



        </div>
      </template>
    </CardTop>
  </div>

  <div class="lg:col-span-3 xl:col-span-5 mt-3">
    <TableClients />
  </div>
</template>

<script setup>
import CardTop from '@/components/dashboard/CardTop.vue';
import TableClients from '@/components/dashboard/TableClients.vue';
import DefaultButton from '@/components/DefaultButton.vue';

import { useClientStore } from '@/stores/client';
import { onMounted } from 'vue';
const clientStore = useClientStore();

onMounted(() => {
  clientStore.getStatistics();
});
</script>