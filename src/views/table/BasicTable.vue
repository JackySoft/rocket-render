<template>
  <wrapper>
    <search-box>
      <!-- 表单查询区 -->
      <search-form :inline="true" :json="form" :model.sync="queryForm" @handleQuery="getTableList" @handleReset="getTableList" />
    </search-box>
    <div class="table-box">
      <!-- 列表区域 -->
      <rocket-table
        :loading.sync="showLoading"
        :column.sync="mainColumn"
        :data="mainData"
        :pagination.sync="pagination"
        @handleChange="getTableList"
        @handleAction="handleAction"
        @handleCellClick="handleCellClick"
        @handleSelectionChange="handleSelectionChange"
      >
        <template v-slot:title> 基础表格 </template>
        <template v-slot:action>
          <el-button type="primary">导出数据</el-button>
        </template>
      </rocket-table>
    </div>
  </wrapper>
</template>

<script>
export default {
  name: 'query',
  data () {
    return {
      showLoading: false,
      // 保存查询条件
      queryForm: {
        user_name: 'jack',
        user_status: [1, 2],
        register_date: '2020-11-20',
        login_time: ['2020-11-01', '2020-11-20'],
        time_part_start: '03:00',
        time_part_end: '05:00',
        match: 1,
        province: ['Hubei', 'Wuhan'],
        use_status: 1
      },
      form: [
        {
          type: 'text',
          model: 'user_name',
          label: '用户',
          arrow: false,
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
          type: 'select',
          model: 'user_status',
          label: '用户状态',
          multiple: true, // 支持多选
          filterable: true, // 支持输入过滤
          options: [
            { label: '全部', value: 0 },
            { label: '已注销', value: 1 },
            { label: '老用户', value: 2 },
            { label: '新用户', value: 3 },
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
          type: 'daterange',
          model: 'login_time',
          label: '日期范围',
          width: '220px'
        },
        {
          type: 'time-select',
          label: '注册时段',
          gutter: 10,
          action: {
            type: 'reset',
            model: ['time_part_end']
          },
          items: [
            {
              model: 'time_part_start',
              pickerOptions: {
                start: '00:00',
                step: '01:00',
                end: '23:00',
              },
            },
            {
              model: 'time_part_end',
              pickerOptions: {
                start: '00:00',
                step: '01:00',
                end: '23:00',
              },
            },
          ],
        },
        {
          type: 'cascader',
          model: 'province',
          label: '省份',
          options: [
            {
              value: 'Hubei',
              label: '湖北',
              children: [
                {
                  value: 'Wuhan',
                  label: '武汉',
                }, {
                  value: 'Xiangyang',
                  label: '襄阳',
                }
              ]
            },
            {
              value: 'Beijing',
              label: '北京',
              children: [
                {
                  value: 'Haidian',
                  label: '海淀区',
                }, {
                  value: 'ChaoYang',
                  label: '朝阳',
                }
              ]
            }
          ]
        },
        {
          type: 'checkbox',
          model: 'match',
          label: '是否匹配',
          trueLabel: 1,
          falseLabel: 0,
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
          type: 'index',
          label: '序号',
        },
        {
          prop: 'uid',
          label: '用户ID',
          align: 'left'
        },
        {
          prop: 'cname',
          label: '用户名称',
          align: 'left'
        },
        {
          prop: 'user_img',
          label: '头像',
          showOverflowTooltip: false,
          type: 'image',
          image: {
            type: 'single', // single/list 支持单张图片和批量图片
            width: 60, // 设置图片宽度
            height: 40 // 设置图片高度
          }
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
          type: 'click',
          formatter (row) {
            if (row.use_status > 2) {
              return '--'
            }
            return {
              1: '在线',
              2: '离线',
            }[row.use_status]
          },
        },
        {
          prop: 'user_email',
          label: '邮箱',
        },
        {
          prop: 'user_status_name',
          label: '用户状态'
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
              type: 'primary',
              permission: true,
            },
            {
              text: '编辑',
              type: 'info',
              permission: true,
            },
            {
              text: '删除',
              color: 'danger',
              type: 'danger',
              permission: true,
            },
          ],
        }
      ],
      mainData: [],
      // 分页对象
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    // 首页列表查询,page为子组件传递的页码，默认为1
    getTableList (pageNum = 1) {
      this.showLoading = true
      this.pagination.pageNum = pageNum
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
    handleCellClick ({ row }) {
      this.$message.success('单元格点击，值为：' + row.uid)
    },
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
  },
}
</script>
