# 后退前进缓存

Back-Forward Cache: 内存缓存, 快照(包括js堆)

## 以下情况不能进入bfcache

- 监听了`beforeunload`(firefox中不能进入bfcache)
  - beforeunload用于警告用户有未保存的更改

- 监听了unload
  - unload不可靠，建议使用pagehide代替

- 不是http(s)架设的页面
- window.open()打开的页面
- 使用以下api(应当在pagehide或freeze中关闭连接, 在pageshow或resume中打开连接)
  - 打开了IndexedDB链接
  - 使用了websocket,webrtc
  - 正在fetch或xmlhttprequest

## 优化

pageshow时恢复一些旧数据

## 测试bfcache可用

f12 > Application > Cache > Back-forward Cache

## 页面从bfcache恢复

```js
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('This page was restored from the bfcache.');
  } else {
    console.log('This page was loaded normally.');
  }
});
```

结合页面生命周期: resume > pageshow

## 页面进入bfcache

```js
window.addEventListener('pagehide', (event) => {
  if (event.persisted) {
    console.log('This page *might* be entering the bfcache.');
  } else {
    console.log('This page will unload normally and be discarded.');
  }
});
```

结合页面生命周期: pagehide > pagehide

## 例子

a > b: a页面进入b页面

a:

```js
setTimeout(() => {
  console.log(1)
}, 6000)
```

进入a页面1s, 跳转到b页面, 在b页面停留>=5秒, 后退到a页面时, console.log(1)会立即执行

a:

```js
setInterval(() => {
  let a1 = localStorage.getItem('a1')
  if (a1) {
    a1 = parseInt(a1) + 1
  } else {
    a1 = 1
  }
  localStorage.setItem('a1', a1)
}, 1000);
```

a页面进入b页面后, setInterval不再继续执行

## reference

<https://web.dev/bfcache/>
