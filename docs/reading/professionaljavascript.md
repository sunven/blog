# JavaScript 高级程序设计

## 理解对象

### 数据属性

- `Configurable`:表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。默认值为`true`。
- `Enumerable`:表示能否通过 for-in 循环返回属性，默认值`true`。
- `Writable`:表示能否修改属性的值，默认值`true`。
- `Value`:包含这个属性的数据值。读取属性的时候，从这个位置读，写入属性的时候，吧新值保存在这个位置。默认是为`undefined`。

> 要修改属性的默认特性，必须使用 ES5 的 Object.defineProperty()方法，这个方法接受三个参数：属性所在的对象，属性的名字和一个描述符对象。

#### 例子

##### 1 writable,value

```js
var person = {}
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'Nicholas',
})
alert(person.name) //"Nicholas"
person.name = 'Michael'
alert(person.name) //"Nicholas"
```

##### 2 configurable

```
var person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
alert(person.name);//"Nicholas"
delete person.name;
alert(person.name);//"Nicholas"

var person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
//throws error
Object.defineProperty(person, "name", {
    configurable: true,
    value: "Nicholas"
});
```

> 一旦把属性定义为不可配置的，就不能再把它变回可配置了。

### 访问器属性

- `Configurable`:表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。默认值为`true`。
- `Enumerable`:表示能否通过 for-in 循环返回属性，默认值`true`。
- `Get`:在读取属性时调用的函数，默认值`undefined`。
- `Set`:在写入属性时调用的函数，默认值`undefined`。

> 访问器属性必须使用`Object.defineProperty()`来定义

#### 例子

##### 1

```
var book = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(book, "year", {
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
book.year = 2005;
alert(book.edition);   //2
```

- \_year 前面的下划线是一种常用的记号，用于表示只能通过对象方法访问的属性。

- getter 和 setter 可以只指定一种，表示只读或者只写。

### 定义多个属性

`Object.defineProperties()`

#### 例子

```
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function(){
            return this._year;
        },

        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
book.year = 2005;
alert(book.edition);   //2
```

两个数据属性（\_year 和 edition）和一个访问器属性（year）

### 读取属性的特性`Object.getOwnPropertyDescriptor`

```
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function(){
            return this._year;
        },

        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
alert(descriptor.value);          //2004
alert(descriptor.configurable);   //false
alert(typeof descriptor.get);     //"undefined"

var descriptor = Object.getOwnPropertyDescriptor(book, "year");
alert(descriptor.value);          //undefined
alert(descriptor.enumerable);     //false
alert(typeof descriptor.get);     //"function"
```

### 创建对象

#### 工厂模式

```
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");

person1.sayName();   //"Nicholas"
person2.sayName();   //"Greg"
```

> 工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。

### 构造函数模式

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.sayName();   //"Nicholas"
person2.sayName();   //"Greg"
```

#### 与工厂模式的不同之处

- 没有显示的创建对象
- 直接将属性和方法赋给了 this 对象
- 没有 return 语句

> 按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。

创建一个新实例，必须使用 new 操作符，以这种方式调用构造函数会经历 4 个步骤：

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性）；
4. 返回新对象。

#### `constructor`属性

```
alert(person1.constructor == Person);  //true
alert(person2.constructor == Person);  //true
```

constructor 属性最初是用来标识对象类型的。但是检测对象类型，还是 instanceof 操作符更可靠一些

```
alert(person1 instanceof Object);  //true
alert(person1 instanceof Person);  //true
alert(person2 instanceof Object);  //true
alert(person2 instanceof Person);  //true
```

> 创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正式构造函数模式胜过工厂模式的地方

#### 将构造函数当做函数

构造函数与其他函数的唯一区别，就是调用他们的方式不同。任何函数，只要通过 new 操作符调用，就可以当做构造函数；不通过 new 操作符调用，那就和普通函数一样。

```
//当做构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName();   //"Nicholas"

//作为普通函数使用
Person("Greg", 27, "Doctor");  //adds to window
window.sayName();   //"Greg"

//在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName();    //"Kristen"
```

#### 构造函数的问题

##### 缺点

每个方法都要在每个实例上重新创建一遍，每个实例上的同名方法是不相等的。

```
alert(person1.sayName == person2.sayName);  //false
```

##### 解决方法

把函数定义转义到构造函数外部

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName(){
    alert(this.name);
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

alert(person1.sayName == person2.sayName);  //true
```

##### 还是存在的问题

