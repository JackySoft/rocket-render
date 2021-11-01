# 安装使用

1. 安装插件

```shell
yarn add rocket-render -S
```

2. 组件注册

```js
// 导入包
import RocketRender from 'rocket-render'
// 导入样式
import 'rocket-render/lib/rocket-render.css'
Vue.use(RocketRender)
```

3. 页面应用


> 为了页面的美观，建议外层加一个容器。search-form默认没有任何背景色和边距。

```html
<template>
    <div class="search-box">
        <search-form :json="form" :model.sync="queryForm" @handleQuery="getTableList"/>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        queryForm: {},
        form: [
            {
                type: "input",
                model: "user_name",
                label: "用户",
                placeholder: "请输入用户名称",
            },
            {
                type: "switch",
                model: "open",
                label: "状态"
            }
        ]
      }
    }
  };
</script>
<style>
    .search-box{
        padding:15px
    }
</style>
```