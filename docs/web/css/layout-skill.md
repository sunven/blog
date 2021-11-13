# 布局技巧

## 一、水平居中 

（1）行内元素解决方案

只需要把行内元素包裹在一个属性 display 为 block 的父层元素中，并且把父层元素添加如下属性即可。

`text-align: center`

```html
<div style="text-align: center"><span>1</span><a>2</a></div>
```

（2）块状元素解决方案 

`margin: 0 auto`

```html
<div style="border: 1px solid #000">
  <p style="width: 100px; border: 1px solid #000; margin: 0 auto">1</p>
  <div style="width: 100px; border: 1px solid #000; margin: 0 auto">2</div>
</div>
```

（4）多个块状元素解决方案

使用 flexbox 布局，只需要把待处理的块状元素的父元素添加属性 display: flex 及 justify-content: center 即可。

`display: flex; justify-content: center`

```html
<div style="border: 1px solid #000; display: flex; justify-content: center">
   <p style="width: 100px; border: 1px solid #000">1</p>
   <div style="width: 100px; border: 1px solid #000">2</div>
 </div>
```

## 二、垂直居中

（1）单行的行内元素解决方案

```
.parent {
    background: #222;
    height: 200px;
}

/* 以下代码中，将 a 元素的 height 和 line-height 设置的和父元素一样高度即可实现垂直居中 */
a {
    height: 200px;
    line-height:200px; 
    color: #FFF;
}
```

（2）多行的行内元素解决方案组合

使用 display: table-cell 和 vertical-align: middle 属性来定义需要居中的元素的父容器元素生成效果，如下：

```
.parent {
    background: #222;
    width: 300px;
    height: 300px;
    /* 以下属性垂直居中 */
    display: table-cell;
    vertical-align: middle;
}
```

（3）已知高度的块状元素解决方案

```
.item{
    position: absolute;
    top: 50%;
    margin-top: -50px;  /* margin-top值为自身高度的一半 */
    padding:0;
}
```

## 三、水平垂直居中

（1）已知高度和宽度的元素解决方案 1

这是一种不常见的居中方法，可自适应，比方案 2 更智能，如下：

```
.item{
    position: absolute;
    margin:auto;
    left:0;
    top:0;
    right:0;
    bottom:0;
}
```

（2）已知高度和宽度的元素解决方案 2

```
.item{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -75px;  /* 设置margin-left / margin-top 为自身高度的一半 */
    margin-left: -75px;
}
```

（3）未知高度和宽度元素解决方案

```
.item{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  /* 使用 css3 的 transform 来实现 */
}
```

（4）使用 flex 布局实现

```
.parent{
    display: flex;
    justify-content: center;
    align-items: center;
    /* 注意这里需要设置高度来查看垂直居中效果 */
    background: #AAA;
    height: 300px;
}
```

