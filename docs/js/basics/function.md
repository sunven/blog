# 函数

## 一、函数定义

### 1. 函数表达式

```javascript
//这个函数返回传入参数值的平方
var square = function(x) {
  return x * x
}
```

#### 使用

```javascript
//函数表达式可以包含名称，这在递归时很有用
var f = function fact(x) {
    if (x < = 1) return 1;
    else return x * fact(x - 1);
};
//函数表达式也可以作为参数传给其他函数
data.sort(function(a, b) {
    return a - b;
});
//函数表达式有时定义后立即调用
var tensquared = (function(x) {
    return x * x;
}(10));
```

### 2. 函数声明

```javascript
//这个函数返回传入参数值的平方
function square(x) {
  return x * x
}
```

- 以表达式方式定义的函数，函数的名称是可选的。
- 一条函数声明语句实际上声明了一个变量，并把一个函数对象赋值给它。相对而言，定义函数表达式时并没有声明一个变量。函数可以命名，就像上面的阶乘函数，它需要一个名称来指代自己。
- 如果一个函数定义表达式包含名称，函数的局部作用域将会包含一个绑定到函数对象的名称。实际上，函数的名称将成为函数内部的一个局部变量。
- 通常而言，以表达式方式定义函数时都不需要名称，这会让定义它们的代码更为紧凑。
- 函数定义表达式特别适合用来定义那些只会用到一次的函数，比如上面展示的最后两个例子。

### 3. “声明提前？”

函数声明语句“被提前”到外部脚本或外部函数作用域的顶部，所以以这种方式声明的函数，可以被在它定义之前出现的代码所调用。不过，以表达式定义的函数就另当别论了，为了调用一个函数，必须要能引用它，而要使用一个以表达式方式定义的函数之前，必须把它赋值给一个变量。**变量的声明提前了，但给变量赋值是不会提前的**，所以，以表达式方式定义的函数在定义之前无法调用。

## 二、函数调用

### 1. 作为函数

```javascript
square(2)
```

调用上下文（this 的值）是全局对象。然而，在严格模式下，调用上下文则是 undefined。
以函数形式调用的函数通常不使用 this 关键字。

"this"可以用来判断当前是否是严格模式。

```javascript
//定义并调用一个函数来确定当前脚本运行时是否为严格模式
var strict = (function() {
  return !this
})()
```

### 2. 作为方法

```javascript
o.m(2, 3)
//使用方括号
o['m'](2, 3)
```

方法调用和函数调用有一个重要的区别，即：调用上下文。属性访问表达式由两部分组成：一个对象（本例中的 o）和属性名称（m）。在像这样的方法调用表达式里，对象 o 成为调用上下文，函数体可以使用关键字 this 引用该对象
任何函数只要作为方法调用实际上都会传入一个隐式的实参——这个实参是一个对象，方法调用的母体就是这个对象

#### 方法链

当方法并不需要返回值时，最好直接返回 this。如果在设计的 API 中一直采用这种方式（每个方法都返回 this），使用 API 就可以进行“链式调用”

```javascript
$(':header')
  .map(function() {
    return this.id
  })
  .get()
  .sort()
```

**不要将方法的链式调用和构造函数的链式调用混为一谈**

- this 是一个关键字，不是变量，也不是属性名。不允许给 this 赋值。

- this 没有作用域的限制，嵌套的函数不会从调用它的函数中继承 this。
- 如果嵌套函数作为方法调用，其 this 的值指向调用它的对象。如果嵌套函数作为函数调用，其 this 值不是全局对象（非严格模式下）就是 undefined（严格模式下）。
- 如果你想访问这个外部函数的 this 值，需要将 this 的值保存在一个变量里，这个变量和内部函数都同在一个作用域内。通常使用变量 self 来保存 this

### 3. 作为构造函数

```javascript
$(':header')
  .map(function() {
    return this.id
  })
  .get()
  .sort()
```

