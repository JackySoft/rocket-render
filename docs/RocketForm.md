# RocketForm

动态表单组件，基于 JSON 动态生成常规表单，用法可参考，目前支持。

## 支持功能

> 基本涵盖所有 ElementUI 表单组件，详情请参考 RocketUI 文档

## 基本用法

:::demo

```html
<rocket-form
  ref="rocketForm"
  :json="dialogConfig"
  v-model="rocketForm"
  @handleSubmit="handleSubmit"
  @handleClose="handleClose"
></rocket-form>
<script>
  export default {
    data() {
      return {
        dialogConfig: {
          showFooter: true,
          layout: {
            gutter: 15,
          },
          formList: [
            {
              type: 'text',
              label: '用户名称',
              placeholder: '请输入用户名称',
              model: 'cname',
              required: true,
              width: '80%',
              tips: {
                align: 'right',
                text: '长度最大6位',
              },
              rules: [
                {
                  required: true,
                  message: '请输入用户名称',
                  trigger: ['change', 'blur'],
                },
                {
                  pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,10}$/,
                  message: '1-10个字符，支持中文、字母、数字和下划线',
                  trigger: ['change', 'blur'],
                },
              ],
            },
            {
              type: 'select',
              label: '用户状态',
              placeholder: '请选择用户状态',
              model: 'user_status',
              tips: '至少选择一项',
              options: [
                { label: '已注销', value: 1 },
                { label: '老用户', value: 2 },
                { label: '新用户', value: 3 },
              ],
            },
            {
              type: 'inline',
              label: '城市',
              list: [
                {
                  type: 'select',
                  placeholder: '请选择省份',
                  model: 'user_province',
                  change: this.getSelectList,
                  options: [
                    {
                      label: '湖北省',
                      value: 10001,
                    },
                    {
                      label: '上海市',
                      value: 20001,
                    },
                  ],
                },
                {
                  type: 'select',
                  placeholder: '请选择城市',
                  model: 'user_city',
                  options: [
                    {
                      label: '武汉市',
                      value: 10001,
                    },
                    {
                      label: '上海市',
                      value: 20001,
                    },
                  ],
                },
              ],
            },
            {
              type: 'radio',
              label: '使用状态',
              placeholder: '请选择使用状态',
              model: 'use_status',
              options: [
                { label: '在线', value: 1 },
                { label: '离线', value: 2 },
              ],
            },
            {
              type: 'switch',
              label: '启用状态',
              model: 'status',
            },
            {
              type: 'date',
              label: '注册日期',
              model: 'register_date',
              shortcuts: true,
            },
            {
              type: 'checkbox',
              label: '兴趣',
              model: 'intrest',
              options: [
                { label: '游泳', value: 1 },
                { label: '打乒乓球', value: 2 },
                { label: '台球', value: 3 },
                { label: '篮球', value: 4 },
              ],
            },
            {
              type: 'textarea',
              label: '用户描述',
              placeholder: '请输入用户描述',
              model: 'remark',
              rows: 4,
            },
          ],
        },
        // v-model对象，可初始化值
        rocketForm: {
          cname: 'jack',
          intrest: [1, 2],
        },
      };
    },
    methods: {
      async handleSubmit() {
        const res = await this.$request.get('/user/submit', this.rocketForm);
        if (res) {
          this.$message.success('操作成功');
          // 如果需要，可对表单进行重置
          this.$refs['rocketForm'].handleReset();
          // 关闭页面
          this.handleClose();
        }
      },
      getSelectList(val, values, model) {
        this.$request.get('/select/list').then((res) => {
          this.dialogConfig.formList[2].list[1].options = res;
        });
      },
      handleClose() {
        this.$message.success('关闭页面');
      },
    },
  };
</script>
```

:::

## 嵌套表单用法

:::demo

