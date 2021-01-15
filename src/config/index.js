/**
 * 全局配置：env/mock
 * 地址管理：接口base地址、MockApi地址、SentryApi地址、
 * 获取系统环境，默认dev，开发环境
 * 根据domain动态获取当前环境
 */
const env = process.env.VUE_APP_ENV || 'prod'
const match = (document.domain.match(/([^.*]+).2345.cn/) || ['', 'st0'])[1]
console.log('当前环境:' + env)
const EnvConfig = {
  dev: { // 开发环境
    baseApi: `//gateway.tech.2345.cn/permission-${match}`,
    mockApi: 'http://yapi.web.2345.cn/mock/437'
  },
  test: { // 测试环境
    baseApi: `//gateway.tech.2345.cn/permission-${match}`,
    mockApi: 'http://yapi.web.2345.cn/mock/437',
    sentryDsn: 'http://7e6691baf60a4f1d80cead974cbab3de@sentry.zt.2345.cn/3'
  },
  prod: { // 生产环境
    baseApi: '//bumblebee.2345.cn',
    sentryDsn: 'https://cd076aee88894ccba48dee53df0c7725@sentry.2345.cn/3'
  }
}
export default {
  env, // 当前环境dev|test|prod
  routePass: false, // 全局设置所有路由免验证，仅在开发环境下生效
  mock: false, // 是否开启全局mock,即使开启，在生产环境也不会生效
  namespace: '__ADMIN_DEMO', // 项目localStorage\sessionStorage命名空间
  ...EnvConfig[env]
}
