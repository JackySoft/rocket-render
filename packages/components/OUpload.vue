<template>
  <!--
  图片/文件上传
  默认支持图片，如果传文件，需要设置listType为text
  headers: 可自定义请求头，目前上传用法不一，所以此处默认给一个headers，主要为了兼容
  listType: text/picture/picture-card
  action:上传地址
  token:上传token
  fileList:无需提供，文件上传时使用
  limit:限制上传个数
  data: POST提交的额外参数
  style: 特殊样式定制
-->

  <el-upload
    v-if="item.httpRequest"
    v-bind="$attrs"
    :drag="item.listType == 'upload'"
    :before-upload="(file) => onBeforeUpload(file, item)"
    :on-remove="handleFileRemove"
    :on-preview="onPreview"
    :on-exceed="onExceed"
    :http-request="(info) => item.httpRequest(info, fileList)"
  >
    <template>
      <!-- 设置隐藏域，专门保存图片地址 -->
      <input type="hidden" :value="value" />
      <!-- 默认卡片格式-->
      <template v-if="item.listType === 'picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="item.listType == 'upload'">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <template v-else-if="item.listType === 'avatar'">
        <div class="el-upload-wrap">
          <img v-if="url" :src="url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </template>
      <template v-else>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
    </template>
  </el-upload>
  <el-upload
    v-else
    v-bind="$attrs"
    :drag="item.listType == 'upload'"
    :file-list="fileList"
    :before-upload="(file) => onBeforeUpload(file, item)"
    :on-remove="handleFileRemove"
    :on-success="
      (response, file, fileList) => onUploadSuccess(response, file, fileList)
    "
    :on-preview="onPreview"
    :on-exceed="onExceed"
  >
    <template>
      <!-- 设置隐藏域，专门保存图片地址 -->
      <input type="hidden" :value="value" />
      <!-- 默认卡片格式-->
      <template v-if="item.listType === 'picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="item.listType == 'upload'">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <template v-else-if="item.listType === 'avatar'">
        <div class="el-upload-wrap">
          <img v-if="url" :src="url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </template>
      <template v-else>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
    </template>
  </el-upload>
</template>
<script>
export default {
  name: 'OUpload',
  props: ['item', 'value'],
  data() {
    return {};
  },
  computed: {
    fileList() {
      console.log('value:', this.value);
      return this.value || [];
    },
    url() {
      let file = this.fileList[0] || {};
      if (file.url)
        return this.item.domain ? this.item.domain + file.url : file.url;
      return '';
    },
  },
  methods: {
    // 数据回传
    handleInput(val) {
      this.$emit('input', val);
    },
    // 图片上传拦截：格式、大小限制
    onBeforeUpload(file, item) {
      if (item.fileType && !item.fileType.includes(file.type)) {
        this.$message.error('文件格式不符合要求');
        return false;
      }
      // 图片大小以K进行计算
      if (item.fileSize && item.fileSize < file.size / 1024) {
        this.$message.error('文件大小不符合要求');
        return false;
      }
      const imgPromise = (type, item) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = () => {
              const w = image.width;
              const h = image.height;
              if (type === 1) {
                if (!(w === item.width && h === item.height)) {
                  this.$message.error(
                    item.tips ||
                      `上传文件尺寸不为 ${item.width}px*${item.height}px!`,
                  );
                  reject(Boolean(false));
                } else {
                  resolve(true);
                }
              } else if (type === 2) {
                if (w / h !== item.ratio) {
                  this.$message.error(item.tips || '上传文件宽高比不符合要求!');
                  reject(Boolean(false));
                } else {
                  resolve(true);
                }
              }
            };
          };
        });

      // 尺寸限制
      if (item.fileLimit) {
        const { ratio } = item.fileLimit;
        if (ratio) {
          return imgPromise(2, item.fileLimit);
        }
        return imgPromise(1, item.fileLimit);
      }
    },
    // 文件列表处理
    // handleFileChange (file, fileList) {
    //   debugger
    //   this.fileList = fileList
    // },
    // 文件删除
    handleFileRemove(file, fileList) {
      this.$emit('input', fileList);
    },
    // 文件预览
    onPreview(file) {
      if (this.item.onPreview) this.item.onPreview(file);
    },
    // 图片上传结果处理
    onUploadSuccess(res, file, fileList) {
      // 设置接口返回数据结构
      const {
        response = '',
        code = 'code',
        data = 'data',
        msg = 'msg',
        codeVal = 0,
        name = 'fileName',
        url = 'url',
      } = this.item.response || {};
      const result = response ? res[response] : res;
      // 保存上传内容到隐藏域
      const list = fileList.slice();
      if (result[code] === codeVal) {
        const imgList = Array.isArray(result[data])
          ? result[data]
          : [result[data]];
        imgList.map((item) => {
          list.push({
            name: item[name],
            url: item[url],
          });
        });
        this.$emit('input', list);
      } else {
        // 报错后，需要移出
        this.fileList.pop();
        this.$message.error(result[msg]);
      }
    },
    // 文件超出个数限制
    onExceed(files, fileList) {
      if (this.item.onExceed) this.item.onExceed(files, fileList);
      else this.$message.error('文件上传数量超出限制');
    },
  },
};
</script>
<style lang="scss">
.el-upload-wrap {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  img {
    width: 100%;
    height: 100%;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 178px;
    text-align: center;
  }
}
</style>
