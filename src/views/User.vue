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
                                    <th scope="col">Courses</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Publish</th>
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
                                      {{ item.courses }}
                                    </td>
                                    <td>
                                      {{ item.userRole }}
                                    </td>
                                    <td>
                                      <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                        <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUserModal" @click="userInfo = item">
                                        <i class="bi bi-pen text-white"></i>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="btn btn-primary">
                                        <i class="bi bi-trash text-white"></i>
                                      </div>
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

  <UserEdit :userInfo="userInfo" @update:user-info="updateUser"/>
</template>

<script setup>
import UserEdit from '@/components/common/UserEdit.vue'
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useUserStore } from '@/stores/user123.js'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const getUsers = userStore.getUsers

const userInfo = ref({})
onMounted(() => {
    getUsers()
})
</script>
