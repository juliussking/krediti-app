import { defineStore } from "pinia";
import axios from "axios";

export const useMeStore = defineStore("me", {
    state: () => ({
        user: null,
        roles: [],
        permissions: [],
    }),
    actions: {
        getMe() {
            return axios.get('api/me')
            .then(response => {                
                
                this.user = response.data.data;
                this.roles = response.data.data.roles;
                this.permissions = response.data.data.permissions;

            });
        }
    },
    getters: {
        isLoggedIn: (state) => !!state?.user?.id
        
    }
});