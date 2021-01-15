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
  },
  // TODO 这是一个示例
  getUserInfo: (data) => {
    return request({
      data,
      url: '/admin/login/index',
      method: 'get',
      mock: true
    })
  },
  getBasicList (data) {
    return request({
      data,
      url: '/basic/list',
      method: 'get',
      mock: true
    })
  }
}
