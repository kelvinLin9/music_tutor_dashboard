<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click="changePage(1)">&laquo;</a>
      </li>
      <li class="page-item" v-for="page in paginationRange" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click="changePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click="changePage(totalPages)">&raquo;</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  totalPages: Number,
  initialPage: Number
});

const currentPage = ref(props.initialPage || 1);

const paginationRange = computed(() => {
  const sidePages = 2; // 頁數在當前頁左右兩側顯示的數量
  const range = [];
  let start = Math.max(currentPage.value - sidePages, 1);
  let end = Math.min(currentPage.value + sidePages, props.totalPages);

  if (start > 1) {
    range.push(1);
    if (start > 2) range.push('...');
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < props.totalPages) {
    if (end < props.totalPages - 1) range.push('...');
    range.push(props.totalPages);
  }

  return range;
});

const changePage = (page) => {
  if (page !== '...') {
    currentPage.value = page;
    // Emit an event to parent component
    emit('page-changed', page);
  }
};
</script>

<style scoped lang="scss">
// .page-item.active .page-link {
//   background-color: #4CAF50;
//   color: white;
// }
</style>