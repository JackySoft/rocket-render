/**
 * 全局配置：env/mock
 * 地址管理：接口base地址、MockApi地址、SentryApi地址、
 * 获取系统环境，默认dev，开发环境
 * 根据domain动态获取当前环境
 */
const env = process.env.VUE_APP_ENV || 'prod'
console.log('当前环境:' + env)
const EnvConfig = {
  dev: { // 开发环境
    baseApi: 'https://www.fastmock.site/mock/f7b55d085be70bdf2bdd62fb3c65081a/api',
    mockApi: 'https://www.fastmock.site/mock/f7b55d085be70bdf2bdd62fb3c65081a/api',
  },
  test: { // 测试环境
    baseApi: '',
    mockApi: '',
    sentryDsn: ''
  },
  prod: { // 生产环境
    baseApi: 'https://www.fastmock.site/mock/f7b55d085be70bdf2bdd62fb3c65081a/api',
    sentryDsn: 'https://www.fastmock.site/mock/f7b55d085be70bdf2bdd62fb3c65081a/api'
  }
}
export default {
  env, // 当前环境dev|test|prod
  mock: false, // 是否开启全局mock,即使开启，在生产环境也不会生效
  ...EnvConfig[env]
}
