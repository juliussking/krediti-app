import { defineStore } from "pinia";

export const useDateStore = defineStore("date", {
    state: () => ({
        date: new Date(),
        yearDate: new Date().getFullYear(),
        selectedYear: '',
    }),
    getters: {

    },
    actions: {},
});