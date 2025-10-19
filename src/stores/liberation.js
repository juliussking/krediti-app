import { defineStore } from "pinia";
import axios from "axios";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();

export const useLiberationStore = defineStore("liberation", {
    state: () => ({
        liberations: [],
        meta: {
            liberations_count: 0,
            liberations_approved: 0,
            liberations_pending: 0,
            liberations_reproved: 0,
            current_page: 1,
            last_page: 1
        }
    }),
    actions: {
        getLiberations() {

            loadingStore.startLoading();

            return axios.get('/api/liberations')
                .then(response => {
                    this.liberations = response.data.liberations;
                    this.meta.liberations_count = response.data.meta.liberations_count;
                    this.meta.liberations_approved = response.data.meta.liberations_approved;
                    this.meta.liberations_pending = response.data.meta.liberations_pending;
                    this.meta.liberations_reproved = response.data.meta.liberations_reproved;
                    this.meta.current_page = response.data.meta.current_page;
                    this.meta.last_page = response.data.meta.last_page;

                })
                .finally(() => {
                    loadingStore.stopLoading();
                })
        },

        getSolicitationPage(page = 1) {

            return axios.get(`/api/liberations?page=${page}`)
                .then(response => {
                    this.liberations = response.data.liberations;
                    this.meta = response.data.meta;
                })
        },

        deleteLiberation(liberationId) {
            const index = this.liberations.findIndex(liberations => liberations.id === liberationId);

            return axios.delete(`/api/delete-liberation/${liberationId}`).then(() => {

                if (index >= 0) {
                    this.liberations.splice(index, 1);
                }
            })
        },
    },
});