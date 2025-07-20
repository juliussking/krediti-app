<template>
  <div class="pt-6 flex justify-center items-start min-h-screen">
    <div class="w-full bg-white max-w-4xl mx-auto p-6 pt-10 border border-gray-200 rounded">
      <!-- Indicador de etapas -->
      <div class="flex items-center justify-evenly gap-2 mb-6 overflow-x-auto border-y p-5 border-gray-200">

        <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="min-w-[25px] min-h-[25px] flex items-center justify-center rounded-full transition duration-300 whitespace-nowrap cursor-pointer"
        :class="{
            'bg-blue-500 text-white': currentStep === index,
            'bg-gray-200 text-gray-600': currentStep !== index
          }" @click="currentStep = index"
          >
          {{ step.title }}
        </div>

      </div>
      <!-- Conteúdo do formulário -->
      <form @submit.prevent="submit">

        <div v-if="currentStep === 0">

          <PersonalInfo 
          v-model:name="name" 
          v-model:identity="identity" 
          v-model:phone="phone"
          v-model:marital_status="marital_status" 
          v-model:birth_date="birth_date" 
          v-model:email="email"
          v-model:gender="gender" 
          :errors="errors" />
        </div>

        <div v-if="currentStep === 1">

          <AddressStep 
          v-model:zipcode="zipcode" 
          v-model:street="street" 
          v-model:neighbor="neighbor" 
          v-model:city="city"
          v-model:client_number="client_number" 
          v-model:reference_point="reference_point" 
          :errors="errors" />

        </div>

        <div v-if="currentStep === 2">

          <PersonTypeStep 
          v-model:person_type="person_type" 
          v-model:cpf="cpf" 
          v-model:cnpj="cnpj" 
          :errors="errors" />

        </div>

        <div v-if="currentStep === 3">

          <OfficeStep 
          v-model:office_name="office_name" 
          v-model:office_phone="office_phone"
          v-model:office_zipcode="office_zipcode" 
          v-model:office_street="office_street"
          v-model:office_city="office_city" 
          v-model:office_neighbor="office_neighbor"
          v-model:office_number="office_number" 
          v-model:office_cnpj="office_cnpj" 
          v-model:office_role="office_role"
          v-model:office_salary="office_salary" 
          v-model:office_payment_date="office_payment_date"
          v-model:office_admission_date="office_admission_date" 
          :errors="errors" 
          />

        </div>

        <div v-if="currentStep === 4">

          <CreditAmount 
          v-model:amount_requested="amount_requested" 
          v-model:tax="tax" 
          :errors="errors" 
          />

        </div>

        <div v-if="currentStep === 5">

          <ReferenceContactStep 
          :reference_contacts="reference_contacts" 
          :push="push" 
          :remove="remove"
          :errors="errors"
           />

        </div>

        <div v-if="currentStep === 6">

          <OBSStep 
          v-model:observations="observations"
           />

        </div>
        <div class="flex justify-between mt-6">

          <DefaultButton 
          buttonClass="bg-gray-300 px-4 py-2 disabled:opacity-50
          cursor-pointer text-gray-800 disabled:cursor-not-allowed" 
          buttonSize="w-25 p-2" 
          @click="prevStep"
          type="button" 
          :disabled="currentStep === 0"
          >
            Voltar
          </DefaultButton>

          <DefaultButton 
          buttonClass="bg-blue-500 text-white px-4 py-2 cursor-pointer disabled:opacity-50"
          buttonSize="w-25 p-2" 
          type="button" 
          @click="nextStep" 
          :disabled="currentStep === steps.length - 1"
          v-if="currentStep < steps.length - 1"
          >
          Avançar
          </DefaultButton>

          <DefaultButton
            buttonClass="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
            buttonSize="w-50 p-2" 
            type="submit" 
            :disabled="isSubmitting" 
            v-if="currentStep === steps.length - 1"
            >

            <div class="flex justify-center items-center">
              <span v-if="isSubmitting">
                <Loading />
              </span>
              <span v-else>
                Finalizar cadastro
              </span>
            </div>
          </DefaultButton>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useClientStore } from '@/stores/client'

import { useRouter } from 'vue-router'
const router = useRouter()

import Loading from '@/components/layout/Loading.vue'
import PersonalInfo from '@/components/registerStep/PersonStep.vue'
import AddressStep from '@/components/registerStep/AddressStep.vue'
import PersonTypeStep from '@/components/registerStep/PersonTypeStep.vue'
import OfficeStep from '@/components/registerStep/OfficeStep.vue'
import CreditAmount from '@/components/registerStep/CreditAmountStep.vue'
import ReferenceContactStep from '@/components/registerStep/ReferenceContactStep.vue'
import OBSStep from '@/components/registerStep/OBSStep.vue'
import DefaultButton from '@/components/DefaultButton.vue'

import { useForm, useField, useFieldArray } from 'vee-validate'
import { date, object, string, number, array } from 'yup'


