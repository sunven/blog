# video

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

# dom 操作

```js
var video1 = document.getElementById('video1');
if (video1.paused) {
  video1.play();
} else {
  video1.pause();
}
```

- mp4一般是边下边播的，不需要等待完
- 如果视频是个文件流，则需要视频下载完才能播放，体验极差
