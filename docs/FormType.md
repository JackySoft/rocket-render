# 控件类型

基于 ElementUI 二次封装的组件，主要给 RocketForm 和 SearchForm 提供服务。
除自定义参数以外，所有属性都和 ElementUI 保持一致。

## 支持控件

1. `type='text'`文本框
2. `type='textarea'`文本域
3. `type='number'`Html5 原生数字框
4. `type='input-number'`ElementUI 数字框
5. `type='select'`下拉框
6. `type='time-select'`时间选择器 - 固定时间
7. `type='time-picker'`时间选择器 - 任意时间
8. `type='date' / 'week' / 'month' / 'year' / 'dates' / 'datetime'`与 ElementUI 保持一致
9. `type='daterange' / 'monthrange' / 'datetimerange'` 日期/时间 区间
10. `type='radio' / 'radio-group'`单选框
11. `type='radio-button'`单选按钮组
12. `type='switch'`开关组件
13. `type='checkbox'`复选框，组件会根据 options 字段自动判断是否使用复选框组
14. `type='cascader'`级联框
15. `type='transfer'`穿梭框
16. `type='upload'`上传框
17. `type='link'`文字链接，类似于<a href=""></a>
18. `type='button'`按钮组件
19. `type='label'`文本组件
20. `type='tips'`tips 组件
21. `type='table'` 支持表单中内嵌表格组件
22. `type='slot'` 如果想自定义，可以使用 slot 来自定义组件。

### 自定义参数

| 参数         | 说明                     | 类型                        | 可选值   | 默认值 |
| :----------- | :----------------------- | :-------------------------- | :------- | :----: |
| type         | 支持大部分组件           | String                      | 参考上文 |   无   |
| label        | 表单文本                 | String                      | 无       |   无   |
| model        | 需要渲染的 v-model       | String                      | 无       |   无   |
| tips         | 提示语                   | String                      | 无       |   无   |
| change       | 自定义事件               | fn(val,values,model,config) | 无       |   无   |
| show         | 是否显示此字段           | fn(values)                  | 无       |   无   |
| fetchOptions | 下拉框独有，可以拉取接口 | fn()                        | 无       |   无   |

> 每个表单都支持 change 事件，用来处理自定义业务。
> 每个表单都支持 show 方法，用来处理显隐功能。当前只支持在 rocket-form 中做显隐。

## Input 组件

:::demo

```html
<search-form :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          name: '',
          age: 0,
        },
        form: [
          {
            type: 'text',
            model: 'name',
            label: '名称',
            placeholder: '请输入用户名称',
            // 控制组件宽度
            width: '150px',
            /**
             * 所有组件自定义事件，可做异步操作，修改其它表单值
             * val 当前输入值
             * values 当前表单所有值
             * model 当前表单对象
             */
            change(val, values, model) {
              // 修改其它表单项值
              values.type = 0;
            },
          },
          {
            type: 'text',
            model: 'age',
            label: '年龄',
            width: '150px',
            // 控制组件是否显示
            show(values) {
              if (values.name) return true;
              return false;
            },
          },
        ],
      };
    },
  };
</script>
```

:::

> prepend 只支持 字符串，不支持配置组件。

## Select 组件

:::demo

```html
<search-form :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          userStatus: [1, 2],
        },
        form: [
          {
            type: 'select',
            model: 'userStatus',
            label: '用户状态',
            multiple: true, // 支持多选
            filterable: true, //支持输入过滤
            clearable: true,
            // 如果下拉框的值是动态的，可以使用fetchOptions获取，必须返回promise
            fetchOptions: async () => {
              return [
                { name: '全部', id: 0 },
                { name: '已注销', id: 1 },
                { name: '老用户', id: 2 },
                { name: '新用户', id: 3 },
              ];
            },
            // 字段映射，用来处理接口返回字段，避免前端去循环处理一次。
            field: {
              label: 'name',
              value: 'id',
            },
            options: [],
            // 如果想要修改其它表单值，可以通过change事件来处理
            change: this.getSelectList,
          },
        ],
      };
    },
    methods: {
      getSelectList(val, values) {
        // 此处可调用接口、修改form对象等
        this.form[0].options.push({
          label: '测试',
          value: Math.floor(Math.random() * 100),
        });
        // 修改用户名
        values.userName = 'jack';
      },
    },
  };
</script>
```

