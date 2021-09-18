<template>
  <wrapper>
    <search-box>
      <!-- 表单查询区 -->
      <query-form :form="form" :model.sync="queryForm" @handleQuery="getTableList" />
    </search-box>
    <!-- 列表区域 -->
    <rocket-table
      :loading.sync="showLoading"
      :column.sync="mainColumn"
      :data="mainData"
      :pagination.sync="pagination"
      :span-method="span.callback"
      @handleChange="getTableList"
      @handleAction="handleAction"
      @handleCellClick="handleCellClick"
      @selection-change="handleSelectionChange"
      show-summary
      :summary-method="getSummaries"
    >
      <template v-slot:copy="scope">
        <el-button type="text" icon="el-icon-document-copy" @click="handleCopy(scope.row)">{{scope.row.uid}}</el-button>
      </template>
    </rocket-table>
  </wrapper>
</template>

<script>
export default {
  name: 'HighTable',
  data () {
    return {
      showLoading: false,
      // 保存查询条件
      queryForm: {
        user_name: 'jack',
        register_date: '2020-11-20',
        match: 1,
        use_status: 1
      },
      form: [
        {
          type: 'text',
          model: 'user_name',
          label: '用户',
          placeholder: '请输入用户名称'
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
          type: 'date',
          model: 'register_date',
          label: '注册日期',
          shortcuts: true,
          width: '150px'
        },
        {
          type: 'switch',
          model: 'isCheck',
          label: '是否校验',
        },
      ],
      mainColumn: [
        {
          prop: 'selection',
          type: 'selection',
          label: '选框',
        },
        {
          prop: 'index',
          type: 'slot',
          label: '自定义列',
          sortable: true,
          slotName: 'copy'
        },
        {
          prop: 'uid',
          label: '用户ID',
          align: 'center',
          type: 'click',
          sortable: true,
          tips: '测试一下'
        },
        {
          prop: 'user-info',
          label: '用户信息',
          align: 'center',
          span: [
            {
              prop: 'cname',
              label: '用户名称',
              align: 'left'
            },
            {
              prop: 'user_img_list',
              label: '头像',
              showOverflowTooltip: false,
              type: 'image',
              image: {
                type: 'list', // single/list 支持单张图片和批量图片
                width: 60, // 设置图片宽度
                height: 40 // 设置图片高度
              }
            },
          ]
        },
        {
          prop: 'site_url',
          label: '网址',
          type: 'url',
          showOverflowTooltip: false,
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
          prop: 'user_link',
          label: '产品列表',
          width: 150,
          type: 'link', // 需要渲染成多个可点击按钮
          showOverflowTooltip: false,
          empty: '00',
          link: {
            prop: 'name', // 渲染的字段
            limit: 3// 默认渲染个数，支持展开和关闭
          }
        },
        {
          prop: 'user_status_name',
          label: '用户状态'
        },
        {
          prop: 'intrest_name',
          label: '兴趣',
        },
        {
          prop: 'register_date',
          label: '注册时间',
        }
      ],
      mainData: [],
      // 分页对象
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      span: {
        callback ({ row, column, rowIndex, columnIndex }) {
          if (columnIndex < 3) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1,
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
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
      this.showLoading = true
      this.pagination.page = page
      const data = {
        ...this.queryForm, // 查询表单数据
        ...this.pagination, // 默认分页数据
      }
      this.$api.getBasicList(data).then((res) => {
        this.mainData = res.list
        this.showLoading = false
        this.pagination.total = res.total
      })
    },
    // 列汇总
    getSummaries (param) {
      const sums = ['', '总价', '20', 'Jack', '头像', 'ali.com', '在线', '集碎片', '老用户', '游戏', '2020-12-23']
      return sums
    },
    // 单元格-列点击
    handleCellClick ({ row }) {
      this.$message.success('单元格点击，值为：' + row.uid)
    },
    // 复选点击
    handleSelectionChange (rows) {
      this.$message.success('勾选项id为' + rows.map(item => item.id))
    },
    // action为点击的按钮索引，row为当前行的数据
    handleAction ({ index, row }) {
      if (index === 0) {
        this.$message.success('你选择了第一个按钮')
      } else if (index === 1) {
        this.$message.success('你选择了第二个按钮')
      } else {
        this.$message.success('你选择了第三个按钮')
      }
      console.log(row)
    },
    // 导出
    handleExport () {
      const url = '/basic/export'
      // 获取当前查询表单参数
      const query = this.query
      this.$utils.handleExport(url, query)
    },
    // 增加复制功能
    handleCopy (row) {
      const input = document.createElement('input')
      input.style = 'position:absolute;left:0;bottom:0;opacity:0;'
      document.body.append(input)
      input.value = row.uid// 修改文本框的内容
      input.select() // 选中文本
      document.execCommand('copy') // 执行浏览器复制命令
      this.$message.success('复制成功')
      setTimeout(() => {
        document.body.removeChild(input)
      }, 50)
    }
  },
}
</script>
