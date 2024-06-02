import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const loading = ref(false)

  


  const getUsers = async () => {
    loading.value = true
    try {
      const res = await axios.get('https://music-tutor-backend.onrender.com/admin/users', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIzYzlhOWE5OTIxODIyOGNkMjYyMjAiLCJpYXQiOjE3MTczMDUyMzYsImV4cCI6MTcxNzkxMDAzNn0.OE6XQN5B1Nvk9X2L3QIpyGBiStPmcayBk8zyJG8umnQ`
          }  // 確保替換 `token` 為實際的 token 變數
      });
      users.value = res.data.users;
      console.log(users.value);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false
    }
  }

  return { 
    users, 
    loading, 
    getUsers
  }
})
