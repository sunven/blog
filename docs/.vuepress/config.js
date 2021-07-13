const path = require('path')
const { autoNavBar, fixNavBar } = require('./navBarUtil')
const { autoSideBar } = require('./sideBarUtil')
let navbar = autoNavBar()
const sidebar = autoSideBar(navbar)
navbar = fixNavBar(navbar, sidebar)
module.exports = {
  base: '/blog/',
  lang: 'zh-CN',
  //debug: true,
  // title: '你好， VuePress ！',
  // description: '这是我的第一个 VuePress 站点',
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
  themeConfig: {
    navbar,
    sidebar,
  },
}
