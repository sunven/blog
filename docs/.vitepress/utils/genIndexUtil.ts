import fs from 'fs'
import path from 'path'
import { DefaultTheme } from 'vitepress'
export function genIndex(sidebar: DefaultTheme.SidebarMulti) {
  let content = '# LLWEB\r'
  content += `\r`
  for (let item in sidebar) {
    content += `## ${item.slice(1, -1)}\n`
    let items = sidebar[item][0].items
    if (!items) {
      continue
    }
    content += `\n`
    for (let child of items) {
      content += `- [${child.text}](${child.link})\n`
    }
    content += `\n`
  }
  fs.writeFileSync(path.resolve('./docs/index.md'), content, 'utf-8')
}
