<template>
    <div class="submit_success">
        <head-top></head-top>
        <p class="mid_info">Neato 会在 <br/> 3 个工作日内与您联系。<br/>感谢您对 Neato 的认可！<br/></p>
        <p class="btm_info">*请留意 0512 开头的来电</p>
    </div>
</template>

<script>
import headTop from '../components/header'
export default {
    name: '',
    data() {
        return {

        }
    },
    components: { headTop },

}
</script>

<style lang="scss" scoped>
  .submit_success{
      text-align: center;
      p{ color: #fa4d09; }
      .mid_info{
        margin-top: 3rem;  
        font-size: 0.42rem;
        line-height: 0.8rem;
      }
       .btm_info{
          margin-top: 0.2rem;    
        font-size: 0.27rem;
      }

  }

</style>
