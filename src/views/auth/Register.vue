<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <!-- Lado esquerdo (formulário) -->
    <div class="bg-gray-100 flex flex-col justify-center items-center px-6 py-8 sm:px-10">
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Logo />
          <div class="my-6">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Cadastro</h2>
            <p class="text-gray-500 text-sm sm:text-base">
              Insira seus dados para se cadastrar
            </p>
          </div>
        </div>

        <div v-if="feedbackMessage" class="mt-4">
          <FeedbackMessage :status="status" :feedbackMessage="feedbackMessage" />
        </div>

        <template v-if="status !== 'success'">
          <form @submit.prevent="submit" class="space-y-6 mt-6">
            <!-- Dados da empresa -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                Dados da empresa
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <LabelForm>Nome Fantasia</LabelForm>
                  <BaseInput
                    :error="!!errors.fantasy_name"
                    v-model="fantasy_name"
                    @update:modelValue="$emit('update:fantasy_name', $event)"
                    type="text"
                    placeholder="Ex: Krediti Financeira"
                  />
                  <ErrorsForm :errors="errors" attr="fantasy_name" />
                </div>

                <div>
                  <LabelForm>Razão Social</LabelForm>
                  <BaseInput
                    :error="!!errors.social_reason"
                    v-model="social_reason"
                    @update:modelValue="$emit('update:social_reason', $event)"
                    type="text"
                    placeholder="Ex: Krediti Financeira"
                  />
                  <ErrorsForm :errors="errors" attr="social_reason" />
                </div>

                <div>
                  <LabelForm>CNPJ</LabelForm>
                  <BaseInput
                    :error="!!errors.cnpj"
                    v-model="cnpj"
                    @update:modelValue="$emit('update:cnpj', $event)"
                    type="text"
                    placeholder="00.000.000/0001-00"
                  />
                  <ErrorsForm :errors="errors" attr="cnpj" />
                </div>

                <div>
                  <LabelForm>Telefone</LabelForm>
                  <BaseInput
                    :error="!!errors.company_phone"
                    v-model="company_phone"
                    @update:modelValue="$emit('update:company_phone', $event)"
                    type="text"
                    placeholder="(11) 99999-0000"
                  />
                  <ErrorsForm :errors="errors" attr="company_phone" />
                </div>

                <div class="sm:col-span-2">
                  <LabelForm>Email</LabelForm>
                  <BaseInput
                    :error="!!errors.company_email"
                    v-model="company_email"
                    @update:modelValue="$emit('update:company_email', $event)"
                    type="email"
                    placeholder="empresa@gmail.com"
                  />
                  <ErrorsForm :errors="errors" attr="company_email" />
                </div>
              </div>
            </div>

            <!-- Dados do administrador -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                Dados do administrador
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <LabelForm>Nome completo</LabelForm>
                  <BaseInput
                    :error="!!errors.admin_name"
                    v-model="admin_name"
                    @update:modelValue="$emit('update:admin_name', $event)"
                    type="text"
                    placeholder="Ex: João da Silva"
                  />
                  <ErrorsForm :errors="errors" attr="admin_name" />
                </div>

                <div>
                  <LabelForm>Telefone</LabelForm>
                  <BaseInput
                    :error="!!errors.admin_phone"
                    v-model="admin_phone"
                    @update:modelValue="$emit('update:admin_phone', $event)"
                    type="text"
                    placeholder="(11) 99999-0000"
                  />
                  <ErrorsForm :errors="errors" attr="admin_phone" />
                </div>

                <div>
                  <LabelForm>E-mail</LabelForm>
                  <BaseInput
                    :error="!!errors.admin_email"
                    v-model="admin_email"
                    @update:modelValue="$emit('update:admin_email', $event)"
                    type="email"
                    placeholder="admin@email.com"
                  />
                  <ErrorsForm :errors="errors" attr="admin_email" />
                </div>

                <div>
                  <LabelForm>Data de nascimento</LabelForm>
                  <BaseInput
                    :error="!!errors.admin_birthday"
                    v-model="admin_birthday"
                    @update:modelValue="$emit('update:admin_birthday', $event)"
                    type="date"
                  />
                  <ErrorsForm :errors="errors" attr="admin_birthday" />
                </div>

                <div class="sm:col-span-2">
                  <LabelForm>Senha</LabelForm>
                  <BaseInput
                    :error="!!errors.password"
                    v-model="password"
                    @update:modelValue="$emit('update:password', $event)"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                  <ErrorsForm :errors="errors" attr="password" />
                </div>
              </div>
            </div>

            <DefaultButton
              buttonClass="bg-gradient-to-tl from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              buttonSize="w-full h-12 p-3"
              type="submit"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Cadastrar
            </DefaultButton>

            <p class="mt-4 text-sm text-center text-gray-600">
              Já tem conta?
              <RouterLink
                :to="{ name: 'login' }"
                class="text-blue-500 hover:underline"
              >
                Faça login
              </RouterLink>
            </p>
          </form>
        </template>
      </div>
    </div>

    <!-- Lado direito (informações) -->
    <div
      class="hidden lg:flex bg-gradient-to-tl from-blue-400 to-blue-500 justify-center items-center p-8"
    >
      <InfoSection />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import DefaultButton from '@/components/DefaultButton.vue'
