# AMD 和 CMD

## 脚本的无阻塞加载

moduleA.js 代码

```js
console.log("I'm A");
/*
此处可以放jquery源码
使得该文件变大，以便异步加载时看效果
*/
```

moduleB.js 代码

```js
console.log("I'm B");
```

同步加载

```js
<body>
    <script src="moduleA.js" onload="console.log('A loaded')"></script>
    <script src="moduleB.js" onload="console.log('B loaded')"></script>
</body>
```

输出

```js
I'm A
A loaded
I'm B
A loaded
```

### defer 和 async

`defer`：在文档完成解析后，触发 DOMContentLoaded 事件前执行。如果缺少 src 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用。对动态嵌入的脚本使用 `async=false` 来达到类似的效果。

`async`：是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用 (即没有src属性的脚本）。

#### defer 示例

```html
<body>
    <script defer src="moduleA.js" onload="console.log('A loaded')"></script>
    <script src="moduleB.js" onload="console.log('B loaded')"></script>
</body>
```

输出

```js
I'm B
B loaded
I'm A
A loaded
```

#### async 示例

异步加载

```js
<body>
    <script>
        loadScript("moduleA.js", "async A loaded");
        loadScript("moduleB.js", "async B loaded");

        function loadScript(url, text) {
            var srcEle = document.createElement("script");
            srcEle.src = url;
            srcEle.async = true;
            srcEle.onload = function () {
                console.log(text);
            };
            document.body.appendChild(srcEle);
        }
    </script>
</body>
```

> 动态创建的script标签，async默认为true;

输出

```js
I'm B
async B loaded
I'm A
async A loaded
```

相同之处：

- 加载文件时不阻塞页面渲染
- 使用这两个属性的脚本中不能调用document.write方法
- 有脚本的onload的事件回调

不同之处

- 每一个async属性的脚本都在它下载结束之后立刻执行，同时会在window的load事件之前执行。所以就有可能出现脚本执行顺序被打乱的情况；
- 每一个defer属性的脚本都是在页面解析完毕之后，按照原本的顺序执行，同时会在document的DOMContentLoaded之前执行

## AMD和CMD

### AMD

RequireJS的标准

特点：依赖前置、预执行

```js
define(['./a', './b'], function(a, b) {
    //运行至此，a.js和b.js已经下载完成
    //a模块和b模块已经执行完
    a.doing();
    b.doing();
});
```

### CMD

SeaJS的标准

特点：依赖就近、懒执行

```js
define(function(require, exports, module) {
    var a = require("./a");
    //等待a.js下载、执行完
    a.doing();
    var b = require("./b");
    //等待b.js下载、执行完
    b.doing();
});
```

## reference

[AMD 和 CMD 的区别有哪些？](https://www.zhihu.com/question/20351507)