# 作用域

根据名称查找变量的一套规则

## 作用域链

引擎从当前的执行作用域开始查找变量，如果找不到， 就向上一级继续查找。当抵达最外层的全局作用域时，无论找到还是没找到，查找过程都 会停止

LHS查询

- 赋值操作的目标是谁（LHS）

- 如果查找的目的是对 变量进行赋值，那么就会使用 LHS 查询

RHS查询

- 谁是赋值操作的源头 （RHS）
- 如果目的是获取变量的值，就会使用 RHS 查询

```js
function foo(a) {
	var b = a;
	return a + b;
}
var c = foo( 2 ); 
// 1. 找出所有的 LHS 查询（这里有 3 处！） c = ..;、a = 2（隐式变量分配）、b = .. 
// 2. 找出所有的 RHS 查询（这里有 4 处！）foo(2..、= a;、a ..、.. b
```



为何

```js
function foo(a) {
  console.log(a + b)
  b = a
}
foo(2)
```

如果 RHS 查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出 ReferenceError 异常



执行 LHS 查询时，如果在顶层（全局作用域）中也无法找到目标变量， 全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎，前提是程序运行在非 “严格模式”下。

```js
function foo(a) { 
  b = a; 
}
foo(2);
console.log(b)
```

严格模式

<https://stackoverflow.com/questions/11677452/possible-to-enable-strict-mode-in-firebug-and-chromes-console>

```js
function foo(a) {
  'use strict'
  b = a
}
foo(2)
console.log(b)
```



```js
function foo(a) {'use strict'; b = a } foo(2); console.log(b);
```

- 一行
- 页面

```js
function foo(a) {
  b(a)
}
foo(2)
```



如果 RHS 查询找到了一个变量，但是你尝试对这个变量的值进行不合理的操作， 比如试图对一个非函数类型的值进行函数调用，或着引用 null 或 undefined 类型的值中的 属性，那么引擎会抛出另外一种类型的异常，叫作 TypeError

### 总结

- ReferenceError 同作用域判别失败相关

- TypeError 则代表作用域判别成功了，但是对结果的操作是非法或不合理的



The directive does not have the attribute value which is valid as LHS.

ast

## 执行上下文

- 全局代码— 首次执行代码的默认环境。
- 函数代码——每当执行流程进入函数体时。
- eval 代码- 要在内部 eval 函数中执行的文本。

![img](./images/0_oXKqZjkURzEYXoSO.jpg)

## 词法作用域

静态作用域

动态作用域（this）

让词法作用 域根据词法关系保持书写时的自然关系不变，是一个非常好的最佳实践

词法作用域就是定义在词法阶段的作用域,换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域 不变（大部分情况下是这样的）

## 函数作用域

用var声明的变量，自动提升到函数作用域顶部

属于这个函数的全部变量都可以在整个函数的范围内使用及复 用（事实上在嵌套的作用域中也可以使用）。这种设计方案是非常有用的，能充分利用 JavaScript 变量可以根据需要改变值类型的“动态”特性。



## 块级作用域

使用let声明的变量，范围是块级作用域





## hosting



## 最佳实践

不使用var

const优先，let次之