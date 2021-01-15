import formatDateFn from '../utils/formatDate.js'

// 调用dateFormatFn，作为过滤器使用
export const formatDate = (time, rule) => {
  if (!time) {
    return '/'
  }
  if (typeof (time) === 'string') {
    time = time.replace(/-/g, '/')
  }
  const date = new Date(time)
  return formatDateFn(date, rule)
}

// 金额过滤器，展示格式12.1（单位元），最多保留2位小数
export const amount = (num, len = 2) => {
  return Math.round(num * Math.pow(10, len)) / Math.pow(10, len)
}
