<template>
  <div class="bg-white shadow rounded overflow-x-auto">

    <div class="p-4 border-b border-gray-200 flex justify-between">
      <h2 class="text-lg font-semibold text-gray-800">Solicitações</h2>

      <div class=" flex gap-3">
        <label for=""></label>
        <input type="text" class="border border-gray-400 rounded focus:outline-none focus:border-blue-500">
        <input type="date"
          class="border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 focus:text-gray-700">
        <input type="date"
          class="border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-gray-400 focus:text-gray-700">

        <p
          class="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100  cursor-pointer mr-3">
          Nova solicitação</p>
      </div>
    </div>
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50 text-gray-600 uppercase text-xs text-left">
        <tr>
          <th class="px-6 py-3">Feita por</th>
          <th class="px-6 py-3">Valor solicitado</th>
          <th class="px-6 py-3">Contra-oferta</th>
          <th class="px-6 py-3">Valor aprovado</th>
          <th class="px-6 py-3">Taxa</th>
          <th class="px-6 py-3">Total</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Criada em</th>
          <th class="px-6 py-3 text-center">Ação</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="solicitation in solicitationStore.solicitations" :key="solicitation.id" class="hover:bg-gray-50">

          <td class="px-6 py-4 whitespace-nowrap">

            {{ solicitation.user_name }}

          </td>

          <td class="px-6 py-4 font-semibold">

            {{ formatCurrency(solicitation.amount_requested) }}

          </td>

          <td class="px-6 py-4 font-semibold">

            {{ formatCurrency(solicitation.counteroffer) }}

          </td>

          <td class="px-6 py-4 font-semibold">

            {{ formatCurrency(solicitation.amount_approved) }}

          </td>

          <td class="px-6 py-4">

            {{ solicitation.tax }}

          </td>

          <td class="px-6 py-4 font-semibold">

            {{ formatCurrency(solicitation.total) }}

          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="{
              'text-green-900 bg-green-300 px-2 py-1 rounded-full': solicitation.status === 'Aprovada',
              'text-red-900 bg-red-300 px-2 py-1 rounded-full': solicitation.status === 'Recusada',
              'text-gray-700 bg-gray-200 px-2 py-1 rounded-full': solicitation.status === 'Pendente',
              'text-orange-900 bg-orange-300 px-2 py-1 rounded-full': solicitation.status === 'Contra-oferta'
            }">

              {{ solicitation.status }}

            </span>
          </td>
          <td class="px-6 py-4 font-semibold">

            {{ formatDate(solicitation.solicitation_date) }}

          </td>
          <td class="px-6 py-4 relative">

            <DropSolicitationTable :solicitation="solicitation" @deleteSolicitation="deleteSolicitation"
              @approveSolicitation="approveSolicitation" @counterofferSolicitation="counterofferSolicitation" @recuseSolicitation="recuseSolicitation" />

          </td>
        </tr>
      </tbody>
    </table>

    <BaseModal v-model="deleteSolicitationModal.isOpen.value" modalTitle="Excluir solicitação?"
      @confirm="confirmDeleteSolicitation(solicitationSelected.id)"
      buttonConfirmClass="bg-red-600 hover:bg-red-700 text-white"
      buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800" buttonSize="w-25 px-2 py-1" cancelText="Cancelar"
      confirmText="Sim, excluir" :loading="deleteSolicitationModal.loading.value">
      <h2>Deseja realmente excluir a solicitação no valor de
        <span class="font-semibold">

          {{ formatCurrency(solicitationSelected.counteroffer ?? solicitationSelected.amount_requested) }}

        </span> de
        <span class="font-semibold">{{ solicitationSelected.user_name }}</span>?
      </h2>
    </BaseModal>

    <BaseModal v-model="approveSolicitationModal.isOpen.value" modalTitle="Aprovar solicitação?"
      @confirm="confirmApproveSolicitation(solicitationSelected.id, solicitationSelected.counteroffer ?? solicitationSelected.amount_requested)"
      buttonConfirmClass="bg-blue-600 hover:bg-blue-700 text-white"
      buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800" buttonSize="w-30 px-2 py-1" cancelText="Cancelar"
      confirmText="Sim, aprovar" :loading="approveSolicitationModal.loading.value">

      Tem certeza que deseja aprovar a solicitação no valor de

      <span class="font-semibold">

        {{ formatCurrency(solicitationSelected.counteroffer ?? solicitationSelected.amount_requested) }}

      </span>
      para
      <span class="font-semibold">

        {{ solicitationSelected.user_name }}
        ?

      </span>
    </BaseModal>

    <BaseModal v-model="recuseSolicitationModal.isOpen.value" 
    modalTitle="Recusar solicitação?"
    @confirm="confirmRecuseSolicitation(solicitationSelected.id)"
    buttonConfirmClass="bg-red-600 hover:bg-red-700 text-white"
    buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800"
    buttonSize="w-30 px-2 py-1" 
    cancelText="Cancelar"
    confirmText="Sim, recusar" 
    :loading="recuseSolicitationModal.loading.value">
      <h2>Deseja realmente recusar a solicitação no valor de
        <span class="font-semibold">

          {{ formatCurrency(solicitationSelected.counteroffer ?? solicitationSelected.amount_requested) }}

        </span> de
        <span class="font-semibold">{{ solicitationSelected.user_name }}</span>?
      </h2>
    </BaseModal>

    <BaseModal v-model="counterofferSolicitationModal.isOpen.value" modalTitle="Contra-oferta" @confirm="submit"
      buttonCancelClass="bg-gray-200 hover:bg-gray-300 text-gray-800"
      buttonConfirmClass="bg-blue-600 hover:bg-blue-700 text-white" buttonSize="w-30 px-2 py-1" cancelText="Cancelar"
      confirmText="Enviar" :loading="isSubmitting">

      <p class="mb-3">

        {{ solicitationSelected.user_name }} fez uma solicitação de
        <span class="font-semibold mb-5">

          {{ formatCurrency(solicitationSelected.counteroffer ?? solicitationSelected.amount_requested) }}

        </span>.
      </p>

      <form @submit.prevent="submit">
        <div class="flex gap-3 w-full">
          <div class="counteroff">

            <LabelForm>Valor da contra-oferta</LabelForm>
            <BaseInput v-model="counteroffer" type="number" label="Contra-oferta" />
            <ErrorsForm :errors="errors" attr="counteroffer" />
          </div>
          <div class="tax">

            <LabelForm>Tax</LabelForm>
            <BaseSelect v-model="tax" label="Taxa" :options="['1.19', '1.23', '1.25', '1.28', '1.31']" />
            <ErrorsForm :errors="errors" attr="tax" />
          </div>
        </div>
      </form>
    </BaseModal>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { useSolicitationStore } from '@/stores/solicitation';
