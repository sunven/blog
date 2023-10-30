# other

## How To Debug Craco/Webpack

通过 node 的 inspect-brk 参数启动后，node 会自动断点断在 webpack 入口的第一行。这时打开 Chrome，随便一个页面打开 devTools，在左上角会出现一个绿色的 Node.JS 图标（在切换手机显示模式按钮的右边），点击后就会自动连接到 node 的 debug，然后进 source 标签下单步执行就行了
// mac
node --inspect-brk ./node_modules/.bin/craco build
// windows
node --inspect-brk ./node_modules/@craco/craco/dist/bin/craco.js build

## craco 修改 output.path

<https://github.com/dilanx/craco/issues/104>
paths.appBuild = webpackConfig.output.path = path.resolve('custom-build-dir');

## customize-cra

customize-cra 真tm坑啊，less-loader，postcss-loader等版本不同容易报错，配置不兼容问题很多

``` js
addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
```

## cra

cra 禁用自动刷新

REACT_APP_DISABLE_LIVE_RELOAD=true

## manifest

### asset-manifest.json

 a json file containing the paths of all generated assets
<https://github.com/facebook/create-react-app/issues/6436>
微前端 <https://github.com/AbhiAgarwal192/MicrofrontEnd>
WordPress

### manifest.json

pwa

### precache-manifest.js

A precache manifest provides an exact representation of the expected cache state
<https://web.dev/precache-with-workbox/>
Service Worker

## react-scripts

react-scripts 2.1.8 会使用new WorkboxWebpackPlugin.GenerateSW 生成service-worker.js

<https://github.com/facebook/create-react-app/blob/v2.1.8/packages/react-scripts/config/webpack.config.js#LL600C25-L600C25>
