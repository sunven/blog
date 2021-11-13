# BFC

出发bfc

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)



**1. 同一个 BFC 下外边距会发生折叠**

```html
<head>
div{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
</head>
<body>
    <div></div>
    <div></div>
</body>
```

触发bfc

```html
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
.container {
    overflow: hidden;
}
p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
```





**2. BFC 可以包含浮动的元素（清除浮动）**

```html
<div style="border: 1px solid #000; height: 20px">
  <div
    style="width: 100px; height: 100px; background: #eee; float: left"
  ></div>
</div>
```

触发bfc

```html
<div style="border: 1px solid #000; height: 20px; overflow: hidden">
  <div
    style="width: 100px; height: 100px; background: #eee; float: left"
  ></div>
</div>
```



**3. BFC 可以阻止元素被浮动元素覆盖**

```html
<div style="height: 100px; width: 100px; float: left; background: lightblue">
  我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px; background: #eee">
  我是一个没有设置浮动, 也没有触发 BFC 元素, width: 200px; height:200px;
  background: #eee;
</div>
```

触发bfc

```html
<div style="height: 100px; width: 100px; float: left; background: lightblue">
  我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px; background: #eee; overflow: hidden">
  我是一个没有设置浮动, 也没有触发 BFC 元素, width: 200px; height:200px;
  background: #eee;
</div>
```