import BaseModal from './layout/BaseModal.vue';
const solicitationStore = useSolicitationStore();

import DropSolicitationTable from './dashboard/DropSolicitationTable.vue';

import { useModal } from '@/composables/useModal';
import BaseInput from './layout/BaseInput.vue';
import LabelForm from './registerSteps/LabelForm.vue';
const deleteSolicitationModal = useModal();
const approveSolicitationModal = useModal();
const counterofferSolicitationModal = useModal();
const recuseSolicitationModal = useModal();

const solicitationSelected = ref({});

import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import BaseSelect from './layout/BaseSelect.vue';
import ErrorsForm from './registerSteps/ErrorsForm.vue';

import { formatCurrency, formatDate } from '@/utils/helpers';


const schema = object({
  counteroffer: string().required().label('Contra-oferta'),
  tax: string().required().label('Taxa'),

})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const submit = handleSubmit((values) => {
  const selectedId = solicitationSelected.value.id

  return solicitationStore.counterofferSolicitation(values, selectedId)
    .then(() => {

      counterofferSolicitationModal.close();

    })
})

const { value: counteroffer } = useField('counteroffer');
const { value: tax } = useField('tax');

function deleteSolicitation(solicitation) {

  solicitationSelected.value = solicitation;
  deleteSolicitationModal.open();

}

function confirmDeleteSolicitation(id) {

  deleteSolicitationModal.loading.value = true

  return solicitationStore.deleteSolicitation(id)
    .then(() => {

      deleteSolicitationModal.loading.value = false

      deleteSolicitationModal.close();

    });

}

function approveSolicitation(solicitation) {

  solicitationSelected.value = solicitation;
  approveSolicitationModal.open();

}



function confirmApproveSolicitation(id, amount) {

  approveSolicitationModal.loading.value = true

  return solicitationStore.approveSolicitation(id, amount)
    .then(() => {

      approveSolicitationModal.loading.value = false

      approveSolicitationModal.close();

    });

}

function recuseSolicitation(solicitation) {

  solicitationSelected.value = solicitation;
  recuseSolicitationModal.open();

}

function confirmRecuseSolicitation(id) {

  recuseSolicitationModal.loading.value = true
  
  return solicitationStore.recuseSolicitation(id)
    .then(() => {

      solicitationSelected.value.status = 'Recusada'

      recuseSolicitationModal.loading.value = false

      recuseSolicitationModal.close();

    });

}



function counterofferSolicitation(solicitation) {

  solicitationSelected.value = solicitation;
  counterofferSolicitationModal.open();

}

onMounted(() => {
  solicitationStore.getSolicitations();
});

</script>
