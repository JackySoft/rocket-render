import request from '@/utils/request'

export default {
  // TODO 这是一个示例
  demoApi: data => {
    return request({
      data,
      url: '/mock/api/cpu',
      method: 'post',
      mock: false
    })
  }
}
