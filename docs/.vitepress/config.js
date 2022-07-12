const path = require('path')
const { autoNavBar, fixNavBar } = require('./utils/navBarUtil')
const { autoSideBar } = require('./utils/sideBarUtil')
const { genIndex } = require('./utils/genIndexUtil')
// 生成nav
let nav = autoNavBar()
// 生成sidebar
const sidebar = autoSideBar(nav)
// 修复nav上的链接,
nav = fixNavBar(nav, sidebar)
// 生成首页
genIndex(sidebar)

//https://developer.mozilla.org/zh-CN/docs/Web/MathML/Element
//var as=new Set();document.querySelectorAll('.main-page-content a[href*="MathML/Element"]').forEach(item=>{var a=item.innerText;a=a.replace('<','');a=a.replace('>','');a=a.replace('(en-US)','');a=a.trim(' ');as.add(a)});console.log(Array.from(as))
const mathml = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mglyph',
  'mi',
  'mlabeledtr',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'msgroup',
  'mstack',
  'msline',
  'mspace',
  'msqrt',
  'msrow',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'annotation',
  'annotation-xml',
  'mprescripts',
  'none',
]
module.exports = {
  //base: '/blog/',
  lang: 'zh-CN',
  //debug: true,
  title: 'LLWEB',
  description: '笔记、博客、awesome',
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
        href: 'https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css',
      },
    ],
    ['link', { rel: 'icon', href: '/images/logo.png' }],
  ],
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    [
      '@vuepress/plugin-docsearch',
      {
        appId: 'MFM87Q4KVR',
        apiKey: 'a778f10a7918c72287c9bf7a9db85e07',
        indexName: 'blog',
        locales: {
          '/': {
            placeholder: '搜索文档',
          },
        },
      },
    ],
  ],
  theme: path.resolve(__dirname, './theme'),
  themeConfig: {
    logo: '/images/logo.png',
    nav,
    sidebar,
    repo: 'sunven/blog',
    docsBranch: 'master',
    docsDir: 'docs',
    socialLinks: [{ icon: 'github', link: 'https://github.com/sunven/blog' }],
    editLink: {
      pattern: 'https://github.com/sunven/blog/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    algolia: {
      appId: 'MFM87Q4KVR',
      apiKey: 'f32cb77f611a2ed31fa6ba7fe0716f5b',
      indexName: 'blog',
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => mathml.includes(tag),
      },
    },
  },
  markdown: {
    config: md => {
      md.use(require('./plugins/markdown-it-katex'))
      // md.use(require('markdown-it-katex')) // 不支持行内 katex 中有 < 符号
    },
  },
}
