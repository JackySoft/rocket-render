import './assets/style/reset.css';
import './assets/style/index.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import api from './api';
import request from './utils/request';
import components from './components';
import RocketRender from './../packages/index';
// import RocketRender from 'rocket-render';
// import 'rocket-render/lib/rocket-render.css';

// 注册components下的组件为全局组件
Vue.use(components);
Vue.use(RocketRender, {
  size: 'small',
  empty: '-',
  inline: 'flex',
  toolbar: true,
  align: 'center',
  stripe: true,
  border: false,
  pager: true,
  pageSize: 20,
  emptyText: '暂无数据',
});

// 挂载统一管理的api
Vue.prototype.$api = api;

// 挂在全局请求request方法
Vue.prototype.$request = request;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
