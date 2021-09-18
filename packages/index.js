import RocketForm from './RocketForm/index'
import RocketTable from './RocketTable/index'
import PowerForm from './PowerForm/index'

const install = function (Vue) {
  Vue.use(RocketForm)
  Vue.use(RocketTable)
  Vue.use(PowerForm)
}
export {
  RocketForm, RocketTable, PowerForm
}
export default {
  install,
}
