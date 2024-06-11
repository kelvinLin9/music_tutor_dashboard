<template>
  <div class="card shadow border-0 mb-7">
      <!-- <div class="card-header">
          <h5 class="mb-0">Applications</h5>
      </div> -->
      <div class="table-responsive">
          <table class="table table-hover table-nowrap">
              <thead class="thead-light">
                  <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Created</th>
                      <th scope="col">Update</th>
                      <th scope="col">Role</th>
                      <th scope="col">Courses</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in users" :key="item">
                      <td>
                          <!-- <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2"> -->
                          <a class="text-heading font-semibold" href="#">
                              {{ item.name }}
                          </a>
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
                        <button class="btn btn-primary" :disabled="userInfo.role !== 'superuser' && item.role !== 'admin'">
                          <i class="bi bi-book text-white"></i>
                        </button>
                      </td>
                      <td>
                        <button 
                          class="btn btn-primary" 
                          data-bs-toggle="modal" 
                          data-bs-target="#editUserModal" 
                          @click="userTemp = item"
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
    <UserEditModal 
      :userTemp="userTemp" 
      @update:user-info="updateUser"
      @update:photo="updatePhoto"
    />
</template>

<script setup>
import UserEditModal from '@/components/common/UserEditModal.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useUserStore } from '@/stores/user.js'
import { useUploadStore } from '@/stores/upload.js'



const userStore = useUserStore()
const { users, userInfo, userTemp } = storeToRefs(userStore)
const getUsers = userStore.getUsers
const editUser = userStore.editUser


onMounted(() => {
  getUsers()
})

const uploadStore = useUploadStore()
const uploadFile = uploadStore.uploadFile



// emits
const updateUser = (data) => {
  console.log(data)
  editUser(data)
}

const updatePhoto = (data) => {
  console.log(data)
  uploadFile(data)
}

</script>
