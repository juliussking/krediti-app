<template>
    <Menu>
              <MenuButton
                class="inline-flex justify-center rounded-md border border-gray-100 p-1 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-200 hover:text-gray-700 focus:outline-none cursor-pointer">
                <span class="material-symbols-outlined">
                  more_vert
                </span>
              </MenuButton>

              <Transition enter="transition ease-out duration-100" enter-from="transform opacity-0 scale-95"
                enter-to="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                leave-from="transform opacity-100 scale-100" leave-to="transform opacity-0 scale-95">

                <MenuItems
                  class="absolute right-14 z-50 w-40 origin-top-right rounded-l-md rounded-br-md border border-gray-200 bg-white shadow">

                  <MenuItem 
                  v-if="!['Aprovada', 'Recusada', 'Contra-oferta'].includes(payment.status)"
                  v-slot="{ active }">
                  <RouterLink 
                  :to="{ name: 'client-profile', params: { id: payment.id } }" 
                  :class="[
                    active ? 'bg-blue-50 text-blue-500' : 'text-gray-800',
                    'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
                  ]">
                    <span class="material-symbols-outlined">
                      edit_note
                    </span>
                    Editar
                  </RouterLink>
                  </MenuItem>
                  
                  <MenuItem v-slot="{ active }"
                  v-if="!['Aprovada'].includes(payment.status)"
                  >
                  <button @click="emit('deletepayment', payment)" type="button" :class="[
                    active ? 'bg-red-50 text-red-500' : 'text-gray-800',
                    'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
                  ]">
                    <span class="material-symbols-outlined">
                      delete
                    </span>
                    Excluir
                  </button>
                  </MenuItem>

                </MenuItems>
              </Transition>
            </Menu>
</template>
<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const props = defineProps({
  payments: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'deletePayment',
])

</script>