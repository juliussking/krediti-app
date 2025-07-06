import { defineStore } from 'pinia'

export const useToggleStore = defineStore('toggle', {
    state: () => ({
        sidebar: false,
        ddUser: false,
        task: false
    }),
    actions: {
        toggleSidebar() {
            this.sidebar = !this.sidebar            
        },
        toggleDDUser() {
            this.ddUser = !this.ddUser
        },
        openTask() {
            this.task = true
        },
        closeTask() {
            this.task = false
        }
    },
    getters: {
        
    },
})