# JavaScript 数据类型

## 一、数据类型

基本类型（值类型或者原始类型）：Number、Boolean、String、NULL、Undefined、Symbol(ES6)

引用类型：Object、Array、Function、Date 等

| 分类     | 类型                                                  | 内存中的位置 |
| -------- | ----------------------------------------------------- | ------------ |
| 基本类型 | number、boolean、string、null、undefined、symbol(ES6) | 栈（stack）  |
| 引用类型 | Object（Array、Function、Date 等）                    | 堆（heap）   |

栈内存：栈的优势是，存取速度比堆要快，仅次于寄存器，栈数据可以共享。但缺点是，存在栈中的数据大小与生存期必须是确定的，缺乏灵活性。栈中主要存放一些基本类型的变量（,int, short, long, byte, float, double, boolean, char）和对象句柄。栈有一个很重要的特殊性，就是存在栈中的数据可以共享。

堆内存：堆允许程序在运行时动态地申请某个大小的内存空间。

### bool

#### 假值

"",0,-0,NaN,null,undefined,false

### undefined

表示一个未初始化的值，也就是还没有被分配的值。我们之后再具体讨论变量，但有一点可以先简单说明一下，JavaScript 允许声明变量但不对其赋值，一个未被赋值的变量就是 `undefined` 类型。还有一点需要说明的是，`undefined` 实际上是一个不允许修改的常量

- undefined不是保留字

## 二、类型检测

### typeof

返回一个字符串，表示未经计算的操作数的类型

```javascript
// 数值
typeof Math.LN2 === 'number'
typeof Infinity === 'number'
typeof NaN === 'number' // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number' // Number 会尝试把参数解析成数值

typeof 42n === 'bigint'

// 字符串
typeof `template literal` === 'string'
typeof String(1) === 'string' // String 将任意值转换为字符串，比 toString 更安全

// 布尔值
typeof Boolean(1) === 'boolean' // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!1 === 'boolean' // 两次调用 ! (逻辑非) 操作符相当于 Boolean()

// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'

// Undefined
typeof undefined === 'undefined'
typeof declaredButUndefinedVariable === 'undefined'
typeof undeclaredVariable === 'undefined'

// 对象
typeof { a: 1 } === 'object'

// 使用 Array.isArray 或者 Object.prototype.toString.call
// 区分数组和普通对象
typeof [1, 2, 4] === 'object'

typeof new Date() === 'object'
typeof /regex/ === 'object' // 历史结果请参阅正则表达式部分

// 下面的例子令人迷惑，非常危险，没有用处。避免使用它们。
typeof new Boolean(true) === 'object'
typeof new Number(1) === 'object'
typeof new String('abc') === 'object'

// 函数
typeof function() {} === 'function'
typeof class C {} === 'function'
typeof Math.sin === 'function'
```

- 除 Function 外的所有构造函数的类型都是'object'
- 'object'typeof null === "object"

- typeof document.all === 'undefined';
- 在其被声明之前对块中的 `let` 和 `const` 变量使用 `typeof` 会抛出一个 ReferenceError

### instanceof

用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

object instanceof constructor

object:实例

constructor：构造函数

### Object.prototype.toString()

表示该对象的字符串

在**toString**方法被调用时,会执行下面的操作步骤:

1. 如果**this**的值为**undefined**,则返回`"[object Undefined]"`.
2. 如果**this**的值为**null**,则返回`"[object Null]"`.

3. 让*O*成为调用 ToObject(**this)**的结果.
4. 让*class*成为*O*的内部属性[[Class]]的值.

5. 返回三个字符串**"[object ",** *class*, 以及 **"]"**连接后的新字符串

**Object.prototype.toString.call([]).slice(8, -1) === "Array";**



## 判断类型

#### 1. Object.prototype.toString.call()

```js
Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function() {}) // "[object Function]"
Object.prototype.toString.call({ name: 'An' }) // "[object Object]"
```

#### 2. instanceof

```js
;[] instanceof Array // true
;[] instanceof Object // true
```

