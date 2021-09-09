# 《JavaScript 设计模式与开发实践》读书笔记-设计模式

- 笔记内容多摘录自《JavaScript 设计模式与开发实践》（曾探著），侵删。
- 把不变的事物和变化的事物分离开来

## 一 单例模式

- 确保只有一个实例，并提供全局访问
- 区分创建对象和管理单例的职责
- 惰性单例

设计原则：**单一职责**

应用：**全局缓存、线程池**

```js
var getSingle = function(fn) {
  var result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}
```

## 二 策略模式

定义一系列算法，把它们一个个封装起来，并且使它们可以相互替换

- 将算法的使用与算法的实现分离
- 策略类（Strategies），环境类（Context）

设计原则：**符合开闭原责，违背最少知识原则**

应用：**表单验证**

```js
var strategies = {
  A: function(salary) {
    return salary * 4
  },
  B: function(salary) {
    return salary * 3
  },
  C: function(salary) {
    return salary * 2
  },
}
var context = function(func, salary) {
  return func(salary)
}

context(strategies.A, 100)
```

## 三 代理模式

为对象提供一个代用品或占位符，以便控制对它的访问

- 代理和本体接口的一致性

设计原则：**符合开闭原责、单一职责**

### 虚拟代理

```js
var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return function(src) {
    imgNode.src = src
  }
})()
var proxyImage = (function() {
  var img = new Image()
  img.onload = function() {
    myImage(this.src)
  }
  return function(src) {
    myImage('loading.gif')
    img.src = src
  }
})()
proxyImage('1.jpg')
```

### 缓存代理

```js
var createProxyFactory = function(fn) {
  var cache = {}
  return function() {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = fn.apply(this, arguments))
  }
}
```

### 其他代理模式

- 防火墙代理
- 远程代理
- 保护代理
- 智能引用代理
- 写时复制代理

## 四 迭代器模式

提供一种方法顺序访问一个聚合对象的各个元素

### 内部迭代器

```js
var each = function(ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i])
  }
}

each([1, 2, 3], function(i, n) {
  alert([i, n])
})
```

### 外部迭代器

```js
var Iterator = function(obj) {
  var current = 0
  var next = function() {
    current += 1
  }
  var isDone = function() {
    return current >= obj.length
  }
  var getCurrItem = function() {
    return obj[current]
  }
  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem,
  }
}

var compare = function(iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error('iterator1 和iterator2 不相等')
    }
    iterator1.next()
    iterator2.next()
  }
  alert('iterator1 和iterator2 相等')
}
var iterator1 = Iterator([1, 2, 3])
var iterator2 = Iterator([1, 2, 3])
compare(iterator1, iterator2)
```

## 五 发布-订阅模式（观察者模式）

对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知

- 推模型、拉模型
- 异步编程、替代回调函数
- 不用再显示的调用另一个对象的接口

全局发布-订阅对象

```js
var Event = (function() {
  var clientList = {},
    listen,
    trigger,
    remove
  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }
  trigger = function() {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments)
    }
  }
  remove = function(key, fn) {
    var fns = clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l]
        if (_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }
  return {
    listen: listen,
    trigger: trigger,
    remove: remove,
  }
})()

Event.listen('squareMeter88', function(price) {
  // 小红订阅消息
  console.log('价格= ' + price) // 输出：'价格=2000000'
})
```

离线事件与命名空间

```js
var Event = (function() {
  var global = this,
    Event,
    _default = 'default'
  Event = (function() {
    var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      find,
      each = function(ary, fn) {
        var ret
        for (var i = 0, l = ary.length; i < l; i++) {
          var n = ary[i]
          ret = fn.call(n, i, n)
        }
        return ret
      }
    _listen = function(key, fn, cache) {
      if (!cache[key]) {
        cache[key] = []
      }
      cache[key].push(fn)
    }
    _remove = function(key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) {
            if (cache[key] === fn) {
              cache[key].splice(i, 1)
            }
          }
        } else {
          cache[key] = []
        }
      }
    }
    _trigger = function() {
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key]
      if (!stack || !stack.length) {
        return
      }
      return each(stack, function() {
        return this.apply(_self, args)
      })
    }
    _create = function(namespace) {
      var namespace = namespace || _default
      var cache = {},
        offlineStack = [], // 离线事件
        ret = {
          listen: function(key, fn, last) {
            _listen(key, fn, cache)
            if (offlineStack === null) {
              return
            }
            if (last === 'last') {
            } else {
              each(offlineStack, function() {
                this()
              })
            }
            offlineStack = null
          },
          one: function(key, fn, last) {
            _remove(key, cache)
            this.listen(key, fn, last)
          },
          remove: function(key, fn) {
            _remove(key, cache, fn)
          },
          trigger: function() {
            var fn,
              args,
              _self = this
            _unshift.call(arguments, cache)
            args = arguments
            fn = function() {
              return _trigger.apply(_self, args)
            }
            if (offlineStack) {
              return offlineStack.push(fn)
            }
            return fn()
          },
        }
      return namespace
        ? namespaceCache[namespace]
          ? namespaceCache[namespace]
          : (namespaceCache[namespace] = ret)
        : ret
    }
    return {
      create: _create,
      one: function(key, fn, last) {
        var event = this.create()
        event.one(key, fn, last)
      },
      remove: function(key, fn) {
        var event = this.create()
        event.remove(key, fn)
      },
      listen: function(key, fn, last) {
        var event = this.create()
        event.listen(key, fn, last)
      },
      trigger: function() {
        var event = this.create()
        event.trigger.apply(this, arguments)
      },
    }
  })()
  return Event
})()
```

