<template>
      <p class="text-gray-500 text-sm text-center mb-6 mt-2">Faça login para continuar</p>

      <form @submit.prevent="" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-1">Token</label>
          <input
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-800 mb-1">Nova senha</label>
          <input
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <DefaultButton
        buttonClass="bg-blue-600 hover:bg-blue-700"
        buttonSize="w-full"
        >
        Redefinir senha
        </DefaultButton>

      </form>
</template>

<script setup>
import DefaultButton from '@/components/DefaultButton.vue'

</script>