# RocketTable 组件使用

基础表格组件，基于 JSON 动态生成固定的基础表格，支持原生大部分的属性和事件，目前只有个别事件是自定义。

## 支持功能

1. 基础表格
2. 表格分页（可控制隐藏，默认显示）
3. 工具条（刷新、表格密度、列设置、全屏）
4. 单列可点击、多列可点击
5. 多个链接(link)渲染、图片渲染、url 渲染、badge 状态渲染
6. 特殊数据格式化(formatter)
7. 操作区域权限控制（创建、编辑、删除）
8. 表格列排序、表头跨列、数据跨行
9. 通过 v-bind="$attrs"和v-on="$listners"保留大部分原生属性和事件
10. 支持表格索引列、支持表格多选功能
11. 支持表格自定义列
12. 表格中的列表按钮，支持使用 permission 来控制显示和隐藏，permission 支持布尔、函数和对象等三种配置方式。

## 基本用法[支持复选、单元格点击、图片、formatter、badge]

:::demo

```html
<search-form
  :json="searchJson"
  :model.sync="queryForm"
  @handleQuery="getTableList"
/>
<!-- 列表区域 -->
<rocket-table
  :json.sync="tableJson"
  @handleCellClick="handleCellClick"
  @handleOperate="handleOperate"
  @handleChange="getTableList"
  @handleAction="handleAction"
/>
<script>
  export default {
    data() {
      return {
        // 保存查询条件
        queryForm: {},
        searchJson: [
          {
            type: 'text',
            model: 'user_name',
            label: '用户',
            placeholder: '请输入用户名称',
          },
        ],
        tableJson: {
          title: 'JSON配置表格',
          actionList: [
            {
              type: 'primary',
              text: '新增',
            },
            {
              type: 'danger',
              text: '删除',
            },
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
              type: 'click',
              label: '用户ID',
              align: 'left',
            },
            {
              prop: 'cname',
              label: '用户名称',
              align: 'left',
            },
            {
              prop: 'user_img',
              label: '头像',
              showOverflowTooltip: false,
              type: 'image',
              image: {
                type: 'single', // single/list 支持单张图片和批量图片
                width: 60, // 设置图片宽度
                height: 40, // 设置图片高度
              },
            },
            {
              prop: 'user_site',
              label: '网址',
              type: 'url',
              showOverflowTooltip: false,
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
              prop: 'user_email',
              label: '邮箱',
            },
            {
              prop: 'user_status_name',
              label: '用户状态',
            },
            {
              prop: 'register_date',
              label: '注册时间',
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
                  // 支持函数的形式判断是否显示
                  permission: (row) => {
                    return row.status == 1;
                  },
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
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      // 首页列表查询,page为子组件传递的页码，默认为1
      getTableList(pageNum = 1) {
        this.tableJson.pagination.pageNum = pageNum;
        const data = {
          ...this.queryForm, // 查询表单数据
          ...this.pagination, // 默认分页数据
        };
        this.$request.get('/basic/list', data).then((res) => {
          this.tableJson.data = res.list.slice(0, 5);
          this.tableJson.pagination.total = res.total;
        });
      },
      /**
       * 列点击
       * 1. 只有其中一列可点击,通常只用row就够了，不需要根据prop做判断
       * 2. 有多列可点击，根据prop判断是哪一列被触发了
       * 3. 某一列有多个点击按钮，点击按钮的时候，会把对应的值回传回来(link)
       */
      handleCellClick({ row, prop, link }) {
        // 如果是多个列都绑定了click事件，可根据prop来区分是哪一列
        if (prop === 'uid') {
          this.$message.success('点击了用户ID');
        }
      },
      handleSelectionChange(rows) {
        this.$message.success('勾选项id为' + rows.map((item) => item.id));
      },
      // 表格上操作按钮
      handleOperate({ text, index }) {
        if (index === 0) {
          this.$message.success('你点击第一个操作按钮');
        } else if (index === 1) {
          this.$message.success('你点击了第二个操作按钮');
        }
      },
      // action为点击的按钮索引，row为当前行的数据
      handleAction({ index, text, row }) {
        // 也可以根据text的按钮文本来判断，因为索引不太可靠，有时候，删除一个按钮以后，索引会发生变化。
        if (index === 0) {
          this.$message.success('你选择了第一个按钮');
        } else if (index === 1) {
          this.$message.success('你选择了第二个按钮');
        } else {
          this.$message.success('你选择了第三个按钮');
        }
        console.log(row);
      },
    },
  };
</script>
```

