# RocketDesc 介绍

RocketDesc 基于 ElementUI 的 el-descriptions 封装，基于 json 快速实现一个具有描述的功能。

> RocketDesc 支持所有的 el-descriptions 功能，只有少数自定义属性，整体开发方式跟表格类似。

## 支持的功能列表

1. 无边框/有边框详情
2. 通过 span 跨列展示，支持垂直和水平布局。
3. 标签和值支持 class 和 style。
4. 支持标题、extra、label、value 等插槽功能。
5. 支持链式调用，比如：{ prop:"user.name", label:"用户名" }。
6. 支持文本框链式赋值。
7. 支持一键切换为编辑模式。JSON 对象中，设置 edit:true 即可。

## 基本用法 - 不带边框

:::demo

```html
<rocket-desc :json="json1" :values="values1" />

<script>
  export default {
    data() {
      return {
        json1: {
          title: '基础描述-1',
          list: [
            {
              label: '用户名称',
              prop: 'userName',
            },
            {
              label: '用户性别',
              prop: 'userSex',
            },
            {
              label: '用户年龄',
              prop: 'userName',
            },
            {
              label: '用户职业',
              prop: 'userJob',
            },
            {
              label: '用户年薪',
              prop: 'userSalary',
            },
          ],
        },
        values1: {
          userName: '杰克',
          userAge: 30,
          userSex: '未知',
          userJob: '前端工程师',
          userSalary: '20万',
        },
      };
    },
  };
</script>
```

:::

## 基本用法 - 带边框，每行 2 列

:::demo

```html
<rocket-desc :json="json2" :values="values2" />

<script>
  export default {
    data() {
      return {
        json2: {
          title: '基础描述-2',
          border: true,
          column: 2,
          list: [
            {
              label: '用户名称',
              prop: 'userName',
            },
            {
              label: '用户性别',
              prop: 'userSex',
            },
            {
              label: '用户年龄',
              prop: 'userName',
            },
            {
              label: '用户职业',
              prop: 'userJob',
            },
            {
              label: '用户年薪',
              prop: 'userSalary',
            },
          ],
        },
        values2: {
          userName: '杰克',
          userAge: 30,
          userSex: '未知',
          userJob: '前端工程师',
          userSalary: '20万',
        },
      };
    },
  };
</script>
```

:::

## 基本用法 - 垂直分布、formatter 格式化、链式调用

:::demo

```html
<rocket-desc :json="json3" :values="values3" />

<script>
  export default {
    data() {
      return {
        json3: {
          title: '基础描述-3',
          border: true,
          column: 4,
          direction: 'vertical',
          extra: '看我',
          list: [
            {
              label: '用户名称',
              prop: 'userName',
            },
            {
              label: '用户性别',
              prop: 'userSex',
              formatter({ userSex }) {
                return userSex == '未知' ? '泰国人妖' : userSex;
              },
            },
            // 链式调用
            {
              label: '用户年龄',
              prop: 'user.age',
            },
            {
              label: '用户职业',
              prop: 'userJob',
            },
            {
              label: '用户年薪',
              prop: 'userSalary',
            },
            {
              label: '用户地址',
              prop: 'address',
            },
          ],
        },
        values3: {
          userName: '杰克',
          // 值为链式对象
          user: {
            age: 30,
          },
          userSex: '未知',
          userJob: '前端工程师',
          userSalary: '20万',
          address: '上海市浦东新区东方明珠',
        },
      };
    },
  };
</script>
```

:::

## 基本用法 - 弹框中显示

:::demo

