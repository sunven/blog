# 层叠上下文

## 层叠水平

## 层叠顺序

1. 层叠上下文|background/border

2. 负z-index

3. block块状水平盒子

4. float浮动盒子

5. inline/inline-block水平盒子

6. z-index:auto或看成z-index:0/不依赖z-index的层叠上下文

7. 正z-index

> 序号越大层叠顺序越高

## 层叠准则

- 谁大谁上：当具有明显的层叠水平标示的时候，如识别的z-indx值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。

- 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。

## 层叠上下文的创建

### 根层叠上下文

指的是页面根元素，也就是滚动条的默认的始作俑者`<html>`元素。这就是为什么，绝对定位元素在left/top等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。

### 定位元素与传统层叠上下文

对于包含有position:relative/position:absolute的定位元素，以及FireFox/IE浏览器（不包括Chrome等webkit内核浏览器）（目前，也就是2016年初是这样）下含有position:fixed声明的定位元素，当其z-index值不是auto的时候，会创建层叠上下文

### CSS3与新时代的层叠上下文

CSS3的出现除了带来了新属性，同时还对过去的很多规则发出了挑战。例如，CSS3 transform对overflow隐藏对position:fixed定位的影响等。而这里，层叠上下文这一块的影响要更加广泛与显著。

z-index值不为auto的flex项(父元素display:flex|inline-flex).
元素的opacity值不是1.
元素的transform值不是none.
元素mix-blend-mode值不是normal.
元素的filter值不是none.
元素的isolation值是isolate.
will-change指定的属性值为上面任意一个。
元素的-webkit-overflow-scrolling设为touch