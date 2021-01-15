<template>
<!-- 穿梭框 -->
<el-transfer
  :value="value"
  @input="handleInput($event)"
  :filterable="item.filterable"
  :filter-method="item.filterMethod"
  :filter-placeholder="item.placeholder"
  :data="item.data"
  :titles="item.titles || []"
  :button-texts="item.buttonTexts || []"
  :left-default-checked="item.leftDefaultChecked"
  :right-default-checked="item.rightDefaultChecked"
/>
</template>
<script>
export default {
  name: 'OTransfer',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
