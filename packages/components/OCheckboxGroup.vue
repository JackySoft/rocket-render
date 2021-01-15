<template>
<!-- 复选框组 -->
<el-checkbox-group
  :value="value || []"
  @input="handleInput($event)"
>
  <el-checkbox
    v-for="check in item.options"
    :key="check.label"
    :label="check.value"
    >{{ check.label }}</el-checkbox
  >
</el-checkbox-group>
</template>
<script>
export default {
  name: 'OCheckboxGroup',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
