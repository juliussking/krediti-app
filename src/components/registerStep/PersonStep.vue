<template>
  <div class="stepTitle">

    <h2 class="text-xl font-semibold mb-2">Informações Pessoais</h2>

  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div class="stepInput mb-4 md:col-span-2">

      <LabelForm>Nome completo</LabelForm>

      <BaseInput 
      :error="!!errors.name" 
      :modelValue="name" 
      @update:modelValue="$emit('update:name', $event)"
      :type="'text'" 
      :placeholder="'Ex: Maria da Silva'" />

      <ErrorsForm :errors="errors" attr="name" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Identidade</LabelForm>

      <BaseInput 
      :error="!!errors.identity" 
      :modelValue="identity" 
      @update:modelValue="$emit('update:identity', $event)"
      :type="'text'" 
      :placeholder="'###.###.##-#'" />

      <ErrorsForm :errors="errors" attr="identity" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Telefone</LabelForm>

      <BaseInput 
      :error="!!errors.phone" 
      :modelValue="phone" 
      @update:modelValue="$emit('update:phone', $event)"
      :type="'text'" 
      :placeholder="'Ex: 564'" />

      <ErrorsForm :errors="errors" attr="phone" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Gênero</LabelForm>

      <BaseSelect 
      :error="!!errors.gender" 
      :modelValue="gender" 
      @update:modelValue="$emit('update:gender', $event)"
      :options="['Masculino', 'Feminino']" />

      <ErrorsForm :errors="errors" attr="gender" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Estado Civil</LabelForm>

      <BaseSelect 
      :error="!!errors.marital_status" 
      :modelValue="marital_status"
      @update:modelValue="$emit('update:marital_status', $event)"
      :options="['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viuvo(a)']" />

      <ErrorsForm :errors="errors" attr="marital_status" />

    </div>

    <div class="stepInput mb-4">

      <LabelForm>Data de Nascimento</LabelForm>

      <BaseInput 
      :error="!!errors.birth_date" 
      :modelValue="birth_date"
      @update:modelValue="$emit('update:birth_date', $event)" 
      :type="'date'" />

      <ErrorsForm :errors="errors" attr="birth_date" />

    </div>

    <div class="stepInput mb-4 md:col-span-2">

      <LabelForm>Email</LabelForm>

      <BaseInput 
      :error="!!errors.email" 
      :modelValue="email" 
      @update:modelValue="$emit('update:email', $event)"
      :type="'email'" 
      :placeholder="'Ex: krediti@gmail.com'" />

      <ErrorsForm :errors="errors" attr="email" />

    </div>
  </div>
</template>

<script setup>
import BaseInput from '../layout/BaseInput.vue';
import BaseSelect from '../layout/BaseSelect.vue';
import ErrorsForm from '../registerSteps/ErrorsForm.vue';
import LabelForm from '../registerSteps/LabelForm.vue';


const props = defineProps({
  name: String,
  identity: String,
  gender: String,
  phone: String,
  marital_status: String,
  birth_date: String,
  email: String,
  errors: Object
})

const emit = defineEmits([
  'update:name',
  'update:identity',
  'update:gender',
  'update:phone',
  'update:marital_status',
  'update:birth_date',
  'update:email'
])



</script>
