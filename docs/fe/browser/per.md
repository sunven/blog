# per

多长时间内移动到哪儿

最佳绘制频率： 1000/60

## setTimeout / setInterval

没有比ms更精确时间 开发人员只能确定动画是以 58.8 FPS (1000ms / 16) 还是 62.5 FPS (1000ms / 17) 绘制的

间隔时间不确定，受其他影响（时间循环）

-

createDocumentFragment

<http://www.javascriptkit.com/javatutors/requestanimationframe.shtml>
<https://zhuanlan.zhihu.com/p/30329705>

for太快
目标是每秒 60 个“帧”以显得平滑

```js
setInterval(function() {
  // animiate something
}, 1000/60);
```

- 函数执行耗时，不一定按1000/60兑现
- 导致“布局抖动”
- 页面回流

## css animation

- 可以改变高宽，方位，角度，透明度等等。但是，就像六道带土也有弱点一样，CSS3动画也有属性鞭长莫及。比方说`scrollTop`值
- 支持的动画效果有限

## requestAnimationFrame

- 把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率

- 不在可视窗口内、不再当前选项卡不执行
- 电池友好

```js
let n = 5
 function callback(timeStamp) {
   // 循环的5次requestAnimationFrame，timeStamp都一样
   console.log(timeStamp)
   while (n > 0) {
     requestAnimationFrame(callback)
     console.log(n)
     n--
   }
 }
      requestAnimationFrame(callback)
```

```js
var mark_start = Date.now()
for (let i = 0; i < 10000; i++) {}
var duration = Date.now() - mark_start
```

```js
var mark_start = performance.now()
for (let i = 0; i < 10000; i++) {}
var duration = performance.now() - mark_start
```

- 能够以亚毫秒间隔安排工作。这在主线程上尤为重要，因为工作会干扰帧渲染，而帧渲染需要以短而有规律的间隔发生，以避免用户可见的卡顿。
- 在计算基于脚本的动画的帧速率时，开发人员需要亚毫秒级的分辨率才能确定动画是否以 60 FPS 的速度绘制。如果没有亚毫秒分辨率，开发人员只能确定动画是以 58.8 FPS (1000ms / 16) 还是 62.5 FPS (1000ms / 17) 绘制的。
- 在收集 JS 代码的实际测量时（例如，使用用户计时），开发人员可能对收集其函数的亚毫秒计时感兴趣，以及早发现回归。
- 当试图将音频提示到动画中的特定点或确保音频和动画完美同步时，开发人员需要准确测量经过的时间量

<https://codesandbox.io/s/animation-ul82vv?file=/index.html>
