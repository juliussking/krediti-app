import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();

import axios from "axios";

export const useUserStore = defineStore("user", {
    state: () => ({
        users: null,
    }),
    actions: {

        getUser() {

            loadingStore.startLoading();

            return axios.get("/api/users")

            .then((response) => {

                this.users = response.data
                
            })
            .finally(() => {

                loadingStore.stopLoading();
                
            })
        },
    },
});