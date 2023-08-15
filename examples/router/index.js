import Vue from 'vue';
import Router from 'vue-router';
import BasicLayout from '@/components/layout/BasicLayout';

Vue.use(Router);

export const routes = [
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
        component: () => import('@/views/welcome/Welcome.vue'),
      },
      {
        path: '/form',
        name: '表单',
        component: () => import('@/components/layout/BlankLayout.vue'),
        children: [
          {
            path: 'type',
            name: '表单类型',
            component: () => import('@/views/form/FormType.vue'),
          },
          {
            path: 'power',
            name: '弹框动态表单',
            component: () => import('@/views/form/DialogPower.vue'),
          },
          {
            path: 'drawer',
            name: '抽屉表单',
            component: () => import('@/views/form/DrawerPower.vue'),
          },
          {
            path: 'nested',
            name: '嵌套表单',
            meta: {
              exemption: true,
            },
            component: () => import('@/views/form/NestedForm.vue'),
          },
        ],
      },
      {
        path: '/table',
        name: '表格',
        component: () => import('@/components/layout/BlankLayout.vue'),
        children: [
          {
            path: 'json',
            name: '全新配置表格',
            component: () => import('@/views/table/JsonTable.vue'),
          },
        ],
      },
      {
        path: '/desc',
        name: '描述',
        component: () => import('@/components/layout/BlankLayout.vue'),
        children: [
          {
            path: 'basic',
            name: '常规描述信息',
            component: () => import('@/views/desc/BasicDesc.vue'),
          },
          {
            path: 'high',
            name: '插槽描述',
            component: () => import('@/views/desc/SlotDesc.vue'),
          },
          {
            path: 'edit',
            name: '切换编辑',
            component: () => import('@/views/desc/DescEdit.vue'),
          },
        ],
      },
    ],
  },
];

export default new Router({
  routes,
});
