<template>
  <h2 class="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-100 p-2">Status dos clientes</h2>
  <div class="p-4 rounded w-[300px] max-h-[400px] mx-auto">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useClientStore } from '@/stores/client'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const clientStore = useClientStore()

const clientActive = computed(() => clientStore.clients_active || 0)
const clientPaidOff = computed(() => clientStore.clients_paid_off || 0)
const clientDue = computed(() => clientStore.clients_due || 0)

const chartData = computed(() => ({
  labels: ['Ativos', 'Quitados', 'Vencidos', 'A Vencer'],
  datasets: [
    {
      label: 'Situação',
      data: [clientActive.value, clientPaidOff.value, clientDue.value, 6], // ou outro valor dinâmico
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#EF4444',
        '#F59E0B'
      ],
      borderWidth: 1
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: false
    }
  }
}

onMounted(() => {

  clientStore.getStatistics();

})
</script>

