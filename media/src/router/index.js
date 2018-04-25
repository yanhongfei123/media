import App from '../App';
import Vue from "vue";
import Router from "vue-router";

const selectIdentity = r => require.ensure([], () => r(require('@/page/selectIdentity.vue')), 'selectIdentity')
const submit = r => require.ensure([], () => r(require('@/page/submit.vue')), 'submit')
const submitSuccess = r => require.ensure([], () => r(require('@/page/submitSuccess.vue')), 'submitSuccess')

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: App, 
      children:[
        {
          path: "",
          redirect: "/selectIdentity"
        },
        {
          path: "/selectIdentity",
          component: selectIdentity
        },
        {
          path: "/submit",
          component: submit
        },
        {
          path: "/submitSuccess",
          component: submitSuccess
        },

      ]
    },
   
   
    
  ]
});
