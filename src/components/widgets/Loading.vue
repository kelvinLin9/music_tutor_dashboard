<template>
  <div class="loadingio-spinner-spinner">
    <div class="ldio">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style type="text/css">
:root {
  --spinner-color: #ff715f;
  --spinner-duration: 1s;
}

@keyframes fade {
  0% { opacity: 1 }
  100% { opacity: 0 }
}

.loadingio-spinner-spinner {
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background: transparent; 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.ldio {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}

.ldio div {
  left: 47px;
  top: 24px;
  position: absolute;
  animation: fade linear var(--spinner-duration) infinite;
  background: var(--spinner-color);
  width: 6px;
  height: 12px;
  border-radius: 3px / 6px;
  transform-origin: 3px 26px;
  box-sizing: content-box;
}

.ldio div:nth-child(1) { transform: rotate(0deg);    animation-delay: calc(12 * -0.0833333333s); }
.ldio div:nth-child(2) { transform: rotate(30deg);   animation-delay: calc(11 * -0.0833333333s); }
.ldio div:nth-child(3) { transform: rotate(60deg);   animation-delay: calc(10 * -0.0833333333s); }
.ldio div:nth-child(4) { transform: rotate(90deg);   animation-delay: calc(9 * -0.0833333333s); }
.ldio div:nth-child(5) { transform: rotate(120deg);  animation-delay: calc(8 * -0.0833333333s); }
.ldio div:nth-child(6) { transform: rotate(150deg);  animation-delay: calc(7 * -0.0833333333s); }
.ldio div:nth-child(7) { transform: rotate(180deg);  animation-delay: calc(6 * -0.0833333333s); }
.ldio div:nth-child(8) { transform: rotate(210deg);  animation-delay: calc(5 * -0.0833333333s); }
.ldio div:nth-child(9) { transform: rotate(240deg);  animation-delay: calc(4 * -0.0833333333s); }
.ldio div:nth-child(10) { transform: rotate(270deg); animation-delay: calc(3 * -0.0833333333s); }
.ldio div:nth-child(11) { transform: rotate(300deg); animation-delay: calc(2 * -0.0833333333s); }
.ldio div:nth-child(12) { transform: rotate(330deg); animation-delay: calc(1 * -0.0833333333s); }
</style>

