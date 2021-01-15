import request from '@/utils/request'

export default {
  /**
   *  获取用户权限菜单信息
   *  @param data.reqTypeEnumValue = "ALL", // 所有类型
   *  @param data.systemId = 1657, // 系统ID,这里是你申请到的系统Id
   *  @param data.userId = 19 // 当前用户Id
   * }
   **/
  getUserMenu: data => {
    return request({
      data,
      url: '/unified-config/queryUserPermissionInfo',
      method: 'post',
      mock: false
    })
  }
}
