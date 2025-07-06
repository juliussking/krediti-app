<template>
    <div v-if="feedbackMessage" class="w-full bg-red-500 border border-red-500 px-4 py-3 rounded mb-5">
        <h3 class="text-white text-center">{{ feedbackMessage }} <span class="material-symbols-outlined">error
            </span>
        </h3>

    </div>
</template>

<script setup>
const props = defineProps({
    feedbackMessage: {
        type: String,
        default: ''
    }
})

</script>