import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const user = ref([])
  const loading = ref(false)

  const getUsers = async () => {
    loading.value = true
    try {
      const res = await axios.get('https://music-tutor-backend.onrender.com/users');
      user.value = res.data;
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false
    }
  }

  return { 
    user, 
    loading, 
    getUsers
  }
})
