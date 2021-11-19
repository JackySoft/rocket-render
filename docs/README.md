# 介绍

Rocket 是一款面向 PC 端中后台的动态渲染组件解决方案。

对于 PC 后台，有大量简单重复页面，为了更高效开发，我们基于 JSON 配置的方式动态生成 UI，包含查询表单、表格、动态表单等；

Rocket 包含三个组件：SearchForm、RocketForm、RocketTable、RocketDesc

SearchForm：通过 json 快速构建查询表单，内置查询和重置按钮。
RocketForm：增强版 form 表单，主要用于非查询表单，比如弹框内嵌表单、复杂页面表单、支持表单嵌套表格等。
RocketTable：基于 json 快速构建表格功能。
RocketDesc：基于 json 快速构建详情信息。
