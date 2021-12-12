# JavaScript数据类型

## 一、数据类型

基本类型（值类型或者原始类型）：Number、Boolean、String、NULL、Undefined、Symbol(ES6)

引用类型：Object、Array、Function、Date等

| 分类     | 类型                                                  | 内存中的位置 |
| -------- | ----------------------------------------------------- | ------------ |
| 基本类型 | number、boolean、string、null、undefined、symbol(ES6) | 栈（stack）  |
| 引用类型 | Object（Array、Function、Date等）                     | 堆（heap）   |

栈内存：栈的优势是，存取速度比堆要快，仅次于寄存器，栈数据可以共享。但缺点是，存在栈中的数据大小与生存期必须是确定的，缺乏灵活性。栈中主要存放一些基本类型的变量（,int, short, long, byte, float, double, boolean, char）和对象句柄。栈有一个很重要的特殊性，就是存在栈中的数据可以共享。

堆内存：堆允许程序在运行时动态地申请某个大小的内存空间。

### bool

#### 假值

"",0,-0,NaN,null,undefined,false

## 二、类型检测

### typeof

返回一个字符串，表示未经计算的操作数的类型

```javascript
// 数值
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number'; // Number 会尝试把参数解析成数值

typeof 42n === 'bigint';

// 字符串
typeof `template literal` === 'string';
typeof String(1) === 'string'; // String 将任意值转换为字符串，比 toString 更安全

// 布尔值
typeof Boolean(1) === 'boolean'; // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 

// 对象
typeof {a: 1} === 'object';

// 使用 Array.isArray 或者 Object.prototype.toString.call
// 区分数组和普通对象
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';
typeof /regex/ === 'object'; // 历史结果请参阅正则表达式部分

// 下面的例子令人迷惑，非常危险，没有用处。避免使用它们。
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';

// 函数
typeof function() {} === 'function';
typeof class C {} === 'function'
typeof Math.sin === 'function';
```

- 除 Function 外的所有构造函数的类型都是'object'
- 'object'typeof null === "object"

- typeof document.all === 'undefined';
- 在其被声明之前对块中的 `let` 和 `const` 变量使用 `typeof` 会抛出一个 ReferenceError

### instanceof

用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

object instanceof constructor

object:实例

constructor：构造函数

### Object.prototype.toString()

表示该对象的字符串

在**toString**方法被调用时,会执行下面的操作步骤:

1. 如果**this**的值为**undefined**,则返回`"[object Undefined]"`.
2. 如果**this**的值为**null**,则返回`"[object Null]"`.

1. 让*O*成为调用ToObject(**this)**的结果.
2. 让*class*成为*O*的内部属性[[Class]]的值.

1. 返回三个字符串**"[object ",** *class*, 以及 **"]"**连接后的新字符串



**Object.prototype.toString.call([]).slice(8, -1) === "Array";**