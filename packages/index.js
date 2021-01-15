import QueryForm from './QueryForm/index'
import BaseTable from './BaseTable/index'
import PowerForm from './PowerForm/index'

const install = function (Vue) {
  Vue.use(QueryForm)
  Vue.use(BaseTable)
  Vue.use(PowerForm)
}
export {
  QueryForm, BaseTable, PowerForm
}
export default {
  install,
}
