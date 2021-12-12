# HTML5 API

## 1. navigator.geolocation

### navigator.geolocation.getCurrentPosition()

获取用户当前位置

``` javascript
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("您的浏览器不支持Geolocation");
    }
}

function showPosition(position) {
    //pos.coords.accuracy 该值表示获取到的位置信息精度是多少
    alert("纬度：" + position.coords.latitude + "，经度：" + position.coords.longitude);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            //用户不允许地理定位
            break;
        case error.POSITION_UNAVAILABLE:
            //无法获取当前位置
            break;
        case error.TIMEOUT:
            //操作超时
            break;
        case error.UNKNOWN_ERROR:
            //
            break;
    }
}
```

### navigator.geolocation.watchPosition()

获取当前位置，同时不断地监视当前位置，一旦用户位置发生更改，就会调用指定的回调函数。

### navigator.geolocation.clearWatch()

停止监视用户位置。传递给此方法的参数应当是调用watchPosition()方法获得的返回值。

## 2. history

### history.pushState(data, title [, url])

在history栈中添加一个新的条目

- state：会在onpopstate事件触发时作为参数传递过去

- title：页面标题，当前所有浏览器都会 忽略此参数，一般设为null

- url：任意有效的URL，用于更新浏览器的地址栏，并不在乎URL是否已经存在地址列表中。更重要的是，它不会重新加载页面。缺省为当前页地址

### history.replaceState(data, title [, url])

替换当前的记录值
调用参数同 history.pushState()

### history.state

用于存储以上方法的data数据，不同浏览器的读写权限不一样

### window.onpopstate()

监听历史记录点，直观的可认为是监听URL的变化，但会忽略URL的hash部分，监听URL的hash部分，HTML5有新的API为 onhashchange 。
当用户单击浏览器的后退或者前进按钮时触发该事件。在事件处理函数中读取触发事件的事件对象的state属性值，该属性值即为执行pushState方法时所使用的第一个参数值，其中保存了在向浏览器历史记录中添加记录同步保存的对象。

> [ajax与HTML5 history pushState/replaceState实例](http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)

### window.location.hash

[URL的井号](http://www.ruanyifeng.com/blog/2011/03/url_hash.html)

## 3. 跨域消息传递

### postMessage()

该方法允许有限的通信——通过异步消息传递的方式——在来自不同源的脚本之间。

- 第一个参数是要传递的消息。HTML5标准提到，该参数可以是任意基本类型值或者可以复制的对象，但是，有些当前浏览器实现只支持字符串，因此，如果想要作为消息传递对象或者数组，首先应当使用JSON.stringify()方法对其序列化。
- 第二个参数是一个字符串，指定目标窗口的源。其中包括协议、主机名以及URL（可选的）端口部分（可以传递一个完整的URL，但是除了协议、主机名和端口号之外的任何信息都会忽略）。

### message

在目标窗口的Window对象上就会触发一个onmessage事件

- data：作为第一个参数传递给postMessage()方法的消息内容副本。

- source：消息源自的Window对象。

- origin：一个字符串，指定消息来源（URL形式）。

``` javascript
if (window.addEventListener){
    window.addEventListener("message", handleMessage, false);
}else{
    window.attachEvent("onmessage", handleMessage); //For IE8
}
function handleMessage(e) {
    //e.source
    //e.data
    //e.origin
}
```

例子

```js
//父页面
window.open("http://172.16.3.53:1001/test1.html");

if (window.addEventListener) {
    window.addEventListener("message", handleMessage, false);
} else {
    window.attachEvent("onmessage", handleMessage); //For IE8
}
function handleMessage(e) {
    console.log(e.origin,e.data);
    alert('子页面有数据传来了！');
}
```

```js
//子页面
window.opener.postMessage("a", "http://172.16.3.53:1001");
```

### reference

[http://www.cnblogs.com/wshiqtb/p/3171199.html](http://www.cnblogs.com/wshiqtb/p/3171199.html)

[http://www.cnblogs.com/dolphinX/p/3464056.html](http://www.cnblogs.com/dolphinX/p/3464056.html)

[html5 postMessage解决跨域、跨窗口消息传递](http://www.cnblogs.com/dolphinX/p/3464056.html)

## 4. Web Worker

Web Workers标准包含两部分。第一部分是Worker对象：该对象是暴露给创建该线程的线程的。第二部分是WorkerGlobalScope：这是一个用来表示新创建的Worker的全局对象，也是Worker线程内部使用的对象。

### Worker

``` javascript
var loader=new Worker("utils/loader.js");
loader.postMessage("file.txt");
```

如果URL采用的是相对路径，那么是以包含调用Worker()构造函数脚本的文档的URL为参照的。而如果指定的URL采用的是绝对路径，那么必须和包含该脚本的文档是同源的（同样的协议、主机名和端口）。

通过监听Worker对象上的message事件来接收来自Worker的消息：

``` javascript
//loader.js
worker.onmessage=function(e){
    var message=e.data;//从事件对象中获取消息
    console.log("URL contents:"+message);//用它进行一些操作
}
```

如果Worker抛出了异常：

```javascript
worker.onerror=function(e){//记录错误消息日志：包括Worker的文件名和行数
    console.log("Error at"+e.filename+":"+e.lineno+":"+e.message);
}
```

Worker对象还有另一个方法：terminate()。该方法强制一个Worker线程结束运行。

### 例子

[异步地将图片内容替换成动态模糊版本](http://sunven.github.io/Demo/html5api/worker/demo1.html)
[ajax-worker](http://sunven.github.io/Demo/html5api/worker/demo2.html)

## 类型化数组和ArrayBuffer

类型化数组就是类数组对象，它和常规的数组有如下重要的区别

- 类型化数组中的元素都是数字。使用构造函数在创建类型化数组的时候决定了数组中数字（有符号或者无符号整数或者浮点数）的类型和大小（以位为单位）。

- 类型化数组有固定的长度。

- 在创建类型化数组的时候，数组中的元素总是默认初始化为0。

### Reference

- [理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型](http://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/)

## Blod

### Blob URL

传递一个Blob给createObjectURL()方法会返回一个URL（以普通字符串形式）。该URL以blob://开始，紧跟着是一小串文本字符串，该字符串用不透明的唯一标识符来标识Blob。

- blob URL只是对浏览器存储在内存中或者磁盘上的Blob的一个简单引用。
- blob://URL和data://URL是不同的，data://URL会对内容进行编码。
- blob://URL和file://URL也是不同的，file://URL直接指向本地文件系统中的一个文件，仅暴露了文件的路径、浏览目录的许可等，除此之外任何内容都会带来安全问题的。

[利用blod预览图片](http://sunven.github.io/Demo/html5api/Blod/blod-url.html)

- Blob URL并不是永久有效的。一旦用户关闭了或者离开了包含创建Blob URL脚本的文档，该Blob URL就失效了。比如，将Blob URL保存到本地存储器中，然后当用户开始一个新的Web应用会话的时再使用它，这是不可能的。
- Blob URL只允许通过GET请求获取，并且一旦获取成功，浏览器必须返回一个HTTP 200 OK的状态码，同时返回一个使用Blob type属性的Content-Type头部信息。由于Blob URL的工作方式和简单的HTTP URL一致，因此可以通过XMLHttpRequest将它们指定的内容“下载”下来。