import QueryForm from './QueryForm/index'
import BaseTable from './BaseTable/index'
import PowerForm, { RocketForm } from './PowerForm/index'
import './assets/index.scss'

const install = function (Vue) {
  Vue.use(QueryForm)
  Vue.use(BaseTable)
  Vue.use(PowerForm)
  Vue.use(RocketForm)
}
export {
  QueryForm, BaseTable, PowerForm
}
export default {
  install,
}
