import PowerForm from './PowerForm'
import RocketForm from './RocketForm'

PowerForm.install = (Vue) => {
  Vue.component(PowerForm.name, PowerForm)
}
RocketForm.install = (Vue) => {
  Vue.component(RocketForm.name, RocketForm)
}
export {
  RocketForm
}
export default PowerForm
