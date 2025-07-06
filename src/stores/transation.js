import { defineStore } from "pinia";

export const useTransationStore = defineStore("transation", {
    state: () => ({
        transations: [],
    }),
    actions: {},
    getters: {},
});