<template>
  <div>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="[url]"
      :zIndex="9999"
    />
  </div>
</template>
<script>
// 导入组件
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';

export default {
  components: { ElImageViewer },
  props: ['url'],
  data() {
    return {
      showViewer: false, // 显示查看器
    };
  },
  methods: {
    onPreview() {
      this.showViewer = true;
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false;
    },
  },
};
</script>
