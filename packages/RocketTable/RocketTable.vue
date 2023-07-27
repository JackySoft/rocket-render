<template>
  <div class="rocket-table" :class="{ auto: isFullScreen }" :id="createTableId">
    <div
      class="action-header"
      v-if="
        config.title || $slots.action || config.actionList || config.toolbar
      "
    >
      <!-- 表格上方标题 -->
      <div class="title">
        <div class="action" v-if="config.title">
          <!-- 支持标题插槽 -->
          <template v-if="$slots.title">
            <slot name="title"></slot>
          </template>
          <!-- 通过配置直接传文本 -->
          <template v-else>
            {{ config.title }}
          </template>
        </div>
        <div class="action" v-else-if="$slots.action || config.actionList">
          <!-- 支持操作按钮自定义插槽 -->
          <template v-if="$slots.action">
            <slot name="action"></slot>
          </template>
          <!-- 通过配置解析按钮 -->
          <template v-else-if="config.actionList">
            <template v-for="(btn, index) in config.actionList">
              <el-button
                :key="btn.text"
                :type="btn.type || 'primary'"
                v-if="isShowAction(btn)"
                @click="() => $emit('handleOperate', { ...btn, index })"
                >{{ btn.text }}</el-button
              >
            </template>
          </template>
        </div>
      </div>
      <div class="action-wrap">
        <!-- 表格上方操作按钮，如果有标题，则按钮靠右分布，如果无标题则按钮靠左分布 -->
        <div
          class="action"
          v-if="config.title && ($slots.action || config.actionList)"
        >
          <!-- 支持操作按钮自定义插槽 -->
          <template v-if="$slots.action">
            <slot name="action"></slot>
          </template>
          <!-- 通过配置解析按钮 -->
          <template v-else-if="config.actionList">
            <template v-for="(btn, index) in config.actionList">
              <el-button
                :key="btn.text"
                :type="btn.type || 'primary'"
                v-if="isShowAction(btn)"
                @click="() => $emit('handleOperate', { ...btn, index })"
                >{{ btn.text }}</el-button
              >
            </template>
          </template>
        </div>
        <!-- 工具条 -->
        <tool-bar
          v-if="config.toolbar"
          :column="config.columns"
          :id="createTableId"
          @handleReload="handleReload"
          @handleDensity="handleDensity"
          @handleColumn="handleColumn"
          @handleFullScreen="isFullScreen = $event"
        />
      </div>
    </div>
    <!-- 基础表格 -->
    <div class="base-table">
      <el-table
        ref="baseTable"
        v-loading="config.loading"
        :size="size"
        :border="config.border"
        element-loading-text="加载中..."
        v-bind="{
          ...config,
          title: null,
          columns: null,
          pagination: null,
          pager: null,
          toolbar: null,
          actionList: null,
        }"
        v-on="$listeners"
        :cell-style="getCellStyle"
      >
        <template v-for="(item, i) in config.columns">
          <!-- 处理多选 -->
          <el-table-column
            v-if="item.type === 'selection'"
            :key="`col-index-${i}`"
            type="selection"
            v-bind="item"
            align="center"
          >
          </el-table-column>
          <!-- 保留slot功能 -->
          <el-table-column
            v-else-if="item.type === 'slot'"
            :key="`col-${item.prop}-${i}`"
            v-bind="item"
            type=""
            :align="item.align || 'center'"
            :show-overflow-tooltip="
              item.showOverflowTooltip === undefined
                ? true
                : item.showOverflowTooltip
            "
          >
            <template slot="header" v-if="item.tips">
              <el-tooltip :content="item.tips" placement="top">
                <span
                  >{{ item.label
                  }}<i class="el-icon-info" style="margin-left: 3px"></i
                ></span>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <slot :name="item.slotName" v-bind:row="formatRow(scope)"></slot>
            </template>
          </el-table-column>
          <!-- 多级表头 -->
          <template v-else-if="item.span">
            <el-table-column
              :key="`col-${item.label}-${i}`"
              v-bind="item"
              type=""
              :align="item.align || 'center'"
            >
              <template v-for="sub in item.span">
                <Column
                  :item="sub"
                  :key="`span-${sub.prop}`"
                  v-on="$listeners"
                />
              </template>
            </el-table-column>
          </template>
          <!-- 非跨行表头 -->
          <Column
            v-else
            :item="item"
            :key="`col-${item.prop}-${i}`"
            v-on="$listeners"
          />
        </template>
      </el-table>
      <!-- 表格分页，可隐藏 -->
      <el-pagination
        v-if="config.pager"
        v-bind="config.pagination"
        :layout="
          config.pagination.layout || 'total,sizes, prev, pager, next,jumper'
        "
        :background="config.pagination.background || true"
        :page-sizes="config.pagination.pageSizes || [5, 10, 20, 50]"
        :page-size="config.pagination.pageSize"
        :current-page="config.pagination.pageNum || 1"
        :total="+config.pagination.total || 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar';
