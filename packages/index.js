import RocketForm from './RocketForm/index';
import RocketTable from './RocketTable/index';
import SearchForm from './SearchForm/index';
import RocketDesc from './RocketDesc/index';

const install = function (Vue, opts = {}) {
  Vue.use(SearchForm);
  Vue.use(RocketForm);
  Vue.use(RocketTable);
  Vue.use(RocketDesc);
  let options = {
    /**
     * form/table全局尺寸
     * medium / small / mini
     */
    size: opts.size || 'small',
    // table列中字段为空时，默认显示内容
    empty: opts.empty || '-',
    // 搜索表单全局配置
    searchForm: {
      inline: opts.inline || 'flex',
    },
    // 表格全局配置
    rocketTable: {
      // 是否展示工具条
      toolbar: opts.toolbar,
      // 表格列对齐方式
      align: opts.align || 'center',
      // 表格是否显示斑马线
      stripe: opts.stripe,
      // 表格是否显示边框
      border: opts.border,
      // 是否显示分页器
      pager: opts.pager,
      // 全局每页条数
      pageSize: opts.pageSize || 20,
      // 表格无数据时展示内容
      emptyText: opts.emptyText || '暂无数据',
    },
    rocketDesc: {},
  };
  // boolean类型特殊处理，因为false不能直接覆盖
  if (typeof opts.toolbar == 'undefined') options.rocketTable.toolbar = true;
  if (typeof opts.stripe == 'undefined') options.rocketTable.stripe = true;
  if (typeof opts.border == 'undefined') options.rocketTable.border = true;
  if (typeof opts.pager == 'undefined') options.rocketTable.pager = true;
  Vue.prototype.$rocket = options;
};
export { SearchForm, RocketForm, RocketTable, RocketDesc };
export default {
  install,
};
