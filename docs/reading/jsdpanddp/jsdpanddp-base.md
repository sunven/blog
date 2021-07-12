# 《JavaScript设计模式与开发实践》读书笔记-基础知识

- 笔记内容多摘录自《JavaScript设计模式与开发实践》（曾探著），侵删。

## 面向对象的JavaScript

### 1. 动态需要类型和鸭子类型

- 鸭子类型 如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子
- 只关注对象的行为，而不关注对象本身，也就是关注has-a,而不是is-a
- 面向接口编程而不是面向实现编程

### 2. 多态

同一操作作用于不同的对象上，可以产生不同的解释和不同的执行结果。

多态背后的思想是将“做什么”和“谁去做”以及“怎么做”分离开来，也就是将“不变的事物”与“可能改变的事物分离开”

### 3. 封装

封装的目的是将信息隐藏

### 4. 原型模式和基于原型继承的JavaScript对象系统

```js
Object.create = Object.create || function( obj ){
    var F = function(){};
    F.prototype = obj;
    return new F();
}
```

- 所有的数据都是对象
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
- 对象会记住它的原型
- 如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型

## this、call、apply

### this

this的指向

- 作为对象的方法调用
- 作为普通函数调用
- 构造器调用
- Function.prototype.call或Function.prototype.apply调用

### call和apply

用途

- 改变this指向
- Function.prototype.bind
- 借用其他对象的方法

## 闭包和高阶函数

### 闭包

#### 变量的作用域

#### 变量的生命周期

#### 闭包的作用

- 封装变量
- 延续局部变量的寿命

#### 闭包和面向对象设计

#### 用闭包实现命名模式

把请求封装为对象，分离请求发起者和接收者（执行者）之间的耦合关系

```js
var Tv = {
    open: function () {
        console.log('打开电视机');
    },

    close: function () {
        console.log('关上电视机');
    }
};

var createCommand = function (receiver) {
    var execute = function () {
        return receiver.open(); // 执行命令，打开电视机
    }
    var undo = function () {
        return receiver.close(); // 执行命令，关闭电视机
    }
    return {
        execute: execute,
        undo: undo
    }
};

var setCommand = function (command) {
    document.getElementById('execute').onclick = function () {
        command.execute(); // 输出：打开电视机
    }
    document.getElementById('undo').onclick = function () {
        command.undo(); // 输出：关闭电视机
    }
};

setCommand(createCommand(Tv));
```

命令的接收着封闭在闭包中

#### 闭包与内存管理

- 误解：内存泄漏

### 高阶函数

#### 函数作为参数传递

- 回调函数
- Array.prototype.sort

#### 函数作为返回值输出

- 判断数据类型
- getSingle

#### 高阶函数实现AOP

#### 高阶函数的其他应用

##### 1. currying

函数柯里化、部分求值

```js
var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
};
var cost = (function () {
    var money = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

var cost = currying(cost); // 转化成currying 函数
cost(100); // 未真正求值
cost(200); // 未真正求值
cost(300); // 未真正求值
alert(cost()); // 求值并输出：600
```

##### 2. uncurrying

泛化this的提取过程

```js
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};
```

```js
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
};
```

##### 3. 函数节流

```js
var throttle = function (fn, interval) {
    var __self = fn, // 保存需要被延迟执行的函数引用
        timer, // 定时器
        firstTime = true; // 是否是第一次调用
    return function () {
        var args = arguments,
            __me = this;
        if (firstTime) { // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;

            timer = setTimeout(function () { // 延迟一段时间执行
                clearTimeout(timer);
                timer = null;
                __self.apply(__me, args);
            }, interval || 500);
        };
    }
};
```

##### 4. 分时函数

```js
var timeChunk = function (ary, fn, count) {
    var obj,
        t;
    var len = ary.length;
    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    };
    return function () {
        t = setInterval(function () {
            if (ary.length === 0) { // 如果全部节点都已经被创建好
                return clearInterval(t);
            }
            start();
        }, 200); // 分批执行的时间间隔，也可以用参数的形式传入
    };
};

var ary = [];
for (var i = 1; i <= 1000; i++) {
    ary.push(i);
};
var renderFriendList = timeChunk(ary, function (n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8);
renderFriendList();
```

##### 5. 惰性加载函数

```js
var addEvent = function (elem, type, handler) {
    if (window.addEventListener) {
        addEvent = function (elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    } else if (window.attachEvent) {
        addEvent = function (elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
    addEvent(elem, type, handler);
};

var div = document.getElementById('div1');
addEvent(div, 'click', function () {
    alert(1);
});
addEvent(div, 'click', function () {
    alert(2);
});
```

##### 6. 函数防抖

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