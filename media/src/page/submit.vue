<template>
    <div class="submit_wrap">
        <form class="submit_form">
            <head-top :head-title="`我是${id}`"></head-top>
            <div class="top_info">*号为必填项</div>
            <div class="media_person">
                <div v-show="id.indexOf('媒体') != -1 " class="media_name media">
                    <label for="media_name">{{`${id == '自媒体人'?'自' :''}`}}媒体名称*</label>
                    <input ref="mediaName" name="mediaName" type="text" v-model="mediaName">
                </div>

                <div v-show="id != '社群领袖'" class="media_type media">
                    <label for="media_type">媒体类型*</label>
                    <select name="select" id="select" v-model="mediaType">
                        <option>垂直门户</option>
                        <option>科技评测</option>
                        <option>家具生活</option>
                        <option>其他</option>
                    </select>
                </div>
                <div v-show="id == '自媒体人'" class="article media">
                    <label for="article_num">文章平均阅读量*</label>
                    <input ref="articleNum" name="articleNum" type="text" v-model="articleNum">
                </div>
                <div v-show="id == '媒体'" class="input_file media">
                    <label for="article_num">上传名片*</label>
                    <div class="file_wrap">选择文件 <input ref="file" @change="preViewImg" type="file" name="file" class="file"></div>
                    <img v-show="imgSrc" class="preImg" :src="imgSrc" alt="">
                </div>

                <div v-show="id == '社群领袖'">
                    <div class="group_num media">
                        <label for="group_num">群组成员数量*</label>
                        <input ref="groupNum" name="groupNum" type="text" v-model="groupNum">
                    </div>
                    <div class="weibo_account media">
                        <label for="weibo_account">微博账号</label>
                        <input name="weiboAccount" type="text" v-model="weiboAccount">
                    </div>
                    <div class="weixin_account media">
                        <label for="weixin_account">微信号*</label>
                        <input ref="weixinAccount" name="weixinAccount" type="text" v-model="weixinAccount">
                    </div>
                    <div class="qq_account media">
                        <label for="qq_account">QQ号</label>
                        <input name="qqAccount" type="text" v-model="qqAccount">
                    </div>

                </div>

                <!-- 公用的 -->
                <div class="phone_num media">
                    <label for="phone_num">联系人手机号*</label>
                    <input ref="phoneNum" type="text" v-model="phoneNum">
                </div>

                <div class="phone_num media">
                    <label for="phone_num">给Neato一个理由<br/>让我更快的决定是否和你做朋友</label>
                    <textarea name="textarea" id="textarea" v-model="textarea"></textarea>
                </div>
                <!-- 公用的 -->
            </div>

        </form>
        <button @click="handleSubmit" class="submit_btn">提交 SUBMIT</button>
        <router-link to="/selectIdentity">
            <div class="go_back">重选身份</div>
        </router-link>

        <alert-tip v-if="showAlert" @confirmTip="confirmTip" :alertText="alertText"></alert-tip>

    </div>
