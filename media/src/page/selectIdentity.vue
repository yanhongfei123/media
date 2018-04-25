<template>
    <div class="choose_id">
        <head-top  head-title="试用申请表">  </head-top>
        <h1>选择您的身份</h1>
        <ul>
            <li @click="chooseId(id)" :key="key" v-for="(id , key) in datas">{{ id }}</li>
        </ul>
    </div>
</template>
<script>
import headTop from '../components/header'

export default {
    name: "selectId",
    data() {
        return {
            datas: ['自媒体人', '媒体', '社群领袖']
        };
    },
    components: { headTop },
    methods: {
        chooseId(id) {
            this.$router.push({  path: "/submit",query:{ id } })
        }
    }

}
</script>
<style lang="scss" scoped>
.choose_id {
    text-align: center;
    h1 {
        margin: 1.3rem 0 0.45rem;
        font-size: 0.52rem;
        color: #fa4d09;
    }
    li {
        width: 6.6rem;
        height: 1rem;
        margin: 0 auto 0.4rem;
        line-height: 1rem;
        background: #fa4d09;
        font-size: 0.26rem;
        color: #fff;
    }
}
</style>