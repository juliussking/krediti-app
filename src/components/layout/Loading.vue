<template>
  <div class="flex justify-center h-full">
    <span
    :class="['w-5 h-5 border-2 border-b-transparent rounded-full inline-block box-border animate-spin-fast',
    color ]"></span>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'text-blue-500'
  }
})

</script>

<style>
@keyframes spin-fast {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-fast {
  animation: spin-fast 0.5s linear infinite;
}
</style>
