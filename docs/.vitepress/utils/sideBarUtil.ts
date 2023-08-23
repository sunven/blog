import fs from 'fs'
import path from 'path'
import { DefaultTheme } from 'vitepress'

export function autoSideBar(navbar: DefaultTheme.NavItemWithChildren[]) {
  const docsDir = path.resolve(__dirname, '../../')
  const sidebar: DefaultTheme.SidebarMulti = {}
  const reg = /(#\s*(.*))/
  navbar.forEach(nav => {
    const text = '/' + nav.text + '/'
    sidebar[text] = nav.items.map(item => {
      const link = (item as DefaultTheme.NavItemWithLink).link
      const items = fs
        .readdirSync(path.join(docsDir, link), { withFileTypes: true })
        .filter(c => c.isFile() && c.name[0] !== '.')
        .map(c => {
          const fileData = fs.readFileSync(path.join(docsDir, link, c.name)).toString()
          const res = fileData.match(reg)
          let text = ''
          if (res) {
            text = res[2]
          } else {
            text = path.parse(c.name).name
          }
          return {
            text,
            link: encodeURI(link + c.name), // encodeURI: 目录空格, md显示不是链接
          }
        })
      return {
        text: item.text,
        collapsible: true,
        items,
      }
    })
  })
  return sidebar
}
