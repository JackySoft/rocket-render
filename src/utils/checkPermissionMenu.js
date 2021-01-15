/**
 * 方法说明
 *@method checkPermissionMenu
 *@param {string} path 路径名称
 *@param {array} menu 菜单数组
 *@return {boolean} 在菜单中找到路径，返回true,否则返回false,未传递菜单时返回true
 */
const checkPermissionMenu = (path, menu = []) => {
  if (!menu || !menu.length) {
    return false
  }
  let res = false
  const findPath = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (res) {
        break
      }
      if (arr[i].path === path) {
        res = true
        break
      } else if (arr[i].children && arr[i].children.length) {
        findPath(arr[i].children)
      }
    }
  }
  findPath(menu)
  return res
}
export default checkPermissionMenu