## 六 命令模式

有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接收者能够消除彼此之间的耦合关系

- 回调函数的一个面向对象的替代品

```js
var RefreshMenuBarCommand = function(receiver) {
  return {
    execute: function() {
      receiver.refresh()
    },
  }
}
var setCommand = function(button, command) {
  button.onclick = function() {
    command.execute()
  }
}
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(button1, refreshMenuBarCommand)
```

### 宏命令、智能命令

```js
var closeDoorCommand = {
  execute: function() {
    console.log('关门')
  },
}
var openPcCommand = {
  execute: function() {
    console.log('开电脑')
  },
}

var openQQCommand = {
  execute: function() {
    console.log('登录QQ')
  },
}

var MacroCommand = function() {
  return {
    commandsList: [],
    add: function(command) {
      this.commandsList.push(command)
    },
    execute: function() {
      for (var i = 0, command; (command = this.commandsList[i++]); ) {
        command.execute()
      }
    },
  }
}
var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)
macroCommand.execute()
```

## 七 组合模式

组合模式将对象组合成树形结构，以表示“部分-整体”的层次机构

- 表示树形结构
- 利用对象多态性统一对待组合对象和单个对象
- 组合模式不是父子关系
- 对叶对象操作的一致性
- 双向映射关系
- 用职责链模式提高组合模式性能

```js
var Folder = function(name) {
  this.name = name
  this.parent = null //增加this.parent 属性
  this.files = []
}

Folder.prototype.add = function(file) {
  file.parent = this //设置父对象
  this.files.push(file)
}

Folder.prototype.scan = function() {
  console.log('开始扫描文件夹: ' + this.name)
  for (var i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan()
  }
}

Folder.prototype.remove = function() {
  if (!this.parent) {
    //根节点或者树外的游离节点
    return
  }
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l]
    if (file === this) {
      files.splice(l, 1)
    }
  }
}

var File = function(name) {
  this.name = name
  this.parent = null
}

File.prototype.add = function() {
  throw new Error('不能添加在文件下面')
}

File.prototype.scan = function() {
  console.log('开始扫描文件: ' + this.name)
}

File.prototype.remove = function() {
  if (!this.parent) {
    //根节点或者树外的游离节点
    return
  }

  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l]
    if (file === this) {
      files.splice(l, 1)
    }
  }
}

var folder = new Folder('学习资料')
var folder1 = new Folder('JavaScript')
var file1 = new Folder('深入浅出Node.js')

folder1.add(new File('JavaScript 设计模式与开发实践'))
folder.add(folder1)
folder.add(file1)
folder1.remove() //移除文件夹
folder.scan()
```

## 八 模板方法模式

- 抽象父类
- 具体的实现子类

```js
var Beverage = function() {}
Beverage.prototype.boilWater = function() {
  console.log('把水煮沸')
}

Beverage.prototype.brew = function() {} // 空方法，应该由子类重写
Beverage.prototype.pourInCup = function() {} // 空方法，应该由子类重写
Beverage.prototype.addCondiments = function() {} // 空方法，应该由子类重写
Beverage.prototype.init = function() {
  this.boilWater()
  this.brew()
  this.pourInCup()
  this.addCondiments()
}

var Coffee = function() {}
Coffee.prototype = new Beverage()

Coffee.prototype.brew = function() {
  console.log('用沸水冲泡咖啡')
}
Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}
Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶')
}
var Coffee = new Coffee()
Coffee.init()

var Tea = function() {}
Tea.prototype = new Beverage()

Tea.prototype.brew = function() {
  console.log('用沸水浸泡茶叶')
}
Tea.prototype.pourInCup = function() {
  console.log('把茶倒进杯子')
}
Tea.prototype.addCondiments = function() {
  console.log('加柠檬')
}
var tea = new Tea()
tea.init()
```

