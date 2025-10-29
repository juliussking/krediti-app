<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <!-- Lado esquerdo (formulário) -->
    <div class="bg-gray-100 flex flex-col justify-center items-center px-6 py-10 sm:px-10">
      <div class="w-full max-w-md text-center lg:text-left">
        <!-- Logo -->
        <Logo />

        <!-- Título -->
        <div class="mt-6 mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">
            Bem-vindo de volta
          </h2>
          <p class="text-gray-500 text-sm sm:text-base">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>
      </div>

      <!-- Formulário -->
      <div class="w-full max-w-md">
        <FeedbackMessage
          :status="status"
          :feedbackMessage="feedbackMessage"
          class="mb-4"
        />

        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <LabelForm>Email</LabelForm>
            <BaseInput
              :error="!!errors.email"
              v-model="email"
              type="email"
              placeholder="Digite seu email"
            />
            <ErrorsForm :errors="errors" attr="email" />
          </div>

          <div>
            <LabelForm>Senha</LabelForm>
            <BaseInput
              :error="!!errors.password"
              v-model="password"
              type="password"
              placeholder="Digite sua senha"
            />
            <ErrorsForm :errors="errors" attr="password" />
          </div>

          <DefaultButton
            buttonClass="bg-gradient-to-tl from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
            buttonSize="w-full h-12 p-3"
            type="submit"
            :disabled="isSubmitting"
          >
            <div class="flex justify-center items-center gap-2">
              <span v-if="isSubmitting"><Loading /></span>
              <span v-else>Entrar</span>
            </div>
          </DefaultButton>
        </form>

        <!-- Link para cadastro -->
        <p class="mt-6 text-sm text-center text-gray-600">
          Ainda não tem uma conta?
          <RouterLink
            :to="{ name: 'register' }"
            class="text-blue-500 hover:underline"
          >
            Cadastre sua empresa
          </RouterLink>
        </p>
      </div>
    </div>

    <div
      class="hidden lg:flex bg-gradient-to-tl from-blue-400 to-blue-500 justify-center items-center p-8"
    >
      <InfoSection />
    </div>
  </div>
</template>


<script setup>
import DefaultButton from '@/components/DefaultButton.vue'
import { useAuthStore } from '@/stores/auth/auth'
const authStore = useAuthStore()

import router from '@/router'
import Loading from '@/components/layout/Loading.vue'

import BaseInput from '@/components/layout/BaseInput.vue'
import ErrorsForm from '@/components/registerSteps/ErrorsForm.vue'
import LabelForm from '@/components/registerSteps/LabelForm.vue'
import { ref } from 'vue'

import FeedbackMessage from '@/components/FeedbackMessage.vue'

const feedbackMessage = ref('')
const status = ref('')

import { useForm, useField } from 'vee-validate'
import { object, string } from 'yup'
import InfoSection from '@/components/layout/InfoSection.vue'
import Logo from '@/components/layout/Logo.vue'
const schema = object({
  email: string().required().email().label('Email'),
  password: string().required().label('Senha')
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const submit = handleSubmit((values) => {

  feedbackMessage.value = ''
  status.value = ''

  return authStore.login(values.email, values.password)
    .then(() => {

      router.push({ name: 'dashboard' })
    })
    .catch((error) => {

      status.value = 'error'
      feedbackMessage.value = error.message

    })
})





</script>
