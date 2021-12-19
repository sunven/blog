# 页面通信

## 跨页面传值

### postMessage

- 获得窗口引用

- 跨域

### localStroage

```js
// A.html
localStorage.setItem('message', 'hello')

// B.html
window.onstorage = evt => {
// evt.key, evt.oldValue, evt.newValue
}
```

- 同源

### BroadcastChannel

```js
// A.html
const channel = new BroadcastChannel('tabs')
channel.onmessage = evt => {
// evt.data
}

// B.html
const channel = new BroadcastChannel('tabs')
channel.postMessage('hello')
```

- 不会持久化
- 同源

### SharedWorker

```js
// A.html
var sharedworker = new SharedWorker('worker.js')
sharedworker.port.start()
sharedworker.port.onmessage = evt => {
// evt.data
}

// B.html
var sharedworker = new SharedWorker('worker.js')
sharedworker.port.start()
sharedworker.port.postMessage('hello')

// worker.js
const ports = []
onconnect = e => {
const port = e.ports[0]
   ports.push(port)
   port.onmessage = evt => {
       ports.filter(v => v!== port) // 此处为了贴近其他方案的实现，剔除自己
       .forEach(p => p.postMessage(evt.data))
   }
}
```

- 同源

### Cookie

- 同源
- 污染

### Server

#### ajax

```js
document.onvisibilitychange = () => {
  if (document.visibilityState === 'hidden') {
    // 切换走了
  } else if (document.visibilityState === 'visible') {
    // 切换来了
    // ajax获取数据。。。
  }
};
```

#### SSE/EventSource

`EventSource` 是服务器推送的一个网络事件接口。一个EventSource实例会对HTTP服务开启一个持久化的连接，以`text/event-stream` 格式发送事件, 会一直保持开启直到被要求关闭

前端

```js
const es = new EventSource('http://localhost:3000/notification');

setTimeout(() => {
  es.close();
}, 5000);

es.onmessage = evt => {
  console.log('message', evt.data);
};
es.addEventListener('update', evt => {
  console.log('update', evt.data);
});
es.addEventListener(
  'close',
  () => {
    es.close();
  },
  false
);
```

后端

```js
const express = require('express');
const app = express();

// 缓存response
let resglobal;

app.get('/notification', (req, res) => {
  console.log('notification start');
  //必须为text/event-stream类型
  res.setHeader('Content-Type', 'text/event-stream');
  //   解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', '*');
  resglobal = res;
  setInterval(() => {
    //   每1s派发message事件
    res.write(`event:message
data:${new Date().getMilliseconds()}

`);
  }, 1000);
  req.on('close', () => {
    //页面关闭、或者调用了EventSource的close方法
    //这个链接就会关闭，此处可以监听close方法
    console.log('close');
  });
});
app.get('/update', (req, res) => {
  // 调用/update时派发updater事件
  resglobal.write('event:update\ndata:update\n\n');
  res.status(200).end();
});

app.listen(3000);

```

- 格式必须为:`event:update\ndata:update\n\n`
- 服务端推送是单向的

#### Websocket

## 跨域

### 何为跨域

### 解决方法

#### cors

#### window.name

页面 a.html,b.html 同域

页面 c.html

c 传值给 a

c.html

```js
window.name = '123'
```

b.html

可空白

a.html

```html
<iframe
  id="iframe"
  src="http://localhost:30002/"
  onload="load()"
  frameborder="0"
></iframe>
<script>
  let first = true //第一次加载
  function load() {
    if (first) {
      let iframe = document.querySelector('#iframe')
      iframe.src = 'http://localhost:30001/b.html'
      first = false
    } else {
      console.log(iframe.contentWindow.name) //yuhua
    }
  }
</script>
```

#### postMessage

#### JSONP

#### window.domain

```js
document.domain = 'a.com'
```

两个文档，只有在 `document.domain` 都被设定为同一个值，表明他们打算协作；或者都没有设定`document.domain` 属性并且 URL 的域是一致的，这两种条件下，一个文档才可以去访问另一个文档。

#### location.hash

页面 a.html,b.html 同域

页面 c.html

c 传值给 a

c.html

```js
let iframe = document.createElement('iframe')
iframe.src = 'http://localhost:30001/b.html#18'
document.body.appendChild(iframe)
```

b.html

```js
window.parent.parent.location.hash = location.hash
```

a.html

```html
<iframe src="http://localhost:30002/" frameborder="0"></iframe>
<script>
  window.onhashchange = function() {
    console.log('location.hash', location.hash)
  }
</script>
```