### 钩子方法

```js
var Beverage = function() {}
Beverage.prototype.boilWater = function() {
  console.log('把水煮沸')
}
Beverage.prototype.brew = function() {
  throw new Error('子类必须重写brew 方法')
}
Beverage.prototype.pourInCup = function() {
  throw new Error('子类必须重写pourInCup 方法')
}
Beverage.prototype.addCondiments = function() {
  throw new Error('子类必须重写addCondiments 方法')
}
Beverage.prototype.customerWantsCondiments = function() {
  return true // 默认需要调料
}
Beverage.prototype.init = function() {
  this.boilWater()
  this.brew()
  this.pourInCup()
  if (this.customerWantsCondiments()) {
    // 如果挂钩返回true，则需要调料
    this.addCondiments()
  }
}
var CoffeeWithHook = function() {}
CoffeeWithHook.prototype = new Beverage()
CoffeeWithHook.prototype.brew = function() {
  console.log('用沸水冲泡咖啡')
}
CoffeeWithHook.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}
CoffeeWithHook.prototype.addCondiments = function() {
  console.log('加糖和牛奶')
}
CoffeeWithHook.prototype.customerWantsCondiments = function() {
  return window.confirm('请问需要调料吗？')
}
var coffeeWithHook = new CoffeeWithHook()
```

### 好莱坞原则

> 不要来找我，我会给你打电话

### 真的需要继承吗？

```js
var Beverage = function(param) {
  var boilWater = function() {
    console.log('把水煮沸')
  }
  var brew =
    param.brew ||
    function() {
      throw new Error('必须传递brew 方法')
    }
  var pourInCup =
    param.pourInCup ||
    function() {
      throw new Error('必须传递pourInCup 方法')
    }
  var addCondiments =
    param.addCondiments ||
    function() {
      throw new Error('必须传递addCondiments 方法')
    }
  var F = function() {}
  F.prototype.init = function() {
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }
  return F
}
var Coffee = Beverage({
  brew: function() {
    console.log('用沸水冲泡咖啡')
  },
  pourInCup: function() {
    console.log('把咖啡倒进杯子')
  },
  addCondiments: function() {
    console.log('加糖和牛奶')
  },
})

var Tea = Beverage({
  brew: function() {
    console.log('用沸水浸泡茶叶')
  },
  pourInCup: function() {
    console.log('把茶倒进杯子')
  },
  addCondiments: function() {
    console.log('加柠檬')
  },
})
var coffee = new Coffee()
coffee.init()
var tea = new Tea()
tea.init()
```

## 九 享元模式

- 用于性能优化的模式
- 运用共享技术来有效支持大量细粒度的对象
- 减少共享对象的数量

创建了 100 个对象

```js
var Model = function(sex, underwear) {
  this.sex = sex
  this.underwear = underwear
}
Model.prototype.takePhoto = function() {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}
for (var i = 1; i <= 50; i++) {
  var maleModel = new Model('male', 'underwear' + i)
  maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
  var femaleModel = new Model('female', 'underwear' + j)
  femaleModel.takePhoto()
}
```

只创建了 2 个对象

```js
var Model = function(sex) {
  this.sex = sex
}
Model.prototype.takePhoto = function() {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}

var maleModel = new Model('male'),
  femaleModel = new Model('female')

for (var i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i
  maleModel.takePhoto()
}

for (var j = 1; j <= 50; j++) {
  femaleModel.underwear = 'underwear' + j
  femaleModel.takePhoto()
}
```

### 内部状态和外部状态

- 内部状态存储于对象内部
- 内部状态可以被一些对象共享
- 内部状态独立于具体的场景，通常不会改变
- 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享

### 文件上传例子

