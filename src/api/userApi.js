// (裡面有axios的流程圖)https://mini-ghost.dev/posts/axios-source-code-1/
import axios from 'axios';
// import { Alert } from '@/mixins/swal';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
  headers: {
    'Content-Type': 'application/json', 
  },
});

console.log(axiosInstance.interceptors) 

// interceptors(攔截器) 目的是在發送請求前將 token 加入 headers 
axiosInstance.interceptors.request.use((config) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)music_tutor\s*=\s*([^;]*).*$)|^.*$/, '$1');
  console.log(token)
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
export const axiosLoginUser = (loginData) => axiosInstance.post('/users/login', loginData);
export const axiosSignupUser = (signupData) => axiosInstance.post('/users/signup', signupData);
export const axiosForgotPassword = (data) => axiosInstance.post('/users/forgot', data);
export const axiosCheckUser = () => axiosInstance.get('/users/check');
export const axiosGetUser = () => axiosInstance.get('/users');
export const axiosEditUser = (userData) => axiosInstance.put('/users', userData);

// Verify
// export const axiosVerifyEmail = (email) => axiosInstance.post('/verify/email', { email });
// export const axiosGenerateEmailCode = (email) => axiosInstance.post('/verify/generateEmailCode', { email });

// News(已修正 待整理)

// Culinary

// Rooms(已修正 待整理)
// export const axiosGetRooms = () => axiosInstance.get('/room')

// Orders(已修正 待整理)

// Admin/News(已修正 待整理)

// Admin/Culinary

// Admin/Rooms(已修正 待整理)

// Admin/Orders(已修正 待整理)