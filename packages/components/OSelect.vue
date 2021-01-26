<template>
<!-- 下拉组件 -->
<el-select
  :value="value"
  :popper-append-to-body="false"
  :style="item.style || item.width?`width:${item.width}`:'100%'"
  :class="[item.arrow===false?'disable-arrow':'',item.class]"
  v-bind="item"
  v-on="$listeners"
>
  <el-option
    v-for="option in item.options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
    :disabled="option.disabled"
  >
  </el-option>
</el-select>
</template>
<script>
export default {
  name: 'OSelect',
  props: ['item', 'value']
}
</script>
