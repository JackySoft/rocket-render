<template>
  <!-- 工具条 -->
  <div class="tool-bar">
    <el-button-group>
      <!-- 刷新 -->
      <el-button @click="handleReload">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <img
            src="http://octopus-fe.2345cdn.net/common/icon-refresh.png"
            alt=""
          />
        </el-tooltip>
      </el-button>

      <!-- 表格密度 ，加padding:0 是为了让里面的按钮填满 -->
      <el-button style="padding: 0">
        <el-tooltip class="item" effect="dark" content="密度" placement="top">
          <el-dropdown trigger="click" @command="handleDensity">
            <el-button style="border: none">
              <img
                src="http://octopus-fe.2345cdn.net/common/icon-density.png"
                alt=""
              />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="medium">大号</el-dropdown-item>
              <el-dropdown-item command="small">默认</el-dropdown-item>
              <el-dropdown-item command="mini">紧凑</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </el-button>

      <!-- 列设置 -->
      <el-button style="padding: 0">
        <el-tooltip class="item" effect="dark" content="列设置" placement="top">
          <el-dropdown trigger="click">
            <el-button style="border: none">
              <img
                src="http://octopus-fe.2345cdn.net/common/icon-system.png"
                alt=""
              />
            </el-button>
            <el-dropdown-menu slot="dropdown" style="max-height:50%;overflow:auto;">
              <el-tree
                style="padding-right: 20px"
                @check="handleColumn"
                :data="treeColumns"
                show-checkbox
                node-key="id"
                :default-checked-keys="treeKeys"
              >
              </el-tree>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </el-button>

      <!-- 全屏 -->
      <el-button @click="handleFullScreen">
        <el-tooltip class="item" effect="dark" content="全屏" placement="top">
          <span>
            <img
              :src="
                isFullScreen
                  ? 'http://octopus-fe.2345cdn.net/common/icon-notfullscreen.png'
                  : 'http://octopus-fe.2345cdn.net/common/icon-fullscreen.png'
              "
              alt=""
            />
          </span>
        </el-tooltip>
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    column: {
      type: Array,
      default () {
        return []
      },
    },
    toolbar: {
      type: Boolean,
      default () {
        return true
      },
    },
    id: {
      type: String,
      default () {
        return 'ocBaseTable'
      },
    }
  },
  data () {
    return {
      treeColumns: [], // 当前表格对应的列头
      treeKeys: [], // 选中的列
      isFullScreen: false, // 是否全屏
      checkedColumns: [], // 选中的列
    }
  },
  mounted () {
    this.$nextTick(() => {
      const list = []
      const keys = []
      this.column.map((item) => {
        list.push({
          id: item.prop,
          ...item,
        })
        keys.push(item.prop)
      })
      this.treeColumns = list
      this.treeKeys = keys
    })
  },
  methods: {
    // 表格数据刷新
    handleReload () {
      this.$emit('handleReload', {})
    },
    // 表格密度调整
    handleDensity (val) {
      this.$emit('handleDensity', val)
    },
    // 表格数据过滤
    handleColumn (curNode, { checkedNodes }) {
      const list = checkedNodes.slice()
      this.$emit('handleColumn', list)
    },
    // 内容区全屏
    handleFullScreen () {
      if (!this.isFullScreen) {
        const el = document.getElementById(this.id)
        this.isFullScreen = true
        const fn =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullscreen
        if (fn) fn.call(el)
      } else {
        this.isFullScreen = false
        const el = document
        const fn =
          el.exitFullscreen ||
          el.webkitCancelFullScreen ||
          el.mozCancelFullScreen ||
          el.msExitFullscreen
        if (fn) fn.call(el)
      }
      this.$emit('handleFullScreen', this.isFullScreen)
    },
  },
}
</script>

<style lang="scss" scoped>
.tool-bar {
  margin: 16px 20px;
  img {
    cursor: pointer;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
}
</style>
