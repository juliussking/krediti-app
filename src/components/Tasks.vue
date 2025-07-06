<template>

    <div class="tasks h-[400px] overflow-y-auto relative">
        <div class="taskHeader flex justify-between items-center sticky top-0 bg-white">
            <h1 class="text-lg font-semibold text-gray-800 p-2 border-b border-gray-100">Tarefas</h1>
            <span class="text-sm text-gray-500 p-2 border-b border-gray-100 mr-2">{{ taskStore.tasksCompleted }}/{{ taskStore.tasksCount }}</span> <span class="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100  cursor-pointer mr-2"
                @click="$emit('openModalTask')">Nova tarefa</span>
        </div>

        <div class="taskBody hover:bg-gray-50 cursor-pointer p-3 flex justify-between items-center"
            v-for="task in taskStore.tasks" :key="task.id">
            <div class="taskBodyText w-full">
                <h2 class="text-md font-semibold text-gray-800 italic">{{ task.title }}</h2>
                <div class="dateAndAuthor flex w-full">
                    <p class="text-gray-500 text-sm">Por: {{ task.author }}</p>
                    <p class="text-gray-500 text-xs ml-auto mr-2">{{ task.created_at }}</p>
                </div>
            </div>

            <div class="flex justify-center items-center w-[24px] h-[24px]" @click="completeTask(task.id)">
                <span 
                :class="['material-symbols-outlined', task.completed ? 'text-green-500' : 'text-gray-500']"
                v-if="!formLoading[task.id]"
                >
                    check_circle
                </span>
                <span class="loader border-2 border-blue-500" v-else>

                </span>
            </div>
        </div>
    </div>


</template>
<script setup>
import { onMounted, ref } from 'vue';

import { useTaskStore } from '@/stores/tasks';
const taskStore = useTaskStore();

const emit = defineEmits(['openModalTask'])


const formLoading = ref({})

function completeTask(taskId) {
    formLoading.value[taskId] = true
    taskStore.completeTask(taskId)
    .finally(() => {
        formLoading.value[taskId] = false
    })
}

onMounted(() => {
    taskStore.getTasks();
})
</script>

<style scoped>
.loader {
  width: 20px;
  height: 20px;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 500ms linear infinite;

}

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

    .material-symbols-outlined {
  font-size: 23px;
}
</style>