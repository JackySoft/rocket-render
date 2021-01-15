<template>
<!-- date/datetime/daterange/datetimerange -->
<el-date-picker
  :type="item.type"
  :value="value"
  @input="handleInput($event)"
  :value-format="item.format || 'yyyy-MM-dd'"
  :range-separator="item.separator || '-'"
  :placeholder="item.placeholder || '选择日期'"
  :start-placeholder="item.startPlaceholder || '开始日期'"
  :end-placeholder="item.startPlaceholder || '结束日期'"
  :popper-append-to-body="false"
  :picker-options="{
    ...item.pickerOptions,
    ...(item.shortcuts? ['date', 'datetime'].includes(item.type)? pickerOptions.date:pickerOptions.daterange:{})}
  "
  :style="{ width: item.width }"
/>
</template>
<script>
export default {
  name: 'ODatePicker',
  props: ['item', 'value'],
  data () {
    return {
      pickerOptions: {
        // 日期控件快捷键配置
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
        // 日期范围控件快捷键配置
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
    // 数据回传
    handleInput (val) {
      this.$emit('input', val)
    },
  }
}
</script>
