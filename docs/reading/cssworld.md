# css世界

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



max-*初始值：none

min-*初始值：auto



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

-  src 
- CSS content

#### content 与替换元素关系

content 属性生成的内容都是替换元素

- content 生成的文本是无法选中、无法复制
  - user- select:none

- 不能左右:empty 伪类

- content 动态生成值无法获取

#### content生成计数

- 辅助元素生成
  - 两端对齐、弹性盒子
- 字符内容生成
  - 直接写入字符内容
  - 图标字体
- 图片生成
  - 图片的尺寸不好控制
- 开启闭合符号生成
  - open-quote/close-quote
-  **attr** 属性值内容生成
  - content: attr(alt);
- **content** 计数器
  - counter-reset
  - counter-increment
  - counter()/counters()
- 混合特性
  - content: "(" attr(href) ")";