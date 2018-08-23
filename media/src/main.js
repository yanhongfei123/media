
import Vue from 'vue'
import App from './App'
import router from './router'
import './rem/rem'
import  'babel-polyfill'

Vue.config.productionTip = true ;
console.log(1)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
