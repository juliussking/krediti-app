<template>

  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">
    <div class="bg-gray-100 flex flex-col justify-center items-center ">
      <div class="logo w-full max-w-md">
        <h2 class="text-5xl font-bold text-gray-800"> <span class="text-white bg-gradient-to-tl from-blue-300 to-blue-500 px-4 rounded rounded-xl">K</span> Krediti</h2>
        <div class="sub my-8">

          <h2 class="text-3xl font-bold text-gray-800">Bem-vindo de volta</h2>
          <p class="subtitle text-gray-500 text-md">Entre com suas credenciais para acessar o sistema</p>
        </div>
      </div>
      <div class="form w-full max-w-md">

      <FeedbackMessage :status="status" :feedbackMessage="feedbackMessage" />

        <form @submit.prevent="submit" class="space-y-4">
          <div>

            <LabelForm>Email</LabelForm>

            <BaseInput :error="!!errors.email" v-model="email" :type="'email'" :placeholder="'Digite seu email'" />

            <ErrorsForm :errors="errors" attr="email" />
          </div>

          <div>

            <LabelForm>Senha</LabelForm>

            <BaseInput :error="!!errors.password" v-model="password"
              @update:modelValue="$emit('update:password', $event)" :type="'password'"
              :placeholder="'Digite sua senha'" />

            <ErrorsForm :errors="errors" attr="password" />

          </div>
          <DefaultButton
            buttonClass="bg-gradient-to-tl from-blue-400 to-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            buttonSize="w-full h-10 p-2" type="submit" :disabled="isSubmitting">
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
    <div class="bg-gradient-to-tl from-blue-400 to-blue-500 flex-col justify-center items-center p-8 hidden lg:flex">
      <div class="slogan max-w-lg">
        <p class="text-white text-5xl font-bold mb-6">Gestão completa de crédito pessoal</p>
        <p class="text-white text-2xl mb-6">Gerencie clientes, empréstimos e pagamentos em um único lugar de forma simples e eficiente.</p>
        <div class="list">
          <ul class="space-y-2 list-disc pl-5">
            <li class="text-white text-lg">Dashboard com métricas em tempo real</li>
            <li class="text-white text-lg">Controle de empréstimos e pagamentos</li>
            <li class="text-white text-lg">Relatórios detalhados e exportação</li>
          </ul>
        </div>
      </div>
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
