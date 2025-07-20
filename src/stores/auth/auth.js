import { defineStore } from "pinia";
import axios from "axios";

import { useMeStore } from "./me";



export const useAuthStore = defineStore("auth", {
    state: () => ({
        Loading: false
    }),
    getters: {},
    actions: {
        sanctum() {
            return axios.get("/sanctum/csrf-cookie");
        },

        login(email, password) {
            return axios.post("api/login", {
                email,
                password
            })
                .then(response => {
                    const meStore = useMeStore();
                    meStore.getMe();
                    meStore.user = response.data.data;

                });
        },

        logout() {
            return axios.post('api/logout')
            .then(() => {
                const meStore = useMeStore();
                meStore.$reset();
            });
        },

        registerCompany(values) {
            
            return axios.post('/api/company-register', values)
            
        },

        verifyEmail(token) {
            
            return axios.post('/api/verify-email', {
                token: token
            })
            
        },
    },
});