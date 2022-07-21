# Web 优化

## Resource Hints

### dns-prefetch

是尝试在请求资源之前解析域名。仅负责 DNS 查找

```html
<link rel="dns-prefetch" href="//example.com" />
```

- `dns-prefetch` 仅对[跨域](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)域上的 DNS 查找有效

- 考虑将 `dns-prefetch` 与 `preconnect(`预连接`)`提示配对

### preconnect

用于指示将被用来获取所需资源的起源。启动早期连接，包括 DNS 查找、TCP 握手和可选的 TLS 协商，允许用户代理掩盖建立连接的高延迟成本

```html
<link rel="preconnect" href="//cdn.example.com" crossorigin />
```

- `crossorigin`:加载相关资源时是否必须使用 CORS

### prefetch

未来的页面需要用的资源

<https://web.dev/link-prefetch/>

<https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ>

- 提示浏览器，用户未来的浏览有可能需要加载的资源，浏览器有可能通过事先获取和缓存对应资源
- 预取发生在“最低”优先级，因此预取的资源不会与当前页面所需的资源竞争带宽。
- 预取文件存储在HTTP Cache或内存缓存中（取决于资源是否可缓存），时间长短因浏览器而异。例如，在 Chrome 中，资源会保留大约五分钟

![img](./images/djLGrbmj5eovwa6qhlm1.png)

```html
<link
  rel="prefetch"
  href="//example.com/next-page.html"
  as="document"
  crossorigin="use-credentials"
/>
<link rel="prefetch" href="/library.js" as="script" />
```

- `as`:`rel="preload"` 或者 `rel="prefetch"` 时才能使用，加载的内容的类型

预取请求标识

```
X-moz: prefetch (firefox)
Purpose: prefetch (chrome)
```

#### 举例

a 页面预取 axios

```html
<link rel="prefetch" href="https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js">
```

b 页面要用 axios

```html
<script src="https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js"></script>
```

进入a 页面时

![img](./images/prefetch-1.png)

a 页面跳转到 b页面时

![img](./images/prefetch-2.png)

### preload

<https://web.dev/uses-rel-preload/>

当前的页面需要用的资源

- preload 并不属于 w3c 的 resource hint

#### 举个例子

```
index.html
|--app.js
   |--styles.css
   |--ui.js
```

![img](./images/OiT1gArpZxNliikhBgx7.png)

```html
<head>
  ...
  <link rel="preload" href="styles.css" as="style">
  <link rel="preload" href="ui.js" as="script">
  ...
</head>
```

![img](./images/tJLJXH2qXcrDBUfsSAK5.png)

### subresource

优先级比 prefetch 高

### prerender

用于识别可能因下一个导航所需的资源，并且用户代理*应该*获取和执行，这样，一旦资源在未来要求的用户代理可以提供更快的响应

```html
<link rel="prerender" href="//example.com/next-page.html" />
```

### 总结

