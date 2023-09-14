# 安装使用

1. 安装插件

```shell
yarn add rocket-render -S
```

2. 组件注册

```js
// 导入包
import RocketRender from 'rocket-render';
// 导入样式
import 'rocket-render/lib/rocket-render.css';
// 默认安装
Vue.use(RocketRender);
// 或者使用自定义属性，以下的值都是系统默认值，如果你的业务不同，可以配置下面的全局变量进行修改。
Vue.use(RocketRender, {
  size: 'small',
  empty: '-',
  inline: 'flex',
  toolbar: true,
  align: 'center',
  stripe: true,
  border: true,
  pager: true,
  pageSize: 20,
  emptyText: '暂无数据',
});
```

> 插件支持自定义属性，建议默认即可，我们已经给大家调好，如果确实想改，就通过自定义属性的方式进行修改。

3.  页面应用

> search-form 自带背景色和内填充，如果你有特殊需要，可以添加 class 进行覆盖，另外建议给 model 添加 sync 修饰符。

```html
<template>
  <search-form
    :json="form"
    :model.sync="queryForm"
    @handleQuery="getTableList"
  />
</template>
<script>
  export default {
    data() {
      return {
        queryForm: {},
        form: [
          {
            type: 'text',
            model: 'user_name',
            label: '用户',
            placeholder: '请输入用户名称',
          },
        ],
      };
    },
  };
</script>
```
