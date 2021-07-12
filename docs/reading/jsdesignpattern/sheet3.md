# 《JavaScript设计模式》结构型设计模式

## 外观模式

 为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易。在JavaScript中有时也会用于对底层结构兼容性做统一的封装来简化用户使用

```js
var getEvent = function (event) {
   //标准浏览器返回event，IE返回window.event
   return event || window.event;
 }
 var getTarget = function (event) {
   var event = getEvent(event);
   //标准浏览器返回target,IE返回srcElement
   return event.target || event.srcElement;
 }
 var preventDefault = function (event) {
   var event = getEvent(event);
   //标准浏览器
   if (event.preventDefault) {
     event.preventDefault();
   } //IE浏览器
   else {
     event.returnValue = false;
   }
 }
 document.onclick = function (e) {
   //阻止默认行为
   preventDefault(e);
   //获取事件源目标对象
   if (getTarget(e) !== document.getElementById('btn')) {
     console.log("阻止");
   }
 }
```

## 适配器模式

将一个类(对象)的接口(方法或属性)转化成为另外一个接口，使类（对象）之间接口的不兼容问题通过适配器得以解决

### 适配不同框架

```js
var NewJQuery = {
  $: function (id) {
    return document.getElementById(id);
  },
  css: function (id, key, value) {
    this.$(id).style[key] = value;
  }
}
NewJQuery.$ = function (id) {
  return $("#" + id);
}
NewJQuery.css = function (id, key, value) {
  return $("#" + id).css(key, value);
}
console.log(NewJQuery.$("id"));
NewJQuery.css("id", "background-color", "red");
```

### 参数适配

```js
function doSomeThing(obj) {
  var _adapter = {
    id: 1,
    name: "Tom",
    age: 20,
    sex: "男",
    hobby: "篮球"
  }
  for (var i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i];
  }
  return _adapter;
}
```

### 数据适配

```js
function arrToObjAdapter(arr) {
  return {
    name: arr[0],
    age: arr[1]
  }
}
arrToObjAdapter(['Tom', 21])
```

## 代理模式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <iframe name="proxyIframe" id="proxyIframe" src=""> </iframe>
    <form
      action="http://localhost:51410/home/index"
      method="post"
      target="proxyIframe"
    >
      <input type="text" name="callback" value="callback" />
      <input type="text" name="proxy" value="http://127.0.0.1:5500/b.html" />
      <input type="submit" value="提交" />
    </form>
    <script type="text/JavaScript">
      function callback(data){
      　　console.log('成功接收数据', data);
      }
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <script type="text/JavaScript">
        //页面加载后执行
     window.onload = function(){
     　　//如果不在A页面中返回，不执行
     　　if(top == self) return;
     　　//获取并解析searcher中的数据
     　　var arr = location.search.substr(1).split('&'),
     　　//预定义函数名称以及参数集
     　　　　fn, args;
     　　for(var i = 0, len = arr.length, item; i < len; i++){
     　　　　//解析searcher中的每组数据
     　　　　item = arr[i].split('=');
     　　　　//判断是否为回调函数
     　　　　if(item[0] == 'callback'){
     　　　　　　//设置回调函数
     　　　　　　fn = item[1];
     　　　　//判断是否是参数集
     　　　　}else if(item[0] == 'arg'){
     　　　　　　//设置参数集
     　　　　　　args = item[1];
     　　　　}
     　　}
     　　try{
     　　　　//执行A页面中预设的回调函数
     　　　　eval('top.' + fn + '("' + args + '")');
     　　}catch(e){}
     }
     </script>
</body>