```html
<el-button @click="showVisible = true" type="primary"> 弹框中显示 </el-button>
<el-dialog
  title="弹框描述"
  :visible.sync="showVisible"
  width="40%"
  :before-close="handleClose"
>
  <rocket-desc :json="json2" :values="values" class="mt20" />
  <rocket-desc :json="json4" :values="values" class="mt20" />
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleClose">确定</el-button>
  </span>
</el-dialog>
<rocket-desc :json="json4" :values="values" />

<script>
  export default {
    data() {
      return {
        showVisible: false,
        json2: {
          title: '基础描述-2',
          border: true,
          column: 2,
          list: [
            {
              label: '用户名称',
              prop: 'userName',
            },
            {
              label: '用户性别',
              prop: 'userSex',
            },
            {
              label: '用户年龄',
              prop: 'userName',
            },
            {
              label: '用户职业',
              prop: 'userJob',
            },
            {
              label: '用户年薪',
              prop: 'userSalary',
            },
            {
              label: '用户地址',
              prop: 'address',
            },
          ],
        },
        json4: {
          title: '基础描述-4',
          border: true,
          column: 1,
          list: [
            {
              label: '用户名称',
              prop: 'userName',
            },
            {
              label: '用户性别',
              prop: 'userSex',
            },
            {
              label: '用户年龄',
              prop: 'userName',
            },
            {
              label: '用户职业',
              prop: 'userJob',
            },
            {
              label: '用户年薪',
              prop: 'userSalary',
            },
            {
              label: '用户地址',
              prop: 'address',
            },
          ],
        },
        values: {
          userName: '杰克',
          userAge: 30,
          userSex: '未知',
          userJob: '前端工程师',
          userSalary: '20万',
          address: '上海市浦东新区东方明珠',
        },
      };
    },
    methods: {
      handleClose() {
        this.showVisible = false;
      },
    },
  };
</script>
```

:::

## 基本用法 - 自定义标题、label 和 value

:::demo

```html
<rocket-desc :json="json2" :values="values" class="mt20">
  <template slot="title">
    <el-button type="primary" size="small">自定义标题</el-button>
  </template>
  <template slot="extra">
    <el-button type="primary" size="small">右上角自定义</el-button>
  </template>
  <template slot="userName">
    <i class="el-icon-user"></i>
    {{ values.userName }}
  </template>
  <template slot="userSex">
    <el-tag>{{ values.userSex }}</el-tag>
  </template>
</rocket-desc>
<el-tabs v-model="activeType" class="mt20">
  <el-tab-pane label="注册信息" name="1">
    <rocket-desc :json="json4" :values="values" />
  </el-tab-pane>
  <el-tab-pane label="认证信息" name="2">
    <rocket-desc :json="json4" :values="values" />
  </el-tab-pane>
  <el-tab-pane label="补充信息" name="3">
    <rocket-desc :json="json4" :values="values" />
  </el-tab-pane>
</el-tabs>
<script>
  export default {
    data() {
      return {
        activeType: '1',
        showVisible: false,
        json2: {
          title: '标题自定义插槽',
          border: true,
          list: [
            {
              label: '用户名称',
              prop: 'userName',
              type: 'slot',
              slotLabelName: 'userName',
            },
            {
              label: '用户性别',
              prop: 'userSex',
              type: 'slot',
              slotValueName: 'userSex',
            },
            {
              label: '用户年龄',
              prop: 'userName',
            },
            {
              label: '用户职业',
              prop: 'userJob',
            },
            {
              label: '用户年薪',
              prop: 'userSalary',
            },
            {
              label: '用户地址',
              prop: 'address',
            },
          ],
        },
        json4: {
          border: true,
          list: [
            {
              label: '用户名称',
              prop: 'userName',
            },
            {
              label: '用户性别',
              prop: 'userSex',
            },
            {
              label: '用户年龄',
              prop: 'userName',
            },
            {
              label: '用户职业',
              prop: 'userJob',
            },
            {
              label: '用户年薪',
              prop: 'userSalary',
            },
            {
              label: '用户地址',
              prop: 'address',
            },
          ],
        },
        values: {
          userName: '杰克',
          userAge: 30,
          userSex: '未知',
          userJob: '前端工程师',
          userSalary: '20万',
          address: '上海市浦东新区东方明珠',
        },
      };
    },
    methods: {
      handleClose() {
        this.showVisible = false;
      },
    },
  };
</script>
```

:::