:::

## 添加标题和操作按钮

> 当标题和操作按钮同时存在时，分别左右排列，当只有操作按钮时，居左排列。工具条可以手动隐藏。

:::demo

```html
<rocket-table :json.sync="tableJson" @handleChange="getTableList" />
<script>
  export default {
    data() {
      return {
        tableJson: {
          title: '用户列表',
          actionList: [
            {
              type: 'primary',
              text: '操作按钮',
            },
          ],
          columns: [
            {
              prop: 'uid',
              label: '用户ID',
              align: 'left',
            },
            {
              prop: 'user_email',
              label: '邮箱',
            },
          ],
          data: [],
          // 分页对象
          pagination: {
            pageNum: 1,
            pageSize: 20,
            total: 0,
          },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      // 首页列表查询,page为子组件传递的页码，默认为1
      getTableList(pageNum = 1) {
        this.tableJson.pagination.pageNum = pageNum;
        const data = {
          ...this.queryForm, // 查询表单数据
          ...this.tableJson.pagination, // 默认分页数据
        };
        this.$request.get('/basic/list', data).then((res) => {
          this.tableJson.data = res.list.slice(0, 5);
          this.tableJson.pagination.total = res.total;
        });
      },
    },
  };
</script>
```

:::

## 多级表头

:::demo 通过 span 控制数据跨行

```html
<rocket-table :json="tableJson" />
<script>
  export default {
    data() {
      return {
        tableJson: {
          title: '用户列表',
          columns: [
            {
              prop: 'user_info',
              label: '用户信息',
              align: 'center',
              span: [
                // 多级表头
                {
                  prop: 'cname',
                  label: '用户名称', // 普通列渲染
                  showOverflowTooltip: true, // true/false/不填，默认为true
                },
                {
                  prop: 'intrest_name',
                  label: '兴趣',
                  width: 70, // 可调整列宽度
                },
              ],
            },
            {
              prop: 'uid',
              label: '用户ID',
            },
          ],
          data: [],
          pagination: { page: 1 },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      // 首页列表查询,page为子组件传递的页码，默认为1
      getTableList(page = 1) {
        this.tableJson.pagination.page = page;
        const data = {
          ...this.queryForm, // 查询表单数据
          ...this.tableJson.pagination, // 默认分页数据
        };
        this.$request.get('/basic/list', data).then((res) => {
          this.tableJson.data = res.list.slice(0, 5);
        });
      },
    },
  };
</script>
```

:::

## 数据跨行

> 基于 span-method 可实现数据跨行，跨列，用法同官方教程。

:::demo 动态绑定 span-method 可实现数据跨行

```html
<rocket-table :json="tableJson" />
<script>
  export default {
    data() {
      return {
        tableJson: {
          columns: [
            {
              prop: 'uid',
              label: '用户ID',
              type: 'click', //此列可点击
            },
            {
              prop: 'cname',
              label: '用户名称', // 普通列渲染
              showOverflowTooltip: true, // true/false/不填，默认为true
            },
            {
              prop: 'intrest_name',
              label: '兴趣',
            },
          ],
          data: [], // 表格渲染数据
          spanMethod: ({ row, column, rowIndex, columnIndex }) => {
            if (columnIndex < 1) {
              if (rowIndex % 2 === 0) {
                return {
                  rowspan: 2,
                  colspan: 1,
                };
              }
            }
          },
          pagination: { pageNum: 1 },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      // 首页列表查询,page为子组件传递的页码，默认为1
      getTableList(pageNum = 1) {
        this.tableJson.pagination.pageNum = pageNum;
        const data = {
          ...this.queryForm, // 查询表单数据
          ...this.tableJson.pagination, // 默认分页数据
        };
        this.$request.get('/basic/list', data).then((res) => {
          this.tableJson.data = res.list.slice(0, 5);
        });
      },
    },
  };
</script>
```

:::

## 图片、网址、link 渲染

> 单元格可渲染图片、网址、link 连接等，同时支持服务端返回 HTML 进行渲染。

:::demo 通过 type 可设置渲染类型