```html
<rocket-form
  :json="dialogConfig"
  v-model="rocketForm"
  @handleSubmit="handleSubmit"
  @handleClose="handleClose"
></rocket-form>
<script>
  export default {
    data() {
      return {
        dialogConfig: {
          showFooter: true,
          layout: {
            gutter: 15,
          },
          formList: [
            {
              type: 'text',
              label: '用户名称',
              placeholder: '请输入用户名称',
              model: 'cname',
              required: true,
              width: '80%',
              tips: {
                align: 'right',
                text: '长度最大6位',
              },
              rules: [
                {
                  required: true,
                  message: '请输入用户名称',
                  trigger: ['change', 'blur'],
                },
                {
                  pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,10}$/,
                  message: '1-10个字符，支持中文、字母、数字和下划线',
                  trigger: ['change', 'blur'],
                },
              ],
            },
            {
              type: 'inline',
              label: '下拉组合',
              list: [
                {
                  type: 'select',
                  placeholder: '请选择省份',
                  model: 'user_province',
                  change: this.getSelectList,
                  options: [
                    {
                      label: '湖北省',
                      value: 10001,
                    },
                    {
                      label: '上海市',
                      value: 20001,
                    },
                  ],
                },
                {
                  type: 'select',
                  placeholder: '请选择城市',
                  model: 'user_city',
                  options: [
                    {
                      label: '武汉市',
                      value: 10001,
                    },
                    {
                      label: '上海市',
                      value: 20001,
                    },
                  ],
                },
              ],
            },
            {
              type: 'inline',
              label: '随意组合',
              list: [
                {
                  type: 'radio',
                  label: '',
                  placeholder: '请选择使用状态',
                  model: 'use_status',
                  options: [
                    { label: '在线', value: 1 },
                    { label: '离线', value: 2 },
                  ],
                },
                {
                  type: 'switch',
                  label: '启用状态',
                  model: 'status',
                },
              ],
            },
            {
              type: 'inline',
              label: '概率配置',
              list: [
                {
                  span: 8,
                  type: 'select',
                  placeholder: '请选择概率配置',
                  model: 'a3',
                  labelWidth: '0',
                  options: [
                    { label: '10%', value: 1 },
                    { label: '20%', value: 2 },
                    { label: '30%', value: 3 },
                    { label: '40%', value: 4 },
                  ],
                },
                {
                  span: 8,
                  type: 'input',
                  placeholder: '请输入概率配置',
                  model: 'a4',
                  append: '%',
                  labelWidth: '0',
                },
                {
                  span: 3,
                  type: 'button',
                  button: {
                    type: 'text',
                    text: '按钮',
                  },
                  labelWidth: '0',
                },
                {
                  span: 5,
                  type: 'label',
                  text: '普通文本',
                },
              ],
            },
            {
              type: 'group',
              label: '分组 - 组合',
              list: [
                [
                  {
                    span: 8,
                    type: 'input',
                    placeholder: '请输入抽取次数',
                    label: '抽取',
                    labelWidth: '80px',
                    model: 'a7',
                    rules: [
                      {
                        required: true,
                        message: '请输入抽取次数',
                        trigger: 'blur',
                      },
                    ],
                    label1: '次可开启宝箱1',
                  },
                  {
                    span: 8,
                    type: 'input',
                    placeholder: '请输入奖励金币',
                    label: '奖励金币',
                    model: 'a8',
                    rules: [
                      {
                        required: true,
                        message: '请输入奖励金币',
                        trigger: 'blur',
                      },
                    ],
                  },
                  {
                    span: 3,
                    type: 'button',
                    button: {
                      type: 'primary',
                      round: true,
                      icon: 'el-icon-plus',
                      text: '按钮',
                    },
                    click(value, config) {
                      // 可监听点击事件
                      console.log(value, config);
                    },
                    labelWidth: '0',
                  },
                ],
              ],
            },
          ],
        },
        // v-model对象，可初始化值
        rocketForm: {
          cname: 'jack',
          intrest: [1, 2],
        },
      };
    },
    methods: {
      async handleSubmit() {
        const res = await this.$request.get('/user/submit', this.rocketForm);
        if (res) {
          this.$message.success('操作成功');
          // 如果需要，可对表单进行重置
          this.$refs['rocketForm'].handleReset();
          // 关闭页面
          this.handleClose();
        }
      },
      getSelectList(val, values, model) {
        this.$request.get('/select/list').then((res) => {
          this.dialogConfig.formList[2].list[1].options = res;
        });
      },
      handleClose() {
        this.$message.success('关闭页面');
      },
    },
  };
</script>
```

:::

## 弹框表单，包含组件关联显示隐藏

:::demo 可嵌套在 dialog 中使用，所有组件的用法跟 QueryForm 一样，可通过 show 对象来做关联显示

