# RocketTable组件使用

基础表格组件，基于JSON动态生成固定的基础表格，支持原生大部分的属性和事件，目前只有个别事件是自定义。

## 支持功能

1. 基础表格
2. 表格分页（可控制隐藏，默认显示）
3. 工具条（刷新、表格密度、列设置、全屏）
4. 单列可点击、多列可点击
5. 多个链接(link)渲染、图片渲染、url渲染、badge状态渲染
6. 特殊数据格式化(formatter)
7. 操作区域权限控制（创建、编辑、删除）
8. 表格列排序、表头跨列、数据跨行
9. 通过v-bind="$attrs"和v-on="$listners"保留大部分原生属性和事件
10. 支持表格索引列、支持表格多选功能
11. 支持表格自定义列

## 基本用法

:::demo

```html
<search-form  :json="form" :model.sync="queryForm" @handleQuery="getTableList" />
<rocket-table
    :column.sync="columns"
    :data="list"
    :pagination.sync="pagination"
    @handleChange="getTableList"
    @handleAction="handleAction"
    @handleCellClick="handleCellClick"
    @selection-change="handleSelectionChange"
>
</rocket-table>
<script>
export default {
    data () {
        return {
            // 保存查询条件
            queryForm: {},
            form: [
                {
                    type: 'text',
                    model: 'user_name',
                    label: '用户',
                    placeholder: '请输入用户名称',
                }
            ],
            columns: [
                {
                    prop: 'selection',
                    type: 'selection',
                    label: '选框',
                },
                {
                    prop: 'uid',
                    label: '用户ID',
                    align: 'left',
                    type: 'click'
                },
                {
                    prop: 'user_img',
                    label: '头像',
                    type: 'image',
                    image: {
                        type: 'single'
                    }
                },
                {
                    prop: 'use_status',
                    label: '当前状态',
                    formatter (row) {
                        return {
                        1: '在线',
                        2: '离线',
                        }[row.use_status]
                    },
                },
                {
                    prop: 'user_status_name',
                    label: '用户状态',
                    type:'badge',
                    badge:{
                        id: "user_status",//渲染的字段
                        state: {
                            1: "warning",//设置颜色
                            2: "primary",
                            3: "danger",
                            4: "info"
                        },
                    }
                },
                {
                    prop: 'register_date',
                    label: '注册时间',
                }
            ],
            list: [],
            // 分页对象
            pagination: {
                pageNum: 1,
                pageSize: 20,
                total: 0,
            }
        }
    },
    mounted () {
        this.getTableList()
    },
    methods: {
        // 首页列表查询,page为子组件传递的页码，默认为1
        getTableList (pageNum = 1) {
            this.pagination.pageNum = pageNum
            const data = {
                ...this.queryForm, // 查询表单数据
                ...this.pagination, // 默认分页数据
            }
            this.$request.get('/basic/list',data).then((res) => {
                this.list = res.list.slice(0,5)
                this.pagination.total = res.total
            })
        },
        // 操作项点击，根据按钮索引开发不同业务逻辑
        handleAction({ index, row, type }){
            if(index === 0){
                // 点击了第一个操作按钮
            }else if(index === 1){
                // 点击了第二个操作按钮
            }
            // 也可根据type进行列判断，代替索引
            if(type === 'user_state'){
                // 点击了用户状态按钮
            }
        },
        /**
         * 列点击
         * 1. 只有其中一列可点击,通常只用row就够了，不需要根据prop做判断
         * 2. 有多列可点击，根据prop判断是哪一列被触发了
         * 3. 某一列有多个点击按钮，点击按钮的时候，会把对应的值回传回来(link)
        */
        handleCellClick({ row, prop, link }){
            // 如果是多个列都绑定了click事件，可根据prop来区分是哪一列
            if(prop === 'uid'){
                this.$message.success('点击了用户ID')
            }
        },
        handleSelectionChange (rows) {
            this.$message.success('勾选项id为' + rows.map(item => item.id))
        }
    },
}
</script>
```

