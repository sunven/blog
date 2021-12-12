# 《JavaScript设计模式》技巧型设计模式

## 链模式

通过在对象方法上将当前对象返回，实现对同一个对象多个方法的链式调用

```js
var A = function(selector) {
  return new A.fn.init(selector);
};
A.fn = A.prototype = {
  constructor: A,
  init: function(selector) {
    this[0] = document.getElementById(selector);
    this.length = 1;
    return this;
  },
  length: 2,
  size: function() {
    return this.length;
  }
};
A.fn.init.prototype = A.fn;

console.log(A("demo").size());
```

- constructor: A 》 constructor默认为a.fn.A.init的构造函数
- A.fn.init.prototype = A.fn 》 避免方法丢失

### 方法扩展

```js
//对象拓展
A.extend = A.fn.extend = function() {
  //拓展对象从第二个参数算起
  var i = 1,
    //获取参数长度
    len = arguments.length,
    //第一个参数为源对象
    target = arguments[0],
    //拓展对象中属性
    j;
  //如果只穿一个参数
  if (i == len) {
    //源对象为当前对象
    target = this;
    //i从0计数
    i--;
  }
  //遍历参数中拓展对象
  for (; i < len; i++) {
    //遍历拓展对象中的属性
    for (j in arguments[i]) {
      //拓展源对象
      target[j] = arguments[i][j];
    }
  }
  //返回源对象
  return target;
};

var demo = A.extend({ first: 1 }, { second: 2 }, { third: 3 });
console.log(demo);
A.extend(A.fn, { version: "1.0" });
console.log(A("demo").version);
A.fn.extend({
  getVersion: function() {
    return this.version;
  }
});
console.log(A("demo").getVersion());
A.extend(A, { names: "张三" });
console.log(A.names);
```

### 添加方法

```js
A.extend({
  //分割带“-”样式，变为驼峰式写法
  camelCase: function(str) {
    return str.replace(/\-(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    });
  }
});

A.fn.extend({
  //设置css样式
  css: function() {
    var arg = arguments,
      len = arg.length;
    if (this.length < 1) {
      return this;
    }
    //只有一个参数时
    if (len === 1) {
      //如果为字符串则为获取一个元素CSS样式
      if (typeof arg[0] === "string") {
        //IE
        if (this[0].currentStyle) {
          return this[0].currentStyle[name];
        } else {
          return getComputedStyle(this[0], false)[name];
        }
        //为对象时则设置多个样式
      } else if (typeof arg[0] === "object") {
        //遍历每个样式
        for (var i in arg[0]) {
          for (var j = this.length - 1; j >= 0; j--) {
            //分割-为驼峰式写法
            this[j].style[A.camelCase(i)] = arg[0][i];
          }
        }
      }
      //两个参数则设置一个样式
    } else if (len === 2) {
      for (var j = this.length - 1; j >= 0; j--) {
        this[j].style[A.camelCase(arg[0])] = arg[1];
      }
    }
    return this;
  }
});

A.fn.extend({
  //设置属性
  attr: function() {
    var arg = arguments,
      len = arg.length;
    if (this.length < 1) {
      return this;
    }
    //如果一个参数
    if (len === 1) {
      //为字符串获取第一个元素属性
      if (typeof arg[0] === "string") {
        return this[0].getAttribute(arg[0]);
      }
      //为对象设置每个元素的多个属性
      else if (typeof arg[0] === "object") {
        //遍历属性
        for (var i in arg[0]) {
          for (var j = this.length - 1; j >= 0; j--) {
            this[j].setAttribute(i, arg[0][i]);
          }
        }
      }
      //两个参数则设置每个元素单个属性
    } else if (len === 2) {
      for (var j = this.length - 1; j >= 0; j--) {
        this[j].setAttribute(arg[0], arg[i]);
      }
    }
    return this;
  }
});

A.fn.extend({
  //获取或设置元素的内容
  html: function() {
    var arg = arguments,
      len = arg.length;
    //如果没参数则取第一个元素的内容
    if (len === 0) {
      return this[0] && this[0].innerHTML;
    } else {
      //一个参数则设置每个元素的内容
      for (var i = this.length - 1; i >= 0; i--) {
        this[i].innerHTML = arg[0];
      }
    }
    return this;
  }
});
A.fn.extend({
  //添加时间
  on: (function() {
    //如果支持DOM2级事件
    if (document.addEventListener) {
      return function(type, fn) {
        var i = this.length - 1;
        for (; i >= 0; i--) {
          this[i].addEventListener(type, fn, false);
        }
        return this;
      };
      //IE浏览器DOM2级事件
    } else if (document.attachEvent) {
      return function(type, fn) {
        var i = this.length - 1;
        for (; i >= 0; i--) {
          this[i].addEvent("on" + type, fn);
        }
        return this;
      };
      //不支持DOM2级浏览器添加事件
    } else {
      return function(type, fn) {
        var i = this.length - 1;
        for (; i >= 0; i--) {
          this[i]["on" + type] = fn;
        }
        return this;
      };
    }
  })()
});
A("demo")
  .css({
    height: "30px",
    borer: "1px solid #000",
    "background-color": "red"
  })
  .attr("class", "demo")
  .html("添加文字")
  .on("click", function() {
    console.log("触发点击事件");
  });
```

