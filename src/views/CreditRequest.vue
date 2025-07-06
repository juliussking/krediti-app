<template>
  <div class="min-h-screen bg-gray-100 pt-6 flex justify-center items-start">
    <form @submit.prevent="submit" class="space-y-6">
      <div class="max-w-lg bg-white rounded border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Solicitar crédito para {{ clientName }}</h2>

        <section class="mb-8">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <LabelForm>Valor Solicitado</LabelForm>

              <BaseInput v-model="amount_requested" type="number" placeholder="Ex: 1000"
                :error="!!errors.amount_requested" />

              <ErrorsForm :errors="errors" attr="amount_requested" />

            </div>

            <div>

              <LabelForm>Taxa(%)</LabelForm>

              <BaseSelect :error="!!errors.tax" v-model="tax" :options="['1.19', '1.23', '1.25', '1.28', '1.31']" />

              <ErrorsForm :errors="errors" attr="tax" />

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
                Solicitar
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

import BaseSelect from '@/components/layout/BaseSelect.vue';
import LabelForm from '@/components/registerSteps/LabelForm.vue';
import BaseInput from '@/components/layout/BaseInput.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import Loading from '@/components/layout/Loading.vue';
import ErrorsForm from '@/components/registerSteps/ErrorsForm.vue';

import { useSolicitationStore } from '@/stores/solicitation';
const solicitationStore = useSolicitationStore();

import { useField, useForm } from 'vee-validate';
import { number, object, string } from 'yup';


import { useRouter } from 'vue-router';
const router = useRouter();

const clientName = route.query.name

const schema = object({
  amount_requested: number().required().label('Valor solicitado'),
  tax: string().required().label('Taxa'),
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const submit = handleSubmit((values) => {
  const id = route.query.id

  return solicitationStore.createSolicitation(values, id)
  .then(() => {
    router.push({ name: 'client-profile', params: { id: id } });
  })

})

const { value: amount_requested } = useField('amount_requested')
const { value: tax } = useField('tax')


</script>
