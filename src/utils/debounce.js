/**
 * 防抖函数
 * @param {Function} method 事件触发的操作
 * @param {Number} delay 多少毫秒内连续触发事件，不会执行
 * @param {Boolean} immediate 是否立即执行第一次
 * @returns {Function}
 */
function debounce (method, delay, immediate) {
  let timer = null
  if (immediate) {
    method && method()
  }
  return function () {
    const self = this
    const args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      method.apply(self, args)
    }, delay)
  }
}

export default debounce
