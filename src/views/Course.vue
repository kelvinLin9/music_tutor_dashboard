<template>
  <div class="d-flex justify-content-end">
    <button 
      class="btn btn-primary text-white mb-2"
      data-bs-toggle="modal" 
      data-bs-target="#addCourseModal" 
      @click="courseTemp = { mode: [] }"
    >
      新增課程
    </button>
  </div>
  <div class="card shadow border-0 mb-7">
      <!-- <div class="card-header">
          <h5 class="mb-0">Applications</h5>
      </div> -->
      <div class="table-responsive">
          <table class="table table-hover table-nowrap">
              <thead class="thead-light">
                  <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Teacher</th>
                      <th scope="col">Created</th>
                      <th scope="col">Update</th>
                      <th scope="col">Price</th>
                      <th scope="col">Student</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in courses" :key="item">
                      <td>
                          <!-- <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2"> -->
                          <a class="text-heading font-semibold" href="#">
                              {{ item.name }}
                          </a>
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
                        <button class="btn btn-primary" :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'">
                          <i class="bi bi-book text-white"></i>
                        </button>
                      </td>
                      <td>
                        <button 
                          class="btn btn-primary" 
                          data-bs-toggle="modal" 
                          data-bs-target="#editCourseModal" 
                          @click="courseTemp = item"
                          :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'"
                        >
                          <i class="bi bi-pen text-white"></i>
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-primary" :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'">
                          <i class="bi bi-trash text-white"></i>
                        </button>
                      </td>
                  </tr>
                </tbody>
            </table>
        </div>
        <div class="card-footer border-0 py-5">
            <!-- <span class="text-muted text-sm">Showing 10 items out of 250 results found</span> -->
        </div>
    </div>
    <!-- Button trigger modal -->
    <CourseEditModal
      :courseTemp="courseTemp"
      @update:courseTemp="editCourse"
    />
    <CourseAddModal
      :courseTemp="courseTemp"
      @add:courseTemp="addCourse"
      @update:coursePhoto="updatePhoto"
    />
    <!-- {{ courses }} -->
</template>

<script setup>
import CourseEditModal from '@/components/common/CourseEditModal.vue'
import CourseAddModal from '@/components/common/CourseAddModal.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useCourseStore } from '@/stores/course.js'
import { useUploadStore } from '@/stores/upload.js'
import { useUserStore } from '@/stores/user.js'


const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)


const courseStore = useCourseStore()
const { course, courses, courseTemp } = storeToRefs(courseStore)
const getCourses = courseStore.getCourses
const editCourse = courseStore.editCourse
const addCourse =  courseStore.addCourse


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

</script>
