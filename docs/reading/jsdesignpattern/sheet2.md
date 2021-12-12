# 《JavaScript 设计模式》创建型设计模式

## 简单工厂模式

由一个工厂对象决定创建某种产品对象的实例，主要用来创建同一类对象

### 多个类由一个 Factory 控制创建

```js
//警示框类
var LoginAlert = function(text) {
  this.content = text
}
LoginAlert.prototype.show = function() {
  console.log('显示警告框')
}
//确认框类
var LoginConfirm = function(text) {
  this.content = text
}
LoginConfirm.prototype.show = function() {
  console.log('显示确认框')
}
//提示框类
var LoginPrompt = function(text) {
  this.content = text
}
LoginPrompt.prototype.show = function() {
  console.log('显示提示框')
}
//登录模块工厂
var PopFactory = function(name) {
  switch (name) {
    case 'alert':
      return new LoginAlert('显示警告框')
    case 'confirnm':
      return new LoginConfirm('显示确认框')
    case 'prompt':
      return new LoginPrompt('显示提示框')
  }
}
//使用示例
var oAlert = new PopFactory('alert')
console.log(oAlert) //LoginAlert { content: undefined }
console.log(oAlert.content) //显示警告框
oAlert.show() //显示警告框
```

### 创建一个新对象然后包装增强

```js
function createPop(type, text) {
  var o = new Object()
  o.content = text
  o.show = function() {
    // 显示方法
  }
  if (type == 'alert') {
    //警示框差异部分
    console.log('警示: ' + text)
  }
  if (type == 'prompy') {
    //提示框差异部分
    console.log('提示: ' + text)
  }
  if (type == 'confirm') {
    //确认框差异部分
    console.log('确认: ' + text)
  }
  return o
}
var userNameAlert = createPop('alert', '用户名只能是26个字母和数字')
```

## 工厂方法模式

- 将实际创建对象的工作推迟到子类中

- 将创建对象的基类放在工厂方法累的原型中

```js
//安全模式创建的工厂类
var Factory = function(type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content)
    return s
  } else {
    return new Factory(type, content)
  }
}
//学科类工厂： 在工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
  Java: function(content) {
    this.content = content //将内容保存在content里面，以备后用
    ;(function(content) {
      //创建对象时，通过闭包直接执行，将内容按需求的样式插入到页面内
      var div = document.createElement('div')
      div.innerHTML = content
      div.style.color = 'green'
      document.getElementById('container').appendChild(div)
    })(content)
  },
  JavaScript: function(content) {
    this.content = content
    ;(function(content) {
      var div = document.createElement('div')
      div.innerHTML = content
      div.style.color = 'pink'
      document.getElementById('container').appendChild(div)
    })(content)
  },
  UI: function(content) {
    this.content = content
    ;(function(content) {
      var div = document.createElement('div')
      div.innerHTML = content
      div.style.border = '1px solid red'
      document.getElementById('container').appendChild(div)
    })(content)
  },
  PHP: function(content) {
    this.content = content
    ;(function(content) {
      var div = document.createElement('div')
      div.innerHTML = content
      div.style.color = 'yellow'
      div.style.background = 'red'
      document.getElementById('container').appendChild(div)
    })(content)
  },
}
```

## 抽象工厂模式

通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责创某一类的实例

- 实现子类继承父类的方法