:::

## 添加标题和操作按钮
> 当标题和操作按钮同时存在时，分别左右排列，当只有操作按钮时，居左排列。

:::demo

```html
<rocket-table
    :column.sync="columns"
    :data="list"
    :pagination.sync="pagination"
    @handleChange="getTableList"
>
    <template v-slot:title>用户列表</template>
    <template v-slot:action>
    <el-button type="primary" @click="showModal1 = true"
        >操作按钮</el-button
    >
    </template>
</rocket-table>
<script>
export default {
    data () {
        return {
            columns: [
                {
                    prop: 'selection',
                    type: 'selection',
                    label: '选框',
                },
                {
                    prop: 'uid',
                    label: '用户ID',
                    align: 'left',
                    type: 'click'
                },
                {
                    prop: 'user_img',
                    label: '头像',
                    type: 'image',
                    image: {
                        type: 'single'
                    }
                }
            ],
            list: [],
            // 分页对象
            pagination: {
                pageNum: 1,
                pageSize: 20,
                total: 0,
            }
        }
    },
    mounted () {
        this.getTableList()
    },
    methods: {
        // 首页列表查询,page为子组件传递的页码，默认为1
        getTableList (pageNum = 1) {
            this.pagination.pageNum = pageNum
            const data = {
                ...this.queryForm, // 查询表单数据
                ...this.pagination, // 默认分页数据
            }
            this.$request.get('/basic/list',data).then((res) => {
                this.list = res.list.slice(0,5)
                this.pagination.total = res.total
            })
        }
    },
}
</script>
```

:::

## 多级表头

:::demo 通过span控制数据跨行

```html
<rocket-table
    :column.sync="columns"
    :data="list"
>
</rocket-table>
<script>
export default {
    data(){
        return {
            columns:[
                {
                    prop: 'user_info',
                    label: '用户信息',
                    align: 'center',
                    span: [ // 多级表头
                        {
                            prop: "cname",
                            label: "用户名称",// 普通列渲染
                            showOverflowTooltip:true // true/false/不填，默认为true
                        },
                        {
                            prop: "intrest_name",
                            label: "兴趣",
                            width: 70,// 可调整列宽度
                        },
                    ]
                },
                {
                    prop: "uid",
                    label: "用户ID",
                    type: 'click', //此列可点击
                }
            ],
            list:[],// 表格渲染数据
            pagination:{ page:1 }
        }
    },
     mounted () {
        this.getTableList()
    },
    methods: {
        // 首页列表查询,page为子组件传递的页码，默认为1
        getTableList (page = 1) {
            this.pagination.page = page
            const data = {
                ...this.queryForm, // 查询表单数据
                ...this.pagination, // 默认分页数据
            }
            this.$request.get('/basic/list',data).then((res) => {
                this.list = res.list.slice(0,5)
            })
        }
    }
}
</script>
```

:::


## 数据跨行
:::demo 动态绑定span-method可实现数据跨行
```html
<rocket-table
    :column.sync="columns"
    :data="list"
    :span-method="span.callback"
>
</rocket-table>
<script>
export default {
    data(){
        return {
            columns:[
                {
                    prop: "uid",
                    label: "用户ID",
                    type: 'click', //此列可点击
                },
                {
                    prop: "cname",
                    label: "用户名称",// 普通列渲染
                    showOverflowTooltip:true // true/false/不填，默认为true
                },
                {
                    prop: "intrest_name",
                    label: "兴趣",
                },
            ],
            list:[],// 表格渲染数据
            pagination:{ page:1 },
            span: {
                callback ({ row, column, rowIndex, columnIndex }) {
                    if (columnIndex < 1) {
                        if (rowIndex % 2 === 0) {
                            return {
                                rowspan: 2,
                                colspan: 1,
                            }
                        }
                    }
                }
            }
        }
    },
     mounted () {
        this.getTableList()
    },
    methods: {
        // 首页列表查询,page为子组件传递的页码，默认为1
        getTableList (page = 1) {
            this.pagination.page = page
            const data = {
                ...this.queryForm, // 查询表单数据
                ...this.pagination, // 默认分页数据
            }
            this.$request.get('/basic/list',data).then((res) => {
                this.list = res.list.slice(0,5)
            })
        }
    }
}
</script>
```