:::

### 属性介绍

| 参数       | 说明     | 类型    | 可选值     |            默认值             |
| :--------- | :------- | :------ | :--------- | :---------------------------: |
| filterable | 是否过滤 | Boolean | true/false |             true              |
| clearable  | 是否清楚 | Boolean | true/false |             true              |
| field      | 结构映射 | Object  | 无         | {label:'label',value:'value'} |

> field 为字段映射，下拉框默认使用 label 和 value 渲染，如果接口返回的不是 label 和 value，可以使用 field 进行转换，非常便捷。

> 如果要获取 SearchForm 中的下拉值，可以使用 this.form.$userStatus.options 或者 this.form[0].options。

> 如果要获取 RocketForm 中的下拉值，可以使用 this.json.formList.$userStatus.options 或者 this.json.formList[0].options。因为两个组件的结构不一样。

## Date 组件

:::demo

```html
<search-form inline="flex" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          register_date: '2020-12-12', //初始化值
        },
        form: [
          {
            type: 'date',
            model: 'register_date',
            label: '注册日期',
          },
          {
            type: 'daterange',
            model: 'login_time',
            label: '日期范围',
            // 对于日期范围控件来说，一般接口需要拆分为两个字段，通过export可以很方便的实现字段拆分
            export: ['startTime', 'endTime'],
            // 日期转换为时间戳单位
            valueFormat: 'timestamp', // 支持：yyyy-MM-dd HH:mm:ss
            defaultTime: ['00:00:00', '23:59:59'], //可以设置默认时间，有时候非常有用。后端查询的时候，必须从0点开始才能查到数据。
          },
          {
            type: 'datetime',
            label: '注册时间',
            model: 'register_datetime',
            shortcuts: true, //显示快捷键
          },
        ],
      };
    },
  };
</script>
```

> 这里有一个非常实用的功能：日期范围默认赋值以后，组件会自动分解成两个字段，重置的时候，还能还原回去。

:::

### type = date/daterange/datetime/datetimerange

| 参数      | 说明       | 类型    | 可选值   |        默认值         |
| :-------- | :--------- | :------ | :------- | :-------------------: | --- |
| type      | 日期类型   | String  | 参考标题 |          无           |
| shortcuts | 日期快捷键 | Boolean | `true    |        false`         | 无  |
| export    | 导出字段   | Array   | 无       | `[startTime,endTime]` |

> 日期类型：'date', 'week', 'month', 'year', 'dates', 'datetime'

> 日期区间：'daterange', 'monthrange', 'datetimerange'

> 对于范围组件'daterange', 'monthrange', 'datetimerange'，为了方便前端传参，可通过指定 export 来导出字段名称，因为范围组件只有一个 v-model 值，往往后端需要拆解为两个字段，比如 dateTime=['2021-01-01','2021-12-01']，拆解为：startTime='2021-01-01',endTime='2021-12-01';默认为 startTime,endTime，可手动设置。

## Checkbox 组件

:::demo

```html
<search-form :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          match: 1, //初始化值
        },
        form: [
          {
            type: 'checkbox',
            model: 'match',
            label: '是否匹配',
            trueLabel: 1, //可设置选中的替换值，不设置会返回true
            falseLabel: 0, //可设置非选中的替换值，不设置会返回false
          },
        ],
      };
    },
  };
</script>
```

:::

### 属性介绍

| 参数           | 说明     | 类型   | 可选值   | 默认值 |
| :------------- | :------- | :----- | :------- | :----: | --- |
| type           | 单选类型 | String | 参考标题 |   无   |
| options[label] | 显示文本 | String | 无       |   无   |
| options[value] | 表单域值 | String | Number   |   无   | 无  |

## Switch 组件

:::demo

```html
<search-form :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          isCheck: 0, //初始化值
        },
        form: [
          {
            type: 'switch',
            model: 'isCheck',
            label: '是否校验',
            activeValue: 1, // 打开映射值
            inactiveValue: 0, // 关闭映射值
          },
        ],
      };
    },
  };
</script>
```

:::

## Radio 组件

:::demo

