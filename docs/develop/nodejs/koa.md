# Koa

洋葱模型：

![img](./images/onion-rings.png)

示例：

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  var start = new Date()
  console.log(1)
  await next()
  console.log(2)
  var ms = new Date() - start
  console.log('%s', ms + 'ms')
})

app.use(async (ctx, next) => {
  var start = new Date()
  console.log(3)
  await next()
  console.log(4)
  var used = new Date() - start
  console.log('%s %s %s %sms', ctx.method, ctx.originalUrl, ctx.status, used)
})

app.use(async (ctx, next) => {
  console.log(5)
  await next()
  console.log(6)
  if (!ctx.body) return
  ctx.set('Content-Length', ctx.body.length)
})

app.use(async (ctx, next) => {
  console.log(7)
  await next()
  console.log(8)
  if (ctx.path !== '/') return
  ctx.body = 'Hello World'
})

app.listen(3000)
```

打印如下：

```
1
3
5
7
8
6
4
GET / 200 5ms
2
9ms
```
