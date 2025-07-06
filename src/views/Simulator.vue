<template>
  <div class="min-h-screen bg-gray-100 pt-6 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white rounded border border-gray-200 p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Simulador de crédito</h2>

      <!-- Seção: Simulação -->
      <section class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Valor do Crédito</label>
            <input v-model.number="form.amount" type="number" class="input border border-gray-300 rounded p-2 w-full"
              placeholder="Ex: 1000" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Taxa (%)</label>
            <select v-model="form.tax" class="border border-gray-300 p-2 rounded w-full text-gray-800 bg-white">
              <option value="1.19">19%</option>
              <option value="1.23">23%</option>
              <option value="1.25">25%</option>
              <option value="1.28">28%</option>
              <option value="1.31" selected>31%</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Prazo (dias)</label>
            <input v-model.number="form.days" type="number" class="input border border-gray-300 rounded p-2 w-full"
              placeholder="Ex: 30" />
          </div>
        </div>
      </section>

      <section v-if="result !== null" class="mb-6">
        <div class="p-4 bg-gray-100 border border-gray-300 rounded text-gray-800">
          <p>
            Valor final do crédito de <strong>R$ {{ form.amount }}</strong> a pagar em
            <strong>{{ form.days }}</strong> dias:
          </p>
          <p><strong>Total: R$ {{ result }}</strong></p>
          <p><strong>Taxa: {{ ((form.tax - 1) * 100).toFixed(0) }}% / mês</strong></p>
          <p><strong>Fator: R$ {{ fator }}</strong></p>

          <p class="mt-2 text-red-600">
            *Em caso de atraso o cliente será penalizado com multa de <strong>2%</strong> em cima do valor
            do crédito concedido + <strong>1%</strong> ao mês.
          </p>

          <div class="border border-gray-300 rounded p-2 mt-2">
            <h1 class="font-semibold mb-2">Em caso de atraso (neste cenário)</h1>
            <p>
              Dias de atraso:
              <input type="number" class="border border-gray-300 rounded p-1 bg-white w-16"
                v-model.number="form.daysLate" />
            </p>
            <p>Total:<strong> R$ {{ resultWithPenalty }}</strong> </p>
            <p>Fator: <strong>R$ {{ fatorWithPenalty }} ({{ form.daysLate }} dia(s) de atraso)</strong></p>
            <p>Multa fixa (2%): <strong>R$ {{ penaltyValue }}</strong></p>
            <p>Multa/dias (0,33%): <strong>R$ {{ penaltyDayValue }}</strong> // <strong>1%</strong> ao mês</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const form = ref({
  amount: 100,
  tax: null,
  days: null,
  daysLate: 5
})

  if (form.value.amount <= 0) {
    form.value.amount = 1
  }

const result = ref(null)
const resultWithPenalty = ref(null)
const fatorWithPenalty = ref(null)
const fator = ref(null)
const penaltyValue = ref(null)
const penaltyDayValue = ref(null)

watch(
  () => [form.value.amount, form.value.tax, form.value.days, form.value.daysLate],
  calcular,
  { deep: true }
)


function calcular() {
  const { amount, tax, days, daysLate } = form.value

  if (!amount || !tax || !days) {
    result.value = null
    return
  }

  if (form.value.daysLate <= 0) {
    form.value.daysLate = 1
  }

  const fixedTaxForDay = (tax - 1) / 30

  result.value = (amount + (fixedTaxForDay * days * amount)).toFixed(2)
  fator.value = (result.value - amount).toFixed(2)

  //ATRASO

  const penaltyTax = 1.02
  const fixedPenaltyTaxForDay = 0.000333

  resultWithPenalty.value = (result.value * penaltyTax + (result.value * fixedPenaltyTaxForDay * daysLate)).toFixed(2)
  fatorWithPenalty.value = (resultWithPenalty.value - amount).toFixed(2)

  penaltyValue.value = ((result.value * penaltyTax) - result.value).toFixed(2)

  penaltyDayValue.value = (result.value * fixedPenaltyTaxForDay * daysLate).toFixed(2)


}

</script>
