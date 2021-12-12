# Map、WeakMap、Set、WeakSet

## Map

类似于我们常用的对象，但与对象有一些显著区别。
键的比较是基于 sameValueZero（零值相等） 算法：
即：同值相等（Object.is）加上+0 和-0 是相等（同值相等中+0 和-0 不想等）。

### Map 和对象区别

|          | Map                      | Object                                      |
| -------- | ------------------------ | ------------------------------------------- |
| 默认键   | Map 默认情况不包含任何键 | 对象上有原型（Object.create(null)可以避免） |
| 键的类型 | 任意值                   | String 或 Symbol                            |
| 键的顺序 | 键是有序的               | 键是无序的                                  |
| 大小     | 通过 size 属性获取       | Object.keys 等方法                          |
| 迭代     | 可直接迭代               | 获取键（Object.keys 等方法）后才能再迭代    |

### Map 和 Object 性能比较

- Map 比 Object 节约内存
- 大量键插入情况下，Map 性能更好
- 大量查找操作下，Object 可能更好
- 大量删除操作下，Map 更好

### Map 还是 Object

- 如果键在运行时才能知道，或者所有的键类型相同，所有的值类型相同，那就使用 Map。
- 如果需要将原始值存储为键，则使用 Map，因为 Object 将每个键视为字符串
- 如果需要对个别元素进行操作，使用 Object

## WeakMap

与 Map 相比

- 只接受对象作为键
- WeakMap 的键是弱引用的，即：当其键所指对象没有其他地方引用的时候，它会被 GC 回收掉
- WeakMap 的键是不能枚举的

### 来看看弱引用效果

使用`node --expose-gc demo.js`在 node 环境中运行
`process.memoryUsage().heapUsed`得到当前内存使用情况
使用 Map 的情况

```javascript
global.gc()
console.log('heapUsed', process.memoryUsage().heapUsed)

const map = new Map()
let key = new Array(5 * 1024 * 1024)
//这个数组大约要(43718208-1587952)/1024/1024=40M内存空间
//key指向了这片空间
map.set(key, 1)
global.gc()
console.log('heapUsed', process.memoryUsage().heapUsed)

key = null // 现在清除key对这片空间的引用。
global.gc()
console.log('heapUsed', process.memoryUsage().heapUsed)
//这片40M的空间还存在内存中。

// heapUsed 1587952
// heapUsed 43718208
// heapUsed 43716128
```

虽然清除了 key 对那 40M 空间的引用，但 Map 还引用着，所以这 40M 空间不会被回收

使用 WeakMap 的情况

```javascript
global.gc()
console.log('heapUsed', process.memoryUsage().heapUsed)

const wm = new WeakMap()
let key = new Array(5 * 1024 * 1024)
wm.set(key, 1)
global.gc()
console.log('heapUsed', process.memoryUsage().heapUsed)

key = null
global.gc()
console.log('heapUsed', process.memoryUsage().heapUsed)

// heapUsed 1588072
// heapUsed 43718280
// heapUsed 1773112
```

因为 WeakMap 是若引用，所以`key = null`后，这片 40M 的空间没有其它引用了，所以会被回收。这就是 WeakMap 弱引用的效果。

> WeakMap 中，如果键因为弱引用被回收，对应键的值如果没有其它引用也会被回收的。

### 应用

DOM 节点数据

```javascript
const vm = new WeakMap()
vm.set(document.querySelector('#a'), {
  isEnable: true,
})
```

a 这个元素被删除时，对应关联的一些数据也会被删除。

## Set

类似 Array，但元素只会出现一次。
值的等值判断基于 sameValueZero

### Set 和 Array 对比

- 数组中用于判断元素是否存在的 indexOf 函数效率低下。
- Set 对象允许根据值删除元素，而数组中必须使用基于下标的 splice 方法。
- 数组的 indexOf 方法无法找到 NaN 值。
- Set 对象存储不重复的值，所以不需要手动处理包含重复值的情况。

## WeakSet

### 与 Set 对比

- `WeakSet`中的值必须是对象类型
- `WeakSet`中的值是弱引用的
- `WeakSet`不可枚举

### 应用

使用 DOM 元素作为键来追踪它们而不必担心内存泄漏
