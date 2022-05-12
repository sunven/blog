# 常见方法实现

## 函数防抖与函数节流

都是通过定时器控制函数的执行频率

### 防抖

```js
var debounce = function (method, delay) {
    var timer = null;
    return function () {
        var _this = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(_this, args);
        }, delay);
    };
};
```

应用场景：自动完成

### 节流

```js
function throttle(method, delay, mustRunDelay) {
    var timer = null, args = arguments;
    var start = 0, now = 0;
    return function () {
        var context = this;
        now= Date.now();
        if(!start){
            start = now;
        }
        if(now - start >= mustRunDelay){
            method.apply(context, args);
            start = Date.now();
        }else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }

    }
}
```

应用场景：图片懒加载

## new

1. 创建一个空的对象
2. 为步骤1新创建的对象添加属性**__proto__**，将该属性链接至构造函数的原型对象
3. 使用指定的参数调用构造函数 ，并将 `this` 绑定到新创建的对象
4. 如果该函数没有返回对象，则返回`this`

```js
function myNew(Func) {
  // 创建一个空对象
  const instance = Object.create(null);
  if (Func.prototype) {
    // 设置原型
    Object.setPrototypeOf(instance, Func.prototype);
  }
  // 调用方法,且构造函数的this为这个新建的对象
  var argsArr = [].slice.call(arguments, 1);
  const res = Func.apply(instance, argsArr);
  // 如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象
  if (typeof res === 'function' || (typeof res === 'object' && res !== null)) {
    return res;
  }
  return instance;
}
```

## call、apply、bind

### call

```js
Function.prototype.myCall = function (context) {
  // this就是方法，先存起来
  // fn被调用时，是作为方法调用，fn中this就是context
  context.fn = this;
  const args = [...arguments].slice(1);
  // es5没有spread，用eval
  const res = context.fn(...args);
  delete context.fn;
  return res;
};
```

### apply

```js
Function.prototype.myApply = function (context) {
  // this就是方法，先存起来
  // fn被调用时，是作为方法调用，fn中this就是context
  context.fn = this;
  let res;
  if (arguments[1]) {
    res = context.fn(...arguments[1]);
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
};
```

### bind

```js
Function.prototype.myBind = function (context) {
  // 先保存方法
  const fn = this;
  // 去bind的剩余参数
  const args = [...arguments].slice(1);
  const newFunc = function () {
    // 合并调用newFunc时的参数
    const newArgs = args.concat(...arguments);
    if (this instanceof newFunc) {
      // 通过 new 调用，绑定 this 为实例对象（即newFunc）
      fn.apply(this, newArgs);
    } else {
      // 通过普通函数形式调用，绑定 context
      fn.apply(context, newArgs);
    }
  };
  // 支持 new 调用方式
  newFunc.prototype = Object.create(fn.prototype);
  return newFunc;
};
```

## curry

```js
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      // 实参个数大于形参个数，直接调用原方法
      return func.apply(this, args);
    }
    return function (...args2) {
      // 递归 合并当次和下次参数
      return curried.apply(this, args.concat(args2));
    };
  };
}
```

## instanceof

```js
function isInstanceOf(instance, klass) {
  let proto = instance.__proto__;
  let prototype = klass.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    // 向上查找原型
    proto = proto.__proto__;
  }
}
```
