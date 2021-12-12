# 迭代器和生成器

## reference

[迭代器和生成器 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)

## Iterators

### 迭代协议

参考：[MDN 迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

#### 可迭代协议

允许 JavaScript 对象定义或定制它们的迭代行为。

要成为可迭代对象， 一个对象必须实现 @@iterator 方法。这意味着对象（或者它原型链上的某个对象）必须有一个键为 @@iterator 的属性，可通过常量 Symbol.iterator 访问该属性

```javascript
let someString = 'hi'
typeof someString[Symbol.iterator] // "function"
```

#### 迭代器协议

定义了产生一系列值的标准方式。

```javascript
var myIterator = {
  count: 5,
  next: function() {
    if (this.count > 0) {
      return {
        value: this.count--,
        done: false,
      }
    } else {
      return {
        done: true,
      }
    }
  },
}
```

迭代器中需要定一个 next 方法，返回对象中需要包含 value 和 done 两个属性。value 为迭代返回的值，done 表示迭代是否结束。可以理解为每一次的循环都会调用一次 next 方法，如果 done 为 true，表示循环结束。

通常可迭代协议与迭代器协议会一起实现，如下：

```javascript
var myIterator = {
  count: 5,
  next: function() {
    if (this.count > 0) {
      return {
        value: this.count--,
        done: false,
      }
    } else {
      return {
        done: true,
      }
    }
  },
  [Symbol.iterator]: function() {
    return this
  },
}

for (var a of myIterator) {
  console.log(a)
}

//5
//4
//3
//2
//1
```

## Generators

拥有在一个函数块内暂停和恢复代码执行的能力

- yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行(惰性求值)
- 可以执行多次（或者说多个）yield 表达式,所以 Generator 函数可以返回一系列的值

```js
function* idMaker() {
  console.log('step1')
  var index = 0
  while (true && index < 20) {
    console.log('step2')
    yield index++
    console.log('step3')
  }
}
var gen = idMaker()
console.log(gen.next().value) // 0
console.log(gen.next().value) // 1
console.log(gen.next().value) // 2
```

结果

```
step1
step2
0
step3
step2
1
step3
step2
2
```

- 一般来说 n 个 yield 需要调用 n+1 次 next()
- 第一次调用 next()的传值不会被使用，可以理解为第一次调用 next()是为了执行生成器函数

- yield 接收的参数是下一次 next()传递的参数

### next()的参数

当作上一个 yield 表达式的返回值

```js
function* fibonacci() {
  var fn1 = 0
  var fn2 = 1
  while (true) {
    var current = fn1
    fn1 = fn2
    fn2 = current + fn1
    var reset = yield current
    if (reset) {
      fn1 = 0
      fn2 = 1
    }
  }
}
var sequence = fibonacci()
console.log(sequence.next().value) // 0
console.log(sequence.next().value) // 1
console.log(sequence.next().value) // 1
console.log(sequence.next().value) // 2
console.log(sequence.next().value) // 3
console.log(sequence.next().value) // 5
console.log(sequence.next().value) // 8
console.log(sequence.next(true).value) // 0
console.log(sequence.next().value) // 1
console.log(sequence.next().value) // 1
console.log(sequence.next().value) // 2
```

## Iterators 与 Generator 关系

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有 Symbol.iterator 属性，执行后返回自身

```js
function* gen() {
  // some code
}

var g = gen()

g[Symbol.iterator]() === g
// true
```

因此，可以把 Generator 赋值给对象的 Symbol.iterator 属性

```js
var myIterable = {}
myIterable[Symbol.iterator] = function*() {
  yield 1
  yield 2
  yield 3
}
;[...myIterable] // [1, 2, 3]
```
