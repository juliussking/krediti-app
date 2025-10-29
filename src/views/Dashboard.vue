<template>
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
    <select
      class="border border-gray-300 p-2 rounded-md w-full sm:w-40 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
    >
      <option value="2024">2024</option>
      <option value="2025">2025</option>
    </select>
  </div>

  <!-- Top Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <CardTop
      cardTitleColor="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
      cardLineColor="bg-gradient-to-r from-blue-300 to-blue-500"
    >
      <template v-slot:mainInfo>R$ 52.394,23</template>
      <template v-slot:subInfo>Receita total</template>
    </CardTop>

    <CardTop
      cardTitleColor="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
      cardLineColor="bg-gradient-to-r from-cyan-300 to-blue-500"
    >
      <template v-slot:mainInfo>R$ 20.394,55</template>
      <template v-slot:subInfo>Entrada total</template>
    </CardTop>

    <CardTop
      cardTitleColor="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600"
      cardLineColor="bg-gradient-to-r from-red-300 to-pink-500"
    >
      <template v-slot:mainInfo>R$ 20.394,55</template>
      <template v-slot:subInfo>Saída total</template>
    </CardTop>

    <CardTop
      cardTitleColor="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-600"
      cardLineColor="bg-gradient-to-r from-blue-200 to-indigo-500"
    >
      <template v-slot:mainInfo>443</template>
      <template v-slot:subInfo>Clientes ativos</template>
    </CardTop>
  </div>

  <!-- Charts & Tasks -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 gap-4 mt-4">
    <div class="chart bg-white lg:col-span-3 xl:col-span-3 rounded-lg shadow-md p-4 border border-gray-100">
      <BarChart />
    </div>

    <div class="chart bg-white lg:col-span-2 xl:col-span-3 rounded-lg shadow-md p-4 border border-gray-100">
      <DoughnutChart />
    </div>

    <div class="chart bg-white lg:col-span-2 xl:col-span-2 rounded-lg shadow-md p-4 border border-gray-100">
      <Tasks @openModalTask="newTaskModal.open" />
    </div>
  </div>

  <!-- Modal Nova Tarefa -->
  <BaseModal
    v-model="newTaskModal.isOpen.value"
    confirmText="Salvar"
    cancelText="Cancelar"
    buttonSize="w-28 p-2"
    :loading="isSubmitting"
    modalTitle="Nova Tarefa"
    buttonConfirmClass="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow"
    buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md shadow"
    @confirm="submit"
  >
    <form @submit.prevent="submit" class="space-y-4">
      <LabelForm>Nome da Tarefa</LabelForm>
      <BaseInput v-model="title" />
      <ErrorsForm :errors="errors" attr="title" />
    </form>
  </BaseModal>
</template>


<script setup>
import CardTop from '@/components/dashboard/CardTop.vue';
import BarChart from '@/components/charts/BarChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';
import Tasks from '@/components/Tasks.vue';
import LabelForm from '@/components/registerSteps/LabelForm.vue';
import BaseInput from '@/components/layout/BaseInput.vue';
import BaseModal from '@/components/layout/BaseModal.vue';

import { useModal } from '@/composables/useModal';
const newTaskModal = useModal()

import { useTaskStore } from '@/stores/tasks';

import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import ErrorsForm from '@/components/registerSteps/ErrorsForm.vue';
import { onUnmounted } from 'vue';

const schema = object({
  title: string().required().label('Título'),
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const { value: title } = useField('title')

const submit = handleSubmit((values) => {
const taskStore = useTaskStore();

  return taskStore.createTask(values)
  .then(() => {
    newTaskModal.close()
    title.value = ''
  })  
 
})


</script>
