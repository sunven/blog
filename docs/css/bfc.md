# BFC

它是一个只有块级盒子参与的独立块级渲染区域，它规定了内部的块级盒子如何布局，且与区域外部无关

一个BFC区域包含创建该上下文元素的所有子元素，但是不包括创建了新的BFC的子元素的内部元素

每一个BFC区域只包括其子元素，不包括其子元素的子元素。(这1点比较容易理解)

每一个BFC区域都是独立隔绝的,互不影响!(这点不太好理解，但是后续会使用代码验证)

触发bfc

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)



## 解决问题

### 同一个 BFC 下外边距会发生折叠

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

###  BFC 可以包含浮动的元素（清除浮动）

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

