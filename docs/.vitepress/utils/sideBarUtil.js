const fs = require('fs')
const path = require('path')

module.exports.autoSideBar = navbar => {
  const docsDir = path.resolve(__dirname, '../../')
  const sidebar = {}
  const reg = /(#\s*(.*))/
  navbar
    .filter(c => c.items)
    .reduce((acc, cur) => acc.concat(cur.items.filter(c => path.extname(c.link) === '').map(c => c.link)), [])
    .forEach(link => {
      sidebar[link] = [
        {
          text: link.slice(1, -1),
          items: fs
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
                link: link + c.name,
              }
            }),
        },
      ]
    })
  return sidebar
}
