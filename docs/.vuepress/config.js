module.exports = {
  title: "RocketForm",
  description: "一款基于Vue2.6开发的表单和表格渲染组件",
  base:"/rocket-render-doc",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: `/favicon.ico`
      }
    ]
  ],
  dest: "dist",
  themeConfig: {
    background: `/images/`,
    logo: "logo.png",
    lastUpdated: "Last Updated",
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "GitHub",
        link: "https://github.com/JackySoft/rocket-render"
      }
    ],
    sidebar: [
      {
        title: "指南",
        collapsable: false,
        children: ["/","./guide", "./FormType", "./SearchForm", "./RocketTable", "./RocketForm", "./Release"]
      },
      // {
      //   title: "Rocker-Render",
      //   collapsable: false,
      //   children: ["./guide", "./FormType", "./RocketForm", "./RocketTable", "./PowerForm", "./Release"]
      // }
    ]
  },
  plugins: ['demo-container']
  // plugins: [["/plugins/showCode", {}]],
};
