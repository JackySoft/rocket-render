<template>
  <div>
    <template v-for="menu in menuList">
      <el-submenu
        v-if="menu.children && menu.children.length > 0"
        :key="menu.name"
        :index="prefix + menu.path"
      >
        <template slot="title">
          <span style="margin-left: 10px">{{ menu.name }}</span>
        </template>
        <side-menu :menuList="menu.children" :prefix="prefix + menu.path" />
      </el-submenu>
      <el-menu-item v-else :key="menu.name" :index="prefix + '/' + menu.path">
        <span style="margin-left: 10px">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SideMenu',
  props: {
    isFixed: {
      type: Boolean,
      default() {
        return false;
      },
    },
    prefix: String,
    menuList: Array,
  },
  methods: {},
};
</script>
