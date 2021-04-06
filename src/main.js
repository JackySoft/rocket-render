import './assets/style/reset.css'
import './assets/style/index.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from './api'
import request from './utils/request'
import components from './components'
import * as fliters from './filters'
import Rocket from './../packages/index'
// 注册指令
import './directives'
// 开启日志上报
import './logger'

// 全局注册所有过滤器
Object.keys(fliters).forEach(key => {
  Vue.filter(key, fliters[key])
})

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
  store,
  render: h => h(App)
}).$mount('#app')
