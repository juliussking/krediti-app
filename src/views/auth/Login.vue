<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 class="text-5xl font-bold text-center text-gray-800">Krediti</h2>

      <p class="text-gray-500 text-sm text-center mb-6 mt-2">Faça login para continuar</p>

      <FeedbackMessage :status="status" :feedbackMessage="feedbackMessage" />

      <form @submit.prevent="submit" class="space-y-4">
        <div>

          <LabelForm>Email</LabelForm>

          <BaseInput :error="!!errors.email" v-model="email" :type="'email'" :placeholder="'Digite seu email'" />

          <ErrorsForm :errors="errors" attr="email" />
        </div>

        <div>

          <LabelForm>Senha</LabelForm>

          <BaseInput :error="!!errors.password" v-model="password" @update:modelValue="$emit('update:password', $event)"
            :type="'password'" :placeholder="'Digite sua senha'" />

          <ErrorsForm :errors="errors" attr="password" />

        </div>
        <DefaultButton
          buttonClass="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          buttonSize="w-full p-2" type="submit" :disabled="isSubmitting">
          <div class="flex justify-center items-center">
            <span v-if="isSubmitting">
              <Loading />
            </span>
            <span v-else>
              Entrar
            </span>
          </div>
        </DefaultButton>

      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        Ainda não tem uma conta? <RouterLink :to="{ name: 'register' }" class="text-blue-500 hover:underline">
          Cadastre sua empresa</RouterLink>
      </p>
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
