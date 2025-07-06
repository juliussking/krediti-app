<template>
    <div class="bg-blue-500 relative h-[50px] flex items-center">
        <div class="title mx-auto lg:hidden">
            <h1 class="text-white left-3 top-2 text-2xl font-semibold ">Krediti
            </h1>
        </div>


        <div class="w-[40px] absolute right-3 lg:right-5 cursor-pointer" v-if="!toggleStore.sidebar">

            <img :src="meStore.user.profile?.avatar || '/assets/img/default/default-avatar.jpg'" alt="" class="w-full object-cover rounded-full"
                @click="mostrarDropdown = !mostrarDropdown">

            <transition name="dropdown">
                <div v-show="mostrarDropdown"
                    class="DDuser w-[200px] border border-gray-200 rounded bg-white absolute z-3 top-10 right-4 p-3 shadow-lg">
                    <div class="profile mb-3">
                        <ul>
                            <li
                                class="p-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-blue-50 flex items-center gap-2">
                                <span class="material-symbols-outlined">settings</span>
                                <p>Configurações</p>
                            </li>
                        </ul>
                    </div>
                    <RouterLink :to="{ name: 'logout' }">

                    <DefaultButton buttonClass="bg-red-600 hover:bg-red-700 flex items-center gap-2 justify-center text-white" buttonSize="w-full"
                    >
                        <span class="material-symbols-outlined">
                    logout
                </span> 
                <p>
                    Logout
                </p>
                    </DefaultButton>
                    </RouterLink>
                </div>
            </transition>

        </div>


    </div>
</template>

<script setup>
import { useToggleStore } from '@/stores/toggle';
import DefaultButton from '../DefaultButton.vue';
const toggleStore = useToggleStore();
import { ref } from 'vue'
import { useMeStore } from '@/stores/auth/me';
const meStore = useMeStore();

const mostrarDropdown = ref(false)

</script>

<style scoped>
/* Nome base para a transição */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease-out;
}

/* Transição mais suave na saída */
.dropdown-leave-active {
    transition-duration: 0.15s;
    transition-timing-function: ease-in;
}

/* Estado inicial ao entrar */
.dropdown-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(-0.5rem);
    /* -translate-y-2 */
}

/* Estado final ao entrar */
.dropdown-enter-to {
    opacity: 1;
    transform: scale(1) translateY(0);
}

/* Estado inicial ao sair */
.dropdown-leave-from {
    opacity: 1;
    transform: scale(1) translateY(0);
}

/* Estado final ao sair */
.dropdown-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-0.5rem);
    /* -translate-y-2 */
}
</style>