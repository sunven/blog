# 指标

## FCP

<https://web.dev/fcp/>

- **[First contentful paint 首次内容绘制 (FCP)]：**测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。

- **[Largest contentful paint 最大内容绘制 (LCP)](https://web.dev/lcp/)：**测量页面从开始加载到最大文本块或图像元素在屏幕上完成渲染的时间。*（[实验室](https://web.dev/user-centric-performance-metrics/#in-the-lab)、[实际](https://web.dev/user-centric-performance-metrics/#in-the-field)）*
- **[First input delay 首次输入延迟 (FID)](https://web.dev/fid/)：**测量从用户第一次与您的网站交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器实际能够对交互做出响应所经过的时间。*([实际](https://web.dev/user-centric-performance-metrics/#in-the-field))*
- **[Time to Interactive 可交互时间 (TTI)](https://web.dev/tti/)：**测量页面从开始加载到视觉上完成渲染、初始脚本（如果有的话）完成加载，并能够快速、可靠地响应用户输入所需的时间。*（[实验室](https://web.dev/user-centric-performance-metrics/#in-the-lab)）*
- **[Total blocking time 总阻塞时间 (TBT)](https://web.dev/tbt/)：**测量 FCP 与 TTI 之间的总时间，这期间，主线程被阻塞的时间过长，无法作出输入响应。*（[实验室](https://web.dev/user-centric-performance-metrics/#in-the-lab)）*
- **[Cumulative layout shift 累积布局偏移 (CLS)](https://web.dev/cls/)：**测量页面在开始加载和其[生命周期状态](https://developer.chrome.com/blog/page-lifecycle-api/)变为隐藏期间发生的所有意外布局偏移的累积分数。*（[实验室](https://web.dev/user-centric-performance-metrics/#in-the-lab)、[实际](https://web.dev/user-centric-performance-metrics/#in-the-field)）*

## TTFB

<https://web.dev/ttfb/>

衡量资源请求与响应的第一个字节开始到达之间的时间的度量

![img](./images/ccT8ltSPrTri3tz7AA3h.png)

startTime 到 responseStart 的时间

```js
new PerformanceObserver((entryList) => {
  const [pageNav] = entryList.getEntriesByType('navigation');

  console.log(`TTFB: ${pageNav.responseStart}`);
}).observe({
  type: 'navigation',
  buffered: true
});
```

## 优化

- 避免多个页面重定向

- prefetch
- HSTS <https://hstspreload.org/>
- http/2 http/3
- ssg > ssr
