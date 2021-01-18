<template>
<!-- 下拉组件 -->
<el-select
  :value="value"
  @input="handleInput($event)"
  v-bind="item"
  :popper-append-to-body="false"
  :style="{ width: item.width || '100%' }"
>
  <el-option
    v-for="option in item.options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
    :disabled="option.disabled"
  >
  </el-option>
</el-select>
</template>
<script>
export default {
  name: 'OSelect',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
