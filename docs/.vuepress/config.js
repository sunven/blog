const path = require('path')
const { autoNavBar, fixNavBar } = require('./navBarUtil')
const { autoSideBar } = require('./sideBarUtil')
let navbar = autoNavBar()
//
const sidebar = autoSideBar(navbar)
navbar = fixNavBar(navbar, sidebar)

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
  base: '/blog/',
  lang: 'zh-CN',
  //debug: true,
  title: 'sunven',
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
    // [
    //   'vuepress-plugin-mathjax',
    //   {
    //     target: 'svg',
    //     macros: {
    //       '*': '\\times',
    //     },
    //   },
    // ],
  ],
  themeConfig: {
    navbar,
    sidebar,
    repo: 'sunven/blog',
  },
  //clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),
  extendsMarkdown: md => {
    md.use(require('./plugins/markdown-it-katex'))
    //md.linkify.set({ fuzzyEmail: false })
  },
  bundlerConfig: {
    vue: {
      compilerOptions: {
        isCustomElement: tag => {
          return mathml.indexOf(tag) !== -1
        },
      },
    },
  },
}
