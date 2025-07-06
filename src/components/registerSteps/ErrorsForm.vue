<template>
    <span>
        <p class="text-red-500 text-xs" v-if="errors[attr]">
            {{ errors[attr] }}
        </p>
    </span>
</template>

<script setup>
const props = defineProps({
    errors: Object,
    attr: String
})
</script>