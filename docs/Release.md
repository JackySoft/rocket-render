# 版本说明

## v2.3.5

重新修订文档和 readme

## v2.3.4

修复头像上传时，返回数组问题，头像上传本身返回的数组应该只包含一张图片，过去未做处理，把历史头像也进行了返回。

## v2.3.0

开发一系列便捷功能：

1. search-form 组件在 flex 模式下，增加展开和收缩按钮，对于表单项有很多时，非常管用，会隐藏过多表单，手动点击按钮，才会展开所有表单项。

2. search-form 和 rocket-form 针对下拉组件，增加 fetchOptions 方法，可以快捷赋值，解决过去通过下标索引的方式赋值的笨重问题。

```js
{
  type: 'select',
  model: 'cityId',
  placeholder: '请选择城市',
  options:[],
  field:{
    label: 'name',
    value: 'id'
  },
  fetchOptions: async ()=>{
    return await this.$api.getCityList();
  }
}
```

> field 字段主要用于对返回的数组做字段映射的，因为下拉框组件只能使用 label 和 value 字段，如果接口返回的是其它字段，就可以使用 field 做映射。

3. search-form 和 rocket-form 支持直接通过字段对象取值，过去使用数组下标取值。

```js
// search-form
// 获取model=user字段的options数组。
const list = this.queryJson.$user.options;

// rocket-form
// 获取model=user字段的options数组。
this.formJson.formList.$user.options = list;
```

> 数组中的每一个表单项会自动注册到上层对象中，并使用$访问。

4. rocket-form 表单项展示隐藏增加函数支持。

```js
// 这是过去写法，当type包含1、2、3时，显示此下拉框
{
  type: 'select',
  label: '城市',
  show: {
    model: 'type',
    val: [1,2,3]
  },
  model:'cityId'
}

// 支持函数写法
{
  type: 'select',
  label: '城市',
  show: (form)=>{
    return form.type.includes(1,2,3);
  },
  model:'cityId'
}
```

5. search-form 默认自带样式，过去 search-form 无背景色、无默认样式。

```css
.rr-search-form {
  background-color: #fff;
  padding: 20px 20px 0;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}
```

> 如果跟业务不符，需要自行覆盖该默认样式。

6. rocket-table 操作列的权限判断，支持函数调用

```js
{
    prop: '',
    label: '操作',
    type: 'action',
    fixed: 'right',
    list: [
        {
            text: '编辑',
            permission: ({ authStatus, status }) => {
                return authStatus === 4 && status === 0;
            },
        },
    ]
}
```

7. 下拉框、级联框、文本框支持手动关闭清除图标

```js
{
  type: 'input',
  model: 'userName',
  clearable: true,
}
```

> 过去文本框的清除功能，默认开启，但无法关闭，现在可以手动关闭，默认是开启状态。

8. 上传组件支持图片预览功能。
9. 表单验证返回了 promise，支持 await 调用。
10. 表单中支持嵌套表格，只需要使用 type='table'即可。

## v2.2.16

1. 重构 RocketTable，简化使用方式；

```html
<rocket-table
  :json.sync="tableJson"
  @handleOperate="handleOperate"
  @handleChange="getTableList"
  @handleAction="handleAction"
/>
<script>
  export default {
    data(){
      return {
        tableJson: {
        title: 'JSON配置表格',
        actionList: [
          {
            type: 'primary',
            text: '新增',
          }
        ],
        columns: [
          {
            prop: 'selection',
            type: 'selection',
            label: '选框',
          },
          {
            prop: 'index',
            type: 'index',
            label: '序号',
          },
          {
            prop: 'uid',
            label: '用户ID',
            align: 'left',
          },
          {
            prop: 'use_status',
            label: '当前状态',
            type: 'click',
            formatter(row) {
              if (row.use_status > 2) {
                return '--';
              }
              return {
                1: '在线',
                2: '离线',
              }[row.use_status];
            },
          },
          {
            prop: '',
            label: '操作',
            type: 'action',
            width: '200px',
            fixed: 'right',
            list: [
              {
                prop: 'status',
                val: {
                  2: '启用',
                  1: {
                    text: '禁用',
                    color: 'danger',
                  },
                },
                permission: true,
              },
              {
                text: '编辑',
                permission: true,
              },
              {
                text: '删除',
                color: 'danger',
                permission: true,
              },
            ],
          },
        ],
        data: [],
        pagination: {
          pageNum: 1,
          total: 0,
        },
      }
    }
  }
</script>
```

2. 增加全局配置

