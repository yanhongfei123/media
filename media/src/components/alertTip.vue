 <template>
    <div class="alet_container">
	    <section class="tip_text_container">    
            <p class="tip_text">{{alertText}}</p>
            <div v-if="index" :key="index" v-for="(item,index) in btnList" class="confrim" @click="$emit(item.emitEvent)" >{{ item.btnText }}</div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
                 btnList: [
                    {
                        'btnText': '取消',
                        'emitEvent': 'closeTip'
                    },
                    {
                        'btnText': '确认',
                        'emitEvent': 'confirmTip'
                    }
                ]
            }
        },
        mounted(){
      
        },
        props: ['alertText'],
    }
</script>

<style lang="scss" scoped>
    @import '../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -2rem;
        margin-left: -3rem;
        width: 6rem;
        animation: tipMove .4s ;
        background:#e6e6e6; 
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 0.1rem;
        .tip_text{
            @include sc(.3rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .3rem;
        }
        .confrim{
            @include sc(.4rem, #fff);
            margin-top: .3rem;
            background-color: #fa4d09;
            width: 100%;
            text-align: center;
            line-height: 0.9rem;
            border-bottom-left-radius: 0.1rem;
            border-bottom-right-radius: 0.1rem;
        }
    }
    
</style>
