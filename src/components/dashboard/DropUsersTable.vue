<template>
  <div class="relative inline-block">
    <Menu>
      <MenuButton
        class="inline-flex justify-center rounded-md border border-gray-100 p-1 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-200 hover:text-gray-700 focus:outline-none cursor-pointer w-8">
        <span class="material-symbols-outlined">
          more_vert
        </span>
      </MenuButton>

      <Transition enter="transition ease-out duration-100" enter-from="transform opacity-0 scale-95"
        enter-to="transform opacity-100 scale-100" leave="transition ease-in duration-75"
        leave-from="transform opacity-100 scale-100" leave-to="transform opacity-0 scale-95">

        <MenuItems :class="['absolute right-[35px] z-50 w-48 border border-gray-200 bg-white shadow',
          index > 7 ? 'bottom-full rounded-t-md rounded-bl-md' : 'top-full rounded-l-md rounded-br-md'
        ]">
          <div
            :class="['absolute w-1 h-1 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-blue-500 ', index > 7 ? '-bottom-0 -right-1 rotate-120' : '-top-0 -right-1 rotate-45']">
          </div>
          <MenuItem v-slot="{ active }">
          <RouterLink :to="{ name: 'client-profile', params: { id: user.id } }" :class="[
            active ? 'bg-blue-50 text-blue-500' : 'text-gray-800',
            'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
          ]">
            <span class="material-symbols-outlined">
              person
            </span>
            Perfil
          </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }">
          <RouterLink :to="{ name: 'credit-request', query: { id: user.id, name: user.name } }" :class="[
            active ? 'bg-blue-50 text-blue-500' : 'text-gray-800',
            'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
          ]">
            <span class="material-symbols-outlined">
              add_moderator
            </span>

            Gerenciar cargo
          </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }">
          <RouterLink :to="{ name: 'receive-payment', query: { id: user.id, name: user.name } }" :class="[
            active ? 'bg-blue-50 text-blue-500' : 'text-gray-800',
            'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
          ]">
            <span class="material-symbols-outlined">
              account_circle_off
            </span>
            Bloquear
          </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <RouterLink :to="{ name: 'receive-payment', query: { id: user.id, name: user.name } }" :class="[
            active ? 'bg-blue-50 text-blue-500' : 'text-gray-800',
            'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
          ]">
            <span class="material-symbols-outlined">
              search_insights
            </span>
            Ver operações
          </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <button @click="emit('deleteUser', user)" type="button" :class="[
            active ? 'bg-red-50 text-red-500' : 'text-gray-800',
            'block w-full text-left px-4 py-2 text-sm cursor-pointer flex items-center gap-2'
          ]">
            <span class="material-symbols-outlined">delete</span>
            Excluir
          </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'


const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits([
  'deleteUser'
])
</script>