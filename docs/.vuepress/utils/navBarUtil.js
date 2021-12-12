const path = require('path')
const fs = require('fs')
// 需要排除的文件夹
const excludesDir = ['images']
const filterFun = c => c.name[0] !== '.' && !excludesDir.includes(c.name)
const autoNavBar = () => {
  const docsDir = path.resolve(__dirname, '../../')
  return (
    fs
      .readdirSync(docsDir, { withFileTypes: true })
      .filter(filterFun)
      .sort((a, b) => b.isDirectory() - a.isDirectory())
      .map(item => {
        if (item.isDirectory()) {
          //一级目录
          const children = fs
            .readdirSync(path.join(docsDir, item.name), { withFileTypes: true })
            .filter(filterFun)
            .sort((a, b) => b.isDirectory() - a.isDirectory())
            .map(c => {
              // 二级目录
              return {
                text: path.basename(c.name, path.extname(c.name)),
                link: `/${item.name}/${c.name
                  .replace('.md', '.html')
                  .replace(/readme.html/i, 'index.html') +
                  (c.isDirectory() ? '/' : '')}`,
              }
            })
          return {
            text: item.name,
            children: children,
          }
        } else {
          //文件
          return {
            text: path.basename(item.name, path.extname(item.name)),
            link: `/${item.name
              .replace('.md', '.html')
              .replace(/readme.html/i, 'index.html')}`,
          }
        }
      })
      //去掉navbar上的readme
      .filter(c => c.children)
  )
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
