<template>
  <wrapper>
    <!-- 表单查询区 -->
    <query-form
      :form="form"
      :model.sync="queryForm"
      @handleQuery="getTableList"
    />

    <!-- 列表区域 -->
    <base-table
      :showLoading="showLoading"
      :column.sync="mainColumn"
      :data="mainData"
      :pagination.sync="pagination"
      @handleChange="getTableList"
      @handleAction="handleAction"
    >
      <template v-slot:action>
        <el-button type="primary" @click="openModal">打开</el-button>
      </template>
    </base-table>

    <el-drawer
      title="我是标题"
      size="60%"
      :visible.sync="showModal"
      :with-header="false"
      @close="handleClose"
    >
      <div class="p20">
        <power-form
          ref="dialogForm"
          :config="dialogConfig"
          v-model="dialogForm"
          @handleSubmit="handleSubmit"
          @handleClose="handleClose"
        ></power-form>
      </div>
    </el-drawer>
  </wrapper>
</template>

<script>
export default {
  name: 'drawer-power',
  data () {
    return {
      queryForm: {}, // v-model值
      showLoading: false,
      form: [
        {
          type: 'select',
          model: 'order_status',
          label: '用户状态',
          options: [
            { label: '全部', value: 0 },
            { label: '已注销', value: 1 },
            { label: '老用户', value: 2 },
            { label: '新用户', value: 3 },
          ],
        },
        {
          type: 'daterange',
          model: 'register_date',
          label: '注册日期',
        },
        {
          type: 'text',
          label: '用户名称',
          placeholder: '请输入用户名称',
          model: 'cname',
        },
      ],
      mainColumn: [
        {
          prop: 'uid',
          label: '用户ID',
          width: 80,
        },
        {
          prop: 'cname',
          label: '用户名称',
          width: 70,
        },
        {
          prop: 'user_img',
          label: '头像',
          width: 240,
        },
        {
          prop: 'use_status',
          label: '当前状态',
          width: 70,
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
          width: 120,
        },
        {
          prop: 'user_status_name',
          label: '用户状态',
          width: 80,
          type: 'badge',
          badge: {
            id: 'user_status',
            state: {
              1: 'warning',
              2: 'primary',
              3: 'danger',
            },
          },
        },
        {
          prop: 'intrest_name',
          label: '兴趣',
        },
        {
          prop: 'register_date',
          label: '注册时间',
        },
        {
          prop: '',
          label: '操作',
          width: '150px',
          type: 'action',
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
      mainData: [],
      // 分页对象
      pagination: {
        total_count: 0,
      },
      showModal: false,
      dialogForm: {},
      dialogConfig: {
        title: '创建用户',
        width: '800px',
        showFooter: true,
        formList: [
          {
            type: 'query',
            label: '用户ID',
            model: 'uid',
          },
          {
            type: 'text',
            label: '用户名称',
            placeholder: '请输入用户名称',
            model: 'cname',
            maxlength: '10',
            showWordLimit: true,
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
            options: [
              { label: '已注销', value: 1 },
              { label: '老用户', value: 2 },
              { label: '新用户', value: 3 },
            ],
          },
          {
            type: 'text',
            label: '用户邮箱',
            placeholder: '请输入用户邮箱',
            model: 'user_email',
            append: '.com',
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
            type: 'daterange',
            label: '日期范围',
            model: 'register_date_range',
            shortcuts: true,
          },
          {
            type: 'datetime',
            label: '注册时间',
            model: 'register_datetime',
            shortcuts: true,
          },
          {
            type: 'datetimerange',
            label: '时间范围',
            model: 'register_datetime_range',
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
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    // 首页列表查询
    getTableList (page = 1) {
      this.showLoading = true
      this.pagination.page = page
      const data = {
        ...this.queryParams, // 查询表单数据
        ...this.pagination, // 默认分页数据
      }
      this.$api.getBasicList(data).then((res) => {
        this.mainData = res.list
        this.showLoading = false
        this.pagination.total_count = res.total_count
      })
    },
    handleAction ({ index, row }) {
      if (index === 1) {
        this.showModal = true
        this.dialogForm = row
      }
    },
    openModal () {
      this.showModal = true
    },
    async handleSubmit () {
      const res = await this.$request.get('/user/submit', this.dialogForm)
      if (res) {
        this.$message.success('操作成功')
        this.showModal = false
      }
    },
    handleClose () {
      this.showModal = false
      this.$refs.dialogForm.handleReset()
    },
  },
}
</script>
