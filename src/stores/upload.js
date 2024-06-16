// stores/fileStore.js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { axiosUploadFile } from '@/api/userApi';
import { useUserStore } from '@/stores/user.js'

export const useUploadStore = defineStore('uploadStore', () => {
  const userStore = useUserStore()

  const uploadFile = async(file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('https://music-tutor-backend.onrender.com/upload/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)music_tutor\s*=\s*([^;]*).*$)|^.*$/, '$1'),
        },
      });
      console.log('Upload response:', res.data.fileUrl);
      return res.data.fileUrl[0]
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  return {
    uploadFile,
  }
})
