<template>
  <div class="container-fluid ps-0 position-relative">
    <h1>
      <RouterLink to="/" class="login-logo navbar-brand nav-link d-flex">
        <span>樂樂音樂家教媒合平台</span>
      </RouterLink>
    </h1>
    <div class="row align-items-md-center justify-content-center justify-content-md-start">
      <div class="col-6 col-lg-4 d-none d-md-block">
        <img src="../assets/images/login.jpg" alt="登入圖" class="login-side-img">
      </div>
      <div class="col-12 col-md-6 col-xl-4">
        <!-- 登入 -->
        <div v-if="showLogInPage" class="login-wrap d-flex flex-column justify-content-center">
          <h1 class="mx-auto border-bottom my-16 pb-16 w-75 text-center fs-1">
            會員登入
          </h1>
          <button 
            type="button" 
            class="btn btn-outline-dark d-block mx-auto py-16 d-flex justify-content-center w-75"
            @click="signInWithGoogle()"
            :disabled="loginLoading"
          >
            <img src="../assets/images/google-icon.png" alt="google icon" class="google-icon me-2">
            <span class="google-login-text">使用 Google 登入</span><ButtonLoading color="#000000" v-if="loginLoading"/>
          </button>
          <hr class="mx-auto w-75 mt-16 text-center fs-7 login-hr">
          
          <VForm class="mx-auto w-75"
                v-slot="{ errors }"
                @submit="submitLogin()">
            <div class="mb-3">
              <label for="email" class="form-label ">
                Email：
              </label>
              <VField
                name="email"
                id="email"
                type="email"
                rules="required|email"
                class="form-control fs-7"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                v-model="loginData.email"
              />
              <ErrorMessage class="invalid-feedback" name="email"/>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <label for="password" class="form-label">
                  密碼：
                </label>
                <!-- <a href="#" class="text-delete fs-7" @click.prevent data-bs-toggle="modal" data-bs-target="#exampleModal">
                  忘記密碼
                </a> -->
                <a href="#" class="text-delete fs-7" @click.prevent="verifyEmail()">
                  忘記密碼
                </a>
                
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">重設密碼</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="resetPasswordEmail" class="form-label">請填寫註冊Email</label>
          <input type="email" 
                  class="form-control" 
                  id="resetPasswordEmail" 
                  placeholder="請填寫註冊Email"
                  v-model="resetPasswordEmail">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary"
                @click="sendPasswordResetEmail">
          送出
        </button>
      </div>
    </div>
  </div>
                </div>
              </div>
              <VField
                name="密碼"
                id="password"
                type="password"
                rules="required|min:8"
                class="form-control fs-7"
                :class="{ 'is-invalid': errors['密碼'] }"
                placeholder="請輸入密碼"
                v-model="loginData.password"
              />
              <ErrorMessage class="invalid-feedback" name="密碼"/>
            </div>
            <button type="submit" class="btn btn-dark d-block mx-auto py-3 w-100 d-flex justify-content-center">
              <span>登入</span><ButtonLoading v-if="loginLoading"/>
            </button>
            <p class="mx-auto w-75 my-3 text-center fs-7 text-delete">
              還沒有帳號嗎?
              <a href="#" class="d-inline-block"
                @click.prevent="showLogInPage = false">
                 前往註冊
              </a>
            </p>
          </VForm>
        </div>
        <!-- 註冊 -->
        <div v-else class="login-wrap d-flex flex-column justify-content-center">
          <h1 class="mx-auto border-bottom my-3 pb-2 w-75 text-center">會員註冊</h1>
          <VForm class="mx-auto w-75"
          v-slot="{ errors }"
          @submit="submitSignup()">
            <div class="mb-3">
              <label for="displayName" class="form-label ">
                姓名：
              </label>
              <VField
                name="姓名"
                id="displayName"
                type="text"
                rules="required"
                class="form-control fs-7"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                v-model="signupData.name"
              />
              <ErrorMessage class="invalid-feedback" name="姓名"/>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label ">
                Email：
              </label>
              <VField
                name="email"
                id="email"
                type="email"
                rules="required|email"
                class="form-control fs-7"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                v-model="signupData.email"
              />
              <ErrorMessage class="invalid-feedback" name="email"/>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label ">
                密碼：
              </label>
              <VField
                name="密碼"
                id="password"
                type="password"
                rules="required|min:8"
                class="form-control fs-7"
                :class="{ 'is-invalid': errors['密碼'] }"
                placeholder="請輸入密碼"
                v-model="signupData.password"
              />
              <ErrorMessage class="invalid-feedback" name="密碼"/>
            </div>
            <div class="mb-3">
              <label for="confirmation" class="form-label ">
                再次輸入密碼：
              </label>
              <VField
                name="驗證密碼"
                id="confirmation"
                type="password"
                rules="required|confirmed:@密碼"
                class="form-control fs-7"
                :class="{ 'is-invalid': errors['驗證密碼'] }"
                placeholder="請再次輸入密碼"
                v-model="signupData.confirmPassword"
              />
              <ErrorMessage class="invalid-feedback" name="驗證密碼"/>
            </div>

            <button type="submit" class="btn btn-dark d-block mx-auto py-3 w-100 d-flex justify-content-center">
              <span>註冊</span><ButtonLoading v-if="signupLoading"/>
            </button>
            <p class="mx-auto w-75 my-3 text-center fs-7 text-delete">
              已經有帳號?
              <a href="#" class="d-inline-block"
                @click.prevent="showLogInPage = true">
                 前往登入
              </a>
            </p>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>
  

