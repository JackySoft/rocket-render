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
          overflow: isOpen ? 'auto' : 'hidden',
        }"
      >
        <template v-for="(item, index) in json">
          <template v-if="calcItemShow(item, value)">
            <FormItem
              :key="index"
              :item="item"
              v-bind="item"
              :value="value[item.model]"
              @input="(val) => handleInput(item, val)"
            />
          </template>
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
import SearchForm from '.';
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
      showOpen: false,
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
    if (!Array.isArray(this.json)) {
      throw new Error('SearchForm的属性json必须为一个数组');
    }
    // 根据全局尺寸，计算SearchForm高度
    if (this.$rocket.size == '') {
      this.formHeight = 62;
    } else if (this.$rocket.size === 'medium') {
      this.formHeight = 58;
    } else if (this.$rocket.size === 'small') {
      this.formHeight = 51;
    } else if (this.$rocket.size === 'mini') {
      this.formHeight = 47;
    }
    // flex模式下，从新计算展开按钮是否显示
    if (this.mode == 'flex') this.calcHeight();
    // 如果默认有日期数组，并且携带export，我们会自动拆解
    this.json.map((item) => {
      if (
        ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
        item.export
      ) {
        const [start, end] = this.value[item.model];
        if (!Array.isArray(item.export)) {
          throw Error('item.export must be a Array');
        }
        if (start && end) {
          this.value[item.export[0]] = start;
          this.value[item.export[1]] = end;
          this.$emit('update:model', { ...this.value });
        }
      }
    });
  },
  methods: {
    // 控制当前组件是否展示
    calcItemShow(item, value) {
      if (!item.show) {
        return true;
      }
      if (typeof item.show === 'object') {
        return item.show.val.includes(value[item.show.model]);
      }
      if (typeof item.show === 'function') {
        return item.show(value);
      }
    },
    /**
     * 触发自定义事件
     * @callback(val,values,model)当前值/所有值/当前model
     */
    handleInput(item, val) {
      if (typeof item.change === 'function') {
        item.change(val, this.value, item.model, this.json);
      }
      // 把日期数组拆解为两个字段，方便前端使用
      if (
        ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
        item.export
      ) {
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
        if (['daterange', 'monthrange', 'datetimerange'].includes(item.type)) {
          let dateRange = this.value[item.model];
          // 如果日期对象没有两个值，我们就直接给空数组，同时删除export字段
          if (dateRange && dateRange.length < 2) {
            this.value[item.model] = [];
            if (item.export) {
              delete this.value[item.export[0]];
              delete this.value[item.export[1]];
            }
          }
          // 如果默认就有值，重置以后依然会保持默认的值，此时还需要修改export
          if (dateRange && dateRange.length === 2 && item.export) {
            this.value[item.export[0]] = dateRange[0];
            this.value[item.export[1]] = dateRange[1];
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
      // 提交给接口的参数，过滤掉undefined和空字符串
      const params = {};
      Object.keys(this.value).map((key) => {
        if (typeof this.value[key] === 'undefined') return;
        if (this.value[key] === '') return;
        params[key] = this.value[key];
      });
      this.$emit('update:model', { ...params });
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