## 委托模式

多个对象接受并处理同一请求，他们将请求委托给另一个对象统一处理

```js
ul.onclick = function(e) {
 if (e.target.nodeName.toLowerCase() === "li") {
   e.target.style.backgroundColor = "red";
 }
```

- 委托父元素
- 内存外泄（老版本IE引用计数式垃圾回收，移除元素，click事件没有清除；新版本为标记清除管理，不会有这个问题）

## 数据访问对象模式

抽象和封装对数据源的访问与存储，DAO通过对数据链接的管理方便对数据的访问与存储

```js
/*
 * 本地存储类
 * 参数preId 本地数据存储库前缀
 * 参数timeSign 时间戳与存储数据之间的拼接符
 */
var BaseLocalStorege = function(preId, timeSign) {
  //定义本地存储数据库前缀
  this.preId = preId;
  //定义时间戳与存储数据之间的拼接符
  this.timeSign = timeSign || "|-|";
};
//本地存储类 原型方法
BaseLocalStorege.prototype = {
  //操作状态
  status: {
    Success: 0, //成功
    FaiLure: 1, //失败
    OverFlow: 2, //溢出
    TimeOut: 3 //过期
  },
  //保存本地存储连接
  storage: localStorage || window.localStorage,
  //保存本地存储数据库数据真实字段
  getKey: function(key) {
    return this.preId + key;
  },
  //添加（修改）数据
  /*
   * 参数key:数据字段标识
   * 参数value:数据值
   * 参数callback：回调函数
   * 参数time：添加时间
   */
  set: function(key, value, callback, time) {
    //默认操作状态时成功
    var status = this.status.Success,
      //获取真实字段
      key = this.getKey(key);
    try {
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      //TODO handle the exception
      //为传入时间参数或者时间参数有误获取默认时间：一个月
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }
    try {
      //向数据库中添加数据
      this.storage.setItem(key, time, +this.timeSign + value);
    } catch (e) {
      //溢出失败，返回溢出状态
      //TODO handle the exceptionOverFlow
      status = this.status.OverFlow;
    }
    //有回调函数则执行回调函数并传入参数操作状态，真实数据字段标识以及存储数据值
    callback && callback.call(this, status, key, value);
  },
  /*
   * 添加（修改)数据
   * 参数key :数据字段标识
   * 参数callback:回调函数
   */
  get: function(key, callback) {
    //默认操作状态时成功
    var status = this.status.Success,
      //获取
      key = this.getKey(key),
      //默认值为空
      value = null,
      //时间戳与存储数据之间的拼接符长度
      timeSignLen = this.timeSign.length,
      //缓存当前对象
      that = this,
      //时间戳与存储数据之间的拼接符起始位置
      index,
      //时间戳
      time,
      //最终获取的数据
      result;
    try {
      //获取字段对应的数据字符串
      value = that.storage.getItem(key);
    } catch (e) {
      //TODO handle the exception
      //获取失败，则返回失败状态，数据结果为null
      result = {
        status: that.status.FaiLure,
        value: null
      };
      callback && callback.call(this, result.status, result.value);
      return result;
    }
    //如果成功获取数据字符串
    if (value) {
      //获取时间戳与存储数据之间的拼接符起始位置
      index = value.indexOf(that.timeSign);
      //获取时间戳
      time = +value.slice(0, index);
      //如果时间过期
      if (new Date(time).getTime() > new Date().getTime() || time == 0) {
        //获取数据结果（拼接符后面的字符串）
        value = value.slice(index + timeSignLen);
      } else {
        //过期则结果为null
        value = null;
        //设置状态过期为过期状态
        status = that.status.TimeOut;
        //删除该字段
        that.remove(key);
      }
    } else {
      //未获取数据字符串状态为失败状态
      status = that.status.FaiLure;
    }
    //设置结果
    result = {
      status: status,
      value: value
    };
    //执行回调函数
    callback && callback.call(this, result.status, result.value);
  },
  /*
   * 删除数据
   * 参数key:数据字段标识
   * 参数 callback：回调函数
   */
  remove: function(key, callback) {
    //设置默认初始状态为失败
    var status = this.status.FaiLure,
      key = this.getKey(key),
      //设置默认数据结果为空
      value = null;
    try {
      //获取字段对应的数据
      value = this.storage.getItems(key);
    } catch (e) {
      //TODO handle the exception
      //如果数据存在
      if (value) {
        try {
          //删除数据
          this.storage.removeItem(key);
          //设置操作成功
          status = this.status.Success;
        } catch (e) {
          //TODO handle the exception
        }
      }
      //执行回调 注意传入回调函数中的数据值：如果操作状态成功则返回真实的数据结果，否则返回空
      callback &&
        callback.call(
          this,
          status,
          status > 0
            ? null
            : value.slice(
                value.indexOf(this.timeSign) + this.timeSign.length
              )
        );
      return callback;
    }
  }
};

var LS = new BaseLocalStorege("LS_");
//在数据库中创建a变量 然后删除两次 查看结果
LS.set("a", "xiaoming", function() {
  console.log(arguments);
}); //[0,"LS_a","xiaoming"]
LS.get("a", function() {
  console.log("get" + arguments);
}); //[0,"xiaoming"]
LS.remove("a", function() {
  console.log("removeOne" + arguments);
}); //[0,"xiaoming"]
LS.remove("a", function() {
  console.log("removeTwo" + arguments);
}); //[1,null]
LS.get("a", function() {
  console.log("getTwo" + arguments);
}); //[1,null]
```

