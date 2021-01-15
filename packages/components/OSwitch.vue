<template>
<!-- 开关组件 -->
<el-switch
  :value="value"
  @input="handleInput($event)"
  :active-value="item.activeValue"
  :inactive-value="item.inactiveValue"
  :disabled="item.disabled"
></el-switch>
</template>
<script>
export default {
  name: 'OSwitch',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