如果函数或者方法调用之前带有关键字 new，它就构成构造函数调用
构造函数调用创建一个新的空对象，这个对象继承自构造函数的 prototype 属性。构造函数试图初始化这个新创建的对象，并将这个对象用做其调用上下文，因此构造函数可以使用 this 关键字来引用这个新创建的对象。注意，尽管构造函数看起来像一个方法调用，它依然会使用这个新对象作为调用上下文。也就是说，在表达式 new o.m()中，调用上下文并不是 o。

### 4. 通过它们的 call()和 apply()方法间接调用

任何函数可以作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。两个方法都可以指定调用的实参。call()方法使用它自有的实参列表作为函数的实参，apply()方法则要求以数组的形式传入参数。

## 三、函数的实参和形参

### 1. 可选形参

### 2. 可变长的实参列表：实参对象

arguments 并不是真正的数组，它是一个实参对象。每个实参对象都包含以数字为索引的一组元素以及 length 属性，但它毕竟不是真正的数组

```javascript
function f(x) {
  console.log(x) //输出实参的初始值
  arguments[0] = null //修改实参数组的元素同样会修改x的值
  console.log(x) //输出"null"
}
```

#### callee 和 caller 属性

caller 是非标准的，但大多数浏览器都实现了这个属性，它指代调用当前正在执行的函数的函数。通过 caller 属性可以访问调用栈。callee 属性在某些时候会非常有用，比如在匿名函数中通过 callee 来递归地调用自身

```javascript
var factorial=function(x){
    if(x＜=1)return 1;
    return x*arguments.callee(x-1);
};
```

### 3. 将对象属性用做实参

### 4. 实参类型

## 四、作为值的函数

### 1. 自定义函数属性

JavaScript 中的函数并不是原始值，而是一种特殊的对象，也就是说，函数可以拥有属性。当函数需要一个“静态”变量来在调用时保持某个值不变，最方便的方式就是给函数定义属性，而不是定义全局变量

```javascript
//初始化函数对象的计数器属性
//由于函数声明被提前了，因此这里是可以在函数声明
//之前给它的成员赋值的
uniqueInteger.counter = 0 //每次调用这个函数都会返回一个不同的整数
//它使用一个属性来记住下一次将要返回的值
function uniqueInteger() {
  return uniqueInteger.counter++ //先返回计数器的值，然后计数器自增1
}
```

```javascript
//计算阶乘，并将结果缓存至函数的属性中
function factorial(n) {
  if (!(n in factorial))
    //如果没有缓存结果
    factorial[n] = n * factorial(n - 1) //计算结果并缓存之
  return factorial[n] //返回缓存结果
}
factorial[1] = 1 //初始化缓存以保存这种基本情况
```

## 五、作为命名空间的函数

立即执行函数

## 六、闭包

理解：

- 理解闭包首先要了解嵌套函数的词法作用域规则—JavaScript 函数的执行用到了作用域链，这个作用域链是函数定义的时候创建的
- 理解闭包：函数定义时的作用域链到函数执行时依然有效。

特性：

- 函数对象可以通过作用域链相互关联起来，函数体内部的变量都可以保存在函数作用域内
- 它们可以捕捉到局部变量（和参数），并一直保存下来，看起来像这些变量绑定到了在其中定义它们的外部函数。

当函数返回的时候，就从作用域链中将这个绑定变量的对象删除。如果不存在嵌套的函数，也没有其他引用指向这个绑定对象，它就会被当做垃圾回收掉。如果定义了嵌套的函数，每个嵌套的函数都各自对应一个作用域链，并且这个作用域链指向一个变量绑定对象。但如果这些嵌套的函数对象在外部函数中保存下来，那么它们也会和所指向的变量绑定对象一样当做垃圾回收。但是如果这个函数定义了嵌套的函数，并将它作为返回值返回或者存储在某处的属性里，这时就会有一个外部引用指向这个嵌套的函数。它就不会被当做垃圾回收，并且它所指向的变量绑定对象也不会被当做垃圾回收

