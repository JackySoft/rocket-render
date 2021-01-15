// 是否是本地开发模式
const isDev = process.env.VUE_APP_ENV === 'dev'
// 是否是生产模式
const isProd = process.env.VUE_APP_ENV === 'prod'

const Laserbeak = require('@ued2345/laserbeak/node')

// 把 App 的名称和版本信息写入环境变量VUE_APP_NAME、VUE_APP_VERSION
Laserbeak.setAppInfo()
// 根据 App 的名称和版本构造 release 信息并写入 `.sentry-release` 文件
// 此文件需要在应用的 `.gitignore` 文件中被排除
Laserbeak.setSentryRelease()
// 把 Logger 的种子代码写入环境变量，便于在构建时自动嵌入 HTML
Laserbeak.setSeedCode()

module.exports = {
  transpileDependencies: [
    '@ued2345/laserbeak',
  ],
  publicPath: isDev ? '/' : '', // 二级目录路径
  productionSourceMap: !isProd, // 生产环境sourceMap
  lintOnSave: isDev, // 保存立即检查
  // 开发运行相关配置
  devServer: {
    before: () => {
      require('@ued2345/pro-plus')
    },
    open: false, // 自动打开浏览器
    port: 8086, // 端口
    // 转发代理配置
    proxy: {
      '/permission': {
        target: 'http://datacenter.2345.cn', // 这里可以指向本地mock的服务，也可以指向服务端的host
        ws: false, // 是否启用websockets,项目存在ws连接时开启
        changOrigin: true, // 是否将请求header中的origin修改为目标地址
        // pathRewrite: {
        //   '^/xxxx': ''
        // }
      }
    },
    // 浏览器 overlay（刷新） 同时显示eslint的警告和错误
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