```html
<rocket-table :json="tableJson" />
<script>
  export default {
    data() {
      return {
        tableJson: {
          columns: [
            {
              prop: 'user_img_list', //如果接口返回单张，需要设置type='single'
              label: '头像',
              showOverflowTooltip: false,
              type: 'image',
              image: {
                type: 'single', // single/list 支持单张图片和批量图片
                width: 60, // 设置图片宽度
                height: 40, // 设置图片高度
              },
            },
            {
              prop: 'user_site', // 网址渲染，默认新开窗口
              label: '网址',
              type: 'url', //支持打开url地址
              showOverflowTooltip: false,
            },
            {
              prop: 'user_link',
              label: '产品列表',
              type: 'link', //需要渲染成多个可点击按钮
              link: {
                prop: 'name', //渲染的字段
                limit: 3, //默认渲染个数，支持展开和关闭
              },
            },
          ],
          data: [], // 表格渲染数据
          pagination: { page: 1 },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      // 首页列表查询,page为子组件传递的页码，默认为1
      getTableList(pageNum = 1) {
        this.tableJson.pagination.pageNum = pageNum;
        const data = {
          ...this.queryForm, // 查询表单数据
          ...this.tableJson.pagination, // 默认分页数据
        };
        this.$request.get('/basic/list', data).then((res) => {
          this.tableJson.data = res.list.slice(0, 5);
        });
      },
    },
  };
</script>
```

:::

## 排序、多列点击、操作按钮

:::demo 通过 type 可设置渲染类型

```html
<rocket-table :json="tableJson" @handleCellClick="handleCellClick" />
<script>
  export default {
    data() {
      return {
        tableJson: {
          columns: [
            {
              prop: 'uid',
              label: '用户ID',
              type: 'click', // 此列可点击
              sortable: true, // 支持排序
            },
            {
              prop: 'cname',
              label: '用户名称',
              type: 'click', // 此列可点击
              showOverflowTooltip: true, // true/false/不填，默认为true
            },
            {
              prop: '', // 操作项prop不用填
              label: '操作',
              width: '200px',
              type: 'action', // 标记此列为操作按钮
              list: [
                // 第一种：常规用法，通过text显示按钮名称
                {
                  text: '编辑',
                  permission: true, // 默认显示，可不填，一般我们通过permission来做按钮权限，控制显示和隐藏
                },
                //  //支持style/class等相关属性，所有el-button支持的属性，都可以添加
                {
                  text: '删除',
                  permission: true,
                  style: { color: 'red' },
                  class: 'txt',
                },
                // 第二种：支持根据返回值动态显示不同按钮名称
                {
                  prop: 'status', //显示的按钮需要根据此状态动态控制
                  val: {
                    2: '启用', // status为2，显示启用
                    1: {
                      // status为1，显示禁用，同时设置按钮颜色
                      text: '禁用',
                      disabled: true, //按钮禁用
                    },
                  },
                  permission: true, //权限控制，根据后台返回动态设置
                },
                // 第三种 动态控制权限，当status=10时，显示添加按钮
                {
                  text: '添加',
                  permission: {
                    prop: 'status',
                    show: {
                      10: true,
                    },
                  },
                },
              ],
            },
          ],
          data: [
            { uid: 1001, cname: 'jack', status: 1 },
            { uid: 1002, cname: 'tom', status: 2 },
          ], // 表格渲染数据
          pagination: { page: 1 },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      // 首页列表查询,page为子组件传递的页码，默认为1
      getTableList(page = 1) {},
      handleCellClick({ row, prop, link }) {
        if (prop === 'uid') {
          this.$message.success('点击了用户ID');
        } else if (prop === 'cname') {
          this.$message.success('点击了用户名称');
        }
      },
    },
  };
</script>
```

:::

## 自定义列

:::demo 通过 type 可设置当前列为自定义列

```html
<rocket-table :json="tableJson">
  <template v-slot:copy="scope">
    <el-button
      type="text"
      icon="el-icon-document-copy"
      @click="handleCopy(scope.row)"
    >
      {{scope.row.uid}}
    </el-button>
  </template>
</rocket-table>
<script>
  export default {
    data() {
      return {
        tableJson: {
          columns: [
            {
              prop: 'uid',
              label: '用户ID',
              type: 'slot', //此列作为自定义列
              slotName: 'copy', //slot的插槽名称
            },
            {
              prop: 'cname',
              label: '用户名称', // 普通列渲染
              showOverflowTooltip: true, // true/false/不填，默认为true
            },
          ],
          data: [], // 表格渲染数据
          pagination: { page: 1 },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      // 首页列表查询,page为子组件传递的页码，默认为1
      getTableList(page = 1) {
        this.tableJson.pagination.page = page;
        const data = {
          ...this.queryForm, // 查询表单数据
          ...this.tableJson.pagination, // 默认分页数据
        };
        this.$request.get('/basic/list', data).then((res) => {
          this.tableJson.data = res.list.slice(0, 5);
        });
      },
      // 模拟复制功能
      handleCopy(row) {
        var input = document.createElement('input');
        input.style = 'position:absolute;left:0;bottom:0;opacity:0;';
        document.body.append(input);
        input.value = row.uid; // 修改文本框的内容
        input.select(); // 选中文本
        document.execCommand('copy'); // 执行浏览器复制命令
        this.$message.success('复制成功');
        setTimeout(() => {
          document.body.removeChild(input);
        }, 50);
      },
    },
  };
</script>
```

