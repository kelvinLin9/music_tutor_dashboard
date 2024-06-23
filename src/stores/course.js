// stores/fileStore.js
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { handleErrorAsync } from '@/mixins/utils';
import { Toast, Alert, Swal } from '@/mixins/swal';
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
  const page = ref(1)
  const limit = ref(10)
  const totalPages = ref(1)
  const sortBy = ref('createdAt')

  const getCourses = handleErrorAsync(
    async(params) => {
      courseLoading.value = true;
      const res = await axiosGetCourses(params);
      console.log(res)
      courses.value = res.data.data;
      page.value = res.data.pagination.page
      totalPages.value = res.data.pagination.totalPages
      limit.value = res.data.pagination.limit

      console.log('getCourses', courses.value)
    }, () => courseLoading.value = false)

  
  const getCourse = handleErrorAsync(
    async(id) => {
      courseLoading.value = true;
      const res = await axiosGetCourse(id);
      course.value = res.data;
      console.log('getCourse', course.value)
    }, () => courseLoading.value = false)  


  const editCourse = handleErrorAsync(async() => {
    courseLoading.value = true;
    const res = await axiosEditCourse(courseTemp.value);
    course.value = res.data;
    console.log('editCourse', course.value)
  }, () => courseLoading.value = false)  

  const addCourse = handleErrorAsync(async() => {
    courseLoading.value = true
    const res = await axiosAddCourse(courseTemp.value)
    console.log(res)
  }, () => courseLoading.value = false)

  const deleteCourse = handleErrorAsync(async(id) => {
    Swal.fire({
      title: '確定要刪除這個課程嗎？',
      text: "你將無法撤銷此操作！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的，刪除它！',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        courseLoading.value = true;
        axiosDeleteCourse(id).then(res => {
          console.log(res);
          getCourses();
        }).finally(() => courseLoading.value = false)
      }
    })
  })


  return {
    courseLoading,
    courses,
    course,
    courseTemp,
    page,
    limit,
    totalPages,
    sortBy,
    getCourses,
    getCourse,
    editCourse,
    addCourse,
    deleteCourse,

  }
})
