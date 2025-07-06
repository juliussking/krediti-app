<template>
  <div class="stepTitle">
    <h2 class="text-xl font-semibold mb-2">Contatos de referência</h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-2" v-for="(reference, index) in reference_contacts"
    :key="reference.key">
    <div class="stepInput mb-4">
      <label class="block text-sm font-medium text-gray-600 mb-1">Nome</label>
      <input v-model="reference.value.name" type="text" placeholder="Ex: Maria da Silva" :class="[
        'border p-2 rounded w-full focus:outline-none',
        errors[`reference_contacts[${index}].name`]
          ? 'border-red-500'
          : 'border-gray-300 focus:border-blue-500'
      ]" />
      <span v-if="errors[`reference_contacts[${index}].name`]">
        <p class="text-red-500 text-xs mt-1">
          {{ errors[`reference_contacts[${index}].name`] }}
        </p>
      </span>
    </div>

    <div class="stepInput mb-4">
      <label class="block text-sm font-medium text-gray-600 mb-1">Telefone</label>
      <input v-model="reference.value.phone" type="text" placeholder="(##) # ####-####" :class="[
        'border p-2 rounded w-full focus:outline-none',
        errors[`reference_contacts[${index}].phone`] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
      ]" />
      <span v-if="errors[`reference_contacts[${index}].phone`]">
        <p class="text-red-500 text-xs mt-1">
          {{ errors[`reference_contacts[${index}].phone`] }}
        </p>
      </span>

    </div>

    <div class="stepInput mb-4">
      <label class="block text-sm font-medium text-gray-600 mb-1">Relação</label>
      <input v-model="reference.value.relation" type="text" placeholder="Ex: pai, cunhado, filho, patrão, vizinho, etc."
        :class="[
          'border p-2 rounded w-full focus:outline-none',
          errors[`reference_contacts[${index}].relation`] ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
        ]" />
      <span v-if="errors[`reference_contacts[${index}].relation`]">
        <p class="text-red-500 text-xs mt-1">
          {{ errors[`reference_contacts[${index}].relation`] }}
        </p>
      </span>

    </div>

    <div class="removeContact lg:col-span-3" v-if="reference_contacts.length > 1">
      <button type="button" @click="remove(index)"
        class="px-1 py-1 w-full lg:text-end col-span-full text-red-500 hover:underline cursor-pointer text-sm rounded mx-auto">
        Remover contato
      </button>
    </div>

  </div>
  <hr class="border-t border-gray-300 my-4" />

  <div class="addContact flex">
    <button type="button" @click="push({ name: '', phone: '', relation: '' })"
      class="px-1 py-1 text-blue-500 hover:underline cursor-pointer text-sm rounded mx-auto">
      + Contato
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  reference_contacts: {
    type: Array,
    required: true
  },
  push: {
    type: Function,
    required: true
  },
  remove: {
    type: Function,
    required: true
  },
  errors: {
    type: Object,
    required: true
  }
})

function getError(field, index) {
  return errors[`reference_contacts[${index}].${field}`]
}
</script>
