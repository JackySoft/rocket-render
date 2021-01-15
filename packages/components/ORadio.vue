<template>
<!-- 单选按钮组 -->
<el-radio-group
  :value="value"
  @input="handleInput($event)"
  :disabled="item.disabled"
>
  <template v-if="item.type === 'radio'">
    <el-radio
      v-for="radio in item.options"
      :key="radio.value"
      :label="radio.value"
      >{{ radio.label }}</el-radio
    >
  </template>
  <template v-if="item.type === 'radiogroup'">
    <el-radio-button
      v-for="radio in item.options"
      :key="radio.value"
      :label="radio.value"
      >{{ radio.label }}</el-radio-button
    >
  </template>
</el-radio-group>
</template>
<script>
export default {
  name: 'ORadio',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
