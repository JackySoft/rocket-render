<template>
  <el-form
    ref="powerForm"
    class="power-form"
    :label-width="config.labelWidth || '100px'"
    :model="value"
    :size="config.size || 'medium'"
    :label-suffix="config.labelSuffix || '：'"
    v-bind="config"
    :style="{ width: config.formWidth }"
  >
    <template v-for="(item, index) in config.formList">
      <el-form-item
        :label="item.label"
        :key="(item.model || item.type) + index"
        :required="item.required"
        :prop="item.model"
        :rules="item.rules"
        v-if="
          (item.show && item.show.val.includes(value[item.show.model])) ||
          !item.show
        "
      >
        <!-- 纯文本渲染，一般用于详情页面 -->
        <span v-if="item.type === 'detail'">{{ value[item.model] }}</span>
        <!-- text/textarea共用 -->
        <OInput
          v-if="['input','text', 'textarea','number'].includes(item.type)"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        >
          <template v-slot:select v-if="item.prependConfig">
            <OSelect
              v-model="value[item.prependConfig.model]"
              :item="item.prependConfig"
              @input="handleInput(item.prependConfig,value)"
            />
          </template>
        </OInput>
        <!-- 下拉控件 -->
        <OSelect
          v-if="item.type === 'select'"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <!-- 日期范围选择 -->
        <ODatePicker
          v-if="['date', 'daterange', 'datetime', 'datetimerange'].includes(item.type)"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <!-- 增加一个时段选择 -->
        <template v-if="item.type === 'time-select'">
          <el-row>
            <el-col :span="11">
              <OTimeSelect
                v-model="value[item.items[0].model]"
                :item="item.items[0]"
                @input="handleInput(item,value)"
              />
            </el-col>
            <el-col :span="2"><div style="text-align:center;">-</div></el-col>
            <el-col :span="11">
              <OTimeSelect
                v-model="value[item.items[1].model]"
                :item="{...item.items[1],pickerOptions:{...(item.items[1].pickerOptions),minTime: value[item.items[0].model]}}"
              />
            </el-col>
          </el-row>
        </template>
        <ORadio
          v-if="['radio', 'radiogroup'].includes(item.type)"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <!-- 开关 -->
        <OSwitch
          v-if="item.type === 'switch'"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <!-- 单个复选，一般可用switch代替 -->
        <OCheckbox
          v-if="item.type === 'checkbox' && !item.options"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <!-- 多个复选，为了便于开发，仅通过options区分 -->
        <OCheckboxGroup
          v-if="item.type === 'checkbox' && item.options"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <!-- 联合select -->
        <template v-if="item.type === 'union-select'">
          <el-row>
            <el-col :span="11">
              <OSelect
                v-model="value[item.items[0].model]"
                :item="item.items[0]"
                @input="handleInput(item.items[0],value)"
              />
            </el-col>
            <el-col :span="2" class="transparent">-</el-col>
            <el-col :span="11">
              <OSelect
                v-model="value[item.items[1].model]"
                :item="item.items[1]"
              />
            </el-col>
          </el-row>
        </template>
        <!-- 文件上传 -->
        <OUpload
          v-if="item.type === 'upload'"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <!-- 穿梭框 -->
        <OTransfer
          v-if="item.type === 'transfer'"
          v-model="value[item.model]"
          :item="item"
          @input="handleInput(item,value)"
        />
        <template v-if="item.tips">
          <!-- 默认tips在文本框下面-->
          <div class="form_tip" v-if="typeof item.tips === 'string'">{{ item.tips }}</div>
          <!-- 手工设置tips在文本框右面，不要修改为行内标签-->
          <span class="form_tip ml20" v-else-if="item.tips.align === 'right'">{{ item.tips.text }}</span>
          <!-- 手工设置tips在文本框下面-->
          <div class="form_tip" v-else-if="item.tips.align === 'bottom'">{{ item.tips.text }}</div>
        </template>
      </el-form-item>
    </template>
    <el-form-item key="form-btn-action" v-if="config.showFooter">
      <!-- 可自定义按钮配置 -->
      <template v-if="config.btnGroup">
        <el-button @click="handleClose">{{config.btnGroup.cancel ? config.btnGroup.cancel.text:'取消'}}</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="config.btnGroup.confirm?config.btnGroup.confirm.loading:false">{{config.btnGroup.confirm?config.btnGroup.confirm.text:'确定'}}</el-button>
      </template>
      <template v-else>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>
<script>
import * as items from './../components'
export default {
  name: 'PowerForm',
  props: {
    config: Object,
    value: Object,
  },
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
    handleInput (item, values) {
      if (item.change) {
        item.change(values[item.model], values, item.model)
      }
      const { action } = item
      // 按钮切换时，重置对应表单
      if (action && action.type === 'reset') {
        const modelList = action.model
        // 重置所有表单
        if (modelList === 'all') {
          const val = values[item.model]
          this.handleReset()
          this.value[item.model] = val
        } else if (modelList) {
          // 重置部分表单
          modelList.map(key => {
            delete this.value[key]
          })
        }
      } else if (item.type === 'time-select') {
        this.value[item.items[1].model] = null
      }
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
<style lang="scss" scoped>
.power-form{
  .form_tip {
    font-size: 12px;
    color: #999999;
    height: 25px;
    line-height: 25px;
    &.ml20{
      margin-left: 20px;
    }
  }
  .transparent{
    text-align:center;opacity:0;
  }
}
</style>
