# vite

## 简易实现

vite.sj

```js
// koa
const Koa = require('koa')
// 创建实例
const app = new Koa()
const fs = require('fs')
const path = require('path')
//编译单文件组件
const compilerSFC = require('@vue/compiler-sfc')
const compilerDOM = require('@vue/compiler-dom')

// 处理路由
app.use(async ctx => {
  const { url, query } = ctx.request
  // 首页请求
  if (url === '/') {
    // 加载index.html
    ctx.type = 'text/html'
    ctx.body = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8')
  } else if (url.endsWith('.js')) {
    // js文件加载处理
    const p = path.join(__dirname, url)
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(fs.readFileSync(p, 'utf8'))
  } else if (url.startsWith('/@modules/')) {
    // 裸模块名称
    const moduleName = url.replace('/@modules/', '')
    // 去node_modules目录中找
    const prefix = path.join(__dirname, './node_modules', moduleName)
    // package.json中获取module字段
    const module = require(prefix + '/package.json').module
    const filePath = path.join(prefix, module)
    const ret = fs.readFileSync(filePath, 'utf8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
  } else if (url.indexOf('.vue') > -1) {
    // 获取加载文件路径
    const p = path.join(__dirname, url.split('?')[0])
    const ret = compilerSFC.parse(fs.readFileSync(p, 'utf8'))
    if (!query.type) {
      // SFC请求
      // 读取vue文件，解析为js
      // 获取脚本部分的内容
      const scriptContent = ret.descriptor.script.content
      // 替换默认导出为一个常量，方便后续修改
      const script = scriptContent.replace(
        'export default ',
        'const __script = '
      )
      ctx.type = 'application/javascript'
      ctx.body = `
        ${rewriteImport(script)}
        // 解析tpl
        import {render as __render} from '${url}?type=template'
        __script.render = __render
        export default __script
      `
    } else if (query.type === 'template') {
      // ?type=template请求
      const tpl = ret.descriptor.template.content
      // 编译为render
      const render = compilerDOM.compile(tpl, { mode: 'module' }).code
      ctx.type = 'application/javascript'
      ctx.body = rewriteImport(render)
    }
  }
})

// 裸模块地址重写
// import xx from 'vue'
// import xx from '/@modules/vue'
function rewriteImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, function (s1, s2) {
    if (s2.startsWith('./') || s2.startsWith('/') || s2.startsWith('../')) {
      return s1
    } else {
      // 裸模块，替换
      return ` from '/@modules/${s2}'`
    }
  })
}

app.listen(3000, () => {
  console.log('vite running at 3000')
})
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script>
      //解决环境变量问题
      window.process = {
        env: {
          NODE_ENV: 'dev',
        },
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="main.js"></script>
  </body>
</html>
```

main.js

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

App.vue

```html
<template>
  <div>
    {{ title }}
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      title: 'hello,vite!!!',
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>
```
