import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { handleErrorAsync } from '@/mixins/utils';
import { Swal } from '@/mixins/swal';

import { axiosGetCoupons, axiosGetCoupon, axiosAddCoupon, axiosEditCoupon, axiosDeleteCoupon } from '@/api/userApi';

export const useCouponStore = defineStore('couponStore', () => {

  const couponLoading = ref(false)
  const coupons = ref([])
  const coupon = ref({})
  const couponTemp = ref({})

  const getCoupons = handleErrorAsync(
    async() => {
      couponLoading.value = true;
      const res = await axiosGetCoupons();
      console.log(res);
      coupons.value = res.data.data;
      console.log('getCoupons', coupons.value)
    }, () => couponLoading.value = false)

  
  const getCoupon = handleErrorAsync(
    async(id) => {
      couponLoading.value = true;
      const res = await axiosGetCoupon(id);
      coupon.value = res.data;
      console.log('getCoupon', coupon.value)
    }, () => couponLoading.value = false)
    
  const editCoupon = handleErrorAsync(async() => {
    couponLoading.value = true;
    const res = await axiosEditCoupon(couponTemp.value);
    coupon.value = res.data;
    console.log('editCoupon', coupon.value)
  }, () => couponLoading.value = false)  

  const addCoupon = handleErrorAsync(async() => {
    couponLoading.value = true
    const res = await axiosAddCoupon(couponTemp.value)
    console.log(res)
  }, () => couponLoading.value = false)

  const deleteCoupon = handleErrorAsync(async(id) => {
    Swal.fire({
      title: '確定要刪除這個優惠券嗎？',
      text: "你將無法撤銷此操作！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的，刪除它！',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        couponLoading.value = true;
        axiosDeleteCoupon(id).then(res => {
          console.log(res);
          getCoupons()
        })
      }
    })
  })

  return {
    couponLoading,
    coupons,
    coupon,
    couponTemp,
    getCoupons,
    getCoupon,
    editCoupon,
    addCoupon,
    deleteCoupon
  }
});