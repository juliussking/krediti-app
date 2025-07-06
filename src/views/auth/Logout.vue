<template>
<main class="w-full h-screen bg-gray-100">

</main>
</template>

<script setup>
import Logo from '@/components/layout/Logo.vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useRouter } from 'vue-router';
const router = useRouter()
const authStore = useAuthStore()

authStore.logout()
.then(() => {
  router.push({ name: 'login' })
})

</script>