import BaseInput from '@/components/layout/BaseInput.vue';
import ErrorsForm from '@/components/registerSteps/ErrorsForm.vue';
import LabelForm from '@/components/registerSteps/LabelForm.vue';

import { useRouter } from 'vue-router';
const router = useRouter()


import { useAuthStore } from '@/stores/auth/auth';
const authStore = useAuthStore()

import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import FeedbackMessage from '@/components/FeedbackMessage.vue';
import Logo from '@/components/layout/Logo.vue';
import InfoSection from '@/components/layout/InfoSection.vue';

const schema = object({

  fantasy_name: string().required().label('Nome da empresa'),
  social_reason: string().required().label('Razão social'),
  cnpj: string().required().label('CNPJ'),
  company_phone: string().required().label('Telefone'),
  company_email: string().required().email().label('E-mail'),
  admin_name: string().required().label('Nome completo'),
  admin_email: string().required().email().label('E-mail'),
  admin_birthday: string().required().label('Data de nascimento'),
  admin_phone: string().required().label('Telefone'),
  password: string().required().label('Senha'),
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    fantasy_name: 'Krediti Financeira',
    social_reason: 'KRE FINANCEIRA LTDA',
    cnpj: '00.000.000/0001-00',
    company_phone: '21 99999-0000',
    company_email: 'krediti@krediti.com',
    admin_name: 'Alberto Torrez',
    admin_email: 'alberto@krediti.com',
    birthday: '2000-01-01',
    admin_phone: '21 99999-0000',
    password: 'password',
  }
})


const { value: fantasy_name } = useField('fantasy_name');
const { value: social_reason } = useField('social_reason');
const { value: cnpj } = useField('cnpj');
const { value: company_phone } = useField('company_phone');
const { value: company_email } = useField('company_email');
const { value: admin_name } = useField('admin_name');
const { value: admin_email } = useField('admin_email');
const { value: admin_birthday } = useField('admin_birthday');
const { value: admin_phone } = useField('admin_phone');
const { value: password } = useField('password');

const feedbackMessage = ref('')
const status = ref('')

const submit = handleSubmit((values) => {

  feedbackMessage.value = ''

  return authStore.registerCompany(values)
    .then(() => {
      status.value = 'success'
      feedbackMessage.value = 'Empresa cadastrada com sucesso! Verifique seu e-mail para confirmar o cadastro.'
    })
    .catch((error) => {
      status.value = 'error'
      feedbackMessage.value = error.message
    })

})


</script>
