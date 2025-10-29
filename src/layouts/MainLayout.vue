<template>
    <Navbar />

    <main class="relative">


        <div class="flex w-full">
            <div class="">
                <Sidebar />
            </div>

            <div class="routerView bg-gray-100 w-full h-full px-3 pt-3">

                <div class="mt-5 h-screen w-full" v-if="loadingStore.isLoading">
                    <Loading />
                </div>
                <div v-show="!loadingStore.isLoading">

                    <router-view />

                    <div class="footer text-center text-gray-500 flex justify-center p-3">
                        <p>
                            Krediti {{ new Date().getFullYear() }} © - Todos os direitos reservados  
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import Navbar from '../components/layout/Navbar.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import Loading from '../components/layout/Loading.vue'

import { useLoadingStore } from '@/stores/loading';
const loadingStore = useLoadingStore()

</script>

<style>
.material-symbols-outlined {
    font-size: 20px;
}
</style>