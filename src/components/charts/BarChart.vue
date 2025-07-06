<template>
  <div class="bg-white p-4 rounded w-full">
    <h2 class="text-lg font-semibold text-gray-700 border-b border-gray-100 mb-4">Vendas por Mês</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'R$ em Vendas',
      data: [1200, 1900, 3000, 500, 2000, 3300],
      backgroundColor: '#3B82F6' // azul Tailwind
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>