## 基本用法 - 切换为编辑模式

> 编辑模式下，values 一定要添加 sync 修饰符

:::demo

```html
<rocket-desc :json="json" :values.sync="values" class="mt20">
  <template slot="extra">
    <el-button type="primary" size="small" @click="handleAction">
      {{json.type == 'edit'?'提交':'编辑'}}
    </el-button>
  </template>
</rocket-desc>
<script>
  export default {
    data() {
      return {
        json: {
          border: true,
          type: '',
          column: 1,
          list: [
            {
              label: '用户名称',
              prop: 'userName',
              // 下面为切换到编辑模式时需要的属性
              type: 'text',
              placeholder: '请输入用户名称',
              rules: [
                {
                  required: true,
                  message: '请输入用户名称',
                  trigger: 'blur',
                },
              ],
            },
            {
              label: '用户性别',
              prop: 'userSex',
              // 下面为切换到编辑模式时需要的属性
              type: 'select',
              placeholder: '请选择用户性别',
              options: [
                { label: '男', value: 1 },
                { label: '女', value: 2 },
              ],
              rules: [
                {
                  required: true,
                  message: '请选择用户性别',
                  trigger: 'blur',
                },
              ],
            },
            {
              label: '用户年龄',
              prop: 'user.age',
              // 下面为切换到编辑模式时需要的属性
              type: 'text',
              placeholder: '请输入用户名称',
              rules: [
                {
                  required: true,
                  message: '请输入用户名称',
                  trigger: 'blur',
                },
              ],
            },
            {
              label: '注册时间',
              prop: 'createTime',
              // 下面为切换到编辑模式时需要的属性
              type: 'date',
              placeholder: '注册时间',
              rules: [
                {
                  required: true,
                  message: '请输入用户名称',
                  trigger: 'blur',
                },
              ],
            },
          ],
        },
        values: {
          userName: '杰克',
          user: {
            age: 30,
          },
          userSex: '未知',
          userJob: '前端工程师',
          userSalary: '20万',
          address: '上海市浦东新区东方明珠',
          createTime: '2021-12-01',
        },
      };
    },
    methods: {
      handleAction() {
        if (!this.json.type) this.json.type = 'edit';
        // 调用提交接口
      },
    },
  };
</script>
```

:::

## 组件属性

| 参数   | 说明                      | 类型   | 可选值 | 默认值 |
| :----- | :------------------------ | :----- | :----- | :----: |
| json   | 描述组件整体配置          | Object | 无     |        |
| values | 渲染的值，一定要添加.sync | Object | 无     |   无   |

## json 参数

> 所有的属性和 ElementUI 同步，下表只列自定义的属性；
> | 参数 | 说明 | 类型 | 可选值 | 默认值 |
> | :--- | :--------------------------- | :----- | :------------------ | :----: |
> | type | 目前支持 edit，一键可切换为编辑模式 | String | edit | slot |
> | list | 动态循环 label 的列表对象 | Array | 无 | 无 |

## json - list 参数

> list 对象，type 支持 label 和 value 的插槽定义，同时详情页面支持一键切换为编辑模式，因此 type 支持所有控件类型，用法同 rocket-form，不同的是，props 代替了 model 对象。

> 支持链式调用，比如：prop:"user.name"

| 参数          | 说明                                    | 类型     | 可选值                | 默认值 |
| :------------ | :-------------------------------------- | :------- | :-------------------- | :----: |
| type          | 类型，目前只支持 slot，用于内容的自定义 | String   | slot                  |  slot  |
| label         | 显示的文本                              | String   | 无                    |   无   |
| prop          | 需要渲染的接口字段                      | Any      | 无                    |   无   |
| slotLabelName | 标签插槽名称                            | String   | 无                    |   无   |
| slotValueName | 值插槽名称                              | String   | 无                    |   无   |
| formatter     | 数据格式化，参数为整个详情对象          | Function | 无                    |   无   |
| filter        | 过滤器，用来处理日期和金额              | String   | 'money/date/datetime' |   无   |
