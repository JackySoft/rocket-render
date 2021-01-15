<template>
  <el-form-item
    :label="item.type === 'checkbox' ? '' : item.label"
    :key="item.model || index"
    :prop="item.model || ''"
  >
    <!-- 普通文本框 -->
    <OInput
      v-if="item.type === 'input'"
      v-model="value[item.model]"
      :item="item"
    />
    <!-- 普通下拉框 -->
    <OSelect
      v-if="item.type === 'select'"
      v-model="value[item.model]"
      :item="item"
    />
    <!-- 日期范围选择 -->
    <ODatePicker
      v-if="['date', 'daterange', 'datetime', 'datetimerange'].includes(item.type)"
      v-model="value[item.model]"
      :item="item"
    />
    <!-- 增加一个时段选择 -->
    <template v-if="item.type === 'time-select'">
      <OTimeSelect
        v-model="value[item.items[0].model]"
        :item="{...item.items[0],width:'48%',placeholder:'起始'}"
        @change="handleTimeSelect(item.items[1].model)"
        style="margin-right:4%"
      />
      <OTimeSelect
        v-model="value[item.items[1].model]"
        :item="{...item.items[1],width:'48%',placeholder:'结束',pickerOptions:{...(item.items[1].pickerOptions),minTime: value[item.items[0].model]}}"
      />
    </template>
    <!-- 多选框 -->
    <OCheckBox
      v-if="item.type === 'checkbox'"
      v-model="value[item.model]"
      :item="item"
    />
    <!-- 下拉级联 -->
    <OCasCader
      v-if="item.type === 'cascader'"
      v-model="value[item.model]"
      :item="item"
    />
    <!-- 开关 -->
    <OSwitch
      v-if="item.type === 'switch'"
      v-model="value[item.model]"
      :item="item"
    />
  </el-form-item>
</template>
<script>
// 根据屏幕宽度，显示对应表单个数
import { OInput, OSelect, ODatePicker, OTimeSelect, OCheckBox, OCasCader, OSwitch } from './../components'
export default {
  name: 'QueryForm',
  props: {
    inline: Boolean, // 暂时没有用，后期可能会扩展
    type: String, // 当设置为dialog时，说明QueryForm在dialog中使用，需要修改样式
    form: Array, // 表单JSON对象
    model: Object// 默认v-model参数
  },
  components: { OInput, OSelect, ODatePicker, OTimeSelect, OCheckBox, OCasCader, OSwitch },
  data () {
    return {
      value: { ...this.model }, // 初始化表单值
    }
  },
  methods: {
    handleTimeSelect (model) {
      this.value[model] = null
    },
    // 重置
    handleReset () {
      this.$refs.searchForm.resetFields()
      // 时段/级联组件-重置功能需要单独做
    },
    // 点击查询，重置页码
    handleQuery () {
      this.$emit('update:model', { ...this.value })
      this.$emit('handleQuery', 1)
    },
  }
}
</script>
<style lang="scss">
// 默认为白色背景，当在弹框中时为灰色背景
.query-form {
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 20px 20px 0;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  &.dialog {
    background-color: #f7f8fa;
    border: none;
  }
  .hidden {
    display: none;
  }
  .el-row--flex {
    flex-wrap: wrap;
    .el-form-item {
      display: flex;
      .el-form-item__content {
        flex: 1;
        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
}
// 弹框中表格样式控制
.el-dialog__wrapper,
.el-drawer__wrapper {
  .query-form {
    background-color: #f7f8fa;
    border: none;
  }
}
</style>