#### 3. Array.isArray()

```js
var iframe = document.createElement('iframe')
document.body.appendChild(iframe)
xArray = window.frames[window.frames.length - 1].Array
var arr = new xArray(1, 2, 3) // [1,2,3]

// Correctly checking for Array
Array.isArray(arr) // true
Object.prototype.toString.call(arr) // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array // false
```

4. **typeof**

```js
console.log(typeof a) //'undefined'
console.log(typeof true) //'boolean'
console.log(typeof '123') //'string'
console.log(typeof 123) //'number'
console.log(typeof NaN) //'number'
console.log(typeof null) //'object'
var obj = new String()
console.log(typeof obj) //'object'
var fn = function() {}
console.log(typeof fn) //'function'
console.log(typeof class c {}) //'function'
```

## 相等

<https://dorey.github.io/JavaScript-Equality-Table/>

### 非严格相等  ==

比较前，先隐式转换为相同类型，再比较两个值是否相等

|           | Undefined | Null    | Number                | String                        | Boolean                         | Object                          |
| :-------- | --------- | ------- | --------------------- | ----------------------------- | ------------------------------- | ------------------------------- |
| Undefined | `true`    | `true`  | `false`               | `false`                       | `false`                         | `IsFalsy(B)`                    |
| Null      | `true`    | `true`  | `false`               | `false`                       | `false`                         | `IsFalsy(B)`                    |
| Number    | `false`   | `false` | `A === B`             | `A === ToNumber(B)`           | `A=== ToNumber(B)`              | `A== ToPrimitive(B)`            |
| String    | `false`   | `false` | `ToNumber(A) === B`   | `A === B`                     | `ToNumber(A) === ToNumber(B)`   | `ToPrimitive(B) == A`           |
| Boolean   | `false`   | `false` | `ToNumber(A) === B`   | `ToNumber(A) === ToNumber(B)` | `A === B`                       | `ToNumber(A) == ToPrimitive(B)` |
| Object    | `false`   | `false` | `ToPrimitive(A) == B` | `ToPrimitive(A) == B`         | `ToPrimitive(A) == ToNumber(B)` | `A === B`                       |

- ToNumber(A) 表示尝试在比较前将参数 A 转换为数字，与+A 效果相同
- ToPrimitive(A)通过尝试调用 A 的 A.toString() 和 A.valueOf() 方法，将参数 A 转换为原始值
-  // TODO

#### 特例：document.all

```js
// Opera 中`document.attachEvent`(未验证)

// for “modern” browsers
typeof document.all  // 'undefined'
document.all == undefined // true
Object.prototype.toString.call(document.all) // '[object HTMLAllCollection]'

// for ancient browsers eg ie <= 10
typeof document.all  // 'object'
document.all == undefined // false
Object.prototype.toString.call(document.all) // '[object HTMLAllCollection]'

if (document.all) {
  // code that uses `document.all`, for ancient browsers
} else if (document.getElementById) {
  // code that uses `document.getElementById`, for “modern” browsers
}
```

### 严格相等  ===

不进行隐式转换，类型相同，值也相同，就是全等

- 两个 NaN 不是全等的
- +0 和-0 是全等的

### 同值相等  Object.is

与===不同

- 两个 NaN 是相等的
- +0 和-0 是不相等的

### 零值相等
Map，Set使用

与同值相等类似，不过认为+0 和-0 是相等的

## undefined与null

<http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html>

```js
Number(null)
// 0

5 + null
// 5

Number(undefined)
// NaN

5 + undefined
// NaN
```

### null表示"没有对象"，即该处不应该有值

- 作为函数的参数，表示该函数的参数不是对象。

- 作为对象原型链的终点。

```js
Object.getPrototypeOf(Object.prototype)
// null
```

### undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义

- 变量被声明了，但没有赋值时，就等于undefined。

- 调用函数时，应该提供的参数没有提供，该参数等于undefined。

- 对象没有赋值的属性，该属性的值为undefined。

- 函数没有返回值时，默认返回undefined。

``` js
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
```
