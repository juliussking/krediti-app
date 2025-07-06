<template>
  <div class="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Configurações do Sistema</h2>

      <!-- Seção: Empresa -->
      <section class="mb-8">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Dados da Empresa</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Nome Fantasia</label>
            <input v-model="form.companyName" type="text" class="input" placeholder="Ex: Krediti Financeira" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">CNPJ</label>
            <input v-model="form.cnpj" type="text" class="input" placeholder="00.000.000/0001-00" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Telefone</label>
            <input v-model="form.phone" type="text" class="input" placeholder="(11) 99999-0000" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
            <input v-model="form.email" type="email" class="input" placeholder="empresa@email.com" />
          </div>
        </div>
      </section>

      <!-- Seção: Preferências -->
      <section class="mb-8">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Preferências</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Taxa Padrão (%)</label>
            <input v-model="form.defaultRate" type="number" step="0.01" class="input" placeholder="Ex: 2.5" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Dias para Vencimento</label>
            <input v-model="form.defaultDueDays" type="number" class="input" placeholder="Ex: 30" />
          </div>
        </div>
      </section>

      <!-- Botão -->
      <div class="flex justify-end">
        <button
          @click="saveSettings"
          class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  companyName: 'Krediti Financeira',
  cnpj: '00.000.000/0001-00',
  phone: '(11) 99999-0000',
  email: 'contato@krediti.com',
  defaultRate: 2.5,
  defaultDueDays: 30,
})

const saveSettings = () => {
  // Aqui você pode fazer um POST via Axios para salvar no backend
}
</script>

