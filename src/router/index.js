import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '../components/layout/BasicLayout'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: 'welcome',
    children: [
      {
        path: 'welcome',
        meta: {
          exemption: true,
        },
        name: '欢迎使用本系统',
        component: () => import('../views/welcome/Welcome.vue')
      },
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

export default new Router({
  routes
})
