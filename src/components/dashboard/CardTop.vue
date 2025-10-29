<template>
  <div class="card group flex flex-col justify-center lg:h-[150px] p-4 border bg-white border-gray-200 
           rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-1 
           transition-all duration-300 ease-in-out cursor-pointer relative overflow-hidden">
    <div class="card-content flex flex-col gap-3 h-full justify-between">

      <p class="text-gray-500 text-sm font-medium tracking-wide">
        <slot name="cardTitle" />
      </p>
      <h1 class="text-3xl text-gray-700 font-bold">
        <slot name="mainInfo" />
      </h1>
      <p class="text-gray-500 text-sm font-medium tracking-wide">
        <slot name="subInfo" />
      </p>
      <span
      class="absolute right-10 top-10"
      >
        <slot name="icon" />
      </span>
    </div>
  </div>
</template>

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
