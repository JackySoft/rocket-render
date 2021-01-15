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
import pathToRegexp from 'path-to-regexp'

export default {
  name: 'BreadCrumb',
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route (route) {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // 仅显示有name的
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]

      if (first.path !== '/') {
        matched = [{
          path: '/',
          name: '首页'
        }].concat(matched)
      } else {
        matched[0] = {
          path: '/',
          name: '首页'
        }
      }
      this.levelList = matched.filter(item => item.path && item.name)
    },
    pathCompile (path) {
      // 支持获取路由参数/:id
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
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
