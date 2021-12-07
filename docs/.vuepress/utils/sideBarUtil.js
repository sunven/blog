const fs = require('fs')
const path = require('path')

module.exports.autoSideBar = navbar => {
  const docsDir = path.resolve(__dirname, '../../')
  const sidebar = {}
  navbar
    .filter(c => c.children)
    .reduce(
      (acc, cur) =>
        acc.concat(
          cur.children.filter(c => path.extname(c.link) === '').map(c => c.link)
        ),
      []
    )
    .forEach(link => {
      sidebar[link] = [
        {
          children: fs
            .readdirSync(path.join(docsDir, link), { withFileTypes: true })
            .filter(c => c.isFile && c.name[0] !== '.')
            .map(c =>
              c.name
                .replace('.md', '.html')
                .replace(/readme.html/i, 'index.html')
            ),
        },
      ]
    })
  return sidebar
}
