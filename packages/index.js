import RocketForm from './RocketForm/index';
import RocketTable from './RocketTable/index';
import SearchForm from './SearchForm/index';
import RocketDesc from './RocketDesc/index';

const install = function (Vue) {
  Vue.use(SearchForm);
  Vue.use(RocketForm);
  Vue.use(RocketTable);
  Vue.use(RocketDesc);
};
export { SearchForm, RocketForm, RocketTable, RocketDesc };
export default {
  install,
};
