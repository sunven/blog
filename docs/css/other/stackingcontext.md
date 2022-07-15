# 层叠上下文

## 层叠水平

## 层叠顺序

1. 层叠上下文|background/border

2. 负 z-index

3. block 块状水平盒子

4. float 浮动盒子

5. inline/inline-block 水平盒子

6. z-index:auto 或看成 z-index:0/不依赖 z-index 的层叠上下文

7. 正 z-index

> 序号越大层叠顺序越高

## 层叠准则

- 谁大谁上：当具有明显的层叠水平标示的时候，如识别的 z-indx 值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。

- 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在 DOM 流中处于后面的元素会覆盖前面的元素。

## 层叠上下文的创建

### 根层叠上下文

指的是页面根元素，也就是滚动条的默认的始作俑者`<html>`元素。这就是为什么，绝对定位元素在 left/top 等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。

### 定位元素与传统层叠上下文

对于包含有 position:relative/position:absolute 的定位元素，以及 FireFox/IE 浏览器（不包括 Chrome 等 webkit 内核浏览器）（目前，也就是 2016 年初是这样）下含有 position:fixed 声明的定位元素，当其 z-index 值不是 auto 的时候，会创建层叠上下文

### CSS3 与新时代的层叠上下文

CSS3 的出现除了带来了新属性，同时还对过去的很多规则发出了挑战。例如，CSS3 transform 对 overflow 隐藏对 position:fixed 定位的影响等。而这里，层叠上下文这一块的影响要更加广泛与显著。

z-index 值不为 auto 的 flex 项(父元素 display:flex|inline-flex).
元素的 opacity 值不是 1.
元素的 transform 值不是 none.
元素 mix-blend-mode 值不是 normal.
元素的 filter 值不是 none.
元素的 isolation 值是 isolate.
will-change 指定的属性值为上面任意一个。
元素的-webkit-overflow-scrolling 设为 touch
