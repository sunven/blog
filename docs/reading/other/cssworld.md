# css 世界

## 块级元素

### 外在盒子

负责元素是可以一行显示，还是只能换行显示

### 内在盒子（容器盒子）

负责 宽高、内容呈现等

- inline：内外均是“内联盒子”
- block：由外在的“块级盒子” 和内在的“块级容器盒子”组成
- inline-block：由外在的“内联盒子”和内 在的“块级容器盒子”组成 有间隙

-

## 宽度分离 & box-sizing

- {box-sizing:border-box}

## height:100%

### 1.为何 **height:100%**无效

### 2.如何让元素支持 **height:100%**效果

- 设定显式的高度值

- 使用绝对定位

max-\*初始值：none

min-\*初始值：auto

## 盒尺寸四大家族

### contnet

#### 什么是替换元素

内容可以被替换

特性：

- 内容的外观不受页面上的 CSS 的影响
- 有自己的尺寸
- 在很多 CSS 属性上有自己的一套表现规则

#### 替换元素的尺寸计算规则

固有尺寸、HTML 尺寸和 CSS 尺寸

`<input>`和`<button>`按钮的区别在什么地方?

#### 替换元素和非替换元素的距离有多远?

- src
- CSS content

#### content 与替换元素关系

content 属性生成的内容都是替换元素

- content 生成的文本是无法选中、无法复制

  - user- select:none

- 不能左右:empty 伪类

- content 动态生成值无法获取

#### content 生成计数

- 辅助元素生成
  - 两端对齐、弹性盒子
- 字符内容生成
  - 直接写入字符内容
  - 图标字体
- 图片生成
  - 图片的尺寸不好控制
- 开启闭合符号生成
  - open-quote/close-quote
- attr 属性值内容生成
  - content: attr(alt);
- content 计数器
  - counter-reset
  - counter-increment
  - counter()/counters()
- 混合特性
  - content: "(" attr(href) ")";

### padding

对于非替换元素的内联元素，不仅 padding 不会加入行盒高度的计算，margin 和 border 也都是如此，都是不计算高度，但实际上在内联盒周围发生了渲染

- padding 属性是不支持负值的
- padding 支持百分比值，无论是水平方向还是垂直方向均是相对于宽度计算的

- 三道杠

- 双层圆点

### margin

元素尺寸=padding+border  offsetWidth offsetHeight

元素内部尺寸=padding clientWidth clientHeight

元素外部尺寸=padding+border+margin

> 充分利用可用空间

- 一侧定宽的两栏自适应布局
- 两端对齐布局
- 等高布局

#### margin合并

块级元素的上外边距（margin-top）与下外边距（margin-bottom）有时会合并为单**88** 第 4 章 盒尺寸四大家族

个外边距

##### 相邻兄弟元素 margin 合并

##### 父级和第一个/最后一个子元素

那该如何阻止这里 margin 合并的发生呢？

对于 margin-top 合并，可以进行如下操作（满足一个条件即可）：

• 父元素设置为块状格式化上下文元素；

• 父元素设置 border-top 值；

• 父元素设置 padding-top 值；

• 父元素和第一个子元素之间添加内联元素进行分隔。

对于 margin-bottom 合并，可以进行如下操作（满足一个条件即可）：

• 父元素设置为块状格式化上下文元素；

• 父元素设置 border-bottom 值；

• 父元素设置 padding-bottom 值；

• 父元素和最后一个子元素之间添加内联元素进行分隔；

• 父元素设置 height、min-height 或 max-height

##### 空块级元素的 margin 合并

- 设置垂直方向的 border；

• 设置垂直方向的 padding；

• 里面添加内联元素（直接 Space 键空格是没用的）；

• 设置 height 或者 min-height

##### **margin** 合并的计算规则

正正取大值、正负值相加、负负最负值

#### margin合并的意义

#### margin:auto

填充闲置尺寸

触发 margin:auto 计算有一个前提条件，就是 width 或 height 为 auto 时，元素是具有对应方向的自动填充特性的

- 如果一侧定值，一侧 auto，则 auto 为剩余空间大小。

- 如果两侧均是 auto，则平分剩余空间

水平垂直居中

### border

- 等高布局

### ## 内联元素与流

### line-height

#### 垂直居中

- 只需要line-height 这一个属性就可以
- line-height 可以让单行或多行元素近似垂直居中

数值作为line-height 的属性值，那么所有的子元素继承的都是这个值；如果使用百分比值或者长度值作为属性值，那么所有的子元素继承的是最终的计算值

### vertical-align

凡是line-height 起作用的地方vertical-align 也一定起作用

只能应用于内联元素以及display 值为table-cell 的元素。

换句话说，vertical-align 属性只能作用在display 计算值为inline、inlineblock，inline-table 或table-cell 的元素上

> 浮动和绝对定位会让元素块状化

vertical-align 的百分比值是相对于line-height 计算的

#### 间隙

产生的三大元凶就是“幽灵空白节点”、line-height 和vertical-align 属性

清除间隙

- 图片块状化

- 容器line-height 足够小
- 容器font-size 足够小
- 图片设置其他vertical-align 属性值

#### 20px 图标对齐的处理技巧

- 图标高度和当前行高都是20px
- 图标标签里面永远有字符
- 图标CSS 不使用overflow:hidden 保证基线为里面字符的基线，但是要让里面潜在的字符不可见

