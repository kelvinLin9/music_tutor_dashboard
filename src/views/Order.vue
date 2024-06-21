<template>
  <div class="card shadow border-0 mb-7">
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Purchase Time</th>
            <th scope="col">Order Number</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Item Purchased</th>
            <th scope="col">Amount</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item">
              <td>
                {{ item.createdAt.split('T')[0] }}
              </td>
              <td>
                {{ item._id }}
              </td>
              <td>
                {{ item.user.email }}
              </td>
              <td>
                {{ item.user.name }}
              </td>
              <td>
                <button 
                  class="btn btn-primary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#orderDetailModal"
                  :disabled="userInfo.role !== 'superuser' && userInfo.role !== 'admin'"
                  @click="orderTemp = item.items"
                >
                  <i class="bi bi-book text-white"></i>
                </button>
                <!-- {{ item.items }} -->
              </td>
              <td>
                {{ item.totalAmount }}
              </td>
              <td>
                {{ item.paymentStatus }}
              </td>
              <td>
                {{ item.paymentMethod }}
              </td>                  
              <td>
                <button 
                  class="btn btn-primary" 
                  :disabled="userInfo.role !== 'superuser' && userInfo.role !== 'admin'"
                  @click="deleteOrder(item._id)"
                >
                  <i class="bi bi-trash text-white"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <tfoot class="card-footer border-0">
        <Pagination :totalPages="100" :initialPage="1" @page-changed="handlePageChange"/>
      </tfoot>
      </div>
    <OrderDetailModal
      :orderTemp="orderTemp"
    />
</template>

<script setup>
import OrderDetailModal from '@/components/common/OrderDetailModal.vue'
import Pagination from '@/components/widgets/Pagination.vue'
import { onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useOrderStore } from '@/stores/order.js'
import { useUserStore } from '@/stores/user.js'


const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)


const orderStore = useOrderStore()
const { orders, orderTemp } = storeToRefs(orderStore)
const getOrders = orderStore.getOrders
const deleteOrder = orderStore.deleteOrder

onMounted(() => {
  getOrders()
})

</script>
