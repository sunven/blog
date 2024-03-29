# Symbol

Symbol()返回的symbol值都是唯一的，可以作为对象的属性或者值

## 应用

比如当作枚举使用

```javascript
const OPTIONS = {
  GET: Symbol('GET'),
  POST: Symbol('POST')
}

function fn(option) {
  if (option === OPTIONS.GET) {
    console.log(OPTIONS.GET); // Symbol(GET)
  }
  if (option === OPTIONS.POST) {
    console.log(OPTIONS.POST); // Symbol(POST)
  }
}

fn(OPTIONS.GET)
fn(OPTIONS.POST)
```

我们不需要关心OPTIONS.GET的具体值是多少。只要是个唯一的值就行。

## 消除魔术字符串

```js
const shapeType = {
  triangle: Symbol()
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });

```

## 属性名的遍历

```js
Object.getOwnPropertySymbols

Reflect.ownKeys
```

为对象定义一些非私有的、但又希望只用于内部的方法

```js
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```

### Symbol.for,Symbol.keyFor

#### Symbol.for

```js
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false
```

#### Symbol.keyFor

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

> Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值
