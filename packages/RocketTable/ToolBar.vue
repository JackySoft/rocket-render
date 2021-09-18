<template>
  <!-- 工具条 -->
  <div class="tool-bar">
    <el-button-group>
      <!-- 刷新 -->
      <el-button @click="handleReload">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="reload"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"
            ></path>
          </svg>
        </el-tooltip>
      </el-button>

      <!-- 表格密度 ，加padding:0 是为了让里面的按钮填满 -->
      <el-button style="padding: 0">
        <el-tooltip class="item" effect="dark" content="密度" placement="top">
          <el-dropdown trigger="click" @command="handleDensity">
            <el-button style="border: none">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="column-height"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 00-11.3 0L403.6 366.3a7.23 7.23 0 005.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z"
                ></path>
              </svg>
            </el-button>
            <el-dropdown-menu slot="dropdown" :appendToBody="false" >
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
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="setting"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"
                ></path>
              </svg>
            </el-button>
            <el-dropdown-menu slot="dropdown" :appendToBody="false"  style="max-height:300px;overflow:auto;">
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
            <svg
              v-if="isFullScreen"
              t="1631932739322"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3481"
              width="1em"
              height="1em"
            >
              <path
                d="M391.04 240.896a8 8 0 0 0-13.632-4.672l-43.712 43.648-133.696-133.568a8 8 0 0 0-11.328 0l-42.368 42.24a8 8 0 0 0 0 11.328l133.696 133.76-43.904 43.84c-4.672 4.736-1.92 12.8 4.736 13.632l160.192 18.88c5.12 0.64 9.472-3.712 8.896-8.896l-18.944-160.192z m10.048 373.184l-160.32 18.944a8 8 0 0 0-4.672 13.568l43.904 43.904-133.76 133.504a8 8 0 0 0 0 11.328l42.432 42.24a8 8 0 0 0 11.328 0l133.76-133.568 43.648 43.712c4.672 4.672 12.8 1.92 13.568-4.736l18.944-160.064a7.936 7.936 0 0 0-8.832-8.832z m221.824-204.16l160.32-18.944a8 8 0 0 0 4.672-13.568l-43.904-43.776 133.76-133.632a8 8 0 0 0 0-11.328l-42.432-42.24a8 8 0 0 0-11.328 0l-133.76 133.44-43.648-43.648a8 8 0 0 0-13.568 4.672l-18.944 160.128a7.936 7.936 0 0 0 8.832 8.896z m121.088 280.448l43.904-43.84a8 8 0 0 0-4.672-13.632l-160.256-18.88a8 8 0 0 0-8.896 8.896l18.944 160.192c0.768 6.592 8.896 9.408 13.568 4.672l43.712-43.648 133.696 133.568a8 8 0 0 0 11.328 0l42.368-42.24a8 8 0 0 0 0-11.328l-133.696-133.76z"
                p-id="3482"
              ></path>
            </svg>
            <svg
              v-if="!isFullScreen"
              viewBox="0 0 1024 1024"
              focusable="false"
              data-icon="setting"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M290 236.4l43.9-43.9c4.7-4.7 1.9-12.8-4.7-13.6L169 160c-5.1-0.6-9.5 3.7-8.9 8.9L179 329.1c0.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zM642.7 423.7c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7c4.7 4.7 12.8 1.9 13.6-4.7L863.9 169c0.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6 0.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370c-3.1 3.1-3.1 8.2 0 11.3l42.4 42.4zM845 694.9c-0.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3c-3.1-3.1-8.2-3.1-11.3 0l-42.4 42.3c-3.1 3.1-3.1 8.2 0 11.3L734 787.6l-43.9 43.9c-4.7 4.7-1.9 12.8 4.7 13.6L855 864c5.1 0.6 9.5-3.7 8.9-8.9L845 694.9zM381.3 600.3c-3.1-3.1-8.2-3.1-11.3 0L236.3 733.9l-43.7-43.7c-4.7-4.7-12.8-1.9-13.6 4.7L160.1 855c-0.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-0.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
                p-id="3616"
              ></path>
            </svg>
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
        return 'rocketBaseTable'
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
        return item
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
