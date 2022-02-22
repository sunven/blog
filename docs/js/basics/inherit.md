# 面向对象的程序设计-继承

基础的实现主要依靠原型链来实现

## 原型链

原型链做为实现继承的主要方法。
构造函数，原型，实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。

```js
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//继承了SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
    return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue());   //true
```

![6-4.jpg](https://raw.githubusercontent.com/sunven/picture/master/6-4.jpg)

调用getSuperValue方法会经历三个步骤：

1. 搜索实例
2. 搜索SubType.Prototype
3. 搜索SupperType.Prototype

### 默认原型

所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object。Prototype。

![6-5.jpg](https://raw.githubusercontent.com/sunven/picture/master/6-5.jpg)

### 确定原型和实例的关系

```js
alert(instance instanceof Object);      //true
alert(instance instanceof SuperType);   //true
alert(instance instanceof SubType);     //true

alert(Object.prototype.isPrototypeOf(instance));    //true
alert(SuperType.prototype.isPrototypeOf(instance)); //true
alert(SubType.prototype.isPrototypeOf(instance));   //true
```

### 谨慎的定义方法

给原型添加方法的代码一定要放在替换原型的语句之后。

```js
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//继承了 SuperType
SubType.prototype = new SuperType();

//添加新方法
SubType.prototype.getSubValue = function (){
    return this.subproperty;
};

//重写超类型中的方法
SubType.prototype.getSuperValue = function (){
    return false;
};

var instance = new SubType();
alert(instance.getSuperValue());   //false
```

> 通过原型链实现继承时，不是使用对象字面量创建原型方法，因为这样就会重写原型链。

```js
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//继承了 from SuperType
SubType.prototype = new SuperType();

//使用字面量添加新方法，会导致上一行代码无效
SubType.prototype = {
    getSubValue : function (){
        return this.subproperty;
    },

    someOtherMethod : function (){
        return false;
    }
};

var instance = new SubType();
alert(instance.getSuperValue());   //error!
```

### 4.原型链的问题

#### 1.引用类型的问题

```js
function SuperType(){
    this.colors = ["red", "blue", "green"];
}

function SubType(){            
}

//继承了 SuperType
SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);    //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors);    //"red,blue,green,black"
```

#### 2.传参问题

在创建子类实例是，不能向超类型的构造函数中传递参数。

## 借用构造函数

函数只不过是特定环境中执行代码的对象，因为通过使用apply()和call()方法也可以在（将来）新创建的对象上执行构造函数

```js
function SuperType(){
    this.colors = ["red", "blue", "green"];
}

function SubType(){  
    //继承了 SuperType
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);    //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors);    //"red,blue,green"
```

### 1.传递参数

```js
function SuperType(name){
    this.name = name;
}

function SubType(){  
    //继承了 SuperType 同时还传递了参数
    SuperType.call(this, "Nicholas");

    //实例属性
    this.age = 29;
}

var instance = new SubType();
alert(instance.name);    //"Nicholas";
alert(instance.age);     //29
```

### 2.借用构造函数的问题

方法都在构造函数中定义，函数无法复用。

## 组合继承

将原型链和借用构造函数的方式组合在一起,这样，同在原型上定义方法实现了函数复用，又能保证每个实例都有它自己的属性。

```js
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age){  
    //继承属性
    SuperType.call(this, name);
    this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors);  //"red,blue,green,black"
instance1.sayName();      //"Nicholas";
instance1.sayAge();       //29


var instance2 = new SubType("Greg", 27);
alert(instance2.colors);  //"red,blue,green"
instance2.sayName();      //"Greg";
instance2.sayAge();       //27
```

> 组合继承是最常用的继承模式

### 存在问题

无论什么情况下，都会调用两次超类型构造函数，一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。子类型包含父类型对象的全部实例属性，但不得不在调用子类型构造函数时重写这些属性。

```js
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age){  
    SuperType.call(this, name);//第二次调用SuperType()
    this.age = age;
}

SubType.prototype = new SuperType();//第一次调用SuperType()
SubType.prototype.constructor=SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```

第一次调用：SubType.prototype获得name和colors属性，来自SuperType的实例属性，位于SubType的原型中
第二次调用：在新对象上创建了实例属性name和colors，屏蔽了原型中的同名属性

![6-6.jpg](https://raw.githubusercontent.com/sunven/picture/master/6-6.jpg)

## 原型式继承

这种方法没有严格意义上的构造函数，借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```js
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
```

在object()函数内部，先创建一个临时构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的新实例。

### Object.create()

ES5中新增Object.create()方法规范化了原型式继承。
参数：一个用作新对象原型的对象和一个新对象定义额外属性的对象

```js
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
```

Object.create()方法的第二个参数与Object.defineProperties()的第二参数格式相同

```js
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = Object.create(person, {
    name: {
        value: "Greg"
    }
});

alert(anotherPerson.name);  //"Greg"
```

## 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

```js
function createAnother(o){
    //通过调用函数创建一个新对象
    var clone=object(o);
    //以某种方式增强这个对象
    o.sayHi=function(){
        alert("hi");
    }
    //返回这个对象
    return o;
}

//使用
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson=createAnother(person);
anotherPerson.sayHi(); //"hi"
```

> 这种方式做不到函数复用而降低效率，类似构造函数模式

## 寄生式组合继承

借用构造函数来继承属性，通过原型链的混成形式来继承方法。
基本思路：不必为了指定子类型的原型而调用父类型的构造函数。

```js
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype);   //创建对象
    prototype.constructor = subType;               //增强对象
    subType.prototype = prototype;                 //指定对象
}
```

inheritPrototype()函数接收两个参数：子类型构造函数和父类型构造函数。

在函数内部：

1. 创建父类型原型的副本
2. 为创建副本添加constructor属性，从而弥补因重写原型失去默认的constructor属性
3. 将新创建的对象（即副本）赋值给予子类型的原型

```js
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age){  
    SuperType.call(this, name);

    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors);  //"red,blue,green,black"
instance1.sayName();      //"Nicholas";
instance1.sayAge();       //29


var instance2 = new SubType("Greg", 27);
alert(instance2.colors);  //"red,blue,green"
instance2.sayName();      //"Greg";
instance2.sayAge();       //27
```

这个例子高效体现了它只调用了一次SuperType构造函数，避免了在SubType.prototype上创建不必要的、多余的属性。原型链还能保持不变。

> 开发人员你认为寄生组合继承是引用类型最理想的继承范式

YUI的YAHOO.lang.extend()方法采用了寄生组合继承模式。
