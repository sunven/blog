# Proxy & Reflec

## 一、Proxy

参考：[MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
定义一个属性的 get set

```javascript
let obj = {
  _age: 18,
  get age() {
    return `I'm ${this._age}`
  },
  set age(val) {
    this._age = Number(val)
  },
}

console.log(obj.age) // I'm 18
obj.age = 'a'
console.log(obj.age) // I'm NaN years old
```

问题：

- 每个属性都要写对应的 getter、setter。
- 需要额外属性存储真实值（_age）。

用 Proxy 如何实现？

```javascript
let target = {
  age: 18,
  name: 'Tom',
}
let handlers = {
  get(target, property) {
    return `${property}: ${target[property]}`
  },
  set(target, property, value) {
    target[property] = value
  },
}
let proxy = new Proxy(target, handlers)
proxy.age = 19
console.log(target.age, proxy.age) // 19,          age : 19
console.log(target.name, proxy.name) // Tom, name: Tom
```

### 参数receiver

Proxy或者继承Proxy的对象

```js
const parent = {
  name: 'parent'
};
const handle = {
  get(target, key, receiver) {
    console.log('proxy get', key)
    console.log(this === handle) // true
    console.log(receiver === proxy); // false
    console.log(receiver === child); // true
    console.log(target === parent); // true
    return target[key];
  },
}
const proxy = new Proxy(parent, handle);
const child = {
  age: 18,
};
// child继承与parent的代理对象proxy
Object.setPrototypeOf(child, proxy);
child.name;
child.age
```

- this是handle
- receiver是真正的调用者

### 解决对象属性为 undefined 的问题

```javascript
let target = {}
let handlers = {
  get: (target, property) => {
    target[property] = property in target ? target[property] : {}
    if (typeof target[property] === 'object') {
      return new Proxy(target[property], handlers)
    }
    return target[property]
  },
}
let proxy = new Proxy(target, handlers)
console.log(proxy.a.b.c) // Proxy {}
console.log('c' in proxy.a.b) // true (上一步已经创建了a.b.c)
proxy.a.b.c = 'hello'
console.log(target.a.b.c) // hello
```

### 普通函数拦截

**apply：**函数调用操作的捕捉器

```javascript
class Test {
  constructor(a, b) {
    console.log('constructor', a, b)
  }
}
// Test(1, 2) // throw an error
let proxyClass = new Proxy(Test, {
  apply(target, thisArg, argumentsList) {
    return new (target.bind(thisArg, ...argumentsList))()
  },
})
proxyClass(1, 2) // constructor 1 2
```

es6 中，class 是不允许以函数形式调用的，通过 Proxy 拦截函数调用形式，在内部再采用构造函数调用形式。

### 构造函数调用拦截

construct:[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)  操作符的捕捉器

```javascript
function add(a, b) {
  return a + b
}
let proxy = new Proxy(add, {
  construct(target, argumentsList, newTarget) {
    throw new Error(`Function ${target.name} cannot be invoked with 'new'`)
  },
})
proxy(1, 2) // 3
new proxy(1, 2) // throw an error
```

在 construct 中抛出异常，不允许采用构造函数调用

### Proxy 的不足

#### 代理中的 this

```javascript
let wm = new WeakMap()

class User {
  constructor(userId) {
    wm.set(this, userId)
  }

  set id(userId) {
    wm.set(this, userId)
  }

  get id() {
    return wm.get(this)
  }
}

const user = new User(1)
console.log(user.id) // 1

const proxy = new Proxy(user, {})
console.log(proxy.id) // undefined
```

通过 proxy 访问 id 为 undefined，因为通过 proxy 访问时，this 为 proxy，WeakMap 中，键为 User 对象。
解决方法：

```javascript
const UserProxy = new Proxy(User, {})
const proxy = new UserProxy(1)
console.log(proxy.id) // 1
```

代理 User 实例，改为代理 User 本身，再创建实例。

#### 代理与内部槽位

Date 类型方法的执行依赖 this 值上的内部槽位[[NumberDate]]，代理对象不存在这个槽位

```javascript
const target = new Date()
const proxy = new Proxy(target, {})
console.log(proxy instanceof Date) // true
proxy.getDate() // Uncaught TypeError: this is not a Date object.
```

### Proxy 与 Object.defineProperty 的劫持方式

Proxy 代理整个对象，可以监听所有属性变化，包括新增属性和删除属性；Object.defineProperty 劫持的是属性

### Object.defineProperty 的不足

- 无法检测到对象属性的新增或删除
- 不能监听数组的变化
- `Object.defineProperty()`的`getter/setter`不能嵌套

### Proxy 优点

- Proxy 可以嵌套
- 可以拦截数组变化
- 可以检测到对象属性的新增或删除
- 不止拦截 get、set，还有 in、new 等更多操作

### Proxy 兼容性差

- IE 不支持 Proxy，`Vue 3.0` 中放弃了对于 IE 的支持
- 目前并没有一个完整支持 `Proxy` 所有拦截方法的`Polyfill`方案

### Proxy 性能问题

`Proxy` 的性能比 `Promise` 还差，但也就是毫秒级别的影响，在非极致性能要求下，可以忽略。

### Proxy 实践案例

[腾讯基于 Proxy 的代码执行监听上报实践](https://www.infoq.cn/article/6eKiic82aQu3uqaYvvfV)

## 二、Reflect

参考：[MDN Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

- `Reflect`不是一个构造函数，不能用 new 调用
- `Reflect`的所有属性和方法都是静态的

### 为什么需要 Reflect 对象

Reflect 中大部分方法在 Object 中都已经有了。可以理解为对反射一类操作的重新封装及加强。Reflect 和 Object 方法也有些许不同的，参考：[比较 Reflect 和 Object 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/%E6%AF%94%E8%BE%83_Reflect_%E5%92%8C_Object_%E6%96%B9%E6%B3%95)

### 示例

```javascript
var s = Symbol('sy')
var key = 'bar'
var o = {
  [s]: 1,
  a: 1,
}
var keys = Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o))
console.log(keys) // ["a", Symbol(sy)]
console.log(Reflect.ownKeys(o)) // ["a", Symbol(sy)]
```

`Reflect.ownKeys(o)`=`Object.getOwnPropertyNames()`+`Object.getOwnPropertySymbols()`

### 参数receiver

如果target对象中指定了getter，receiver则为getter调用时的this值。

```js
const parent = {
  name: 'parent',
  get value() {
    return this.name
  }
};
const child = {
  name: 'child'
};
// child继承与parent
Object.setPrototypeOf(child, parent);
console.log(child.value) //child
```

value是child是符合预期的

```js
const parent = {
  name: 'parent',
  get value() {
    return this.name
  }
};
const handle = {
  get(target, key, receiver) {
    console.log(target === parent); // true
    console.log(Reflect.get(target, key)) // parent
    console.log('receiver', Reflect.get(target, key, receiver)) // child
    // return target[key];
    return Reflect.get(target, key, receiver);
  },
}
const proxy = new Proxy(parent, handle);
const child = {
  name: 'child'
};
// child继承与parent的代理对象proxy
Object.setPrototypeOf(child, proxy);
console.log(child.value) //child
```

- Reflect.get不传receiver取到了parent上的name，不是预期的
- Reflect.get传receiver取到了child上的name，是预期的
- target是parent,receiver是调用者（this)
