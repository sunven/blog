

# 这段代码打印什么

## 具名自执行函数的变量为只读属性，不可修改

```javascript
var b = 10;
(function b() {
  b = 20;
  //1.内部作用域，会先找到function b 的b
  //2.找到后赋值，但由于具名自执行函数的变量为只读属性，不可修改，类似与这个b时const，所以b=20无效
  //3.最后b还是个function
  console.log(b);//f b(){...}
})();

//对照参考1
function a() {
  a = 20;
  console.log(a);
}
a();//20

//对照参考2
var a = 10;
function a() {
  a = 20;
  console.log(a);
}
a();//Uncaught TypeError: a is not a function
//函数声明优先于变量声明,a已不再是方法
```



## getName()输出什么？

```javascript
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  //提升后被console.log(4);覆盖
  console.log(5);
}

Foo.getName(); //2
getName(); //4
Foo().getName(); //1 Foo()返回得this就是window
getName(); //1 上一句中覆盖了外面得getName
new Foo.getName(); //2 打印2 还会返回getName的实例
new Foo().getName(); //3 调用原型上的getName方法
new new Foo().getName(); //3 打印3 还会返回原型上getName的实例
```

