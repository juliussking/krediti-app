<template>
  <div class="stepTitle">
    <h2 class="text-xl font-semibold mb-2">Endereço</h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div class="stepInput mb-4">

      <label class="block text-sm font-medium text-gray-600 mb-1">CEP</label>

      <BaseInput
      :error="!!errors.zipcode"
      :modelValue="zipcode"
      @update:modelValue="$emit('update:zipcode', $event)"
      @blur="buscarCep"
      :type="'text'"
      :placeholder="'Ex: 00000-000'"
      />
      <p v-if="cepNotFound" class="text-red-500 text-xs mt-1">{{ cepNotFound }}</p>

    <ErrorsForm :errors="errors" attr="zipcode" />

    </div>

    <div class="stepInput mb-4 md:col-span-2">

      <label class="block text-sm font-medium text-gray-600 mb-1">Rua</label>

      <BaseInput 
      :error="!!errors.street"
      :modelValue="street"
      @update:modelValue="$emit('update:street', $event)"
      :type="'text'"
      :placeholder="'Ex: Av. Paulista'"
      />
      
      <ErrorsForm :errors="errors" attr="street" />

    </div>

    <div class="stepInput mb-4">

      <label class="block text-sm font-medium text-gray-600 mb-1">Cidade</label>

      <BaseInput 
      :error="!!errors.city"
      :modelValue="city"
      @update:modelValue="$emit('update:city', $event)"
      :type="'text'"
      :placeholder="'Ex: Sao Paulo'"
      />
      
      <ErrorsForm :errors="errors" attr="city" />

    </div>

    <div class="stepInput mb-4">

      <label class="block text-sm font-medium text-gray-600 mb-1">Bairro</label>

      <BaseInput 
      :error="!!errors.neighbor"
      :modelValue="neighbor"
      @update:modelValue="$emit('update:neighbor', $event)"
      :type="'text'"
      :placeholder="'Ex: Centro'"
      />
      
      <ErrorsForm :errors="errors" attr="neighbor" />

    </div>

    <div class="stepInput mb-4">

      <label class="block text-sm font-medium text-gray-600 mb-1">Número</label>

      <BaseInput 
      :error="!!errors.client_number"
      :modelValue="client_number"
      @update:modelValue="$emit('update:client_number', $event)"
      :type="'text'"
      :placeholder="'Ex: 564'"
      />
      
      <ErrorsForm :errors="errors" attr="client_number" />

    </div>

    <div class="stepInput mb-4 md:col-span-full">

      <label class="block text-sm font-medium text-gray-600 mb-1">Ponto de referência</label>

      <BaseInput 
      :error="!!errors.reference_point"
      :modelValue="reference_point"
      @update:modelValue="$emit('update:reference_point', $event)"
      :type="'text'"
      :placeholder="'Ex: Casa'"
      />
      
      <ErrorsForm :errors="errors" attr="reference_point" />

    </div>


  </div>
</template>
<script setup>
import { ref } from 'vue';
import BaseInput from '../layout/BaseInput.vue';
import ErrorsForm from '../registerSteps/ErrorsForm.vue';



const props = defineProps({
  zipcode: String,
  street: String,
  city: String,
  neighbor: String,
  client_number: String,
  reference_point: String,
  errors: Object
})

const emit = defineEmits([
  'update:zipcode',
  'update:street',
  'update:city',
  'update:neighbor',
  'update:client_number',
  'update:reference_point'
])

const cepNotFound = ref('');

function buscarCep(event) {
  const cep = event.target.value.replace(/\D/g, '');

  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (!data.erro) {
        emit('update:street', data.logradouro || '');
        emit('update:neighbor', data.bairro || '');
        emit('update:city', data.localidade || '');
        cepNotFound.value = '';
      } else {
        cepNotFound.value = 'Cep não encontrado.';
        emit('update:street', '');
        emit('update:neighbor', '');
        emit('update:city', '');
      }
    })
    .catch(() => {
      alert("Erro ao buscar o CEP.");
    });
}
</script>
