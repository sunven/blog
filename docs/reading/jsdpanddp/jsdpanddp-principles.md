# 《JavaScript设计模式与开发实践》读书笔记-设计原则

## 单一职责原则(SRP)

- 一个对象（方法）只做一件事
- 降低了单个类或者对象的复杂度
- 增加编写代码的复杂度
- 不是所有的职责都应该一一分离

### 代理模式

```js
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {

            imgNode.src = src;
        }
    }
})();

var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('http:// imgcache.qq.com/music/photo/000GGDys0yA0Nk.jpg');
```

### 迭代器模式

```js
var each = function (obj, callback) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj); // isArraylike 函数未实现，可以翻阅jQuery 源代码
    if (isArray) { // 迭代类数组
        for (; i < length; i++) {
            callback.call(obj[i], i, obj[i]);
        }
    } else {
        for (i in obj) { // 迭代object 对象
            value = callback.call(obj[i], i, obj[i]);
        }
    }
    return obj;
};

var appendDiv = function (data) {
    each(data, function (i, n) {
        var div = document.createElement('div');
        div.innerHTML = n;
        document.body.appendChild(div);
    });
};

appendDiv([1, 2, 3, 4, 5, 6]);
appendDiv({
    a: 1,
    b: 2,
    c: 3,
    d: 4
});
```

### 单例模式

```js
var getSingle = function (fn) { // 获取单例
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
};
var createLoginLayer = function () { // 创建登录浮窗
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    document.body.appendChild(div);
    return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);
var loginLayer1 = createSingleLoginLayer();
var loginLayer2 = createSingleLoginLayer();
alert(loginLayer1 === loginLayer2); // 输出： true
```

### 装饰者模式

```js
Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};
var showLogin = function () {
    console.log('打开登录浮层');
};
var log = function () {
    console.log('上报标签为: ' + this.getAttribute('tag'));

};
document.getElementById('button').onclick = showLogin.after(log);
// 打开登录浮层之后上报数据
```

## 最少知识原则(LKP)

又叫迪米特法则

- 一个软件实体应当尽可能少的与其他实体发生相互作用
- 把对象划分成较小的力度，提高对象的复用性

### 中介者模式

通过增加一个中介者对象，让所有相关的对象都通过中介者对象来通信，而不是互相引用

### 外观模式

- 为一组子系统提供一个简单便利的访问入口
- 隔离客户与复杂子系统之间的联系，客户不用去了解子系统的细节

```js
var A = function(){
    a1();
    a2();
}
var b = function(){
    a1();
    a2();
}
var facade = function(){
    A();
    B();
}
facade();
```

### 封装

控制变量的访问范围

```js
var mult = (function () {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {

            a = a * arguments[i];
        }
        return cache[args] = a;
    }
})();
mult(1, 2, 3); // 输出： 6
```

## 开放-封闭原则(OCP)

- 软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改
- 当需要改变一个程序的功能或者给这个程序增加功能，可以使用增加代码的方式，但是不允许改动程序的源代码

```js
Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};
window.onload = (window.onload || function () {}).after(function () {
    console.log(document.getElementsByTagName('*').length);
});
```

### 用对象的多态性消除条件分支

```js
var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
};

var Duck = function () {};
var Chicken = function () {};
makeSound(new Duck()); // 输出：嘎嘎嘎
makeSound(new Chicken()); // 输出：咯咯咯



var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    } else if (animal instanceof Dog) { // 增加跟狗叫声相关的代码
        console.log('汪汪汪');
    }
};



var Dog = function () {};
makeSound(new Dog()); // 增加一只狗

var makeSound = function (animal) {
    animal.sound();
};
var Duck = function () {};
Duck.prototype.sound = function () {
    console.log('嘎嘎嘎');
};
var Chicken = function () {};
Chicken.prototype.sound = function () {
    console.log('咯咯咯');
};
makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
/********* 增加动物狗，不用改动原有的makeSound 函数 ****************/
var Dog = function () {};
Dog.prototype.sound = function () {
    console.log('汪汪汪');
};
makeSound(new Dog()); // 汪汪汪
```

### 找出变化的地方

1. 放置挂钩
2. 使用回调函数

### 发布-订阅模式

当有新的订阅者出现时，发布者的代码不需要修改

### 模板方式模式

通过添加新的子类来增加新的功能，不需要改动父类及其他的子类

### 策略模式

增加新的策略类来增加新的功能，各策略互不影响

### 代理模式

提供代理函数来完成额外功能

### 责任链模式

增加新的节点而不是改变原有代码

> 愚弄我一次，应该羞愧的是你。在愚弄我一次，应该羞愧的是我。
