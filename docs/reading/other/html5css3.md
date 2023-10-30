# HTML5与CSS3权威指南

## 属性选择器

- 全等字符匹配:`[att=val]`

- 包含字符匹配:`[att*=val]`

- 开头字符匹配:`[att^=val]`

- 结尾字符匹配:`[att&=val]`

## 结构性伪类选择器

```
选择器:伪元素{属性:值}
选择器.类名:伪元素{属性:值}
```

### first-line

用于向某个元素的第一行文字使用样式

### first-letter

用于向某个元素的文字的首字母或第一个字使用样式

### before

用于在某个元素之前插入一些内容

### after

用于在某个元素之后插入一些内容

### root

将样式绑定到页面的根元素中 一般指html元素

### not

排除某个元素下面的子元素

### empty

指定元素中内容为空白时使用的样式

### target

对页面某个target元素（该元素的id被当做页面中的超链接来使用）指定样式，该样式只在用户点击了页面中的超链接，并且跳转到target元素后起作用

### first-child

父元素中的第一个子元素

### last-child

父元素中的最后一个子元素

### nth-child

父元素中正数指定序号的子元素

```
:nth-child(even){
    //正数第偶数个元素
}
:nth-child(odd){
    //正数第奇数个元素
}
```

:nth-child(An+B [of S]? )
结构伪类：<https://www.w3.org/TR/selectors/#the-nth-child-pseudo>

参考：
<https://css-tricks.com/almanac/selectors/n/nth-child/>
<https://css-tricks.com/how-nth-child-works/>

### nth-last-child

父元素中倒数指定序号的子元素

```
:nth-last-child(even){
    //倒数第偶数个元素
}
:nth-last-child(odd){
    //倒数第奇数个元素
}
```

> `nth-child`,`nth-last-child`在计算子元素是奇数个还是偶数个时，是连同父元素中所有的子元素一起计算的

### nth-of-type,nth-last-of-type

> `nth-of-type`,`nth-last-of-type`在计算子元素是奇数个还是偶数个时，只针对同类型的子元素计算

### an+b

- a表示每次循环包括集中样式

- b表示指定的样式在循环中所处的位置

```
//每4个li做一次循环
//每个li分别应用不同的样式
li:nth-child(4n+1){
    color:#111;
}
li:nth-child(4n+2){
    color:#222;
}
li:nth-child(4n+3){
    color:#333;
}
li:nth-child(4n+4){
    color:#444;
}
```

> an+a可简写成an,即4n+4可简写成4n

- `nth-child(odd)`=`nth-child(2n+1)`

- `nth-child(even)`=`nth-child(2n+2)`

- `nth-last-child(odd)`=`nth-last-child(2n+1)`

- `nth-last-child(even)`=`nth-last-child(2n+2)`

## only-child

指定当某个父元素中只有一个子元素时才使用的样式

> `only-child`=`nth-child(1):nth-last-child(1)`=`nth-of-child(1):nth-last-of-child(1)`

## UI元素状态伪类选择器

## 通过兄弟元素选择器

指定位于同一个父元素之中的某个元素之后的所有其他某个种类的兄弟元素

```
div ~ p{
}
```
