<template>
  <div class="flex justify-center items-center my-4 gap-1">
    <!-- Botão anterior -->
    <button
  type="button"
    v-if="currentPage > 1"
  @click="changePage(currentPage = 1)"
  class="px-3 py-1 rounded cursor-pointer hover:bg-blue-100 text-gray-600 flex items-center text-gray-600"
>
  <span class="material-symbols-outlined">
keyboard_double_arrow_left
</span>
</button>
    <button
  type="button"
    v-if="currentPage > 1"
  @click="changePage(currentPage - 1)"
  class="px-3 py-1 rounded cursor-pointer hover:bg-blue-100 text-gray-600 flex items-center text-gray-600"
>
  <span class="material-symbols-outlined ">
keyboard_arrow_left
</span>
</button>

<!-- Números das páginas -->
<button
  v-for="page in pages"
  :key="page"
  type="button"
  @click="changePage(page)"
  :disabled="page === '...'"
  :class="[
    'px-3 py-1 rounded cursor-pointer hover:bg-blue-100 text-gray-600',
    page === currentPage ? 'bg-blue-500 text-white hover:bg-blue-600 disabled:cursor-not-allowed font-semibold' : '',
    page === '...' ? 'cursor-not-allowed text-gray-400 hover:bg-transparent' : ''
  ]"
>
  {{ page }}
</button>

<!-- Botão próximo -->
<button
  type="button"
    v-if="currentPage < totalPages"
  @click="changePage(currentPage + 1)"
  class="px-3 py-1 rounded cursor-pointer hover:bg-blue-100 text-gray-600 flex items-center text-gray-600"
>
  <span class="material-symbols-outlined">
keyboard_arrow_right
</span>

</button>
<button
  type="button"
  v-if="currentPage < totalPages"
  @click="changePage(totalPages)"
  class="px-3 py-1 rounded cursor-pointer hover:bg-blue-100 text-gray-600 flex items-center text-gray-600"
>
  <span class="material-symbols-outlined">
keyboard_double_arrow_right
</span>
</button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

const emits = defineEmits(['change']);

const maxPagesToShow = 8;

const pages = computed(() => {
  const pagesArray = [];

  if (props.totalPages <= maxPagesToShow) {
    // Se tiver poucas páginas, mostra todas
    for (let i = 1; i <= props.totalPages; i++) {
      pagesArray.push(i);
    }
  } else {
    // Sempre mostrar a primeira página
    pagesArray.push(1);

    let start = props.currentPage - 3;
    let end = props.currentPage + 3;

    if (start < 2) {
      start = 2;
      end = start + 5;
    }
    if (end > props.totalPages - 1) {
      end = props.totalPages - 1;
      start = end - 5;
    }

    if (start > 2) {
      pagesArray.push('...'); // elipse inicial
    }

    for (let i = start; i <= end; i++) {
      pagesArray.push(i);
    }

    if (end < props.totalPages - 1) {
      pagesArray.push('...'); // elipse final
    }

    // Sempre mostrar a última página
    pagesArray.push(props.totalPages);
  }

  return pagesArray;
});

function changePage(page) {
  if (page !== '...' && page >= 1 && page <= props.totalPages) {
    emits('change', page);
  }
}
</script>


