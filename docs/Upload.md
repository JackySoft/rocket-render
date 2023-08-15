# 上传 介绍

仅 RocketForm 支持上传功能

> 上传本身比较复杂，因此单独做说明。整体用法同 ElementUI。

## 支持的功能列表

1. 单个头像上传
2. 多个图片上传
3. 文件上传
4. 支持大小限制
5. 支持格式限制
6. 支持返回结构定义
7. 支持自定义 httpRequest

## 基本用法 - 普通文件上传【listType=text】

:::demo

```html
<rocket-form :json="json" v-model="userInfo" />

<script>
  export default {
    data() {
      return {
        json: {
          showFooter: true,
          formList: [
            {
              type: 'upload',
              label: '封面大图',
              // 表单值，实际上就是上传成功后的图片对象[{name:'xxx.png',url:'xxx.png'}]
              model: 'upload',
              //展示类型：text/picture/picture-card/upload/avatar
              listType: 'text',
              //上传接口
              action: 'https://jsonplaceholder.typicode.com/posts/',
              //如果接口需要token，就设置一下
              headers: {
                token: 'token',
              },
              // 上传接口额外的参数
              data: {
                formId: 1000,
              },
              // 文件的name值，默认为file
              name: 'file',
              // 是否显示文件列表
              showFileList: true,
              // 图片domain前缀，接口有可能返回的地址没有前缀，只是我们可以添加一个前缀，用于显示
              domain: 'https://carsales-dev-oss.oss-cn-shenzhen.aliyuncs.com/',
              //上传提示语
              tips: '支持png/jpg等，大小不超过10M',
              // 设置接口返回结构
              response: {
                response: '', // 接口返回的外层结构，一般为空，不需要
                code: 'code', //默认为code，如果后台也是叫code，可以不填
                data: 'data', //默认为data
                msg: 'msg', //默认为msg
                // 文件列表fileList结构，默认为name,url，如果接口返回的不是,可以做映射
                name: 'fileName',
                url: 'url',
              },
              rules: [
                { required: true, message: '请上传文件', trigger: 'blur' },
              ],
            },
          ],
        },
        userInfo: {
          upload: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
            {
              name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 基本用法 - 图片列表上传【listType=picture】

:::demo

```html
<rocket-form :json="json" v-model="userInfo" />

