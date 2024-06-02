import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { Toast, Alert, Swal } from '@/mixins/swal';
import axios from 'axios';
import { 
  axiosSignupUser,
  axiosLoginUser,
  axiosCheckUser,
  axiosVerifyEmail,
  axiosGenerateEmailCode,
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

  // const signup = async () => {
  //   console.log('signup', signupData.value)
  //   signupLoading.value = true;
  //   try {
  //     const res = await axiosSignupUser(signupData.value);
  //     console.log(res)
  //     Toast.fire({
  //       icon: 'success',
  //       title: '註冊成功，請登入'
  //     });
  //     resetSignupForm();
  //     // router.push('/login');
  //   } catch (error) {
  //     console.log('註冊失敗', error);
  //     Alert.fire({
  //       icon: 'error',
  //       title: '註冊失敗，請檢查您的資料'
  //     });
  //   } finally { 
  //     signupLoading.value = false;
  //   }
  // };

  const signup = async () => {
    console.log('signup', signupData.value)
    signupLoading.value = true;
    try {
    //   const res = await axios.post('https://music-tutor-backend.onrender.com/users/signup', {
    //     "name": "hihi222",
    //     "email": "dddddd000@hhhh.com",
    //     "password": "aaaaaaaaaa0",
    //     "confirmPassword": "aaaaaaaaaa0"
    // })
    const res = await axios.post('https://music-tutor-backend.onrender.com/users/signup',JSON.stringify(signupData.value))
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
  const isChecked = ref(false);
  const checkUser = async () => {
    try {
      const res = await axiosCheckUser();
      isChecked.value = res.data.status;
      console.log('checkUser 驗證成功', isChecked.value);
    } catch (error) {
      isChecked.value = false;
      console.log('checkUser 驗證失敗', isChecked.value);
    }
  }

  // logout
  const logout = () => {
    document.cookie = `music_tutor=`;
    isChecked.value = false;
    Toast.fire({
      icon: 'success',
      title: '已登出'
    })
    router.push('/')
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
    isChecked,
    checkUser,

    // logout
    logout,

    // forgot
    verifyEmail,
    generateEmailCode,
    forgotPassword,
  }

})