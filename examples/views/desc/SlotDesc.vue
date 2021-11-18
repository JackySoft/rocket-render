<template>
  <wrapper>
    <div class="slot-desc">
      <rocket-desc :json="json1" :values="values1">
        <template slot="title">
          <el-button type="primary" size="small"
            >用户信息 - 自定义标题</el-button
          >
        </template>
      </rocket-desc>
      <rocket-desc :json="json2" :values="values1" class="mt20">
        <template slot="title">
          <el-button type="primary" size="small"
            >用户信息 - 自定义标题</el-button
          >
        </template>
        <template slot="extra">
          <el-button type="primary" size="small">右上角自定义</el-button>
        </template>
      </rocket-desc>
      <rocket-desc :json="json3" :values="values3" class="mt20">
        <template slot="userName">
          <i class="el-icon-user"></i>
          {{ values1.userName }}
        </template>
        <template slot="userSex">
          <el-tag>{{ values1.userSex }}</el-tag>
        </template>
      </rocket-desc>
      <el-tabs v-model="activeType" class="mt20">
        <el-tab-pane label="注册信息" name="1">
          <rocket-desc :json="json4" :values="values4" />
        </el-tab-pane>
        <el-tab-pane label="认证信息" name="2">
          <rocket-desc :json="json4" :values="values4" />
        </el-tab-pane>
        <el-tab-pane label="补充信息" name="3">
          <rocket-desc :json="json4" :values="values4" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </wrapper>
</template>

<script>
export default {
  name: 'SlotDesc',
  props: ['id'],
  data() {
    return {
      activeType: '1',
      json1: {
        title: '标题自定义',
        type: 'slot',
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
        title: '标题和右上角都自定义',
        border: true,
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
        title: '内容自定义',
        border: true,
        list: [
          {
            label: '用户名称',
            prop: 'userName',
            type: 'slot',
            slotLabelName: 'userName',
          },
          {
            label: '用户性别',
            prop: 'userSex',
            type: 'slot',
            slotValueName: 'userSex',
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
        border: true,
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
};
</script>
<style lang="scss">
.slot-desc {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
