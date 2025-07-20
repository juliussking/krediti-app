import { defineStore } from "pinia";

export const useReferenceContactsStore = defineStore("referenceContacts", {
    state: () => ({
        contacts: [],

    }),
    actions: {
        getContacts
    },
    getters: {
    }
});