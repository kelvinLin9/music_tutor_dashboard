<template>
  <div class="modal fade" id="orderDetailModal" tabindex="-1" aria-labelledby="orderDetailModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="orderDetailModalLabel">訂單詳細資料</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ orderTemp }}
        </div>
        <!-- <div class="modal-footer">
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  orderTemp: {
    type: Object,
  },
})

const emit = defineEmits(['update:orderTemp', 'update:photo']);

function saveUserInfo() {
  emit('update:orderTemp', props.orderTemp);
}

function handleFileChange(event) {
  emit('update:photo', event.target.files[0]);
}
</script>

<style scoped>
.photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>