## js

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
