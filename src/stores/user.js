import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();

import axios from "axios";

export const useUserStore = defineStore("user", {
    state: () => ({
        users: null,
        meta:{
            current_page: 1,
            last_page: 1
        }
    }),
    actions: {

        getUser() {

            loadingStore.startLoading();

            return axios.get("/api/users")

            .then((response) => {

                this.users = response.data.users
                
            })
            .finally(() => {

                loadingStore.stopLoading();
                
            })
        },
        getUserPage(page = 1) {

            return axios.get(`/api/users?page=${page}`)
            .then((response) => {
                this.users = response.data.users;
                this.meta = response.data.meta;
            })
        },

        userRegister(values){
            return axios.post('/api/user-register', {
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