
# 习题

## 1、完成assertProp方法，准确的判断出value的类型是type

```js
function assertProp(type, value) {
  // ...
}
// 以下用例应该返回 true
assertProp(String, 'a')
assertProp(String, new String('a'))
assertProp(Array, [1, 2, 3])
assertProp(Object, { name: '1' })
function Person() {}
assertProp(Person, new Person())
```

### 要点

- 包装类型（String,Number...)、自定义构造函数（类）需要用instanceof
- 基本类型用Object.prototype.toString

### 实现1

```js
function assertProp(type, value) {
  if(value instanceof type){
    return  true
  }else{
    return type(value).valueOf() === value
  }
}
```

### 实现2

```js
function assertProp(type, value) {
    if(value instanceof type || (type.name === Object.prototype.toString.call(value).slice(8, -1))) {
      console.log(value, true)
        return true;
    }else {
      console.log(value, false)
      return false;
    }
}
```

## 2、补充代码，使得进入if (a == 1 && a == 2 && a == 3)

```js
// ...
// if 前补充代码
// ...
if (a == 1 && a == 2 && a == 3) {
  // go here
}
```

### 要点

- Symbol.toPrimitive
- valueOf
- toString

### 实现1

```js
const a = []
var id = 1
a.toString = function(){
  return id++
}
// ...
if (a == 1 && a == 2 && a == 3) {
  // go here
  console.log('hello world')
}
```

### 实现2

```js
const a = {
  i: 0,
  valueOf(){
    this.i++;
    return this.i;
  }
}
// ...
if (a == 1 && a == 2 && a == 3) {
  // go here
}
```

### 实现3

```js
let a = {
    value: 0,
    [Symbol.toPrimitive](hint) {
        if (hint === 'number' || hint === 'default') {
            this.value++
            return this.value
        }
        if (hint === 'string') {
            return `${this.value}`;
        }
        return true;
    },
}
if (a == 1 && a == 2 && a == 3) {
    console.log("hello, a!")
}
```

## 3、实现一个判断零值相等的方法，即：满足同值相等，且+0 和-0 是相等的

### 要点

- NaN 与 NaN 相等
- +0 和-0 相等

```js
function zeroEqual(x, y) {
  if (x === y) {
    return true;
  } else {
    return x !== x && y !== y;
  }
}
```

## 4、箭头函数与普通函数有什么区别？写一个例子来体现将普通函数替换成箭头函数后调用得到的结果不同

### 要点

- 没有自己的this，arguments，super或new.target
- 多往上找一层this，就是箭头函数中this的指向
- 箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数
- 作用：更简短的函数并且不绑定this

```js
const obj = {
  a: 20,
  func1: function(){
    console.log(this.a);
  },
  func2: ()=>{
    console.log(this.a);
  }
}

obj.func1(); // 20
obj.func2();  // undefined
```

## 5、举例你在使用call(apply),bind的场景

### 要点

- call(apply) 会立即执行该方法
- bind会返回一个函数（修正函数的this，但不想立即调用）

```javascript
// 使用call实现继承
function Student(name, age) {
  this.name = name;
  this.age = age;
}

function XiaoMing() {
  Student.call(this,"xiaoming", 18);
}

const xiaoming = new XiaoMing();
console.log(xiaoming.name, xiaoming.age); 

// apply 可以求最大值最小值
const list = [1,3,4,5,6];
const max = Math.max.apply(Math, list)
console.log(max)

// 使用bind将函数的this强指向另一个对象 
const func = function () {
  console.log(this.name);
}

 const xFunc = func.bind(xiaoming);
 xFunc()  
```
