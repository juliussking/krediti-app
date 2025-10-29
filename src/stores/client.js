import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import axios from "axios";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [],
    clientProfile: {},
    clientProfileReferenceContacts: [],
    clients_count: 0,
    clients_active: 0,
    clients_paid_off: 0,
    clients_due: 0,
    meta: {
      current_page: 1,
      last_page: 1,
      links: [],
      clients_new_this_month: 0,
      percent_client_active_this_month_vs_last_month: 0,
      percent_client_due_this_month_vs_last_month: 0,
      percent_client_paid_off_this_month_vs_last_month: 0
    },
  }),
  actions: {
    getClients() {
      const loadingStore = useLoadingStore();

      loadingStore.startLoading();

      return axios
        .get('api/clients')
        .then((response) => {
          this.clients = response.data.clients;
          this.clients_count = response.data.clients_count;
          this.clients_active = response.data.clients_active;
          this.clients_paid_off = response.data.clients_paid_off;
          this.clients_due = response.data.clients_due;
          this.meta.current_page = response.data.meta.current_page;
          this.meta.last_page = response.data.meta.last_page;
          this.meta.links = response.data.links;


        })
        .finally(() => {
          loadingStore.stopLoading();
        });
    },

    getWithFilters(queryString) {

      return axios
        .get(`api/clients?${queryString}`)
        .then((response) => {

          this.clients = response.data.clients;
          this.meta.current_page = response.data.meta.current_page;
          this.meta.last_page = response.data.meta.last_page;
          this.meta.links = response.data.meta.links;

        });

    },

    getStatistics() {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();

      return axios
        .get("api/clients/statistics")
        .then((response) => {
          this.clients_count = response.data.clients_count;
          this.clients_active = response.data.clients_active;
          this.clients_paid_off = response.data.clients_paid_off;
          this.clients_due = response.data.clients_due;

          this.meta.clients_new_this_month = response.data.clients_new_this_month;
          this.meta.percent_client_active_this_month_vs_last_month = response.data.percent_client_active_this_month_vs_last_month;
          this.meta.percent_client_due_this_month_vs_last_month = response.data.percent_client_due_this_month_vs_last_month;
          this.meta.percent_client_paid_off_this_month_vs_last_month = response.data.percent_client_paid_off_this_month_vs_last_month;

          

        })
        .finally(() => {
          loadingStore.stopLoading();
        });
    },

    getClientProfile(clientId) {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();

      return axios
        .get(`api/client-profile/${clientId}`)
        .then((response) => {
          this.clientProfile = response.data.client;
          this.clientProfileReferenceContacts = response.data.referenceContacts;
        })
        .finally(() => {
          loadingStore.stopLoading();
        });
    },

    updateClient(clientId) {
      return axios.put(`api/client-update/${clientId}`, {
        name: this.clientProfile.name,
        email: this.clientProfile.email,
        person_type: this.clientProfile.person_type,
        birth_date: this.clientProfile.birth_date,
        gender: this.clientProfile.gender,
        marital_status: this.clientProfile.marital_status,
      });
    },

    updateAddress(clientId) {
      return axios.put(`api/client-address-update/${clientId}`, {
        zipcode: this.clientProfile.zipcode,
        street: this.clientProfile.street,
        neighbor: this.clientProfile.neighbor,
        city: this.clientProfile.city,
        number: this.clientProfile.number,
        reference_point: this.clientProfile.reference_point,
      });
    },

    registerClients(values) {
      return axios.post("api/client-register", values);
    },

    deleteClient(clientId) {
      const index = this.clients.findIndex((client) => client.id === clientId);

      return axios.delete(`api/client-delete/${clientId}`).then(() => {
        if (index >= 0) {
          this.clients.splice(index, 1);
        }
        // opcional: recarregar página atual para manter paginação
        this.getClients(this.meta.current_page);
      });
    },
  },
});
