<template>
  <!-- Cabeçalho -->
  <div class="flex justify-between items-center mb-3 py-5">
    <div class="title">
      <h1 class="text-3xl text-gray-800 font-bold">Solicitações</h1>
      <p class="text-gray-500">Gerencie as solicitações de seus clientes</p>
    </div>

    <div class="button flex items-center gap-3">
      <DefaultButton
        buttonClass="bg-gradient-to-tl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        buttonSize="h-9 px-5" type="button">
        Nova solicitação
      </DefaultButton>
    </div>
  </div>

  <!-- Cards de estatísticas -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
    <CardTop>
      <template v-slot:cardTitle>
        Total de solicitações
      </template>
      <template v-slot:mainInfo>
        {{ solicitationStore.meta.solicitations_total }}
      </template>
      <template v-slot:subInfo>
        <span :class="[solicitationStore.meta.solicitations_total > 0 ? 'text-green-500' : 'text-gray-500']">
          {{ solicitationStore.meta.solicitations_total > 0 ? 'Ativas no sistema' : 'Nenhuma registrada' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-blue-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#2B7FFF" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
          </svg>
        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Aprovadas
      </template>
      <template v-slot:mainInfo>
        {{ solicitationStore.meta.solicitations_approved }}
      </template>
      <template v-slot:subInfo>
        <span :class="[solicitationStore.meta.solicitations_approved > 0 ? 'text-green-500' : 'text-gray-500']">
          {{ solicitationStore.meta.solicitations_approved > 0 ? 'Aprovadas com sucesso' : 'Nenhuma aprovada' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-green-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#00C951" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.2l-3.5-3.5L4 14.2l5 5L20 8.2l-1.5-1.4z" />
          </svg>
        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Reprovadas
      </template>
      <template v-slot:mainInfo>
        {{ solicitationStore.meta.solicitations_reproved }}
      </template>
      <template v-slot:subInfo>
        <span :class="[solicitationStore.meta.solicitations_reproved > 0 ? 'text-red-500' : 'text-gray-500']">
          {{ solicitationStore.meta.solicitations_reproved > 0 ? 'Reprovadas recentemente' : 'Nenhuma reprovada' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-red-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#C31314" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM7 9l10 10M17 9L7 19" />
          </svg>
        </div>
      </template>
    </CardTop>

    <CardTop>
      <template v-slot:cardTitle>
        Pendentes
      </template>
      <template v-slot:mainInfo>
        {{ solicitationStore.meta.solicitations_pending }}
      </template>
      <template v-slot:subInfo>
        <span :class="[solicitationStore.meta.solicitations_pending > 0 ? 'text-orange-500' : 'text-gray-500']">
          {{ solicitationStore.meta.solicitations_pending > 0 ? 'Aguardando análise' : 'Nenhuma pendente' }}
        </span>
      </template>
      <template v-slot:icon>
        <div class="icon bg-orange-100 p-2 rounded-lg">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#E0700A" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v5l3 3m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </template>
    </CardTop>
  </div>

  <!-- Tabela -->
  <div class="lg:col-span-3 xl:col-span-5 mt-3">
    <TableSolicitations />
  </div>
</template>

<script setup>
import CardTop from '@/components/dashboard/CardTop.vue';
import TableSolicitations from '@/components/TableSolicitations.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import { useSolicitationStore } from '@/stores/solicitation';
import { ref } from 'vue';

const solicitationStore = useSolicitationStore();
const selectedYear = ref('2025');
</script>

<style scoped>
.icon svg {
  width: 28px;
  height: 28px;
}
</style>
