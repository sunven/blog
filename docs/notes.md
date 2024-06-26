# notes

::: tip 在页面退出时发送 http 请求

<https://css-tricks.com/send-an-http-request-on-page-exit/>

:tada: keep-alive

- http/1.1默认启用keep-alive
- 浏览器上使用XMLHttpRequest,axios修改Connection,控制台报错Refused to set unsafe header "Connection"
- 浏览器上使用fetch修改Connection,或设置keepalive为false,无效果,也不报错
- node(v18.6.0)上使用fetch修改Connection报错,设置keepalive为false无效
- node中用http或axios,Connection默认close
- axios在node环境中用http,浏览器环境用的xhr

:tada: navigator.sendBeacon

- 允许开发者在用户离开一个页面时异步地向服务器发送小量数据
- 通过post方式发送,network 类型显示为ping
- 当用户关闭页面时,常规的 AJAX 请求可能会被浏览器中止,导致数据无法发送成功。但 sendBeacon() 可以确保数据在页面关闭后依然被发送,不会阻塞页面的关闭
- 可以跨域发送数据,无需担心跨域问题。

:::

::: tip font-display

定义浏览器如何加载和显示字体文件

- auto（默认）：通常与block相似。
- block：使用不可见的占位符绘制文本，然后在加载后立即将其与自定义字体交换。这也被称为“不可见文本的闪光”或 FOIT。
- swap：使用后备字体显示文本，直到自定义字体完全下载。这也称为“无样式文本闪烁”或 FOUT。
- fallback：作为和swap值之间的折衷。浏览器将隐藏文本约 100 毫秒，如果尚未下载字体，将使用备用文本。下载后它将切换到新字体，但仅在很短的交换周期内（可能是 3 秒）。
- optional: 就像fallback，这​​个值告诉浏览器最初隐藏文本，然后转换到备用字体，直到自定义字体可用。但是，此值还允许浏览器确定是否使用了自定义字体，使用用户的连接速度作为一个决定因素，其中较慢的连接不太可能接收自定义字体

:::

::: tip globalThis

提供了一个标准的方式来获取不同环境下的全局 this 对象（也就是全局对象自身）

```js
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; } // web worker
  if (typeof window !== 'undefined') { return window; } // browser
  if (typeof global !== 'undefined') { return global; } // nodejs
  throw new Error('unable to locate global object');
};

var globals = getGlobal();
```

:::

<https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs>
<https://en.wikipedia.org/wiki/HTML5_video>
<https://juejin.cn/post/7018373086072766472#heading-17>
<https://juejin.cn/post/6850037275579121671#heading-21>
<https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs>
<https://mozilla.github.io/pdf.js/web/viewer.html>
<https://mozilla.github.io/pdf.js/examples/>
