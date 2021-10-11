import RocketForm from './RocketForm/index'
import RocketTable from './RocketTable/index'
import SearchForm from './SearchForm/index'

const install = function (Vue) {
  Vue.use(SearchForm)
  Vue.use(RocketForm)
  Vue.use(RocketTable)
}
export {
  SearchForm, RocketForm, RocketTable,
}
export default {
  install,
}
