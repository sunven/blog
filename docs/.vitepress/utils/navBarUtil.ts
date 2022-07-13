import fs from 'fs'
import path from 'path'
import { DefaultTheme } from 'vitepress'

// 需要排除的文件夹
const excludesDir = ['images', 'public']
const filterFun = (c: fs.Dirent) => c.name[0] !== '.' && !excludesDir.includes(c.name) && c.isDirectory()
function sortDirectory(a: fs.Dirent, b: fs.Dirent) {
  return +b.isDirectory() - +a.isDirectory()
}
export function autoNavBar(): DefaultTheme.NavItemWithChildren[] {
  const docsDir = path.resolve(__dirname, '../../')
  return fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter(filterFun)
    .sort(sortDirectory)
    .map(item => {
      //一级目录
      const items = fs
        .readdirSync(path.join(docsDir, item.name), { withFileTypes: true })
        .filter(filterFun)
        .sort(sortDirectory)
        .map(c => {
          // 二级目录
          return {
            text: path.parse(c.name).name,
            link: `/${item.name}/${c.name + (c.isDirectory() ? '/' : '')}`,
          } as DefaultTheme.NavItemWithLink
        })
      return {
        text: item.name,
        items: items,
      } as DefaultTheme.NavItemWithChildren
    })
}
export function fixNavBar(navbar: DefaultTheme.NavItemWithChildren[], sidebar: DefaultTheme.SidebarMulti) {
  navbar.forEach(c => {
    c.items
      .filter(x => 'link' in x)
      .forEach(x => {
        const bar = sidebar[(x as DefaultTheme.NavItemWithLink).link]
        if (bar && bar.length > 0) {
          const links = bar[0].items
          if (links && links.length > 0) {
            ;(x as DefaultTheme.NavItemWithLink).link = links[0].link
          }
        }
      })
  })
  return navbar
}