:::

## 图片、网址、link渲染
:::demo 通过type可设置渲染类型
```html
<rocket-table
    :column.sync="columns"
    :data="list"
>
</rocket-table>
<script>
export default {
    data(){
        return {
            columns:[
                {
                    prop: 'user_img_list',//如果接口返回单张，需要设置type='single'
                    label: '头像',
                    showOverflowTooltip: false,
                    type: 'image',
                    image: {
                        type: 'list', // single/list 支持单张图片和批量图片
                        width: 60, // 设置图片宽度
                        height: 40 // 设置图片高度
                    }
                },
                {
                    prop: 'site_url', // 网址渲染，默认新开窗口
                    label: '网址',
                    type: 'url',//支持打开url地址
                    showOverflowTooltip: false,
                },
                {
                    prop: "user_link",
                    label: "产品列表",
                    type: "link", //需要渲染成多个可点击按钮
                    link: {
                        prop: 'name',//渲染的字段
                        limit: 3//默认渲染个数，支持展开和关闭
                    }
                }
            ],
            list:[],// 表格渲染数据
            pagination:{ page:1 }
        }
    },
     mounted () {
        this.getTableList()
    },
    methods: {
        // 首页列表查询,page为子组件传递的页码，默认为1
        getTableList (page = 1) {
            this.pagination.page = page
            const data = {
                ...this.queryForm, // 查询表单数据
                ...this.pagination, // 默认分页数据
            }
            this.$request.get('/basic/list',data).then((res) => {
                this.list = res.list.slice(0,5)
            })
        }
    }
}
</script>
```

:::


## 排序、多列点击、操作按钮
:::demo 通过type可设置渲染类型
```html
<rocket-table
    :column.sync="columns"
    :data="list"
    @handleCellClick="handleCellClick"
>
</rocket-table>
<script>
export default {
    data(){
        return {
            columns:[
                {
                    prop: "uid",
                    label: "用户ID",
                    type: 'click', //此列可点击
                    sortable:true
                },
                {
                    prop: "cname",
                    label: "用户名称",// 普通列渲染
                    type: 'click', //此列可点击
                    showOverflowTooltip:true // true/false/不填，默认为true
                },
                {
                    prop: "",// 操作项prop不用填
                    label: "操作",
                    width: "200px",
                    type: "action",// 标记此列为操作按钮
                    list: [
                        {
                            prop: "status",//显示的按钮需要根据此状态动态控制
                            val: {
                                2: "启用",  // status为2，显示启用
                                1: {       // status为1，显示禁用，同时设置按钮颜色
                                    text: "禁用",
                                    color: "danger",// 支持success/warning/danger/info
                                    disabled: true //按钮禁用
                                },
                            },
                            permission: true,//权限控制，根据后台返回动态设置
                            // 根据返回数据动态控制
                            permission: {
                                prop: 'status',
                                show: {
                                    1: true,
                                    2: false,
                                },
                            },
                        },
                        {
                            text: "编辑",
                            permission: true,
                        },
                        {
                            text: "删除",
                            permission: true,
                            type: "danger", // 支持按钮类型设置
                        },
                    ],
                }
            ],
            list:[],// 表格渲染数据
            pagination:{ page:1 }
        }
    },
     mounted () {
        this.getTableList()
    },
    methods: {
        // 首页列表查询,page为子组件传递的页码，默认为1
        getTableList (page = 1) {
            this.pagination.page = page
            const data = {
                ...this.queryForm, // 查询表单数据
                ...this.pagination, // 默认分页数据
            }
            this.$request.get('/basic/list',data).then((res) => {
                this.list = res.list.slice(0,5)
            })
        },
        handleCellClick({ row, prop, link }){
            if(prop === 'uid'){
                this.$message.success("点击了用户ID")
            }else if(prop === 'cname'){
                this.$message.success("点击了用户名称")
            }
        },
    }
}
</script>
```

