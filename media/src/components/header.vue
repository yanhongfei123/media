<template>
  <header class="header">
    <img src="../images/logo.png" alt="">
     <p class="top_title">{{ headTitle }}</p>
  </header>
</template>

<script>
export default {
  name: 'headTop',
  data() {
    return {
        
    }
  },
  created(){


  },
  props:[ 'headTitle' ]
}
</script>

<style lang="scss" scoped>
  .header{
     text-align: center;
      img {
        width: 2.62rem;
        margin: 0.8rem 0 0.3rem;
    }
    .top_title {
        color: #464646;
        font-size: 0.4rem;
    }
  }

</style>
