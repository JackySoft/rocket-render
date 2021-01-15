<template>
<!-- 时间段组件 -->
<el-time-select
  :value="value"
  @input="handleInput($event)"
  :placeholder="item.placeholder || '起始'"
  :picker-options="item.pickerOptions"
  :popper-append-to-body="false"
  @change="handleTimeSelect($event)"
  :style="{ width: item.width || '100%'}"
>
</el-time-select>
</template>
<script>
export default {
  name: 'OTimeSelect',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
    handleTimeSelect (val) {
      this.$emit('change', val)
    }
  }
}
</script>