```js
Vue.use(RocketRender, {
  size: 'small',
  empty: '-',
  inline: 'flex',
  toolbar: true,
  align: 'center',
  stripe: true,
  border: false,
  pager: true,
  pageSize: 20,
  emptyText: '暂无数据',
});
```

## v2.2.15

1. 修复 RocketTable 列表为空的问题，当字段返回空字符串时，显示-

## v2.2.14

1. 修复 SearchForm 无法动态赋值问题，由于 watch 未做深度监听对象，导致 model 对象发生变化后，未更新

## v2.2.8

1. 优化表格返回值格式化，如果值为 Null/undefined 时默认返回 '-' ，其它情况返回 empty 字段或者'-'，empty 可动态设置默认返回值

## v2.2.7

1. 下拉框支持结构映射，默认为 label/value

```js
{
  type: 'select',
  model: 'user_status',
  label: '用户状态',
  // 结构转换
  field: {
    label: 'name',
    value: 'id',
  },
  options: [
    { name: '全部', id: 0 },
    { name: '已注销', id: 1 },
    { name: '老用户', id: 2 },
    { name: '新用户', id: 3 },
  ],
}
```

## v2.2.7

1. 优化表格列的 key，防止因为重复 key 导致 warning
2. 下拉框、文本框默认添加可删除属性，下拉框默认可搜索

## v2.2.5

1. 调整查询和重置按钮的位置，查询在前，重置在后
2. 增加分页自定义字段

## v2.2.2

1. 秒速组件增加过滤器，日期和金额格式化，用法同表格列

## v2.2.1

1. 表格增加过滤器，日期和金额格式化

```js
// 时间格式化
{
  prop:'login_time',
  label:'登录日期'
  filter:'datetime'
}
// 日期格式化
{
  prop:'login_time',
  label:'登录日期'
  filter:'date'
}
// 金额格式化（千分位+2位小数）
{
  prop:'amount',
  label:'收入'
  filter:'money'
}
```

## v2.2.0

1. 强化上传功能，尽可能满足官方所有功能。
2. 优化 rocket-form 代码。
3. 表格中，当 type=action 时，同时设置了宽度时，才会关闭 tool-tip，否则会默认所有列开启。
4. 表格动态创建 ID，防止一个页面同时嵌套多个表格时 ID 冲突问题。
5. 优化 SearchForm 功能

## v2.1.12

1. 优化 rocket-desc 组件，rocket-form 的日期范围组件增加 export 属性。
2. 扩展上传功能，listType 支持 text/picture/picture-card/avatar/upload 等

## v2.1.11

1. rocket-desc 支持一键切换为编辑模式。（详情转编辑福利）
2. rocket-desc 支持链式调用，formatter 格式化等。

## v2.1.10

1. 新增 rocket-desc 组件，快速构建详情页面，100%支持 el-descriptions 组件功能

## v2.1.9

1. rocket-form 增加插槽功能，当实现不了的时候，可以自定义插槽。
2. rocket-form 支持嵌套表格场景。

## v2.1.8

1. 增加 rocket-desc 组件。
2. 修复 rocket 问题。

## v2.1.5

1. RocketTable 中 permission 字段增加字段映射，可根据字段值来控制按钮显示隐藏。
2. 优化项目结构，整合 examples、packages、docs，废除 rocket-render-doc 项目。

## v2.0.3

1. 重构 search-form，通过属性、事件透传，支持所有原生属性和事件
2. 优化结构，减少代码量
3. 表格列支持 html 渲染类型
4. 表头支持 tips 提示语

## v1.1.2

1. 当接口返回 0 时，表格会渲染为 '--'，需要做兼容判断

## v1.1.1

1. table 添加 empty 字段，当返回值为空时，默认显示 '--'，可通过 empty 指定显示内容
2. 优化表格 formatter 方法
3. type='number'时，默认使用 H5 数字框，鼠标悬浮出现上下箭头，设置 arrow:false，可关闭箭头
4. table 中的列字段，当 type='click'时，如果当前列返回内容为空，列取消点击功能

## v1.1.0

1. 修复上传无法回显图片问题
2. 添加图片尺寸校验 fileLimit:{width:200,height:300,tips:'图片尺寸不符合要求'}
3. 优化表格上方操作区按钮样式
4. 下拉选项支持清空 clearable
5. 文本框增加 type="number"只能输入数字类型
6. 修复表格 fixed 问题
7. 表格操作列需要根据状态判断按钮权限，大家可通过自定义列实现

## v1.0.6

