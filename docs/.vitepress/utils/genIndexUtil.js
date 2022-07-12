const path = require('path')
const fs = require('fs')
const genIndex = sidebar => {
  let content = '# 聊聊前端\r'
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
module.exports = {
  genIndex,
}
