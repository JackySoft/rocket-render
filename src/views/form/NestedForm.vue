<template>
  <wrapper>
    <!-- 表单查询区 -->
    <!-- <query-form
      :inline="false"
      :form="form"
      :model.sync="queryParams"
      @handleQuery="getTableList"
    /> -->

    <!-- 列表区域 -->
    <!-- <base-table
      :loading="showLoading"
      :column.sync="mainColumn"
      :data="mainData"
      :pagination.sync="pagination"
      @handleChange="getTableList"
    >
      <template v-slot:action>
        <el-button type="primary" @click="showModal1 = true"
          >动态创建三</el-button
        >
      </template>
    </base-table> -->

    <!-- 页内弹框 -->
    <el-dialog
      title="嵌套表单"
      :visible.sync="showModal1"
      width="70%"
      @close="handleClose('dialogForm3')"
    >
      <rocket-form
        ref="dialogForm"
        :config="rocketConfig"
        v-model="userInfo"
      ></rocket-form>
    </el-dialog>
  </wrapper>
</template>

<script>
import config from './nested'
export default {
  name: 'dialog-nested',
  data () {
    return {
      showLoading: false,
      // 保存查询条件
      queryParams: {
        time_part_start: '',
        time_part_end: '',
      },
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
          type: 'time-select',
          label: '注册时段',
          gutter: 10,
          items: [
            {
              model: 'time_part_start',
              placeholder: '起始',
              pickerOptions: {
                start: '00:00',
                step: '01:00',
                end: '23:00',
              },
            },
            {
              model: 'time_part_end',
              placeholder: '结束',
              pickerOptions: {
                start: '00:00',
                step: '01:00',
                end: '23:00',
              },
            },
          ],
        },
        {
          type: 'text',
          label: '用户名称',
          placeholder: '请输入用户名称',
          model: 'cname',
        },
        {
          type: 'checkbox',
          model: 'isChecked',
          label: '是否选择',
        },
      ],
      mainColumn: [
        {
          prop: 'uid',
          label: '用户ID',
          fixed: 'left'
        },
        {
          prop: 'cname',
          label: '用户名称',
        },
        {
          prop: 'user_img',
          label: '头像',
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
          label: '用户状态',
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
      mainData: [],
      // 分页对象
      pagination: {
        total_count: 0,
      },
      showModal1: true,
      rocketConfig: config,
      userInfo: {
        a1: '10001',
        a2: '10002',
        a3: 1
      },
      formData: {
        chance: {
        },
        time: {},
        list: [{ num1: 0, num2: 0 }]
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
        this.showLoading = false
        this.mainData = res.list
        this.pagination.total_count = res.total_count
      })
    },
    handleClose (form) {
      // 表单重置
      this.$refs[form].handleReset()
    },
    getSelectList (val, values, model) {
      this.$request.get('/select/list').then((res) => {
        this.dialogConfig2.formList[2].items[1].options = res
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.form_tip {
    font-size: 12px;
    color: #999999;
    height: 25px;
    line-height: 25px;
    &.ml20{
      margin-left: 20px;
    }
  }
</style>