```js
//创建抽象工厂方法
var VehicleFactory = function(subType, superType) {
  //判断抽象工厂中是否有该抽象类
  if (typeof VehicleFactory[superType] === 'function') {
    function F() {} //缓存类
    F.prototype = new VehicleFactory[superType]() //继承父类属性和方法
    subType.constructor = subType //将子类的constructor指向子类
    subType.prototype = new F() //子类原型继承父类
  } else {
    throw new Error('未创建该抽象类!') //不存在该抽象类时抛出错误
  }
}
//小汽车抽象类
VehicleFactory.Car = function() {
  this.type = 'car'
}
VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用!')
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用!')
  },
}
//公交车抽象类
VehicleFactory.Bus = function() {
  this.type = 'bus'
}
VehicleFactory.Bus.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用!')
  },
  getPassengerNum: function() {
    return new Error('抽象方法不能调用!')
  },
}
//货车抽象类
VehicleFactory.Trunk = function() {
  this.type = 'trunk'
}
VehicleFactory.Trunk.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用!')
  },
  getTrainload: function() {
    return new Error('抽象方法不能调用!')
  },
}
//宝马汽车子类
var BMW = function(price, speed) {
  this.price = price
  this.speed = speed
}
//抽象工厂实现对Car抽象类的继承
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function() {
  return this.price
}
BMW.prototype.getSpeed = function() {
  return this.speed
}
//兰博基尼汽车子类
var Lamborghini = function(price, speed) {
  this.price = price
  this.speed = speed
}
VehicleFactory(Lamborghini, 'Car')
Lamborghini.prototype.getPrice = function() {
  return this.price
}
Lamborghini.prototype.getSpeed = function() {
  return this.speed
}
//宇通汽车子类
var YUTONG = function(price, speed) {
  this.price = price
  this.speed = speed
}
VehicleFactory(YUTONG, 'Car')
YUTONG.prototype.getPrice = function() {
  return this.price
}
YUTONG.prototype.getSpeed = function() {
  return this.speed
}
//奔驰汽车子类
var BenzTrunk = function(price, trainLoad) {
  this.price = price
  this.trainLoad = trainLoad
}
VehicleFactory(BenzTrunk, 'Trunk')
BenzTrunk.prototype.getPrice = function() {
  return this.price
}
BenzTrunk.prototype.getTrainload = function() {
  return this.price
}
// 测试示例
var trunk = new BenzTrunk(100000000, 1000)
console.log(trunk.getPrice()) //100000000
console.log(trunk.type) //trunk
```

## 建造者模式

将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示

- 注重的是创建细节
- 创建的是一个复合对象

```js
//创建一个Human类
var Human = function(param) {
  this.skill = (param && param.shill) || '保密'
  this.hobby = (param && pram.hobby) || '爱好'
}
Human.prototype = {
  getSkill: function() {
    return this.shill
  },
  getHobby: function() {
    return this.hobby
  },
}
//实例化创建的姓名类
var Named = function(name) {
  var oThis = this
  ;(function(name, oThis) {
    oThis.wholeName = name
    if (name.indexOf(' ') > -1) {
      oThis.FirstName = name.slice(0, name.indexOf(' '))
      oThis.secondName = name.slice(name.indexOf(' '))
    }
  })(name, oThis)
}
//实例化创建的工作类
var Work = function(work) {
  var oThis = this
  ;(function(work, oThis) {
    switch (work) {
      case 'code':
        oThis.work = '工程师'
        oThis.workDescript = '每天沉溺于编程'
        break
      case 'UI':
        oThis.work = '设计师'
        oThis.workDescript = '想象力无比丰富'
        break
      case 'UE':
        oThis.work = '设计'
        oThis.workDescript = '设计更似一种艺术'
        break
      case 'teach':
        oThis.work = '教师'
        oThis.workDescript = '分享是一种快乐'
        break
      default:
        oThis.work = work
        oThis.workDescript = '抱歉，还未找到您所选择的职位的描述'
    }
  })(work, oThis)
}
//更改期望的职位
Work.prototype.changeDescript = function(work) {
  this.work = work
}
//添加对职位的描述
Work.prototype.changeDescript = function(sentence) {
  this.workDescript = sentence
}

//创建完整的对象
var Person = function(name, work) {
  var person = new Human() //创建应聘者缓存对象
  person.name = new Named(name) //创建应聘者姓名解析对象
  person.work = new Work(work) //创建应聘者期望职位
  return person //返回应聘者对象
}
var person = new Person('Cynthia xie', 'code')
console.log(person.skill) //保密
console.log(person.name.FirstName) //Cynthia
console.log(person.work.work) //工程师
console.log(person.work.workDescript) //每天沉溺于编程
person.work.changeDescript('更改职位描述')
console.log(person.work.workDescript) //更改职位描述
```