```js
//剥离外部状态
var Upload = function(uploadType) {
  this.uploadType = uploadType
}

Upload.prototype.delFile = function(id) {
  uploadManager.setExternalState(id, this) // (1)
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

//工厂进行对象实例化
var UploadFactory = (function() {
  var createdFlyWeightObjs = {}
  return {
    create: function(uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType]
      }
      return (createdFlyWeightObjs[uploadType] = new Upload(uploadType))
    },
  }
})()

//管理器封装外部状态
var uploadManager = (function() {
  var uploadDatabase = {}
  return {
    add: function(id, uploadType, fileName, fileSize) {
      var flyWeightObj = UploadFactory.create(uploadType)
      var dom = document.createElement('div')
      dom.innerHTML =
        '<span>文件名称:' +
        fileName +
        ', 文件大小: ' +
        fileSize +
        '</span>' +
        '<button class="delFile">删除</button>'
      dom.querySelector('.delFile').onclick = function() {
        flyWeightObj.delFile(id)
      }

      document.body.appendChild(dom)
      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom,
      }
      return flyWeightObj
    },
    setExternalState: function(id, flyWeightObj) {
      var uploadData = uploadDatabase[id]
      for (var i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    },
  }
})()

var id = 0
window.startUpload = function(uploadType, files) {
  for (var i = 0, file; (file = files[i++]); ) {
    var uploadObj = uploadManager.add(
      ++id,
      uploadType,
      file.fileName,
      file.fileSize
    )
  }
}

startUpload('plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000,
  },
  {
    fileName: '2.html',
    fileSize: 3000,
  },
  {
    fileName: '3.txt',
    fileSize: 5000,
  },
])
startUpload('flash', [
  {
    fileName: '4.txt',
    fileSize: 1000,
  },
  {
    fileName: '5.html',
    fileSize: 3000,
  },
  {
    fileName: '6.txt',

    fileSize: 5000,
  },
])
```

### 享元的适用性

- 一个程序中使用了大量的相似对象
- 由于使用了大量对象，造成很大的内存开销
- 对象大多数状态都可以变为外部状态
- 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象

### 没有内部状态的享元

```js
var UploadFactory = (function() {
  var uploadObj = {}
  return {
    create: function() {
      if (uploadObj) {
        return uploadObj
      }
      return (uploadObj = new Upload())
    },
  }
})()
```

### 对象池

```js
var toolTipFactory = (function() {
  var toolTipPool = [] // toolTip 对象池
  return {
    create: function() {
      if (toolTipPool.length === 0) {
        // 如果对象池为空
        var div = document.createElement('div') // 创建一个dom
        document.body.appendChild(div)
        return div
      } else {
        // 如果对象池里不为空
        return toolTipPool.shift() // 则从对象池中取出一个dom
      }
    },
    recover: function(tooltipDom) {
      return toolTipPool.push(tooltipDom) // 对象池回收dom
    },
  }
})()

var ary = []
for (var i = 0, str; (str = ['A', 'B'][i++]); ) {
  var toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
  ary.push(toolTip)
}

for (var i = 0, toolTip; (toolTip = ary[i++]); ) {
  toolTipFactory.recover(toolTip)
}

for (var i = 0, str; (str = ['A', 'B', 'C', 'D', 'E', 'F'][i++]); ) {
  var toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
}
```

通用对象池实现

```js
var objectPoolFactory = function(createObjFn) {
  var objectPool = []
  return {
    create: function() {
      var obj =
        objectPool.length === 0
          ? createObjFn.apply(this, arguments)
          : objectPool.shift()
      return obj
    },
    recover: function(obj) {
      objectPool.push(obj)
    },
  }
}

var iframeFactory = objectPoolFactory(function() {
  var iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  iframe.onload = function() {
    iframe.onload = null // 防止iframe 重复加载的bug
    iframeFactory.recover(iframe) // iframe 加载完成之后回收节点
  }
  return iframe
})

var iframe1 = iframeFactory.create()
iframe1.src = 'http:// baidu.com'
var iframe2 = iframeFactory.create()
iframe2.src = 'http:// QQ.com'
setTimeout(function() {
  var iframe3 = iframeFactory.create()
  iframe3.src = 'http:// 163.com'
}, 3000)
```

## 十 职责连模式

使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系， 将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

```js
var order500 = function(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购，得到100 优惠券')
  } else {
    return 'nextSuccessor' // 我不知道下一个节点是谁，反正把请求往后面传递
  }
}
var order200 = function(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200 元定金预购，得到50 优惠券')
  } else {
    return 'nextSuccessor' // 我不知道下一个节点是谁，反正把请求往后面传递
  }
}
var orderNormal = function(orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('手机库存不足')
  }
}
// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function(fn) {
  this.fn = fn
  this.successor = null
}
Chain.prototype.setNextSuccessor = function(successor) {
  return (this.successor = successor)
}
Chain.prototype.passRequest = function() {
  var ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    )
  }
  return ret
}
var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)
chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)
chainOrder500.passRequest(1, true, 500) // 输出：500 元定金预购，得到100 惠券
chainOrder500.passRequest(2, true, 500) // 输出：200 元定金预购，得到50 惠券
chainOrder500.passRequest(3, true, 500) // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0) // 输出：手机库存不足
```

### 异步的职责连

```js
Chain.prototype.next = function() {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  )
}

var fn1 = new Chain(function() {
  console.log(1)
  return 'nextSuccessor'
})

var fn2 = new Chain(function() {
  console.log(2)
  var self = this
  setTimeout(function() {
    self.next()
  }, 1000)
})

var fn3 = new Chain(function() {
  console.log(3)
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()
```