## 节流模式

对重复业务逻辑进行节流控制，执行最后一次操作并取消其他操作

## 简单模板模式

通过格式化字符串拼凑出视图避免创建视图时大量节点操作。优化了内存开销

## 惰性模式

减少每次代码执行时的重复性分支判断，通过对对象重定义来屏蔽原对象中的分支判断

### 加载即执行

```js
//加载即执行
A.on = (function() {
  if (document.addEventListener) {
    return function(dom, type, fn) {
      dom.addEventListener(type, fn, false);
    };
  } else if (document.attachEvent) {
    return function(dom, type, fn) {
      dom.attachEvent("on" + type, fn);
    };
  } else {
    return function(dom, type, fn) {
      dom["on+type"] = fn;
    };
  }
})();
```

### 惰性执行

```js
A.on = function(dom, type, fn) {
  if (dom.addEventListener) {
    A.on = function(dom, type, fn) {
      dom.addEventListener(type, fn, false);
    };
  } else if (dom.attachEvent) {
    A.on = function(dom, type, fn) {
      dom.attachEvent("on" + type, fn);
    };
  } else {
    A.on = function(dom, type, fn) {
      dom["on" + type] = fn;
    };
  }

  A.on(dom, type, fn);
};
```

## 参与者模式

- 在特定的作用域中执行给定的函数，并将参数原封不动的传递
- call和apply方法可以使我们在特定作用域中执行某个函数，并传入参数

### 传递数据

```js
var A = {} ;
// 事件绑定方法
A.event.on = function(dom, type, fn, data) {
 // w3c标准事件绑定
 if(dom.addEventListener) {
     dom.addEventListener(type, function(e) {
         fn.call(dom, e, data) ;
     }, false) ;
 }else if(dom.attachEvent) {
     dom.attachEvent('on' + type, function(e) {
         fn.call(dom, e, data) ;
     }) ;
 }else {
     dom['on' + type] = function(e) {
         fn.call(dom, e, data) ;
     }
 }
}
```

### 函数绑定

```js
// 函数绑定bind
function bind(fn, context) {
 // 闭包返回新函数
 return function() {
     // 对fn装饰并返回
     return fn.apply(context, arguments) ;
 }
}

// 测试用例：
var demoObj = {
 title : '这是一个例子'
} ;
function demoFn() {
 console.log(this.title) ;
} ;
// 让demoObj参与demoFn的执行
var bindFn = bind(demoFn, demoObj) ;
demoFn() ;   // undefined
bindFn() ;   // 这是一个例子
```

### 函数柯里化

- 将接受多个参数的函数转化为接受一部分参数的新函数，余下的参数保存下来，当函数调用时，返回传入的参数与保存的参数共同执行的结果

- 对函数参数的分割
- 多态（重载）

