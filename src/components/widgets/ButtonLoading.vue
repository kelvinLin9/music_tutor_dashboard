<template>
  <div class="loadingio-spinner-spinner-dut17ci7nge">
    <div class="ldio-g6c8n0v7cjr">
      <div v-for="i in 12" :key="i" :style="{ backgroundColor: color }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: '#ffffff'
  }
});
</script>

<style scoped>
@keyframes ldio-g6c8n0v7cjr {
  0% { opacity: 1 }
  100% { opacity: 0 }
}
.ldio-g6c8n0v7cjr div {
  left: 47px;
  top: 24px;
  position: absolute;
  animation: ldio-g6c8n0v7cjr linear 1s infinite;
  width: 6px;
  height: 12px;
  border-radius: 3px / 6px;
  transform-origin: 3px 26px;
}
.ldio-g6c8n0v7cjr div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.9166666666666666s;
}
.ldio-g6c8n0v7cjr div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -0.8333333333333334s;
}
.ldio-g6c8n0v7cjr div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.75s;
}
.ldio-g6c8n0v7cjr div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.6666666666666666s;
}
.ldio-g6c8n0v7cjr div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.5833333333333334s;
}
.ldio-g6c8n0v7cjr div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.5s;
}
.ldio-g6c8n0v7cjr div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.4166666666666667s;
}
.ldio-g6c8n0v7cjr div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.3333333333333333s;
}
.ldio-g6c8n0v7cjr div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.25s;
}
.ldio-g6c8n0v7cjr div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.16666666666666666s;
}
.ldio-g6c8n0v7cjr div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.08333333333333333s;
}
.ldio-g6c8n0v7cjr div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
.loadingio-spinner-spinner-dut17ci7nge {
  width: 24px;
  height: 24px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-g6c8n0v7cjr {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.24);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.ldio-g6c8n0v7cjr div { box-sizing: content-box; }
</style>
