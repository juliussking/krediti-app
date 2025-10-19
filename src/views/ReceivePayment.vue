<template>
  <div class="min-h-screen bg-gray-100 pt-6 flex justify-center items-start">
    <form @submit.prevent="submit" class="space-y-6">
      <div class="max-w-lg bg-white rounded border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Receber pagamento de {{ clientName }}</h2>

        <section class="mb-8">

          <div class="grid grid-cols-1">

            <div class="msg">
              <FeedbackMessage status="error" :feedbackMessage="feedbackMessage" />
            </div>

            <div>

              <LabelForm>Valor recebido</LabelForm>

              <BaseInput v-model="amount_received" type="number" placeholder="Ex: 1000"
                :error="!!errors.amount_received" />

              <ErrorsForm :errors="errors" attr="amount_received" />

            </div>
          </div>
        </section>
        <div class="actions flex justify-end">
          <DefaultButton @click="submit"
            buttonClass="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            buttonSize="w-25 p-2" type="submit" :disabled="isSubmitting">
            <div class="flex justify-center items-center">
              <span v-if="isSubmitting">
                <Loading />
              </span>
              <span v-else>
                Receber
              </span>
            </div>
          </DefaultButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

import LabelForm from '@/components/registerSteps/LabelForm.vue';
import BaseInput from '@/components/layout/BaseInput.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import Loading from '@/components/layout/Loading.vue';
import ErrorsForm from '@/components/registerSteps/ErrorsForm.vue';

import { ref } from 'vue'

import { usePaymentStore } from '@/stores/payment';
const paymentStore = usePaymentStore();

import { useField, useForm } from 'vee-validate';
import { number, object } from 'yup';


import { useRouter } from 'vue-router';
import FeedbackMessage from '@/components/FeedbackMessage.vue';
const router = useRouter();

const clientName = route.query.clientName

const feedbackMessage = ref('')

const schema = object({
  amount_received: number().required().label('Valor recebido'),
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const submit = handleSubmit((values) => {
  const id = route.query.liberationId

  return paymentStore.createPayment(values, id)
    .then(() => {
      router.push({ name: 'client-profile', params: { id: id } });
    }).catch((error) => {
      feedbackMessage.value = error.message
    })

})

const { value: amount_received } = useField('amount_received')


</script>
