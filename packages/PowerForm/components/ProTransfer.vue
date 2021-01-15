<template>
  <div class="pro-transfer-wrapper flex-box">
    <div class="pro-transfer--left pro-transfer--item" :style="{ width: width + 'px' }">
      <p class="pro-transfer--title">{{ titles[0] }}</p>
      <div class="pro-transfer--search flex-box">
        <el-input :placeholder="searchPlaceholder" v-model="searchId" @input="handleSearch"></el-input>
      </div>
      <div class="pro-transfer--wrap">
        <el-checkbox-group v-if="data && data.length" v-model="checkList1">
          <!-- source===1广告位-->
          <template v-if="source === 1">
            <el-checkbox
              style="display: block;"
              :label="`${el.id}-${el.name}`"
              v-for="(el, i) in data"
              :key="i"
              ></el-checkbox>
          </template>
          <!-- source===2创意-->
          <template v-if="source === 2">
            <div v-for="(el, i) in data" :key="i" class="checkbox-container">
              <el-checkbox style="display: block;" :label="`${el.c_id}-${el.name}`"></el-checkbox>
              <div class="checkbox-tips">{{el.formName}} - 开启状态： {{el.status}}</div>
            </div>
          </template>
        </el-checkbox-group>
        <p class="align-center" v-else>暂无数据</p>
      </div>
      <div class="pro-transfer--footer">
        <el-button round size="small" @click="checkAll">全选</el-button>
      </div>
    </div>

    <div class="pro-transfer--center pro-transfer--item">
      <el-button
        type="primary"
        size="small"
        round
        style="display: block; margin-bottom: 10px;"
        @click="addChecked"
        >
        添加
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
      <el-button
        type="danger"
        size="small"
        round
        icon="el-icon-arrow-left"
        style="display: block;"
        @click="removeChecked"
        >移除</el-button>
    </div>

    <div class="pro-transfer--right pro-transfer--item" :style="{ width: width + 'px' }">
      <p class="pro-transfer--title">{{ titles[1] }}</p>
      <div class="pro-transfer--search flex-box">
        <el-input :placeholder="searchPlaceholder" v-model="searchId2" @input="handleSearch2"></el-input>
      </div>
      <div class="pro-transfer--wrap">
        <!-- source===1广告位-->
        <template v-if="source === 1">
          <el-checkbox-group v-model="checkList2" v-if="chooseData.length">
            <el-checkbox
              style="display: block;"
              :disabled="el.canEdit === 0"
              :label="`${el.id}-${el.name}`"
              v-for="(el, i) in chooseData"
              :key="i"
              ></el-checkbox>
          </el-checkbox-group>
        </template>
        <!-- source===2创意-->
        <template v-else-if="source === 2">
          <el-checkbox-group v-model="checkList2" v-if="chooseData.length">
            <div v-for="(el, i) in chooseData" :key="i" class="checkbox-container">
              <el-checkbox
                style="display: block;"
                :label="`${el.c_id}-${el.name}`">
              </el-checkbox>
              <div class="checkbox-tips">{{el.formName}} - 开启状态： {{el.status}}</div>
            </div>
          </el-checkbox-group>
        </template>
        <p class="align-center" v-else>暂无数据</p>
      </div>
      <div class="pro-transfer--footer">
        <el-button round size="small" @click="clearChecked">清空</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProTransfer',
  props: {
    // 列表标题文案
    titles: {
      type: Array,
      default: () => {
        return ['可选择', '已选择']
      }
    },
    // 可选列表数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 已选列表数据
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 来源 1广告位  2创意
    source: {
      type: Number,
      default: 1,
    },
    // 列表搜索框placeholder
    searchPlaceholder: {
      type: String,
      default: '请输入搜索内容',
    },
    width: {
      type: String,
      default: '300',
    }
  },

  data () {
    return {
      searchId: '',
      searchId2: '',
      checkList1: [],
      checkList2: [],
      chooseData: [],
    }
  },

  computed: {
    renderTransfer () {
      // id关系映射表
      const result = {}
      if (this.source === 1) {
        // 广告位
        this.data.forEach(el => {
          result[el.id] = el.name
        })
      } else {
        // 创意列表
        this.data.forEach(el => {
          result[el.c_id] = {
            name: el.name,
            status: el.status,
            formName: el.formName,
            size: el.size,
            id: el.id,
          }
        })
      }
      return result
    },
  },
  watch: {
    value: {
      handler (val) {
        // 先清除勾选项
        this.checkList1 = []
        this.checkList2 = []
        // this.chooseData = val.slice(0, 100)
        if (this.searchId2) {
          const value = val.filter(item => (item.id + '').indexOf(this.searchId2) > -1 || item.name.indexOf(this.searchId2) > -1)
          this.chooseData = value.slice(0, 100)
        } else {
          this.chooseData = this.value.slice(0, 100)
        }
      },
      deep: true,
      immediate: true,
    },
  },

  mounted () {
    this.removeChecked()
  },

  methods: {
    checkAll () {
      if (this.checkList1.length === this.data.length) {
        this.checkList1 = []
      } else if (this.source === 1) {
        this.checkList1 = this.data.map(el => `${el.id}-${el.name}`)
      } else {
        this.checkList1 = this.data.map(el => `${el.c_id}-${el.name}`)
      }
    },
    clearChecked () {
      this.checkList1 = []
      this.checkList2 = []
      if (this.source === 1) {
        const res = this.chooseData.filter(item => item.canEdit === 0)
        this.$emit('input', res)
        !res.length && this.$emit('toValidate') // 通知父级去校验
      } else {
        this.$emit('input', [])
      }
    },
    addChecked () {
      // 获取id
      const result = this.checkList1.map(el => {
        return el.split('-')[0]
      })
      // 广告列表
      if (this.source === 1) {
        const data = result.map(el => {
          return {
            id: el,
            name: this.renderTransfer[el],
          }
        })
        this.emitValue(data)
      } else {
        const data = result.map(cid => {
          return {
            c_id: cid,
            name: this.renderTransfer[cid].name,
            status: this.renderTransfer[cid].status,
            formName: this.renderTransfer[cid].formName,
            size: this.renderTransfer[cid].size,
            id: this.renderTransfer[cid].id,
          }
        })
        this.emitValue(data)
      }
    },
    resetSearchId () {
      this.searchId = ''
      this.searchId2 = ''
    },
    removeChecked (ev) {
      const data = this.value.reduce((total, e) => {
        // 区分source
        let check
        this.source === 1 ? check = `${e.id}-${e.name}` : check = check = `${e.c_id}-${e.name}`
        // const check = `${e.id}-${e.name}`
        if (!this.checkList2.includes(check)) {
          total.push(e)
        }
        return total
      }, [])

      this.checkList2 = []
      this.checkList1 = data.map(el => {
        return `${el.id}-${el.name}`
      })

      ev && this.$emit('input', data)
      this.$emit('toValidate') // 通知父级去校验
    },
    handleSearch () {
      this.checkList1 = []
      this.$emit('handleSearch', {
        keywords: this.searchId
      })
    },
    handleSearch2 () {
      if (this.searchId2) {
        let value
        if (this.source === 1) {
          value = this.value.filter(item => (item.id + '').indexOf(this.searchId2) > -1 || item.name.indexOf(this.searchId2) > -1)
        } else {
          value = this.value.filter(item => (item.c_id + '').indexOf(this.searchId2) > -1 || item.name.indexOf(this.searchId2) > -1)
        }
        this.chooseData = value.slice(0, 100)
      } else {
        this.chooseData = this.value.slice(0, 100)
      }
    },
    emitValue (value) {
      // const temp = this.value.concat(value)
      const temp = this.differenceSet(value, this.value).concat(this.value)
      const data = this.uniqueData(temp)
      this.$emit('input', data)
      this.$emit('toValidate') // 通知父级去校验
    },
    differenceSet (arr1, arr2) {
      const newArr2 = arr2.map(item => item.id)
      const set2 = new Set(newArr2)
      const subset = []
      arr1.forEach((val, index) => {
        if (!set2.has(+val.id)) {
          subset.push(val)
        }
      })
      return subset
    },
    uniqueData: (data) => {
      const result = []
      const hash = {}

      data.forEach(el => {
        if (!hash[el.id]) {
          hash[el.id] = true
          result.push(el)
        }
      })

      return result
    }
  },
}
</script>>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
.align-center {
  text-align: center;
  margin-top: 20px;
}
.pro-transfer-wrapper {
  height: 356px;
  .pro-transfer--item {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .pro-transfer--center {
    padding: 0 20px;
    justify-content: center;
    .el-button {
      margin-left: 0;
    }
  }
  .pro-transfer--wrap {
    flex: 1;
    overflow: auto;
    padding-left: 20px;
    .checkbox-container {
      height: 60px;
    }
    .checkbox-tips {
      padding-left: 25px;
      height: 20px;
      font-size: 13px;
      color: #999999;
    }
  }
  .pro-transfer--left {
    overflow: auto;
  }
  .pro-transfer--left,
  .pro-transfer--right {
    border: 1px solid #e1e3e5;
    border-radius: 4px;
    background: #fff;
  }
  .pro-transfer--title,
  .pro-transfer--footer {
    padding: 0 20px;
  }
  .pro-transfer--title {
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #e1e3e5;
    background: #f6f6f6;
  }
  .pro-transfer--footer {
    padding: 6px 20px;
    border-top: 1px solid #e1e3e5;
  }
  .pro-transfer--search {
    padding: 10px 20px;
    .el-select {
      input{
        border-radius: 4px 0 0 4px;
        &:focus{
          position: relative;
          z-index: 1;
        }
      }
    }
    >.el-input {
      margin-left: -1px;
      input{
        border-radius: 0;
      }
    }
    .el-button {
      margin-left: -1px;
      padding: 11px 15px;
      border-radius: 0 4px 4px 0;
      background: #f6f6f6;
      &:active {
        position: relative;
        z-index: 1;
      }
    }
  }
}
</style>