```html
<el-button type="primary" @click="showModal=true">弹框表单</el-button>
<el-dialog
  title="用户信息"
  :visible.sync="showModal"
  width="50%"
  @close="handleClose"
>
  <rocket-form
    ref="dialogForm"
    :json="dialogConfig"
    v-model="dialogForm"
    @handleSubmit="handleSubmit"
    @handleClose="handleClose"
  ></rocket-form>
  <span slot="footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
</el-dialog>
<script>
  export default {
    data() {
      return {
        showModal: false,
        dialogForm: {
          intrest: [1],
        }, //初始化表单
        dialogConfig: {
          formWidth: '700px', // 表单宽度，默认100%
          labelWidth: '100px', // 左侧文本宽度，默认100px
          size: 'medium', // 表单控件大小，默认medium
          labelSuffix: ':', // 文本后缀，默认 冒号
          showFooter: false, // 是否显示默认的提交按钮，弹框组件里面也有确定和取消，可二选一
          formList: [
            {
              type: 'text', // 文本框
              label: '用户名称',
              placeholder: '请输入用户名称',
              model: 'cname',
              maxlength: '10',
              showWordLimit: true,
              prepend: 'https://', // 前缀
              append: '.com', // 后缀
              prefixIcon: 'el-icon-search', //前缀icon
              change(val, values, model) {
                // 可获取所有值，也可直接重置修改其它字段
                values.query_field = 2;
              },
              required: true, // 必填，会在文本前加*
              tips: '用户名长度最少6个', // 文本框下提示语
              rules: [
                // 规则
                {
                  required: true,
                  message: '请输入用户名称',
                  trigger: ['change', 'blur'],
                },
                {
                  pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,10}$/,
                  message: '1-10个字符，支持中文、字母、数字和下划线',
                  trigger: ['change', 'blur'],
                },
              ],
            },
            {
              type: 'select', // 下拉框
              label: '用户状态',
              placeholder: '请选择用户状态',
              model: 'user_status',
              options: [
                { label: '已注销', value: 1 },
                { label: '老用户', value: 2 },
                { label: '新用户', value: 3 },
              ],
            },
            {
              type: 'radio', // 单选
              label: '使用状态',
              placeholder: '请选择使用状态',
              model: 'use_status',
              options: [
                { label: '在线', value: 1 },
                { label: '离线', value: 2 },
              ],
            },
            {
              type: 'radiogroup', // 单选 - 按钮组合
              label: '类型',
              model: 'user_type',
              action: {
                type: 'reset', // 当切换按钮组时，会重置对应字段
                model: 'all', // 重置所有表单，也可通过数组重置部分表单
                // model: ['status', 'register_date', 'register_date_range']
              },
              options: [
                {
                  value: 1,
                  label: '少年',
                },
                {
                  value: 2,
                  label: '青年',
                },
                {
                  value: 3,
                  label: '中年',
                },
                {
                  value: 4,
                  label: '老年',
                },
              ],
            },
            {
              type: 'switch', // 开关
              label: '启用状态',
              model: 'status',
              activeValue: 1, // 默认打开，值为true，可修改为1
              inactiveValue: 0, // 默认关闭，值为false，可修改为0
              show: {
                // 当user_type为 1/3/4 时，才显示
                model: 'user_type',
                val: [1, 3, 4],
              },
              // 或者
              show: (form) => {
                return [1, 3, 4].includes(form.user_type);
              },
            },
            {
              type: 'checkbox',
              label: '兴趣',
              model: 'intrest',
              options: [
                { label: '游泳', value: 1 },
                { label: '打乒乓球', value: 2 },
                { label: '台球', value: 3 },
                { label: '篮球', value: 4 },
              ],
              show: {
                // 当user_type为 1/3/4 时，才显示
                model: 'user_type',
                val: [1],
              },
              // 或者
              show: (form) => {
                return form.user_type == 1;
              },
            },
          ],
        },
      };
    },
    methods: {
      async handleSubmit() {
        const res = await this.$request.get('/user/submit', this.rocketForm);
        if (res) {
          this.$message.success('操作成功');
          // 如果需要，可对表单进行重置
          this.$refs['rocketForm'].handleReset();
          // 关闭页面
          this.handleClose();
        }
      },
      getSelectList(val, values, model) {
        this.$request.get('/select/list').then((res) => {
          this.dialogConfig.formList[2].items[1].options = res;
        });
      },
      handleClose() {
        this.$message.success('关闭页面');
        this.showModal = false;
      },
    },
  };
</script>
```

