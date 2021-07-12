# 类和模块

## 一 类和原型

## 二 类和构造函数

调用构造函数的一个重要特征是，构造函数的prototye属性被用做新对象的原型。这意味着通过同一个构造函数创建的所有对象都继承自一个相同的对象，因此它们都是同一个类的成员

### 构造函数和类的标识

原型对象是类的唯一标识：当且仅当两个对象继承自同一个原型对象时，它们才是属于同一个类的实例
两个构造函数的prototype属性可能指向同一个原型对象。那么这两个构造函数创建的实例是属于同一个类的。

```js
r instanceof Range//如果r继承自Range.prototype，则返回true
```

### constructor属性

任何JavaScript函数都可以用做构造函数，并且调用构造函数是需要用到一个prototye属性的。因此，每个JavaScript函数（ECMAScript 5中的Function.bind()方法返回的函数除外）都自动拥有一个prototype属性。这个属性的值是一个对象，这个对象包含唯一一个不可枚举属性constructor。constructor属性的值是一个函数对象：

``` javascript
var F=function(){};//这是一个函数对象
var p=F.prototype;//这是F相关联的原型对象
var c=p.constructor;//这是与原型相关联的函数
c===F//=＞true:对于任意函数F.prototype.constructor==F
```

构造函数的原型中存在预先定义好的constructor属性，这意味着对象通常继承的constructor均指代它们的构造函数。由于构造函数是类的“公共标识”，因此这个constructor属性为对象提供了类。

显式给原型添加一个构造函数

``` javascript
Range.prototype = {
    constructor: Range, //显式设置构造函数反向引用
    includes: function(x) {
        return this.from＜ = x＆＆ x＜ = this.to;
    },
    foreach: function(f) {
        for (var x = Math.ceil(this.from); x＜ = this.to; x++) f(x);
    },
    toString: function() {
        return "(" + this.from + "..." + this.to + ")";
    }
};
```

使用预定义的原型对象

``` javascript
//扩展预定义的Range.prototype对象，而不重写之
//这样就自动创建Range.prototype.constructor属性
Range.prototype.includes = function(x) {
    return this.from <= x && x <= this.to;
};
Range.prototype.foreach = function(f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
};
Range.prototype.toString = function() {
    return "(" + this.from + "..." + this.to + ")";
};
```

## 三 JavaScript中Java式的类继承

三种类成员

- 构造函数对象

构造函数（对象）为JavaScript的类定义了名字。任何添加到这个构造函数对象中的属性都是类字段和类方法（如果属性值是函数的话就是类方法）

- 原型对象

原型对象的属性被类的所有实例所继承，如果原型对象的属性值是函数的话，这个函数就作为类的实例的方法来调用

- 实例对象

类的每个实例都是一个独立的对象，直接给这个实例定义的属性是不会为所有实例对象所共享的。定义在实例上的非函数属性，实际上是实例的字段

定义类分三步

- 第一步，先定义一个构造函数，并设置初始化新对象的实例属性。
- 第二步，给构造函数的prototype对象定义实例的方法。
- 第三步，给构造函数定义类字段和类属性。

## 四 类的扩充

JavaScript中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后原型的属性发生改变，也会影响到继承这个原型的所有实例对象。这意味着我们可以通过给原型对象添加新方法来扩充JavaScript类

## 五 类和类型

### instanceof运算符

左操作数是待检测其类的对象，右操作数是定义类的构造函数

检测对象的原型链上是否存在某个特定的原型对象

``` javascript
range.methods.isPrototypeOf(r);//range.method是原型对象
```

instanceof运算符和isPrototypeOf()方法的缺点是，我们无法通过对象来获得类名，只能检测对象是否属于指定的类名
多窗口和多框架子页面的Web应用中兼容性不佳

### constructor 属性

``` javascript
function typeAndValue(x) {
    if (x == null) return ""; //Null和undefined没有构造函数
    switch (x.constructor) {
        case Number:
            return "Number:" + x; //处理原始类型
        case String:
            return "String:'" + x + "'";
        case Date:
            return "Date:" + x; //处理内置类型
        case RegExp:
            return "Regexp:" + x;
        case Complex:
            return "Complex:" + x; //处理自定义类型
    }
}
//关键字case后的表达式都是函数，如果改用typeof运算符或获取到对象的class属性的话，它们应当改为字符串。
```

不足

- 多个执行上下文的场景中它是无法正常工作的（比如在浏览器窗口的多个框架子页面中）
- 在JavaScript中也并非所有的对象都包含constructor属性