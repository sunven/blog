# Map、WeakMap、Set、WeakSet

## Map
类似于我们常用的对象，但与对象有一些显著区别。
键的比较是基于 sameValueZero（零值相等） 算法：
即：同值相等（Object.is）加上+0和-0是相等（同值相等中+0和-0不想等）。


### Map和对象区别
|  | Map | Object |
| --- | --- | --- |
| 默认键 | Map 默认情况不包含任何键 | 对象上有原型（Object.create(null)可以避免） |
| 键的类型 | 任意值 | String或Symbol |
| 键的顺序 | 键是有序的 | 键是无序的 |
| 大小 | 通过size属性获取 | Object.keys等方法 |
| 迭代 | 可直接迭代 | 获取键（Object.keys等方法）后才能再迭代 |

### Map和Object性能比较

- Map比Object节约内存
- 大量键插入情况下，Map性能更好
- 大量查找操作下，Object可能更好
- 大量删除操作下，Map更好



### Map还是Object

- 如果键在运行时才能知道，或者所有的键类型相同，所有的值类型相同，那就使用Map。
- 如果需要将原始值存储为键，则使用Map，因为Object将每个键视为字符串
- 如果需要对个别元素进行操作，使用Object



## WeakMap
与Map相比

- 只接受对象作为键
- WeakMap的键是弱引用的，即：当其键所指对象没有其他地方引用的时候，它会被GC回收掉
- WeakMap的键是不能枚举的



### 来看看弱引用效果
使用`node --expose-gc demo.js`在node环境中运行
`process.memoryUsage().heapUsed`得到当前内存使用情况
使用Map的情况
```javascript
global.gc();
console.log("heapUsed", process.memoryUsage().heapUsed);

const map = new Map();
let key = new Array(5 * 1024 * 1024); 
//这个数组大约要(43718208-1587952)/1024/1024=40M内存空间
//key指向了这片空间
map.set(key, 1);
global.gc();
console.log("heapUsed", process.memoryUsage().heapUsed);

key = null; // 现在清除key对这片空间的引用。
global.gc();
console.log("heapUsed", process.memoryUsage().heapUsed);
//这片40M的空间还存在内存中。

// heapUsed 1587952
// heapUsed 43718208
// heapUsed 43716128
```
虽然清除了key对那40M空间的引用，但Map还引用着，所以这40M空间不会被回收


使用WeakMap的情况
```javascript
global.gc();
console.log("heapUsed", process.memoryUsage().heapUsed);

const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);
global.gc();
console.log("heapUsed", process.memoryUsage().heapUsed);

key = null;
global.gc();
console.log("heapUsed", process.memoryUsage().heapUsed);

// heapUsed 1588072
// heapUsed 43718280
// heapUsed 1773112
```
因为WeakMap是若引用，所以`key = null`后，这片40M的空间没有其它引用了，所以会被回收。这就是WeakMap弱引用的效果。
> WeakMap中，如果键因为弱引用被回收，对应键的值如果没有其它引用也会被回收的。

### 应用
DOM节点数据
```javascript
const vm = new WeakMap();
vm.set(document.querySelector("#a"), {
  isEnable: true
});
```
a这个元素被删除时，对应关联的一些数据也会被删除。


## Set
类似Array，但元素只会出现一次。
值的等值判断基于sameValueZero

### Set和Array对比

- 数组中用于判断元素是否存在的indexOf 函数效率低下。
- Set对象允许根据值删除元素，而数组中必须使用基于下标的 splice 方法。
- 数组的indexOf方法无法找到NaN值。
- Set对象存储不重复的值，所以不需要手动处理包含重复值的情况。



## WeakSet
### 与Set对比

- `WeakSet`中的值必须是对象类型
- `WeakSet`中的值是弱引用的
- `WeakSet`不可枚举



### 应用
使用DOM元素作为键来追踪它们而不必担心内存泄漏

