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

- 通过post方式发送,network 类型显示为ping
- 少量,异步

:::
