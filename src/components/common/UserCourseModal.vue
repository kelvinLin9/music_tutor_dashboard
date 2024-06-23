<template>
  <div class="modal fade" id="UserCourseModal" tabindex="-1" aria-labelledby="UserCourseModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="UserCourseModalLabel">個人課程資料</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="" v-for="item in userCourse" :key="item._id">
            {{ item.name }}
          </div>
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
  userCourse: {
    type: Array,
  },
})

</script>

<style scoped>
.photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>