<template>
<div class="spinner">
  <div class="circle1"></div>
  <div class="circle2"></div>
  <div class="circle3"></div>
</div>
</template>

<style scoped>
.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: white;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: circledelay 1.4s infinite ease-in-out both;
  animation: circledelay 1.4s infinite ease-in-out both;
}

.spinner .circle1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .circle2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes circledelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes circledelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>