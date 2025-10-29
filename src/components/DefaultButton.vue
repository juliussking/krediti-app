<template>
    <button
          :class="[`rounded transition cursor-pointer disabled:cursor-not-allowed flex justify-center items-center`, 
            buttonClass,
            buttonSize
          ]"
          :disabled="loading"
          @click="$emit('click')"
        >
        <span v-if="loading">
          <Loading />
        </span>
        <span v-else>
          <slot>Default Button</slot>
        </span>
        </button>
</template>

<script setup>
import Loading from './layout/Loading.vue';

const props = defineProps({
  buttonClass: {
    type: String,
    default: 'bg-gray-300 hover:bg-gray-500 text-white'
  },
  buttonSize: {
    type: String,
    default: 'w-40 text-sm py-2 px-4'
  },
  loading: {
    type: Boolean,
    default: false
  }

});

const emit = defineEmits(['click'])


</script>