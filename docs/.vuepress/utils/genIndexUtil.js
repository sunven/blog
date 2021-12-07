const path = require('path')
const fs = require('fs')
const genIndex = sidebar => {
  let content = '# 聊聊前端\r'
  content += `\r`
  for (let item in sidebar) {
    content += `## ${item}\n`
    let children = sidebar[item][0].children
    if (!children) {
      continue
    }
    content += `\n`
    for (let child of children) {
      content += `- [${child}](${item + child})\n`
    }
    content += `\n`
  }
  fs.writeFileSync(path.resolve('./docs/README.md'), content, 'utf-8')
}
module.exports = {
  genIndex,
}
