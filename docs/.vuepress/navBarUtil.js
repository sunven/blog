const path = require('path')
const fs = require('fs')
const autoNavBar = () => {
  const docsDir = path.resolve(__dirname, '../')
  return fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter(c => c.name[0] !== '.')
    .sort((a, b) => b.isDirectory() - a.isDirectory())
    .map(item => {
      if (item.isDirectory()) {
        //目录
        const children = fs
          .readdirSync(path.join(docsDir, item.name), { withFileTypes: true })
          .filter(c => c.name[0] !== '.')
          .sort((a, b) => b.isDirectory() - a.isDirectory())
          .map(c => ({
            text: path.basename(c.name, path.extname(c.name)),
            link: `/${item.name}/${c.name.replace('.md', '.html') +
              (c.isDirectory() ? '/' : '')}`,
          }))
        return {
          text: item.name,
          children: children,
        }
      } else {
        //文件
        return {
          text: path.basename(item.name, path.extname(item.name)),
          link: `/${item.name.replace('.md', '.html')}`,
        }
      }
    })
}
const fixNavBar = (navbar, sidebar) => {
  navbar
    .filter(c => c.children)
    .forEach(c => {
      c.children
        .filter(x => path.extname(x.link) === '')
        .forEach(x => {
          const bar = sidebar[x.link]
          if (bar && bar.length > 0) {
            const links = bar[0].children
            if (links && links.length > 0) {
              x.link += links[0]
            }
          }
        })
    })
  return navbar
}
module.exports = {
  autoNavBar,
  fixNavBar,
}
