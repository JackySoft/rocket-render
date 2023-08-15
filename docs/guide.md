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
Vue.use(RocketRender);
```

3. 页面应用

> 为了页面的美观，建议外层加一个容器。search-form 默认没有任何背景色和边距。

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
