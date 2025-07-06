<template>
<div class="flex justify-between items-center mb-3">

     <h1 class="text-xl text-gray-800 font-semibold">Dashboard</h1>     
     <select class="border border-gray-300 p-1 rounded w-[150px] text-gray-800 bg-white"
     >
       <option value="2024">2024</option>
       <option value="2025">2025</option>

     </select>
    </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

    <CardTop cardTitleColor="text-transparent bg-clip-text bg-green-500 bg-gradient-to-r to-blue-600"
      cardLineColor="bg-green-400 bg-gradient-to-r to-blue-600">
      <template v-slot:mainInfo>
        R$
        52.394,23
      </template>

      <template v-slot:subInfo>
        Receita total
      </template>
    </CardTop>

    <CardTop cardTitleColor="text-transparent bg-clip-text bg-indigo-500 bg-gradient-to-r to-purple-600"
      cardLineColor="bg-indigo-400 bg-gradient-to-r to-purple-600">
      <template v-slot:mainInfo>
        R$
        20.394,55
      </template>

      <template v-slot:subInfo>
        Entrada total
      </template>
    </CardTop>

    <CardTop cardTitleColor="text-transparent bg-clip-text bg-orange-500 bg-gradient-to-r to-red-600"
      cardLineColor="bg-orange-400 bg-gradient-to-r to-red-600">
      <template v-slot:mainInfo>
        R$
        20.394,55
      </template>

      <template v-slot:subInfo>
        Saída total
      </template>
    </CardTop>

    <CardTop cardTitleColor="text-transparent bg-clip-text bg-sky-500 bg-gradient-to-r to-indigo-600"
      cardLineColor="bg-sky-400 bg-gradient-to-r to-indigo-600">
      <template v-slot:mainInfo>
        443
      </template>

      <template v-slot:subInfo>
        Clientes ativos
      </template>
    </CardTop>
  </div>

  <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 gap-3 mt-3 ">

    <div class="chart bg-white lg:col-span-3 xl:col-span-3 border border-gray-200">
      <BarChart />
    </div>

    <div class="chart bg-white lg:col-span-2 xl:col-span-3 border border-gray-200 ">
      <DoughnutChart />
    </div>
    <div class="chart bg-white lg:col-span-2 xl:col-span-2 border border-gray-200">
      <Tasks 
      @openModalTask="newTaskModal.open"
      />
    </div>

  </div>
  
  <BaseModal 
  v-model="newTaskModal.isOpen.value"
  confirmText="Salvar"
  cancelText="Cancelar"
  buttonSize="w-25 p-1"
  :loading="isSubmitting"
  modalTitle="Nova Tarefa"
  buttonConfirmClass="bg-blue-500 hover:bg-blue-600 text-white"
  buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800"
  @confirm="submit"
  >

  <form @submit.prevent="submit" class="space-y-4">
  <LabelForm>Nome da Tarefa</LabelForm>
  <BaseInput 
  v-model="title" />
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
