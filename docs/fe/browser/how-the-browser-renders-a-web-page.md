# 浏览器如何渲染一个页面

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

DOM解析和CSS解析是两个并行的进程

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

每种格式都必须具有由词汇和语法规则组成的确定性语法

-词法分析: 输入分解为标记的过程,标记是语言词汇表：有效构建块的集合。在人类语言中，它将由该语言词典中出现的所有单词组成
-语法分析: 构建树的过程,语言语法规则的应用
-解析过程是迭代

![img](./images/TfY1qPDNbZS8iBnlAO4b.png)

### 解析器的类型

- 自顶向下解析器: 检查语法的高级结构并尝试找到规则匹配。
- 自底向上解析器: 从输入开始，逐渐将其转换为语法规则，从低级规则开始，直到满足高级规则

### 自动生成解析器

提供你的语言的语法——它的词汇和语法规则——然后他们生成一个工作解析器

WebKit 使用两个众所周知的解析器生成器：用于创建词法分析器的Flex和用于创建解析器的Bison

## HTML 解析器

传统的解析器主题都不适用于 HTML

- 它允许您省略某些标记（然后隐式添加），或者有时省略开始或结束标记
- 解析过程是可重入的 `document.write()`

浏览器会创建自定义解析器来解析 HTML

### 解析完成时的操作

dom解析完：document.readyState为interactive

- 开始解析执行defer脚本
- 触发DOMContentLoaded（图像，样式表等未加载完继续加载）
- 都加载完，然后将文档状态设置为“完成” document.readyState为complete
- 触发load事件

### DOMParser

将原始 HTML 文本（_代码_）解析为 DOM 树

![img](https://miro.medium.com/max/700/1*DTO0PBRawrEdZakWloQVjg.png)

### 脚本阻塞解析

因为`script`元素是**解析器阻塞的**。每个外部文件请求，如**image**、**stylesheet**、**pdf**、**video**等，都不会阻塞 DOM 构建（_解析_），脚本（`*.js*`）文件请求除外

```js
document.addEventListener(' DOMContentLoaded ', function(e) {
  console.log('DOM 已完全解析！')
})
```

- async
- defer

## CSS 解析

![img](./images/vBMlouM57RHDG29Ukzhi.png)

查看: document.styleSheets

## 构造渲染树

计算所有可见内容的样式

dom tree + style rules = render tree

该树是按显示顺序排列的视觉元素。它是文档的可视化表示。此树的目的是使内容能够以正确的顺序绘制

非可视 DOM 元素不会插入到渲染树中

- head element
- display:none

## Layout

定义所有渲染树元素的位置和大小

渲染器被创建并添加到树中时，它没有位置和大小。计算这些值称为布局或回流

坐标系是相对于根框架的。使用顶部和左侧坐标

根渲染器的位置是 0,0，它的尺寸是视口 - 浏览器窗口的可见部分。

所有渲染器都有一个“布局”或“回流”方法，每个渲染器调用其需要布局的子级的布局方法

布局性能受 DOM 影响——节点数量越多，布局所需的时间越长

每当修改渲染树时，例如通过添加节点、更改内容或更新节点上的框模型样式，都会发生布局

## Paint

一旦创建了渲染树并进行了布局，就可以将像素绘制到屏幕上。加载时，整个屏幕都被绘制。之后，只会重新绘制屏幕的受影响区域，因为浏览器已优化为重新绘制所需的最小区域

## CSS 阻塞渲染

css规则可以被覆盖，所以在 CSSOM 完成之前无法渲染内容

### css 不阻塞 dom 解析，阻塞渲染

渲染依赖render tree, render tree依赖 CSSOM tree,CSS资源加载完成,才会生成CSSOM tree

### css会阻塞后面js的执行

由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕

### DOMContentLoaded

css会阻塞Dom渲染和后面js执行，而js会阻塞Dom解析，那么如果css后面有js,css会阻塞dom解析,DomContentLoaded必须等到css和js都加载完毕才触发

## 重排重绘

### 引起重排/重绘的常见操作

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

<https://cloud.tencent.com/developer/article/1370715>

<https://github.com/abcrun/abcrun.github.com/issues/17>

<https://github.com/skyline75489/what-happens-when-zh_CN>

<https://web.dev/howbrowserswork/>

<https://medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969>

<https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path>

<https://febook.hzfe.org/awesome-interview/book1/browser-repain-reflow>
