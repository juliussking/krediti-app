<template>
    <Navbar />

    <main class="relative">


        <div class="flex w-full">
            <div class="">
                <Sidebar />
            </div>
            <!-- {{ loadingStore.isLoading }} -->

            <div class="routerView bg-gray-100 w-full h-full p-3 pb-10">

                <div class="mt-5 h-screen w-full" v-if="loadingStore.isLoading">
                    <Loading />
                </div>
                <div v-show="!loadingStore.isLoading">

                    <router-view />
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