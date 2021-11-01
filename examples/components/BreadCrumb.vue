<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <a style="cursor: pointer" v-if="index === 0" @click="handleLink(item)">{{ item.name }}</a>
        <span v-else >{{ item.name }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      levelList: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // 仅显示有name的
      const matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched.filter(item => item.path && item.name)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style scoped lang="scss">
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    background: #fff;
    border-bottom: 1px solid #eef0f3;
  }
</style>
