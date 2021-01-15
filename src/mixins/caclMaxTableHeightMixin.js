/**
 * 计算表格的最大高度，计算结果保存在vuex
 */
import debounce from '../utils/debounce.js'
import { mapState } from 'vuex'

export default {
  created () {
    this.caclMaxTableHeight()
  },
  computed: mapState(['maxTableHeight']),
  methods: {
    // 实时计算表格的最大高度（防抖）
    caclMaxTableHeight () {
      const fn = () => {
        const documentHeight = document.documentElement.clientHeight
        let height = documentHeight - 182 // 顶部50，分页32 分页上margin 20,页面边距40*2
        if (height < 50) {
          height = 50
        }
        this.$store.commit('maxTableHeight', height)
      }
      window.addEventListener('resize', debounce(fn, 300, true))
    }
  }
}
