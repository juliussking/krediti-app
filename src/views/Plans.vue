<template>
  <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8" v-for="plan in plans" :key="plan.id">
    <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
      <div class="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
      </div>
    </div>

    <span v-if="loading">
      <Loading />
    </span>

    <template v-else>
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-7xl font-semibold text-gray-900">{{ plan.name }}</h2>
        <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">Escolha o melhor
          para
          sua empresa</p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">Choose an
        affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and
        driving sales.</p>
      <div
        class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        <div
          class="rounded-3xl rounded-t-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
          <h3 id="tier-hobby" class="text-base/7 font-semibold text-blue-600">Mensal</h3>
          <p class="mt-4 flex items-baseline gap-x-2">
            <span class="text-5xl font-semibold tracking-tight text-gray-900">{{ formatCurrency(plan.price_monthly)
            }}</span>
            <span class="text-base text-gray-500">/mês</span>
          </p>
          <p class="mt-6 text-base/7 text-gray-600">O plano perfeito pra você que gosta de ter controle de tudo que
            acontece na sua empresa.</p>
          <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              5 Usuários
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              3 Cargos (Admin, gerente, funcionario)
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              Advanced analytics
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              24-hour support response time
            </li>
          </ul>
          <button @click="subscribeMonthly(plan.id)" aria-describedby="tier-hobby"
            class="mt-8 w-full block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-blue-600 ring-1 ring-blue-200 ring-inset hover:ring-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:mt-10">Assinar
            plano mensal</button>
        </div>
        <div class="relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10">
          <h3 id="tier-enterprise" class="text-base/7 font-semibold text-blue-400">Anual</h3>
          <p class="mt-4 flex items-baseline gap-x-2">
            <span class="text-5xl font-semibold tracking-tight text-white">{{ formatCurrency(plan.price_yearly)
            }}</span>
            <span class="text-base text-gray-400">/ano</span>
          </p>
          <p class="mt-6 text-base/7 text-gray-300">Plano perfeito pra quem quer ter + controle e + economia.</p>
          <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              10 Usuários
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              Relatórios avançados
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              Cargos ilimitados e personalizados
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              Dedicated support representative
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              Marketing automations
            </li>
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                data-slot="icon">
                <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clip-rule="evenodd" />
              </svg>
              Custom integrations
            </li>
          </ul>
          {{ loadingYearly.isLoading }}
          <DefaultButton buttonClass="px-4 mt-8 bg-blue-500 text-white py-2 disabled:opacity-50
            cursor-pointer disabled:cursor-not-allowed hover:bg-blue-600" buttonSize="w-full p-2"
            @click="subscribeMonthly(plan.id)" type="button">

          <template v-if="loadingYearly.isLoading">

            <Loading />

          </template>
          <template v-else>
            Assinar plano Anual
          </template>

          </DefaultButton>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import DefaultButton from '@/components/DefaultButton.vue';
import { formatCurrency } from '@/utils/helpers';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useLoading } from '@/composables/useLoading';
import Loading from '@/components/layout/Loading.vue';
const loadingMonthly = useLoading()
const loadingYearly = useLoading()

const plans = ref([])
const loading = ref(true)
const frequency = ref('monthly')

onMounted(() => {
  getPlans();
})

function getPlans() {

  loading.value = true

  axios.get('/api/plans').then((response) => {
    plans.value = response.data.data
  })
    .finally(() => {
      loading.value = false
    })
}

function subscribeMonthly(planId) {
  frequency.value = 'monthly'
  subscribe(planId)
}

function subscribeYearly(planId) {
  frequency.value = 'yearly'
  subscribe(planId)
}


function subscribe(planId) {

  axios.post('/api/subscription', {
    plan_id: planId,
    frequency: frequency.value

  }).then(response => {
    // router.push(response.data.subscription_url) 
    window.location.href = response.data.subscription_url
  }).finally(() => {
    loadingMonthly.isLoading = false
  })
}



</script>