:::

## 权限介绍

权限是比较重要和复杂的工作，权限一般分为：菜单权限、按钮权限、接口权限、数据权限。

我们基于 rocket-table 开发时，只会涉及到按钮权限和数据权限。

### 按钮权限用法

:::demo

```html
<!-- 使用配置方式 -->
<rocket-table :json="tableJson" />
<!-- 使用插槽方式 -->
<rocket-table :json="tableJson">
  <template v-slot:action>
    <el-button type="primary" v-if="showCreate">创建用户</el-button>
  </template>
</rocket-table>
<script>
  export default {
    data() {
      return {
        // 此处大家根据接口返回的按钮权限来赋值即可。推荐使用指令的方式来修改按钮权限
        showCreate: true,
        tableJson: {
          title: '用户列表',
          // 通过permission来控制显示和隐藏,permission默认不传为true
          actionList: [{ text: '创建用户', permission: true }],
          columns: [
            {
              prop: 'uid',
              label: '用户ID',
            },
          ],
          data: [], // 表格渲染数据
          pagination: { page: 1 },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      getTableList(page = 1) {
        this.showCreate = true;
      },
    },
  };
</script>
```

:::

### 操作栏按钮权限用法[数据权限]

:::demo 根据状态来判断是否显示

```html
<rocket-table :json="tableJson" />
<script>
  export default {
    data() {
      return {
        tableJson: {
          title: '用户列表',
          // 通过permission来控制显示和隐藏
          actionList: [{ text: '创建用户' }],
          columns: [
            {
              prop: 'uid',
              label: '用户ID',
            },
            {
              prop: '',
              label: '操作',
              type: 'action',
              list: [
                {
                  text: '编辑',
                  // 当uid=1的时候，显示
                  permission: {
                    prop: 'uid',
                    show: {
                      1: true,
                    },
                  },
                },
                {
                  text: '删除',
                  // 当uid=2的时候，显示
                  permission: {
                    prop: 'uid',
                    show: {
                      2: true,
                    },
                  },
                },
              ],
            },
          ],
          data: [{ uid: 1 }, { uid: 2 }], // 表格渲染数据
          pagination: { page: 1 },
        },
      };
    },
    mounted() {
      this.getTableList();
    },
    methods: {
      getTableList(page = 1) {},
    },
  };
</script>
```

:::

> permission 用来控制操作按钮或者列表中的按钮的显示和隐藏，也可以直接使用函数来处理更加方便。

## RocketTable - json 参数

| 参数       | 说明                          | 类型          | 可选值       | 默认值 |
| :--------- | :---------------------------- | :------------ | :----------- | :----: |
| loading    | 表格请求过程显示 loading 效果 | Boolean       | `true/false` |   无   |
| columns    | 表格表头对象,需要添加 sync    | Array(Object) | 参考下文     |   无   |
| data       | 表格数据渲染对象              | Array(Object) | 参考下文     |   无   |
| pagination | 表格分页对象,需要添加 sync    | Object        | pagination   |   无   |
| pager      | 显示分页控件                  | Boolean       | `true/false` |  true  |
| toolbar    | 显示工具条                    | Boolean       | `true/false` |  true  |
| spanMethod | 数据跨行处理                  | fn()          | 参考 Element |   无   |

## RocketTable - json - columns 对象

