<template>
    <input 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      :type="type"
      :placeholder="placeholder" 
      :class="[
              'border p-2 rounded w-full focus:outline-none m-0',
              error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
        ]" />
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
  },
  error: {
    type: Boolean,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    default: 'text'
  },

})

const emit = defineEmits(['update:modelValue'])



</script>