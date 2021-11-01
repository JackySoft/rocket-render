<template>
  <div v-if="showItem && !item.hidden" class="pro-menu">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || !onlyOneChild.children.length ||onlyOneChild.noShowingChildren)">
      <AppLink v-if='onlyOneChild' :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.icon|| item.icon || ''" :title="onlyOneChild.name || item.name || ''"/>
        </el-menu-item>
      </AppLink>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.name" :icon="item.icon || ''" :title="item.name || ''"/>
      </template>
      <template v-for="child in item.children">
        <sidebar-item
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="child.path"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showItem: true, // 控制路由的展示，用于解决路由重新赋值后的无限循环报错问题
      onlyOneChild: this.item
    }
  },
  watch: {
    // 控制路由的展示，用于解决路由重新赋值后的无限循环报错问题
    item () {
      this.showItem = false
      this.$nextTick(() => {
        this.showItem = true
      })
    }
  },
  methods: {
    hasOneShowingChild (childrenParam = [], parent) {
      const children = childrenParam || []
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