sayName 方法只被 Person 的实例调用，但却定义成了全局函数，这样似乎有些大材小用；如果对象需要定义很多方法，那么就需要更多的全局函数，于是，自定义的应用类型就没有封装性可言了。

##### 解决方法

原型模式

### 原型模式

我们创建的每一个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

```
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
person1.sayName();   //"Nicholas"

var person2 = new Person();
person2.sayName();   //"Nicholas"

alert(person1.sayName == person2.sayName);  //true
```

与构造函数不同的是，新对象的这些属性和方法是由所有实例共享的。即：`person1.sayName == person2.sayName`

#### 理解原型对象

1. 只要创建一个新函数，就会为改函数创建一个 prototype 属性，这个属性指向函数的原型对象。
2. 默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。即：`Person.prototype.constructor`指向`Person`。
3. 当调用构造与函数创建一个实例后，该实例内部将包含一个指针（内部属性），指向构造函数的原型对象。即：`[[Prototype]]`，浏览器中的`_proto_`。
4. 这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。

![](https://raw.githubusercontent.com/sunven/picture/master/6-1.png)

虽然无法访问到[[Prototype]]，但是可以通过 isPrototypeOf()方法来确定对象之间是否存在这种关系。

```
alert(Person.prototype.isPrototypeOf(person1));  //true
alert(Person.prototype.isPrototypeOf(person2));  //true
```

ES5 中，有一个 Object.getProtoOf()方法，在所有支持的实现中，返回[[Prototype]]的值。

```
if (Object.getPrototypeOf){
    alert(Object.getPrototypeOf(person1) == Person.prototype);  //true
    alert(Object.getPrototypeOf(person1).name);  //"Nicholas"
}
```

同名属性覆盖原型属性

```
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = "Greg";
alert(person1.name);   //"Greg" 来自实例
alert(person2.name);   //"Nicholas" 来自原型
```

删除实例属性，重新访问原型属性

```
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.name = "Greg";
alert(person1.name);   //"Greg" 来自实例
alert(person2.name);   //"Nicholas" 来自原型

delete person1.name;
alert(person1.name);   //"Nicholas" 来自原型
```

使用 hasOwnProperty()方法可以检测一个属性时存在实例中，还是原型中。这个方法只在给定属性存在于对象实例中时，才会返回 true。

```
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

alert(person1.hasOwnProperty("name"));  //false

person1.name = "Greg";
alert(person1.name);   //"Greg" 来自实例
alert(person1.hasOwnProperty("name"));  //true

alert(person2.name);   //"Nicholas" 来自原型
alert(person2.hasOwnProperty("name"));  //false

delete person1.name;
alert(person1.name);   //"Nicholas" 来自原型
alert(person1.hasOwnProperty("name"));  //false
```

> ES5 的`Object.getOwnPropertyDescriptor()`方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用`Object.getOwnPropertyDescriptor()`方法

#### 原型与 in 操作符

有两种方式使用 in 操作符：

##### 1. 单独使用

无论属性存在于实例还是原型，都会返回 true。

```
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

alert(person1.hasOwnProperty("name"));  //false
alert("name" in person1);  //true

person1.name = "Greg";
alert(person1.name);   //"Greg" 来自实例
alert(person1.hasOwnProperty("name"));  //true
alert("name" in person1);  //true

alert(person2.name);   //"Nicholas" 来自原型
alert(person2.hasOwnProperty("name"));  //false
alert("name" in person2);  //true

delete person1.name;
alert(person1.name);   //"Nicholas" - 来自原型
alert(person1.hasOwnProperty("name"));  //false
alert("name" in person1);  //true
```

使用`hasOwnProperty()`和`in`判断属性存在于对象还是原型

```
function hasPrototypeProperty(object,name){
    return !object.hasOwnProperty(name)&&(name in object);
}
```

##### 2. 在 for-in 循环中使用

返回可枚举的属性

```
var o = {
    toString : function(){
        return "My Object";
    }
}

for (var prop in o){
    if (prop == "toString"){
        alert("Found toString");
    }
}
```

解释：toString()方法屏蔽了原型中的 toString()方法，所以 for-in 可见。

##### Object.keys()

接收一个对象作为参数，返回包含所有可枚举属性的字符串数组

```
function Person(){
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var keys = Object.keys(Person.prototype);
alert(keys);   //"name,age,job,sayName"

var p1=new Person();
p1.name="Rob";
p1.age=31;
var keys=Object.keys(p1);
alert(keys);    //"name,age"
```

##### Object.getOwnPropertyNames()

返回所有实例属性

```js
function Person() {}

Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function() {
  alert(this.name)
}

var keys = Object.getOwnPropertyNames(Person.prototype)
alert(keys) //"constructor,name,age,job,sayName"
```

#### 更简单的原型语法

对象字面量的形式

```
function Person(){
}

Person.prototype = {
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

var friend = new Person();

alert(friend instanceof Object);  //true
alert(friend instanceof Person);  //true
alert(friend.constructor == Person);  //false
alert(friend.constructor == Object);  //true
```

##### 不同之处

constructor 属性不再指向 Person 了。
这种方式本质上重写了 pertotype 对象，因此 constructor 属性就变成了新对象的 constructor 属性（指向 Object 构造函数）

##### 解决方法

```js
function Person() {}

Person.prototype = {
  constructor: Person,
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName: function() {
    alert(this.name)
  },
}

var friend = new Person()

alert(friend instanceof Object) //true
alert(friend instanceof Person) //true
alert(friend.constructor == Person) //true
alert(friend.constructor == Object) //false
```

这种方法重设 constructor 属性会导致它的 Enumerable 特性被设置为 true，默认情况下，原生的 constructor 属性时不可枚举的。

#### 原型的动态性

实例与原型之间的关系是松散的，因为实例与原型之间的连接只不过是一个指针。

如果重写了整个原型对象，就等于切断了构造函数与最初原型之间的联系。

实例中指针仅指向原型，而不指向构造函数。

```
function Person(){
}

var friend = new Person();

Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

friend.sayName();   //error
```

![](https://raw.githubusercontent.com/sunven/picture/master/6-1.png)

重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系，他们引用的任然是最初的原型。

#### 原生对象的原型

所有原生引用类型（Object，Array，String 等）都在其构造函数的原型上定义了方法

```
alert(typeof Array.prototype.sort);         //"function"
alert(typeof String.prototype.substring);   //"function"
```

修改原生对象的原型，但不推荐

```
String.prototype.startsWith = function (text) {
    return this.indexOf(text) == 0;
};

var msg = "Hello world!";
alert(msg.startsWith("Hello"));   //true
```

#### 原型对象的问题

原型中的所有属性是被很多实例共享的。

```
function Person(){
}

Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function () {
        alert(this.name);
    }
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");

alert(person1.friends);    //"Shelby,Court,Van"
alert(person2.friends);    //"Shelby,Court,Van"
alert(person1.friends === person2.friends);  //true
```

### 组合使用构造函数模式与原型模式

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。

```
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constructor: Person,
    sayName : function () {
        alert(this.name);
    }
};

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");

alert(person1.friends);    //"Shelby,Court,Van"
alert(person2.friends);    //"Shelby,Court"
alert(person1.friends === person2.friends);  //false
alert(person1.sayName === person2.sayName);  //true
```

### 动态原型模式

把所有信息都封装在构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数与原型的优点。

```
function Person(name, age, job){
    //properties
    this.name = name;
    this.age = age;
    this.job = job;

    //methods
    if (typeof this.sayName != "function"){

        Person.prototype.sayName = function(){
            alert(this.name);
        };

    }
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```

注释 methods 下面的代码只会在初次调用构造函数的时候才会执行，此后，原型已经完成初始化。之后对原型的修改，也能立即在所有的实例中得到反映。

> 使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，就会切断现有实例与新原型之间的联系。

### 寄生构造函数模式

这种模式基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象。表面上看很像构造函数。

```
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();  //"Nicholas"
```

除了使用 new 操作符，跟工厂模式又是一样的。

这个模式可以用来为对象创建构造函数

为 Array 添加一个额外的方法，而不修改 Array 的构造函数

```
function SpecialArray(){

    //create the array
    var values = new Array();

    //add the values
    values.push.apply(values, arguments);

    //assign the method
    values.toPipedString = function(){
        return this.join("|");
    };

    //return it
    return values;
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"

alert(colors instanceof SpecialArray);
```

#### 特点

返回的对象与构造函数或者与构造函数的原型属性之间没有关系。

### 稳妥构造函数模式

#### 特点

1. 没有公共属性
2. 新创建对象的实例不引用 this
3. 不使用 new 操作符调用构造函数

```
function Person(name,age,job){
    //创建要返回的对象
    var o=new Object();
    //可以在这里定义一些私有变量核函数

    //添加方法
    o.sayName=function(){
        alert(name);
    }

    //返回对象
    return o;
}

var friend=new Person("Tom",20,"abc");
friend.sayName();   //"Tom"
```

除了使用 sayName()方法，没有其他方法访问 name 的值。即变量 friend 中保存的是一个稳妥对象。