### 职责链的优缺点

- 不能保证每个请求一定会被链中的节点处理
-  职责链过长带来的性能损耗

### AOP 实现职责链

```js
Function.prototype.after = function(fn) {
  var self = this
  return function() {
    var ret = self.apply(this, arguments)
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments)
    }
    return ret
  }
}

var order = order500yuan.after(order200yuan).after(orderNormal)
order(1, true, 500) // 输出：500 元定金预购，得到100 优惠券
order(2, true, 500) // 输出：200 元定金预购，得到50 优惠券
order(1, false, 500) // 输出：普通购买，无优惠券
```

## 十一 中介者模式

- 解除对象与对象之间的耦合关系
- 迎合迪米特法则的实现

### 泡泡堂游戏

```js
function Player(name, teamColor) {
  this.name = name // 角色名字
  this.teamColor = teamColor // 队伍颜色
  this.state = 'alive' // 玩家生存状态
}

Player.prototype.win = function() {
  console.log(this.name + ' won ')
}

Player.prototype.lose = function() {
  console.log(this.name + ' lost')
}
/*******************玩家死亡*****************/
Player.prototype.die = function() {
  this.state = 'dead'
  playerDirector.reciveMessage('playerDead', this) // 给中介者发送消息，玩家死亡
}
/*******************移除玩家*****************/
Player.prototype.remove = function() {
  playerDirector.reciveMessage('removePlayer', this) // 给中介者发送消息，移除一个玩家
}

/*******************玩家换队*****************/
Player.prototype.changeTeam = function(color) {
  playerDirector.reciveMessage('changeTeam', this, color) // 给中介者发送消息，玩家换队
}

var playerDirector = (function() {
  var players = {}, // 保存所有玩家
    operations = {} // 中介者可以执行的操作
  /****************新增一个玩家***************************/
  operations.addPlayer = function(player) {
    var teamColor = player.teamColor // 玩家的队伍颜色
    players[teamColor] = players[teamColor] || [] // 如果该颜色的玩家还没有成立队伍，则

    players[teamColor].push(player) // 添加玩家进队伍
  }
  /****************移除一个玩家***************************/
  operations.removePlayer = function(player) {
    var teamColor = player.teamColor, // 玩家的队伍颜色
      teamPlayers = players[teamColor] || [] // 该队伍所有成员
    for (var i = teamPlayers.length - 1; i >= 0; i--) {
      // 遍历删除
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1)
      }
    }
  }
  /****************玩家换队***************************/
  operations.changeTeam = function(player, newTeamColor) {
    // 玩家换队
    operations.removePlayer(player) // 从原队伍中删除
    player.teamColor = newTeamColor // 改变队伍颜色
    operations.addPlayer(player) // 增加到新队伍中
  }

  operations.playerDead = function(player) {
    // 玩家死亡
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor] // 玩家所在队伍
    var all_dead = true
    for (var i = 0, player; (player = teamPlayers[i++]); ) {
      if (player.state !== 'dead') {
        all_dead = false
        break
      }
    }
    if (all_dead === true) {
      // 全部死亡
      for (var i = 0, player; (player = teamPlayers[i++]); ) {
        player.lose() // 本队所有玩家lose
      }
      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color] // 其他队伍的玩家
          for (var i = 0, player; (player = teamPlayers[i++]); ) {
            player.win() // 其他队伍所有玩家win
          }
        }
      }
    }
  }

  var reciveMessage = function() {
    var message = Array.prototype.shift.call(arguments) // arguments 的第一个参数为消息名称
    operations[message].apply(this, arguments)
  }

  return {
    reciveMessage: reciveMessage,
  }
})()

// 红队：
var player1 = playerFactory('皮蛋', 'red'),
  player2 = playerFactory('小乖', 'red'),
  player3 = playerFactory('宝宝', 'red'),
  player4 = playerFactory('小强', 'red')
// 蓝队：
var player5 = playerFactory('黑妞', 'blue'),
  player6 = playerFactory('葱头', 'blue'),
  player7 = playerFactory('胖墩', 'blue'),
  player8 = playerFactory('海盗', 'blue')
player1.die()
player2.die()
player3.die()
player4.die()

player1.remove()
player2.remove()
player3.die()
player4.die()

player1.changeTeam('blue')
player2.die()
player3.die()
player4.die()
```

### 购买商品

