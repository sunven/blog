# webpack 基础

## what's webpack

### wiki

Webpack 是一个开源的前端打包工具。Webpack 提供了前端开发缺乏的模块化开发方式，将各种静态资源视为模块，并从它生成优化过的代码

Webpack可以从终端、或是更改 webpack.config.js 来设置各项功能

要使用 Webpack 前须先安装 Node.js。Webpack 其中一个特性是使用加载器来将资源转化成模块。开发者可以自定义加载器的顺序、格式来因应项目的需求

[https://zh.wikipedia.org/wiki/Webpack](https://zh.wikipedia.org/wiki/Webpack)

### webpack.js.org

打包所有的资源

打包所有的脚本

打包所有的图片

打包所有的样式

[https://webpack.js.org/](https://webpack.js.org/)

### reference

[https://www.quora.com/What-is-Webpack](https://www.quora.com/What-is-Webpack)

## 使用

### 全局安装webpack

```shell
npm install -g webpack
```

### 初始化

```shell
npm init
```

### 为项目安装

```shell
npm install --save-dev webpack
```

webpack.config.js 文件

```shell
module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    }
};
```

### 运行

```shell
webpack
```

### 配置 npm start

修改 package.json文件

```shell
"scripts": {
  "start": "webpack"
}
```

### Source Maps

```shell
module.exports = {
    devtool: 'eval-source-map',
};
```

devtool选项 | 说明
---|---
source-map | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度
cheap-module-source-map | 在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便
eval-source-map | 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项
cheap-module-eval-source-map | 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点

### 本地服务器

```shell
npm install --save-dev webpack-dev-server
```

`webpack.config.js`增加

```shell
module.exports = {
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true
  }
}
```

**contentBase**：默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）

**port**：设置默认监听端口，如果省略，默认为”8080“

**inline**：inline

**historyApiFallback**：在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html

`package.json`增加

```shell
"scripts": {
  "server": "webpack-dev-server --open"
}
```

执行

```shell
npm run server
```

## style-loader

一般与`css-loader`结合使用

### 局部

```json
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}
```

### Url

```json
{
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: "style-loader/url"
                },
                {
                    loader: "file-loader"
                }
            ]
        }]
    }
}
```

### Useable

```json
{
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: "style-loader/useable"
                },
                {
                    loader: "css-loader"
                },
            ],
        }]
    }
}
```

```js
import filecss from './css/file.css'
filecss.use();
filecss.unuse();
```

### options

名称 | 类型 | 默认值 | 描述
---|---|---|---
base | Number | true | 设置模块 ID 基础 (DLLPlugin)
attrs | Object | {} | 添加自定义 attrs 到 `<style></style>`
transform | Function | false | 转换/条件加载 CSS，通过传递转换/条件函数
insertAt | String | bottom | 在给定位置处插入 `<style></style>`
insertInto | String | `<head>` | 给定位置中插入 `<style></style>`
sourceMap | Boolean | false | 启用/禁用 Sourcemap
convertToAbsoluteUrls | Boolean | false | 启用 source map 后，将相对 URL 转换为绝对 URL

### reference

[style-loader](http://www.css88.com/doc/webpack/loaders/style-loader/)

## css-loader

### toString

```json
{
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'css-loader'
            ]
        }]
    }
}
```

```js
const css = require('./css/file.css').toString();
console.log(css);
```

名称 | 类型 | 默认值 | 描述
---|---|---|---
root | String | / | 解析 URL 的路径，以 / 开头的 URL 不会被转译
url | Boolean | true | 启用/禁用 url() 处理
alias | Object | {} | 创建别名更容易导入一些模块
import | Boolean | true | 启用/禁用 @import 处理
modules | Boolean | false | 启用/禁用 CSS 模块
minimize | Boolean \ Object | false | 启用/禁用 压缩
sourceMap | Boolean | false | 启用/禁用 Sourcemap
camelCase | Boolean \ String | false | 以驼峰化式命名导出类名
importLoaders | Number | 0 | 在 css-loader 前应用的 loader 的数量
localIdentName | String | [hash:base64] | 配置生成的标识符(ident)

### reference

[css-loader](http://www.css88.com/doc/webpack/loaders/css-loader/)

## babel-loader

```shell
npm install --save-dev babel-loader babel-core babel-preset-env webpack
```

```js
{
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env']
    }
  }
}
```

- `/\.js$/`会匹配所有`node_modules`中的js导致很慢，所以需要配置`exclude`
- 配置`cacheDirectory`将转译的结果缓存到文件系统中以提速
- babel 在每个文件都插入了辅助代码，使代码体积过大

```shell
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```

```js
// 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
{
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env'],
      plugins: ['transform-runtime']
    }
  }
}
```

### reference

[babel-loader](http://www.css88.com/doc/webpack/loaders/babel-loader/)

## url-loader

```js
{
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 81920,
            name: "[path][name].[ext]",
        }
    }]
}
```

### reference

[webpack学习笔记-2-file-loader 和 url-loader](https://blog.csdn.net/qq_38652603/article/details/73835153)