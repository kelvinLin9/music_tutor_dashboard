// stores/fileStore.js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { handleErrorAsync } from '@/mixins/utils';
import { useUserStore } from '@/stores/user.js'
import { 
  axiosGetCourses,
  axiosGetCourse,
  axiosEditCourse,
  axiosAddCourse,
  axiosDeleteCourse, 
} from '@/api/userApi';

export const useCourseStore = defineStore('courseStore', () => {
  const userStore = useUserStore()

  const courseLoading = ref(false)
  const courses = ref([])
  const course = ref({})
  const courseTemp = ref({})
  const getCourses = handleErrorAsync(
    async() => {
      courseLoading.value = true;
      const res = await axiosGetCourses();
      courses.value = res.data;
      console.log('getCourses', courses.value)
    }, () => courseLoading.value = false)

    
  const EditCourse = handleErrorAsync(async() => {
    courseLoading.value = true;
    const res = await axiosEditCourse(courseTemp.value);
    course.value = res.data;
    console.log('EditCourse', course.value)
  }, () => courseLoading.value = false)  

  const AddCourse = handleErrorAsync(async() => {
    courseLoading.value = true
    const res = await axiosAddCourse(courseTemp.value)
    console.log(res)
  }, () => courseLoading.value = false)



  return {
    courseLoading,
    courses,
    course,
    courseTemp,
    getCourses,
    EditCourse,
    AddCourse,
  }
})
