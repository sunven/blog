const path = require('path')
const fs = require('fs')
// 需要排除的文件夹
const excludesDir = ['images', 'public']
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
          const items = fs
            .readdirSync(path.join(docsDir, item.name), { withFileTypes: true })
            .filter(filterFun)
            .sort((a, b) => b.isDirectory() - a.isDirectory())
            .map(c => {
              // 二级目录
              return {
                text: path.parse(c.name).name,
                link: `/${item.name}/${c.name + (c.isDirectory() ? '/' : '')}`,
              }
            })
          return {
            text: item.name,
            items: items,
          }
        } else {
          //文件
          return {
            text: path.parse(item.name).name,
            link: `/${item.name}`,
          }
        }
      })
      //去掉navbar上的readme
      .filter(c => c.items)
  )
}
const fixNavBar = (navbar, sidebar) => {
  navbar
    .filter(c => c.items)
    .forEach(c => {
      c.items
        .filter(x => path.extname(x.link) === '')
        .forEach(x => {
          const bar = sidebar[x.link]
          if (bar && bar.length > 0) {
            const links = bar[0].items
            if (links && links.length > 0) {
              x.link = links[0].link
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