[resource-hints](https://www.w3.org/TR/resource-hints/)

[preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)

## 一 减少对服务器的文件请求

1. css sprite
2. 合并 css js
3. base64 图片
4. 将小块的 css、js 代码段直接写在页面上
5. http-equiv="expires"

## 二 减少文件大小

1. 压缩样式/脚本文件
2. 针对性选择图片格式
3. 使用 Font Awesome 来替代页面上的图标

## 三 适度使用 CDN

## 四 延迟请求、异步加载脚本

## 五 延迟请求首屏外的文件

## 六 优化页面模块排放顺序

## 七 其它建议

1. 不要在 css 中使用@import
2. 避免页面或者页面文件重定向查找
3. 减少无效请求
4. 无论你是否决定将脚本放到页尾，但一定要保障脚本放置于样式文件后方
5. 文件在小于 50K 的时候，直接读取文件流会比从文件系统中去读取文件来的快些，大于 50K 则相反。比如有一张图片，如果它小于 50K，我们可以将它转为二进制数据存储在数据库中，页面若要读取该图片则从数据库上来读取，若文件大小大于 50K，那建议存放在可访问的文件夹中以文件的形式来读取即可
6. 使用 cookie-free domains 来存放资源，减少无用 cookie 传输的网络开销
7. 不重要的样式文件可以走无阻塞渲染的加载形式
8. 配置.htaccess 文件、走 Gzip 页面压缩形式、开启 keep-alive 连接模式等后端解决方案

## 最小化 HTTP 请求

最终用户响应时间的 80％用于前端。大部分时间都是下载页面中的所有组件：图像，样式表，脚本，Flash 等。减少组件数量又减少了呈现页面所需的 HTTP 请求数量。这是更快页面的关键。

### 1 合并 css,js

### 2 CSS Sprites

### 3 Image maps

```html
<map name="primary">
  <area shape="circle" coords="75,75,75" href="left.html" />
  <area shape="circle" coords="275,75,75" href="right.html" />
</map>
<img usemap="#primary" src="http://placehold.it/350x150" alt="350 x 150 pic" />
```

[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map)

[https://www.w3.org/TR/html401/struct/objects.html#h-13.6](https://www.w3.org/TR/html401/struct/objects.html#h-13.6)

### 4 data:URL

```html
<img src="data:image/jpg;base64," />
```

## 内容传送网络（CDN）

[http://www.cnblogs.com/mokafamily/p/4402366.html](http://www.cnblogs.com/mokafamily/p/4402366.html)

[http://www.cnblogs.com/itfly8/p/5043435.html](http://www.cnblogs.com/itfly8/p/5043435.html)

## Expires、Cache-Control

[http://www.cnblogs.com/freeliver54/p/3334950.html](http://www.cnblogs.com/freeliver54/p/3334950.html)

- 对于静态组件：通过设置远远的 Expires 头来实现“永不过期”策略
- 对于动态组件：使用适当的 Cache-Control 头来帮助浏览器进行条件请求

网页设计变得越来越丰富，这意味着更多的脚本，样式表，图像和 Flash 中的页面。您的页面的第一次访问者可能需要进行多个 HTTP 请求，但是通过使用 Expires 标题，您可以使这些组件可缓存。这样可以避免后续页面浏览中不必要的 HTTP 请求。过期标题最常用于图像，但它们应用于所有组件，包括脚本，样式表和 Flash 组件。

浏览器（和代理）使用缓存来减少 HTTP 请求的数量和大小，从而使网页加载速度更快。Web 服务器使用 HTTP 响应中的 Expires 标头来告诉客户端组件可以被缓存多长时间。这是一个远未来的 Expires 标题，告诉浏览器，这个回应将不会过时，直到 2010 年 4 月 15 日。

      到期日：星期四，2010年4月15日20:00:00 GMT

如果您的服务器是 Apache，请使用 ExpiresDefault 指令设置相对于当前日期的到期日期。ExpiresDefault 伪指令的此示例将 Expires date 设置为从请求时间起的 10 年。

      ExpiresDefault“访问加10年”

请记住，如果您使用远未来的 Expires 标题，则必须在组件更改时更改组件的文件名。在 Yahoo!中，我们经常将此步骤作为构建过程的一部分：版本号嵌入到组件的文件名中，例如 yahoo_2.0.6.js。

只有在用户访问过您的网站后，使用远未来的 Expires 标头会影响页面浏览。当用户首次访问您的网站并且浏览器的缓存为空时，它对 HTTP 请求的数量没有影响。因此，这种性能改进的影响取决于用户使用预置缓存访问您的页面的频率。（“已启动缓存”已经包含页面中的所有组件。）我们在 Yahoo!中测量了这一点，并发现带有底漆缓存的页面浏览量为 75-85％。通过使用远未来的 Expires 标题，您可以增加浏览器缓存的组件数量，并在后续页面视图中重新使用，而不会在用户的 Internet 连接上发送单个字节。

顶部 | 讨论这个规则

## Gzip 组件

## 将样式表放在顶部

## 把脚本放在底部

## 避免使用 CSS 表达式

exprssion

## 外部引用 JavaScript 和 CSS

JavaScript 和 CSS 文件被浏览器缓存。HTML 文档中内联的 JavaScript 和 CSS 在每次请求 HTML 文档时都被下载。这减少了所需的 HTTP 请求数量，但是增加了 HTML 文档的大小。另一方面，如果 JavaScript 和 CSS 在浏览器缓存的外部文件中，则 HTML 文档的大小会减少，而不会增加 HTTP 请求的数量。

因此，关键因素是相对于请求的 HTML 文档数量，缓存外部 JavaScript 和 CSS 组件的频率。这个因素虽然难以量化，但可以使用各种指标来衡量。如果您的站点上的用户每个会话具有多个页面视图，并且您的许多页面重新使用相同的脚本和样式表，则缓存的外部文件将具有更大的潜在优势。

## 减少 DNS 查找

域名系统（DNS）将主机名映射到 IP 地址，就像电话簿将人员姓名映射到他们的电话号码一样。当您在浏览器中输入 www.yahoo.com 时，浏览器联系的 DNS 解析器会返回该服务器的 IP 地址。DNS 有一个成本。DNS 通常需要 20-120 毫秒来查找给定主机名的 IP 地址。在完成 DNS 查找之前，浏览器无法从此主机名下载任何内容。

缓存 DNS 查找以获得更好的性能。这种缓存可以在由用户的 ISP 或局域网维护的特殊缓存服务器上发生，但是也存在在个人用户的计算机上发生的缓存。DNS 信息保留在操作系统的 DNS 缓存（Microsoft Windows 中的“DNS 客户端服务”）中。大多数浏览器都有自己的缓存，与操作系统的缓存分开。只要浏览器将 DNS 记录保存在自己的缓存中，就不会对操作系统造成记录请求的麻烦。

默认情况下，Internet Explorer 会缓存 DNS 查找 30 分钟，由 DnsCacheTimeout 注册表设置指定。Firefox 缓存 DNS 查找 1 分钟，由 network.dnsCacheExpiration 配置设置控制。（Fasterfox 将其更改为 1 小时。）

当客户端的 DNS 缓存为空（对于浏览器和操作系统）时，DNS 查找的数量等于网页中唯一主机名的数量。这包括在页面的 URL，图像，脚本文件，样式表，Flash 对象等中使用的主机名。减少唯一主机名的数量减少了 DNS 查找的数量。

减少唯一主机名的数量有可能减少页面中发生的并行下载量。避免 DNS 查找减少响应时间，但减少并行下载可能会增加响应时间。我的准则是将这些组件分成至少两个但不超过四个主机名。这导致减少 DNS 查找并允许高度并行下载之间的良好折中。

## 压缩 JavaScript 和 CSS

## 避免重定向

标签：内容

使用 301 和 302 状态代码完成重定向。以下是 301 响应中 HTTP 头的示例：

      HTTP / 1.1 301永久移动
      位置：http://example.com/newuri
      内容类型：text / html

浏览器自动将用户带到该 Location 字段中指定的 URL 。重定向所需的所有信息都在头文件中。响应的身体通常是空的。尽管他们的名字，在实践中也不会缓存 301 和 302 的响应，除非额外的标题，例如 Expires 或者 Cache-Control 表明它应该是。元刷新标签和 JavaScript 是将用户引导到其他 URL 的其他方法，但如果必须执行重定向，首选技术是使用标准的 3xx HTTP 状态代码，主要是为了确保后退按钮正常工作。

要记住的是重定向会减慢用户体验。在用户和 HTML 文档之间插入重定向会延迟页面中的所有内容，因为页面中的任何内容都不能被渲染，并且在 HTML 文档到达之前不会开始下载任何组件。

最浪费的重定向之一是频繁发生的，Web 开发人员通常不会意识到这一点。当 URL 中缺少尾部斜线（/）时，会发生这种情况，否则应该有一个。例如，去`http://astrology.yahoo.com/astrology`得到一个包含重定向到`http://astrology.yahoo.com/astrology/`（注意添加的尾部斜杠）的 301 响应。如果您使用 Apache 处理程序，则使用 Aliasor 或 mod_rewriteor DirectorySlash 指令在 Apache 中进行修复。

将旧网站连接到新的网站是重定向的另一个常见用途。其他包括连接网站的不同部分，并根据某些条件（浏览器类型，用户帐户类型等）指导用户。使用重定向连接两个网站很简单，只需要很少的附加编码。尽管在这些情况下使用重定向会降低开发人员的复杂性，但会降低用户体验。这种使用重定向的替代方案包括使用 Alias 和 mod_rewrite 如果两个代码路径托管在同一台服务器上。如果域名变化是使用重定向的原因，一种替代方法是创建一个 CNAME 与组合（即建立了一个从域名指向另一个别名 DNS 记录）Alias 或 mod_rewrite。

顶部 | 讨论这个规则

## 删除重复的脚本

## 配置 ETag

标签：服务器

实体标签（ETag）是 Web 服务器和浏览器用来确定浏览器缓存中的组件是否与源服务器上的组件匹配的机制。（“实体”是另一个单词“组件”：图像，脚本，样式表等）添加了 ETag，以提供一种验证比上次更改日期更灵活的实体的机制。ETag 是唯一标识组件特定版本的字符串。唯一的格式约束是字符串被引用。源服务器使用 ETag 响应头指定组件的 ETag 。

      HTTP / 1.1 200 OK
      最后修改：星期二，2006年12月12日03:03:59 GMT
      ETag：“10c24bc-4ab-457e1c1f”
      内容长度：12195

之后，如果浏览器必须验证组件，它将使用 If-None-Match 头将 ETag 传递回原始服务器。如果 ETag 匹配，则返回一个 304 状态代码，将此示例的响应减少 12195 个字节。

      GET /i/yahoo.gif HTTP / 1.1
      主持人：us.yimg.com
      If-Modified-Since：Tue，2006年12月12日03:03:59 GMT
      If-None-Match：“10c24bc-4ab-457e1c1f”
      HTTP / 1.1 304未修改

ETag 的问题在于，它们通常使用属性来构建，这些属性使其成为托管站点的特定服务器的唯一性。当浏览器从一个服务器获取原始组件并且稍后尝试在不同的服务器上验证该组件时，ETags 将不匹配，这种情况在使用服务器集群处理请求的网站上太常见。默认情况下，Apache 和 IIS 都嵌入 ETag 中的数据，大大降低了在具有多个服务器的网站上成功执行有效性测试的可能性。

Apache 1.3 和 2.x 的 ETag 格式是 inode-size-timestamp。虽然给定的文件可能驻留在多个服务器上的同一目录中，并且具有相同的文件大小，权限，时间戳等，但其 inode 与一个服务器不同。

IIS 5.0 和 6.0 与 ETag 有类似的问题。IIS 上的 ETag 格式为 Filetimestamp:ChangeNumber。A ChangeNumber 是用于跟踪 IIS 配置更改的计数器。ChangeNumber 网站后面的所有 IIS 服务器都不太可能。

最终结果是由 Apache 和 IIS 生成的完全相同的组件的 ETag 将不匹配从一个服务器到另一个服务器。如果 ETags 不匹配，用户不会收到 ETag 设计的小而快的 304 响应; 相反，它们将获得正常的 200 响应以及组件的所有数据。如果您只在一台服务器上托管您的网站，这不是问题。但是，如果您有多个托管您的网站的服务器，并且您使用的是 Apache 或 IIS 和默认的 ETag 配置，则用户的页面越来越慢，您的服务器负载较高，您正在消耗较大的带宽，而且代理不是“高效缓存您的内容。即使您的组件具有远未来的 Expires 标头，只要用户点击重新加载或刷新，仍然会执行条件 GET 请求。

如果您没有利用 ETag 提供的灵活的验证模型，那么最好只需删除 ETag。该 Last-Modified 头验证基于对组件的时间戳。并且删除 ETag 会减少响应和后续请求中 HTTP 头的大小。此 Microsoft Support 文章介绍如何删除 ETag。在 Apache 中，只需将以下行添加到 Apache 配置文件即可完成：

      FileETag无

顶部 | 讨论这个规则

## Ajax Cacheable

标签：内容

Ajax 的一个引人注意的好处是它为用户提供即时反馈，因为它从后端 Web 服务器异步请求信息。但是，使用 Ajax 不能保证用户不会等待他们等待异步 JavaScript 和 XML 响应返回的大拇指。在许多应用中，用户是否保持等待取决于 Ajax 的使用方式。例如，在基于 Web 的电子邮件客户端中，用户将不断等待 Ajax 请求的结果，以查找与其搜索条件匹配的所有电子邮件。重要的是要记住，“异步”并不意味着“瞬时”。

为了提高性能，重要的是优化这些 Ajax 响应。提高 Ajax 性能的最重要的方法是使响应可缓存，如添加到期或缓存控制头。一些其他规则也适用于 Ajax：
Gzip 组件
减少 DNS 查找
缩小 JavaScript
避免重定向
配置 ETag

我们来看一个例子。Web 2.0 电子邮件客户端可能会使用 Ajax 下载用户的自动完成地址簿。如果用户上次使用电子邮件网络应用程序后用户没有修改她的地址簿，如果 Ajax 响应可以使用未来的 Expires 或 Cache-Control 标头进行缓存，则可以从缓存读取以前的地址簿响应。必须通知浏览器何时使用先前缓存的地址簿响应，而不是请求新的地址簿响应。这可以通过向地址簿 Ajax URL 添加一个时间戳来表示，例如，用户最后一次修改她的地址簿&t=1190241612。如果地址簿自上次下载以来没有被修改，则时间戳将是相同的，并且地址簿将从浏览器的缓存中读取，从而消除额外的 HTTP 往返。

即使您的 Ajax 响应是动态创建的，并且可能仅适用于单个用户，但仍可缓存它们。这样做会使您的 Web 2.0 应用程序更快。

顶部 | 讨论这个规则

## Flush the Buffer Early

## 对 AJAX 请求使用 GET

在雅虎邮件研究小组发现，使用时 XMLHttpRequest，POST 在浏览器中实现的过程分为两个步骤：首先发送标题，然后发送数据。所以最好使用 GET，只需要一个 TCP 数据包发送（除非你有很多的 cookie）。IE 中的最大 URL 长度为 2K，因此如果发送超过 2K 的数据，则可能无法使用 GET。

一个有趣的方面的影响是 POST 没有实际发布任何数据的行为像 GET。基于 HTTP 规范，GET 是为了检索信息，所以当您只是请求数据时，使用 GET（语义上）是有意义的，而不是发送要存储在服务器端的数据。

## 延时加载组件（Post-load Components）

标签：内容

你可以仔细看看你的页面，问问自己：“为了最初渲染页面绝对需要什么？” 其余的内容和组件可以等待。

JavaScript 是在 onload 事件之前和之后拆分的理想候选者。例如，如果您有 JavaScript 代码和库进行拖放和动画，那么可以等待，因为在初始呈现之后拖动页面上的元素。其他寻找候选人进行后期加载的地方包括隐藏的内容（用户操作后出现的内容）以及下方的图像。

帮助您解决问题的工具：YUI Image Loader 允许您将图像延迟到折叠位置，YUI Get 实用程序是一个简单的方法，可以即时包括 JS 和 CSS。举个例子，在野外看看 Yahoo!主页与 Firebug 的网络面板打开了。

当性能目标与其他 Web 开发最佳实践相一致时，这是很好的。在这种情况下，渐进增强的想法告诉我们，当 JavaScript 被支持时，可以改善用户体验，但是您必须确保页面的工作即使没有 JavaScript。所以在确定页面工作正常之后，您可以使用一些后加载脚本来增强它，从而为您提供更多铃声和口哨，如拖放和动画。

最佳

## 预加载组件（Preload Components）

标签：内容

预加载可能看起来与后期加载相反，但实际上具有不同的目标。通过预加载组件，您可以利用浏览器空闲的时间，并请求将来需要的组件（如图像，样式和脚本）。这样当用户访问下一页时，您可以将大部分组件放在缓存中，并且您的页面将为用户加载更快。

实际上有几种类型的预加载：

无条件预加载 - 一旦加载启动，您就可以继续提取一些额外的组件。检查 google.com，了解如何请求一个精灵图像的加载。这个精灵图片不需要在 google.com 主页上，但在连续的搜索结果页面上是需要的。
有条件的预加载 - 基于用户操作，您做出有根据的猜测，用户在哪里下一步，并相应地预加载。在 search.yahoo.com 上，您可以看到在输入框中输入后，如何请求一些额外的组件。
预计预加载 - 在启动重新设计之前提前预加载。经常重新设计后，您会发现：“新网站很酷，但比以前更慢”。问题的一部分可能是用户正在使用完整缓存访问您的旧站点，但新的站点始终是空缓存体验。您可以在启动重新设计之前预先加载某些组件来减轻这种副作用。您的旧网站可以使用浏览器空闲的时间，并请求新网站将使用的图像和脚本
最佳

## 减少 DOM 元素的数量

标签：内容

复杂的页面意味着更多的字节下载，也意味着 JavaScript 中的 DOM 访问速度较慢。如果您想要添加事件处理程序，例如，如果循环访问 500 或 5000 个页面上的 DOM 元素，这将有所作为。

大量的 DOM 元素可能是一些症状，应该使用页面的标记进行改进，而不必删除内容。您是否使用嵌套表进行布局？你是否`<div>`只投入更多的东西来解决布局问题？也许有更好的和更语义上正确的方式来做你的标记。

对于布局来说，很大的帮助是 YUI CSS 实用程序：grids.css 可以帮助您整体布局，fonts.css 和 reset.css 可以帮助您剥离浏览器的默认格式。这是一个机会，开始新鲜和思考你的标记，例如，`<div>`只有当它有意义的语义，而不是因为它呈现一个新的行。

DOM 元素的数量很容易测试，只需输入 Firebug 的控制台：
document.getElementsByTagName('\*').length

DOM 元素有多少？检查其他具有良好标记的类似页面。例如，Yahoo!主页是一个非常繁忙的页面，仍然低于 700 个元素（HTML 标签）。

最佳

## 分割跨域的组件

标签：内容

分割组件允许您最大程度地并行下载。由于 DNS 查询损失，请确保您使用的不超过 2-4 个域。例如，您可以承载你的 HTML 和动态内容 www.example.org 之间分裂静电元件 static1.example.org 和 static2.example.org

有关更多信息，请参阅 Tenni Theurer 和 Patty Chi 的“最大化拼车车道中的并行下载 ”。

最佳

## 最小化 iframe 的数量

标签：内容

iframe 允许在父文档中插入一个 HTML 文档。了解 iframe 的工作原理，以便有效的使用非常重要。

`<iframe>` 优点：

帮助缓慢的第三方内容，如徽章和广告
安全沙箱
并行下载脚本
`<iframe>` 缺点：

成本高，即使空白
阻止页面加载
非语义
最佳

## 没有 404s

标签：内容

HTTP 请求是昂贵的，所以发出 HTTP 请求并获得无用的响应（即 404 Not Found）是完全不必要的，并且会减慢用户体验，没有任何好处。

一些网站有帮助 404s“你的意思是 X？”，这对用户体验非常好，但也会浪费服务器资源（如数据库等）。特别糟糕的是当链接到外部 JavaScript 是错误的，结果是 404.首先，这个下载将阻止并行下载。接下来，浏览器可能会尝试解析 404 响应体，就像它是 JavaScript 代码，试图找到可用的东西。

最佳

## 减少 Cookie 大小

标签：cookie

使用 HTTP cookie 的原因有多种，如认证和个性化。有关 Cookie 的信息在 Web 服务器和浏览器之间的 HTTP 标头中交换。保持 cookie 的大小尽可能地减小对用户的响应时间的影响是很重要的。

有关更多信息，请查看 “当饼干崩溃”由 Tenni Theurer 和 Patty Chi。本研究的回归：

消除不必要的 cookies
保持尽可能小的 Cookie 大小，以尽量减少对用户响应时间的影响
请注意在适当的域级别设置 Cookie，以便其他子域不受影响
适当设置到期日期 早期的过期日期或无法更早地删除 cookie，从而改善用户响应时间
最佳

## Cookie-free Domains

标签：cookie

当浏览器发出请求静态图像并将 cookie 发送到请求时，服务器对这些 cookie 没有任何用处。所以他们只是创造网络流量没有好的理由。您应该确保使用无 Cookie 请求请求静态组件。创建一个子域并托管所有静态组件。

如果您的域是 www.example.org，您可以托管您的静态组件 static.example.org。但是，如果你已经在顶级域名设置 cookie example.org，而不是 www.example.org，那么所有的请求， static.example.org 将包括这些 cookie。在这种情况下，您可以购买一个全新的域名，在那里托管静态组件，并保持此域免费。雅虎使用 yimg.com，YouTube 使用 ytimg.com，亚马逊使用 images-amazon.com 等。

在无 Cookie 域中托管静态组件的另一个好处是某些代理可能拒绝缓存使用 Cookie 请求的组件。在相关的说明中，如果您想知道您是否应该为您的主页使用 example.org 或 www.example.org，请考虑 cookie 的影响。省略 www，你别无选择，只能写入 cookies \*.example.org，所以出于性能考虑，最好使用 www 子域名并将该 cookie 写入该子域。

[http://blog.csdn.net/southflow/article/details/9342385](http://blog.csdn.net/southflow/article/details/9342385)

最佳

## 最小化 DOM 访问

标签：javascript

使用 JavaScript 访问 DOM 元素很慢，所以为了有一个更敏感的页面，你应该：

缓存对访问元素的引用
更新节点“脱机”，然后将其添加到树中
避免使用 JavaScript 修复布局
有关更多信息，请查看 Julien Lecomte 的 YUI 剧院 “高性能 Ajax 应用程序”。

最佳

## 开发智能事件处理程序

标签：javascript

有时，页面感觉较少响应，因为过多的事件处理程序附加到 DOM 树的不同元素，然后执行得太多了。这就是为什么使用事件委托是一个好办法。如果一个内部有 10 个按钮 div，则只将一个事件处理程序附加到 div 包装器，而不是每个按钮的一个处理程序。事件爆发，所以你可以抓住事件，并找出它起源于哪个按钮。

您也不需要等待 onload 事件才能开始使用 DOM 树做某事。通常，您需要的是要在树中可用的元素。您不必等待下载所有图像。 DOMContentLoaded 是您可以考虑使用而不是 onload 的事件，但是直到所有浏览器都可用，您可以使用具有方法的 YUI 事件实用程序 onAvailable。

有关更多信息，请查看 Julien Lecomte 的 YUI 剧院 “高性能 Ajax 应用程序”。

最佳

## `<link>`替代@import

## 避免过滤器

标签：css

IE 专有的 AlphaImageLoader 过滤器旨在解决 IE 版本<7 中的半透明真彩色 PNG 的问题。此过滤器的问题是在下载图像时阻止渲染并冻结浏览器。它还增加了内存消耗，并且每个元素都应用，而不是每个图像，所以问题被增加。

最好的方法是完全避免 AlphaImageLoader 使用优雅的降级 PNG8，这在 IE 中很好。如果您绝对需要 AlphaImageLoader，请使用下划线黑客攻击\_filter 您的 IE7 +用户。

最佳

## 优化图像

## 优化 CSS Sprite

在垂直方向上水平排列图像中的图像通常会导致较小的文件大小。
在 sprite 中组合相似的颜色可以帮助您保持色数低，理想的是 256 色以下，以适应 PNG8。
“移动友好”，并且不要在精灵中的图像之间留下很大的差距。这不会影响文件大小，但是用户代理将图像解压缩到像素图中需要更少的内存。100x100 的图像是万像素，1000x1000 是 100 万像素
最佳

## 不要在 HTML 中缩放图像

不要使用比您需要的更大的图像，因为您可以设置 HTML 中的宽度和高度。如果需要
`<img width="100" height="100" src="mycat.jpg" alt="My Cat" />`
，您的图像（mycat.jpg）应为 100x100px，而不是缩小 500x500 像素的图像。

## 使 favicon.ico 小而且可缓存

标签：图片

即使不需要，浏览器也会请求它，所以最好不要回应 404NotFound。此外，由于它在同一台服务器上，所以每次请求时都会发送 Cookie。这个图像也会干扰下载顺序，例如在 IE 中，当您在 onload 中请求额外的组件时，会在这些额外的组件之前下载该图标。

- 最好小于 1K。
- 将 Expires 标题设置为您感觉舒适（因为如果您决定更改它，则不能重命名）。您将来可以安全地设置 Expires 标题几个月。您可以检查您当前的 favicon.ico 的最后修改日期作出明智的决定。

## 避免空的 src

```html
<img src="" />
```

```js
var img = new Image()
img.src = ''
```

## reference

[https://developer.yahoo.com/performance/rules.html](https://developer.yahoo.com/performance/rules.html)

[http://www.cnblogs.com/vajoy/p/4183569.html](http://www.cnblogs.com/vajoy/p/4183569.html)
