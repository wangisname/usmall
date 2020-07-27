// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//1：引入reset.css样式
import './assets/css/reset.css'

//2.处理公共组件
import commonComponents from "./components/index"
for(let i in commonComponents){
  Vue.component(i,commonComponents[i])
}

//3.处理过滤器
import filters from './filters/index'
for(let i in filters){
  Vue.filter(i,filters[i])
}




//5.vuex
import store from './store/index'

//6.引入element-ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

//图片前缀
Vue.prototype.$imgPre="http://localhost:3000"



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