:::

> 1. 示例中的属性比较多，但实际开发的过程中，属性是很少的，文档是为了让大家知道都有哪些属性可以配置，所以整理的比较全。
> 2. 表单联动、表单事件基本都是满足的，表单的显示和隐藏使用 show 来配置，如果 JSON 配置不出来，show 可以直接定义函数来实现。

## JSON 配置 - 上传

:::demo

```html
<el-button type="primary" @click="showModal=true">弹框表单 - 上传</el-button>
<el-dialog title="用户信息" :visible.sync="showModal" width="50%">
  <rocket-form
    ref="dialogForm"
    :json="dialogConfig"
    v-model="dialogForm"
  ></rocket-form>
  <span slot="footer">
    <el-button @click="showModal=false">取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </span>
</el-dialog>
<script>
  export default {
    data() {
      return {
        showModal: false,
        dialogForm: {},
        dialogConfig: {
          labelWidth: '150',
          formList: [
            {
              type: 'upload',
              label: '普通上传-text',
              model: 'user_image',
              listType: 'text', //展示类型：text/picture/picture-card
              action: '/mock/437/upload', //上传接口
              token: '', //如果接口需要token，就设置一下
              fileType: ['image/jpg', 'image/jpeg', 'image/png'], //文件格式校验
              fileSize: 1 * 1024, //校验大小，单位为K
              limit: 3, //上传个数限制
              multiple: false, // 单个上传活批量上传
              tips: '只能上传jpg/png文件，且不超过500kb', //上传提示语
              response: {
                response: '',
                code: 'code',
                data: 'data',
                msg: 'msg',
                codeVal: 0,
                dataVal: 'url',
              }, //设置返回数据结构，每个接口定义可能不同
            },
            {
              type: 'upload',
              label: '列表上传-card',
              model: 'user_image',
              listType: 'picture-card', //展示类型：text/picture/picture-card
              action: '/mock/437/upload', //上传接口
              token: '', //如果接口需要token，就设置一下
              fileType: ['image/jpg', 'image/jpeg', 'image/png'], //文件格式校验
              fileSize: 1 * 1024, //校验大小，单位为K
              limit: 3, //上传个数限制
              fileLimit: {
                width: 200,
                height: 300,
                // 或者可以设置ratio，宽高比，但是它于宽度属性是互斥的
                // ratio: 1
                tips: '图片尺寸不符合要求',
              },
              multiple: false, // 单个上传活批量上传
              tips: '只能上传jpg/png文件，且不超过500kb', //上传提示语
              response: {
                response: '',
                code: 'code',
                data: 'data',
                msg: 'msg',
                codeVal: 0,
                dataVal: 'url',
              }, //设置返回数据结构，每个接口定义可能不同
            },
            {
              type: 'upload',
              label: '列表上传-picture',
              model: 'user_image',
              listType: 'picture', //展示类型：text/picture/picture-card
              action: '/mock/437/upload', //上传接口
              token: '', //如果接口需要token，就设置一下
              fileType: ['image/jpg', 'image/jpeg', 'image/png'], //文件格式校验
              fileSize: 1 * 1024, //校验大小，单位为K
              limit: 3, //上传个数限制
              multiple: false, // 单个上传活批量上传
              tips: '只能上传jpg/png文件，且不超过500kb', //上传提示语
              //设置返回数据结构，每个接口定义可能不同
              response: {
                code: 'code',
                data: 'data',
                msg: 'msg',
                codeVal: 0,
                dataVal: 'url',
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

## JSON 配置 - 穿梭框

:::demo

```html
<el-button type="primary" @click="showModal=true">穿梭框</el-button>
<el-dialog title="用户信息" :visible.sync="showModal" width="50%">
  <rocket-form
    ref="dialogForm"
    :json="dialogConfig"
    v-model="dialogForm"
  ></rocket-form>
  <span slot="footer">
    <el-button @click="showModal=false">取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </span>
