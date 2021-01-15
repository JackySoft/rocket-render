<template>
<!-- 级联控件 -->
<el-cascader
    clearable
    :value="value"
    @input="handleInput($event)"
    :options="item.options"
    :disabled="item.disabled"
    :filterable="item.filterable"
    :props="item.props"
    :placeholder="item.placeholder"
    :style="{ width: item.width || '100%' }"
/>
</template>
<script>
export default {
  name: 'OCascader',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
