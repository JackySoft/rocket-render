<template>
  <wrapper>
    <!-- 表单查询区 -->
    <query-form
      :inline="false"
      :form="form"
      :model.sync="queryParams"
      @handleQuery="getTableList"
    />

    <!-- 列表区域 -->
    <base-table
      :loading="showLoading"
      :column.sync="mainColumn"
      :data="mainData"
      :pagination.sync="pagination"
      @handleChange="getTableList"
      @handleAction="handleAction"
    >
      <template v-slot:action>
        <el-button type="primary" @click="showModal1 = true"
          >动态创建一</el-button
        >
        <el-button type="primary" @click="showModal2 = true"
          >动态创建二</el-button
        >
      </template>
    </base-table>

    <!-- 页内弹框 -->
    <el-dialog
      title="用户信息"
      :visible.sync="showModal1"
      width="70%"
      @close="handleClose('dialogForm1')"
    >
      <power-form
        ref="dialogForm1"
        :config="dialogConfig1"
        v-model="userInfo1"
        @handleClose="handleClose('dialogForm1')"
        @handleSubmit="handleSubmit"
      ></power-form>
    </el-dialog>
    <!-- 页内弹框 -->
    <el-dialog
      title="用户信息"
      :visible.sync="showModal2"
      width="68%"
      @close="handleClose('dialogForm2')"
    >
      <power-form
        ref="dialogForm2"
        :config="dialogConfig2"
        v-model="userInfo2"
      ></power-form>
      <span slot="footer">
        <el-button @click="handleClose('dialogForm2')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit2">确 定</el-button>
      </span>
    </el-dialog>
  </wrapper>
</template>

