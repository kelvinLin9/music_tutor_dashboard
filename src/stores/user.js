import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { Toast, Alert, Swal } from '@/mixins/swal';
import axios from 'axios';
import { 
  axiosSignup,
  axiosLoginUser,
  axiosCheckUser,
  axiosEditUser,
  axiosGetUser,
  // axiosVerifyEmail,
  // axiosGenerateEmailCode,
  axiosAdminGetUsers,
  axiosAdminEditUser,
} from '@/api/userApi';

export const useUserStore = defineStore('userStore', () => {


  const router = useRouter();


  // login
  const loginData = ref({
    email: '',
    password: '',
  });
  const userInfo = ref({});
  const showLogInPage = ref(true);
  const loginLoading = ref(false);
  const login = async () => {
    console.log('login', loginData.value)
    loginLoading.value = true;
    try {
      const res = await axiosLoginUser(loginData.value);
      console.log(res)
      document.cookie = `music_tutor=${res.data.token}`;
      userInfo.value = res.data.result;
      loginData.value = { email: '', password: '' };
      console.log(userInfo.value)
      Toast.fire({
        icon: 'success',
        title: '登入成功'
      });
      router.push('/');
    } catch (error) {
      console.log('登入失敗', error);
      Alert.fire({
        icon: 'error',
        title: '登入失敗，請檢查您的帳號密碼'
      });
    } finally {
      loginLoading.value = false;
    }
  };

  // signup
  const signupData = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const signupLoading = ref(false);
  const signup = async () => {
    console.log('signup', signupData.value)
    signupLoading.value = true;
    try {
      const res = await axiosSignup(signupData.value);
      console.log(res)
      Toast.fire({
        icon: 'success',
        title: '註冊成功，請登入'
      });
      resetSignupForm();
      // router.push('/login');
    } catch (error) {
      console.log('註冊失敗', error);
      Alert.fire({
        icon: 'error',
        title: '註冊失敗，請檢查您的資料'
      });
    } finally { 
      signupLoading.value = false;
    }
  };
  const resetSignupForm = () => {
    signupData.value.name = '';
    signupData.value.email = '';
    signupData.value.password = '';
    signupData.value.confirmPassword = '';
  }

  // check
  const role = ref('');
  const checkUser = async () => {
    try {
      const res = await axiosCheckUser();
      console.log(res);
      role.value = res.data.role;
      console.log('checkUser 驗證成功', role.value);
      getUser(res.data.userId);
    } catch (error) {
      role.value = false;
      console.log('checkUser 驗證失敗', role.value, error);
    }
  }

  // logout
  const logout = () => {
    document.cookie = `music_tutor=`;
    role.value = '';
    Toast.fire({
      icon: 'success',
      title: '已登出'
    })
    router.push('/')
  }
  // get user
  const getUser = async () => {
    try {
      const res = await axiosGetUser();
      console.log(res)
      userInfo.value = res.data.result;
    } catch (error) {
      console.log('get user 失敗', error)
    }
  }

  // Admin CRUD
  const users = ref([])
  const getUsers = async () => {
    signupLoading.value = true;
    try {
      const res = await axiosAdminGetUsers()
      users.value = res.data.users;
      console.log(users.value);
    } catch (error) {
      console.error(error);
    } finally {
      signupLoading.value = false
    }
  }
  const editUser = async (data) => {
    loginLoading.value = true;
    console.log(data)
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
    try {
      const res = await axiosAdminEditUser(updateDate);
      console.log(res)
      Toast.fire({
        icon: 'success',
        title: '編輯成功'
      });
    } catch (error) {
      console.log('編輯失敗', error);
      Alert.fire({
        icon: 'error',
        title: '編輯失敗，請檢查您的資料'
      });
    } finally {
      loginLoading.value = false;
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
  return {
    // login
    loginLoading,
    loginData,
    showLogInPage,
    login,

    // signup
    signupLoading,
    signupData,
    signup,

    // check
    role,
    checkUser,

    // logout
    logout,

    // get user
    userInfo,
    getUser,

    // CRUD
    users,
    getUsers,
    editUser,
    
    // forgot
    verifyEmail,
    generateEmailCode,
    forgotPassword,
    resetPasswordEmail,
  }
})