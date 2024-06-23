import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { handleErrorAsync } from '@/mixins/utils';
import { Swal } from '@/mixins/swal';

import { axiosGetOrders, axiosGetOrder, axiosAddOrder, axiosEditOrder, axiosDeleteOrder } from '@/api/userApi';

export const useOrderStore = defineStore('orderStore', () => {

  const orderLoading = ref(false)
  const orders = ref([])
  const order = ref({})
  const orderTemp = ref({})

  const getOrders = handleErrorAsync(
    async() => {
      orderLoading.value = true;
      const res = await axiosGetOrders();
      console.log(res);
      orders.value = res.data.data;
      console.log('getOrders', orders.value)
    }, () => orderLoading.value = false)

  
  const getOrder = handleErrorAsync(
    async(id) => {
      orderLoading.value = true;
      const res = await axiosGetOrder(id);
      console.log(res);
      order.value = res.data;
      console.log('getOrder', order.value)
    }, () => orderLoading.value = false)
    
  const editOrder = handleErrorAsync(async() => {
    orderLoading.value = true;
    const res = await axiosEditOrder(orderTemp.value);
    order.value = res.data;
    console.log('editOrder', order.value)
  }, () => orderLoading.value = false)  

  const addOrder = handleErrorAsync(async() => {
    orderLoading.value = true
    const res = await axiosAddOrder(orderTemp.value)
    console.log(res)
  }, () => orderLoading.value = false)

  const deleteOrder = handleErrorAsync(async(id) => {
    Swal.fire({
      title: '確定要刪除這個訂單嗎？',
      text: "你將無法撤銷此操作！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的，刪除它！',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        orderLoading.value = true;
        axiosDeleteOrder(id).then(res => {
          console.log(res);
          Swal.fire(
            '已刪除！',
            '你的訂單已被刪除。',
            'success'
          );
        }).catch(error => {
          console.error('刪除操作失敗：', error);
        }).finally(() => {
          orderLoading.value = false;
        });
      }
    })
  }, () => orderLoading.value = false);

  return {
    orderLoading,
    orders,
    order,
    orderTemp,

    getOrders,
    getOrder,
    editOrder,
    addOrder,
    deleteOrder,
  }
})