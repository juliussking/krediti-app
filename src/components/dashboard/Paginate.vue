<template>
  <div class="flex justify-center items-center my-4 gap-1 select-none">
    <!-- Botão anterior -->
    <button
      v-if="hasPrevious"
      type="button"
      @click="emitChange(prevLink.url)"
      class="p-1.5 rounded hover:bg-blue-100 text-gray-600 flex items-center cursor-pointer"
    >
      <span class="material-symbols-outlined text-[20px]">keyboard_arrow_left</span>
    </button>

    <!-- Números de página -->
    <button
      v-for="(link, index) in filteredLinks"
      :key="index"
      type="button"
      @click="emitChange(link.url)"
      v-html="link.label"
      :disabled="!link.url"
      :class="[
        'px-3 py-1 text-sm rounded cursor-pointer transition-colors duration-150',
        link.active
          ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600'
          : link.url
            ? 'text-gray-600 hover:bg-blue-50'
            : 'cursor-not-allowed text-gray-400 hover:bg-transparent'
      ]"
    />

    <!-- Botão próximo -->
    <button
      v-if="hasNext"
      type="button"
      @click="emitChange(nextLink.url)"
      class="p-1.5 rounded hover:bg-blue-100 text-gray-600 flex items-center cursor-pointer"
    >
      <span class="material-symbols-outlined text-[20px]">keyboard_arrow_right</span>
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  links: { 
    type: Array, 
    required: true,
    default: () => []
   },
});

const emits = defineEmits(["change"]);

// Remove o primeiro e último item (Previous e Next) para exibir apenas os números
const filteredLinks = computed(() =>
  props.links.filter(
    (link) =>
      link.label !== "&laquo; Previous" && link.label !== "Next &raquo;"
  )
);

const hasPrevious = computed(() =>
  props.links.some((l) => l.label.includes("Previous") && l.url)
);

const hasNext = computed(() =>
  props.links.some((l) => l.label.includes("Next") && l.url)
);

const prevLink = computed(() =>
  props.links.find((l) => l.label.includes("Previous")) || {}
);

const nextLink = computed(() =>
  props.links.find((l) => l.label.includes("Next")) || {}
);

function emitChange(url) {
  if (url) emits("change", url);
}
</script>
