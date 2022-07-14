# 深入了解浏览器

## 一、多进程架构图

![img](./images/JvSL0B5q1DmZAKgRHj42.png)

| 进程     | 说明                                                 |
| -------- | ---------------------------------------------------- |
| Browser  | 地址栏、书签、后退和前进按钮、网络请求和文件访问等   |
| Renderer | 一个选项卡、每个跨站点 iframe 运行单独的渲染器进程   |
| Plugin   | 一个插件一个进程                                     |
| GPU      | 处理来自多个应用程序的请求并将它们绘制在同一个表面上 |

好处

- 当一个选项卡无响应时，不影响其他tab

- 安全性和沙盒

为了节省内存，Chrome 限制了它可以启动的进程数。限制取决于您的设备拥有多少内存和 CPU 能力，但是当 Chrome 达到限制时，它会开始在一个进程中运行来自同一站点的多个选项卡

![img](./images/browser-process.jpg)

## 三、渲染器进程

<https://developer.chrome.com/blog/inside-browser-part3/>

渲染器进程的核心工作是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页。

### 解析

#### DOM构建

**主**线程开始**解析**文本字符串 (HTML) 并将其转换为**文档**对象模型( **DOM** )

```js
new DOMParser().parseFromString('<h1>1</h1>',"text/html")
```

::: info

将 HTML 提供给浏览器永远不会引发错误

<https://html.spec.whatwg.org/multipage/parsing.html#an-introduction-to-error-handling-and-strange-cases-in-the-parser>

:::

#### 子资源加载

网站通常使用图像、CSS 和 JavaScript 等外部资源。这些文件需要从网络或缓存中加载。主线程*可以*在解析构建DOM的过程中找到它们时一一请求，但为了加快速度，“预加载扫描器”是并发运行的。如果 HTML 文档中有类似的东西`<img>`，`<link>`预加载扫描器会查看 HTML 解析器生成的令牌，并向浏览器进程中的网络线程发送请求

![img](./images/qmuN5aduuEit6SZfwVOi.png)

#### JavaScript 阻止解析

当 HTML 解析器找到一个`<script>`标签时，

1. 它会暂停 HTML 文档的解析，

2. 并且必须加载、解析和执行 JavaScript 代码。

为什么？因为 JavaScript 可以使用诸如 document.write() 之类的东西来改变文档的形状

> document.write()会让整个解析重新开始？

![img](./images/parsing-model-overview.svg)

#### 优化

- async

- defer
- js 模块
- preload

### 样式计算

主线程解析 CSS 并确定每个 DOM 节点的计算样式。这是关于基于 CSS 选择器将哪种样式应用于每个元素的信息

![img](./images/hGqtsAuYpEYX4emJd5Jw.png)

默认样式

<https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/html/resources/html.css>
