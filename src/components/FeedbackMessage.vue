<template>
    <div 
      v-if="feedbackMessage"
        :class="[status == 'error' ? 'w-full bg-red-500 border border-red-500 px-4 py-3 rounded mb-5' : 'w-full bg-green-600 border border-green-500 px-4 py-3 rounded mb-5']">
        <h3 :class="[status == 'error' ? 'text-white text-center' : 'text-white text-center']">{{ feedbackMessage }}
          <span class="material-symbols-outlined">
            {{ status == 'error' ? 'error' : 'check' }}
          </span>
        </h3>
      </div>
</template>

<script setup>
const props = defineProps({
    feedbackMessage: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    }
})

</script>