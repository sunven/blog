# how-the-browser-renders-a-web-page



### 浏览器的高层结构

1. **用户界面** - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
2. **浏览器引擎** - 在用户界面和呈现引擎之间传送指令。
3. **呈现引擎** - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
4. **网络** - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
5. **用户界面后端** - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
6. **JavaScript 解释器**。用于解析和执行 JavaScript 代码。
7. **数据存储**。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库

![img](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/layers.png)

关键渲染路径

https://developer.mozilla.org/zh-CN/docs/Web/Performance/Critical_rendering_path

![img](https://miro.medium.com/max/1000/1*yQJkz12sPxS-kJoMDqzbEQ.png)

主流程



![img](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/webkitflow.png)

1. 解析HTML，构建DOM树
2. 解析CSS，生成CSS规则树
3. 合并DOM树和CSS规则，生成render树
4. 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
5. 绘制render树（paint），绘制页面像素信息
6. 浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上

渲染

```javascript
1. 计算CSS样式

2. 构建渲染树

3. 布局，主要定位坐标和大小，是否换行，各种position overflow z-index属性

4. 绘制，将图像绘制出来
```



解析

DOMParser

将原始 HTML 文本（*代码*）解析为 DOM 树

![img](https://miro.medium.com/max/700/1*DTO0PBRawrEdZakWloQVjg.png)

script阻塞解析，async defer

preload

### 脚本阻塞解析



因为`script`元素是**解析器阻塞的**。每个外部文件请求，如**image**、**stylesheet**、**pdf**、**video**等，都不会阻塞 DOM 构建（*解析*），脚本（`*.js*`）文件请求除外

```js
document.addEventListener(' DOMContentLoaded ', function(e) { 
    console.log('DOM 已完全解析！'); 
} );
```



### Css 阻塞渲染



DOM 树的生成是**增量的**

CSSOM 树的构建[**不是增量式的**](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path#CSS_Object_Model)



```js
window.addEventListener('load', function(e) { 
  console.log('页面已完全加载！'); 
} )
```



## 重排重绘

### 引起重排/重绘的常见操作[#](https://febook.hzfe.org/awesome-interview/book1/browser-repain-reflow#引起重排重绘的常见操作)

1. 外观有变化时，会导致**重绘**。相关的样式属性如 `color` `opacity` 等。
2. 布局结构或节点内容变化时，会导致重排。相关的样式属性如height、float、position等。
   - 盒子尺寸和类型。
   - 定位方案（正常流、浮动和绝对定位）。
   - 文档树中元素之间的关系。
   - 外部信息（如视口大小等）。
3. 获取布局信息时，会导致**重排**。相关的方法属性如 `offsetTop` `getComputedStyle` 等

### 那些css属性引起重排重绘？

https://csstriggers.com/

### 解决方案

1. 对 DOM 进行批量写入和读取（通过虚拟 DOM 或者 DocumentFragment 实现）。

1. 避免对样式频繁操作，了解常用样式属性触发 Layout / Paint / Composite 的[机制](https://csstriggers.com/)，合理使用样式。
2. 合理利用特殊样式属性（如 transform: translateZ(0) 或者 will-change），将渲染层提升为合成层，开启 GPU 加速，提高页面性能。
3. 使用变量对布局信息（如 clientTop）进行缓存，避免因频繁读取布局信息而触发重排和重绘。

## reference

https://github.com/abcrun/abcrun.github.com/issues/17

https://github.com/skyline75489/what-happens-when-zh_CN

https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/

https://medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969
