<template>
  <el-descriptions
    :title="json.title"
    v-bind="{ ...json, list: null, slot: null }"
  >
    <!-- 支持表头插槽 -->
    <template v-if="json.type == 'slot'">
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <template slot="extra">
        <slot name="extra"></slot>
      </template>
    </template>
    <!-- 描述内容动态遍历 -->
    <template v-for="item in json.list">
      <el-descriptions-item
        :key="item.label"
        :label="item.label"
        v-if="item.type == 'slot'"
      >
        <template slot="label" v-if="item.slotLabelName">
          <slot :name="item.slotLabelName"></slot>
        </template>
        <template v-if="item.slotValueName">
          <slot :name="item.slotValueName"></slot>
        </template>
        <template v-else>
          {{ values[item.prop] }}
        </template>
      </el-descriptions-item>
      <el-descriptions-item :key="item.label" :label="item.label" v-else>
        {{ values[item.prop] }}
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>
<script>
export default {
  name: 'RocketDesc',
  props: {
    // 描述列表
    json: {
      type: Object,
      default: () => {
        return {
          title: '',
          list: [],
        };
      },
    },
    // 描述值
    values: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
// 默认为白色背景，当在弹框中时为灰色背景
.search-form {
  display: flex;
  justify-content: space-between;
  .form-wrap {
    flex: 1;
  }
  .handle-action {
    width: 220px;
    text-align: right;
  }
}
</style>
