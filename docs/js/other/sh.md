# sh

## type

| type      | ToObject() | valueOf() |      |      |
| --------- | ---------- | --------- | ---- | ---- |
| Undefined |            | -         |      |      |
| Null      |            | -         |      |      |
| Boolean   |            | 布尔值    |      |      |
| Number    |            | 数字值    |      |      |
| String    |            | 字符串值  |      |      |
| Symbol    |            |           |      |      |
| BigInt    |            |           |      |      |
| Object    |            |           |      |      |
|           |            |           |      |      |

Boolean、Number、String哪里用到

vue props

undefined null区别

什么时候用null

*Object*.create(null);

Object.prototype.__proto__

## 一、类型

- 零舍一入
- 除零取整法
- 乘零取整法

### Map,WeakMap

> WeakMap：其中的键是弱引用的。其键必须是对象，而值可以是任意的

`node --expose-gc server.js`

```js
global.gc()
console.log('start:heapUsed', process.memoryUsage().heapUsed)

let key = new Array(5 * 1024 * 1024).fill(1)
console.log('array:heapUsed', process.memoryUsage().heapUsed)
const map = new Map()

map.set(key, 1)
global.gc()
console.log('map  :heapUsed', process.memoryUsage().heapUsed)

key = null
global.gc()
console.log('null :heapUsed', process.memoryUsage().heapUsed)
```

![img](./images/stack.jpg)

### 应用

## 确定 this 的指向

![img](./images/2019-03-19-01.png)