```js
var goods = {
  // 手机库存
  'red|32G': 3,
  'red|16G': 0,
  'blue|32G': 1,
  'blue|16G': 6,
}
var mediator = (function() {
  var colorSelect = document.getElementById('colorSelect'),
    memorySelect = document.getElementById('memorySelect'),
    numberInput = document.getElementById('numberInput'),
    colorInfo = document.getElementById('colorInfo'),
    memoryInfo = document.getElementById('memoryInfo'),
    numberInfo = document.getElementById('numberInfo'),
    nextBtn = document.getElementById('nextBtn')
  return {
    changed: function(obj) {
      var color = colorSelect.value, // 颜色
        memory = memorySelect.value, // 内存
        number = numberInput.value, // 数量
        stock = goods[color + '|' + memory] // 颜色和内存对应的手机库存数量

      if (obj === colorSelect) {
        // 如果改变的是选择颜色下拉框
        colorInfo.innerHTML = color
      } else if (obj === memorySelect) {
        memoryInfo.innerHTML = memory
      } else if (obj === numberInput) {
        numberInfo.innerHTML = number
      }
      if (!color) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择手机颜色'
        return
      }
      if (!memory) {
        nextBtn.disabled = true
        nextBtn.innerHTML = '请选择内存大小'
        return
      }
      if (((number - 0) | 0) !== number - 0) {
        // 输入购买数量是否为正整数
        nextBtn.disabled = true
        nextBtn.innerHTML = '请输入正确的购买数量'
        return
      }
      nextBtn.disabled = false
      nextBtn.innerHTML = '放入购物车'
    },
  }
})()

// 事件函数：
colorSelect.onchange = function() {
  mediator.changed(this)
}
memorySelect.onchange = function() {
  mediator.changed(this)
}
numberInput.oninput = function() {
  mediator.changed(this)
}
```

## 十二 装饰者模式

动态的给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象

### 模拟传统面向对象语言

```js
var Plane = function() {}

Plane.prototype.fire = function() {
  console.log('发射普通子弹')
}

var MissileDecorator = function(plane) {
  this.plane = plane
}
MissileDecorator.prototype.fire = function() {
  this.plane.fire()
  console.log('发射导弹')
}
var AtomDecorator = function(plane) {
  this.plane = plane
}
AtomDecorator.prototype.fire = function() {
  this.plane.fire()
  console.log('发射原子弹')
}

var plane = new Plane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)
plane.fire()
```

### javascript 的装饰器

```js
var plane = {
  fire: function() {
    console.log('发射普通子弹')
  },
}
var missileDecorator = function() {
  console.log('发射导弹')
}
var atomDecorator = function() {
  console.log('发射原子弹')
}
var fire1 = plane.fire
plane.fire = function() {
  fire1()
  missileDecorator()
}
var fire2 = plane.fire
plane.fire = function() {
  fire2()
  atomDecorator()
}
plane.fire()
// 分别输出： 发射普通子弹、发射导弹、发射原子弹
```

### 用 AOP 装饰函数

```js
Function.prototype.before = function(beforefn) {
  var __self = this // 保存原函数的引用
  return function() {
    // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments) // 执行新函数，且保证this 不被劫持，新函数接受的参数
    // 也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments) // 执行原函数并返回原函数的执行结果，
    // 并且保证this 不被劫持
  }
}

Function.prototype.after = function(afterfn) {
  var __self = this
  return function() {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}
```

### AOP 的应用实例

#### 数据统计上报

```js
Function.prototype.after = function(afterfn) {
  var __self = this
  return function() {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}
var showLogin = function() {
  console.log('打开登录浮层')
}
var log = function() {
  console.log('上报标签为: ' + this.getAttribute('tag'))
}

showLogin = showLogin.after(log) // 打开登录浮层之后上报数据
document.getElementById('button').onclick = showLogin
```

#### 用 AOP 动态改变函数的参数

```js
var func = function(param) {
  console.log(param)
}

func = func.before(function(param) {
  param.b = 'b'
})

func({ a: 'a' })
```

#### 插件式的表单验证

```js
Function.prototype.before = function(beforefn) {
  var __self = this
  return function() {
    if (beforefn.apply(this, arguments) === false) {
      // beforefn 返回false 的情况直接return，不再执行后面的原函数
      return
    }
    return __self.apply(this, arguments)
  }
}

var validata = function() {
  if (username.value === '') {
    alert('用户名不能为空')
    return false
  }
  if (password.value === '') {
    alert('密码不能为空')
    return false
  }
}
var formSubmit = function() {
  var param = {
    username: username.value,
    password: password.value,
  }
  ajax('http:// xxx.com/login', param)
}

formSubmit = formSubmit.before(validata)

submitBtn.onclick = function() {
  formSubmit()
}
```

