# hoisting

#### 变量声明提升



```javascript
console.log(a); // undefined
var a = 10;
```



等同于：



```javascript
var a; //声明 默认值是undefined “准备工作”
console.log(a);
a = 10; //赋值
```



#### 函数声明提升



```javascript
console.log(f1); // function f1(){}
function f1() {} // 函数声明
console.log(f2); // undefined
var f2 = function () {}; // 函数表达式
```



```javascript
function test() {
  foo(); // Uncaught TypeError "foo is not a function"
  bar(); // "this will run!"
  var foo = function () {
    // function expression assigned to local variable 'foo'
    alert("this won't run!");
  };

  function bar() {
    // function declaration, given the name 'bar'
    alert("this will run!");
  }
}
test();
```



- 函数表达式：将var foo提升
- 函数声明：提升了整个函数



**当遇到函数和变量同名且都会被提升的情况，函数声明优先级比较高，因此变量声明会被函数声明所覆盖，但是可以重新赋值**



```javascript
console.log(a); //输出：function a(){ console.log('我是函数') }
function a() {
  console.log("我是函数");
}
var a = "我是变量";
console.log(a); //输出：'我是变量'
```



等同于：



```javascript
function a() {
  console.log("我是函数");
}
var a; //hoisting
console.log(a); //输出：function a(){ console.log('我是函数') }
a = "我是变量"; //赋值
console.log(a); //输出：'我是变量'
```



```javascript
function test(arg) {
  // 1. 形参 arg 是 "hi"
  // 2. 因为函数声明比变量声明优先级高，所以此时 arg 是 function
  console.log(arg);
  var arg = "hello"; // 3.var arg 变量声明被忽略， arg = 'hello'被执行
  function arg() {
    console.log("hello world");
  }
  console.log(arg);
}
test("hi");
/* 输出：
function arg(){
    console.log('hello world') 
    }
hello 
*/
```



参考：

https://blog.fundebug.com/2019/03/20/understand-javascript-context-and-stack/