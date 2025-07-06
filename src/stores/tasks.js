import { defineStore } from "pinia";
import axios from "axios";
import { useLoadingStore } from "./loading";
const loadingStore = useLoadingStore();



export const useTaskStore = defineStore("tasks", {
    state: () => ({
        tasks: [],
        task: '',
        tasksCount: 0,
        tasksCompleted: 0

    }),
    actions: {
        getTasks() {
            loadingStore.startLoading();

            return axios.get('/api/tasks')
                .then(response => {
                    this.tasks = response.data.tasks;
                    this.tasksCount = response.data.tasks_count;
                    this.tasksCompleted = response.data.completed_tasks_count;

                }).finally(() => {

                    loadingStore.stopLoading();

                });

        },

        createTask(title) {
            return axios.post('/api/create-task', title)
                .then(response => {
                    this.tasks.unshift(response.data.data);
                    this.tasksCount++;
                })
        },
        completeTask(taskId) {

            const task = this.tasks.find(task => task.id === taskId);

            return axios.put(`/api/update-task/${taskId}`).then(() => {
                task.completed = !task.completed
                if (!task.completed) {
                    this.tasksCompleted--;
                } else {
                    this.tasksCompleted++;
                }
            })

        },
    },
});