## 十三 状态模式

区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变

### 电灯程序

```js
var OffLightState = function(light) {
  this.light = light
}

OffLightState.prototype.buttonWasPressed = function() {
  console.log('弱光') // offLightState 对应的行为
  this.light.setState(this.light.weakLightState) // 切换状态到weakLightState
}
// WeakLightState：
var WeakLightState = function(light) {
  this.light = light
}

WeakLightState.prototype.buttonWasPressed = function() {
  console.log('强光') // weakLightState 对应的行为
  this.light.setState(this.light.strongLightState) // 切换状态到strongLightState
}
// StrongLightState：
var StrongLightState = function(light) {
  this.light = light
}

StrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯') // strongLightState 对应的行为
  this.light.setState(this.light.offLightState) // 切换状态到offLightState
}

var Light = function() {
  this.offLightState = new OffLightState(this)
  this.weakLightState = new WeakLightState(this)
  this.strongLightState = new StrongLightState(this)
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button'),
    self = this
  this.button = document.body.appendChild(button)
  this.button.innerHTML = '开关'
  this.currState = this.offLightState // 设置当前状态
  this.button.onclick = function() {
    self.currState.buttonWasPressed()
  }
}

Light.prototype.setState = function(newState) {
  this.currState = newState
}

var light = new Light()
light.init()
```

增加抽象类的变通

```js
var State = function() {}
State.prototype.buttonWasPressed = function() {
  throw new Error('父类的buttonWasPressed 方法必须被重写')
}
var SuperStrongLightState = function(light) {
  this.light = light
}

SuperStrongLightState.prototype = new State() // 继承抽象父类
SuperStrongLightState.prototype.buttonWasPressed = function() {
  // 重写buttonWasPressed 方法
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}
```

### 文件上传

```js
window.external.upload = function(state) {
  console.log(state) // 可能为sign、uploading、done、error
}
var plugin = (function() {
  var plugin = document.createElement('embed')
  plugin.style.display = 'none'
  plugin.type = 'application/txftn-webkit'
  plugin.sign = function() {
    console.log('开始文件扫描')
  }
  plugin.pause = function() {
    console.log('暂停文件上传')
  }
  plugin.uploading = function() {
    console.log('开始文件上传')
  }
  plugin.del = function() {
    console.log('删除文件上传')
  }
  plugin.done = function() {
    console.log('文件上传完成')
  }
  document.body.appendChild(plugin)
  return plugin
})()
var Upload = function(fileName) {
  this.plugin = plugin
  this.fileName = fileName
  this.button1 = null
  this.button2 = null
  this.signState = new SignState(this) // 设置初始状态为waiting
  this.uploadingState = new UploadingState(this)
  this.pauseState = new PauseState(this)
  this.doneState = new DoneState(this)
  this.errorState = new ErrorState(this)
  this.currState = this.signState // 设置当前状态
}
Upload.prototype.init = function() {
  var that = this
  this.dom = document.createElement('div')
  this.dom.innerHTML =
    '<span>文件名称:' +
    this.fileName +
    '</span>\
<button data-action="button1">扫描中</button>\
<button data-action="button2">删除</button>'
  document.body.appendChild(this.dom)
  this.button1 = this.dom.querySelector('[data-action="button1"]')
  this.button2 = this.dom.querySelector('[data-action="button2"]')
  this.bindEvent()
}
Upload.prototype.bindEvent = function() {
  var self = this
  this.button1.onclick = function() {
    self.currState.clickHandler1()
  }
  this.button2.onclick = function() {
    self.currState.clickHandler2()
  }
}
Upload.prototype.sign = function() {
  this.plugin.sign()
  this.currState = this.signState
}
Upload.prototype.uploading = function() {
  this.button1.innerHTML = '正在上传，点击暂停'
  this.plugin.uploading()
  this.currState = this.uploadingState
}
Upload.prototype.pause = function() {
  this.button1.innerHTML = '已暂停，点击继续上传'
  this.plugin.pause()
  this.currState = this.pauseState
}
Upload.prototype.done = function() {
  this.button1.innerHTML = '上传完成'
  this.plugin.done()
  this.currState = this.doneState
}
Upload.prototype.error = function() {
  this.button1.innerHTML = '上传失败'
  this.currState = this.errorState
}
Upload.prototype.del = function() {
  this.plugin.del()
  this.dom.parentNode.removeChild(this.dom)
}
var StateFactory = (function() {
  var State = function() {}
  State.prototype.clickHandler1 = function() {
    throw new Error('子类必须重写父类的clickHandler1 方法')
  }
  State.prototype.clickHandler2 = function() {
    throw new Error('子类必须重写父类的clickHandler2 方法')
  }
  return function(param) {
    var F = function(uploadObj) {
      this.uploadObj = uploadObj
    }
    F.prototype = new State()
    for (var i in param) {
      F.prototype[i] = param[i]
    }
    return F
  }
})()
var SignState = StateFactory({
  clickHandler1: function() {
    console.log('扫描中，点击无效...')
  },
  clickHandler2: function() {
    console.log('文件正在上传中，不能删除')
  },
})
var UploadingState = StateFactory({
  clickHandler1: function() {
    this.uploadObj.pause()
  },
  clickHandler2: function() {
    console.log('文件正在上传中，不能删除')
  },
})
var PauseState = StateFactory({
  clickHandler1: function() {
    this.uploadObj.uploading()
  },
  clickHandler2: function() {
    this.uploadObj.del()
  },
})
var DoneState = StateFactory({
  clickHandler1: function() {
    console.log('文件已完成上传, 点击无效')
  },
  clickHandler2: function() {
    this.uploadObj.del()
  },
})
var ErrorState = StateFactory({
  clickHandler1: function() {
    console.log('文件上传失败, 点击无效')
  },
  clickHandler2: function() {
    this.uploadObj.del()
  },
})
var uploadObj = new Upload('JavaScript 设计模式与开发实践')
uploadObj.init()
window.external.upload = function(state) {
  uploadObj[state]()
}
window.external.upload('sign')
setTimeout(function() {
  window.external.upload('uploading') // 1 秒后开始上传
}, 1000)
setTimeout(function() {
  window.external.upload('done') // 5 秒后上传完成
}, 5000)
```

