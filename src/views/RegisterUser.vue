<template>
  <div class="min-h-screen bg-gray-100 pt-6 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white rounded border border-gray-200 p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Cadastro de usuários</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <section class="mb-2">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-600 mb-1">Nome</label>
              <input type="text" :class="[
                'border p-2 rounded w-full focus:outline-none',
                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              ]" v-model="name" />
              <span>
                <p class="text-red-500 text-xs mt-1" v-if="errors.name">{{ errors.name }}</p>
              </span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Função</label>
              <select :class="[
                'border p-2 rounded w-full focus:outline-none',
                errors.role ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              ]" v-model="role">
                <option :value="role.name" v-for="role in roles" :key="role.id">{{ role.name }}</option>
              </select>
              <span>
                <p class="text-red-500 text-xs mt-1" v-if="errors.role">{{ errors.role }}</p>
              </span>
            </div>

            <div class="md:col-span-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
              <input type="text" :class="[
                'border p-2 rounded w-full focus:outline-none',
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              ]"
               v-model="email" />
              <span>
                <p class="text-red-500 text-xs mt-1" v-if="errors.email">{{ errors.email }}</p>
              </span>
            </div>



            <div class="md:col-span-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">Senha</label>
              <input type="password" 
              :class="[
                'border p-2 rounded w-full focus:outline-none',
                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              ]" 
              v-model="password" />

              <span>
                <p class="text-red-500 text-xs mt-1" v-if="errors.password">{{ errors.password }}</p>
              </span>
            </div>
          </div>
          <div class="button mt-10 flex justify-end">
            <DefaultButton
              buttonClass="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              buttonSize="w-full md:w-25 p-2" type="submit" :disabled="isSubmitting">
              <div class="flex justify-center items-center">
                <span v-if="isSubmitting">
                  <Loading />
                </span>
                <span v-else>
                  Cadastrar
                </span>
              </div>
            </DefaultButton>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';

import DefaultButton from '@/components/DefaultButton.vue';
import Loading from '@/components/layout/Loading.vue';

import { useRoleStore } from '@/stores/role';
const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore);

import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';

const schema = object({
  name: string().required().label('Nome'),
  email: string().required().email().label('E-mail'),
  password: string().required().label('Senha'),
  role: string().required().label('Função')
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const submit = handleSubmit((values) => {
  //SUBMIT
})

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: role } = useField('role')
const { value: password } = useField('password')



</script>
