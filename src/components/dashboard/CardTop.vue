<template>
    <div 
      class="card flex flex-col justify-center lg:h-[150px] p-3 border bg-white border-gray-200 hover:bg-gray-50 rounded"
      >
      <div 
        class="card-content flex flex-col gap-3"
        >
        <h1 
          :class="[`text-2xl font-semibold`, cardTitleColor]"
        >
        <slot name="mainInfo"/>
        </h1>

        <div 
        :class="[`w-full h-[3px]`, cardLineColor]">
      </div>

        <p 
        class="text-gray-500 text-end text-xs">
        <slot name="subInfo"/>
    </p>

      </div>
    </div>
</template>
<script setup>
const props = defineProps(['cardTitleColor', 'cardLineColor']);
</script>