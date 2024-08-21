<template>
  <div>
    <h1>Callback</h1>
    {{ $route.query.code }}
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useRoute } from "vue-router";
import { useUserStore } from '@/stores/user';

const route = useRoute()
const userStore = useUserStore()
const googleLogin = userStore.googleLogin

onMounted(() =>{
  console.log(route.query.code)
  googleLogin({"code": route.query.code})
})

</script>

<style>

</style>