</template>
<script>
import headTop from '../components/header'
import alertTip from '../components/alertTip.vue'
import Validator from '../js/checkForm'
import strategys from '../js/checkRules'
import { formSubmit } from '../service/api'
export default {
    name: "submit",
    data() {
        return {
            formData: new FormData(),
            id: this.$route.query.id, // 身份类型
            imgSrc: '', // 预览图SRC
            mediaName: '', // 自媒体名称
            mediaType: '垂直门户', // 媒体类型
            articleNum: '',//文章阅读量
            phoneNum: '',// 手机号
            textarea: '',// 留言
            groupNum: '', // 群组成员数量
            weixinAccount: '',// 微信号
            weiboAccount: '', // 微博账号
            qqAccount: '',//QQ号
            showAlert: false,
            alertText: '',
        };
    },
    components: { headTop, alertTip },
    methods: {
        confirmTip() {
            this.showAlert = false;
        },
        preViewImg() {
            let input = document.querySelector('.file');
            let file = input.files[0];
            if (file.name.match(/jpg|png|gif/) == null) {
                this.showAlert = true;
                this.alertText = '只能是jpg png gif 格式';
                return
            }
            if (file.size / 1024 / 1024 > 1) {
                this.showAlert = true;
                this.alertText = '文件不能大于1M';
                return
            }

            this.imgSrc = window.URL.createObjectURL(input.files[0])

            console.log(input.files[0]);
            console.log(this.imgSrc);

        },
        checkSelfMediaPerson() {
            var _this = this;
            var validator = new Validator(strategys); // 创建一个Validator对象
            /* 添加一些效验规则 */
            validator.addRules(_this.$refs.mediaName, [
                { 'strategy': 'isNotEmpty', 'errorMsg': '请填写自媒体名称' }
            ]);
            validator.addRules(_this.$refs.articleNum, [
                { 'strategy': 'isNotEmpty', 'errorMsg': '请填写文章平均阅读量' }
            ]);

            validator.addRules(_this.$refs.phoneNum, [
                { 'strategy': 'mobileFormat', 'errorMsg': '请填写11位的手机号码' }
            ]);

            var errorMsg = validator.start(); // 执行验证总函数，并返回效验结果
            console.log('errorMsg=====' + errorMsg)
            return errorMsg; // 返回效验结果
        },
        checkMedia() {
            var _this = this;
            var validator = new Validator(strategys); // 创建一个Validator对象
            /* 添加一些效验规则 */
            validator.addRules(_this.$refs.mediaName, [
                { 'strategy': 'isNotEmpty', 'errorMsg': '请填写媒体名称' }
            ]);
            validator.addRules(_this.$refs.file, [
                { 'strategy': 'isNotEmpty', 'errorMsg': '请上传您的名片' }
            ]);

            validator.addRules(_this.$refs.phoneNum, [
                { 'strategy': 'mobileFormat', 'errorMsg': '请填写11位的手机号码' }
            ]);

            var errorMsg = validator.start(); // 执行验证总函数，并返回效验结果
            return errorMsg; // 返回效验结果

        },
        checkCommunityLeader() {
            var _this = this;
            var validator = new Validator(strategys); // 创建一个Validator对象
            /* 添加一些效验规则 */
            validator.addRules(_this.$refs.groupNum, [
                { 'strategy': 'isNotEmpty', 'errorMsg': '请填写群组成员数量' }
            ]);
            validator.addRules(_this.$refs.weixinAccount, [
                { 'strategy': 'isNotEmpty', 'errorMsg': '请填写微信号' }
            ]);
            validator.addRules(_this.$refs.phoneNum, [
                { 'strategy': 'mobileFormat', 'errorMsg': '请填写11位的手机号码' }
            ]);

            var errorMsg = validator.start(); // 执行验证总函数，并返回效验结果
            return errorMsg; // 返回效验结果

        },
        handleSubmit() {
            var id = this.id;
            var errorMsg = '';
            if (id == '自媒体人') {
                errorMsg = this.checkSelfMediaPerson();
                if (!errorMsg) {  // 验证通过，返回 undefined ，不会有错误返回
                    this.formData.append('xxx', this.mediaName);
                    this.formData.append('xxx', this.mediaType);
                    this.formData.append('xxx', this.articleNum);
                    this.formData.append('xxx', this.phoneNum);
                }
            }
            else if (id == '媒体') {
                errorMsg = this.checkMedia();
                if (!errorMsg) {  // 验证通过，返回 undefined ，不会有错误返回
                    this.formData.append('xxx', this.mediaName);
                    this.formData.append('xxx', this.mediaType);
                    this.formData.append('file', input.files[0]);
                    this.formData.append('xxx', this.phoneNum);
                }
            }
            else if (id == '社群领袖') {
                errorMsg = this.checkCommunityLeader();
                if (!errorMsg) {
                    this.formData.append('xxx', this.groupNum);
                    this.formData.append('xxx', this.weixinAccount);
                    this.formData.append('xxx', this.phoneNum);
                }
            }
            // 如果某项验证不通过，会把该项验证规则提示语返回  
            if (errorMsg) {
                this.showAlert = true;
                this.alertText = errorMsg;
            } else {
                // 提交数据  (暂无接口，只是模拟)
                formSubmit('/submit', this.formData).then(res => {
                    if (res.status == 1) {
                        // 请求成功，跳转成功提示页
                        this.$router.push('/submitSuccess')
                    } else {
                        // 弹出错误提示
                        this.showAlert = true;
                        this.alertText = res.message;
                    }

                })

            }


        }

    }

}
</script>
<style lang="scss" scoped>
.submit_wrap {
    text-align: center;
    .file_wrap {
        width: 2.5rem;
        line-height: 0.65rem;
        position: relative;
        display: inline-block;
        .file {
            position: absolute;
            opacity: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .preImg {
        margin-top: 0.1rem;
        max-width: 4.9rem;
    }

    .top_info {
        margin: 0.24rem 0;
        font-size: 0.2rem;
        color: #fa4d09;
    }
    .media {
        margin-bottom: 0.2rem;
    }
    label {
        color: #fa4d09;
        display: block;
        font-size: 0.26rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
    }
    input {
        text-indent: 0.1rem;
        line-height: 0.65rem;
    }
    .file_wrap,
    input,
    select,
    textarea {
        width: 4.95rem;
        height: 0.65rem;
        font-size: 0.26rem;
        color: #585858;
        border: 1px solid #cbcbcb;
    }
    textarea {
        height: 1.3rem;
        color: #585858;
        padding: 0.1rem;
        text-indent: 0.1rem;
    }
    .submit_btn {
        display: block;
        margin: 0.3rem 0 0.20rem;
        width: 100%;
        height: 0.96rem;
        line-height: 0.96rem;
        background: #fa4d09;
        color: #fff;
        font-size: 0.26rem;
    }
    .go_back {
        margin-bottom: 1rem;
        color: #fa4d09;
        font-weight: bold;
        font-size: 0.26rem;
    }
}
</style>