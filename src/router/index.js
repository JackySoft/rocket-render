import Vue from 'vue'
import Router from 'vue-router'
import BlankLayout from '../components/layout/BlankLayout'
import BasicLayout from '../components/layout/BasicLayout'
import store from '../store'
import checkPermissionMenu from '../utils/checkPermissionMenu'

// 解决跳转重复路由时的报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location)
    .catch(err => err)
}

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/user',
    component: BlankLayout,
    children: [
      {
        path: '/',
        redirect: 'login',
      },
      {
        path: 'auth',
        meta: {
          exemption: true,
        },
        name: '授权登录中...',
        component: () => import('../views/user/Auth.vue')
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        redirect: 'welcome'
      },
      {
        path: 'welcome',
        meta: {
          exemption: true,
        },
        name: '欢迎使用本系统',
        component: () => import('../views/welcome/Welcome.vue')
      },
      {
        path: 'exception',
        component: BlankLayout,
        children: [
          {
            path: 'exc403',
            meta: {
              exemption: true,
            },
            name: '抱歉，你无权访问该页面',
            component: () => import('../views/exception/Exc403.vue')
          },
          {
            path: 'exc404',
            meta: {
              exemption: true,
            },
            name: '抱歉，你访问的页面不存在',
            component: () => import('../views/exception/Exc404.vue')
          },
          {
            path: 'exc500',
            meta: {
              exemption: true,
            },
            name: '抱歉，服务器出错了',
            component: () => import('../views/exception/Exc500.vue')
          }
        ]
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/form',
        name: '表单',
        component: () => import('./../components/layout/BlankLayout.vue'),
        children: [
          {
            path: 'grid',
            name: '栅格表单',
            component: () => import('./../views/form/GridQuery.vue'),
          },
          {
            path: 'inline',
            name: '行内表单',
            component: () => import('./../views/form/InlineQuery.vue'),
          },
          {
            path: 'dialog',
            name: '弹框基础表单',
            component: () => import('./../views/form/DialogQuery.vue'),
          },
          {
            path: 'power',
            name: '弹框动态表单',
            component: () => import('./../views/form/DialogPower.vue'),
          }, {
            path: 'drawer',
            name: '抽屉表单',
            component: () => import('./../views/form/DrawerPower.vue'),
          }, {
            path: 'nested',
            name: '嵌套表单',
            meta: {
              exemption: true,
            },
            component: () => import('./../views/form/NestedForm.vue'),
          }
        ]
      },
      {
        path: '/table',
        name: '表格',
        component: () => import('./../components/layout/BlankLayout.vue'),
        children: [
          {
            path: 'basic',
            name: '基础表格',
            component: () => import('./../views/table/BasicTable.vue'),
          },
          {
            path: 'high',
            name: '高级表格',
            component: () => import('./../views/table/HighTable.vue'),
          },
        ]
      }
    ]
  }
]

export const finalRoutes = [
  {
    path: '*',
    redirect: '/exception/exc404'
  }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

router.addRoutes(asyncRoutes)
router.addRoutes(finalRoutes)

// 路由重置 https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
  document.title = to.name || 'Octopus Pro'
  // 路由验证
  if (!to.matched || !to.matched.length) {
    // 无法匹配的路由跳转到404页面
    next('/exception/exc404')
  } else if (to.meta.exemption) {
    // 豁免路由直接跳转
    next()
  } else if (!checkPermissionMenu(to.matched[to.matched.length - 1].path, store.state.userMenu)) {
    next('/exception/exc403')
  } else {
    next()
  }
})

export default router
