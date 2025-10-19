import { defineStore } from "pinia";
import axios from "axios";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();

export const useSolicitationStore = defineStore("solicitation", {
    state: () => ({
        solicitations: [],
        meta: {
            solicitations_count: 0,
            solicitations_approved: 0,
            solicitations_pending: 0,
            solicitations_reproved: 0,
            current_page: 1,
            last_page: 1
        }
    }),
    actions: {
        getSolicitations() {

            loadingStore.startLoading();

            return axios.get('/api/solicitations')
                .then(response => {
                    this.solicitations = response.data.solicitations;
                    this.meta.solicitations_count = response.data.meta.solicitations_count;
                    this.meta.solicitations_approved = response.data.meta.solicitations_approved;
                    this.meta.solicitations_pending = response.data.meta.solicitations_pending;
                    this.meta.solicitations_reproved = response.data.meta.solicitations_reproved;
                    this.meta.current_page = response.data.meta.current_page;
                    this.meta.last_page = response.data.meta.last_page;

                    console.log(this.meta);

                })
                .finally(() => {
                    loadingStore.stopLoading();
                })
        },

        getSolicitationPage(page = 1) {

            return axios.get(`/api/solicitations?page=${page}`)
                .then(response => {
                    this.solicitations = response.data.solicitations;
                    this.meta = response.data.meta;
                })
        },

        createSolicitation(values, id) {
            return axios.post(`/api/create-solicitation/${id}`, values)
        },


        deleteSolicitation(solicitationId) {
            const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);

            return axios.delete(`/api/delete-solicitation/${solicitationId}`).then(() => {

                if (index >= 0) {
                    this.solicitations.splice(index, 1);
                }
            })
        },

        approveSolicitation(solicitationId, amount) {

            return axios.put(`/api/approve-solicitation/${solicitationId}`)
                .then(response => {

                    const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);
                    if (index >= 0) {
                        this.solicitations[index].status = 'Aprovada';
                        this.solicitations[index].amount_approved = amount;
                    }
                })
        },

        recuseSolicitation(solicitationId) {

            return axios.put(`/api/recuse-solicitation/${solicitationId}`)
                .then(response => {

                    const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);

                    if (index >= 0) {

                        this.solicitations[index].status = 'Recusada';

                    }
                })
        },

        counterofferSolicitation(values, solicitationId) {

            return axios.put(`/api/counteroffer-solicitation/${solicitationId}`, values)
                .then(response => {

                    const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);

                    if (index >= 0) {

                        this.solicitations[index].counteroffer = values.counteroffer;
                        this.solicitations[index].total = response.data.total;
                        this.solicitations[index].tax = values.tax;
                    }

                });
        }
    },
});