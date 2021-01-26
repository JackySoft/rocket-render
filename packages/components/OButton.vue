<template>
<!-- 普通文本框 -->
<el-button
  :type="item.buttonType"
  :value="value"
  @input="handleInput($event)"
  :style="{ width: item.width }"
  v-bind="item"
>
  {{item.text}}
</el-button>
</template>
<script>
export default {
  name: 'OButton',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="scss">
  .disable-arrow {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none!important;
    }
  }
</style>