```html
<search-form inline="flex" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          use_status: 2, //初始化值
        },
        form: [
          {
            type: 'radio',
            label: '使用状态',
            placeholder: '请选择使用状态',
            model: 'use_status',
            options: [
              { label: '在线', value: 1 },
              { label: '离线', value: 2 },
            ],
            // 支持fetchOptions来动态获取
          },
        ],
      };
    },
  };
</script>
```

:::

## Cascader 组件

:::demo

```html
<search-form :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          province: ['Hubei', 'Wuhan'], //初始化值
        },
        form: [
          {
            type: 'cascader',
            model: 'province',
            label: '省份',
            disabled: false, //支持整体禁用
            filterable: true, //支持过滤
            props: {
              multiple: true, // 支持多选
            },
            options: [
              {
                value: 'Hubei',
                label: '湖北',
                disabled: true, //支持单项禁用
                children: [
                  {
                    value: 'Wuhan',
                    label: '武汉',
                  },
                  {
                    value: 'Xiangyang',
                    label: '襄阳',
                  },
                ],
              },
              {
                value: 'Beijing',
                label: '北京',
                children: [
                  {
                    value: 'Haidian',
                    label: '海淀区',
                  },
                  {
                    value: 'ChaoYang',
                    label: '朝阳',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  };
</script>
```

:::

## TimeSelect

:::demo

```html
<search-form inline="flex" :json="form" :model.sync="queryForm" />

<script>
  export default {
    data() {
      return {
        queryForm: {
          time_part_start: '02:00', //初始化值
          time_part_end: '05:00', //初始化值
        },
        form: [
          {
            type: 'time-select',
            label: '注册时段',
            model: 'time_part_start',
            pickerOptions: {
              start: '00:00',
              step: '01:00',
              end: '23:00',
            },
          },
        ],
      };
    },
  };
</script>
```

:::

## RocketTable

### type = table

> 当`type=table`时，支持表单嵌套表格，表格所具备功能同 rocket-table，添加 table 属性即可。

> 需要注意的是：表格所拥有的事件不能定义，需要在 table 中添加 handleAction/handleCellClick/handleChange/selectionChange/sortChange 等方法进行接收。table 只能用在 RocketForm 中，不能用在 SearchForm

> 表格中需要的数据 data，请再 v-model 对象里面传递，不要在 table 中添加 data

:::demo

```html
<rocket-form :json="json" v-model="form" />

<script>
  export default {
    data() {
      return {
        form: {
          userName: '', //初始化值
          userList: [
            { name: 'jack', age: 20 },
            { name: 'tom', age: 30 },
          ], //初始化值
        },
        json: {
          formList: [
            {
              type: 'text',
              label: '用户名',
              model: 'userName',
            },
            {
              type: 'table',
              label: '用户信息',
              model: 'userList',
              table: {
                border: true,
                toolbar: false,
                handleAction() {
                  // 接受操作按钮点击
                },
                handleCellClick() {
                  // 接受单元格点击
                },
                handleChange() {
                  // 接受页码切换事件
                },
                selectionChange() {
                  // 接受复选事件（表格中有复选框列）
                },
                sortChange() {
                  // 排序事件
                },
                column: [
                  {
                    prop: 'name',
                    label: '用户名',
                  },
                  {
                    prop: 'age',
                    label: '年龄',
                  },
                ],
              },
            },
          ],
        },
      };
    },
  };
</script>
```

:::

| 参数  | 说明                                 | 类型   | 可选值   | 默认值 |
| :---- | :----------------------------------- | :----- | :------- | :----: |
| table | 表格所需要属性，同 rocket-table 一致 | String | 参考标题 |   无   |

## 事件

| 参数   | 说明                                     | 类型 | 可选值 | 默认值 |
| :----- | :--------------------------------------- | :--- | :----- | :----: |
| change | 所有表单均暴露 change 事件，可做业务处理 | fn   | 无     |   无   |
| show   | 所有表单均暴露 show 事件，可做显示和隐藏 | fn   | 无     |   无   |

> change 事件返回三个参数 fn(val,values,model,json)，分别为当前组件值、当前表单所有值、当前组件 model 和当前 json 配置.

> show 函数主要用来处理显隐功能，返回 true，显示；返回 false，不显示；
