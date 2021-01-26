<template>
  <div class="pro-table" :class="{'auto':isFullScreen}" id="ocBaseTable">
    <div class="card-header">
      <!-- 表格上方操作按钮 -->
      <div class="action">
        <slot name="action"></slot>
      </div>
      <!-- 工具条 -->
      <tool-bar
        v-if="toolbar"
        v-bind="$attrs"
        @handleReload="handleReload"
        @handleDensity="handleDensity"
        @handleColumn="handleColumn"
        @handleFullScreen="isFullScreen=$event"
      />
    </div>
    <!-- 基础表格 -->
    <div class="base-table">
      <el-table
        ref="baseTable"
        v-loading="$attrs.loading"
        :size="size"
        :border="border"
        element-loading-text="加载中..."
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-for="(item,i) in $attrs.column">
          <!-- 处理多选 -->
          <el-table-column
            v-if="item.type === 'selection'"
            :key="`col-${i}`"
            type="selection"
            align="center"
            :fixed="item.fixed"
            :width="50">
          </el-table-column>
          <!-- 保留slot功能 -->
          <el-table-column
            v-else-if="item.type === 'slot'"
            :key="`col-${i}`"
            :prop="item.prop"
            :label="item.label"
            :fixed="item.fixed"
            :width="item.width"
            :sortable="item.sortable"
            :sort-orders="item.sortOrders"
            :align="item.align || 'center'"
            :class-name="item.className"
            :show-overflow-tooltip="item.showOverflowTooltip === undefined?true:item.showOverflowTooltip">
            <template slot-scope="scope">
              <slot :name="item.slotName" v-bind:row="scope.row"></slot>
            </template>
          </el-table-column>
          <!-- 多级表头 -->
          <template v-else-if="item.span">
            <el-table-column
               :key="`col-${i}`"
              :label="item.label"
              :align="item.align || 'center'"
            >
              <template v-for="(sub,j) in item.span">
                <Column :item="sub" :key="`span-${j}`" v-on="$listeners"/>
              </template>
            </el-table-column>
          </template>
          <!-- 非跨行表头 -->
          <Column v-else :item="item" :key="`col-${i}`" v-on="$listeners"/>
        </template>
      </el-table>
      <!-- 表格分页，可隐藏 -->
      <el-pagination
        v-if="pager"
        background
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50]"
        :page-size="pagination.page_size || 20"
        :current-page="pagination.page || 1"
        :total="pagination.total_count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import Column from './Column'
export default {
  name: 'BaseTable',
  inheritAttrs: false,
  props: {
    border: {
      type: Boolean,
      default () {
        return !!(false || this.$attrs['span-method'])
      },
    },
    pagination: {
      type: Object,
      default () {
        return {
          page: 1, // 当前页码
          page_size: 20, // 每页条数
          total_count: 0, // 总条数
        }
      },
    },
    pager: {
      type: Boolean,
      default () {
        return true
      },
    },
    toolbar: {
      type: Boolean,
      default () {
        return true
      },
    }
  },
  data () {
    return {
      size: 'small',
      isFullScreen: false
    }
  },
  components: { ToolBar, Column },
  methods: {
    /**
     * 表格数据刷新
     */
    handleReload () {
      const page = this.pagination.page
      // 刷新时，需要保留当前分页参数
      this.$emit('handleChange', page)
    },
    /**
     * 表格密度调整
     */
    handleDensity (val) {
      this.size = val
    },
    /**
     * 表格数据过滤
     */
    handleColumn (list) {
      this.$emit('update:column', list)
    },
    /**
     * 分页条数变化
     * @param {sizeVal} 条数
     */
    handleSizeChange (val) {
      // 缓存当前选择的每页条数，在页码切换的时候，需要保持同步
      this.page_size = val
      // 同步分页数据给父组件
      this.$emit('update:pagination', {
        page_size: val,
        page: 1,
        total_count: this.pagination.total_count,
      })
      this.$emit('handleChange', 1)
    },
    /**
     * 页码变化
     * @param {val} 页码
     */
    handleCurrentChange (val) {
      // 同步分页数据给父组件
      this.$emit('update:pagination', {
        page_size: this.page_size || this.pagination.page_size,
        page: val,
        total_count: this.pagination.total_count,
      })
      this.$emit('handleChange', val)
    },
  },
}
</script>

<style lang="scss">
// 弹框中表格样式控制
.el-dialog__wrapper,
.el-drawer__wrapper {
  .card-header .action button {
    &:first-child {
      margin-left: 0;
      margin-right: 0;
    }
  }
  .el-table {
    border: solid 1px #edf0f2;
    border-bottom: none;
  }
}
// pro-table基础样式
.pro-table {
  border-radius: 2px;
  background: #ffffff;
  padding-bottom: 20px;
  &.auto{
    overflow: auto;
  }
  .card-header {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .action {
      border-radius: 2px;
      margin: 16px 20px;
    }
  }
  // 设置表头的背景色
  .base-table {
    //设置表头颜色
    .el-table th {
      background: #f9f9f9;
    }
    // 控制表格操作按钮状态四种色值
    .el-button--text {
      &.success {
        color: #67c23a;
      }
      &.warning {
        color: #e6a23c;
      }
      &.danger {
        color: #f56c6c;
      }
      &.info {
        color: #909399;
      }
    }
    .btn-link{
      color:#409eff;
      cursor: pointer;
    }
    .el-pagination {
      text-align: right;
      padding-top: 20px;
      padding-right: 20px;
      background-color: #ffffff;
    }
    // type=link样式
    .block-control {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      cursor: pointer;
      .text {
        position: absolute;
        transform: translateX(30px);
        font-size: 12px;
        line-height: 20px;
        transition: 0.3s;
        display: inline-block;
        opacity: 0;
      }
      i {
        color: #d3dce6;
        font-size: 14px;
        line-height: 20px;
        transition: 0.3s;
      }
      &:hover {
        color: #409eff;
        i {
          color: inherit;
          transform: translateX(-30px);
        }
        .text {
          opacity: 1;
          transform: translateX(-20px);
        }
      }
    }
  }
}
.el-tooltip__popper{
  max-width:50%;
}
</style>
