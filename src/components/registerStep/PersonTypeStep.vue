<template>
  <div class="stepTitle">

    <h2 class="text-xl font-semibold mb-2">Tipo de pessoa</h2>

  </div>

  <div class="stepInput mb-4 flex justify-center">

    <div class="fisicPerson flex items-center mr-4 gap-2">
      <input type="radio" value="Fisica" id="Fisica" :checked="person_type === 'Fisica'"
        @change="$emit('update:person_type', 'Fisica'), $emit('update:cpf', ''), $emit('update:cnpj', '')"
        class="border border-gray-300 p-2" />
      <label class="block font-medium text-gray-600" for="Fisica">Física</label>
    </div>

    <div class="juridicPerson flex items-center mr-4 gap-2">
      <input type="radio" value="Juridica" id="Juridica" :checked="person_type === 'Juridica'"
        @change="$emit('update:person_type', 'Juridica'), $emit('update:cpf', ''), $emit('update:cnpj', '')"
        class="border border-gray-300 p-2" />
      <label class="block font-medium text-gray-600" for="Juridica">Jurídica</label>
    </div>

  </div>
  
  <div class="grid grid-cols-1 gap-4 w-full place-items-center">

    <div class="stepInput mb-4 w-full md:w-1/2 md:col-span-2 " v-if="person_type === 'Fisica'">

      <LabelForm>CPF</LabelForm>

      <BaseInput 
      :error="!!errors.cpf" 
      :modelValue="cpf" 
      @update:modelValue="$emit('update:cpf', $event)"
      :type="'text'" 
      :placeholder="'###.###.###-##'" />

      <ErrorsForm :errors="errors" attr="cpf" />

    </div>
    <div class="stepInput mb-4 w-full md:w-1/2 md:col-span-2" v-if="person_type === 'Juridica'">

      <LabelForm>CNPJ</LabelForm>

      <BaseInput 
      :error="!!errors.cnpj" 
      :modelValue="cnpj" 
      @update:modelValue="$emit('update:cnpj', $event)"
      :type="'text'" 
      :placeholder="'##.###.###/####-##'" />

      <ErrorsForm :errors="errors" attr="cnpj" />
    </div>
  </div>
</template>

<script setup>
import BaseInput from '../layout/BaseInput.vue';
import ErrorsForm from '../registerSteps/ErrorsForm.vue';
import LabelForm from '../registerSteps/LabelForm.vue';


const props = defineProps({
  person_type: String,
  cpf: String,
  cnpj: String,
  errors: Object
})

const emit = defineEmits([
  'update:person_type',
  'update:cpf',
  'update:cnpj',
]);

</script>