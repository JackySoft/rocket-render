import Vue from 'vue'
import store from '../store'
// 按钮权限指令
Vue.directive('permission', {
  // 指令触发
  bind: function (el, binding) {
    const permissionMap = store.state.permissionMap || {}
    const permissionKey = binding.value

    // 判断是否有权限
    const hasPermission = !!permissionMap[permissionKey]
    if (!hasPermission) {
      // 初始化阶段，元素还未插入到DOM中，所以先隐藏,延迟删除
      el.style = 'display:none'
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 0)
    }
  },
})
