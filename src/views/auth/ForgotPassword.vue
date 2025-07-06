<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-2">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        <Logo />
        <ForgotEmailForm />
        <!-- <ForgotTokenAndNewPasswordForm /> -->
        <!-- <ForgotAlertMessage /> -->
      
    </div>
  </div>
</template>

<script setup>
import ForgotAlertMessage from '@/components/auth/ForgotAlertMessage.vue';
import ForgotEmailForm from '@/components/auth/ForgotEmailForm.vue';
import ForgotTokenAndNewPasswordForm from '@/components/auth/ForgotTokenAndNewPasswordForm.vue';
import Logo from '@/components/layout/Logo.vue';

</script>