</html>
```

```csharp
public ActionResult Index()
{
    HttpContext.Response.StatusCode = 302;
    var url = HttpContext.Request["proxy"] + "?callback=" + HttpContext.Request["callback"] + "&arg=success";
    HttpContext.Response.RedirectLocation = url;
    return View();
}
```

## 装饰者模式

在不改变原对象的基础上，通过对其进行过包装拓展（添加属性高或者方法）使原有对象可以满足用户的更复杂需求

```js
var decorator = function (input, fn) {
  //获取事件源
  var input = document.getElementById(input);
  //判断事件源是否绑定事件
  if (typeof input.onclick === 'function') {
    //缓存事件源原有回调函数
    var oldClickFn = input.onclick;
    //为事件源定义新的事件
    input.onclick = function () {
      //事件源原有回调函数
      oldClickFn();
      //新增的回调函数
      fn();
    }
  } else {
    //如果事件源未绑定，直接为事件源添加新增回调函数
    input.onclick = fn;
  }
}
decorator('id', function () {
  console.log(1);
});
```

## 桥接模式

在系统沿着多个维度变化的同时，又不增加其复杂度并已达到解耦

```js
var spans = document.getElementsByTagName('span');
spans[0].onmouseover = function () {
  this.style.color = 'red';
  this.style.background = '#ddd';
}
spans[0].onmouseout = function () {
  this.style.color = '#333';
  this.style.background = '#f5f5f5';
}
function changeColor(dom, color, bg) {
  dom.style.color = color;
  dom.style.background = bg;
}
var spans = document.getElementsByTagName('span');
spans[0].onmouseover = function () {
  changeColor(this, 'red', '#ddd');
}
spans[0].onmouseout = function () {
  changeColor(this, '#333', '#f5f5f5');
}
```

## 组合模式

又称部分-整体模式，将对象组合成树形结构以表示“部分整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性

```js
function inheritObject(o) {
  //声明一个过渡函数对象
  function Obj() {}
  //过渡对象的原型继承父对象
  Obj.prototype = o;
  //返回过渡对象的一个实例，该实例的原型继承了父对象
  return new Obj();
}
function inheritPrototype(subClass, superClass) {
  //复制一份父类的原型保存在变量中
  var parent = inheritObject(superClass.prototype);
  //修正因为重写子类原型导致子类的constructor属性被修改
  parent.constructor = subClass;
  //设置子类的原型
  subClass.prototype = parent;
}
var News = function () {
  //子组件容器
  this.children = [];
  //当前组件元素
  this.element = null;
}
News.prototype = {
  init: function () {
    throw new Error("方法必须重写！");
  },
  add: function () {
    throw new Error("方法必须重写！");
  },
  getElement: function () {
    throw new Error("方法必须重写！");
  }
}
var Container = function (id, parent) {
  //构造函数继承父类
  News.call(this);
  //模块ID
  this.id = id;
  //模块的父容器
  this.parent = parent;
  //构建初始化方法
  this.init();
}
inheritPrototype(Container, News);
Container.prototype.init = function () {
  this.element = document.createElement('ul');
  this.element.id = this.id;
  this.element.className = 'articles-container'
}
Container.prototype.add = function (child) {
  //在子元素容器中插入子元素
  this.children.push(child);
  //插入当前组件元素树中
  this.element.appendChild(child.getElement());
  return this;
}
Container.prototype.getElement = function () {
  return this.element;
}
Container.prototype.show = function () {
  this.parent.appendChild(this.element);
}
var Item = function (className) {
  News.call(this);
  this.className = className || "";
  this.init();
}
inheritPrototype(Item, News);
Item.prototype.init = function () {
  this.element = document.createElement('li');
  this.element.className = this.className;
}
Item.prototype.add = function (child) {
  //在子元素容器中插入子元素
  this.children.push(child);
  //插入当前组件元素树中
  this.element.appendChild(child.getElement());
  return this;
}
Item.prototype.getElement = function () {
  return this.element;
}
//图片文章列表
var ImageNews = function (url, href, className) {
  News.call(this);
  this.url = url || "";
  this.href = href || "#";
  this.className = className || "normal";
  this.init();
}
inheritPrototype(ImageNews, News);
ImageNews.prototype.init = function () {
  this.element = document.createElement('a');
  var img = new Image();
  img.src = this.url;
  this.element.appendChild(img);
  this.element.className = 'image-news' + this.className;
  this.element.href = this.href;
}
ImageNews.prototype.add = function () {}
ImageNews.prototype.getElement = function () {
  return this.element;
}
//文字文章列表
var TextNews = function (text, href) {
  News.call(this);
  this.text = text || "";
  this.href = href || "#";
  this.init();
}
inheritPrototype(TextNews, News);
TextNews.prototype.init = function () {
  this.element = document.createElement('a');
  this.element.innerHTML = this.text;
  this.element.href = this.href;
  this.element.className = "text";
}
TextNews.prototype.add = function () {}
TextNews.prototype.getElement = function () {
  return this.element;
}
var newObj = new Container('articles', document.body);
newObj.add(new Item('normal').add(
    new ImageNews('img/HBuilder.png', '#', 'small')
  )
  .add(new Item('normal').add(
    new ImageNews('img/HBuilder.png', '#', 'small')
  ))
  .add(new Item('normal').add(
    new TextNews('测试列表', '#')
  ))
  .add(new Item('normal').add(
    new TextNews('测试列表2', '#')
  ))
).show();
```

## 享元模式

运用共享技术有效地支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销

```js
// 享元对象
var Flyweight = function () {
  var created = [];
  function create() {
    var dom = document.createElement('div');
    document.getElementById('container').appendChild(dom);
    created.push(dom);
    return dom;
  }
  return {
    getDiv: function () {
      if (created.length < 5) {
        return create();
      } else {
        var div = created.shift();
        created.push(div);
        return div;
      }
    }
  }
}();
// 实现需求
var paper = 0,
  num = 5,
  len = article.length;
for (var i = 0; i < 5; i++) {
  if (article[i]) {
    Flyweight.getDiv().innerHTML = article[i];
  }
}
document.getElementById('next_page').onclick = function () {
  if (article.length < 5) {
    return
  }
  var n = ++paper * num % len,
    j = 0;
  for (; j < 5; j++) {
    if (article[n + j]) {
      Flyweight.getDiv().innerHTML = article[n + j];
    } else if (article[n + j - len]) {
      Flyweight.getDiv().innerHTML = article[n + j - len];
    } else {
      Flyweight.getDiv().innerHTML = "";
    }
  }
}
```