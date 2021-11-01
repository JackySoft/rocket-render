<template>
  <!-- 常规列处理：点击/图片/操作按钮/link/url/badge -->
  <el-table-column
    v-bind="item"
    type=""
    :align="item.align || 'center'"
    :show-overflow-tooltip="item.showOverflowTooltip === undefined?true:item.showOverflowTooltip"
  >
    <template slot="header" v-if="item.tips">
      <el-tooltip :content="item.tips" placement="top">
        <span>{{item.label}}<i class="el-icon-info" style="margin-left:3px;"></i></span>
      </el-tooltip>
    </template>
    <!-- 自定义单元格 -->
    <template slot-scope="scope">
      <div v-if="item.type === 'index'">{{scope.$index+1}}</div>
      <!-- 单个cell点击,通过prop可以获取是哪列触发的点击 -->
      <template v-if="item.type === 'click'">
        <span v-if="!formatText(item,scope.row) || formatText(item,scope.row) === item.empty || formatText(item,scope.row) === '--'">{{ formatText(item,scope.row) }}</span>
        <span class="btn-link" @click="handleCellClick(scope.row,item.prop)" v-else>{{ formatText(item,scope.row) }}</span>
      </template>
      <!-- 单个cell点击,通过prop可以获取是哪列触发的点击 -->
      <template v-if="item.type === 'html'">
        <span v-html="scope.row[item.prop]"></span>
      </template>
      <!-- 图片显示，支持轮播预览，默认只显示第一张图片 -->
      <div v-else-if="item.type === 'image'">
        <el-image
          :style="{
            width: ((item.image && item.image.width) || 60) + 'px',
            height: ((item.image && item.image.height) || 40) + 'px',
          }"
          :src="item.image && item.image.type === 'list'?scope.row[item.prop][0]:scope.row[item.prop]"
          :preview-src-list="item.image && item.image.type === 'list' ?scope.row[item.prop]:[scope.row[item.prop]]"
        >
        </el-image>
      </div>
      <!-- 增加链接渲染 -->
      <a class="btn-link" :href="scope.row[item.prop]" target="_blank" v-if="item.type === 'url'">{{ String(item.formatter ? item.formatter(scope.row) : scope.row[item.prop]) || '--' }}</a>
      <!-- 单个cell包含多个链接 -->
      <div v-else-if="item.type ==='link'">
        <span
          v-for="(link, index) in linkList(scope.row)"
          :key="index"
          style="margin-right:5px;"
        >
          <el-button
            type="text"
            @click="handleCellClick(scope.row, item.prop, link)"
          >
           {{ formatLink(item,scope.row,link) }}
          </el-button>
          &nbsp;
        </span>
        <!-- 折叠按钮 -->
        <div
          class="block-control"
          v-show="scope.row[item.prop].length > item.link.limit"
          @click="toggleShowMore(scope.row)"
        >
          <i v-if="!scope.row.showMore" class="el-icon-caret-bottom"></i>
          <i v-else class="el-icon-caret-top"></i>
          <span class="text">{{ scope.row.showMore ? "收起" : "显示更多" }}</span>
        </div>
      </div>
      <!-- 操作列表（新增、编辑、删除） -->
      <div v-else-if="item.type === 'action'">
        <template v-for="(btn, key) in item.list || []">
          <!-- 需要根据返回状态动态渲染按钮 -->
          <el-button
            :type="btn.type || 'text'"
            v-if="btn.permission !==false && btn.prop"
            :class="[btn.val[scope.row[btn.prop]].color]"
            @click="handleAction(key, scope.row, btn.val[scope.row[btn.prop]].type)"
            :key="`action-${key}`"
            :disabled="btn.val[scope.row[btn.prop]].disabled"
          >
            {{
              btn.val[scope.row[btn.prop]].text ||
              btn.val[scope.row[btn.prop]]
            }}
          </el-button>
          <!-- 普通操作按钮 -->
          <el-button
            :type="btn.type || 'text'"
            v-else-if="
              btn.permission === 'undefined' ||
              btn.permission === true ||
              (btn.permission.show &&
                btn.permission.show[scope.row[btn.permission.prop]])
            "
            :class="[btn.color]"
            @click="handleAction(key, scope.row, btn.type)"
            :key="key"
            :disabled="btn.disabled"
          >
            {{ btn.text }}
          </el-button>
        </template>
      </div>
      <!-- 根据badge对象，获取徽标颜色 -->
      <div v-else-if="item.type === 'badge'">
        <el-badge
          is-dot
          class="item"
          :type="item.badge.state[scope.row[item.badge.id]]"
        ></el-badge>
        {{ formatText(item,scope.row) }}
      </div>
      <template v-else-if="!item.type">
        {{ formatText(item,scope.row) }}
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'Column',
  props: ['item'],
  computed: {
    linkList () {
      return (row) => {
        const data = row[this.item.prop]
        const limit = this.item.link.limit
        if (data && data.length > limit) {
          // 展开所有
          if (row.showMore) {
            return data
          }
          // 显示limit条数
          return data.slice(0, limit)
        }
        return data || []
      }
    }
  },
  methods: {
    /**
     * 单元格-文本点击事件
     * @param {row} 行数据
     * @param {prop} 点击列属性
     * @param {link} 遍历的当前link对象
     */
    handleCellClick (row, prop, link) {
      this.$emit('handleCellClick', { row, prop, link })
    },
    /**
     * 操作区域-多按钮点击
     * @param {action} 行为索引
     * @param {row} 行数据
     * @param {type} 增加type，用于区分按钮
     */
    handleAction (index, row, type) {
      // row解构目的是防止一些响应式数据被带过去引起一些副作用
      this.$emit('handleAction', { index, row: { ...row }, type })
    },
    /**
     * 更多折叠功能
     * @param {item} 折叠数据列表
     */
    toggleShowMore (item) {
      this.$set(item, 'showMore', !item.showMore)
    },
    /**
     * 文本内容格式化
     * @param {Object} item 当前列对象
     * @param {Object} row  当前行数据
     */
    formatText (item, row) {
      let text = ''
      if (item.formatter) return item.formatter(row)
      text = row[item.prop]
      if (text || text * 1 === 0) return text
      if (typeof item.empty !== 'undefined') return item.empty
      return '--'
    },
    /**
     * Link文本内容格式化
     * @param {item} 当前列对象
     * @param {row}  当前行数据
     */
    formatLink (item, row, link) {
      let text
      if (item.formatter) {
        text = item.formatter(row, link)
      } else {
        text = link[item.link.prop]
      }
      if (text) return text
      if (item.empty) return item.empty
      return '--'
    }
  },
}
</script>
