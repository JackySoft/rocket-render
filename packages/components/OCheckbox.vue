<template>
<!-- 单个复选框 -->
<el-checkbox
  :value="value"
  @input="handleInput($event)"
  :true-label="item.trueLabel"
  :false-label="item.falseLabel"
  >{{ item.label }}</el-checkbox
>
</template>
<script>
export default {
  name: 'OCheckbox',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
