<template>
<!-- 普通文本框 -->
<el-input
  :type="item.type==='input'?'text':item.type"
  :value="value"
  @input="handleInput($event)"
  :style="{ width: item.width }"
  :placeholder="item.placeholder"
  :maxlength="item.maxlength"
  :disabled="item.disabled"
  :readonly="item.readonly"
  :show-word-limit="item.showWordLimit"
  :rows="item.rows"
  :clearable="true"
  :prefix-icon="item.prefixIcon"
  :suffix-icon="item.sufixIcon"
  :class="{'disable-arrow':item.arrow===false}"
>
  <!-- 支持前缀select -->
  <template slot="prepend" v-if="item.prependConfig">
    <slot name="select"></slot>
  </template>
  <!-- 支持文本框添加文本前缀，比如：https -->
  <template slot="prepend" v-else-if="item.prepend">{{item.prepend}}</template>
  <!-- 支持文本框后添加文本后缀，比如：邮箱.com -->
  <template slot="append" v-if="item.append">{{item.append}}</template>
</el-input>
</template>
<script>
export default {
  name: 'OInput',
  props: ['item', 'value'],
  methods: {
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
    updatePrependValue (val) {
      this.$emit('update:prependValue', val)
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
