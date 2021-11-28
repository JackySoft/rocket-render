<template>
  <el-descriptions
    :title="json.title"
    v-bind="{ ...json, list: null, slot: null }"
    class="rocket-desc"
  >
    <!-- 支持表头插槽 -->
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="extra">
      <slot name="extra"></slot>
    </template>
    <!-- 描述内容动态遍历 -->
    <template v-for="item in json.list">
      <el-descriptions-item :key="item.label" v-bind="item">
        <!-- label插槽 -->
        <template slot="label" v-if="item.slotLabelName">
          <slot :name="item.slotLabelName"></slot>
        </template>
        <!-- value插槽 -->
        <template v-if="item.slotValueName">
          <slot :name="item.slotValueName"></slot>
        </template>
        <!-- 编辑模式下，值为表单控件 -->
        <el-form :model="values" :inline="true" v-else-if="json.type == 'edit'">
          <FormItem
            :item="{ ...item, model: item.prop, label: null }"
            v-bind="{ ...item, model: item.prop, label: null }"
            :value="handleObject(item)"
            @input="(val) => handleInput(val, item)"
            v-if="item.type"
          />
          <!-- 支持局部是文本渲染 -->
          <span v-else>
            {{ handleData(item) }}
          </span>
        </el-form>
        <!-- 默认情况下是文本渲染 -->
        <template v-else>
          {{ handleData(item) }}
        </template>
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>
<script>
import FormItem from './../components/FormItem';
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
  components: { FormItem },
  data() {
    return {};
  },
  methods: {
    handleObject(item) {
      if (item.prop.indexOf('.') > -1) {
        return eval(`this.values.${item.prop}`);
      }
      if (item.type == 'date') {
        return new Date(this.values[item.prop]);
      }
      if (item.type == 'daterange') {
        if (item.export) {
          return [
            new Date(this.values[item.export[0]]),
            new Date(this.values[item.export[1]]),
          ];
        }
        return [new Date(item.prop[0]), new Date(item.prop[1])];
      }
      return this.values[item.prop];
    },
    handleData(item) {
      if (item.formatter) {
        return item.formatter(this.values);
      }
      if (item.prop.indexOf('.') > -1) {
        return eval(`this.values.${item.prop}`);
      }
      return this.values[item.prop];
    },
    handleInput(val, item) {
      if (item.prop.indexOf('.') > -1) {
        eval(`this.values.${item.prop}='${val}'`);
        this.$emit('update:values', {
          ...this.values,
        });
        return;
      }
      // 把日期数组拆解为两个字段，方便前端使用
      if (
        ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
        item.export
      ) {
        if (!Array.isArray(item.export))
          throw Error('item.export must be a Array');
        this.$emit('update:values', {
          ...this.values,
          [item.prop]: val || '',
          [item.export[0] || 'startTime']: val ? val[0] : '',
          [item.export[1] || 'endTime']: val ? val[1] : '',
        });
      } else {
        this.$emit('update:values', { ...this.values, [item.prop]: val });
      }
      // this.$emit('update:values', { ...this.values, [item.prop]: val });
    },
  },
};
</script>
<style lang="scss">
.rocket-desc {
  .el-form .el-form-item {
    margin-bottom: 0;
  }
}
</style>
