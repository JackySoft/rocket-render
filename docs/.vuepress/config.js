module.exports = {
  title: 'RocketForm',
  description: '一款基于Vue2.6开发的表单和表格渲染组件',
  base: '/rocket-render-doc/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/favicon.ico`,
      },
    ],
  ],
  dest: 'dist/rocket-render-doc',
  themeConfig: {
    background: `/images/`,
    logo: 'logo.png',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/JackySoft/rocket-render',
      },
    ],
    sidebar: [
      {
        title: '指南',
        collapsable: false,
        children: [
          '/',
          './guide',
          './FormType',
          './Upload',
          './SearchForm',
          './RocketTable',
          './RocketForm',
          './RocketDesc',
          './Release',
        ],
      },
    ],
  },
  plugins: ['demo-container'],
  // plugins: [["/plugins/showCode", {}]],
};
