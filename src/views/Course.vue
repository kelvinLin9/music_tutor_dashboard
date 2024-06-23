<template>
  <Loading v-if="courseLoading" class="position-absolute"/> 
  <div 
    class="d-flex justify-content-end">
    <button 
      class="btn btn-primary text-white mb-2"
      data-bs-toggle="modal" 
      data-bs-target="#addCourseModal" 
      @click="courseTemp = { mode: [] }"
    >
      新增課程
    </button>
  </div>
  <div 
    v-if="!courseLoading"
    class="card shadow border-0 mb-7">
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Teacher</th>
            <th scope="col">Created</th>
            <th scope="col">Update</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in courses" :key="item">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.instructor?.name }}
            </td>
            <td>
              {{ item.createdAt.split('T')[0] }}
            </td>
            <td>
              {{ item.updatedAt.split('T')[0] }}
            </td>
            <td>
              {{ item.price }}
            </td>
            <td>
              <button 
                class="btn btn-primary me-2" 
                :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'"
              >
                <i class="bi bi-book text-white"></i>
              </button>
              <button 
                class="btn btn-primary me-2" 
                data-bs-toggle="modal" 
                data-bs-target="#editCourseModal" 
                @click="courseTemp = item"
                :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'"
              >
                <i class="bi bi-pen text-white"></i>
              </button>
              <button 
                class="btn btn-primary" 
                :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'"
                @click="deleteCourse(item._id)"
              >
                <i class="bi bi-trash text-white"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer bcoupon-0 d-flex justify-content-center">
      <Pagination 
        :totalPages="totalPages" 
        :initialPage="page" 
        @page-changed="updatePage"
      />
    </div>
  </div>
  <CourseEditModal
    :courseTemp="courseTemp"
    @update:courseTemp="editCourse"
  />
  <CourseAddModal
    :courseTemp="courseTemp"
    @add:courseTemp="addCourse"
    @update:coursePhoto="updatePhoto"
  />
</template>

<script setup>
import CourseEditModal from '@/components/common/CourseEditModal.vue'
import CourseAddModal from '@/components/common/CourseAddModal.vue'
import Pagination from '@/components/widgets/Pagination.vue'
import Loading from '@/components/widgets/Loading.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useCourseStore } from '@/stores/course.js'
import { useUploadStore } from '@/stores/upload.js'
import { useUserStore } from '@/stores/user.js'


const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)


const courseStore = useCourseStore()
const { 
  course,
  courses,
  courseTemp,
  courseLoading,
  page,
  limit,
  totalPages,
  sortBy, 
} = storeToRefs(courseStore)
const getCourses = courseStore.getCourses
const editCourse = courseStore.editCourse
const addCourse =  courseStore.addCourse
const deleteCourse = courseStore.deleteCourse


onMounted(() => {
  getCourses()
})

const uploadStore = useUploadStore()
const uploadFile = uploadStore.uploadFile


const updatePhoto = async(data) => {
  console.log(data)
  console.log(uploadFile(data))
  courseTemp.value.img = await uploadFile(data)
}
const updatePage = (page) => {
  console.log(page)
  getCourses({page: page})
}
</script>