## 原型模式

用原型实例指向创建对象的类，适用于创建新的对象的类共享原型对象的属性及方法

将可复用的、可共享的、消耗大的的从基类中提取出来放在其原型中，然后子类通过组合继承或者寄生组合式继承将方法和属性继承下来

```js
//图片轮播类
var LoopImages = function(imgAttr, container) {
  this.imgesArray = imgAttr
  this.container = container
  // this.createImage = function(){};
  // this.changeImage = function(){};
}
LoopImages.prototype = {
  createImage: function() {
    console.log('LoopImages createImage function')
  },
  changeImage: function() {
    console.log('LoopImages changeImage function')
  },
}

//上下滑动切换
var SlideLoopImg = function(imgAttr, container) {
  LoopImages.call(this, imgAttr, container)
}
SlideLoopImg.prototype = new LoopImages()
SlideLoopImg.prototype.changeImage = function() {
  console.log('SlideLoopImg changeImage function')
}
//渐隐切换类
var FadeLoopImg = function(imgAttr, container, arrow) {
  LoopImages.call(this, imgAttr, container)
  this.arrow = arrow
}
FadeLoopImg.prototype = new LoopImages()
FadeLoopImg.prototype.changeImage = function() {
  console.log('FadeLoopImg changeImage function')
}

var fadeImg = new FadeLoopImg(['1.jpg', '2.jpg', '3.jpg', '4.jpg'], 'slide', [
  'left.jpg',
  'right.jpg',
])

//测试用例
console.log(fadeImg.container) //slide
fadeImg.changeImage() //FadeLoopImg changeImage function

//原型的拓展：子类和父类的额实例对象都会被继承下来
LoopImages.prototype.getImageLength = function() {
  return this.imgesArray.length
}
LoopImages.prototype.getContainer = function() {
  return this.container
}
console.log(fadeImg.getImageLength()) //4
console.log(fadeImg.getContainer()) //slide
```

不使用`new`

```js
//基于已经缓存的模板对象克隆出新对象的模式
function prototypeExtend() {
  var F = function() {} //缓存类，为实例化返回对象临时创建
  var args = arguments,
    i = 0,
    len = args.length
  for (; i < len; i++) {
    for (var j in args[i]) {
      //遍历每个模板对象中的属性
      F.prototype[j] = args[i][j] //将这些属性复制到缓存类原型中
    }
  }
  return new F() //返回缓存类的一个实例
}
var penguin = prototypeExtend(
  {
    speed: 20,
    swim: function() {
      console.log('游泳速度 ' + this.speed)
    },
  },
  {
    run: function(speed) {
      console.log('奔跑速度 ' + speed)
    },
  },
  {
    jump: function() {
      console.log('跳跃动作')
    },
  }
)

penguin.swim() //游泳速度 20
penguin.run(10) //游泳速度 10
penguin.jump() //跳跃动作
```

## 单例模式

只允许实例化一次的对象类

- 规划命名空间

### 管理静态变量

```js
var Conf = (function() {
  var conf = {
    MAX_NUM: 100,
    MIN_NUM: 1,
    COUNT: 1000,
  }
  return {
    get: function(name) {
      return conf[name] ? conf[name] : null
    },
  }
})()
var count = Conf.get('COUNT')
console.log(count) // 1000
```

### 惰性单例

```js
//惰性载入单例
var LazySingle = (function() {
  var instance = null //单例实例引用
  function Single() {
    //单例
    /*在这里定义使用属性和方法*/
    return {
      publicMethod: function() {},
      publicProperty: '1.0',
    }
  }
  return function() {
    //获取单例对象的借口
    if (!instance) {
      //如果是创建单例将创建单例
      instance = Single()
    }
    return instance //返回单例
  }
})()
console.log(LazySingle().publicProperty) //结果： 1.0
```
