// (裡面有axios的流程圖)https://mini-ghost.dev/posts/axios-source-code-1/
import axios from 'axios';
// import { Alert } from '@/mixins/swal';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
  // headers: {
  //   // 'Content-Type': 'application/json', 
  //   // 'Content-Type': 'multipart/form-data',
  // },
});

// console.log(axiosInstance.interceptors) 

// interceptors(攔截器) 目的是在發送請求前將 token 加入 headers 
axiosInstance.interceptors.request.use((config) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)music_tutor\s*=\s*([^;]*).*$)|^.*$/, '$1');
  // console.log(token)
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 在響應傳遞到 then() 或 catch() 之前攔截，原本想將錯誤訊息統一處理，但是通用性不足，先註解掉，之後應該會拿掉
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});
// --------------------------------------------------------------------


// Api 整理在這裡
// User
export const axiosLogin= (loginData) => axiosInstance.post('/users/login', loginData);
export const axiosSignup = (signupData) => axiosInstance.post('/users/signup', signupData);
export const axiosForgotPassword = (data) => axiosInstance.post('/users/forgot', data);
export const axiosCheck = () => axiosInstance.get('/users/check');
export const axiosGetUser = () => axiosInstance.get(`/users/profile`);
export const axiosUploadFile = () => axiosInstance.post('/upload/file');
export const axiosEditUser = (userData) => axiosInstance.put('/users', userData);

// Verify
// export const axiosVerifyEmail = (email) => axiosInstance.post('/verify/email', { email });
// export const axiosGenerateEmailCode = (email) => axiosInstance.post('/verify/generateEmailCode', { email });

// Courses
export const axiosGetCourses = (params) => axiosInstance.get('/courses', {params: params});
export const axiosGetCourse = (id) => axiosInstance.get(`/courses/${id}`);
export const axiosEditCourse = (courseData) => axiosInstance.put(`/courses/${courseData._id}`, courseData);
export const axiosAddCourse = (courseData) => axiosInstance.post('/courses', courseData);
export const axiosDeleteCourse = (id) => axiosInstance.delete(`/courses/${id}`);

// Orders
export const axiosGetOrders = (params) => axiosInstance.get('/orders',{params: params});
export const axiosGetOrder = (id) => axiosInstance.get(`/orders/${id}`);
export const axiosAddOrder = (orderData) => axiosInstance.post('/orders', orderData);
export const axiosEditOrder = (orderData) => axiosInstance.put(`/orders/${orderData._id}`, orderData);
export const axiosDeleteOrder = (id) => axiosInstance.delete(`/orders/${id}`);

// Coupons
export const axiosGetCoupons = (params) => axiosInstance.get('/coupons', {params: params});
export const axiosGetCoupon = (id) => axiosInstance.get(`/coupons/${id}`);
export const axiosAddCoupon = (couponData) => axiosInstance.post('/coupons', couponData);
export const axiosEditCoupon = (couponData) => axiosInstance.put(`/coupons/${couponData._id}`, couponData);
export const axiosDeleteCoupon = (id) => axiosInstance.delete(`/coupons/${id}`);



// Admin/User
export const axiosAdminGetUsers = (params) => axiosInstance.get('/admin/users',{
  params: params,
});
export const axiosAdminEditUser = (userData) => axiosInstance.put('admin/users', userData);
export const axiosAdminDeleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);
// Admin/News(已修正 待整理)

// Admin/Culinary

// Admin/Rooms(已修正 待整理)

// Admin/Orders(已修正 待整理)