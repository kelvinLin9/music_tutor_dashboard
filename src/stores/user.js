import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { Toast, Alert, Swal } from '@/mixins/swal';
import { handleErrorAsync } from '@/mixins/utils';
import { 
  axiosSignup,
  axiosLogin,
  axiosGoogleLogin,
  axiosCheck,
  axiosEditUser,
  axiosGetUser,
  // axiosVerifyEmail,
  // axiosGenerateEmailCode,
  axiosAdminGetUsers,
  axiosAdminEditUser,
  axiosAdminDeleteUser,
} from '@/api/userApi';

export const useUserStore = defineStore('userStore', () => {
  const router = useRouter();
  
  // login
  const userInfo = ref({});
  const showLogInPage = ref(true);
  const loginLoading = ref(false);
  const login = handleErrorAsync(
    async(data) => {
      loginLoading.value = true;
      const res = await axiosLogin(data);
      document.cookie = `music_tutor_beta=${res.data.token}`;
      userInfo.value = res.data.user;
      console.log('login', userInfo.value)
      Toast.fire({
        icon: 'success',
        title: '登入成功'
      });
      router.push('/');
      return true
    }, () => loginLoading.value = false)

  const googleLogin = handleErrorAsync(
    async(token) => {
      console.log('googleLogin', token)
      loginLoading.value = true
      const res = await axiosGoogleLogin(token);
      console.log(res)
      if(res.data.status === true) {
        console.log(res.data.token)
        const days = 7;
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `music_tutor_beta=${res.data.token}; expires=${date.toUTCString()}; path=/; secure; samesite=Strict`;
              
        userInfo.value = res.data.user;
        console.log('googleLogin', userInfo.value)
        Toast.fire({
          icon: 'success',
          title: '登入成功'
        });
        router.push('/');
      }
    }, () => loginLoading.value = false)
  

  // signup
  const signupLoading = ref(false);
  const signup = handleErrorAsync(
    async (data) => {
      signupLoading.value = true;
      const res = await axiosSignup(data);
      console.log(res);
      Toast.fire({
        icon: 'success',
        title: '註冊成功，請登入'
      });
      showLogInPage.value = true;
    }, 
    () => signupLoading.value = false
  );

  // check
  const checkUser = async () => {
      try {
        const res = await axiosCheck();
        console.log(res)
        userInfo.value = res.data.user;
        if(!userInfo.value) {
          router.push('/login')
        }
        console.log('checkUser 驗證成功');
      } catch (error) {   
        console.log('checkUser 驗證失敗', error)
        router.push('/login')
      }
      // console.log('checkUser 驗證成功');
    }
    // const checkUser = handleErrorAsync(
    //   async () => {
    //     const res = await axiosCheck();
    //     console.log(res)
    //     userInfo.value = res.data.user;
    //     if(!userInfo.value) {
    //       router.push('/login')
    //     }
    //     // console.log('checkUser 驗證成功');
    //   }
    // )

  // logout
  const logout = () => {
    document.cookie = `music_tutor_beta=`;
    userInfo.value = {}
    Toast.fire({
      icon: 'success',
      title: '已登出'
    })
    router.push('/login')
  }

  // get user
  const userLoading = ref(false)

  const getUser = async () => {
    try {
      const res = await axiosGetUser();
      console.log(res)
      userInfo.value = res.data.result;
    } catch (error) {
      console.log('get user 失敗', error)
    }
  }

  // forgot
  const verifyEmail = async () => {
    Swal.fire({
      title: "請輸入您的Email",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
    },
    confirmButtonText: "送出",
    showLoaderOnConfirm: true,
    preConfirm: async (email) => {
      console.log(email)
      const res = await axiosVerifyEmail(email)
     if(res.data.result.isEmailExists) {
      generateEmailCode(email)
     } else {
      Swal.fire({
        title: "Email不存在",
        text: "請確認Email",
        icon: "error"
      })
     }
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
  }
  const generateEmailCode = async (email) => {
  try {
    const res = await axiosGenerateEmailCode(email);
    console.log('已將驗證信發送到您的信箱', res)
    Swal.fire({
      title: "已將驗證信發送到您的信箱",
      text: "請設定新密碼",
      icon: "success",
      preConfirm: () => {
        Swal.fire({
          title: "請輸入新密碼及驗證碼",
          html: `
          <label for="swal-input1">請輸入驗證碼</label>
          <input id="swal-input1" class="swal2-input">
          <label for="swal-input2">請輸入新密碼</label>
          <input id="swal-input2" class="swal2-input" type="password">
        `,
          inputAttributes: {
            autocapitalize: "off"
          },
          confirmButtonText: "送出",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const code = document.getElementById("swal-input1")
            const newPassword = document.getElementById("swal-input2")
            console.log(newPassword.value, code.value)

          },
          allowOutsideClick: () => !Swal.isLoading()
        })
      }
    })
  } catch (error) {
    console.log('generateEmailCode 失敗', error)
    Swal.fire({
      title: "發送驗證碼失敗",
      // text: "",
      icon: "error"
    })
  }
  }
  const forgotPassword = async () => {
  try {
    await forgotPassword();
    Toast.fire({
      icon: 'success',
      title: '重置密碼郵件已發送，請檢查您的郵箱。'
    });
  } catch (error) {
    //
  }
  }
  const resetPasswordEmail =  () =>{
    //
  }



  // Admin CRUD
  const users = ref([])
  const userTemp = ref({})
  const page = ref(1)
  const limit = ref(10)
  const totalPages = ref(1)
  const sortBy = ref('createdAt')

  const getUsers = handleErrorAsync(
    async (params) => {
      userLoading.value = true;
      const res = await axiosAdminGetUsers(params)
      console.log(res.data)
      users.value = res.data.users;
      page.value = res.data.page;
      limit.value = res.data.limit;
      totalPages.value = res.data.totalPages;
      sortBy.value = res.data.sortBy;
      console.log('getUsers', users.value);
    }, () => userLoading.value = false)
  
  const editUser = handleErrorAsync(
    async (data) => {
      userLoading.value = true;
      const updateDate = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        address: data.address,
        birthday: data.birthday,
        gender: data.gender,
        photo: data.photo,
        intro: data.intro,         
        facebook: data.facebook,   
        instagram: data.instagram, 
        discord: data.discord
      }
      console.log(updateDate)
      const res = await axiosAdminEditUser(updateDate);
      console.log('editUser', res.data);
      if(res.data.status) {
        getUsers()
        getUser()
      }
      Toast.fire({
        icon: 'success',
        title: '編輯成功'
      });
    }, () => userLoading.value = false)
  
  const deleteUser = async (id) => {
    Swal.fire({
      title: '確定要刪除這個用戶嗎？',
      text: "你將無法撤銷此操作！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的，刪除它！',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        userLoading.value = true;
        axiosAdminDeleteUser(id).then(res => {
          Swal.fire(
            '已刪除！',
            '用戶已被刪除。',
            'success'
          );
          console.log(res);
          getUsers()
        })
      }
    })
  }


  return {
    // login
    loginLoading,
    showLogInPage,
    login,
    googleLogin,

    // signup
    signupLoading,
    signup,

    // check
    checkUser,

    // logout
    logout,

    // get user
    userInfo,
    getUser,

    // admin
    users,
    userTemp,
    userLoading,
    page,
    limit,
    totalPages,
    sortBy,
    getUsers,
    editUser,
    deleteUser,
    
    // forgot
    verifyEmail,
    generateEmailCode,
    forgotPassword,
    resetPasswordEmail,
  }
})