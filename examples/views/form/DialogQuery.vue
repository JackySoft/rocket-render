<template>
  <wrapper>
    <search-box>
      <!-- 表单查询区 -->
      <search-form
        :json="form"
        :model.sync="queryParams"
        @handleQuery="getTableList"
      />
    </search-box>
    <div class="table-box">
      <!-- 列表区域 -->
      <rocket-table
        border
        :loading="showLoading"
        :column.sync="mainColumn"
        :data="mainData"
        :pagination.sync="pagination"
        @handleChange="getTableList"
      >
        <template v-slot:title>用户列表</template>
        <template v-slot:action>
          <el-button type="primary" @click="openUserModal()"
            >查看用户</el-button
          >
        </template>
      </rocket-table>
    </div>
    <!-- 页内弹框:查询表单+表格 -->
    <el-dialog
      title="用户信息"
      :visible.sync="showModal"
      width="70%"
      :before-close="handleClose"
      destroy-on-close
    >
      <search-form
        :json="userForm"
        :model.sync="userParams"
        @handleQuery="getUserDataList"
      />
      <rocket-table
        :loading="showLoading1"
        :column.sync="userColumn"
        :data="userData"
        :pagination.sync="pagination1"
        :toolbar="false"
        @handleChange="getUserDataList"
        layout="total,prev, pager, next"
      >
        <template v-slot:action>
          <el-button @click="handleExport()">导出</el-button>
        </template>
      </rocket-table>
    </el-dialog>
  </wrapper>
</template>

<script>
export default {
  name: 'dialog-query',
  data() {
    return {
      showLoading: false,
      // 保存查询条件
      queryParams: {},
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
        },
        {
          prop: 'cname',
          label: '用户名称',
        },
        {
          prop: 'user_img',
          label: '头像',
          width: 240,
        },
        {
          prop: 'use_status',
          label: '当前状态',
          formatter(row) {
            return {
              1: '在线',
              2: '离线',
            }[row.use_status];
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
          type: 'action',
          width: '200px',
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
              action: '/query/state',
              permission: true,
            },
            {
              text: '编辑',
              action: '/query/edit',
              permission: true,
            },
            {
              text: '删除',
              action: '/query/del',
              color: 'danger',
              permission: true,
            },
          ],
        },
      ],
      mainData: [],
      // 分页对象
      pagination: {
        total: 0,
      },
      // 用户数据
      showLoading1: false,
      showModal: false,
      userParams: {},
      userData: [],
      pagination1: {
        total: 0,
      },
      userForm: [
        {
          type: 'input',
          label: '用户名称',
          placeholder: '请输入用户名称',
          model: 'cname',
        },
        {
          type: 'select',
          model: 'user_status',
          label: '用户状态',
          options: [
            { label: '全部', value: 0 },
            { label: '已注销', value: 1 },
            { label: '老用户', value: 2 },
            { label: '新用户', value: 3 },
          ],
        },
      ],
      userColumn: [
        {
          prop: 'uid',
          label: '用户ID',
        },
        {
          prop: 'cname',
          label: '用户名称',
        },
        {
          prop: 'user_img',
          label: '头像',
          width: 260,
        },
        {
          prop: 'use_status',
          label: '当前状态',
          formatter(row) {
            return {
              1: '在线',
              2: '离线',
            }[row.use_status];
          },
        },
        {
          prop: 'register_date',
          label: '注册时间',
        },
      ],
    };
  },
  mounted() {
    this.getTableList();
    this.getUserDataList();
  },
  methods: {
    // 首页列表查询,page为子组件传递的页码，默认为1
    getTableList(pageNum = 1) {
      this.showLoading = true;
      this.pagination.pageNum = pageNum;
      const data = {
        ...this.queryParams, // 查询表单数据
        ...this.pagination, // 默认分页数据
      };
      this.$api.getBasicList(data).then((res) => {
        this.showLoading = false;
        this.mainData = res.list;
        this.pagination.total = res.total;
      });
    },
    // 用户数据查看
    getUserDataList(pageNum = 1) {
      this.showLoading1 = true;
      this.pagination1.pageNum = pageNum;
      const data = {
        ...this.userParams, // 查询表单数据
        ...this.pagination1, // 默认分页数据
      };
      this.$api.getBasicList(data).then((res) => {
        this.showLoading1 = false;
        this.userData = res.list;
        this.pagination1.total = res.total;
      });
    },
    // 打开用户数据弹框
    openUserModal() {
      this.showModal = true;
      this.getUserDataList(1);
    },
    // 导出
    handleExport() {
      const url = '/basic/export';
      // 获取当前查询表单参数
      const query = this.userQuery;
      this.$utils.handleExport(url, query);
    },
    handleClose() {
      this.pagination1.page = 1;
      this.showModal = false;
    },
  },
};
</script>