const schema = object({
  //PERSONAL
  name: string().required().label('Nome').min(3).max(50), //*
  identity: string().required().label('Identidade').max(12),//*
  gender: string().label('Gênero'),
  phone: string().required().label('Telefone'), //*
  marital_status: string().label('Estado civil'),
  birth_date: date().required().label('Data de nascimento'), //*
  email: string().email().label('E-mail'),

  //ADDRESS
  zipcode: string().label('CEP'),
  street: string().label('Rua'),
  city: string().label('Cidade'),
  neighbor: string().label('Bairro'),
  client_number: number().label('Número'),
  reference_point: string().label('Ponto de referencia'),

  //PERSON TYPE
  person_type: string().label('Tipo de pessoa'),
  cpf: string().required().label('CPF'), //*
  cnpj: string().label('CNPJ'),

  //OFFICE
  office_name: string().label('Nome da empresa'),
  office_phone: string().label('Telefone'),
  office_zipcode: string().min(8).label('CEP'),
  office_street: string().label('Rua'),
  office_neighbor: string().label('Bairro'),
  office_city: string().label('Cidade'),
  office_number: string().label('Numero'),
  office_cnpj: string().label('CNPJ'),
  office_role: string().required().label('Cargo'), //*
  office_salary: number().required().label('Salário'), //*
  office_payment_date: date().required().label('Data de pagamento'), //*
  office_admission_date: date().label('Data de admissão'),

  //CREDIT AMOUNT
  amount_requested: string().required().label('Valor solicitado'), //*
  tax: number().required().label('Taxa de juros'),

  reference_contacts: array().of(
    object({
      name: string().required().label('Nome'),
      phone: string().required().label('Telefone'),
      relation: string().required().label('Relação')
    }) //*
  ),

  observations: string().required().label('Observações'), //*



})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    reference_contacts: [
      { name: '', phone: '', relation: '' }
    ],
    name: 'Jon Snow',
    identity: '123456789',
    gender: 'Masculino',
    phone: '(11) 98765-4321',
    marital_status: 'Solteiro',
    birth_date: '1990-01-01',
    email: 'julio@email',

    zipcode: '12345678',
    street: 'Av. Paulista',
    city: 'Sao Paulo',
    neighbor: 'Bairro',
    client_number: "123",
    reference_point: 'Ponto de referencia',

    person_type: 'Fisica',
    cpf: '123456789',
    cnpj: '1213123121',

    office_name: 'Empresa',
    office_phone: '(11) 98765-4321',
    office_zipcode: '12345678',
    office_street: 'Av. Paulista',
    office_neighbor: 'Bairro',
    office_city: 'Sao Paulo',
    office_number: "123",
    office_cnpj: '1213123121',
    office_role: 'Cargo',
    office_salary: "1000",
    office_payment_date: '2022-01-01',
    office_admission_date: '2022-01-01',

    amount_requested: '1000',
    tax: "1.19",

    observations: 'Observações',
  }
})

const submit = handleSubmit((values) => {
  const clientStore = useClientStore();

  return clientStore.registerClients(values)
    .then((response) => {
      const clientId = response.data.data.id
      router.push({ name: 'client-profile', params: { id: clientId } })
    })

})

const { value: name } = useField('name')
const { value: identity } = useField('identity')
const { value: gender } = useField('gender')
const { value: phone } = useField('phone')
const { value: marital_status } = useField('marital_status')
const { value: birth_date } = useField('birth_date')
const { value: email } = useField('email')

const { value: zipcode } = useField('zipcode')
const { value: street } = useField('street')
const { value: city } = useField('city')
const { value: neighbor } = useField('neighbor')
const { value: client_number } = useField('client_number')
const { value: reference_point } = useField('reference_point')

const { value: person_type } = useField('person_type')
const { value: cpf } = useField('cpf')
const { value: cnpj } = useField('cnpj')

const { value: office_name } = useField('office_name')
const { value: office_phone } = useField('office_phone')
const { value: office_zipcode } = useField('office_zipcode')
const { value: office_street } = useField('office_street')
const { value: office_neighbor } = useField('office_neighbor')
const { value: office_city } = useField('office_city')
const { value: office_number } = useField('office_number')
const { value: office_cnpj } = useField('office_cnpj')
const { value: office_role } = useField('office_role')
const { value: office_salary } = useField('office_salary')
const { value: office_payment_date } = useField('office_payment_date')
const { value: office_admission_date } = useField('office_admission_date')

const { value: amount_requested } = useField('amount_requested')
const { value: tax } = useField('tax')

const { fields: reference_contacts, push, remove } = useFieldArray('reference_contacts')

const { value: observations } = useField('observations')

const currentStep = ref(0)
const steps = [
  { title: '1' },
  { title: '2' },
  { title: '3' },
  { title: '4' },
  { title: '5' },
  { title: '6' },
  { title: '7' },
]

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>
