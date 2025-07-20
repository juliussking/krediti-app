import { defineStore } from "pinia";
import axios from "axios";

export const useMeStore = defineStore("me", {
    state: () => ({
        user: null,
        hasSubscription: null
    }),
    actions: {
        getMe() {
            return axios.get('api/me')
            .then(response => {                
                
                this.user = response.data.data;
                this.hasSubscription = response.data.data.hasSubscription;
                
                
            });
        }
    },
    getters: {
        isLoggedIn: (state) => !!state?.user?.id
        
    }
});