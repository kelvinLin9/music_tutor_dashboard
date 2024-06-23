<template>
  <Loading v-if="userLoading" class="position-absolute"/> 
  <div 
    v-if="!userLoading"
    class="card shadow border-0 mb-7">
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Created</th>
            <th scope="col">Update</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.email }}
            </td>
            <td>
              {{ item.createdAt.split('T')[0] }}
            </td>
            <td>
              {{ item.updatedAt.split('T')[0] }}
            </td>
            <td>
              {{ item.role }}
            </td>
            <td>
              <button 
                class="btn btn-primary me-2" 
                :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'"
                data-bs-toggle="modal" 
                data-bs-target="#UserCourseModal" 
                @click="userTemp = item"
              >
                <i class="bi bi-book text-white"></i>
              </button>
              <button 
                class="btn btn-primary me-2" 
                data-bs-toggle="modal" 
                data-bs-target="#editUserModal" 
                @click="userTemp = item"
                :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'"
              >
                <i class="bi bi-pen text-white"></i>
              </button>
              <button 
                class="btn btn-primary" 
                :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'"
                @click="deleteUser(item._id)"
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

  <UserEditModal 
    :userTemp="userTemp" 
    @update:userTemp="updateUser"
    @update:photo="updatePhoto"
  />
  <userCourseModal 
    :userCourse="userTemp.courses" 
  />
</template>

<script setup>
import UserEditModal from '@/components/common/UserEditModal.vue'
import UserCourseModal from '@/components/common/UserCourseModal.vue'
import Pagination from '@/components/widgets/Pagination.vue'
import Loading from '@/components/widgets/Loading.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useUserStore } from '@/stores/user.js'
import { useUploadStore } from '@/stores/upload.js'



const userStore = useUserStore()
const { 
  users,
  userInfo,
  userTemp,
  userLoading,
  page,
  limit,
  totalPages,
  sortBy, 
} = storeToRefs(userStore)
const getUsers = userStore.getUsers
const editUser = userStore.editUser
const deleteUser = userStore.deleteUser


onMounted(() => {
  getUsers()
})

const uploadStore = useUploadStore()
const uploadFile = uploadStore.uploadFile



// emits
const updateUser = (data) => {
  editUser(data)
}
const updatePhoto = async(data) => {
  userTemp.value.photo = await uploadFile(data)
}
const updatePage = (page) => {
  getUsers({page: page})
}

</script>
