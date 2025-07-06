<template>
  <div class="errorMessage max-w-3xl mx-auto" v-if="feedbackMessage">

    <ErrorFeedbackMessage :feedbackMessage="feedbackMessage" />

  </div>
  <div v-else class="h-full bg-gray-100 flex justify-center items-start pt-6">
    <div class="w-full max-w-5xl bg-white rounded border border-gray-200 p-3">

      <div class="flex flex-col items-center md:items-start gap-6">
        <!-- Avatar -->
        <div class="flex-shrink-0 w-full flex justify-center">
          <img :class="['w-32 h-32 rounded-full object-cover border-4 shadow',
            {
              'border-green-500': clientProfile.status === 'Ativo',
              'border-orange-500': clientProfile.status === 'Quitado',
              'border-red-500': clientProfile.status === 'Vencido',
            }]" :src="clientProfile.profile?.avatar ?? '/assets/img/default/default-avatar.jpg'" alt="Avatar" />
        </div>

        <!-- Info -->
        <div class="flex flex-col w-full">

          <div class="header flex items-center justify-between">

            <input
                type="text" 
                :class="[
                !clientProfile.name ? 'text-red-500 font-normal italic' : 'text-gray-800 text-3xl font-semibold mb-4',
                editPersonal ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" 
                v-model="clientProfile.name" 
                :value="clientProfile.name ?? 'Nao cadastrado'"
                :readonly="!editPersonal">

            <div class="actions flex gap-2">
              <p v-if="!editPersonal" @click="editPersonalInfo"
                class="text-sm text-blue-600 cursor-pointer bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Editar</p>
              <p v-if="editPersonal" @click="cancelEditPersonalInfo"
                class="text-sm text-red-600 cursor-pointer bg-red-50 px-2 py-1 rounded hover:bg-red-100">Cancelar</p>
              <p v-if="editPersonal"
                class="text-sm text-green-600 cursor-pointer bg-green-50 px-2 py-1 rounded hover:bg-green-100">Salvar
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>

              <p class="font-semibold">Email:
                <input 
                
                type="text" 
                :class="[
                  !clientProfile.email ? 'text-red-500 font-normal italic' : 'text-gray-800 w-70',
                  editPersonal ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]"
                 v-model="clientProfile.email" :value="clientProfile.email ?? 'Nao cadastrado'"
                  :readonly="!editPersonal">

              </p>

            </div>
            <div>
              <p class="font-semibold">Telefone:
                <input 
                v-if="editPersonal"
                type="text" :class="[
                  !clientProfile.phone ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editPersonal" v-model="clientProfile.phone" :value="formatPhone(clientProfile.phone) ?? 'Nao cadastrado'">
                <span v-else>
                  
                  {{ formatPhone(clientProfile.phone) ?? 'Nao cadastrado' }}

                </span>

              </p>
            </div>
            <div>
              <p class="font-semibold">Nascido em:
                <input type="date" :class="[
                  !clientProfile.birth_date ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editPersonal ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editPersonal" v-model="clientProfile.birth_date" :value="clientProfile.birth_date ?? 'Nao cadastrado'">

              </p>
            </div>
            <div>
              <p class="font-semibold">Cliente desde:
                <span :class="[!clientProfile.register_date ? 'text-red-500 font-normal italic' : 'text-gray-800']">{{
                  formatDate(clientProfile.register_date) || 'Não cadastrado' }}
                </span>
              </p>
            </div>
            <div>
              <p class="font-semibold">Status:</p>
              <span>

                <p :class="{
                  'text-green-900 bg-green-300 px-2 py-1 rounded-full': clientProfile.status === 'Ativo',
                  'text-red-900 bg-red-300 px-2 py-1 rounded-full': clientProfile.status === 'Vencido',
                  'text-orange-700 bg-orange-200 px-2 py-1 rounded-full': clientProfile.status === 'Quitado'
                }" class="inline-block">
                  {{ clientProfile.status }}</p>
              </span>
            </div>
            <div>
              <p class="font-semibold">Total:</p>
              <p>
                {{ formatCurrency(clientProfile.debit) }}</p>
            </div>
          </div>
          <hr class="border-t border-gray-300 my-4">

          <div class="header flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Endereço</h2>
            <div class="actions flex gap-2">
              <p v-if="!editAddress" @click="editAddressInfo"
                class="text-sm text-blue-600 cursor-pointer bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Editar</p>
              <p v-if="editAddress" @click="cancelEditAddressInfo"
                class="text-sm text-red-600 cursor-pointer bg-red-50 px-2 py-1 rounded hover:bg-red-100">Cancelar</p>
              <p v-if="editAddress"
                class="text-sm text-green-600 cursor-pointer bg-green-50 px-2 py-1 rounded hover:bg-green-100">Salvar
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>

              <p class="font-semibold">Rua:
                <input 
                
                type="text" :class="[
                  !clientProfile.street ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editAddress ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="clientProfile.street" :value="clientProfile.street ?? 'Nao cadastrado'"
                  :readonly="!editAddress">

              </p>
            </div>
            <div>
              <p class="font-semibold">Bairro:
                <input type="text" :class="[
                  !clientProfile.neighbor ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editAddress ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="clientProfile.neighbor" :value="clientProfile.neighbor ?? 'Nao cadastrado'"
                  :readonly="!editAddress">

              </p>
            </div>
            <div>
              <p class="font-semibold">Cidade:
                <input type="text" :class="[
                  !clientProfile.city ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editAddress ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="clientProfile.city" :value="clientProfile.city ?? 'Nao cadastrado'"
                  :readonly="!editAddress">

              </p>
            </div>
            <div>
              <p class="font-semibold">CEP:
                <input type="text" :class="[
                  !clientProfile.zipcode ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editAddress ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="clientProfile.zipcode" :value="clientProfile.zipcode ?? 'Nao cadastrado'"
                  :readonly="!editAddress">

              </p>
            </div>
            <div>
              <p class="font-semibold">Ponto de referência:
                <input type="text" :class="[
                  !clientProfile.reference_point ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editAddress ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="clientProfile.reference_point" :value="clientProfile.reference_point ?? 'Nao cadastrado'"
                  :readonly="!editAddress">

              </p>
            </div>
          </div>

          <hr class="border-t border-gray-300 my-4">

          <div class="header flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Ofício</h2>
            <div class="actions flex gap-2">
              <p v-if="!editOffice" @click="editOfficeInfo"
                class="text-sm text-blue-600 cursor-pointer bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Editar</p>
              <p v-if="editOffice" @click="cancelEditOfficeInfo"
                class="text-sm text-red-600 cursor-pointer bg-red-50 px-2 py-1 rounded hover:bg-red-100">Cancelar</p>
              <p v-if="editOffice"
                class="text-sm text-green-600 cursor-pointer bg-green-50 px-2 py-1 rounded hover:bg-green-100">Salvar
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p class="font-semibold">Nome da empresa:

                <input type="text" :class="[
                  !clientProfile.office_name ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" v-model="clientProfile.office_name" :value="clientProfile.office_name ?? 'Nao cadastrado'"
                  :readonly="!editOffice">

              </p>
            </div>
            <div>
              <p class="font-semibold">CEP:
                <input type="text"
                v-if="editOffice" 
                :class="[
                  !clientProfile.office_name ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice"
                
                v-model="clientProfile.office_zipcode"
                  :value="clientProfile.office_zipcode ?? 'Nao cadastrado'">
                <span v-else>

                  {{ formatZipcode(clientProfile.office_zipcode) ?? 'Nao cadastrado' }}
                </span>
              </p>

            </div>
            <div>
              <p class="font-semibold">Telefone:
                <input 
                v-if="editOffice"
                type="text" :class="[
                  !clientProfile.office_phone ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.office_phone" :value="formatPhone(clientProfile.office_phone) ?? 'Nao cadastrado'">
                <span v-else>
                  {{ formatPhone(clientProfile.office_phone) ?? 'Nao cadastrado' }}

                </span>

              </p>
            </div>
            <div>
              <p class="font-semibold">Cidade:
                <input type="text" :class="[
                  !clientProfile.office_city ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.office_city" :value="clientProfile.office_city ?? 'Nao cadastrado'">

              </p>
            </div>
            <div>
              <p class="font-semibold">Rua:
                <input type="text" :class="[
                  !clientProfile.office_street ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.office_street" :value="clientProfile.office_street ?? 'Nao cadastrado'">

              </p>
            </div>
            <div>
              <p class="font-semibold">Bairro:
                <input type="text" :class="[
                  !clientProfile.office_neighbor ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.office_neighbor" :value="clientProfile.office_neighbor ?? 'Nao cadastrado'">

              </p>
            </div>
            <div>
              <p class="font-semibold">Número:
                <input type="number" :class="[
                  !clientProfile.office_number ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.office_number" :value="clientProfile.office_number ?? 'Nao cadastrado'">

              </p>
            </div>
            <div>
              <p class="font-semibold">Função:
                <input type="text" :class="[
                  !clientProfile.role ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.role" :value="clientProfile.role ?? 'Nao cadastrado'">

              </p>
            </div>
            <div>
              <p class="font-semibold">Salário:
                <input 
                v-if="editOffice"
                type="text" :class="[
                  !clientProfile.salary ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.salary" :value="clientProfile.salary ?? 'Nao cadastrado'">

                <span v-else>{{formatCurrency(clientProfile.salary) ?? 'Nao cadastrado'}}</span>

              </p>
            </div>
            <div>
              <p class="font-semibold">Data de pagamento:
                <input type="date" :class="[
                  !clientProfile.payment_date ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.payment_date" :value="clientProfile.payment_date ?? 'Nao cadastrado'">

              </p>
            </div>
            <div>
              <p class="font-semibold">Data de admissão:
                <input type="date" :class="[
                  !clientProfile.admission_date ? 'text-red-500 font-normal italic' : 'text-gray-800',
                  editOffice ? 'border border-gray-400 rounded focus:outline-none focus:border-blue-500 px-1 py-1' : 'focus:outline-none',
                ]" :readonly="!editOffice" v-model="clientProfile.admission_date" :value="clientProfile.admission_date ?? 'Nao cadastrado'">

              </p>
            </div>
          </div>
          <hr class="border-t border-gray-300 my-4">
          <div class="flex mb-4">
            <button class="px-4 py-2 ml-auto bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <div class="max-h-[450px] overflow-x-auto">
        <ClientProfileTableSolicitations />
      </div>

      <hr class="border-t border-gray-300 my-4">

      <div class="max-h-[450px] overflow-x-auto">
        <TablePayments />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { storeToRefs } from 'pinia';

