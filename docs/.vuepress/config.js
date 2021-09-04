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
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css',
      },
    ],
  ],
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
  ],
  themeConfig: {
    navbar,
    sidebar,
  },
  extendsMarkdown: md => {
    md.use(require('./plugins/markdown-it-katex'))
    //md.linkify.set({ fuzzyEmail: false })
  },
  // markdown: {
  //   extendMarkdown: md => {
  //     md.use(require('markdown-it-katex'))
  //   },
  // },
}