1. 增加自定义列，允许做特殊扩展

## v1.0.4

1. 修复 type=input 时，showWordLimit 不生效问题

## v1.0.3

1. 优化 type=link 功能
2. 修复表格 tooltip 显示 Bug
3. 表格增加返回空的默认处理，通过 empty 属性设置

## v1.0.0

1. 版本升级：yarn upgrade @ued2345/octopus-form@1.0.0 或 yarn add @ued2345/octopus-form

2. 添加简化版 ts 定义

3. 修复 table 事件 Bug

4. 开发文档集成 Demo 示例，可直接通过开发文档 Demo 示例查看功能和演示

5. 优化组件代码，修复 vuepress 打包问题

## v0.9.0

1. upload 增加 httpRequest 覆盖自定义上传

2. table 数据增加 span-method 做跨行功能

3. table 多选功能事件改为 selection-change，跟 ELementUI 保持一致

4. 优化 table，通过$attrs和$listeners 尽可能保留原有 ElementUI 属性和事件

5. 表格自定义排序 handleSort 修改为原生 sort-change 事件

6. 关于 table 事件：

   @handleChange/@handleAction/@handleCellClick 为自定义事件，具体用法根据开发文档来，其它均为 el-talbe 原生事件，比如：多选@selection-change/@sort-change/跨行:span-method

7. 表格支持多级表套，但未实现深度嵌套（暂未做递归处理）

## v0.8.1

1. 表格列增加超长隐藏并显示 tooltips，默认为 true，也可以通过 false 进行关闭
2. 表格中增加图片点击预览; type=image,image={type:'list',width:60,height:40}
3. 修复按钮文字超长问题
4. radio 支持禁用
5. 支持文本下拉（合并平安 MR）
6. 支持 cascader 多选、过滤、清除选中内容、整体禁用、单项禁用

## v0.6.0

1. 优化组件加载结构，通过 component 自动映射
2. 表格密度默认调整为 small
3. 给所有组件增加自定义 change 事件，可在 JSON 中绑定用于接口回调
4. 支持单个下拉联动，调用接口回显另外一个下拉
5. 支持多个下拉联动
6. 优化重置功能，增加 action:{ type:'reset',model:'all'}，在按钮点击时可重置当前表单
7. 优化时段组件，当时段切换时，自动清空后者
8. 修改级联下拉 union-select 组件，改为 change 接收，手动调用接口实现

## v0.5.0

1. 表格 column 中的 type，增加 click 和 index 类型，分别表示该列可点击，可索引
2. 表格增加序号列，设定 type:index，会自动生成序号列
3. 增加文字对齐方式，align: 'left/center/right'
4. 表格 action 列，handleAction 事件增加第三个参数 type，具体可参考文档
5. QueryForm 组件，增加 inline 属性，可控制非栅格布局
6. PowerForm 组件
   - type 从 text 改为 input，保持全局统一
   - 增加 prepend 属性
   - 增加 prefixIcon 和 sufixIcon 属性
7. 调整 TimeSelect 组件布局
8. Radio-Group 组件，触发 change 事件，新增重置功能

   ```js
   action: {
     type: 'reset',
     model: ['status','register_date']//切换按钮组时，会清空对应的列表字段
   }
   ```

9. 下拉级联，调整数据源

   ```js
   type: 'union-select',
   label: '城市',
   action: {
     type: 'cascader'
   },
   items:[
   	{
       placeholder: '请选择省份',
       model: 'user_province',
       options:[
       	{
           label: '湖北省',
           value: 10001,
           children: [
             { label: '武汉市', value: 100010 },
             { label: '襄阳市', value: 100011 },
           ]
         },
         {
           label: '上海市',
           value: 20001,
           children: [
             { label: '浦东区', value: 200010 },
             { label: '松江区', value: 200011 },
           ]
         },
         {
           label: '北京市',
           value: 30001,
           children: [
             { label: '海淀区', value: 300010 },
             { label: '朝阳区', value: 300011 },
           ]
         },
       ],
     },
     {
       placeholder: '请选择城市',
       model: 'user_city',
       options: []
     },
   ]
   ```

10. FileUpload 组件增加 response 结构映射（每个业务后台上传接口结构不同，后期需要统一）

    ```code
    response: {
    	response: 'response',
    	code: 'code',
    	data: 'data',
    	msg: 'msg',
    	codeVal: 1,
    	dataVal: 'url'
    }
    ```

11. 优化文件上传组件，返回值均为数组结构
12. 表格增加批量勾选功能，可实现批量更新/删除
