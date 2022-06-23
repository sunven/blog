# html5

## video

当前，video 元素支持三种视频格式：Ogg，MPEG 4，WebM

```html
<video src="1.ogg" controls="controls"></video>
//
<video id="video1" width="400" height="300" autoplay="autoplay" controls="controls" loop="loop" preload="preload">
  <source src="1.ogg" type="video/ogg" />
  <source src="2.mp4" type="video/mp4" />
  您的浏览器不支持video标签
</video>
```

- autoplay：自动播放
- controls：用户控件，比如播放按钮
- loop：重复播放
- preload：预加载，如果使用 "autoplay"，则忽略该属性。
- `<video> 与 </video>`之间插入的内容是供不支持 video 元素的浏览器显示的
- video 元素允许多个 source 元素。source 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式

### dom 操作

```js
var video1 = document.getElementById('video1');
if (video1.paused) {
  video1.play();
} else {
  video1.pause();
}
```

## audio

当前，audio 元素支持三种视频格式：Ogg Vorbis，MP3，Wav

```html
<audio id="video1" autoplay="autoplay" controls="controls" loop="loop" preload="preload">
  <source src="1.ogg" type="audio/ogg" />
  <source src="2.mp3" type="audio/mp3" />
  您的浏览器不支持audio标签
</audio>
```

> 参考 video 标签

```html
<div ondrop="drop(event)" ondragover="allowDrop(event)">
  <img id="img1" draggable="true" ondragstart="drag(event)" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1000962830,3127093288&fm=80" />
</div>
<div ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<script type="text/javascript">
  function drag(ev) {
    ev.dataTransfer.setData('Text', ev.target.id);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('Text');
    ev.target.appendChild(document.getElementById(data));
  }
</script>
```

## canvas

- 使用 JavaScript 在网页上绘制图像。
- 画布是一个矩形区域，您可以控制其每一像素。
- canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

```html
<canvas id="canvas1" width="400" height="300"></canvas>
<script type="text/javascript">
  var c = document.getElementById('canvas1');
  var cxt = c.getContext('2d');
  cxt.fillStyle = '#FF0000';
  cxt.fillRect(0, 0, 150, 75);
</script>
```

- getContext 创建 context 对象
- fillStyle 方法将其染成红色
- fillRect 方法规定了形状、位置和尺寸

## svg

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="190">
  <polygon points="100,10 40,180 190,60 10,60 160,180" style="fill: lime; stroke: purple; stroke-width: 5; fill-rule: evenodd;" />
</svg>
```

## Canvas vs SVG

### Canvas

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

### SVG

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

## g

```html
<body onload="getLocation();">
  <script type="text/javascript">
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert('您的浏览器不支持Geolocation');
      }
    }

    function showPosition(position) {
      alert('纬度：' + position.coords.latitude + '，经度：' + position.coords.longitude);
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
  </script>
</body>
```

- 检测是否支持地理定位
- 如果支持，则运行 getCurrentPosition() 方法。如果不支持，则向用户显示一段消息。
- 如果 getCurrentPosition()运行成功，则向参数 showPosition 中规定的函数返回一个 coordinates 对象
- showPosition() 函数获得并显示经度和纬度
