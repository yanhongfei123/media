<template>
  <div class="app">
   <!-- 主路由 -->
   <transition name="router-fade" mode="out-in">
         <router-view/>
   </transition>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './style/basic';
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.2s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

</style>
