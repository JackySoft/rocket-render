<template>
  <div class="rocket-table" :class="{'auto':isFullScreen}" id="rocketBaseTable">
    <div class="action-header" v-if="$slots.title ||  $slots.action || toolbar">
      <!-- 表格上方标题 -->
      <div class="title">
        <div class="action" v-if="$slots.title">
          <slot name="title"></slot>
        </div>
         <div class="action" v-else-if="$slots.action">
          <slot name="action"></slot>
        </div>
      </div>
      <div class="action-wrap">
        <!-- 表格上方操作按钮 -->
        <div class="action" v-if="$slots.title && $slots.action">
          <slot name="action"></slot>
        </div>
        <!-- 工具条 -->
        <tool-bar
          v-if="toolbar"
          :column="$attrs.column"
          :toolbar="$attrs.toolbar"
          :id="$attrs.id"
          @handleReload="handleReload"
          @handleDensity="handleDensity"
          @handleColumn="handleColumn"
          @handleFullScreen="isFullScreen=$event"
        />
      </div>
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
            :key="`col-index-${i}`"
            type="selection"
            v-bind="item"
            align="center"
            :width="50">
          </el-table-column>
          <!-- 保留slot功能 -->
          <el-table-column
            v-else-if="item.type === 'slot'"
            :key="`col-${item.prop}`"
            v-bind="item"
            type=""
            :align="item.align || 'center'"
            :show-overflow-tooltip="item.showOverflowTooltip === undefined?true:item.showOverflowTooltip">
            <template slot="header" v-if="item.tips">
              <el-tooltip :content="item.tips" placement="top">
                <span>{{item.label}}<i class="el-icon-info" style="margin-left:3px;"></i></span>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <slot :name="item.slotName" v-bind:row="{ $index: scope.$index, ...scope.row }"></slot>
            </template>
          </el-table-column>
          <!-- 多级表头 -->
          <template v-else-if="item.span">
            <el-table-column
              :key="`col-${item.label}`"
              v-bind="item"
              type=""
              :align="item.align || 'center'"
            >
              <template v-for="(sub) in item.span">
                <Column :item="sub" :key="`span-${sub.prop}`" v-on="$listeners"/>
              </template>
            </el-table-column>
          </template>
          <!-- 非跨行表头 -->
          <Column v-else :item="item" :key="`col-${item.prop}`" v-on="$listeners"/>
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
        :page-size="pagination.pageSize || 20"
        :current-page="pagination.pageNum || 1"
        :total="+pagination.total || 0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import Column from './Column'
export default {
  name: 'RocketTable',
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
          pageNum: 1, // 当前页码
          pageSize: 20, // 每页条数
          total: 0, // 总条数
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
      this.pageSize = val
      // 同步分页数据给父组件
      this.$emit('update:pagination', {
        pageSize: val,
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
        pageSize: this.pageSize || this.pagination.pageSize,
        page: val,
        total_count: this.pagination.total_count,
      })
      this.$emit('handleChange', val)
    },
  },
}
</script>

<style lang="scss" scoped>
.rocket-table {
  border-radius: 2px;
  background: #ffffff;
  padding-bottom: 20px;
  .action-header {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    .action-wrap {
      display: flex;
      align-items: center;
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
    .el-tooltip{
      width:auto!important;
    }
  }
}
.el-tooltip__popper{
  max-width:50%;
}
</style>
