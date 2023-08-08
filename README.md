## rocket-render

一款基于 Vue2.6 实现的表单、表格低代码插件，支持查询表单、表单联动、表单显隐、表单异步赋值，动态表格能各项能力。组件文档可能更新不及时，大家可以查看 [Release 文档](https://jackysoft.github.io/rocket-render-doc/Release.html)。

## Document

- 体验 DEMO：https://jackysoft.github.io/rocket-render/

- 开发文档：https://jackysoft.github.io/rocket-render-doc

- Release： [Release 文档](https://jackysoft.github.io/rocket-render-doc/Release.html)。

> 2.3.0 做了重大调整，其中 Search-Form 组件增加了默认样式，可能会受影响，大家可以删除自己的样式或者从新覆盖 rocket-render 的样式。

## Features

- 基于 json 配置化开发表单、表格组件
- 基于 ElementUI 二次封装，无缝对接，属性、事件均和 ElementUI 同步
- rocket-render 更加易用、快速开发

## Install

```
yarn add rocket-render -S

# or

npm i rocket-render -S
```

## Usage

1. main.js 中全局安装插件

```js
import Vue from 'vue';
import RocketRender from 'rocket-render';
import 'rocket-render/lib/rocket-render.css';

Vue.use(RocketRender, {
  size: 'small', // form/table全局尺寸: medium / small / mini
  empty: '-', // table列中字段为空时，默认显示内容
  inline: 'flex', // 搜索表单全局配置
  toolbar: true, // 是否展示工具条
  align: center, // 表格列对齐方式
  border: true, // 表格是否显示边框
  pager: true, // 是否显示分页器
  pageSize: 20, // 全局每页条数
  emptyText: '暂无数据', // 表格无数据时展示内容
});
```

2. 页面使用组件

```html
<template>
  <div>
    <!-- rocket-form没有背景和边距，为了体验，可以给外层添加一个容器并设置背景和边距 -->
    <!-- 表单查询区 -->
    <search-form
      :json="form"
      :model.sync="queryForm"
      @handleQuery="getTableList"
    />
    <!-- 列表区域，支撑各种场景的列显示以及自定义列 -->
    <rocket-table :json="tableJson" @handleChange="getTableList" />
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        showLoading: false,
        // 表单model对象，用于初始化值和获取表单值
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
        // 动态生成查询表单
        form: [
          {
            type: 'text',
            model: 'user_name',
            label: '用户',
            placeholder: '请输入用户名称',
            // 所有组件都正常change事件
            change(val, values, model) {
              // 可获取所有值，也可直接重置修改其它字段
              values.use_status = 2;
            },
            // 用来判断当前表单是否显示
            show(values) {
              return values.use_status == 1;
            },
            prepend: 'https://',
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
            // 如果接口返回的不是label/value结构，可以使用field进行映射
            field: {
              label: 'label',
              value: 'value',
            },
          },
          {
            type: 'select',
            model: 'user_list',
            label: '用户列表',
            options: [],
            // 异步获取下拉选项值
            fetchOptions: async () => {
              return await request('/api/userList');
            },
            // 或者在mounted中，通过this.form[1].options = [{label:1,value:1}] 动态赋值
          },
          {
            type: 'date',
            model: 'register_date',
            label: '注册日期',
            shortcuts: true,
            width: '150px',
            change(val, values) {
              console.log(val, values);
              values.user_name = 'tom';
            },
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
              model: ['time_part_end'],
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
                    disabled: true, // 支持单项禁用
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
        tableJson: {
          title: '用户列表',
          actionList: [{ text: '新增' }],
          // 表格列头
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
            {
              type: 'action',
              list: [
                {
                  text: '查看',
                  // 按钮显示：支持boolean配置
                  permission: true,
                },
                {
                  text: '查看',
                  // 按钮显示：支持函数调用
                  permission: (row) => {
                    if (row.status === 1) return true;
                    return false;
                  },
                },
              ],
            },
          ],
          data: [],
          // 分页对象，此结构目前固定
          pagination: {
            pageNum: 1,
            pageSize: 20,
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
      getTableList(page = 1) {
        this.tableJson.showLoading = true;
        this.tableJson.pagination.page = page;
        const data = {
          ...this.queryForm, // 查询表单数据
          ...this.tableJson.pagination, // 默认分页数据
        };
        this.$api.getBasicList(data).then((res) => {
          this.tableJson.data = res.list;
          this.tableJson.showLoading = false;
          this.tableJson.pagination.total = res.total_count;
        });
      },
      getSelectList(val, values, model) {
        this.$request.get('/select/list').then((res) => {
          // 动态设置options数组
          this.form[3].options = res;
        });
      },
      handleTime(val) {
        this.form[7].pickerOptions.minTime = val;
        // 或者通过$获取每个表单字段进行对象赋值
        this.form.$time_part_start.pickerOptions.minTime = val;
      },
    },
  };
</script>
```
