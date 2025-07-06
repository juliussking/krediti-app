<template>
  <Dialog :open="isOpen" @close="setIsOpen(false)"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
    <DialogOverlay class="absolute inset-0 bg-black/50 bg-opacity-30" />

    <DialogPanel class="relative bg-white rounded max-w-md mx-auto p-6 shadow-lg z-10">
      <DialogTitle class="text-lg font-medium text-gray-900">
        Excluir cliente
      </DialogTitle>

      <p class="mt-4 text-gray-800">
        Tem certeza que deseja excluir o cliente <strong>{{ client?.name }}</strong>
      </p>
      <div class="mt-6 flex justify-end space-x-3">
        <button @click="setIsOpen(false)" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button @click="deleteClient(client.id)" :class="[
          'px-4 py-2 text-white rounded w-25 flex items-center justify-center',
          loading ? 'bg-gray-600/20' : 'bg-red-600 hover:bg-red-700'
        ]">

          <span v-if="loading">
            <Loading />
          </span>
          <span v-else>
            Excluir
          </span>
        </button>
      </div>
    </DialogPanel>
  </Dialog>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useClientStore } from '@/stores/client';
import { ref } from 'vue';
import Loading from './Loading.vue';
const clientStore = useClientStore();

const loading = ref(false);

const props = defineProps({
  isOpen: Boolean,
  client: Object,
})

const emit = defineEmits(['update:isOpen'])

const setIsOpen = (value) => {
  emit('update:isOpen', value)
}


function deleteClient(clientId) {
  loading.value = true
  return clientStore.deleteClient(clientId)
    .finally(() => {
      loading.value = false
      setIsOpen(false);
    });

}
</script>
