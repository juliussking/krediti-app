import { defineStore } from "pinia";

export const useRoleStore = defineStore("role", {
    state: () => ({
        roles: [
            {
                id: 1,
                name: "Admin",
            },
            {
                id: 2,
                name: "Gerente",
            },
            {
                id: 3,
                name: "Atendente",
            },
        ],
    }),
});