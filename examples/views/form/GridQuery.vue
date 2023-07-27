<template>
  <wrapper>
    <!-- 表单查询区 -->
    <search-form
      inline="grid"
      :json="formJson"
      :model.sync="queryForm"
      @handleQuery="getTableList"
    />
    <div class="table-box">
      <!-- 列表区域 -->
      <rocket-table
        border
        :loading.sync="showLoading"
        :column.sync="mainColumn"
        :data="mainData"
        :field="{ pageNum: 'pageNo', pageSize: 'size', total: 'totalCount' }"
        :pagination.sync="pagination"
        @handleChange="getTableList"
      >
        <template v-slot:title> 栅格表单 </template>
      </rocket-table>
    </div>
  </wrapper>
</template>

<script>
export default {
  name: 'query',
  title: '栅格表单 - 一行三列',
  data() {
    return {
      showLoading: false,
      // 保存查询条件
      queryForm: {
        user_name: 'jack',
        user_status: [1, 2],
        register_date: '2020-11-20',
        login_time: ['2020-11-01', '2020-11-20'],
        // time_part_start: '03:00',
        // time_part_end: '05:00',
        match: 1,
        province: ['Hubei', 'Wuhan'],
        use_status: 1,
        query_field: 1,
      },
      formJson: [
        {
          type: 'text',
          model: 'user_name',
          label: '用户',
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
          clearable: false,
          // 结构转换
          field: {
            label: 'name',
            value: 'id',
          },
          options: [
            { name: '全部', id: 0 },
            { name: '已注销', id: 1 },
            { name: '老用户', id: 2 },
            { name: '新用户', id: 3 },
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
          type: 'daterange',
          model: 'login_time',
          label: '日期范围',
          width: '220px',
        },
        {
          type: 'time-select',
          label: '注册时段',
          gutter: 10,
          action: {
            type: 'reset',
            model: ['time_part_end'],
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
          props: {
            multiple: true,
            checkStrictly: true,
          },
          options: [
            {
              value: 'Hubei',
              label: '湖北',
              children: [
                {
                  value: 'Wuhan',
                  label: '武汉',
                },
                {
                  value: 'Xiangyang',
                  label: '襄阳',
                },
              ],
            },
            {
              value: 'Beijing',
              label: '北京',
              children: [
                {
                  value: 'Haidian',
                  label: '海淀区',
                },
                {
                  value: 'ChaoYang',
                  label: '朝阳',
                },
              ],
            },
          ],
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
          width: 240,
          type: 'image',
          image: {
            type: 'single',
          },
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
        },
        {
          prop: 'user_status_name',
          label: '用户状态',
        },
        {
          prop: 'intrest_name',
          label: '兴趣',
          width: 70,
        },
        {
          prop: 'register_date',
          label: '注册时间',
        },
      ],
      mainData: [],
      // 测试，自定义分页字段，分页对象
      pagination: {
        pageNo: 1,
        size: 5,
        totalCount: 0,
      },
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    // 首页列表查询,page为子组件传递的页码，默认为1
    getTableList(pageNum = 1) {
      this.showLoading = true;
      // 因为查询的时候，无法在插件内部更新页码
      this.pagination.pageNo = pageNum;
      const data = {
        ...this.queryForm, // 查询表单数据
        ...this.pagination, // 默认分页数据
      };
      this.$api.getBasicList(data).then((res) => {
        this.mainData = res.list;
        this.showLoading = false;
        this.pagination.totalCount = res.total;
      });
    },
  },
};
</script>
