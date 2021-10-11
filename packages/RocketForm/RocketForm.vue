<template>
<el-row v-bind="config.layout">
  <el-form
    class="rocket-form"
    :ref="refForm"
    :model="value"
    v-bind="{...config,formList:null,layout:null,labelWidth:config.labelWidth || '100px'}"
  >
    <template v-for="(item, index) in config.formList">
      <el-col :span="item.span || 24" :key="index" v-if="
          (item.show && item.show.val.includes(value[item.show.model])) ||
          !item.show
        ">
        <template v-if="item.type === 'inline'">
          <el-form-item v-bind="{...item,list:null,labelSuffix:''}" style="margin-bottom:0;">
            <template v-for="(subItem,index) in item.list">
              <!-- 设置gutter后，此处会有padding值，导致无法对齐-->
              <el-col :span="subItem.span || 24/item.list.length" :key="subItem.model" :style="{'padding-left':index==0?'0px':'auto'}">
                <FormItem  :item="subItem" v-bind="subItem" :value="value[subItem.model]" @input="(val)=>handleInput(subItem,val)" @click="handleClick(subItem)"/>
              </el-col>
            </template>
          </el-form-item>
        </template>
        <template v-else-if="item.type === 'group'">
          <el-form-item v-bind="{...item,list:null}" style="margin-bottom:0;"></el-form-item>
          <el-form-item>
            <el-row v-bind="config.layout" v-for="(row,key) in item.list" :key="key">
              <template v-for="subItem in row">
                <el-col :span="subItem.span || 24/item.list.length" :key="subItem.model">
                  <FormItem  :item="subItem" v-bind="subItem" :value="value[subItem.model]" @input="(val)=>handleInput(subItem,val)" @click="handleClick(subItem)"/>
                </el-col>
              </template>
            </el-row>
          </el-form-item>
        </template>
        <template v-else>
          <FormItem :item="item" v-bind="item" :value="value[item.model]" @input="(val)=>handleInput(item,val)" @click="handleClick(item)"/>
        </template>
      </el-col>
    </template>
    <el-col :span="24">
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
    </el-col>
  </el-form>
</el-row>
</template>
<script>
import FormItem from '../components/FormItem.vue'
export default {
  name: 'PowerForm',
  props: {
    config: Object,
    value: Object,
  },
  components: { FormItem },
  data () {
    return {
      refForm: this.config.ref || 'powerForm',
    }
  },
  methods: {
    /**
     * 触发自定义事件
     * change(val,values,item,config)当前值/所有值/当前item/所有配置
     */
    handleInput (item, val) {
      const { action } = item
      const values = { ...this.value }
      /**
       * type: 'reset' 重置对应表单
       * model: 'all' 重置所有表单
       * model: ['state'] 重置指定表单
       * 重置也可以通过change事件进行重置
       */
      if (action && action.type === 'reset') {
        const modelList = action.model
        // 重置所有表单
        if (modelList === 'all') {
          this.handleReset()
        } else if (modelList) {
          // 重置部分表单
          modelList.map(key => {
            if (Array.isArray(this.value[key])) {
              values[key] = []
            } else {
              values[key] = undefined
            }
            return key
          })
        }
      }
      if (typeof item.change === 'function') {
        item.change(val, values, item.model, this.config)
      }
      this.$emit('input', { ...values, [item.model]: val })
    },
    // 表单重置
    handleReset () {
      this.$refs[this.refForm].resetFields()
    },
    // 默认走dialog弹框自带的关闭，也可以执行当前页面关闭按钮
    handleClose () {
      this.$refs[this.refForm].resetFields()
      this.$emit('handleClose')
    },
    // 默认触发查询点击事件
    handleSubmit () {
      this.$refs[this.refForm].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.value)
        }
      })
    },
    // 自定义校验方法,回调参数为被校验的表单项 prop 值，表示校验是否通过
    validate (fn) {
      this.$refs.powerForm.validate((valid) => {
        (typeof fn === 'function') && fn(valid)
      })
    },
    handleClick (item) {
      if (typeof item.click === 'function') {
        item.click(this.value, this.config)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.rocket-form{
  .form-tip{
    font-size: 14px;
    color: #747474;
    height: 25px;
    line-height: 25px;
    &.ml20{
        margin-left: 10px;
    }
  }
  .transparent{
    text-align:center;opacity:0;
  }
}
</style>
