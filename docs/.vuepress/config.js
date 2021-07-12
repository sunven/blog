const nav = require('./nav')
module.exports = {
  base: '/blog/',
  lang: 'zh-CN',
  //   title: '你好， VuePress ！',
  //   description: '这是我的第一个 VuePress 站点',

  //   themeConfig: {
  //     logo: 'https://vuejs.org/images/logo.png',
  //   },
  plugins: [
    [
      'vuepress-plugin-auto-sidebar',
      {
        output: {
          filename: 'config/sidebarConf',
        },
        title: {
          mode: 'uppercase',
        },
      },
    ],
  ],
  themeConfig: {
    navbar: nav,
  },
}
