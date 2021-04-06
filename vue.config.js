// 是否是本地开发模式
const isDev = process.env.VUE_APP_ENV === 'dev'
// 是否是生产模式
const isProd = process.env.VUE_APP_ENV === 'prod'

module.exports = {
  publicPath: isDev ? '/' : '', // 二级目录路径
  productionSourceMap: !isProd, // 生产环境sourceMap
  lintOnSave: isDev, // 保存立即检查
  // 开发运行相关配置
  devServer: {
    open: false, // 自动打开浏览器
    port: 8080, // 端口
    // 浏览器 overlay（刷新） 同时显示eslint的警告和错误
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