:::

## 自定义列
:::demo 通过type可设置当前列为自定义列
```html
<rocket-table
    :column.sync="columns"
    :data="list"
>
<template v-slot:copy="scope">
    <el-button type="text" icon="el-icon-document-copy" @click="handleCopy(scope.row)">
        {{scope.row.uid}}
    </el-button>
</template>
</rocket-table>
<script>
export default {
    data(){
        return {
            columns:[
                {
                    prop: "uid",
                    label: "用户ID",
                    type: 'slot', //此列作为自定义列
                    slotName:'copy'//slot的插槽名称
                },
                {
                    prop: "cname",
                    label: "用户名称",// 普通列渲染
                    showOverflowTooltip:true // true/false/不填，默认为true
                },
                {
                    prop: "",// 操作项prop不用填
                    label: "操作",
                    width: "200px",
                    type: "action",// 标记此列为操作按钮
                    list: [
                        {
                            prop: "status",//显示的按钮需要根据此状态动态控制
                            val: {
                                2: "启用",  // status为2，显示启用
                                1: {       // status为1，显示禁用，同时设置按钮颜色
                                    text: "禁用",
                                    color: "danger",// 支持success/warning/danger/info
                                    disabled: true //按钮禁用
                                },
                            },
                            permission: true,//权限控制，根据后台返回动态设置
                        },
                        {
                            text: "编辑",
                            permission: true,
                        },
                        {
                            text: "删除",
                            permission: true,
                            color: "danger", // 控制按钮颜色
                        },
                    ],
                }
            ],
            list:[],// 表格渲染数据
            pagination:{ page:1 }
        }
    },
     mounted () {
        this.getTableList()
    },
    methods: {
        // 首页列表查询,page为子组件传递的页码，默认为1
        getTableList (page = 1) {
            this.pagination.page = page
            const data = {
                ...this.queryForm, // 查询表单数据
                ...this.pagination, // 默认分页数据
            }
            this.$request.get('/basic/list',data).then((res) => {
                this.list = res.list.slice(0,5)
            })
        },
        // 模拟复制功能
        handleCopy(row){
            var input = document.createElement('input')
            input.style = 'position:absolute;left:0;bottom:0;opacity:0;'
            document.body.append(input)
            input.value = row.uid// 修改文本框的内容
            input.select() // 选中文本
            document.execCommand('copy') // 执行浏览器复制命令
            this.$message.success('复制成功')
            setTimeout(() => {
                document.body.removeChild(input)
            }, 50)
        },
    }
}
</script>
```

:::

## RocketTable参数

| 参数        | 说明                        | 类型          | 可选值       | 默认值 |
| :---------- | :-------------------------- | :------------ | :----------- | :----: |
| loading     | 表格请求过程显示loading效果 | Boolean       | `true|false` |   无   |
| column      | 表格表头对象,需要添加sync   | Array(Object) | 参考下文     |   无   |
| data        | 表格数据渲染对象            | Array(Object) | 参考下文     |   无   |
| pagination  | 表格分页对象,需要添加sync   | Object        | pagination   |   无   |
| pager       | 显示分页控件                | Boolean       | `true|false` |  true  |
| toolbar     | 显示工具条                  | Boolean       | `true|false` |  true  |
| span-method | 数据跨行处理                | fn()          | 参考Element  |   无   |

