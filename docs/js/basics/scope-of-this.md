# this 的指向

**this 的值是在执行的时候才能确认，定义的时候不能确认**

## 直接调用

this 指向 window

```javascript
function foo() {
  console.log(this.a) //1
}
var a = 1
foo()
```

## 间接调用

谁调用了函数，谁就是 this

```javascript
function fn() {
  console.log(this)
}
var obj = {
  fn: fn,
}
obj.fn() //this->obj
```

## 类的实例

在构造函数模式中，类中(函数体中)出现的 this.xxx=xxx 中的 this 是当前类的一个实例

```javascript
function CreateJsPerson(name, age) {
  //this是当前类的一个实例p1
  this.name = name //=>p1.name=name
  this.age = age //=>p1.age=age
}
var p1 = new CreateJsPerson('abc', 48)
```

## 箭头函数

箭头函数没有自己的 this，看其外层的是否有函数，如果有，外层函数的 this 就是内部箭头函数的 this，如果没有，则 this 是 window

```javascript
let btn1 = document.getElementById('btn1')
let obj = {
  name: 'kobe',
  age: 39,
  getName: function() {
    btn1.onclick = () => {
      console.log(this) //obj
    }
  },
}
obj.getName()
```

## 改变作用域

call、apply 和 bind：this 是第一个参数

```javascript
function add(c, d) {
  console.log(this.a + this.b + c + d)
}
var a = 10
var b = 20
var o = {
  a: 1,
  b: 3,
}
add(30, 40) // 10 + 20 + 30 + 40 = 100
add.call(o, 5, 7) // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]) // 1 + 3 + 10 + 20 = 34
add.bind(o)(1, 2) // 1 + 3 + 1 + 2 = 7
```

## 寻找 this

![img](https://cdn.nlark.com/yuque/0/2019/png/85676/1553508525563-7f0894c0-f279-41be-826b-fddf05719921.png)

参考：

<https://blog.fundebug.com/2019/03/20/understand-javascript-context-and-stack/>
