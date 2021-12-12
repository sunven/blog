# requirejs 基础

## 引用

```javascript
<script src="js/require.js" data-main="js/main"></script>
```

## 主模块

```javascript
// main.js
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　// some code here
});

require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
　　// some code here
});
```

## 模块的加载

```javascript
require.config({
　　paths: {
　　　　"jquery": "jquery.min",
　　　　"underscore": "underscore.min",
　　　　"backbone": "backbone.min"
　　}
});

require.config({
　　baseUrl: "js/lib",
　　paths: {
　　　　"jquery": "jquery.min",
　　　　"underscore": "underscore.min",
　　　　"backbone": "backbone.min"
　　}
});

require.config({
　　paths: {
　　　　"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
　　}
});
```

## AMD模块的写法

```javascript
// math.js
define(function (){
　　var add = function (x,y){
　　　　return x+y;
　　};
　　return {
　　　　add: add
　　};
});

// main.js
require(['math'], function (math){
　　alert(math.add(1,1));
});

define(['myLib'], function(myLib){
　　function foo(){
　　　　myLib.doSomething();
　　}
　　return {
　　　　foo : foo
　　};
});
```

## 加载非规范的模块

```javascript
require.config({
　　shim: {
　　　　'underscore':{
　　　　　　exports: '_'
　　　　},
　　　　'backbone': {
　　　　　　deps: ['underscore', 'jquery'],
　　　　　　exports: 'Backbone'
　　　　}
　　}
});

//Jquery插件
shim: {
　　'jquery.scroll': {
　　　　deps: ['jquery'],
　　　　exports: 'jQuery.fn.scroll'
　　}
}
```

## require.js插件

```javascript
//domready插件，可以让回调函数在页面DOM结构加载完成后再运行
require(['domready!'], function (doc){
　　// called once the DOM is ready
});

//text和image插件，则是允许require.js加载文本和图片文件
define([
　　'text!review.txt',
　　'image!cat.jpg'
　　],
　　function(review,cat){
　　　　console.log(review);
　　　　document.body.appendChild(cat);
　　}
);
```

## [api](http://www.requirejs.org/docs/api.html#config)

require.js的诞生，就是为了解决这两个问题：

1. 实现js文件的异步加载，避免网页失去响应。
2. 管理模块之间的依赖性，便于代码的编写和维护。

```js
<script src="js/require.js" data-main="js/main"></script>
```

> 不能加type="javascript"？？？

data-main属性的作用是，指定网页程序的主模块。

```js
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
    //...
});
```

require.js会先加载jQuery、underscore和backbone，然后再运行回调函数。主模块的代码就写在回调函数中。

```js
require.config({
    //baseUrl: "http://apps.bdimg.com/libs",//基目录
    //配置那些不在baseUrl下的模块，这个指定的path假定是baseUrl的相对路径，若是以/开头的话就不是了
    paths: {
        "jquery": "http://apps.bdimg.com/libs/jquery/2.1.4/jquery",
        "underscore": "http://apps.bdimg.com/libs/underscore.js/1.7.0/underscore-min",
        "backbone": "http://apps.bdimg.com/libs/backbone.js/1.1.2/backbone-min",
        //"math":"math"
    },
    //加载非规范的模块
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'], //表明该模块的依赖性
            exports: 'Backbone' //输出的变量名,表明这个模块外部调用时的名称
        }
    }
});
```

math.js

```js
define(["jquery"], function ($) {
    //依赖于jquery的写法
    var add = function (x, y) {

        return x + y;

    };
    return {

        add: add
    };
});
```

使用math

```js
require(['math'], function (math) {
    alert(math.add(1, 1));
});
```

> require.js加载的模块，采用AMD规范

## [插件](https://github.com/requirejs/requirejs/wiki/Plugins)
