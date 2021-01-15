// 拼完后截取最后两位
const padLeftZero = (str) => {
  return ('00' + str).substr(str.length)
}

/*
* 日期格式化，参数para
* date - 日期对象
* rule - 格式话规则
* */
const formatByDate = (date, rule) => {
  let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
  if (/(y+)/.test(fmt)) {
    // 匹配y+，替换成年份，转化成字符串，并按y但个数从后面截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export default formatByDate
