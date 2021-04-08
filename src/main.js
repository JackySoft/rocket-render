import './assets/style/reset.css'
import './assets/style/index.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import api from './api'
import request from './utils/request'
import components from './components'
import Rocket from './../packages/index'

// 注册components下的组件为全局组件
Vue.use(components)
Vue.use(Rocket)

// 挂载统一管理的api
Vue.prototype.$api = api

// 挂在全局请求request方法
Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
