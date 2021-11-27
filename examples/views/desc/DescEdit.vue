<template>
  <wrapper>
    <div class="slot-desc">
      <el-alert
        title="请点击右侧的修改按钮，进行体验"
        type="warning"
      ></el-alert>
      <rocket-desc :json="json" :values.sync="values" class="mt20">
        <template slot="extra">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit"
            v-if="type == 'detail'"
          >
            点击修改
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleSubmit"
            v-if="type == 'edit'"
          >
            返回
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleSubmit('submit')"
            v-if="type == 'edit'"
          >
            提交
          </el-button>
        </template>
      </rocket-desc>
    </div>
  </wrapper>
</template>

<script>
export default {
  name: 'SlotDesc',
  props: ['id'],
  data() {
    return {
      type: 'detail',
      json: {
        title: '用户基本信息',
        type: '',
        border: true,
        list: [
          {
            label: '用户名称',
            prop: 'userName',
            type: 'text',
            placeholder: '请输入用户名称',
          },
          {
            label: '用户性别',
            prop: 'userSex',
            type: 'radio',
            formatter({ userSex }) {
              return userSex == 1 ? '男' : '女';
            },
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ],
            placeholder: '请输入用户名称',
          },
          {
            label: '用户年龄',
            prop: 'userAge',
            type: 'number',
            placeholder: '请输入用户年龄',
          },
          {
            label: '用户职业',
            prop: 'userJob',
            formatter({ userJob }) {
              return {
                1: '游泳',
                2: '乒乓球',
                3: '篮球',
                4: '王者',
              }[userJob];
            },
            type: 'select',
            options: [
              { label: '游泳', value: 1 },
              { label: '乒乓球', value: 2 },
              { label: '篮球', value: 3 },
              { label: '王者', value: 4 },
            ],
            placeholder: '请选择职业',
          },
          {
            label: '用户年薪',
            prop: 'userSalary',
            type: 'text',
            placeholder: '请输入用户年薪',
          },
          {
            label: '出生日期',
            prop: 'createTime',
            type: 'date',
            placeholder: '请选择出生日期',
          },
          {
            label: '是否结婚',
            prop: 'isMarry',
            type: 'switch',
            placeholder: '请选择出生日期',
            formatter({ isMarry }) {
              return isMarry ? '是' : '否';
            },
          },
        ],
      },
      values: {
        userName: '杰克',
        userSex: 1,
        userAge: 30,
        userJob: 4,
        userSalary: '20万',
        createTime: '2020-01-01',
        isMarry: false,
      },
    };
  },
  methods: {
    handleEdit() {
      this.json.type = 'edit';
      this.type = 'edit';
    },
    handleSubmit(type) {
      if (type == 'submit') {
        this.$message.success('提交成功');
        this.json.type = '';
        this.type = 'detail';
      } else {
        this.json.type = '';
        this.type = 'detail';
      }
    },
  },
};
</script>
<style lang="scss">
.slot-desc {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
