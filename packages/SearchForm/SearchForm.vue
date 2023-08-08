<template>
  <el-form
    class="rr-search-form"
    :class="{ dialog: type === 'dialog', 'rr-search-flex': mode == 'flex' }"
    ref="searchForm"
    :model="value"
    :inline="true"
    @submit.native.prevent="handleQuery"
  >
    <!-- 固定栅格布局-->
    <el-row type="flex" :gutter="20" v-if="mode == 'grid'">
      <template v-for="(item, index) in json">
        <el-col
          :key="index"
          :xs="24"
          :sm="24"
          :md="md"
          :lg="lg"
          :xl="xl"
          :class="{ hidden: index >= hiddenIndex && !isOpen }"
        >
          <FormItem
            :key="index"
            :item="item"
            v-bind="item"
            :value="value[item.model]"
            @input="(val) => handleInput(item, val)"
          />
        </el-col>
      </template>
      <el-col
        :xs="24"
        :sm="24"
        :md="md"
        :lg="lg"
        :xl="xl"
        :offset="offset"
        class="text-right mb20"
      >
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="text" v-if="showOpen" @click="handleOpen" size="medium"
          >{{ isOpen ? '收起' : '展开'
          }}<i :class="[isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i
        ></el-button>
      </el-col>
    </el-row>
    <!-- flex布局-->
    <template v-else-if="mode == 'flex'">
      <div
        class="rr-form-item"
        :style="{
          height: isOpen ? 'auto' : '51px',
          overflow: isOpen ? 'auto' : 'hidden',
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
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
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
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import FormItem from './../components/FormItem';
/**
 * 根据屏幕宽度，做栅格列数适配
 * 弹框中表单和页面查询表单要区分开
 * 弹框一律最大显示2列，页面查询表单最大显示4列
 * @param {formLength} JSON表单总长度
 * @param {isOpen} 是否展开
 * @param {mode} 是否为弹框
 */
const getResult = (formLength, isOpen, mode) => {
  const w = document.documentElement.clientWidth;
  let len = 0;
  let hiddenIndex = 0;
  let offset = 0;
  let showOpen = true;
  let md = 12; // 1200px以下，一行2列
  let lg = 8; // 1200px以上，一行显示3列
  let xl = 6; // 1920px以上，一行显示4列
  if (mode === 'dialog') {
    if (isOpen) {
      hiddenIndex = 0;
      offset = formLength % 2 === 0 ? 12 : 0;
    } else {
      hiddenIndex = 1;
      offset = formLength > 1 ? 0 : 12;
    }
    md = 12;
    lg = 12;
    xl = 12;
  } else {
    if (w >= 1920) {
      hiddenIndex = 3;
      len = formLength % 4;
      if (isOpen) {
        if (len === 0) offset = 18;
        else if (len === 1) offset = 12;
        else if (len === 2) offset = 6;
        else if (len === 3) offset = 0;
      } else if (formLength > 3) {
        offset = 0;
      } else {
        if (len === 0) offset = 0;
        else if (len === 1) offset = 12;
        else if (len === 2) offset = 6;
        else if (len === 3) offset = 0;
      }
    } else if (w >= 1200) {
      // 一行显示三列
      hiddenIndex = 2;
      len = formLength % 3;
      if (isOpen) {
        if (len === 0) offset = 16;
        else if (len === 1) offset = 8;
        else if (len === 2) offset = 0;
      } else if (formLength > 2) {
        offset = 0;
      } else {
        if (len === 0) offset = 0;
        else if (len === 1) offset = 8;
        else if (len === 2) offset = 0;
      }
    } else if (w >= 992) {
      hiddenIndex = 1;
      if (isOpen) {
        if (formLength % 2 === 0) offset = 12;
      }
    } else {
      hiddenIndex = 1;
    }
    if (formLength <= hiddenIndex) {
      showOpen = false;
    }
  }

  return {
    hiddenIndex,
    offset,
    showOpen,
    md,
    lg,
    xl,
    w,
  };
};
// 添加防抖，防止resize重复调用
function debounce(method, delay, immediate) {
  let timer = null;
  if (immediate) {
    method && method();
  }
  return function () {
    const self = this;
    const args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(self, args);
    }, delay);
  };
}
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
      md: 12, // 992-1200 , 默认加载两列
      lg: 8, // 1200 - 1920 , 默认加载3列
      xl: 6, // >=1920 , 默认加载四列
      showOpen: true, // 显示展开/收起按钮
      isOpen: false, // 当前是否为展开状态
      hiddenIndex: 0, // 需要隐藏的索引
      offset: 0, // 偏移的列数
      screenWidth: 0, // 当前屏幕可用宽度
    };
  },
  computed: {
    // true为行内，grid为栅格，flex为左右布局
    mode() {
      return this.inline || this.$rocket.searchForm.inline || 'flex';
    },
  },
  created() {
    this.setFastProp();
  },
  mounted() {
    window.onresize = debounce(this.handleLayout, 500, true);
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
    /**
     * 点击展开/收起
     */
    handleOpen() {
      this.isOpen = !this.isOpen;
      const res = getResult(this.json.length, this.isOpen, this.mode);
      this.hiddenIndex = res.hiddenIndex;
      this.offset = res.offset;
      this.md = res.md;
      this.lg = res.lg;
      this.xl = res.xl;
    },
    /**
     * 监听resize事件，并通过防抖控制重复触发
     */
    handleLayout() {
      // 根据当前屏幕尺寸，计算需要展示的列数以及隐藏列数
      const { hiddenIndex, offset, showOpen, md, lg, xl, w } = getResult(
        this.json.length,
        this.isOpen,
        this.mode,
      );
      this.hiddenIndex = hiddenIndex;
      this.offset = offset;
      this.showOpen = showOpen;
      this.md = md;
      this.lg = lg;
      this.xl = xl;
      this.screenWidth = w;
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
      if (this.$refs.expandFlag.offsetTop > 60) this.showOpen = true;
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
