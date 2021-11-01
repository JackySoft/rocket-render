# SearchForm介绍

基础查询表单组件，可设置为栅格布局或行内布局，支持ElementUI上所有表单组件，语法与原生一致。

> SearchForm只能用于查询表单，更复杂的表单可使用RocketForm。SearchForm支撑三种布局类型：grid布局、flex布局和inline布局

## 基本用法 - 行内表单(inline=inline)

:::demo 通过配置form对象，可动态生成UI组件，点击查询会更新model对象，并通过@handleQuery事件做后续操作；inline默认为栅格布局，更完整用法请参考下文详细组件文档。

```html
<search-form inline="inline" :json="form" :model.sync="queryForm"/>

<script>
  export default {
    data() {
      return {
        queryForm: {},
        form: [
          {
            type: "input",
            model: "user_name",
            label: "用户名称",
            placeholder: "请输入用户名称",
          }
        ]
      }
    }
  };
</script>
```

:::

## 基本用法 - 栅格表单(inline=grid)

> 根据屏幕分辨率动态控制，1920以上每行4列，1200以上每行3列，1200以下每行2列

:::demo 通过配置form对象，可动态生成UI组件，点击查询会更新model对象，并通过@handleQuery事件做后续操作；inline默认为栅格布局，更完整用法请参考下文详细组件文档。

```html
<search-form inline="grid" :json="form" :model.sync="queryForm"/>

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
```

:::

## 基本用法 - Flex表单(inline=flex)，默认为flex布局

> flex表单为左右结构，左边依然是行内布局，相比于行内表单，flex只是把查询和重置按钮放到了右边。

:::demo 通过配置form对象，可动态生成UI组件，点击查询会更新model对象，并通过@handleQuery事件做后续操作；inline默认为栅格布局，更完整用法请参考下文详细组件文档。

```html
<search-form inline="flex" :json="form" :model.sync="queryForm"/>

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
```

:::

## 组件属性

| 参数   | 说明               | 类型        | 可选值       | 默认值 |
| :----- | :----------------- | :---------- | :----------- | :----: |
| inline | 行内表单，默认栅格 | String     | `grid|flex|inline` | `flex` |
| json   | 绑定JSON对象       | Array[item] | 无           |   无   |
| model  | 表单初始化数据     | Object      | 无           |   无   |

## json参数

| 参数    | 说明                             | 类型                                 | 可选值   | 默认值 |
| :------ | :------------------------------- | :----------------------------------- | :------- | :----: |
| type    | 控件类型                         | String                               | 参考上文 |   无   |
| model   | 绑定的动态属性，用于保存表单值   | String                               | 无       |   无   |
| options | 通用配置列表                     | Array                                | 无       |   无   |
| change  | 所有UI组件的自定义事件           | Function(val,values,model,config)    | 无       |   无   |
| action  | 按钮的行为，主要用来重置其它表单 | {type:'reset',model:'all'/['name'] } |          |   无   |

> 表格列出来的为自定义参数，其它参数请参考原生ElementUI
> 当type='number'时，会生成H5原生数字框，鼠标悬浮时会出现数字上下滚动箭头，通过设置arrow:false，可手动隐藏箭头

## 事件

| 参数         | 说明             | 类型       | 可选值 | 默认值 |
| :----------- | :--------------- | :--------- | :----- | :----: |
| @handleQuery | 点击查询触发函数 | fn(page=1) | 无     |   无   |
| @handleReset | 点击重置触发函数 | fn(page=1) | 无     |   无   |

> 所有组件支持change事件，可做自定义业务处理，返回{val,values,model}，分别对应当前值，表单所有值和当前model
