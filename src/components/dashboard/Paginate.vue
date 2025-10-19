<template>
  <div class="flex justify-center items-center my-4 gap-1 select-none">
    <!-- Página anterior -->
    <button
      v-if="currentPage > 1"
      type="button"
      @click="changePage(currentPage - 1)"
      class="p-1.5 rounded hover:bg-blue-100 text-gray-600 flex items-center cursor-pointer"
    >
      <span class="material-symbols-outlined text-[20px]">keyboard_arrow_left</span>
    </button>

    <!-- Números de páginas -->
    <button
      v-for="page in pages"
      :key="page + '-' + currentPage"
      type="button"
      @click="changePage(page)"
      :disabled="page === '...'"
      :class="[
        'px-3 py-1 text-sm rounded cursor-pointer transition-colors duration-150',
        page === currentPage
          ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600'
          : 'text-gray-600 hover:bg-blue-50',
        page === '...' && 'cursor-not-allowed text-gray-400 hover:bg-transparent'
      ]"
    >
      {{ page }}
    </button>

    <!-- Próxima página -->
    <button
      v-if="currentPage < totalPages"
      type="button"
      @click="changePage(currentPage + 1)"
      class="p-1.5 rounded hover:bg-blue-100 text-gray-600 flex items-center cursor-pointer"
    >
      <span class="material-symbols-outlined text-[20px]">keyboard_arrow_right</span>
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

const emits = defineEmits(["change"]);

const maxPagesToShow = 3;

const pages = computed(() => {
  const pagesArray = [];

  // 👉 Caso com poucas páginas
  if (props.totalPages <= maxPagesToShow) {
    for (let i = 1; i <= props.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  // 👉 Caso geral
  pagesArray.push(1);

  let start = Math.max(2, props.currentPage - 1);
  let end = Math.min(props.totalPages - 1, props.currentPage + 1);

  // Ajuste para as extremidades
  if (props.currentPage <= 2) {
    end = 3;
  } else if (props.currentPage >= props.totalPages - 1) {
    start = props.totalPages - 2;
  }

  // "..." antes das intermediárias
  if (start > 2) pagesArray.push("...");

  // Páginas intermediárias
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < props.totalPages) pagesArray.push(i);
  }

  // "..." depois das intermediárias
  if (end < props.totalPages - 1) pagesArray.push("...");

  // Última página
  pagesArray.push(props.totalPages);

  return pagesArray;
});

function changePage(page) {
  if (page !== "..." && page >= 1 && page <= props.totalPages) {
    emits("change", page);
  }
}
</script>
