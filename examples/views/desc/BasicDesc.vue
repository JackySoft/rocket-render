<template>
  <wrapper>
    <div class="desc-wrap">
      <rocket-desc :json="json1" :values="values1" />
      <rocket-desc :json="json2" :values="values2" class="mt20" />
      <rocket-desc :json="json3" :values="values3" class="mt20" />
      <rocket-desc :json="json4" :values="values4" class="mt20" />
      <div class="mt20">
        <el-button @click="showVisible = true" type="primary"
          >弹框中显示</el-button
        >
      </div>
    </div>
    <el-dialog
      title="弹框描述"
      :visible.sync="showVisible"
      width="40%"
      :before-close="handleClose"
    >
      <rocket-desc :json="json2" :values="values2" class="mt20" />
      <rocket-desc :json="json4" :values="values4" class="mt20" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
    </el-dialog>
  </wrapper>
</template>

<script>
export default {
  name: 'BasicDesc',
  data() {
    return {
      json1: {
        title: '基础描述-1',
        list: [
          {
            label: '用户名称',
            prop: 'userName',
          },
          {
            label: '用户性别',
            prop: 'userSex',
          },
          {
            label: '用户年龄',
            prop: 'userName',
          },
          {
            label: '用户职业',
            prop: 'userJob',
          },
          {
            label: '用户年薪',
            prop: 'userSalary',
          },
        ],
      },
      values1: {
        userName: '杰克',
        userAge: 30,
        userSex: '未知',
        userJob: '前端工程师',
        userSalary: '20万',
      },
      json2: {
        title: '基础描述-2',
        border: true,
        column: 2,
        list: [
          {
            label: '用户名称',
            prop: 'userName',
          },
          {
            label: '用户性别',
            prop: 'userSex',
          },
          {
            label: '用户年龄',
            prop: 'userName',
          },
          {
            label: '用户职业',
            prop: 'userJob',
          },
          {
            label: '用户年薪',
            prop: 'userSalary',
          },
          {
            label: '用户地址',
            prop: 'address',
          },
        ],
      },
      values2: {
        userName: '杰克',
        userAge: 30,
        userSex: '未知',
        userJob: '前端工程师',
        userSalary: '20万',
        address: '上海市浦东新区东方明珠',
      },
      json3: {
        title: '基础描述-3',
        border: true,
        column: 4,
        direction: 'vertical',
        extra: '看我',
        list: [
          {
            label: '用户名称',
            prop: 'userName',
          },
          {
            label: '用户性别',
            prop: 'userSex',
          },
          {
            label: '用户年龄',
            prop: 'userName',
          },
          {
            label: '用户职业',
            prop: 'userJob',
          },
          {
            label: '用户年薪',
            prop: 'userSalary',
          },
          {
            label: '用户地址',
            prop: 'address',
          },
        ],
      },
      values3: {
        userName: '杰克',
        userAge: 30,
        userSex: '未知',
        userJob: '前端工程师',
        userSalary: '20万',
        address: '上海市浦东新区东方明珠',
      },
      json4: {
        title: '基础描述-4',
        border: true,
        column: 1,
        list: [
          {
            label: '用户名称',
            prop: 'userName',
          },
          {
            label: '用户性别',
            prop: 'userSex',
          },
          {
            label: '用户年龄',
            prop: 'userName',
          },
          {
            label: '用户职业',
            prop: 'userJob',
          },
          {
            label: '用户年薪',
            prop: 'userSalary',
          },
          {
            label: '用户地址',
            prop: 'address',
          },
        ],
      },
      values4: {
        userName: '杰克',
        userAge: 30,
        userSex: '未知',
        userJob: '前端工程师',
        userSalary: '20万',
        address: '上海市浦东新区东方明珠',
      },
      showVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.showVisible = false;
    },
  },
};
</script>
<style lang="scss">
.desc-wrap {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
