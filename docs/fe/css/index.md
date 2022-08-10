# css

## css modules

一个 CSS 模块是所有类名和动画名称默认局部范围的 CSS 文件

### 全局作用域

```css
:global(.container) {
  padding: 20px;
}
```

### 组合

```css
.className {
  color: green;
  background: red;
}

.otherClassName {
  composes: className;
  color: yellow;
}
```

### 依赖

```css
/* 依赖文件 */
.otherClassName {
  composes: className from './style.css';
}

/* 依赖全局 */
.otherClassName {
  composes: globalClassName from global;
}
```

### 示例

webpack.config.js:

```javascript
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
```

index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div class="main">a</div>
    <div id="div1">b</div>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

index.js:

```js
import index from './index.css'
document.querySelector('#div1').className = index.main
```

index.css:

```css
.main {
  border: 1px solid red;
  width: 100px;
  height: 100px;
}
```

![demo](./images/Snipaste_2021-12-11_12-45-01.png)

### 解决了什么问题

- 命名冲突

- 模块化

- 嵌套过深

### reference

[GitHub - css-modules/css-modules: Documentation about css-modules](https://github.com/css-modules/css-modules)

## css in js

用 js 写 css

实现方式主要有两种

- 唯一 css 选择器
- 内联样式

```js
const cssinjs = styleBlock => {
  // 生成选择器名称，保证唯一
  const selectorName = hash(styleBlock)
  const styleEl = document.createElement('style')
  styleEl.textContent = `
  .${selectorName} {
    ${styleBlock}
  }`
  document.head.appendChild(styleEl)
  return className
}
const selectorName = cssinjs(`
  color: red;
  padding: 20px;
`)
```

或者 styleBlock 也可以采用 style 属性对象写法

[https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)

```json
const style = {
  'color': 'red',
  'fontSize': '46px'
};
```

- css in js 没有统一标准
- 实现库很多[http://michelebertoli.github.io/css-in-js/](http://michelebertoli.github.io/css-in-js/)

## css preprocessor

css 预处理器一般具有的特征

- 变量
- 嵌套
- 混合（mixin）
- 继承
- 计算（+，-，\*，/）

### sass

- scss
- Sass

### less

### stylus

### postcss

- autoprefixer
- polyfill
- css modules
- stylelint
