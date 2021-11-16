# 客户端存储

## JavaScript中的cookie

通过BOM的document.cookie访问,得到如下字符串：
`name1=value1;name2=value2`
key和value都是经过URL编码的，需使用decodeURIComponent()解码。


### 设置cookie
`document.cookie="key=value";`
新加一个键值不要用:
`document.cookie = document.cookie += ";a=b";`
不需要考虑拼接、分号问题。
考虑需要编码情况，最好使用：
`document.cookie = decodeURIComponent("key") + "=" + decodeURIComponent("value");`

> 设置的cookie在每次访问服务端都会带上，在浏览器关闭时就会被删除

指定cookie的额外信息：
```javascript
document.cookie =
  decodeURIComponent("key") +
  "=" +
  decodeURIComponent("value") +
  "; domain=.a.com; path=/";
```
> cookie的操作一般用工具库完成



### HTTP-only
该模式下的cookie可以在浏览器设置，可以在服务器设置，但JavaScript无法获取


## Web Storage

- 提供cookie之外的会话数据存储
- 提供跨会话持久化存储大量数据的机制
- 只能存储字符串
- 大多数浏览器限制为每个源5M



### 存储事件
当前页面使用的storage被其他页面修改时会触发StorageEvent事件。
即：事件在同一个域下的不同页面之间触发，即在A页面注册了storge的监听处理，只有在跟A同域名下的B页面操作storage对象，A页面才会被触发storage事件
storage对象发生变化时，会触发storage事件，事件对象有如下四个属性

- url：key 发生改变的对象所在文档的URL地址
- key：键
- newValue：新值
- oldValue：旧值



A页面：
```javascript
window.addEventListener("storage", function (event) {
  console.log(event);
});
localStorage.setItem("a", "a");
```
B页面：
```javascript
setTimeout(() => {
  localStorage.a="aa"
}, 2000);
```
假设A，B在同一个域下面，`localStorage.setItem("a", "a")`不会触发`storage`事件，`localStorage.a="aa"`则会触发
> sessionStorage和localStorage的改变都会触发storage事件，但storage事件不会区分这两者。



### localStorage

- 提供永久存储机制
- 同一个域、相同端口、相同协议才可以访问
- 数据存储到通过JavaScript删除或清除浏览器缓存
```javascript
//写
localStorage.setItem("a", "a");
localStorage.b = "b";
//读
localStorage.getItem("a");
localStorage.b;
//删
localStorage.removeItem("a");
delete localStorage.b;
```
### sessionStorage

- 提供跨会话存储机制
- 浏览器关闭存储消失，不受页面刷新影响
- 适用于存储会话期间的小块数据
- 不适用本地文件运行
```javascript
//写
sessionStorage.setItem("a", "a");
sessionStorage.b = "b";
//读
sessionStorage.getItem("a");
sessionStorage.b;
//删
sessionStorage.removeItem("a");
delete sessionStorage.b;
```
## IndexedDB
用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。使用索引实现对数据的高性能搜索。可以存储大量的结构化数据

- 类似NoSQL风格的数据库
- 异步操作
- 不能跨域共享数（遵循同源策略）
- Web Worker中可用