import Column from './Column';
export default {
  name: 'RocketTable',
  inheritAttrs: false,
  props: {
    json: Object,
    border: {
      type: Boolean,
      default() {
        return undefined;
      },
    },
    column: Array,
    pagination: Object,
    pageSizes: Array,
    pager: {
      type: Boolean,
      default() {
        return undefined;
      },
    },
    toolbar: {
      type: Boolean,
      default() {
        return undefined;
      },
    },
  },
  data() {
    return {
      size:
        (this.json ? this.json.size : this.$attrs.size) || this.$rocket.size,
      isFullScreen: false,
      pageSize: 0, // 缓存每页条数，只有在切换每页条数时使用
    };
  },
  computed: {
    createTableId() {
      return Number(
        Math.random().toString().substr(3, 3) + Date.now(),
      ).toString(36);
    },
    config() {
      let json = {};
      // 判断是JSON方式还是传统方式
      if (this.json) {
        json = this.json;
      } else {
        json = {
          ...this.$attrs,
          border: this.border,
          pagination: this.pagination,
          pageSizes: this.pageSizes,
          pager: this.pager,
          toolbar: this.toolbar,
          columns: this.column,
        };
      }
      /**
       * 处理全局配置
       * boolean类型和非boolean类型处理有差异，因为false也是值，不能直接覆盖
       */
      let { toolbar, align, stripe, border, pager, pageSize, emptyText } =
        this.$rocket.rocketTable;
      if (typeof json.toolbar == 'undefined') json.toolbar = toolbar;
      if (!json.align) json.align = align;
      if (typeof json.stripe == 'undefined') json.stripe = stripe;
      if (typeof json.border == 'undefined') json.border = border;
      if (typeof json.pager == 'undefined') json.pager = pager;
      if (!json.pagination) json.pagination = {};
      if (!json.pagination.pageSize) json.pagination.pageSize = pageSize;
      if (!json.emptyText) json.emptyText = emptyText;
      return {
        ...json,
        // 表格上面标题
        title: json.title || this.$slots.title,
      };
    },
  },
  components: { ToolBar, Column },
  methods: {
    getCellStyle({ column }) {
      // TODO 针对 Safari表格 width 与 showOverflowTooltip 共存异常
      const tempWidth = column.realWidth || column.width;
      if (column.showOverflowTooltip) {
        return {
          minWidth: tempWidth + 'px',
          maxWidth: tempWidth + 'px',
        };
      }
      return {};
    },
    // 控制操作栏按钮是否显示
    isShowAction(btn = {}) {
      // 明确标明显示
      if (btn.permission == true) return true;
      // 默认为显示
      if (typeof btn.permission == 'undefined') return true;
      // 明确标明不显示
      if (btn.permission == false) return false;
      return false;
    },
    formatRow(scope) {
      scope.row.$index = scope.$index;
      return scope.row;
    },
    /**
     * 表格数据刷新
     */
    handleReload() {
      const pageNum = this.config.pagination.pageNum;
      // 刷新时，需要保留当前分页参数
      this.$emit('handleChange', pageNum);
    },
    /**
     * 表格密度调整
     * 此属性由于一次性使用，不需要更新父对象
     */
    handleDensity(val) {
      this.size = val;
    },
    /**
     * 表格数据过滤
     */
    handleColumn(list) {
      if (this.json) {
        this.$emit('update:json', {
          ...this.config,
          columns: list,
        });
      } else {
        this.$emit('update:column', list);
      }
    },
    /**
     * 分页条数变化
     * @param {sizeVal} 条数
     */
    handleSizeChange(val) {
      // 缓存当前选择的每页条数，在页码切换的时候，需要保持同步
      this.pageSize = val;
      // 同步分页数据给父组件
      this.$emit('update:pagination', {
        pageSize: val,
        pageNum: 1,
        total: this.config.pagination.total,
      });
      this.$emit('update:json', {
        ...this.config,
        pagination: {
          pageSize: val,
          pageNum: 1,
          total: this.config.pagination.total,
        },
      });
      this.$emit('handleChange', 1);
    },
    /**
     * 页码变化
     * @param {val} 页码
     */
    handleCurrentChange(val) {
      this.$emit('handleChange', val);
    },
  },
};
</script>

<style lang="scss">
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
    .btn-link {
      color: #409eff;
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
    .el-tooltip {
      width: auto !important;
    }
  }
}
.el-tooltip__popper {
  max-width: 50%;
}
</style>
