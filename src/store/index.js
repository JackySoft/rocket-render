import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@ued2345/single-storage'
import config from '../config/index'
// 引入缓存命名空间
cache.initNamespace(config.namespace)

Vue.use(Vuex)

const initData = {
// 样例，取值 this.$store.state.userInfo,提交 this.$store.commit('userInfo', {})
  // 用户信息
  userInfo: {
    persistence: true, // 是否持久化，是否存入localStorage
    default: {}
  },
  // token信息
  token: {
    persistence: false,
    default: ''
  },
  // 用户权限菜单
  userMenu: {
    persistence: false,
    default: []
  },
  // 子系统ID,中台权限中心会使用，跳转时会携带，其他项目需要自行根据环境写入
  systemId: {
    persistence: false,
    default: '' // TODO 这个最好填你在各环节申请到的系统ID
  },
  // 权限map
  permissionMap: {
    persistence: false,
    default: {}
  },
  // 表格最大高度，使用于element-ui表格，如果你的页面比较多样或差异较大，则建议放到具体的组件中去保存
  maxTableHeight: {
    persistence: false,
    default: 500
  }
}

const state = {}

const mutations = {}

// 初始化state和mutation
for (const key in initData) {
  if (typeof initData[key].default === 'undefined') {
    throw new Error('[Store]initData中的默认值是不可以是undefined，这可能会导致一个取值错误')
  }
  if (initData[key].persistence) {
    const localVal = cache.getFromLoacl(key)
    const sessionVal = cache.getFromSession(key)
    state[key] = typeof localVal !== 'undefined'
      ? localVal
      : typeof sessionVal !== 'undefined'
        ? sessionVal
        : initData[key].default
    mutations[key] = (storeState, obj) => {
      storeState[key] = obj
      cache.saveToLocal(key, obj)
      cache.saveToSession(key, obj)
    }
  } else {
    const sessionVal = cache.getFromSession(key)
    state[key] = typeof sessionVal !== 'undefined'
      ? sessionVal
      : initData[key].default
    mutations[key] = (storeState, obj) => {
      storeState[key] = obj
      cache.saveToSession(key, obj)
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