```javascript
var scope = 'global scope' //全局变量
function checkscope() {
  var scope = 'local scope' //局部变量
  function f() {
    return scope
  } //在作用域中返回这个值
  return f()
}
checkscope() //=＞"local scope"

var scope = 'global scope' //全局变量
function checkscope() {
  var scope = 'local scope' //局部变量
  function f() {
    return scope
  } //在作用域中返回这个值
  return f
}
checkscope()() //=＞"local scope"
```

### 1. 实现闭包

#### example1

改写 uniqueInteger()函数

```javascript
var uniqueInteger = (function() {
  //定义函数并立即调用
  var counter = 0 //函数的私有状态
  return function() {
    return counter++
  }
})()
```

#### example2

函数的私有变量不是只能用在一个单独的闭包内，在同一个外部函数内定义的多个嵌套函数也可以访问它，这多个嵌套函数都共享一个作用域链

```javascript
function counter() {
  var n = 0
  return {
    count: function() {
      return n++
    },
    reset: function() {
      n = 0
    },
  }
}
//创建两个计数器
var c = counter(),
  d = counter()
c.count() //=＞0
d.count() //=＞0:它们互不干扰
c.reset() //reset()和count()方法共享状态
c.count() //=＞0:因为我们重置了c
d.count() //=＞1:而没有重置d
```

#### example3

利用了闭包实现 getter 和 setter

```javascript
function counter(n) {
  //函数参数n是一个私有变量
  return {
    //属性getter方法返回并给私有计数器var递增1
    get count() {
      return n++
    }, //属性setter不允许n递减
    set count(m) {
      if (m >= n) {
        n = m
      } else {
        alert('error')
      }
    },
  }
}
var c = counter(1000)
c.count //=＞1000
c.count //=＞1001
c.count = 2000
c.count //=＞2000
c.count = 2000 //=＞Error!
```

#### example4

利用闭包实现的私有属性存取器方法

```javascript
//这个函数给对象o增加了属性存取器方法
//方法名称为get＜name＞和set＜name＞。如果提供了一个判定函数
//setter方法就会用它来检测参数的合法性，然后在存储它
//如果判定函数返回false，setter方法抛出一个异常
//
//这个函数有一个非同寻常之处，就是getter和setter函数
//所操作的属性值并没有存储在对象o中
//相反，这个值仅仅是保存在函数中的局部变量中
//getter和setter方法同样是局部函数，因此可以访问这个局部变量
//也就是说，对于两个存取器方法来说这个变量是私有的
//没有办法绕过存取器方法来设置或修改这个值
function addPrivateProperty(o, name, predicate) {
    var value; //这是一个属性值
    //getter方法简单地将其返回
    o["get" + name] = function() {
        return value;
    }; //setter方法首先检查值是否合法，若不合法就抛出异常
    //否则就将其存储起来
    o["set" + name] = function(v) {
        if (predicate＆＆!predicate(v))
            throw Error("set" + name + ":invalid value" + v);
        else
            value = v;
    };
}
//下面的代码展示了addPrivateProperty()方法
var o = {}; //设置一个空对象
//增加属性存取器方法getName()和setName()
//确保只允许字符串值
addPrivateProperty(o, "Name", function(x) {
    return typeof x == "string";
});
o.setName("Frank"); //设置属性值
console.log(o.getName()); //得到属性值
o.setName(0); //试图设置一个错误类型的值
```

#### example5

特别小心那些不希望共享的变量往往不经意间共享给了其他的闭包

```javascript
//返回一个函数组成的数组，它们的返回值是0～9
function constfuncs() {
  var funcs = []
  for (var i = 0; i < 10; i++)
    funcs[i] = function() {
      return i
    }
  return funcs
}
var funcs = constfuncs()
funcs[5]() //返回值是什么? //10
```

上面这段代码创建了 10 个闭包，并将它们存储到一个数组中。这些闭包都是在同一个函数调用中定义的，因此它们可以共享变量 i。当 constfuncs()返回时，变量 i 的值是 10

改写：