<script setup>
import ButtonLoading from "@/components/widgets/ButtonLoading.vue";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const { 
  showLogInPage,
  signupLoading, 
  loginLoading,
  isChecked } = storeToRefs(userStore)
const signup = userStore.signup
const login = userStore.login
const checkUser = userStore.checkUser
const verifyEmail = userStore.verifyEmail
const resetPasswordEmail = userStore.resetPasswordEmail

const loginData = ref({
  email: '',
  password: ''
});

const submitLogin = async() => {
  const res = await login(loginData.value);
  console.log(res);
  if (res) {
    loginData.value = {
      email: '',
      password: ''
    };
  }
};

const signupData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const submitSignup = () => {
  signup(signupData.value);
  signupData.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
};


// 這個版本直接導向到你自己的後端 /users/google 端點，
// 該端點可能設置為處理 GET 請求，然後後端再將用戶重定向到 Google。
// 之後 Google 會將用戶重定向回你的後端 (使用 GET 請求)。

// const signInWithGoogle = () => {
//   console.log('sign in with google');
//   const googleAuthUrl = `https://music-tutor-backend.onrender.com/users/google`;
//   window.location.href = googleAuthUrl;
// }



const signInWithGoogle = () => {
  console.log('sign in with google');
  
  // 獲取當前的域名和協議作為基礎 URL
  const baseUrl = window.location.origin;
  console.log(baseUrl);
  // // 根據環境決定重定向路徑
  let redirectTarget = '';
  if(import.meta.env.MODE === 'development') {
    const redirectPath = '/music_tutor_dashboard/google/callback';
    redirectTarget = `${baseUrl}${redirectPath}`;
    console.log(redirectTarget);
  } else {
    const redirectPath = '/google/callback';
    redirectTarget = `${baseUrl}${redirectPath}`;
    console.log(redirectTarget);
  }
  
  // 將重定向 URL 編碼後作為 state 參數傳遞
  const encodedRedirectTarget = encodeURIComponent(redirectTarget);

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${encodeURIComponent(import.meta.env.VITE_GOOGLE_CALLBACK_URL)}&scope=email%20profile&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&state=${encodedRedirectTarget}`;
  
  window.location.href = authUrl;
}

</script>

<style lang="scss" scoped>
  .login-wrap {
    height: 100vh;
  }
  .login-logo {
    width: 100px;
    height: 45px;
    position: absolute;
    z-index: 10;
    left: 20px;
    top: 10px;
    background-image: url(../assets/images/logo.png);
    background-size: cover;
    background-position: center center;
    display: block;
    text-indent: 101%;
    overflow: hidden;
    white-space: nowrap;
  }
.login-side-img {
  width: 100%;
  height: 100vh;
}
.google-icon {
  width: 16px;
  height: 16px;
  @media (min-width:576px) {
    width: 24px;
    height: 24px;
  }
}
.google-login-text {
  font-size: 12px;
  @media (min-width:576px) {
    font-size: 16px;
  }
}
.login-hr {
  height: 1px;
  overflow: visible;
  border: none;
  background-color: rgb(140, 140,140);
  text-align: center;
  &::after {
    content: '或使用信箱登入';
    display: inline-block;
    position: relative;
    top: -7px;
    padding: 0 16px;
    background: #fff;

  }
}
</style>