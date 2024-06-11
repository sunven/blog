// import fs from 'fs'
import { defineConfig } from 'vitepress'
import { autoNavBar, fixNavBar } from './utils/navBarUtil'
import { autoSideBar } from './utils/sideBarUtil'
import { genIndex } from './utils/genIndexUtil'
// 生成nav
let nav = autoNavBar()
// 生成sidebar
const sidebar = autoSideBar(nav)
// 修复nav上的链接,
nav = fixNavBar(nav, sidebar)
// 生成首页
genIndex(sidebar)

export default defineConfig({
  metaChunk: true,
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
  themeConfig: {
    logo: '/images/logo.png',
    nav,
    sidebar,
    outline: [2, 6],
    socialLinks: [{ icon: 'github', link: 'https://github.com/sunven/blog' }],
    editLink: {
      pattern: 'https://github.com/sunven/blog/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: {
      provider: 'local',
    },
    // algolia: {
    //   appId: 'MFM87Q4KVR',
    //   apiKey: 'f32cb77f611a2ed31fa6ba7fe0716f5b',
    //   indexName: 'blog',
    // },
  },
  markdown: {
    math: true,
  },
})
