<template>
  <wrapper>
    <!-- 表单查询区 -->
    <search-form
      :json="form"
      :model.sync="queryForm"
      @handleQuery="getTableList"
      @handleReset="getTableList"
    />
    <div class="table-box">
      <!-- 列表区域 -->
      <rocket-table
        :json.sync="tableJson"
        @handleOperate="handleOperate"
        @handleChange="getTableList"
        @handleAction="handleAction"
      />
    </div>
  </wrapper>
</template>

<script>
export default {
  name: 'query',
  data() {
    return {
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
      },
      form: [
        {
          type: 'text',
          model: 'user_name',
          label: '用户',
          arrow: false,
          placeholder: '请输入用户名称',
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
          width: '200px',
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
        },
        {
          type: 'date',
          model: 'register_date1',
          label: '注册日期1',
          shortcuts: true,
          width: '150px',
        },
        {
          type: 'date',
          model: 'register_date2',
          label: '注册日期2',
          shortcuts: true,
          width: '150px',
        },
        {
          type: 'date',
          model: 'register_date2',
          label: '注册日期3',
          shortcuts: true,
          width: '150px',
        },
      ],
      tableJson: {
        title: 'JSON配置表格',
        actionList: [
          {
            type: 'primary',
            text: '新增',
            permission: true,
          },
          {
            type: 'danger',
            text: '删除',
            permission: () => {
              return true;
            },
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
              // 如果row中的status=1，则显示禁用，2显示启用
              {
                prop: 'status',
                val: {
                  2: '启用',
                  1: {
                    text: '禁用',
                    color: 'danger',
                  },
                },
                // 控制按钮是否显示
                permission: true,
              },
              {
                text: '编辑',
                // 支持函数判断
                permission: () => {
                  return true;
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
        ...this.tableJson.pagination, // 默认分页数据
      };
      this.$api.getBasicList(data).then((res) => {
        this.tableJson.data = res.list;
        this.tableJson.pagination.total = res.total;
      });
    },
    // 表格上操作按钮
    handleOperate({ text, index }) {
      /**
       * 支持两种方式：
       * 1. 根据索引判断点击的是哪个按钮。
       * 2. 根据文本判断点击的是哪个按钮。
       */
      if (index === 0) {
        this.$message.success('你点击新增操作按钮');
      }
      if (text === '删除') {
        this.$message.success('你点击了删除操作按钮');
      }
    },
    // 表格中，列的操作按钮：index为点击的按钮索引，row为当前行的数据
    handleAction({ index, text, row }) {
      // 方式一：根据文本判断
      this.$message.success(`你点击了表格中${text}按钮`);
      /*
      // 方式二：根据索引判断，有个弊端，万一列表的按钮顺序发生变化，索引可能会错乱。
      if (index === 0) {
        this.$message.success(`你点击了表格中${text}按钮`);
      } else if (index === 1) {
        this.$message.success('你选择了第二个按钮');
      } else {
        this.$message.success('你选择了第三个按钮');
      }
      */
      console.log(row);
    },
  },
};
</script>
