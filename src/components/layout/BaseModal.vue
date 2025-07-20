<template>
    <Transition name="modal-fade" appear>
      <div v-if="modelValue" @click.self="emit('update:modelValue', false)"
        class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

        <div :class="[`bg-white rounded lg:ml-[250px]`,
          modalSize
        ]">

          <div class="closeButton flex justify-between mt-1 ml-1 px-2">
            <h1 class="text-lg font-semibold text-gray-800">{{ modalTitle }}</h1>
            <span @click="emit('update:modelValue', false)"
              class="material-symbols-outlined text-gray-600 mt-1 cursor-pointer hover:text-gray-800">
              close
            </span>
          </div>
          <div class="modalContent p-5">

            <slot>Modal Content</slot>

          </div>

          <div class="actions flex gap-2 justify-end p-5">

            <DefaultButton 
            @click="emit('update:modelValue', false)" 
            :buttonClass="buttonCancelClass" 
            :loading="false"
              :buttonSize="buttonSize">
              {{ cancelText }}
            </DefaultButton>

            <DefaultButton 
            @click="emit('confirm')" 
            :buttonClass="buttonConfirmClass" 
            :buttonSize="buttonSize"
            :loading="loading">
              {{ confirmText }}
            </DefaultButton>
          </div>
        </div>
      </div>
    </Transition>
</template>

<script setup>
import DefaultButton from '../DefaultButton.vue';

const props = defineProps({
  modelValue: Boolean,
  modalSize: {
    type: String,
    default: 'w-[400px]'
  },
  cancelText: {
    type: String,
    default: 'My Button'
  },

  confirmText: {
    type: String,
    default: 'My Button'
  },
  modalTitle: {
    type: String,
    default: 'My Modal',
  },
  buttonConfirmClass: {
    type: String,
  },
  buttonCancelClass: {
    type: String,
  },
  buttonSize: {
    type: String,
  },
  loading: {
    type: Boolean
  }

})
const emit = defineEmits([
  'update:modelValue',
  'confirm'


])

</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
