# 《JavaScript设计模式》面向对象编程

## 封装

```js
var Students = function (id, name, age) {
  this.id = id;
  this.name = name;
  this.age = age;
}

Students.prototype = {
  getStuInfo: function () {
  }
};
```

### 通过this添加的属性方法和在prototype中添加的有什么区别？

- 通过prototype继承的方法并不是对象自身的所以我们每次通过类创建一个新对象时原来的这些属性和方法不会再次创建
- 通过this添加的属性、方法是在当前对象上添加的，每次创建新对象this所指向的属性和方法都会得到相应的创建

### constructor

constructor是一个属性，当创建一个函数或者对象时都会为其创建一个原型对象prototype，在prototype对象中又会像函数中创建this一样创建一个constructor属性，那么constructor属性指向的就是拥有整个原型对象的函数或对象

### 创建对象的安全模式

```js
var Book = function (title, time, type) {
  if (this instanceof Book) {
    this.title = title;
    this.tiem = time;
    this.type = type;
  } else {
    return new Book(title, time, type);
  }
}

var book1 = new Book('', '', '');
var book2 = Book('', '', '');
```

## 继承

### 类式继承

```js
function ParentClass() {
  this.perentValue = true;
}
ParentClass.prototype.getPerentValue = function () {
  return this.perentValue;
};

function ChildClass() {
  this.childValue = false;
}
ChildClass.prototype = new ParentClass();
ChildClass.prototype.getChlidValue = function () {
  return this.childValue;
}
```

#### 为什么第一个类的实例赋值给了第二个类的原型？

- 类的原型对象就是为类的原型添加公有属性和添加公有方法，但是类不能直接访问这些属性和方法，必须通过原型prototype来访问。当我们实例化一个父类的时候，新创建的对象复制了父类构造函数里的属性和方法，并且将原型`__proto__`指向了父类的原型对象
- `prototype`是函数的内置属性，`__proto__`是对象的内置属性

#### 问题

- 不同实例影响公共属性
- 由于子类实现的继承是其原型prototype对父类实例化实现的，所以在创建父类的时候，是无法向父类传递参数的，因而在实例化父类的时候也无法对父类的构造函数类的属性进行初始化

### 构造函数继承

```js
function ParentClass(id) {
  //引用类型的公有属性
  this.parentValue = ['C#', 'JAVA', 'PHP'];
  //值类型公有属性
  this.id = id;
}
ParentClass.prototype.showParents = function () {
  console.log(this.parentValue);
}

function ChildClass(id) {
  //继承父类
  ParentClass.call(this, id);
}
```

#### 问题

- 这种类型的继承不涉及到原型prototype，所以父类的原型方法也不会被子类继承

### 组合继承

```js
function ParentClass(id) {
  //引用类型的公有属性
  this.parentValue = ['C#', 'JAVA', 'PHP'];
  //值类型公有属性
  this.id = id;
}
ParentClass.prototype.getParentValue = function () {
  console.log(this.id);
}

function ChildClass(id, childValue) {
  //通过构造函数继承，继承父类的id属性
  ParentClass.call(this, id);
  //子类新增公用属性
  this.childValue = childValue;
}
ChildClass.prototype = new ParentClass();
ChildClass.prototype.getChildValue = function () {
  console.log(this.childValue);
}
```

#### 问题

- 用构造器执行了一遍父类的构造函数，在实现子类原型的类式继承又调用了一遍父类的构造函数，因此父类构造函数被调用两次，所以还不是最完美的继承方式

### 原型式继承

```js
function inheritObject(o) {
  //声明一个过渡函数对象
  function Obj() {}
  //过渡对象的原型继承父对象
  Obj.prototype = o;
  //返回过渡对象的一个实例，该实例的原型继承了父对象
  return new Obj();
}
var Students = {
  admissionTime: "2017",
  hobby: ["唱歌", "画画"]
};
var student1 = inheritObject(Students);
student1.admissionTime = "2016";
student1.hobby.push("游泳");

var student2 = inheritObject(Students);
student2.admissionTime = "2015";
student2.hobby.push("看书");
```

> Object.create()方法就是原型式继承。

#### 问题

- 不同实例影响公共属性

### 寄生式继承

```js
function CreateStu(obj) {
  //通过原型式继承方式创建新对象
  var stu = inheritObject(obj);
  //扩展新对象
  stu.getAdmissionTime = function () {
    console.log(stu.admissionTime);
  };
  //返回拓展后的新对象
  return stu;
}
var student1 = CreateStu(Students);
student1.admissionTime = "2016";
student1.hobby.push("游泳");

var student2 = CreateStu(Students);
student2.admissionTime = "2015";
student2.hobby.push("看书");
```

#### 问题

- 不同实例影响公共属性

### 寄生组合式继承

```js
function inheritObject(o) {
  //声明一个过渡函数对象
  function Obj() {}
  //过渡对象的原型继承父对象
  Obj.prototype = o;
  //返回过渡对象的一个实例，该实例的原型继承了父对象
  return new Obj();
}

function inheritPrototype(ChildClass, ParentClass) {
  //复制一份父类的原型保存在变量中
  var parent = inheritObject(ParentClass.prototype);
  //修正因为重写子类原型导致子类的constructor属性被修改
  parent.constructor = ChildClass;
  //设置子类的原型
  ChildClass.prototype = parent;
}

function ParentClass(id) {
  //引用类型的公有属性
  this.parentValue = ['C#', 'JAVA', 'PHP'];
  //值类型公有属性
  this.id = id;
}
ParentClass.prototype.getParentValue = function () {
  console.log(this.parentValue);
}

function ChildClass(id, childValue) {
  //构造函数式继承父类
  ParentClass.call(this, id);
  //子类新增属性
  this.childValue = childValue;
}
inheritPrototype(ChildClass, ParentClass);
ChildClass.prototype.getChildValue = function () {
  console.log(this.time);
}
var test1 = new ChildClass(1, "张三");
var test2 = new ChildClass(2, "李四");
test1.parentValue.push("C++");
console.log(test1.parentValue); //["C#", "JAVA", "PHP", "C++"]
console.log(test2.parentValue); //["C#", "JAVA", "PHP"]
test1.getParentValue(); //["C#", "JAVA", "PHP", "C++"]
test1.getChildValue(); //张三
test2.getParentValue(); //["C#", "JAVA", "PHP"]
test2.getChildValue(); //李四
```

子类再想添加原型方法必须通过prototype对象，通过点语法的形式一个一个添加方法，否则直接赋予对象就会覆盖掉从父类原型继承的对象
