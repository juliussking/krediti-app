<template>

  <div class="observation">
    <h2 class="text-xl font-semibold text-gray-800 mb-2">Observação</h2>
    <textarea
      :value="observations"
      @input="$emit('update:observations', $event.target.value)"
      class="border border-gray-300 p-2 rounded w-full"
      rows="4"
      placeholder="Observações gerais"
    ></textarea>
  </div>
</template>

<script setup>

const props = defineProps([
  'observations'
])

const emit = defineEmits(['update:observations'])

</script>