| 参数                | 说明                           | 类型             | 可选值                |   默认值   |
| :------------------ | :----------------------------- | :--------------- | :-------------------- | :--------: |
| prop                | 列属性                         | String           | 无                    |     无     |
| label               | 列头                           | String           | 无                    |     无     |
| width               | 设置列宽度                     | Number           | 无                    |     无     |
| type                | 列特殊类型显示                 | String           | 参考 column-type      |     无     |
| list                | 显示操作列表                   | Array            | 参考 column-list      |     无     |
| sortable            | 是否排序                       | Boolean          | `true/false/custom`   |     无     |
| sortOrders          | 设置排序方式                   | Array            | 参考 Element          |     无     |
| span                | 多级表头                       | Array            | 参考示例              |     无     |
| empty               | 当返回空的时候，设置默认显示值 | String           | `--`                  |     无     |
| tips                | 表头增加提示语                 | String           | `--`                  |     无     |
| formatter           | 数据格式化，同官方             | String           | `--`                  |     无     |
| filter              | 过滤器，用来处理日期和金额     | String           | 'money/date/datetime' |     无     |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip | Boolean          | true                  | flase/true |
| permissions         | 控制按钮是否显示               | Boolean/Function | true                  | flase/true |

> showOverflowTooltip 官方默认为关闭，为了表格体验，统一开启，也可以手动关闭

> type=action 时，只有设置了 width 才会关闭 tool-tip，否则也会开启。

> permissions 对于有 RBAC 权限设置的系统，非常管用，配置如果觉得麻烦，可以使用函数定义，更加简单。

## pagination

> 默认只需要设置 total 即可，如果产品有要求，可手动调整
> 表格中分页控件以及工具条刷新按钮等点击，会触发 pagination 对象同步修改，所以参数需要加.sync

| 参数     | 说明     | 类型   | 可选值   | 默认值 |
| :------- | :------- | :----- | :------- | :----: |
| pageNum  | 当前页码 | Number | 无       |   1    |
| pageSize | 每页条数 | Number | 可不填   |   20   |
| total    | 总条数   | Number | 动态赋值 |   无   |

## column - type

> 主要用于对列数据进行处理，比如：点击、图片、链接、操作按钮等

| 参数      | 说明                                    | 类型   | 可选值         | 默认值 |
| :-------- | :-------------------------------------- | :----- | :------------- | :----: |
| index     | 列索引                                  | String | 无             |   无   |
| click     | type 为 click 时，该列可点击            | String | 无             |   无   |
| image     | type 为 image 时，会自动渲染成图片      | String | 无             |   无   |
| link      | type 为 link 时，循环渲染成多个可点击列 | String | `{prop,limit}` |   无   |
| url       | type 为 url 时，直接生成 a 标签         | String | 无             |   无   |
| badge     | 列是否显示标记(参考 Badge 组件)         | String | `{id,state}`   |   无   |
| action    | 标记为操作按钮                          | String | 无             |   无   |
| selection | 表格增加批量勾选                        | String | 无             |   无   |
| slot      | 插槽                                    | String | 无             |   无   |
| html      | 支持 html 赋值                          | String | 无             |   无   |

> 当 type='slot'时，需要指定 slotName，这样才能在 base-table 中嵌套组件，可参考上面的自定义列

## column - list[type=action]

> 主要用于操作按钮列（新增、编辑、删除）

| 参数       | 说明         | 类型                    | 可选值                                                                | 默认值 |
| :--------- | :----------- | :---------------------- | :-------------------------------------------------------------------- | :----: |
| text       | 按钮文本     | String                  | 无                                                                    |   无   |
| permission | 是否可见     | Boolean/Function/Object | `true、false、{prop:'status',show:{1:true}}、function(){return true}` |   无   |
| prop       | 按钮映射字段 | `Object/String`         | 参考上文 Demo                                                         |   无   |
| val        | 根据值去映射 | Object                  | 参考上文 Demo                                                         |   无   |

## 事件

| 参数              | 说明          | 类型                     | 可选值           | 默认值 |
| :---------------- | :------------ | :----------------------- | :--------------- | :----: |
| @handleChange     | 页码/条数变动 | fn(page)                 | 跟列表方法一致   |   无   |
| @handleAction     | 操作按钮点击  | fn({index,row,text})     | 参考上文使用方法 |   无   |
| @handleCellClick  | 单元格点击    | fn({row,prop,link})      | 参考上文使用方法 |   无   |
| @sort-change      | 本地排序事件  | fn({column,prop,order }) | 参考上文使用方法 |   无   |
| @selection-change | 多选框        | fn([row])                | 参考 ElmentUI    |   无   |

> 目前只有@handleChange、@handleAction、@handleCellClick 为新增自定义事件，其它为原生事件
