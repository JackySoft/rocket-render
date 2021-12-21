/**
 * 工具函数
 * @param {string} options.unit 单位
 * @param {string} options.type 小数位丢舍类型 round:四舍五入  floor:舍弃 ceil:进位
 */
export function formatMoney(
  num,
  decimal = 2,
  options = { unit: '￥', type: 'floor' },
) {
  if (isNaN(num)) return num;
  if (num == 0 || num == '') return num;
  if (typeof options != 'object') throw Error('options必须为object类型');
  // 千分位正则
  var reg = /\d{1,3}(?=(\d{3})+(.\d+)?$)/g;
  let n = num.toString(),
    i = n.indexOf('.');
  if (i > -1) {
    // 小数位小于decimal，直接toFixed即可
    if (n.substr(i).length < decimal) {
      num = Number(num).toFixed(decimal);
    } else {
      if (options.type == 'floor') {
        num = n.substring(0, i + 3);
      } else if (options.type == 'round') {
        num = Number(num).toFixed(decimal);
      }
    }
    return options.unit + (num + '').replace(reg, '$&,');
  } else {
    num = Number(num).toFixed(decimal);
    return options.unit + (num + '').replace(reg, '$&,');
  }
}

// 日期格式化
export function formatDate(date, rule) {
  if (!date) return '-';
  if (!(date instanceof Date)) date = new Date(+date);
  let fmt = rule || 'yyyy-MM-dd hh:mm:ss';
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear());
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const value = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? value : ('00' + value).substr(value.length),
      );
    }
  }
  return fmt;
}
