<template>

  <div class="stepTitle">

    <h2 class="text-xl font-semibold mb-2">Ofício</h2>

  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div class="stepInput mb-4">


      <LabelForm>CEP</LabelForm>

      <BaseInput 
      :error="!!errors.office_zipcode" 
      :modelValue="office_zipcode"
      @update:modelValue="$emit('update:office_zipcode', $event)" 
      @blur="buscarCep" 
      :type="'text'"
      :placeholder="'Ex: 00000-000'" />
        
      <p v-if="cepNotFound" class="text-red-500 text-xs mt-1">{{ cepNotFound }}</p>

      <ErrorsForm :errors="errors" attr="office_zipcode" />
      
    </div>

    <div class="stepInput mb-4 md:col-span-2">

      <LabelForm>Rua</LabelForm>


      <BaseInput 
      :error="!!errors.office_street" 
      :modelValue="office_street"
      @update:modelValue="$emit('update:office_street', $event)" 
      :type="'text'" 
      :placeholder="'Ex: Rua 1'" />

      <ErrorsForm :errors="errors" attr="office_street" />
      
    </div>

    <div class="stepInput mb-4 md:col-span-2">

      <LabelForm>Cidade</LabelForm>

      <BaseInput 
      :error="!!errors.office_city" 
      :modelValue="office_city"
      @update:modelValue="$emit('update:office_city', $event)" 
      :type="'text'" 
      :placeholder="'Ex: São Paulo'" />

      <ErrorsForm :errors="errors" attr="office_city" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Bairro</LabelForm>

      <BaseInput 
      :error="!!errors.office_neighbor" 
      :modelValue="office_neighbor"
      @update:modelValue="$emit('update:office_neighbor', $event)" 
      :type="'text'" 
      :placeholder="'Ex: Centro'" />

      <ErrorsForm :errors="errors" attr="office_neighbor" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Número</LabelForm>

      <BaseInput 
      :error="!!errors.office_number" 
      :modelValue="office_number"
      @update:modelValue="$emit('update:office_number', $event)" 
      :type="'text'" 
      :placeholder="'Ex: 564'" />

      <ErrorsForm :errors="errors" attr="office_neighbor" />
      
    </div>

    <div class="stepInput mb-4 md:col-span-2">

      <LabelForm>Nome da empresa</LabelForm>

      <BaseInput 
      :error="!!errors.office_name" 
      :modelValue="office_name"
      @update:modelValue="$emit('update:office_name', $event)" 
      :type="'text'" 
      :placeholder="'Ex: Empresa'" />

      <ErrorsForm :errors="errors" attr="office_name" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Telefone</LabelForm>

      <BaseInput 
      :error="!!errors.office_phone" 
      :modelValue="office_phone"
      @update:modelValue="$emit('update:office_phone', $event)" 
      :type="'text'" 
      :placeholder="'Ex: 564'" />

      <ErrorsForm :errors="errors" attr="office_phone" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>CNPJ</LabelForm>

      <BaseInput 
      :error="!!errors.office_cnpj" 
      :modelValue="office_cnpj"
      @update:modelValue="$emit('update:office_cnpj', $event)" 
      :type="'text'"
      :placeholder="'Ex: 00.000.000/0000-00'" />

      <ErrorsForm :errors="errors" attr="office_cnpj" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Cargo</LabelForm>

      <BaseInput 
      :error="!!errors.office_role" 
      :modelValue="office_role"
      @update:modelValue="$emit('update:office_role', $event)" 
      :type="'text'" 
      :placeholder="'Ex: Gerente'" />

      <ErrorsForm :errors="errors" attr="office_role" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Salário</LabelForm>

      <BaseInput 
      :error="!!errors.office_salary" 
      :modelValue="office_salary"
      @update:modelValue="$emit('update:office_salary', $event)" 
      :type="'text'" :placeholder="'Ex: 1000'" />

      <ErrorsForm :errors="errors" attr="office_salary" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Data de pagamento</LabelForm>

      <input 
      @input="$emit('update:office_payment_date', $event.target.value)" 
      :value="office_payment_date" 
      type="date"
      :class="[
          'border p-2 rounded w-full focus:outline-none',
          errors.office_payment_date ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
        ]" />

      <ErrorsForm :errors="errors" attr="office_payment_date" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Data de admissão</LabelForm>
      
      <input 
      @input="$emit('update:office_admission_date', $event.target.value)" 
      :value="office_admission_date"
      type="date" :class="[
          'border p-2 rounded w-full focus:outline-none',
          errors.office_admission_date ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
        ]" />

      <ErrorsForm :errors="errors" attr="office_admission_date" />

    </div>
    
  </div>
</template>

<script setup>
import BaseInput from '../layout/BaseInput.vue';
import { ref } from 'vue';
import LabelForm from '../registerSteps/LabelForm.vue';
import ErrorsForm from '../registerSteps/ErrorsForm.vue';

const props = defineProps({
  office_zipcode: String,
  office_street: String,
  office_city: String,
  office_neighbor: String,
  office_number: String,
  office_name: String,
  office_phone: String,
  office_cnpj: String,
  office_role: String,
  office_salary: String,
  office_payment_date: String,
  office_admission_date: String,
  errors: Object
})

const emit = defineEmits([
  'update:office_zipcode',
  'update:office_street',
  'update:office_city',
  'update:office_neighbor',
  'update:office_number',
  'update:office_name',
  'update:office_phone',
  'update:office_cnpj',
  'update:office_role',
  'update:office_salary',
  'update:office_payment_date',
  'update:office_admission_date'
])


const cepNotFound = ref('');

function buscarCep(event) {
  const cep = event.target.value.replace(/\D/g, '');

  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (!data.erro) {
        emit('update:office_street', data.logradouro || '');
        emit('update:office_neighbor', data.bairro || '');
        emit('update:office_city', data.localidade || '');
        cepNotFound.value = '';
      } else {
        cepNotFound.value = 'Cep não encontrado.';
        emit('update:office_street', '');
        emit('update:office_neighbor', '');
        emit('update:office_city', '');
      }
    })
    .catch(() => {
      alert("Erro ao buscar o CEP.");
    });
}
</script>