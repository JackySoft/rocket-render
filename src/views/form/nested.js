export default {
  ref: 'elForm',
  model: 'formData',
  labelWidth: '120px',
  labelPosition: 'right',
  labelSuffix: ':',
  inline: false,
  class: 'query-test',
  style: {
    width: '100%'
  },
  layout: {
    gutter: 15,
  },
  showFooter: true,
  formList: [
    {
      type: 'input',
      label: '所属媒体',
      placeholder: '请输入所属媒体',
      model: 'a1',
      width: '400px',
      rules: [{ required: true, message: '所属媒体不能为空', trigger: ['blur'] }],
      tips: {
        align: 'right',
        text: '一个媒体对应一个任务ID',
        style: {
          'font-size': '14px',
          'margin-left': '10px'
        }
      },
      prepend: '状态',
      append: '@163.com'
    },
    {
      type: 'input',
      label: '所属媒体',
      placeholder: '请输入所属媒体',
      model: 'a2',
      tips: '一个媒体对应一个任务ID',
    },
    {
      type: 'inline',
      label: '概率配置',
      list: [
        {
          span: 8,
          type: 'select',
          placeholder: '请选择概率配置',
          model: 'a3',
          labelWidth: '0',
          options: [
            { label: '10%', value: 1 },
            { label: '20%', value: 2 },
            { label: '30%', value: 3 },
            { label: '40%', value: 4 },
          ]
        },
        {
          span: 8,
          type: 'input',
          placeholder: '请输入概率配置',
          model: 'a4',
          append: '%',
          labelWidth: '0'
        },
        {
          span: 3,
          type: 'button',
          button: {
            type: 'text',
            text: '添加抽奖结果',
          },
          labelWidth: '0'
        },
        {
          span: 5,
          type: 'label',
          text: '至少配置两种抽选结果',
          labelWidth: '0'
        }
      ]
    },
    {
      type: 'inline',
      label: '场次配置',
      list: [
        {
          span: 8,
          type: 'time-select',
          placeholder: '请输入起始时间',
          model: 'a5',
          pickerOptions: {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        },
        {
          span: 8,
          type: 'time-select',
          placeholder: '请输入结束时间',
          model: 'a6',
          pickerOptions: {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        },
        {
          span: 3,
          type: 'button',
          button: {
            type: 'text',
            text: '添加区间',
          },
          labelWidth: '0'
        },
        {
          span: 5,
          type: 'tips',
          tips: '至少配置两种抽选结果',
          labelWidth: '0'
        }
      ]
    },
    {
      type: 'group',
      label: '开启宝箱条件',
      list: [
        [
          {
            span: 8,
            type: 'input',
            placeholder: '请输入抽取次数',
            label: '抽取',
            labelWidth: '80px',
            model: 'a7',
            rules: [{ required: true, message: '请输入抽取次数', trigger: 'blur' }],
            label1: '次可开启宝箱1'
          },
          {
            span: 8,
            type: 'input',
            placeholder: '请输入奖励金币',
            label: '奖励金币',
            model: 'a8',
            rules: [{ required: true, message: '请输入奖励金币', trigger: 'blur' }]
          },
          {
            span: 3,
            type: 'button',
            button: {
              type: 'primary',
              round: true,
              icon: 'el-icon-plus',
              text: '增加'
            },
            click (item, subItem, value) {
              const sub = item.list[0]
              item.list.push(sub)
            },
            labelWidth: '0'
          }
        ]
      ]
    },
    {
      type: 'inline',
      label: '金币数量发放',
      list: [
        {
          span: 6,
          type: 'input',
          label: '数量区间',
          model: 'num1',

        },
        {
          span: 6,
          type: 'input',
          label: '',
          model: 'num2',
          labelWidth: '20px'
        },
        {
          span: 8,
          type: 'input',
          label: '下发概率',
          model: 'num3',
          append: '%'
        },
        {
          span: 4,
          type: 'button',
          button: {
            type: 'text',
            text: '添加幸运卡配置'
          },

        }
      ]
    }
  ]
}
