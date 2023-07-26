# BFC

## collapsing-margins

<https://www.w3.org/TR/CSS2/box.html#collapsing-margins>

<iframe src="https://codesandbox.io/embed/bfc-2p76z5?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="bfc"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

两个或多个框（可以彼此相邻或嵌套）的相邻边距（没有非空内容、填充或边框区域或间隙将它们分开）组合形成一个边距。

- 当两个元素的垂直边距接触时，只有具有最大边距值的元素的边距将被保留，而具有较小边距值的元素的边距将被折叠为零。
- 如果一个元素具有负边距，则将边距值相加以确定最终值。
- 如果两者均为负值，则使用较大的负值。此定义适用于相邻元素和嵌套元素

它是一个只有块级盒子参与的独立块级渲染区域，它规定了内部的块级盒子如何布局，且与区域外部无关

一个 BFC 区域包含创建该上下文元素的所有子元素，但是不包括创建了新的 BFC 的子元素的内部元素

每一个 BFC 区域只包括其子元素，不包括其子元素的子元素。(这 1 点比较容易理解)

每一个 BFC 区域都是独立隔绝的,互不影响!(这点不太好理解，但是后续会使用代码验证)

触发 bfc

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

## 解决问题

### 同一个 BFC 下外边距会发生折叠

```html
<head>
  div{ width: 100px; height: 100px; background: lightblue; margin: 100px; }
</head>
<body>
  <div></div>
  <div></div>
</body>
```

触发 bfc

```html
<div class="container">
  <p></p>
</div>
<div class="container">
  <p></p>
</div>
.container { overflow: hidden; } p { width: 100px; height: 100px; background:
lightblue; margin: 100px; }
```

### BFC 可以包含浮动的元素（清除浮动）

```html
<div style="border: 1px solid #000; height: 20px">
  <div style="width: 100px; height: 100px; background: #eee; float: left"></div>
</div>
```

触发 bfc

```html
<div style="border: 1px solid #000; height: 20px; overflow: hidden">
  <div style="width: 100px; height: 100px; background: #eee; float: left"></div>
</div>
```

### BFC 可以阻止元素被浮动元素覆盖

```html
<div style="height: 100px; width: 100px; float: left; background: lightblue">
  我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px; background: #eee">
  我是一个没有设置浮动, 也没有触发 BFC 元素, width: 200px; height:200px;
  background: #eee;
</div>
```

触发 bfc

```html
<div style="height: 100px; width: 100px; float: left; background: lightblue">
  我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px; background: #eee; overflow: hidden">
  我是一个没有设置浮动, 也没有触发 BFC 元素, width: 200px; height:200px;
  background: #eee;
</div>
```

## display: flow-root

无副作用的，可在不影响已有布局的情况下触发 BFC

### 两列自适应布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        margin: 20px;
        padding: 10px;
        border: 1px solid #000;
      }

      .left {
        float: left;
        border: 1px solid red;
      }

      .right {
        display: flow-root;
        border: 1px solid red;
        min-width: 200px;
      }
    </style>
  </head>
  <body>
    <div>
      <div class="left">这一列自适应内容宽度</div>
      <div class="right">这一列占据剩下宽度</div>
    </div>
  </body>
</html>
```

### 多列自适应布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        margin: 20px;
        padding: 10px;
        border: 1px solid #000;
      }

      .fr {
        float: right !important;
      }

      .col {
        float: left;
        border: 1px solid red;
      }

      .col:last-child {
        float: none;
        display: flow-root;
        border: 1px solid red;
        min-width: 100px;
      }
    </style>
  </head>
  <body>
    <div>
      <div class="col">这一列自适应内容宽度</div>
      <div class="col">这一列自适应内容宽度</div>
      <div class="col fr">这一列自适应内容宽度</div>
      <div class="col">自适应剩余空间宽度</div>
    </div>
  </body>
</html>
```
