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
      <!-- 支持文本框添加文本前缀，比如：https -->
        <template slot="prepend" v-if="item.prepend">{{item.prepend}}</template>
        <!-- 支持文本框后添加文本后缀，比如：邮箱.com -->
        <template slot="append" v-if="item.append">{{item.append}}</template>
    </el-input>
    <!-- input-number -->
    <el-input-number
      v-else-if="item.type === 'input-number'"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-input-number>
    <!-- 下拉控件 -->
    <el-select
      v-else-if="item.type === 'select'"
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
    <!-- TimePicker-固定时间 -->
    <el-time-select
      v-else-if="item.type === 'time-select'"
      :style="item.style || item.width?`width:${item.width}`:''"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- TimePicker-任意时间 -->
    <el-time-picker
      v-else-if="item.type === 'time-picker'"
      :style="item.style || item.width?`width:${item.width}`:''"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- 支持Element所有日期类型 -->
    <el-date-picker
      v-else-if="['date', 'week', 'month', 'year', 'dates', 'datetime'].includes(item.type)"
      :style="item.style || item.width?`width:${item.width}`:''"
      v-bind="$attrs"
      v-on="$listeners"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :placeholder="item.placeholder || '选择日期'"
      :popper-append-to-body="false"
      :picker-options="{
        ...item.pickerOptions,
        ...(item.shortcuts? pickerOptions.date:{})}
      "
    />
    <!-- 支持Element所有日期范围类型 -->
    <el-date-picker
      v-else-if="['daterange', 'monthrange', 'datetimerange'].includes(item.type)"
      :style="item.style || item.width?`width:${item.width}`:''"
      v-bind="$attrs"
      v-on="$listeners"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      :start-placeholder="item.startPlaceholder || '开始日期'"
      :end-placeholder="item.startPlaceholder || '结束日期'"
      :popper-append-to-body="false"
      :picker-options="{
        ...item.pickerOptions,
        ...(item.shortcuts? ['monthrange'].includes(item.type)? pickerOptions.monthRange:pickerOptions.daterange:{})}
      "
    />
    <!-- 单选按钮组 -->
    <el-radio-group
      v-else-if="['radio', 'radiogroup','radio-group','radio-button'].includes(item.type)"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-if="item.type === 'radio'">
        <el-radio
          v-for="radio in item.options"
          :key="radio.value"
          :label="radio.value"
          >{{ radio.label }}</el-radio
        >
      </template>
      <template v-else>
        <el-radio-button
          v-for="radio in item.options"
          :key="radio.value"
          :label="radio.value"
          >{{ radio.label }}</el-radio-button
        >
      </template>
    </el-radio-group>
    <!-- 开关 -->
    <el-switch
      v-else-if="item.type === 'switch'"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-switch>
    <!-- 单个复选，一般可用switch代替 -->
    <el-checkbox
      v-else-if="item.type === 'checkbox' && !item.options"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    >{{item.showLabel?item.label:''}}</el-checkbox>
    <!-- 复选框组，为了便于开发，仅通过options区分 -->
    <el-checkbox-group
      v-else-if="item.type === 'checkbox' && item.options"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      :size="item.size"
      :disabled="item.disabled"
      :min="item.min"
      :max="item.max"
      :text-color="item.textColor"
      :fill="item.fill"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-if="item.subType === 'button'">
        <el-checkbox-button
          v-for="check in item.options"
          :key="check.label"
          :label="check.value"
          v-bind="check"
        >{{ check.label }}</el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox
          v-for="check in item.options"
          :key="check.label"
          :label="check.value"
          v-bind="check"
          >{{ check.label }}</el-checkbox
        >
      </template>
    </el-checkbox-group>
    <!-- 级联框 -->
    <el-cascader
      v-else-if="item.type === 'cascader'"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- 穿梭框 -->
    <el-transfer
      v-else-if="item.type === 'transfer'"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- 文件上传 -->
    <OUpload
      v-if="item.type === 'upload'"
      :item="item"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- link -->
    <el-link
      v-if="item.type === 'link'"
      v-bind="item.link"
      v-on="$listeners"
    >{{item.text}}</el-link>
    <!-- 按钮 -->
    <el-button
      v-if="item.type === 'button'"
      :style="item.style || item.width?`width:${item.width}`:'width:100%'"
      v-bind="item.button"
      v-on="$listeners"
    >
      {{item.button.text}}
    </el-button>
    <!-- 纯文本 -->
    <div v-if="item.type === 'label'" :style="item.style">{{item.text || $attrs.value}}</div>
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
import OUpload from './OUpload'
export default {
  name: 'FormItem',
  props: ['item'],
  components: { OUpload },
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
        monthRange: {
          shortcuts: [{
            text: '本月',
            onClick (picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          }, {
            text: '今年至今',
            onClick (picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      },
    }
  }
}
</script>