#### 水平垂直居中弹框

```html
<div class="container">
 <div class="dialog"></dialog>
</div>
```

```css
.container {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}
.container:after {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.dialog {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  font-size: 14px;
  white-space: normal;
}
```

- 借助伪元素创建了一个和外部容器一样高的宽度为0 的inlineblock元素

## 流的破坏与保护

文字环绕效果

- 父级高度塌陷
- 行框盒子区域限制

float的特性

- 包裹性
  - 包裹
  - 自适应性
- 块状化并格式化上下文
- 破坏文档流
- 没有任何 margin 合并

### float

#### 两栏或多栏的自适应布局

一侧定宽的两栏自适应

```html
<div class="father">
 <img src="me.jpg">
 <p class="animal">小猫 1，小猫 2，...</p>
</div>
```

```css
.father {
 overflow: hidden;
}
.father > img {
 width: 60px; height: 64px;
 float: left;
}
.animal {
 margin-left: 70px;
}
```

多栏

```html
<div class="box">
 <a href class="prev">&laquo; 上一章</a>
 <a href class="next">下一章 &raquo;</a>
 <h3 class="title">第 112 章 动物环绕</h3>
</div>
```

```css
.prev {
 float: left;
}
.next {
 float: right;
}
.title {
 margin: 0 70px;
 text-align: center;
}
```

### clear

元素盒子的边不能和前面的浮动元素相邻

- 如果 clear:both 元素前面的元素就是 float 元素，则 margin-top 负值即使设 成-9999px，也不见任何效果。
- clear:both 后面的元素依旧可能会发生文字环绕的现象

### BFC

如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻 云覆雨，都不会影响外部的元素

那什么时候会触发 BFC

- 根元素
- float 的值不为 none
- overflow 的值为 auto、scroll 或 hidden
- display 的值为 table-cell、table-caption 和 inline-block 中的任何一个
- position 的值不为 relative 和 static

### absolute

absolute 是非常独立的CSS 属性值，其样式和行为表现不依赖其他任何CSS 属性就可以完成

#### 无依赖绝对定位

- 图标定位

- 表单

- 下拉列表

#### absolute 与text-align

#### absolute 与overflow

如果overflow 不是定位元素，同时绝对定位元素和overflow 容器之间也没有定位元素，则overflow 无法对absolute 元素进行剪裁

### relative

- 相对自身

- 无侵入

> 相对定位元素的left/top/right/bottom的百分比值是相对于包含块计算的，而不是自身

### fixed

“包含块”是根元素

## CSS世界的层叠规则

层叠准则

- 谁大谁上：当具有明显的层叠水平标识的时候，如生效的z-index 属性值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个
- 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM 流中处于后面的元素会覆盖前面的元素

## 强大的文本处理能力

垂直对齐

```css
p > img { 
    width: 16px; height: 16px; 
    vertical-align: .6ex; 
 position: relative; 
 top: 8px; 
}
```

word-break: break-all;

允许任意非 CJK（Chinese/Japanese/Korean）文本间的单词断行

word-wrap: break-word;

一行单词中实在没有其他靠谱的换行点的时候换行

### white-space

应用

- “包含块”尺寸过小处理
- 单行文字溢出点点点效果
- 水平列表切换效果

### text-decoration

问题：与文字重叠

用border-bottom padding-bottom替换

### text-transform

- uppercase
- lowercase

场景：

- 身份证输入
- 验证码输入

### ::first-letter

生效前提

- 元素的 display 计算值必须是 block、inline-block、list-item、tablecell 或者 table-caption
- 不是所有的字符都能单独作为::first-letter 伪元素存在的

## 元素的显示与隐藏

- 如果希望元素不可见，同时不占据空间，辅助设备无法访问，同时不渲染，可以使用`<script>`标签隐藏

```html
<script type="text/html">
 <img src="1.jpg"> 
</script> 
```

此时，图片 1.jpg 是不会有请求的。

- 如果希望元素不可见，同时不占据空间，辅助设备无法访问，但资源有加载，DOM 可访问，则可以直接使用 display:none 隐藏

- 如果希望元素不可见，同时不占据空间，辅助设备无法访问，但显隐的时候可以有transition 淡入淡出效果

```css
.hidden {
 position: absolute; 
 visibility: hidden; 
}
```

- 如果希望元素不可见，不能点击，辅助设备无法访问，但占据空间保留，则可以使用visibility:hidden 隐藏。

- 如果希望元素不可见，不能点击，不占据空间，但键盘可访问，则可以使用 clip 剪裁隐藏。

```css
.clip {
 position: absolute; 
 clip: rect(0 0 0 0); 
} 

.out { 
 position: relative; 
 left: -999em; 
} 
```

- 如果希望元素不可见，不能点击，但占据空间，且键盘可访问，则可以试试 relative隐藏。例如，如果条件允许，也就是和层叠上下文之间存在设置了背景色的父元素，则也可以使用更友好的 z-index 负值隐藏

```css
.lower {
 position: relative; 
 z-index: -1;
} 
```

- 如果希望元素不可见，但可以点击，而且不占据空间，则可以使用透明度

```css
.opacity {
 position: absolute; 
 opacity: 0; 
} 
```

- 如果单纯希望元素看不见，但位置保留，依然可以点可以选，则直接让透明度为 0

```css
.opacity {
 opacity: 0; 
}
```
