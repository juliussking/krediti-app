<template>
  <div
    class="card group flex flex-col justify-center lg:h-[150px] p-4 border bg-white border-gray-200 
           rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-1 
           transition-all duration-300 ease-in-out cursor-pointer relative overflow-hidden"
  >
    <div class="card-content flex flex-col gap-3 h-full justify-between">
      <!-- Título -->
      <h1
        :class="[
          'text-2xl font-semibold tracking-tight transition-colors duration-300',
          cardTitleColor || 'text-gray-800'
        ]"
      >
        <slot name="mainInfo" />
      </h1>

      <!-- Linha com efeito de luz -->
      <div
        class="relative w-full h-[4px] rounded-full overflow-hidden"
        :class="cardLineColor || 'bg-blue-500'"
      >
        <span
          class="absolute top-0 left-[-40%] w-[40%] h-full bg-gradient-to-r from-white/0 via-white/60 to-white/0 
                 opacity-0 group-hover:opacity-100 animate-shine transition-opacity duration-500"
        ></span>
      </div>

      <!-- Subtítulo -->
      <p class="text-gray-500 text-end text-sm font-medium tracking-wide">
        <slot name="subInfo" />
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardTitleColor: String,
  cardLineColor: String,
});
</script>

<style scoped>
@keyframes shine {
  0% {
    left: -40%;
  }
  100% {
    left: 100%;
  }
}

.group:hover .animate-shine {
  animation: shine 1.2s ease-in-out forwards;
}
</style>
