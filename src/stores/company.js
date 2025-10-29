import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import axios from "axios";

export const useCompanyStore = defineStore("company", {
    state: () => ({
        company: {},
        due_date: null,
        period_end: null,
        period_start: null,
        plan: null,
        price: null,
        status: null
    }),
    actions: {

        getInfo() {
            const loadingStore = useLoadingStore();

            loadingStore.startLoading();

            return axios.get('api/info-company')
                .then(response => {

                    console.log(response)

                    this.company = response.data.company;
                    this.due_date = response.data.due_date;
                    this.period_end = response.data.period_end;
                    this.period_start = response.data.period_start;
                    this.plan = response.data.plan;
                    this.price = response.data.price;
                    this.status = response.data.status;
                })
                .finally(() => {
                    loadingStore.stopLoading();
                })
        },
    }
});