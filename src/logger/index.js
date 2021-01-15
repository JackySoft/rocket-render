import config from '../config'
import Vue from 'vue'
import * as Logger from '@ued2345/laserbeak'
import router from '../router'

if (config.env !== 'dev') {
  const isProd = config.env === 'prod'
  Vue.use(Logger.vuePlugin)
  Logger.init({
    appName: process.env.VUE_APP_NAME,
    appVersion: process.env.VUE_APP_VERSION,
    sdkVersion: process.env.VUE_APP_LOGGER_VERSION,
    debug: !isProd,
    // 抽样率： 1 表示 100%，0.01 表示 1%
    sampleRate: 1,
  })
  Logger.initSentry(
    // for Sentry SDK
    {
      debug: !isProd,
      dsn: config.sentryDsn,
    },
    // for Sentry integrations
    {
      // for Sentry integration for Vue
      Vue: {
        Vue,
        attachProps: true,
      },
    },
  )
  Logger.initResError()
  // 上报 PV
  router.afterEach(() => {
    Logger.log.pv()
  })
}
