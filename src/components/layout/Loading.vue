<template>
  <div class="flex justify-center h-full" 
  >
    <span class="loader border-2 border-blue-500"></span>
  </div>
</template>

<style scoped>
.loader {
  width: 20px;
  height: 20px;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 500ms linear infinite;

}

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>