# 低代码平台方案

## 目录说明
1. packages为核心组件源码
2. src为Demo源码

## 项目运行
1. 安装依赖
```
yarn install
```
2. 运行
```
yarn serve
```

## rocket-render使用文档

体验DEMO：https://jackysoft.github.io/rocket-render/#/

开发文档：https://jackysoft.github.io/rocket-render-doc/

1. 安装插件
```
yarn add rocket-render -S
```

2. main.js中插件加载
```
import Vue from 'vue'
import RocketRender from 'rocket-render'

Vue.use(RocketRender)
```

3. 页面使用组件
```
<template>
    <div class="search-box">
        <!-- 表单查询区 -->
        <query-form :inline="true" :form="form" :model.sync="queryForm" @handleQuery="getTableList" />
    </search-box>

    <!-- 列表区域 -->
    <rocket-table
        border
        :loading.sync="showLoading"
        :column.sync="mainColumn"
        :data="mainData"
        :pagination.sync="pagination"
        @handleChange="getTableList"
    >
    </rocket-table>
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
          type: 'radio',
          label: '使用状态',
          placeholder: '请选择使用状态',
          model: 'use_status',
          options: [
            { label: '在线', value: 1 },
            { label: '离线', value: 2 },
          ]
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
          type: 'select',
          model: 'user_list',
          label: '用户列表',
          options: []
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
        },
        {
          type: 'daterange',
          model: 'login_time',
          label: '日期范围',
          width: '220px',
          shortcuts: true,
        },
        {
          type: 'time-select',
          label: '注册时段',
          model: 'time_part_start',
          action: {
            type: 'reset',
            model: ['time_part_end']
          },
          change: this.handleTime,
          pickerOptions: {
            start: '00:00',
            step: '01:00',
            end: '23:00',
          },
        },
        {
          type: 'time-select',
          label: '-',
          model: 'time_part_end',
          pickerOptions: {
            start: '00:00',
            step: '01:00',
            end: '23:00',
          },
        },
        {
          type: 'cascader',
          model: 'province',
          label: '省份',
          props: {
            multiple: true, // 支持多选
          },
          options: [
            {
              value: 'Hubei',
              label: '湖北',
              children: [
                {
                  value: 'Wuhan',
                  label: '武汉',
                  disabled: true// 支持单项禁用
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
        page: 1,
        page_size: 20,
        total_count: 0,
      },
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
        this.pagination.total_count = res.total_count
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
<style lang="scss">
    .search-box{
        background-color: #ffffff;
        margin-bottom: 20px;
        padding: 20px 20px 0;
        border-radius: 4px;
        border: 1px solid #ebeef5;
    }
</style>
```