<template>
  <wrapper>
    <search-box>
      <!-- 表单查询区 -->
      <search-form inline="flex" :json="form" :model.sync="queryForm" @handleQuery="getTableList" />
    </search-box>

    <!-- 列表区域 -->
    <rocket-table
      class="table-box"
      border
      :loading.sync="showLoading"
      :column.sync="mainColumn"
      :data="mainData"
      :pagination.sync="pagination"
      @handleChange="getTableList"
    >
    <template v-slot:title> 行内表单 </template>
    <template v-slot:action>
      <el-button type="primary">新增数据</el-button>
      <el-button type="primary">导出数据</el-button>
    </template>
    </rocket-table>
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
        use_status: 1,
        query_field: 1,
      },
      form: [
        {
          type: 'text',
          model: 'user_name',
          label: '用户',
          placeholder: '请输入用户名称',
          change (val, values, model) {
            // 可获取所有值，也可直接重置修改其它字段
            values.use_status = 2
          },
          prependConfig: {
            type: 'select',
            model: 'query_field',
            label: '',
            width: '90px',
            options: [
              { label: '全部', value: 0 },
              { label: '已注销', value: 1 },
              { label: '老用户', value: 2 },
              { label: '新用户', value: 3 },
            ],
          },
        },
        {
          type: 'select',
          model: 'user_status',
          label: '用户状态',
          multiple: true, // 支持多选
          filterable: true, // 支持输入过滤
          change: this.getSelectList, // 自定义事件，回调接口
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
          width: '150px',
          change (val, values) {
            console.log(val, values)
            values.user_name = 'tom'
          }
        }
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
          width: 240,
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
          prop: 'user_email',
          label: '邮箱',
        },
        {
          prop: 'user_status_name',
          label: '用户状态'
        },
        {
          prop: 'intrest_name',
          label: '兴趣',
          width: 70,
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
    getSelectList (val, values, model) {
      this.$request.get('/select/list').then((res) => {
        this.form[3].options = res
      })
    },
    handleTime (val) {
      this.form[7].pickerOptions.minTime = val
    }
  },
}
</script>
