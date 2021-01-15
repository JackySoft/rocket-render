import Vue from 'vue'
import Router from 'vue-router'
import BlankLayout from '@/components/layout/BlankLayout'
import BasicLayout from '@/components/layout/BasicLayout'
import store from '../store'
import config from '../config'
import checkPermissionMenu from '../utils/checkPermissionMenu'

// 解决跳转重复路由时的报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function (location) {
  return originalPush.call(this, location)
    .catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function (location) {
  return originalReplace.call(this, location)
    .catch(err => err)
}

Vue.use(Router)

export const constantRoutes = [{
  path: '/user',
  component: BlankLayout,
  children: [{
    path: '/',
    redirect: 'login'
  },

  {
    path: 'auth',
    meta: {
      exemption: true
    },

    name: '授权登录中...',
    component: () => import('@/views/user/Auth.vue')
  }
  ]
},

{
  path: '/',
  component: BasicLayout,
  children: [{
    path: '/',
    redirect: 'welcome'
  },

  {
    path: 'welcome',
    meta: {
      exemption: true
    },

    name: '欢迎使用本系统',
    component: () => import('@/views/welcome/Welcome.vue')
  },

  {
    path: 'exception',
    component: BlankLayout,
    children: [{
      path: 'exc403',
      meta: {
        exemption: true
      },

      name: '抱歉，你无权访问该页面',
      component: () => import('@/views/exception/Exc403.vue')
    },

    {
      path: 'exc404',
      meta: {
        exemption: true
      },

      name: '抱歉，你访问的页面不存在',
      component: () => import('@/views/exception/Exc404.vue')
    },

    {
      path: 'exc500',
      meta: {
        exemption: true
      },

      name: '抱歉，服务器出错了',
      component: () => import('@/views/exception/Exc500.vue')
    }
    ]
  }
  ]
}
]

export const asyncRoutes = [{
  path: '/',
  component: BasicLayout
}]

export const finalRoutes = [{
  path: '*',
  redirect: '/exception/exc404'
}]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

router.addRoutes(asyncRoutes)
router.addRoutes(finalRoutes)

router.beforeEach((to, from, next) => {
  document.title = to.name || 'Octopus Pro'
  // 如果设置过全局路由免验证，这里则不会校验，尽在开发环境生效
  if (config.env === 'dev' && config.routePass) {
    next()
  } else {
    // 路由验证
    if (!to.matched || !to.matched.length) {
      // 无法匹配的路由跳转到404页面
      next('/exception/exc404')
    } else if (to.meta.exemption) {
      // 豁免路由直接跳转
      next()
    } else if (!checkPermissionMenu(to.matched[to.matched.length - 1].path, store.state.userMenu)) {
      // 如果没有权限则跳转403页面
      next('/exception/exc403')
    } else {
      next()
    }
  }
})

export default router
