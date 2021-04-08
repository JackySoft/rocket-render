/**
 * ajax请求封装
 * 1、调用客户端的加解密方法
 * 2、统一处理请求头，将post转成form-urlencoded的形式
 * 3、ajax请求默认设置，如过期时间
 * 4、统一处理响应信息
 */
import axios from 'axios'
import { Notification } from 'element-ui'
import config from './../config/index'

/**
 *  自定义配置新建一个 axios 实例
 * @type {AxiosInstance}
 */
const service = axios.create({
  timeout: 30000, // 请求超时时间
  baseURL: config.baseApi
})

// 请求拦截器
service.interceptors.request.use(config => {
  const headers = config.headers
  // TODO 这里需要针对项目修改token传递方式
  if (!headers.authToken) headers.authToken = 'token'
  return config
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 获取返回结构
  // TODO code, data, msg 是公司最新的响应体结构
  // TODO success， errorCode， errorMessage是原中台权限中心的响应体结构
  const { code, data, msg } = response.data
  // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data
  if (code === 0) {
    return data
  } else {
    Notification.error(msg || '网络请求异常，请稍后重试!')
    return Promise.reject(msg || '网络请求异常，请稍后重试!')
  }
}, (err) => {
  Notification.error('网络请求异常，请稍后重试!')
  return Promise.reject(err)
})

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 * @param mock 本次是否请求mock而非线上
 */
function request (options) {
  // options.method默认为get
  options.method = options.method || 'get'
  // get请求使用params字段
  if (options.method.toLowerCase() === 'get') {
    (!options.params) && (options.params = options.data)
  }
  // 局部接口mock
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    let isMock = false
    if (Object.prototype.hasOwnProperty.call(options, 'mock')) {
      isMock = !!options.mock
    } else {
      isMock = !!config.mock
    }
    console.log('isMock:', isMock)
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  // 错误提示文案
  return service(options)
}

// 适配this.$request.get()调用
['get', 'post', 'patch', 'delete', 'put'].forEach(item => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})
export default request
