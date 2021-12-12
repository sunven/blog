# Service Worker 基础

## 是什么

Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API

## 做什么

- 后台数据同步
- 响应来自其它源的资源请求
- 集中接收计算成本高的数据更新，比如地理位置和陀螺仪信息，这样多个页面就可以利用同一组-数据
- 在客户端进行CoffeeScript，LESS，CJS/AMD等模块编译和依赖管理（用于开发目的）
- 后台服务钩子
- 自定义模板用于特定URL模式
- 性能增强，比如预取用户可能需要的资源，比如相册中的后面数张图片
- 后台同步：启动一个service worker即使没有用户访问特定站点，也可以更新缓存
- 响应推送：启动一个service worker向用户发送一条信息通知新的内容可用
- 对时间或日期作出响应
- 进入地理围栏

## 示例

### index.html

```js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ',
                registration.scope);
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
```

### sw.js

sw.js需要放在根目录下

```js
const PRECACHE = "precache-v1";
const RUNTIME = "runtime";
var PRECACHE_URLS = ["/css/", "/css/main.css"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();
        caches.open(PRECACHE).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(
          cacheName => !currentCaches.includes(cacheName)
        );
      })
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
```

## reference

[Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

[服务工作线程：简介](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=zh-cn)

[Service Worker初体验](http://www.alloyteam.com/2016/01/9274/)

[GoogleChrome service-worker 示例代码](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker)
