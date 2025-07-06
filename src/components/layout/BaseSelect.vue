<template>
    <select 
      :value="modelValue" 
      @change="$emit('update:modelValue', $event.target.value)"
      :class="[
        'border p-2 rounded w-full focus:outline-none',
        error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
      ]" 
      >
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        
      </select>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
  },
  error: {
    type: Boolean,
  },
  options: {
    type: Array,
    required: true
  }
})


</script>