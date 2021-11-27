<template>
  <el-row v-bind="json.layout">
    <el-form
      class="rocket-form"
      :ref="refForm"
      :model="value"
      @validate="$emit('validate')"
      v-bind="{
        ...json,
        formList: null,
        layout: null,
        labelWidth: json.labelWidth || '100px',
      }"
    >
      <template v-for="(item, index) in json.formList">
        <el-col
          :span="item.span || 24"
          :key="index"
          v-if="
            (item.show && item.show.val.includes(value[item.show.model])) ||
            !item.show
          "
        >
          <template v-if="item.type === 'inline'">
            <el-form-item
              v-bind="{ ...item, list: null, labelSuffix: '' }"
              style="margin-bottom: 0"
            >
              <template v-for="(subItem, index) in item.list">
                <!-- 设置gutter后，此处会有padding值，导致无法对齐-->
                <el-col
                  :span="subItem.span || 24 / item.list.length"
                  :key="subItem.model"
                  :style="{ 'padding-left': index == 0 ? '0px' : 'auto' }"
                >
                  <FormItem
                    :item="subItem"
                    v-bind="subItem"
                    :value="value[subItem.model]"
                    @input="(val) => handleInput(subItem, val)"
                    @click="handleClick(subItem)"
                  />
                </el-col>
              </template>
            </el-form-item>
          </template>
          <template v-else-if="item.type === 'group'">
            <el-form-item
              v-bind="{ ...item, list: null }"
              style="margin-bottom: 0"
            ></el-form-item>
            <el-form-item>
              <el-row
                v-bind="json.layout"
                v-for="(row, key) in item.list"
                :key="key"
              >
                <template v-for="subItem in row">
                  <el-col
                    :span="subItem.span || 24 / item.list.length"
                    :key="subItem.model"
                  >
                    <FormItem
                      :item="subItem"
                      v-bind="subItem"
                      :value="value[subItem.model]"
                      @input="(val) => handleInput(subItem, val)"
                      @click="handleClick(subItem)"
                    />
                  </el-col>
                </template>
              </el-row>
            </el-form-item>
          </template>
          <template v-else-if="item.type === 'table'">
            <!-- 支持表单嵌套表格，实现基本的功能 -->
            <el-form-item v-bind="{ ...item, table: null }" :prop="item.model">
              <rocket-table
                v-bind="item.table"
                :data="value[item.model]"
                @handleAction="
                  (data) => {
                    item.table.handleAction && item.table.handleAction(data);
                  }
                "
                @handleChange="
                  (data) => {
                    item.tablehandleChange && item.tablehandleChange(data);
                  }
                "
                @handleCellClick="
                  (data) => {
                    item.tablehandleCellClick &&
                      item.tablehandleCellClick(data);
                  }
                "
                @selection-change="
                  (data) => {
                    item.tableselectionChange &&
                      item.tableselectionChange(data);
                  }
                "
                @sort-change="
                  (data) => {
                    item.tablesortChange && item.tablesortChange(data);
                  }
                "
              >
                <template v-slot:title><slot name="title"></slot></template>
                <template v-slot:action><slot name="action"></slot></template>
              </rocket-table>
            </el-form-item>
          </template>
          <template v-else-if="item.type === 'slot'">
            <el-form-item v-bind="{ ...item, table: null }" :prop="item.model">
              <slot :name="item.slotName"></slot>
            </el-form-item>
          </template>
          <template v-else>
            <FormItem
              :item="item"
              v-bind="item"
              :value="value[item.model]"
              @input="(val) => handleInput(item, val)"
              @click="handleClick(item)"
            />
          </template>
        </el-col>
      </template>
      <el-col :span="24">
        <el-form-item key="form-btn-action" v-if="json.showFooter">
          <!-- 可自定义按钮配置 -->
          <template v-if="json.btnGroup">
            <el-button @click="handleClose">{{
              json.btnGroup.cancel ? json.btnGroup.cancel.text : '取消'
            }}</el-button>
            <el-button
              type="primary"
              @click="handleSubmit"
              :loading="
                json.btnGroup.confirm ? json.btnGroup.confirm.loading : false
              "
              >{{
                json.btnGroup.confirm ? json.btnGroup.confirm.text : '确定'
              }}</el-button
            >
          </template>
          <template v-else>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
          </template>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
import FormItem from '../components/FormItem.vue';
export default {
  name: 'RocketForm',
  props: {
    json: Object,
    value: Object,
  },
  components: { FormItem },
  data() {
    return {
      refForm: this.json.ref || 'rocketForm',
    };
  },
  methods: {
    /**
     * 触发自定义事件
     * change(val,values,item,json)当前值/所有值/当前item/所有配置
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
          });
        }
      }
      if (typeof item.change === 'function') {
        item.change(val, this.value, item.model, this.config);
      }
      // 把日期数组拆解为两个字段，方便前端使用
      if (
        ['daterange', 'monthrange', 'datetimerange'].includes(item.type) &&
        item.export
      ) {
        if (!Array.isArray(item.export))
          throw Error('item.export must be a Array');
        this.$emit('input', {
          ...this.value,
          [item.model]: val || '',
          [item.export[0] || 'startTime']: val ? val[0] : '',
          [item.export[1] || 'endTime']: val ? val[1] : '',
        });
      } else {
        this.$emit('input', { ...this.value, [item.model]: val });
      }
    },
    // 表单重置
    handleReset() {
      this.$refs[this.refForm].resetFields();
    },
    // 默认走dialog弹框自带的关闭，也可以执行当前页面关闭按钮
    handleClose() {
      this.$refs[this.refForm].resetFields();
      this.$emit('handleClose');
    },
    // 默认触发查询点击事件
    handleSubmit() {
      this.$refs[this.refForm].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.value);
        }
      });
    },
    // 自定义校验方法,回调参数为被校验的表单项 prop 值，表示校验是否通过
    validate(fn) {
      this.$refs[this.refForm].validate((valid) => {
        typeof fn === 'function' && fn(valid);
      });
    },
    handleClick(item) {
      if (typeof item.click === 'function') {
        item.click(this.value, this.config);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.rocket-form {
  .form-tip {
    font-size: 14px;
    color: #747474;
    height: 25px;
    line-height: 25px;
    &.ml20 {
      margin-left: 10px;
    }
  }
  .transparent {
    text-align: center;
    opacity: 0;
  }
}
</style>
