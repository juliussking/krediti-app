<template>
  <div class="stepTitle">
    <h2 class="text-xl font-semibold mb-2">Valor do crédito</h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div class="stepInput mb-4">

      <LabelForm>Valor Solicitado</LabelForm>
      
      <BaseInput 
      :error="!!errors.amount_requested" 
      :modelValue="amount_requested" 
      @update:modelValue="$emit('update:amount_requested', $event)"
      :type="'number'"
      :placeholder="'Ex: 1000'" />

      <ErrorsForm :errors="errors" attr="amount_requested" />

    </div>
    <div class="stepInput mb-4">

    <LabelForm>Taxa(%)</LabelForm> 

    <BaseSelect 
      :error="!!errors.tax" 
      :modelValue="tax"
      @update:modelValue="$emit('update:tax', $event)"
      :options="['1.19', '1.23', '1.25', '1.28', '1.31']" />
         
      <ErrorsForm :errors="errors" attr="tax" />

    </div>

    <div class="">
      <p class="text-gray-800 font-semibold">Valor a ser pago: R$ {{ (amount_requested * tax) }}</p>
    </div>

  </div>
</template>
<script setup>
import BaseInput from '../layout/BaseInput.vue';
import BaseSelect from '../layout/BaseSelect.vue';
import ErrorsForm from '../registerSteps/ErrorsForm.vue';
import LabelForm from '../registerSteps/LabelForm.vue';

const props = defineProps([
  'amount_requested',
  'tax',
  'errors'
])

const emit = defineEmits([
  'update:amount_requested',
  'update:tax'
])







</script>