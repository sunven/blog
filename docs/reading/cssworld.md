# css 世界

## 块级元素

### 外在盒子

负责元素是可以一行显示，还是只能换行显示

### 内在盒子（容器盒子）

负责 宽高、内容呈现等

- inline：内外均是“内联盒子”
- block：由外在的“块级盒子” 和内在的“块级容器盒子”组成
- inline-block：由外在的“内联盒子”和内 在的“块级容器盒子”组成

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