```js
// 函数柯里化
function curry(fn) {
    // 缓存数组slice方法Array.prototype.slice
    var _slice = [].slice ;
    // 从第二个参数开始截取参数
    var args = _slice.call(arguments, 1) ;
    // 闭包返回新函数
    return function() {
        // 将参数（类数组）转化为数组
        var addArgs = _slice.call(arguments) ;
        // 拼接参数
        var allArgs = args.concat(addArgs) ;
        // 返回新函数
        return fn.apply(null, allArgs) ;
    }
}

// 测试用例
// 正常加法器
function add(num1, num2) {
    return num1 + num2 ;
}
// 加5加法器
function add5(num) {
    return add(5, num) ;
}
// 测试加法器
console.log('1 + 2 = ', add(1, 2)) ;
// 测试加5加法器
console.log('5 + 6 = ', add5(6)) ;
// 函数柯里化创建加5加法器
var curry_add5 = curry(add, 5) ;
console.log('5 + 7 = ', curry_add5(7)) ;
var curry_add7_8 = curry(add, 7, 8) ;
console.log('7 + 8 = ', curry_add7_8()) ;
```

#### 反函数柯里化

方便对方法的调用

```js
// 反柯里化
Function.prototype.uncurry = function () {
  // 保存当前对象
  var that = this;
  return function () {
    return Function.prototype.call.apply(that, arguments);
  }
}
// 测试用例
// 用Object.prototype.toString校验对象类型时：
// 获得校验方法
var toString = Object.prototype.toString.uncurry();
// 测试对象数据类型
console.log('toString(function(){})：', toString(function () {}));
console.log('toString([])：', toString([]));
// 用数组的push方法为对象添加数据成员：
// 保存数组push方法
var push = [].push.uncurry();
// 创建一个对象
var demoArr = {};
// 通过push方法为对象添加数据成员
push(demoArr, '第一个成员', '第二个成员');
console.log(demoArr);
```

## 等待者模式

- 通过对多个异步进程监听，来触发未来发生的动作
- 解决那些不确定先后完成的异步逻辑

```js
var Waiter = function () {
  var dfd = [], //等待对象容器
    doneArr = [], //成功回调容器
    failArr = [], //失败回调容器
    slice = Array.prototype.slice,
    that = this;
  //监控对象类
  var Promise = function () {
    //监控对象是否解决成功状态
    this.resolved = false;
    //监控对象是否解决失败状态
    this.rejected = false;
  }
  Promise.prototype = {
    //解决成功
    resolve: function () {
      //设置当前监控状态是成功
      this.resolved = true;
      if (!dfd.length) return;
      //对象监控对象遍历如果任一个对象没有解决或者失败就返回
      for (var i = dfd.length - 1; i >= 0; i--) {
        if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
          return;
        }
        dfd.splice(i, 1);
      }
      _exec(doneArr)
    },
    //解决失败
    reject: function () {
      //设置当前监控状态是失败
      this.rejected = true;
      //没有监控对象取消
      if (!dfd.length) return;
      //清楚监控对象
      dfd.splice(0)
      _exec(failArr)
    }
  }
  that.Deferred = function () {
    return new Promise();
  };
  //回调执行方法
  function _exec(arr) {
    var i = 0,
      len = arr.length;
    for (; i < len; i++) {
      try {
        arr[i] && arr[i]();
      } catch (e) {}
    }
  };
  //监控异步方法参数：监控对象
  that.when = function () {
    //设置监控对象
    dfd = slice.call(arguments);
    var i = dfd.length;
    //向前遍历监控对象，最后一个监控对象索引值length-1
    for (--i; i >= 0; i--) {
      //不存在监控对象，监控对象已经解决，监控对象失败
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Promise) {
        dfd.splice(i, 1)
      }
    }
    //返回等待者对象
    return that;
  };
  //解决成功回调函数添加方法
  that.done = function () {
    //向成功毁掉函数容器中添加回调方法
    doneArr = doneArr.concat(slice.call(arguments));
    return that;
  };
  //解决失败回调函数添加方法
  that.fail = function () {
    //向失败回调函数中添加方法
    failArr = failArr.concat(slice.call(arguments));
    return that;
  };
}

//测试
var waiter = new Waiter(); //创建一个等待者实例
var first = function () {
  var dtd = waiter.Deferred();
  setTimeout(function () {
    dtd.resolve();
  }, 5000)
  return dtd; //返回监听这对象
}()
var second = function () { //第二个对象
  var dtd = waiter.Deferred();
  setTimeout(function () {
    dtd.resolve();
  }, 10000)
  return dtd;
}()
waiter.when(first, second).done(function () {
  console.log("success")
}, function () {
  console.log("success again")
}).fail(function () {
  console.log("fail")
})
```

- JQuery中的Deferred对象
- 异步请求的封装
- 轮询
