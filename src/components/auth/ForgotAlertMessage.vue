<template>

      <AlertMessage/>

      <p class="mt-4 text-sm text-center text-gray-600">
        Ir para <RouterLink :to="{ name: 'register' }" class="text-blue-500 hover:underline font-semibold">Login</RouterLink>
      </p>

     
</template>

<script setup>
import AlertMessage from '@/components/AlertMessage.vue'
</script>