```javascript
//这个函数返回一个总是返回v的函数
function constfunc(v) {
    return function() {
        return v;
    };
} //创建一个数组用来存储常数函数
var funcs = [];
for (var i = 0; i< 10; i++) funcs[i] = constfunc(i); //在第5个位置的元素所表示的函数返回值为5
funcs[5]() //=＞5
···
```

### 2. Reference

[那些年我们一起过的 JS 闭包，作用域，this，让我们一起划上完美的句号](http://www.cnblogs.com/pssp/p/5781090.html)

## 七、函数属性、方法和构造函数

### 1. length 属性

指的是“形参”而非“实参”

```javascript
//这个函数使用arguments.callee，因此它不能在严格模式下工作
function check(args) {
  var actual = args.length //实参的真实个数
  var expected = args.callee.length //期望的实参个数
  if (actual !== expected)
    //如果不同则抛出异常
    throw Error('Expected' + expected + 'args;got' + actual)
}

function f(x, y, z) {
  check(arguments) //检查实参个数和期望的实参个数是否一致
  return x + y + z //再执行函数的后续逻辑
}
```

### 2. prototype 属性

每一个函数都包含一个 prototype 属性，这个属性是指向一个对象的引用，这个对象称做“原型对象”（prototype object）。每一个函数都包含不同的原型对象。当将函数用做构造函数的时候，新创建的对象会从原型对象上继承属性。

### 3. call()方法和 apply()方法

call()和 apply()的第一个实参是要调用函数的母对象，它是调用上下文，在函数体内通过 this 来获得对它的引用

要想以对象 o 的方法来调用函数 f()，可以这样使用 call()和 apply()：

```javascript
f.call(o)
f.apply(o)
```

每行代码和下面代码的功能类似（假设对象 o 中预先不存在名为 m 的属性）。

```javascript
o.m = f //将f存储为o的临时方法
o.m() //调用它，不传入参数
delete o.m //将临时方法删除
```

如果一个函数的实参可以是任意数量，给 apply()传入的参数数组可以是任意长度的

```javascript
Math.max(4, 5, 6) //6
Math.max.apply(Math, [4, 5, 6]) //6
```

传入 apply()的参数数组可以是类数组对象也可以是真实数组。实际上，可以将当前函数的 arguments 数组直接传入（另一个函数的）apply()来调用另一个函数

```javascript
//将对象o中名为m()的方法替换为另一个方法
//可以在调用原始的方法之前和之后记录日志消息
function trace(o, m) {
    var original = o[m]; //在闭包中保存原始方法
    o[m] = function() { //定义新的方法
        console.log(new Date(), "Entering:", m); //输出日志消息
        var result = original.apply(this, arguments); //调用原始函数
        console.log(new Date(), "Exiting:", m); //输出日志消息
        return result; //返回结果
    };
}

race()函数接收两个参数，一个对象和一个方法名，它将指定的方法替换为一个新方法，这个新方法是“包裹”原始方法的另一个泛函数。这种动态修改已有方法的做法有时称做"monkey-patching"。
```

### 4. bind()方法

将函数绑定至某个对象

```javascript
function f(y) {
  return this.x + y
} //这个是待绑定的函数
var o = {
  x: 1,
} //将要绑定的对象
var g = f.bind(o) //通过调用g(x)来调用o.f(x)
g(2) //=＞3
```

可以通过如下代码轻易地实现这种绑定：

```javascript
//返回一个函数，通过调用它来调用o中的方法f()，传递它所有的实参
function bind(f, o) {
  if (f.bind) return f.bind(o)
  //如果bind()方法存在的话，使用bind()方法
  else
    return function() {
      //否则，这样绑定
      return f.apply(o, arguments)
    }
}
```

除了第一个实参之外，传入 bind()的实参也会绑定至 this，这个附带的应用是一种常见的函数式编程技术，有时也被称为“柯里化”（currying）。

```javascript
var sum = function(x, y) {
  return x + y
} //返回两个实参的和值
//创建一个类似sum的新函数，但this的值绑定到null
//并且第一个参数绑定到1，这个新的函数期望只传入一个实参
var succ = sum.bind(null, 1)
succ(2) //=＞3:x绑定到1，并传入2作为实参y
function f(y, z) {
  return this.x + y + z
} //另外一个做累加计算的函数
var g = f.bind(
  {
    x: 1,
  },
  2
) //绑定this和y
g(3) //=＞6:this.x绑定到1，y绑定到2，z绑定到3
```

#### ECMAScript 3 版本的 Function.bind()方法

```javascript
if (!Function.prototype.bind) {
    Function.prototype.bind = function(o /*,args*/ ) {
        //将this和arguments的值保存至变量中
        //以便在后面嵌套的函数中可以使用它们
        var self = this,
            boundArgs = arguments;
        //bind()方法的返回值是一个函数
        return function() {
            //创建一个实参列表，将传入bind()的第二个及后续的实参都传入这个函数
            var args = [],
                i;
            for (i = 1; i＜ boundArgs.length; i++) args.push(boundArgs[i]);
            for (i = 0; i＜ arguments.length; i++) args.push(arguments[i]);
            //现在将self作为o的方法来调用，传入这些实参
            return self.apply(o, args);
        };
    };
}
```

ECMAScript 5 定义的 bind()方法也有一些特性是上述 ECMAScript 3 代码无法模拟的。首先，真正的 bind()方法返回一个函数对象，这个函数对象的 length 属性是绑定函数的形参个数减去绑定实参的个数（length 的值不能小于零）。再者，ECMAScript 5 的 bind()方法可以顺带用做构造函数。如果 bind()返回的函数用做构造函数，将忽略传入 bind()的 t his，原始函数就会以构造函数的形式调用，其实参也已经绑定。由 bind()方法所返回的函数并不包含 prototype 属性（普通函数固有的 prototype 属性是不能删除的），并且将这些绑定的函数用做构造函数时所创建的对象从原始的未绑定的构造函数中继承 prototype。同样，在使用 instanceof 运算符时，绑定构造函数和未绑定构造函数并无两样。

### 5. toString()方法

### 6. Function()构造函数

```javascript
var f = new Function('x', 'y', 'return x*y;')
//等同于
var f = function(x, y) {
  return x * y
}
```

- Function()构造函数允许 JavaScript 在运行时动态地创建并编译函数
- 每次调用 Function()构造函数都会解析函数体，并创建新的函数对象。如果是在一个循环或者多次调用的函数中执行这个构造函数，执行效率会受影响。相比之下，循环中的嵌套函数和函数定义表达式则不会每次执行时都重新编译。
- 就是它所创建的函数并不是使用词法作用域，相反，函数体代码的编译总是会在顶层函数执行

```javascript
var scope = 'global'
function constructFunction() {
  var scope = 'local'
  return new Function('return scope') //无法捕获局部作用域
}
//这一行代码返回global，因为通过Function()构造函数
//所返回的函数使用的不是局部作用域
constructFunction()() //=＞"global"
```

我们可以将 Function()构造函数认为是在全局作用域中执行的 eval()，eval()可以在自己的私有作用域内定义新变量和函数，Function()构造函数在实际编程过程中很少会用到。

### 7. 可调用的对象

检测一个对象是否是真正的函数对象（并且具有函数方法）

```javascript
function isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]'
}
```

## 八、函数式编程

### 1. 使用函数处理数组

非函数式编程风格:

```javascript
var data = [1, 1, 3, 5, 5] //这里是待处理的数组
//平均数是所有元素的累加和值除以元素个数
var total = 0
for (var i = 0; i < data.length; i++) total += data[i]
var mean = total / data.length //平均数是3
//计算标准差，首先计算每个数据减去平均数之后偏差的平方然后求和
total = 0
for (var i = 0; i < data.length; i++) {
  var deviation = data[i] - mean
  total += deviation * deviation
}
var stddev = Math.sqrt(total / (data.length - 1)) //标准差的值是2·
```

利用 map()和 reduce()函数：

```javascript
//首先定义两个简单的函数
var sum = function(x, y) {
    return x + y;·
};
var square = function(x) {
    return x * x;
}; //然后将这些函数和数组方法配合使用计算出平均数和标准差
var data = [1, 1, 3, 5, 5];
var mean = data.reduce(sum) / data.length;
var deviations = data.map(function(x) {
    return x - mean;
});
var stddev = Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1));
```

基于 ECMAScript 3 来实现

```javascript
//对于每个数组元素调用函数f()，并返回一个结果数组
//如果Array.prototype.map定义了的话，就使用这个方法
var map = Array.prototype.map
  ? function(a, f) {
      return a.map(f)
    } //如果已经存在map()方法，就直接使用它
  : function(a, f) {
      //否则，自己实现一个
      var results = []
      for (var i = 0, len = a.length; i < len; i++) {
        if (i in a) results[i] = f.call(null, a[i], i, a)
      }
      return results
    }
//使用函数f()和可选的初始值将数组a减至一个值
//如果Array.prototype.reduce存在的话，就使用这个方法
var reduce = Array.prototype.reduce
  ? function(a, f, initial) {
      //如果reduce()方法存在的话
      if (arguments.length > 2) return a.reduce(f, initial)
      //如果传入了一个初始值
      else return a.reduce(f) //否则没有初始值
    }
  : function(a, f, initial) {
      //这个算法来自ES5规范
      var i = 0,
        len = a.length,
        accumulator //以特定的初始值开始，否则第一个值取自a
      if (arguments.length > 2) accumulator = initial
      else {
        //找到数组中第一个已定义的索引
        if (len == 0) throw TypeError()
        while (i < len) {
          if (i in a) {
            accumulator = a[i++]
            break
          } else i++
        }
        if (i == len) throw TypeError()
      }
      //对于数组中剩下的元素依次调用f()
      while (i < len) {
        if (i in a) accumulator = f.call(undefined, accumulator, a[i], i, a)
        i++
      }
      return accumulator
    }

//调用
var data = [1, 1, 3, 5, 5]
var sum = function(x, y) {
  return x + y
}
var square = function(x) {
  return x * x
}
var mean = reduce(data, sum) / data.length
var deviations = map(data, function(x) {
  return x - mean
})
var stddev = Math.sqrt(reduce(map(deviations, square), sum) / (data.length - 1))
```

### 2. 高阶函数

所谓高阶函数（higher-order function）就是操作函数的函数，它接收一个或多个函数作为参数，并返回一个新函数

#### example1

```javascript
//这个高阶函数返回一个新的函数，这个新函数将它的实参传入f()
//并返回f的返回值的逻辑非
function not(f) {
  return function() {
    //返回一个新的函数
    var result = f.apply(this, arguments) //调用f()
    return !result //对结果求反
  }
}
var even = function(x) {
  //判断a是否为偶数的函数
  return x % 2 === 0
}
var odd = not(even) //一个新函数，所做的事情和even()相反
;[1, 1, 3, 5, 5].every(odd) //=＞true:每个元素都是奇数
```

#### example2

```javascript
//所返回的函数的参数应当是一个实参数组，并对每个数组元素执行函数f()
//并返回所有计算结果组成的数组
//可以对比一下这个函数和上文提到的map()函数
function mapper(f) {
  return function(a) {
    return map(a, f)
  }
}
var increment = function(x) {
  return x + 1
}
var incrementer = mapper(increment)
incrementer([1, 2, 3]) //=＞[2,3,4]
```

#### example3

```javascript
//返回一个新的可以计算f(g(...))的函数
//返回的函数h()将它所有的实参传入g()，然后将g()的返回值传入f()
//调用f()和g()时的this值和调用h()时的this值是同一个this
function compose(f, g) {
  return function() {
    //需要给f()传入一个参数，所以使用f()的call()方法
    //需要给g()传入很多参数，所以使用g()的apply()方法
    return f.call(this, g.apply(this, arguments))
  }
}
var square = function(x) {
  return x * x
}
var sum = function(x, y) {
  return x + y
}
var squareofsum = compose(square, sum)
squareofsum(2, 3) //=＞25
```

### 3. 不完全函数

之前的 bind 方法只是将实参放在（完整实参列表的）左侧，也就是说传入 bind()的实参都是放在传入原始函数的实参列表开始的位置，但有时我们期望将传入 bind()的实参放在（完整实参列表的）右侧：

```javascript
//实现一个工具函数将类数组对象（或对象）转换为真正的数组
//在后面的示例代码中用到了这个方法将arguments对象转换为真正的数组
function array(a, n) {
  return Array.prototype.slice.call(a, n || 0)
}
//这个函数的实参传递至左侧
function partialLeft(f /*,...*/) {
  var args = arguments //保存外部的实参数组
  return function() {
    //并返回这个函数
    var a = array(args, 1) //开始处理外部的第1个args
    a = a.concat(array(arguments)) //然后增加所有的内部实参
    return f.apply(this, a) //然后基于这个实参列表调用f()
  }
}
//这个函数的实参传递至右侧
function partialRight(f /*,...*/) {
  var args = arguments //保存外部实参数组
  return function() {
    //返回这个函数
    var a = array(arguments) //从内部参数开始
    a = a.concat(array(args, 1)) //然后从外部第1个args开始添加
    return f.apply(this, a) //最后基于这个实参列表调用f()
  }
}
//这个函数的实参被用做模板
//实参列表中的undefined值都被填充
function partial(f /*,...*/) {
  var args = arguments //保存外部实参数组
  return function() {
    var a = array(args, 1) //从外部args开始
    var i = 0,
      j = 0 //遍历args，从内部实参填充undefined值
    for (; i < a.length; i++) if (a[i] === undefined) a[i] = arguments[j++] //现在将剩下的内部实参都追加进去
    a = a.concat(array(arguments, j))
    return f.apply(this, a)
  }
}
//这个函数带有三个实参
var f = function(x, y, z) {
  return x * (y - z)
}
//注意这三个不完全调用之间的区别
partialLeft(f, 2)(3, 4) //=＞-2:绑定第一个实参:2*(3-4)
partialRight(f, 2)(3, 4) //=＞6:绑定最后一个实参:3*(4-2)
partial(f, undefined, 2)(3, 4) //=＞-6:绑定中间的实参:3*(2-4)
```

### 4. 记忆

阶乘函数，它可以将上次的计算结果缓存起来。在函数式编程当中，这种缓存技巧叫做“记忆”（memorization）。

#### 声明

memorize()接收一个函数作为实参，并返回带有记忆能力的函数

```javascript
//返回f()的带有记忆功能的版本
//只有当f()的实参的字符串表示都不相同时它才会工作
function memorize(f) {
  var cache = {} //将值保存在闭包内
  return function() {
    //将实参转换为字符串形式，并将其用做缓存的键
    var key = arguments.length + Array.prototype.join.call(arguments, ',')
    if (key in cache) return cache[key]
    else return (cache[key] = f.apply(this, arguments))
  }
}
```

#### 使用

```javascript
//返回两个整数的最大公约数
//使用欧几里德算法:http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a, b) { //这里省略对a和b的类型检查
    var t; //临时变量用来存储交换数值
    if (a＜ b) t = b, b = a, a = t; //确保a＞=b
    while (b != 0) t = b, b = a % b, a = t; //这是求最大公约数的欧几里德算法
    return a;
}
var gcdmemo = memorize(gcd);
gcdmemo(85, 187) //=＞17//注意，当我们写一个递归函数时，往往需要实现记忆功能
    //我们更希望调用实现了记忆功能的递归函数，而不是原递归函数
var factorial = memoize(function(n) {
    return (n＜ = 1) ? 1 : n * factorial(n - 1);
});
factorial(5) //=＞120.对于4～1的值也有缓存
```