import { useRoute } from 'vue-router';
const route = useRoute();

import TablePayments from '@/components/ClientProfileTablePayments.vue';
import ClientProfileTableSolicitations from '@/components/ClientProfileTableSolicitations.vue';
import { useClientStore } from '@/stores/client';
const clientStore = useClientStore();
const { clientProfile } = storeToRefs(clientStore);

import { formatDate, formatZipcode, formatCurrency, formatPhone } from '@/utils/helpers';
import ErrorFeedbackMessage from '@/components/ErrorFeedbackMessage.vue';

const feedbackMessage = ref('');
const editOffice = ref(false);
const editAddress = ref(false);
const editPersonal = ref(false);

const officeData = ref({});

function editOfficeInfo() {
  editOffice.value = true;

  officeData.value = {
    ...clientProfile.value
  }
  
}

function editAddressInfo() {

    officeData.value = {
    ...clientProfile.value
  }

  editAddress.value = true

}
function cancelEditOfficeInfo() {
  
  clientProfile.value = officeData.value
  editOffice.value = false;

}


function cancelEditAddressInfo() {
  clientProfile.value = officeData.value
  editAddress.value = false;
}

function editPersonalInfo() {
  editPersonal.value = true;
  officeData.value = {
    ...clientProfile.value
  }
}

function cancelEditPersonalInfo() {
  clientProfile.value = officeData.value
  editPersonal.value = false;
}

onMounted(() => {
  clientStore.getClientProfile(route.params.id)
    .catch((error) => {

      feedbackMessage.value = error.message

    });
});
</script>
