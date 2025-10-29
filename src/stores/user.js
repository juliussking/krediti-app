import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();

import axios from "axios";

export const useUserStore = defineStore("user", {
    state: () => ({
        users: [],
        meta: {
            users_count: 0,
            users_active: 0,
            users_inactive: 0,
            users_blocked: 0,
            current_page: 1,
            last_page: 1,
            links: [],

        }
    }),
    actions: {

        getUser() {

            loadingStore.startLoading();

            return axios.get("api/users")

                .then((response) => {

                    this.users = response.data.users;
                    this.meta.links = response.data.meta.links;
                    

                })
                .finally(() => {

                    loadingStore.stopLoading();

                })
        },
        getWithFilters(queryString) {
            return axios
                .get(`api/users?${queryString}`)
                .then((response) => {

                    this.users = response.data.users;
                    this.meta.current_page = response.data.meta.current_page;
                    this.meta.last_page = response.data.meta.last_page;
                    this.meta.links = response.data.meta.links;
                })

        },

        getStatistics() {
            return axios
                .get("api/users/statistics")
                .then((response) => {
                    this.meta.users_count = response.data.meta.users_count;
                    this.meta.users_active = response.data.meta.users_active;
                    this.meta.users_inactive = response.data.meta.users_inactive;
                    this.meta.users_blocked = response.data.meta.users_blocked;
                })
        },

        userRegister(values) {
            return axios.post('api/user-register', {
                'name': values.name,
                'email': values.email,
                'password': values.password,
                'birthday': values.birthday,
                'phone': values.phone,
            }).then(response => {
                console.log(response);
            })
        }
    },
});