## RocketTable - column对象
| 参数       | 说明                           | 类型    | 可选值              | 默认值 |
| :--------- | :----------------------------- | :------ | :------------------ | :----: |
| prop       | 列属性                         | String  | 无                  |   无   |
| label      | 列头                           | String  | 无                  |   无   |
| width      | 设置列宽度                     | Number  | 无                  |   无   |
| type       | 列特殊类型显示                 | String  | 参考column-type     |   无   |
| list       | 显示操作列表                   | Array   | 参考column-list     |   无   |
| sortable   | 是否排序                       | Boolean | `true|false|custom` |   无   |
| sortOrders | 设置排序方式                   | Array   | 参考Element         |   无   |
| span       | 多级表头                       | Array   | 参考示例            |   无   |
| empty      | 当返回空的时候，设置默认显示值 | String  | `--`                |   无   |
| tips       | 表头增加提示语                 | String  | `--`                |   无   |

## pagination
> 默认只需要设置total即可，如果产品有要求，可手动调整
> 表格中分页控件以及工具条刷新按钮等点击，会触发pagination对象同步修改，所以参数需要加.sync

| 参数     | 说明     | 类型   | 可选值   | 默认值 |
| :------- | :------- | :----- | :------- | :----: |
| pageNum  | 当前页码 | Number | 无       |   1    |
| pageSize | 每页条数 | Number | 可不填   |   20   |
| total    | 总条数   | Number | 动态赋值 |   无   |

## column - type
> 主要用于对列数据进行处理，比如：点击、图片、链接、操作按钮等

| 参数      | 说明                                 | 类型   | 可选值         | 默认值 |
| :-------- | :----------------------------------- | :----- | :------------- | :----: |
| index     | 列索引                               | String | 无             |   无   |
| click     | type为click时，该列可点击            | String | 无             |   无   |
| image     | type为image时，会自动渲染成图片      | String | 无             |   无   |
| link      | type为link时，循环渲染成多个可点击列 | String | `{prop,limit}` |   无   |
| url       | type为url时，直接生成a标签           | String | 无             |   无   |
| badge     | 列是否显示标记(参考Badge组件)        | String | `{id,state}`   |   无   |
| action    | 标记为操作按钮                       | String | 无             |   无   |
| selection | 表格增加批量勾选                     | String | 无             |   无   |
| slot      | 插槽                                 | String | 无             |   无   |
| html      | 支持html赋值                         | String | 无             |   无   |

> 当type='slot'时，需要指定slotName，这样才能在base-table中嵌套组件，可参考上面的自定义列

## column - list
> 主要用于操作按钮列（新增、编辑、删除）

| 参数       | 说明         | 类型            | 可选值                        | 默认值 |
| :--------- | :----------- | :-------------- | :---------------------------- | :----: |
| text       | 按钮文本     | String          | 无                            |   无   |
| permission | 是否可见     | Object          | `true|false|object({prop:'sex',show:{1:true,2:false}})`                  |   无   |
| color      | 按钮颜色     | Object          | `success|danger|warning|info` |   无   |
| prop       | 按钮映射字段 | `Object/String` | 参考上文Demo                  |   无   |
| val        | 根据值去映射 | Object          | 参考上文Demo                  |   无   |

## 事件
| 参数              | 说明          | 类型                     | 可选值           | 默认值 |
| :---------------- | :------------ | :----------------------- | :--------------- | :----: |
| @handleChange     | 页码/条数变动 | fn(page)                 | 跟列表方法一致   |   无   |
| @handleAction     | 操作按钮点击  | fn({index,row,type})     | 参考上文使用方法 |   无   |
| @handleCellClick  | 单元格点击    | fn({row,prop,link})      | 参考上文使用方法 |   无   |
| @sort-change      | 本地排序事件  | fn({column,prop,order }) | 参考上文使用方法 |   无   |
| @selection-change | 多选框        | fn({ val })              | 参考ElmentUI     |   无   |

> 目前只有@handleChange、@handleAction、@handleCellClick为新增自定义事件，其它为原生事件