### javascript 版本的状态机

第一种

```js
var Light = function() {
  this.currState = FSM.off // 设置当前状态
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button'),
    self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function() {
    self.currState.buttonWasPressed.call(self) // 把请求委托给FSM 状态机
  }
}
var FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currState = FSM.on
    },
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currState = FSM.off
    },
  },
}
var light = new Light()
light.init()
```

第二种

```js
var delegate = function(client, delegation) {
  return {
    buttonWasPressed: function() {
      // 将客户的操作委托给delegation 对象
      return delegation.buttonWasPressed.apply(client, arguments)
    },
  }
}

var FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currState = this.onState
    },
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currState = this.offState
    },
  },
}

var Light = function() {
  this.offState = delegate(this, FSM.off)
  this.onState = delegate(this, FSM.on)
  this.currState = this.offState // 设置初始状态为关闭状态
  this.button = null
}

Light.prototype.init = function() {
  var button = document.createElement('button'),
    self = this
  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function() {
    self.currState.buttonWasPressed()
  }
}
var light = new Light()
light.init()
```

### 表驱动的有限状态机

下一个状态是由当前状态和行为共同决定的

```js
var fsm = StateMachine.create({
  initial: 'off',
  events: [
    {
      name: 'buttonWasPressed',
      from: 'off',
      to: 'on',
    },
    {
      name: 'buttonWasPressed',
      from: 'on',
      to: 'off',
    },
  ],
  callbacks: {
    onbuttonWasPressed: function(event, from, to) {
      console.log(arguments)
    },
  },
  error: function(eventName, from, to, args, errorCode, errorMessage) {
    console.log(arguments) // 从一种状态试图切换到一种不可能到达的状态的时候
  },
})

button.onclick = function() {
  fsm.buttonWasPressed()
}
```

参考

[javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine)

## 十四 适配器模式

解决两个软件实体间的接口不兼容的问题

例一

```js
var googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图')
  },
}
var baiduMap = {
  display: function() {
    console.log('开始渲染百度地图')
  },
}
var baiduMapAdapter = {
  show: function() {
    return baiduMap.display()
  },
}

renderMap(googleMap) // 输出：开始渲染谷歌地图
renderMap(baiduMapAdapter) // 输出：开始渲染百度地图
```

例二

```js
var guangdongCity = {
  shenzhen: 11,
  guangzhou: 12,
  zhuhai: 13,
}
var getGuangdongCity = function() {
  var guangdongCity = [
    {
      name: 'shenzhen',
      id: 11,
    },
    {
      name: 'guangzhou',
      id: 12,
    },
  ]
  return guangdongCity
}
var render = function(fn) {
  console.log('开始渲染广东省地图')
  document.write(JSON.stringify(fn()))
}
var addressAdapter = function(oldAddressfn) {
  var address = {},
    oldAddress = oldAddressfn()
  for (var i = 0, c; (c = oldAddress[i++]); ) {
    address[c.name] = c.id
  }
  return function() {
    return address
  }
}
render(addressAdapter(getGuangdongCity))
```
