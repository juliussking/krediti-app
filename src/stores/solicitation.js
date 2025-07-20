import { defineStore } from "pinia";
import axios from "axios";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();

export const useSolicitationStore = defineStore("solicitation", {
    state: () => ({
        solicitations: [],
        solicitations_count: 0,
        solicitations_approved: 0,
        solicitations_pending: 0,
        solicitations_reproved: 0
    }),
    actions: {
        getSolicitations() {

            loadingStore.startLoading();
           
            return axios.get('/api/solicitations')
            .then(response => {
                console.log(response);
                this.solicitations = response.data.solicitations;      
                this.solicitations_count = response.data.solicitations_count;
                this.solicitations_approved = response.data.solicitations_approved;
                this.solicitations_pending = response.data.solicitations_pending;
                this.solicitations_reproved = response.data.solicitations_reproved;  
                       
                })
            .finally(() => {
                loadingStore.stopLoading();
            })
        },

        createSolicitation(values, id) {
            return axios.post(`/api/create-solicitation/${id}`, values)
        },

        deleteSolicitation(solicitationId) {

            const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);
            
            return axios.delete(`/api/delete-solicitation/${solicitationId}`).then(() => {
                
                if(index >= 0) {
                    this.solicitations.splice(index, 1);
                }
            })            
        },

        approveSolicitation(solicitationId, amount) {

            return axios.put(`/api/approve-solicitation/${solicitationId}`)
            .then(response => {
                
                const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);
                if(index >= 0) {
                    this.solicitations[index].status = 'Aprovada';
                    this.solicitations[index].amount_approved = amount;
                }
            })
        },

        recuseSolicitation(solicitationId) {

            return axios.put(`/api/recuse-solicitation/${solicitationId}`)
            .then(response => {

                const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);
                
                if(index >= 0) {

                    this.solicitations[index].status = 'Recusada';

                }
            })
        },

        counterofferSolicitation(values, solicitationId) {

            return axios.put(`/api/counteroffer-solicitation/${solicitationId}`, values)
            .then(response => {
                
                const index = this.solicitations.findIndex(solicitation => solicitation.id === solicitationId);

                if(index >= 0) {

                    this.solicitations[index].counteroffer = values.counteroffer;
                    this.solicitations[index].total = response.data.total;
                    this.solicitations[index].tax = values.tax;
                }

            });
        }
    },
});