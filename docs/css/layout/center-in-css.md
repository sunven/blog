# 居中

- 水平居中
- 垂直居中
- 水平垂直居中

参考这个页面<a target="_blank" href="/page/center-in-css.html">center-in-css</a>

## 怎么让一个 div 水平垂直居中

```html
<style>
  .parent {
    width: 300px;
    height: 200px;
    border: 5px solid red;
  }
  .child {
    width: 100px;
    height: 50px;
    border: 5px solid red;
  }
</style>
<div class="parent">
  <div class="child"></div>
</div>
```

### 一、flex

#### 1

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
.child {
}
```

#### 2

```css
.parent {
  display: flex;
}
.child {
  margin: auto;
}
```

### 二、position&transform

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 三、position

```css
.parent {
  position: absolute;
}
.child {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

### 四、grid

```css
.parent {
  display: grid;
}
.child {
  justify-self: center;
  align-self: center;
}
```

### 五、::before

```css
.parent {
  font-size: 0;
  text-align: center;
}
.parent::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
.child {
  display: inline-block;
  vertical-align: middle;
}
```

### 六、table-cell

```css
.parent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.child {
  display: inline-block;
}
```
