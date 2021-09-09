const { autoNavBar, fixNavBar } = require('./navBarUtil')
const { autoSideBar } = require('./sideBarUtil')
let navbar = autoNavBar()
console.log('navbar', JSON.stringify(navbar, null, 2))
//
const sidebar = autoSideBar(navbar)
console.log('sidebar', JSON.stringify(sidebar, null, 2))
navbar = fixNavBar(navbar, sidebar)
console.log('navbar1', JSON.stringify(navbar, null, 2))
