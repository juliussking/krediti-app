<template>
  <div class="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Informações da empresa</h2>

      <!-- Seção: Empresa -->
      <section class="mb-8">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Dados da Empresa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Razão social</label>
            <input v-model="company.social_reason" type="text" class="input" placeholder="Ex: Krediti Financeira" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Nome Fantasia</label>
            <input v-model="company.fantasy_name" type="text" class="input" placeholder="Ex: Krediti Financeira" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">CNPJ</label>
            <input v-model="company.cnpj" type="text" class="input" placeholder="00.000.000/0001-00" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Telefone</label>
            <input v-model="company.phone" type="text" class="input" placeholder="(11) 99999-0000" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
            <input v-model="company.email" type="email" class="input" placeholder="empresa@email.com" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Taxa Padrão (%)</label>
            <p>1.31</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Data da assinatura</label>
            <p>{{ formatDate(companyStore.period_start) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Data do próximo vencimento</label>
            <p>{{ formatDate(companyStore.due_date) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Descrição do plano</label>
            <p>{{ companyStore.plan }}</p>
            
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Valor</label>
            <p>{{ formatCurrency(companyStore.price) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Admin</label>
            <p>{{ company.admin }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <p
              :class="[companyStore.status == 'active' ? 'text-green-500 bg-green-100 inline border rounded-xl px-2 py-1' : companyStore.status == 'trialing' ? 'text-yellow-500 bg-yellow-100 inline border rounded-xl px-2 py-1' : 'text-red-500 bg-red-100 inline border rounded-xl px-2 py-1', ]">
              {{ companyStore.status == 'active' ? 'Ativo' : companyStore.status == 'trialing' ? 'Período de teste' : 'Inativo'  }}</p>
          </div>
        </div>
      </section>

      <!-- Seção: Preferências -->
      <section class="mb-8">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Preferências</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        </div>
      </section>

      <!-- Botão -->
      <div class="flex justify-end">
        <button @click="saveSettings" class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Editar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCompanyStore } from '@/stores/company'
import { storeToRefs } from 'pinia'
import { formatCurrency, formatDate } from '@/utils/helpers'
const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)

const saveSettings = () => {
  // Aqui você pode fazer um POST via Axios para salvar no backend
}

onMounted(() => {
  companyStore.getInfo()
})
</script>
