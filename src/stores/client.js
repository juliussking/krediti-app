import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import axios from "axios";

export const useClientStore = defineStore("client", {
    state: () => ({
        clients: [],
        clientProfile: {},
        clients_count: 0,
        clients_active: 0,
        clients_paid_off: 0,
        clients_due: 0
    }),
    actions: {

        getClients() {
            const loadingStore = useLoadingStore();

            loadingStore.startLoading();

            return axios.get('/api/clients')
                .then(response => {
                    this.clients = response.data.clients;
                })
                .finally(() => {
                    loadingStore.stopLoading();
                })
        },

        getStatistics() {
            const loadingStore = useLoadingStore();

            loadingStore.startLoading();

            return axios.get('/api/clients/statistics')
                .then(response => {
                    this.clients_count = response.data.clients_count;
                    this.clients_active = response.data.clients_active;
                    this.clients_paid_off = response.data.clients_paid_off;
                    this.clients_due = response.data.clients_due;
                })
                .finally(() => {
                    loadingStore.stopLoading();
                });
        },
        getClientProfile(clientId) {
            const loadingStore = useLoadingStore();

            loadingStore.startLoading();


            return axios.get(`/api/client-profile/${clientId}`)
                .then(response => {
                    this.clientProfile = response.data.data;
                })
                .finally(() => {
                    
                    loadingStore.stopLoading();

                })

        },

        registerClients(values) {
            return axios.post('/api/client-register', values)
        },

        deleteClient(clientId) {
            const index = this.clients.findIndex(client => client.id === clientId);

            return axios.delete(`/api/client-delete/${clientId}`)
            .then(() => {
                
                if(index >= 0) {
                    this.clients.splice(index, 1);
                }
            });
            
        },

    },
    getters: {


    },
});