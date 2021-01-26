<template>
  <el-form-item
    :prop="item.model"
    :label="item.label"
    :label-width="item.labelWidth"
    :required="item.required"
    :rules="item.rules"
    :error="item.error"
    :show-message="item.showMessage"
    :inline-message="item.inlineMessage"
    :size="item.size"
    :class="['oc-form-item',item.class]"
  >
    <!-- text/textarea/number -->
    <el-input
      v-if="['input','text','textarea','number'].includes(item.type)"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      :class="[item.arrow===false?'disable-arrow':'']"
      v-bind="$attrs"
      v-on="$listeners"
    >
    <template slot="prepend"></template>
      <!-- 支持文本框添加文本前缀，比如：https -->
        <template slot="prepend" v-if="item.prepend">{{item.prepend}}</template>
        <!-- 支持文本框后添加文本后缀，比如：邮箱.com -->
        <template slot="append" v-if="item.append">{{item.append}}</template>
    </el-input>
    <!-- 下拉控件 -->
    <el-select
      v-if="item.type === 'select'"
      :popper-append-to-body="false"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
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
    <!-- TimePicker选择 -->
    <el-time-select
      v-if="item.type === 'time-select'"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- 日期范围选择 -->
    <ODatePicker
    v-if="['date', 'daterange', 'datetime', 'datetimerange'].includes(item.type)"
    :item="item"
    @input="handleInput"
    />
    <ORadio
    v-if="['radio', 'radiogroup'].includes(item.type)"
    :item="item"
    @input="handleInput"
    />
    <!-- 开关 -->
    <OSwitch
    v-if="item.type === 'switch'"
    :item="item"
    @input="handleInput"
    />
    <!-- 单个复选，一般可用switch代替 -->
    <OCheckbox
    v-if="item.type === 'checkbox' && !item.options"
    :item="item"
    @input="handleInput"
    />
    <!-- 多个复选，为了便于开发，仅通过options区分 -->
    <OCheckboxGroup
    v-if="item.type === 'checkbox' && item.options"
    :item="item"
    @input="handleInput"
    />
    <!-- 文件上传 -->
    <OUpload
    v-if="item.type === 'upload'"
    :item="item"
    @input="handleInput"
    />
    <!-- 穿梭框 -->
    <OTransfer
    v-if="item.type === 'transfer'"
    :item="item"
    @input="handleInput"
    />
    <!-- 按钮 -->
    <el-button
      v-if="item.type === 'button'"
      :type="item.button.type"
      :style="{ width: item.width }"
      v-bind="item.button"
      v-on="$listeners"
    >
      {{item.button.text}}
    </el-button>
    <!-- 纯文本 -->
    <div v-if="item.type === 'label'">{{item.text}}</div>
    <template v-if="item.tips || item.type === 'tips'">
        <!-- 默认tips在文本框下面-->
        <div class="form-tip" v-if="typeof item.tips === 'string'">{{ item.tips }}</div>
        <!-- 手工设置tips在文本框右面，不要修改为行内标签-->
        <span class="form-tip ml20" :style="item.tips.style" v-else-if="item.tips.align === 'right'">{{ item.tips.text }}</span>
        <!-- 手工设置tips在文本框下面-->
        <div class="form-tip" v-else-if="item.tips.align === 'bottom'">{{ item.tips.text }}</div>
    </template>
  </el-form-item>
</template>
<script>
import * as items from './index'
export default {
  name: 'FormItem',
  props: ['item'],
  components: { ...items },
  data () {
    return {
      pickerOptions: {
        date: {
          shortcuts: [
            {
              text: '今天',
              onClick (picker) {
                picker.$emit('pick', new Date())
              },
            },
            {
              text: '昨天',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              },
            },
            {
              text: '一周前',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              },
            },
          ],
        },
        daterange: {
          shortcuts: [
            {
              text: '最近一周',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
      },
    }
  },
  methods: {
    /**
     * 触发自定义事件
     * @callback(val,values,model)当前值/所有值/当前model
     */
    handleInput (val) {
      this.$emit('input', val)
    },
    // 表单重置
    handleReset () {
      this.$refs.powerForm.resetFields()
    },
    // 默认走dialog弹框自带的关闭，也可以执行当前页面关闭按钮
    handleClose () {
      this.$refs.powerForm.resetFields()
      this.$emit('handleClose')
    },
    // 默认触发查询点击事件
    handleSubmit () {
      this.$refs.powerForm.validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit')
        }
      })
    },
    // 自定义校验方法,回调参数为被校验的表单项 prop 值，表示校验是否通过
    validate (fn) {
      this.$refs.powerForm.validate((valid) => {
        (typeof fn === 'function') && fn(valid)
      })
    },
  },
}
</script>
<style lang="scss">
// 默认为白色背景，当在弹框中时为灰色背景
.query-form {
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 20px 20px 0;
  border-radius: 4px;
  border: 1px solid #ebeef5;
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
// 弹框中表格样式控制
.el-dialog__wrapper,
.el-drawer__wrapper {
  .query-form {
    background-color: #f7f8fa;
    border: none;
  }
}
</style>
