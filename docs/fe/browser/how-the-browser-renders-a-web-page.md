# how-the-browser-renders-a-web-page

## 浏览器的高层结构

|                   |                                                              |
| ----------------- | ------------------------------------------------------------ |
| 用户界面          | 这包括地址栏、后退/前进按钮、书签菜单等。除了您看到请求页面的窗口之外，浏览器的每个部分都会显示 |
| 浏览器引擎        | 在 UI 和渲染引擎之间编组动作                                 |
| 渲染引擎          | 负责显示请求的内容。例如，如果请求的内容是 HTML，则渲染引擎会解析 HTML 和 CSS，并将解析后的内容显示在屏幕上，每个选项卡一个。每个选项卡在单独的进程中运行 |
| Networking        | 对于HTTP请求等网络调用，在一个独立于平台的接口后面使用不同平台的不同实现 |
| UI 后端           | 用于绘制基本小部件，如组合框和窗口。此后端公开了一个非平台特定的通用接口。在它下面使用操作系统用户界面方法 |
| JavaScript 解释器 | 用于解析和执行 JavaScript 代码                               |
| 数据存储          | 这是一个持久层。浏览器可能需要在本地保存各种数据，例如 cookie。浏览器还支持 localStorage、IndexedDB、WebSQL 和 FileSystem 等存储机制 |

![img](./images/PgPX6ZMyKSwF6kB8zIhB.png)

## 主流程

webkit

![img](./images/S9TJhnMX1cu1vrYuQRqM.png)

gecko(mozilla)

![img](./images/Tbif2mUJCUVyPdyXntZk.jpeg)

关键渲染路径

<https://developer.mozilla.org/zh-CN/docs/Web/Performance/Critical_rendering_path>

![img](https://miro.medium.com/max/1000/1*yQJkz12sPxS-kJoMDqzbEQ.png)

1. 解析 HTML，构建 DOM 树
2. 解析 CSS，生成 CSS 规则树
3. 合并 DOM 树和 CSS 规则，生成 render 树
4. 布局 render 树（Layout/reflow），负责各元素尺寸、位置的计算
5. 绘制 render 树（paint），绘制页面像素信息
6. 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（composite），显示在屏幕上



## 解析

词法分析和语法分析

![img](./images/TfY1qPDNbZS8iBnlAO4b.png)

DOMParser

将原始 HTML 文本（_代码_）解析为 DOM 树

![img](https://miro.medium.com/max/700/1*DTO0PBRawrEdZakWloQVjg.png)

script 阻塞解析，async defer

preload

### 脚本阻塞解析

因为`script`元素是**解析器阻塞的**。每个外部文件请求，如**image**、**stylesheet**、**pdf**、**video**等，都不会阻塞 DOM 构建（_解析_），脚本（`*.js*`）文件请求除外

```js
document.addEventListener(' DOMContentLoaded ', function(e) {
  console.log('DOM 已完全解析！')
})
```

### Css 阻塞渲染

<https://cloud.tencent.com/developer/article/1370715>

DOM 树的生成是**增量的**

CSSOM 树的构建[**不是增量式的**](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path#CSS_Object_Model)

css 不阻塞 dom 解析，则塞渲染

这种机制为什么？

css 加载会阻塞后面 js 语句的执行

```js
window.addEventListener('load', function(e) {
  console.log('页面已完全加载！')
})
```

## 重排重绘

### 引起重排/重绘的常见操作[#](https://febook.hzfe.org/awesome-interview/book1/browser-repain-reflow#引起重排重绘的常见操作)

1. 外观有变化时，会导致**重绘**。相关的样式属性如 `color` `opacity` 等。
2. 布局结构或节点内容变化时，会导致重排。相关的样式属性如 height、float、position 等。
   - 盒子尺寸和类型。
   - 定位方案（正常流、浮动和绝对定位）。
   - 文档树中元素之间的关系。
   - 外部信息（如视口大小等）。
3. 获取布局信息时，会导致**重排**。相关的方法属性如 `offsetTop` `getComputedStyle` 等

### 那些 css 属性引起重排重绘？

<https://csstriggers.com/>

### 解决方案

1. 对 DOM 进行批量写入和读取（通过虚拟 DOM 或者 DocumentFragment 实现）。

1. 避免对样式频繁操作，了解常用样式属性触发 Layout / Paint / Composite 的[机制](https://csstriggers.com/)，合理使用样式。
1. 合理利用特殊样式属性（如 transform: translateZ(0) 或者 will-change），将渲染层提升为合成层，开启 GPU 加速，提高页面性能。
1. 使用变量对布局信息（如 clientTop）进行缓存，避免因频繁读取布局信息而触发重排和重绘。

## reference

<https://github.com/abcrun/abcrun.github.com/issues/17>

<https://github.com/skyline75489/what-happens-when-zh_CN>

<https://web.dev/howbrowserswork/>

<https://medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969>
