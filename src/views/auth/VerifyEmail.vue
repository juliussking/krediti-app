<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 class="text-5xl font-bold text-center text-gray-800">Krediti</h2>

      <p class="text-gray-500 text-sm text-center mb-6 mt-2">Verificação de email</p>

      <div v-if="loading" class="w-full bg-gray-100 px-4 py-3 rounded mb-5">

        <Loading />

      </div>

      <div 
      v-else 
      v-if="feedbackMessage"
        :class="[status == 'error' ? 'w-full bg-red-500 border border-red-500 px-4 py-3 rounded mb-5' : 'w-full bg-green-600 border border-green-500 px-4 py-3 rounded mb-5']">
        <h3 :class="[status == 'error' ? 'text-white text-center' : 'text-white text-center']">{{ feedbackMessage }}
          <span class="material-symbols-outlined">
            {{ status == 'error' ? 'error' : 'check' }}
          </span>
        </h3>

      </div>
      <div 
      v-if="!loading"
      class="text-center">
        <p class="mt-4 text-sm text-center text-gray-600">Ir para <RouterLink :to="{ name: 'login' }" class="text-blue-500 hover:underline">Login
          </RouterLink>
        </p>
      </div>


    </div>
  </div>
</template>

<script setup>
import Loading from '@/components/layout/Loading.vue';
import { ref } from 'vue';



import { useRoute } from 'vue-router';
const route = useRoute();

import { useAuthStore } from '@/stores/auth/auth';
const authStore = useAuthStore()

const token = route.query.token
const loading = ref(true)
const feedbackMessage = ref('')
const status = ref('')


authStore.verifyEmail(token)
  .then(() => {
    feedbackMessage.value = 'Email verificado com sucesso!'
    status.value = 'success'
  })
  .catch((error) => {
    feedbackMessage.value = error.message
    status.value = 'error'
  })
  .finally(() => {
    loading.value = false
  });


</script>