<script>
  export default {
    data() {
      return {
        json: {
          showFooter: true,
          formList: [
            {
              type: 'upload',
              label: '封面大图',
              // 表单值，实际上就是上传成功后的图片对象[{name:'xxx.png',url:'xxx.png'}]
              model: 'upload',
              //展示类型：text/picture/picture-card/upload/avatar
              listType: 'picture',
              //上传接口
              action: 'https://jsonplaceholder.typicode.com/posts/',
              //如果接口需要token，就设置一下
              headers: {
                token: 'token',
              },
              // 上传接口额外的参数
              data: {
                formId: 1000,
              },
              // 文件的name值，默认为file
              name: 'file',
              accept: 'image/png,image/jpg,image/jpeg,image/gif',
              fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'], //文件格式校验
              fileSize: 10 * 1024, //校验大小，单位为K
              limit: 5, // 上传个数限制
              multiple: true, //默认为true
              // 是否显示文件列表
              showFileList: true,
              // 图片domain前缀，接口有可能返回的地址没有前缀，只是我们可以添加一个前缀，用于显示
              domain: 'https://carsales-dev-oss.oss-cn-shenzhen.aliyuncs.com/',
              //上传提示语
              tips: '支持png/jpg等，大小不超过10M',
              // 设置接口返回结构
              response: {
                response: '', // 接口返回的外层结构，一般为空，不需要
                code: 'code', //默认为code，如果后台也是叫code，可以不填
                data: 'data', //默认为data
                msg: 'msg', //默认为msg
                // 文件列表fileList结构，默认为name,url，如果接口返回的不是,可以做映射
                name: 'fileName',
                url: 'url',
              },
              rules: [
                { required: true, message: '请上传文件', trigger: 'blur' },
              ],
            },
          ],
        },
        userInfo: {
          upload: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
            {
              name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 基本用法 - 图片列表上传【listType=picture-card】

:::demo

```html
<rocket-form :json="json" v-model="userInfo" />

<script>
  export default {
    data() {
      return {
        json: {
          showFooter: true,
          formList: [
            {
              type: 'upload',
              label: '封面大图',
              // 表单值，实际上就是上传成功后的图片对象[{name:'xxx.png',url:'xxx.png'}]
              model: 'upload',
              //展示类型：text/picture/picture-card/upload/avatar
              listType: 'picture-card',
              //上传接口
              action: 'https://jsonplaceholder.typicode.com/posts/',
              //如果接口需要token，就设置一下
              headers: {
                token: 'token',
              },
              // 上传接口额外的参数
              data: {
                formId: 1000,
              },
              // 文件的name值，默认为file
              name: 'file',
              accept: 'image/png,image/jpg,image/jpeg,image/gif',
              fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'], //文件格式校验
              fileSize: 10 * 1024, //校验大小，单位为K
              limit: 5, // 上传个数限制
              multiple: true, //默认为true
              // 是否显示文件列表
              showFileList: true,
              // 图片domain前缀，接口有可能返回的地址没有前缀，只是我们可以添加一个前缀，用于显示
              domain: 'https://carsales-dev-oss.oss-cn-shenzhen.aliyuncs.com/',
              //上传提示语
              tips: '支持png/jpg等，大小不超过10M',
              // 设置接口返回结构
              response: {
                response: '', // 接口返回的外层结构，一般为空，不需要
                code: 'code', //默认为code，如果后台也是叫code，可以不填
                data: 'data', //默认为data
                msg: 'msg', //默认为msg
                // 文件列表fileList结构，默认为name,url，如果接口返回的不是,可以做映射
                name: 'fileName',
                url: 'url',
              },
              rules: [
                { required: true, message: '请上传文件', trigger: 'blur' },
              ],
            },
          ],
        },
        userInfo: {
          upload: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
            {
              name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## 基本用法 - 头像上传【listType=avatar】

> 头像一般只能上传一张，所以默认会返回一个列表，但只包含一张图片。

:::demo

```html
<rocket-form :json="json" v-model="userInfo" />

<script>
  export default {
    data() {
      return {
        json: {
          showFooter: true,
          formList: [
            {
              type: 'upload',
              label: '封面大图',
              // 表单值，实际上就是上传成功后的图片对象[{name:'xxx.png',url:'xxx.png'}]
              model: 'upload',
              //展示类型：text/picture/picture-card/upload/avatar
              listType: 'avatar',
              //上传接口
              action: 'https://jsonplaceholder.typicode.com/posts/',
              //如果接口需要token，就设置一下
              headers: {
                token: 'token',
              },
              // 上传接口额外的参数
              data: {
                formId: 1000,
              },
              // 文件的name值，默认为file
              name: 'file',
              accept: 'image/png,image/jpg,image/jpeg,image/gif',
              fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'], //文件格式校验
              fileSize: 10 * 1024, //校验大小，单位为K
              // limit: 5, // 上传个数限制
              // multiple: true, //默认为true
              // 是否显示文件列表，当listType为avatar时，关闭文件列表
              showFileList: false,
              // 图片domain前缀，接口有可能返回的地址没有前缀，只是我们可以添加一个前缀，用于显示
              domain: '',
              //上传提示语
              tips: '支持png/jpg等，大小不超过10M',
              // 设置接口返回结构
              response: {
                response: '', // 接口返回的外层结构，一般为空，不需要
                code: 'code', //默认为code，如果后台也是叫code，可以不填
                data: 'data', //默认为data
                msg: 'msg', //默认为msg
                // 文件列表fileList结构，默认为name,url，如果接口返回的不是,可以做映射
                name: 'fileName',
                url: 'url',
              },
              rules: [
                { required: true, message: '请上传文件', trigger: 'blur' },
              ],
              // 用来接收上传成功后的回调，一般不需要，用于特殊情况。
              successCallback: () => {},
            },
          ],
        },
        userInfo: {
          upload: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
          ],
        },
      };
    },
  };
</script>
```

:::

> 注意：头像只有一张，如果上传成功以后，列表只会返回当前上传的头像列表，数组只有一个元素。提交接口的时候，可能需要从数组里面获取第一个元素，拿到 url 提交到后台去。

## 基本用法 - 文件拖拽上传【listType=upload】

:::demo

```html
<rocket-form :json="json" v-model="userInfo" />

<script>
  export default {
    data() {
      return {
        json: {
          showFooter: true,
          formList: [
            {
              type: 'upload',
              label: '封面大图',
              // 表单值，实际上就是上传成功后的图片对象[{name:'xxx.png',url:'xxx.png'}]
              model: 'upload',
              //展示类型：text/picture/picture-card/upload/avatar
              listType: 'upload',
              //上传接口
              action: 'https://jsonplaceholder.typicode.com/posts/',
              //如果接口需要token，就设置一下
              headers: {
                token: 'token',
              },
              // 上传接口额外的参数
              data: {
                formId: 1000,
              },
              // 文件的name值，默认为file
              name: 'file',
              accept: 'image/png,image/jpg,image/jpeg,image/gif',
              fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'], //文件格式校验
              fileSize: 10 * 1024, //校验大小，单位为K
              limit: 5, // 上传个数限制
              multiple: true, //默认为true
              // 是否显示文件列表
              showFileList: true,
              // 图片domain前缀，接口有可能返回的地址没有前缀，只是我们可以添加一个前缀，用于显示
              domain: '',
              //上传提示语
              tips: '支持png/jpg等，大小不超过10M',
              // 设置接口返回结构
              response: {
                response: '', // 接口返回的外层结构，一般为空，不需要
                code: 'code', //默认为code，如果后台也是叫code，可以不填
                data: 'data', //默认为data
                msg: 'msg', //默认为msg
                // 文件列表fileList结构，默认为name,url，如果接口返回的不是,可以做映射
                name: 'fileName',
                url: 'url',
              },
              rules: [
                { required: true, message: '请上传文件', trigger: 'blur' },
              ],
            },
          ],
        },
        userInfo: {
          upload: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
            {
              name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
          ],
        },
      };
    },
  };
</script>
```

:::

## Upload 组件属性

| 参数            | 说明                   | 类型     | 可选值                                  | 默认值 |
| :-------------- | :--------------------- | :------- | :-------------------------------------- | :----: |
| listType        | 列表对象               | String   | text/picture/picture-card/avatar/upload |  text  |
| action          | 接口提交地址           | String   | 无                                      |   无   |
| headers         | 添加请求头             | Object   | 无                                      |   无   |
| data            | 额外的请求参数         | Object   | 无                                      |   无   |
| name            | 上传文件 name 值       | String   | 无                                      |  file  |
| accept          | 上传文件格式，同 HTML5 | String   | 无                                      |   无   |
| fileType        | 上传文件格式           | Array    | 无                                      |   无   |
| fileSize        | 上传文件大小，单位 K   | String   | 无                                      |   无   |
| limit           | 上传文件数量           | Number   | 无                                      |   无   |
| multiple        | 是否可上传多个         | Boolean  | 无                                      |   无   |
| showFileList    | 是否显示文件列表       | Boolean  | 无                                      |   无   |
| domain          | 图片前缀               | String   | 无                                      |   无   |
| tips            | 上次提示语             | String   | 无                                      |   无   |
| response        | 接口返回结构           | Boolean  | 无                                      |   无   |
| successCallback | 上传成功后的回调       | Function | 无                                      |   无   |

## response 结构映射

> 上传接口比较独立，因此单独处理.

> name 和 url 大家注意，实际上因为上传的时候，会生成一个 fileList，它是一个数组，它的格式必须为 name 和 url，所以我们需要对他进行映射。

| 参数     | 说明              | 类型   | 可选值 | 默认值 |
| :------- | :---------------- | :----- | :----- | :----: |
| response | 接口外层结构      | String | 无     |   ''   |
| code     | 接口成功字段映射  | String | 无     |  code  |
| data     | 接口数据字段映射  | String | 无     |  data  |
| msg      | 接口异常字段映射  | String | 无     |  msg   |
| name     | 文件名称字段映射  | String | 无     |  name  |
| url      | 文件 URL 字段映射 | String | 无     |  url   |
