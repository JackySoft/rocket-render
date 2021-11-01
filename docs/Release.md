# 版本说明

## v2.1.5
1. RocketTable中permission字段增加字段映射，可根据字段值来控制按钮显示隐藏。
## v2.0.3

1. 重构search-form，通过属性、事件透传，支持所有原生属性和事件
2. 优化结构，减少代码量
3. 表格列支持html渲染类型
4. 表头支持tips提示语

## v1.1.2

1. 当接口返回0时，表格会渲染为 '--'，需要做兼容判断

## v1.1.1

1. table添加empty字段，当返回值为空时，默认显示 '--'，可通过empty指定显示内容
2. 优化表格formatter方法
3. type='number'时，默认使用H5数字框，鼠标悬浮出现上下箭头，设置arrow:false，可关闭箭头
4. table中的列字段，当type='click'时，如果当前列返回内容为空，列取消点击功能

## v1.1.0

1. 修复上传无法回显图片问题
2. 添加图片尺寸校验fileLimit:{width:200,height:300,tips:'图片尺寸不符合要求'}
3. 优化表格上方操作区按钮样式
4. 下拉选项支持清空clearable
5. 文本框增加type="number"只能输入数字类型
6. 修复表格fixed问题
7. 表格操作列需要根据状态判断按钮权限，大家可通过自定义列实现

## v1.0.6

1. 增加自定义列，允许做特殊扩展

## v1.0.4

1. 修复type=input时，showWordLimit不生效问题

## v1.0.3

1. 优化type=link功能
2. 修复表格tooltip显示Bug
3. 表格增加返回空的默认处理，通过empty属性设置

## v1.0.0

1. 版本升级：yarn upgrade @ued2345/octopus-form@1.0.0 或 yarn add @ued2345/octopus-form

2. 添加简化版ts定义

3. 修复table事件Bug

4. 开发文档集成Demo示例，可直接通过开发文档Demo示例查看功能和演示

5. 优化组件代码，修复vuepress打包问题

## v0.9.0

1. upload增加httpRequest覆盖自定义上传

2. table数据增加span-method做跨行功能

3. table多选功能事件改为selection-change，跟ELementUI保持一致

4. 优化table，通过$attrs和$listeners尽可能保留原有ElementUI属性和事件

5. 表格自定义排序handleSort修改为原生sort-change事件

6. 关于table事件：

   @handleChange/@handleAction/@handleCellClick为自定义事件，具体用法根据开发文档来，其它均为el-talbe原生事件，比如：多选@selection-change/@sort-change/跨行:span-method

7. 表格支持多级表套，但未实现深度嵌套（暂未做递归处理）

## v0.8.1

1. 表格列增加超长隐藏并显示tooltips，默认为true，也可以通过false进行关闭
2. 表格中增加图片点击预览; type=image,image={type:'list',width:60,height:40}
3. 修复按钮文字超长问题
4. radio支持禁用
5. 支持文本下拉（合并平安MR）
6. 支持cascader多选、过滤、清除选中内容、整体禁用、单项禁用

## v0.6.0 
1. 优化组件加载结构，通过component自动映射
2. 表格密度默认调整为small
3. 给所有组件增加自定义change事件，可在JSON中绑定用于接口回调
4. 支持单个下拉联动，调用接口回显另外一个下拉
5. 支持多个下拉联动
6. 优化重置功能，增加action:{ type:'reset',model:'all'}，在按钮点击时可重置当前表单
7. 优化时段组件，当时段切换时，自动清空后者
8. 修改级联下拉union-select组件，改为change接收，手动调用接口实现


## v0.5.0 

1. 表格column中的type，增加click和index类型，分别表示该列可点击，可索引
2. 表格增加序号列，设定type:index，会自动生成序号列
3. 增加文字对齐方式，align: 'left/center/right'
4. 表格action列，handleAction事件增加第三个参数type，具体可参考文档
5. QueryForm组件，增加inline属性，可控制非栅格布局
6. PowerForm组件
   - type从text改为input，保持全局统一
   - 增加prepend属性
   - 增加prefixIcon和sufixIcon属性
7. 调整TimeSelect组件布局
8. Radio-Group组件，触发change事件，新增重置功能
   ```js
   action: {
     type: 'reset',
     model: ['status','register_date']//切换按钮组时，会清空对应的列表字段
   }
   ```

9. 下拉级联，调整数据源

   ```js
   type: 'union-select',
   label: '城市',
   action: {
     type: 'cascader'
   },
   items:[
   	{
       placeholder: '请选择省份',
       model: 'user_province',
       options:[
       	{
           label: '湖北省',
           value: 10001,
           children: [
             { label: '武汉市', value: 100010 },
             { label: '襄阳市', value: 100011 },
           ]
         },
         {
           label: '上海市',
           value: 20001,
           children: [
             { label: '浦东区', value: 200010 },
             { label: '松江区', value: 200011 },
           ]
         },
         {
           label: '北京市',
           value: 30001,
           children: [
             { label: '海淀区', value: 300010 },
             { label: '朝阳区', value: 300011 },
           ]
         },
       ], 
     },
     {
       placeholder: '请选择城市',
       model: 'user_city',
       options: []
     },
   ]
   ```

10. FileUpload组件增加response结构映射（每个业务后台上传接口结构不同，后期需要统一）

    ```code
    response: { 
    	response: 'response', 
    	code: 'code', 
    	data: 'data', 
    	msg: 'msg', 
    	codeVal: 1, 
    	dataVal: 'url' 
    }
    ```

11. 优化文件上传组件，返回值均为数组结构
12. 表格增加批量勾选功能，可实现批量更新/删除