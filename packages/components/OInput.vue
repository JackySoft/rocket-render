<template>
<!-- 普通文本框 -->
<el-input
  :type="item.type==='input'?'text':item.type"
  :value="value"
  :style="item.style || item.width?`width:${item.width}`:''"
  :class="[item.arrow===false?'disable-arrow':'',item.class]"
  v-bind="item"
  v-on="$listeners"
>
  <template v-if="item.slot">
    <!-- 支持前缀select -->
    <!-- <template slot="prepend" v-if="item.slot.prepend && item.slot.prepend.type === 'select'">
      <OSelect
        :item="item.slot.prepend"
        :value="values[item.slot.prepend.model]"
        @input="(val)=>values[item.slot.prepend.model] = val"
      />
    </template> -->
    <!-- 支持文本框添加文本前缀，比如：https -->
    <template slot="prepend" v-if="item.slot.prepend">{{item.slot.prepend}}</template>
    <!-- 支持文本框后添加文本后缀，比如：邮箱.com -->
    <template slot="append" v-if="item.slot.append">{{item.slot.append}}</template>
  </template>
</el-input>
</template>
<script>
export default {
  name: 'OInput',
  props: ['item', 'value'],
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
