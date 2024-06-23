<template>
  <Loading v-if="couponLoading" class="position-absolute"/>          
  <div v-if="!couponLoading" 
    class="card shadow bcoupon-0 mb-7 card-wrap">
    <div class="table-responsive" >
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Coupon Code</th>
            <th scope="col">Discount</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Enabled</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item">
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.code }}
              </td>
              <td>
                {{ item.percentage }}%
              </td>
              <td>
                {{ item.expiryDate.split('T')[0] }}
              </td>
              <td>
                {{ item.isActive }}
              </td>
              <td>
                <button 
                  class="btn btn-primary me-2" 
                  data-bs-toggle="modal" 
                  data-bs-target="#couponDetailModal"
                  :disabled="userInfo.role !== 'superuser' && userInfo.role !== 'admin'"
                  @click="couponTemp = item.items"
                >
                  <i class="bi bi-pen text-white"></i>
                </button>
                <button 
                  class="btn btn-primary" 
                  :disabled="userInfo.role !== 'superuser' && userInfo.role !== 'admin'"
                  @click="deleteCoupon(item._id)"
                >
                  <i class="bi bi-trash text-white"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
      <tfoot class="card-footer bcoupon-0">
        <!-- <Pagination :totalPages="100" :initialPage="1" @page-changed="handlePageChange"/> -->
      </tfoot>
  </div>
    <!-- <CouponDetailModal
      :couponTemp="couponTemp"
    /> -->
</template>
<script setup>
// import CouponDetailModal from '@/components/common/CouponDetailModal.vue'
import Pagination from '@/components/widgets/Pagination.vue'
import Loading from '@/components/widgets/Loading.vue'
import { onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useCouponStore } from '@/stores/coupon.js'
import { useUserStore } from '@/stores/user.js'


const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)


const couponStore = useCouponStore()
const { coupons, couponTemp, couponLoading } = storeToRefs(couponStore)
const getCoupons = couponStore.getCoupons
const deleteCoupon = couponStore.deleteCoupon

onMounted(() => {
  getCoupons()
})

</script>

<style scoped lang="scss">
.card-wrap {
  position: relative;
}
</style>