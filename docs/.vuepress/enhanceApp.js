import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import RocketRender from './../../packages/index'
import request from './request'

export default ({
  Vue
}) => {
  Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
  Vue.use(RocketRender)
  Vue.prototype.$request = request;
}