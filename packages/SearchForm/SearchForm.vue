<template>
  <el-form
    class="rr-search-form"
    :class="{ dialog: type === 'dialog', 'rr-search-flex': mode == 'flex' }"
    ref="searchForm"
    :model="value"
    :inline="true"
    @submit.native.prevent="handleQuery"
  >
    <!-- flex布局-->
    <template v-if="mode == 'flex'">
      <div
        class="rr-form-item"
        :style="{
          height: isOpen ? 'auto' : formHeight + 'px',
        }"
      >
        <template v-for="(item, index) in json">
          <FormItem
            :key="index"
            :item="item"
            v-bind="item"
            :value="value[item.model]"
            @input="(val) => handleInput(item, val)"
          />
        </template>
        <div ref="expandFlag"></div>
      </div>
      <div class="rr-action">
        <el-button
          type="text"
          v-if="showOpen"
          @click="isOpen = !isOpen"
          size="medium"
          >{{ isOpen ? '收起' : '展开'
          }}<i :class="[isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i
        ></el-button>
        <el-button type="primary" :size="$rocket.size" @click="handleQuery"
          >查询</el-button
        >
        <el-button :size="$rocket.size" @click="handleReset">重置</el-button>
      </div>
    </template>
    <!-- 行内布局-->
    <template v-else-if="mode == 'inline'">
      <template v-for="(item, index) in json">
        <FormItem
          :key="index"
          :item="item"
          v-bind="item"
          :value="value[item.model]"
          @input="(val) => handleInput(item, val)"
        />
      </template>
      <el-form-item>
        <el-button type="primary" :size="$rocket.size" @click="handleQuery"
          >查询</el-button
        >
        <el-button :size="$rocket.size" @click="handleReset">重置</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import FormItem from './../components/FormItem';
export default {
  name: 'SearchForm',
  props: {
    inline: String,
    type: String, // 当设置为dialog时，说明QueryForm在dialog中使用，会调整QueryForm背景色
    json: Array, // 表单JSON对象
    model: Object, // 默认v-model参数
  },
  components: { FormItem },
  data() {
    return {
      value: { ...this.model }, // 初始化表单值
      isOpen: false, // 当前是否为展开状态
      formHeight: 0,
    };
  },
  computed: {
    // inline为行内，flex为左右布局
    mode() {
      return this.inline || this.$rocket.searchForm.inline;
    },
  },
  created() {
    this.setFastProp();
  },
  mounted() {
    // 根据全局尺寸，计算SearchForm高度
    if (this.$rocket.size == '') {
      this.formHeight = 62;
    } else if (this.$rocket.size === 'medium') {
      this.formHeight = 58;
    } else if (this.$rocket.size === 'small') {
      this.formHeight = 55;
    } else if (this.$rocket.size === 'mini') {
      this.formHeight = 51;
    }
    // flex模式下，从新计算展开按钮是否显示
    if (this.mode == 'flex') this.calcHeight();
  },
  methods: {
    /**
     * 触发自定义事件
     * @callback(val,values,model)当前值/所有值/当前model
     */
    handleInput(item, val) {
      const { action } = item;
      /**
       * type: 'reset' 重置对应表单
       * model: 'all' 重置所有表单
       * model: ['state'] 重置指定表单
       * 重置也可以通过change事件进行重置
       */
      if (action && action.type === 'reset') {
        const modelList = action.model;
        // 重置所有表单
        if (modelList === 'all') {
          this.handleReset();
          this.value[item.model] = val;
        } else if (modelList) {
          // 重置部分表单
          modelList.map((key) => {
            if (Array.isArray(this.value[key])) {
              this.value[key] = [];
            } else {
              this.value[key] = undefined;
            }
            return key;
          });
        }
      }
      if (typeof item.change === 'function') {
        item.change(val, this.value, item.model, this.json);
      }
      // 把日期数组拆解为两个字段，方便前端使用
      if (
        ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
        item.export
      ) {
        if (!Array.isArray(item.export)) {
          throw Error('item.export must be a Array');
        }
        this.value = {
          ...this.value,
          [item.model]: val || '',
          [item.export[0] || 'startTime']: val ? val[0] : '',
          [item.export[1] || 'endTime']: val ? val[1] : '',
        };
      } else {
        this.value = { ...this.value, [item.model]: val };
      }
    },
    /**
     * 表单重置
     * 外部也可通过$refs进行内部API调用
     */
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.json.map((item) => {
        if (
          ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
          item.export
        ) {
          let dateRange = this.value[item.model];
          if (dateRange) {
            this.value[item.export[0]] = dateRange[0];
            this.value[item.export[1]] = dateRange[1];
          } else {
            delete this.value[item.export[0]];
            delete this.value[item.export[1]];
          }
        }
      });
      this.$emit('update:model', { ...this.value });
      this.$emit('handleReset', 1);
    },
    /**
     * 点击查询，回传数据，重置页码
     */
    handleQuery() {
      this.$emit('update:model', { ...this.value });
      this.$emit('handleQuery', 1);
    },
    setFastProp() {
      this.json.forEach((item) => {
        const fastProp = `$${item.model}`;
        if (item.model && !this.json[fastProp]) {
          Object.defineProperty(this.json, fastProp, {
            get() {
              return item;
            },
          });
        }
      });
    },
    // flex 布局模式下，计算是否有展开按钮
    calcHeight() {
      this.showOpen = false;
      const offsetTop = this.$refs.expandFlag.offsetTop;
      if (offsetTop > this.formHeight) this.showOpen = true;
    },
  },
  /**
   * 销毁全局事件
   */
  unmounted() {
    window.onresize = null;
  },
  /**
   * 当父组件修改model时，需要同步修改子组件
   */
  watch: {
    model: {
      handler: function (val) {
        this.value = { ...val };
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
// 默认为白色背景，当在弹框中时为灰色背景
.rr-search-form {
  background-color: #fff;
  padding: 20px 20px 0;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  &.rr-search-flex {
    display: flex;
    justify-content: space-between;
    .rr-form-item {
      position: relative;
      flex: 1;
    }
    .rr-action {
      min-width: 200px;
      text-align: right;
    }
  }
  .text-right {
    text-align: right;
  }
  &.dialog {
    background-color: #f7f8fa;
    border: none;
  }
  .hidden {
    display: none;
  }
  .el-row--flex {
    flex-wrap: wrap;
    .el-form-item {
      display: flex;
      .el-form-item__content {
        flex: 1;
        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
}
</style>
