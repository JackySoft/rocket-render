import request from './../utils/request'

export default {
  getBasicList (data) {
    return request({
      data,
      url: '/basic/list',
      method: 'get',
      mock: true
    })
  }
}
