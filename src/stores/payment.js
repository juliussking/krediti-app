import { defineStore } from "pinia";
import axios from "axios";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();

export const usePaymentStore = defineStore("payments", {
    state: () => ({
        payments: [],
        meta: {
            payments_count: 0,
            payments_total: 0,
            payments_fator: 0,
            payments_parcial: 0,
            current_page: 1,
            last_page: 1
        }
    }),
    actions: {
        getPayments() {

            loadingStore.startLoading();

            return axios.get('/api/payments')
                .then(response => {
                    this.payments = response.data.payments;
                    this.meta.payments_count = response.data.meta.payments_count;
                    this.meta.payments_total = response.data.meta.payments_total;
                    this.meta.payments_fator = response.data.meta.payments_fator;
                    this.meta.payments_parcial = response.data.meta.payments_parcial;
                    this.meta.current_page = response.data.meta.current_page;
                    this.meta.last_page = response.data.meta.last_page;

                    console.log(response);

                })
                .finally(() => {
                    loadingStore.stopLoading();
                })
        },

        getPaymentPage(page = 1) {
            return axios.get(`/api/payments?page=${page}`)
                .then(response => {
                    this.payments = response.data.payments;
                    this.meta = response.data.meta;
                })
        },

        createPayment(values, id) {
            return axios.post(`/api/create-payment/${id}`, {
                amount: values.amount_received,
            })
        },


        deletePayment(paymentsId) {
            const index = this.payments.findIndex(payments => payments.id === paymentsId);

            return axios.delete(`/api/delete-payment/${paymentsId}`).then(() => {

                if (index >= 0) {
                    this.paymentsId.splice(index, 1);
                }
            })
        },
    },
});