</el-dialog>
<script>
  export default {
    data() {
      return {
        showModal: false,
        dialogForm: {},
        dialogConfig: {
          formList: [
            {
              type: 'transfer',
              label: '授权用户',
              model: 'checkedUser',
              filterable: true,
              placeholder: '请选择授权用户',
              titles: ['未授权用户', '已授权用户'],
              buttonTexts: ['回左边', '到右边'],
              leftDefaultChecked: ['4'],
              rightDefaultChecked: ['3'],
              data: [
                {
                  key: '1',
                  label: 'Jack',
                  disabled: true,
                },
                {
                  key: '2',
                  label: 'Tom',
                },
                {
                  key: '3',
                  label: 'Lucy',
                },
                {
                  key: '4',
                  label: 'Lily',
                },
              ],
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## JSON 配置 - 嵌套表格

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

## JSON 配置 - 支持插槽开发

:::demo

```html
<rocket-form :json="json" v-model="form">
  <template v-slot:userAge>
    <el-input v-model="form.age" />
  </template>
</rocket-form>

<script>
  export default {
    data() {
      return {
        form: {
          userName: '',
          age: 10,
        },
        json: {
          formList: [
            {
              type: 'text',
              label: '用户名',
              model: 'userName',
            },
            {
              type: 'slot',
              label: '年龄',
              model: 'age',
              slotName: 'userAge',
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## RocketForm 属性

| 参数          | 说明            | 类型   | 可选值   |  默认值  |
| :------------ | :-------------- | :----- | :------- | :------: |
| ref           | 同 Vue 原生用法 | String | -        | 撑满全屏 |
| config        | 动态表单配置    | String | -        |    -     |
| v-model       | 响应式对象      | String | -        |    -     |
| @handleClose  | 关闭按钮        | fn     | 参考下文 |    无    |
| @handleSubmit | 提交按钮        | fn     | 参考下文 |    无    |

## config 参数

| 参数        | 说明                   | 类型    | 可选值              |  默认值  |
| :---------- | :--------------------- | :------ | :------------------ | :------: | ------- | -------- |
| formWidth   | 表单宽度               | String  | `700px`             | 撑满全屏 |
| labelWidth  | 表单文本宽度           | String  | `100px`             | `100px`  |
| labelSuffix | 文本后缀               | String  | `:`                 |   `:`    |
| size        | 表单控件大小           | String  | `medium             |  small   | mini`   | `medium` |
| formList    | 渲染表单数组           | Array   | 参考下文            |    无    |
| showFooter  | 显示默认提交按钮       | Boolean | `true               |  false`  | `false` |
| btnGroup    | 确定/取消自定义配置    | Object  | 参考下文            |    无    |
| layout      | 布局配置               | Object  | 参考 ElementUI 布局 |    无    |
| rules       | 表单验证，同 elementUI | Object  | 参考 ElementUI      |    无    |

> layout 目前主要用于 gutter，formList 中的控件默认都是 el-row+el-col 布局，所以可以设置间隙

## 组件内通用配置

| 参数  | 说明                  | 类型   | 可选值 | 默认值 |
| :---- | :-------------------- | :----- | :----- | :----: |
| width | 会设置到 style 里面去 | String | 无     |   无   |
| style | 会生成 style 属性     | Object | 无     |   无   |

> 如果 input 或其它控件只配置了 width，则源码会通过`style={width:${width}}`进行拼接
> 如果 input 或其它控件只配置了 style，则源码会通过`style=${style}`进行设置

## type - label

| 参数 | 说明                              | 类型   | 可选值  | 默认值 |
| :--- | :-------------------------------- | :----- | :------ | :----: |
| type | 渲染类型                          | String | `label` |   无   |
| text | 渲染值，动态值可通过 v-model 控制 | String | 无      |   无   |

## type - tips

| 参数 | 说明     | 类型   | 可选值 | 默认值 |
| :--- | :------- | :----- | :----- | :----: | --- |
| type | 渲染类型 | String | `tips` |   无   |
| tips | 渲染内容 | String | Object |   无   | 无  |

> tips 默认在组件下方 `{type:'tips',tips:'test'}`
> tips 在组件右方 `{type:'tips',tips:{align:'right',text:'test'}`
>
> > tips 设置在组件下方 `{type:'tips',tips:{align:'bottom',text:'test'}`

## type - button

| 参数   | 说明     | 类型   | 可选值                | 默认值 |
| :----- | :------- | :----- | :-------------------- | :----: |
| type   | 渲染按钮 | String | `button`              |   无   |
| button | 按钮配置 | Object | 跟 ElementUI 保持一致 |   无   |

> `{type:'button',button:{type:'primary',icon='el-icon-edit',text:'按钮'}}`

## config - btnGroup

| 参数    | 说明         | 类型   | 可选值                       | 默认值 |
| :------ | :----------- | :----- | :--------------------------- | :----: |
| confirm | 确认按钮配置 | Object | { text:'确认',loading:true } |   无   |
| cancel  | 取消按钮配置 | Object | { text:'取消' }              |   无   |

## type - upload

| 参数        | 说明                 | 类型   | 可选值                           |     默认值     |
| :---------- | :------------------- | :----- | :------------------------------- | :------------: |
| type        | 文件上传             | String | 参考标题                         |       无       |
| listType    | 列表类型             | String | `text/picture/picture-card`      | `picture-card` |
| action      | 上传接口地址         | String | 无                               |       无       |
| token       | 上传 token，可选     | String | 无                               |       无       |
| fileType    | 限制文件类型         | Array  | `["image/jpg"]`                  |       无       |
| fileSize    | 限制文件大小         | Number | `1*1024` 单位 K                  |       无       |
| limit       | 限制文件个数         | Number | `1....n`                         |       无       |
| fileLimit   | 限制文件尺寸         | Number | `{width:300,height:300,ratio:1}` |       无       |
| name        | 修改 file 的 name 值 | String | 无                               |   `fileKey`    |
| data        | 附带参数             | Any    | 无                               |       无       |
| response    | 设置接口结构         | Object | 默认：code,data,msg              |       无       |
| httpRequest | 自定义上传           | Object | 默认：code,data,msg              |       无       |

> fileLimit 中，宽度和高度属性与 ratio 是互斥，ratio 是限制图片上传宽高比例

## upload - response 返回结构设置

| 参数     | 说明           | 类型   | 可选值 | 默认值 |
| :------- | :------------- | :----- | :----- | :----: |
| response | 返回对象       | String | 无     |   无   |
| code     | 设置 code 结构 | String | 无     |   无   |
| data     | 设置 data 结构 | String | 无     |   无   |
| msg      | 设置错误结构   | String | 无     |   无   |
| codeVal  | 设置成功返回值 | String | 无     |   无   |

> 假设上传接口返回 {code:0,data:{url:'http://xxx.jpg'},msg:''}，这种就是标准的数据结构，我们不需要设置response，如果接口返回：{result:{status:200,data:{url:'http://xxx.jpg'},msg:''}}，则我们需要设置response，来保证上传组件可以接收正确的值

```js
/**
 * 如果接口返回如下结构，则我们需要单独设置响应体
 * {result:{status:200,data:{url:'http://xxx.jpg'},msg:''}}
*/
{
    type: 'upload',
    response:{
        response: 'result',
        code: 'status',
        data: 'data',
        msg: 'msg',
        codeVal: 200
    }
}
```

## type - transfer

| 参数                | 说明         | 类型    | 可选值                 | 默认值  |
| :------------------ | :----------- | :------ | :--------------------- | :-----: |
| type                | 穿梭框       | String  | 参考标题               |   无    |
| filterable          | 是否过滤     | Boolean | `true/false`           | `false` |
| titles              | 两个标题     | Array   | 可不填                 |   无    |
| buttonTexts         | 按钮文本     | Array   | 可不填                 |   无    |
| leftDefaultChecked  | 左侧选中得值 | Array   | 可不填                 |   无    |
| rightDefaultChecked | 右侧选中得值 | Array   | 可不填                 |   无    |
| data                | 数据源       | Array   | `{key,label,disabled}` |   无    |

## 事件处理

| 参数          | 说明     | 类型 | 可选值   | 默认值 |
| :------------ | :------- | :--- | :------- | :----: |
| @handleClose  | 取消事件 | fn   | 参考示例 |   无   |
| @handleSubmit | 确定事件 | fn   | 参考示例 |   无   |

## API 方法

| 参数        | 说明                                                         | 类型       | 可选值   | 默认值 |
| :---------- | :----------------------------------------------------------- | :--------- | :------- | :----: |
| handleReset | 通过 ref 调用，可重置表单                                    | fn         | 参考示例 |   无   |
| validate    | 自定义表单校验，通过 ref 调用，回调参数为 el-ui 表单校验结果 | Promise/fn | 无       |   无   |

> - 说明：validate 方法支持 await 调用。
> - 例如：const valid = await this.$refs.rocketForm.validate()
