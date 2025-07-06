<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 class="text-5xl font-bold text-center text-gray-800">Krediti</h2>

      <p class="text-gray-500 text-sm text-center mb-6 mt-2">Insira seu email para redefinir sua senha</p>

      <form @submit.prevent="" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-1">Email</label>
          <input
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="seu@email.com"
          />
        </div>
        <DefaultButton
        buttonClass="bg-blue-600 hover:bg-blue-700"
        buttonSize="w-full"
        >
        Enviar
        </DefaultButton>

      </form>
    </div>
  </div>
</template>

<script setup>
import DefaultButton from '@/components/DefaultButton.vue'

</script>