<script>
import OSS from 'ali-oss'
export default {
  name: 'dialog-power',
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
          width: 80,
          fixed: 'left'
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
          width: 80,
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
          width: 70,
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
          width: 70,
        },
        {
          prop: 'register_date',
          label: '注册时间',
        },
        {
          prop: '',
          label: '操作',
          type: 'action',
          minWidth: '200px',
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
      showModal1: false,
      showModal2: false,
      dialogConfig1: {
        showFooter: true,
        formList: [
          {
            type: 'text',
            label: '用户名称',
            placeholder: '请输入用户名称',
            model: 'cname',
            maxlength: '10',
            showWordLimit: true,
            required: true,
            width: '80%',
            tips: {
              align: 'right',
              text: '长度最大6位',
            },
            disabled: false,
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
            tips: '至少选择一项',
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
            prepend: 'https://',
            append: '.com',
            prefixIcon: 'el-icon-search',
            show: {
              model: 'user_status',
              val: [1, 2],
            },
          },
          {
            type: 'inline',
            label: '城市',
            list: [
              {
                type: 'select',
                span: 11,
                model: 'province',
                options: [
                  {
                    label: '湖北省',
                    value: 10001
                  },
                  {
                    label: '上海市',
                    value: 20001
                  },
                  {
                    label: '北京市',
                    value: 30001,
                  },
                ],
              },
              {
                type: 'label',
                span: 2
              },
              {
                type: 'select',
                model: 'city',
                span: 11,
                options: [
                  {
                    label: '襄阳',
                    value: 10001
                  },
                  {
                    label: '武汉',
                    value: 20001
                  }
                ],
              }
            ]
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
            type: 'radiogroup',
            label: '类型',
            model: 'user_type',
            action: {
              type: 'reset',
              model: ['status', 'register_date', 'register_date_range']
            },
            options: [
              {
                value: 1,
                label: '少年',
              },
              {
                value: 2,
                label: '青年',
              },
              {
                value: 3,
                label: '中年',
              },
              {
                value: 4,
                label: '老年',
              },
            ],
          },
          {
            type: 'switch',
            label: '启用状态',
            model: 'status',
            value: 1,
            show: {
              model: 'user_type',
              val: [1, 3, 4],
            },
          },
          {
            type: 'date',
            label: '注册日期',
            model: 'register_date',
            shortcuts: true,
            show: {
              model: 'user_type',
              val: [1, 3, 4],
            },
          },
          {
            type: 'daterange',
            label: '日期范围',
            model: 'register_date_range',
            shortcuts: true,
            show: {
              model: 'user_type',
              val: [2],
            },
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
        btnGroup: {
          confirm: {
            text: '确定1',
            loading: true,
          },
          cancel1: {
            text: '取消1',
          }
        }
      },
      userInfo1: {
        uid: 10001,
        intrest: [1, 2],
        query_field: 1,
      },
      dialogConfig2: {
        formList: [
          {
            type: 'detail',
            label: '用户ID',
            model: 'uid',
          },
          {
            type: 'time-select',
            label: '注册时段',
            items: [
              {
                model: 'start_time',
                placeholder: '起始时段',
                pickerOptions: {
                  start: '00:00',
                  step: '01:00',
                  end: '23:00',
                },
              },
              {
                model: 'end_time',
                placeholder: '结束时段',
                pickerOptions: {
                  start: '00:00',
                  step: '01:00',
                  end: '23:00',
                },
              },
            ],
          },
          {
            type: 'upload',
            label: '上传',
            model: 'user_image',
            listType: 'picture-card', // text/picture/picture-card
            action: 'http://st1-helper.ued.2345.cn/api/v1/oss/upload?appCode=luban&stage=testing',
            token: '',
            fileType: ['image/jpg', 'image/jpeg', 'image/png'],
            fileSize: 10 * 1024,
            fileLimit: {
              // width: 2076,
              // height: 146,
              ratio: 1,
              tips: '文件尺寸不符合要求'
            },
            limit: 5,
            tips: '只能上传jpg/png文件，且不超过500kb',
            response: { response: '', code: 'code', data: 'data', msg: 'msg', codeVal: 200 },
            // httpRequest: this.rewriteUpload, // 自定义上传
            // autoUpload: true,
          },
          {
            type: 'transfer',
            label: '授权用户',
            model: 'checkedUser',
            filterable: true,
            placeholder: '请选择授权用户',
            titles: ['未授权用户', '已授权用户'],
            buttonTexts: ['回左边', '到右边'],
            leftDefaultChecked: ['4'],
            rightDefaultChecked: ['3'],
            data: [
              {
                key: '1',
                label: 'Jack',
                disabled: true
              },
              {
                key: '2',
                label: 'Tom',
              },
              {
                key: '3',
                label: 'Lucy',
              },
              {
                key: '4',
                label: 'Lily',
              }
            ]
          }
        ],
      },
      userInfo2: {
        uid: 10001,
        start_time: '',
        end_time: '',
        checkedUser: ['3'],
        user_image: [{ name: '8f49776a42e7766bed1ad9e87d1b7f5e.jpg', url: '//octopus-fe.2345cdn.net/fe/luban/2021/1/8f49776a42e7766bed1ad9e87d1b7f5e.jpg' }]
      },
      uploadConfig: {}
    }
  },
  mounted () {
    this.getTableList()
    this.$request.get('http://st1-helper.ued.2345.cn/api/oss/config?appCode=luban&stage=testing').then((res) => {
      this.uploadConfig = res
    }).catch((res) => {
      console.log(res)
    })
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
    async handleSubmit () {
      const data = this.userInfo1
      const res = await this.$request.get('/user/submit', data)
      if (res) {
        this.$message.success('操作成功')
        this.showModal1 = false
      }
    },
    async handleSubmit2 () {
      const data = this.userInfo2
      const res = await this.$request.get('/user/submit', data)
      if (res) {
        this.$message.success('操作成功')
        this.showModal2 = false
      }
    },
    handleAction ({ index, row }) {
      if (index === 1) {
        this.showModal1 = true
        this.userInfo1 = row
      }
    },
    handleClose (form) {
      // 表单重置
      this.$refs[form].handleReset()
      // 或者手动重置
      // this.userInfo1 = {
      //   uid: "10001",
      //   intrest: [1, 2],
      // };
      this.userInfo2 = {}
      this.showModal1 = false
      this.showModal2 = false
    },
    getSelectList (val, values, model) {
      this.$request.get('/select/list').then((res) => {
        this.dialogConfig2.formList[2].items[1].options = res
      })
    },
    // 自定义上传，不建议使用，可通过部门定义的公共上传服务
    async rewriteUpload (info, fileList) {
      const { appCode, cdnDomain } = this.uploadConfig
      // 设置上传配置
      const client = new OSS(this.uploadConfig)
      try {
        // 自定义上传，通过阿里云OSS-SDK统一上传
        const r1 = await client.put(`/fe/${appCode}/${info.file.name}`, info.file)
        // 拼接CDN地址
        this.userInfo2.user_image.push({
          url: `//${cdnDomain}/${r1.name}`
        })
      } catch (e) {
        console.error('upload fail:', e)
      }
    }
  },
}
</script>
