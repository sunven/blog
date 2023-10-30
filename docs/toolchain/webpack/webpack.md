# webpack

## 打包后源码解读

### main.js

index.js

```js
import { str } from './a'
console.log(str)
```

a.js

```js
export const str = 'a.js'
```

打包如下:

```js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ ;(() => {
  // webpackBootstrap
  /******/ 'use strict'
  /******/ var __webpack_modules__ = {
    /***/ './src/a.js':
      /*!******************!*\
  !*** ./src/a.js ***!
  \******************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "str": () => (/* binding */ str)\n/* harmony export */ });\nconst str = \'a.js\'\n\n\n//# sourceURL=webpack://demo/./src/a.js?'
        )

        /***/
      },

    /***/ './src/index.js':
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ "./src/a.js");\n\nconsole.log(_a__WEBPACK_IMPORTED_MODULE_0__.str)\n\n\n//# sourceURL=webpack://demo/./src/index.js?'
        )

        /***/
      },

    /******/
  } // The module cache
  /************************************************************************/
  /******/ /******/ var __webpack_module_cache__ = {} // The require function
  /******/

  /******/ /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId]
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    }) // Execute the module function
    /******/

    /******/ /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    ) // Return the exports of the module
    /******/

    /******/ /******/ return module.exports
    /******/
  } /* webpack/runtime/define property getters */
  /******/

  /************************************************************************/
  /******/ /******/ ;(() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
          /******/
        }
        /******/
      }
      /******/
    }
    /******/
  })() /* webpack/runtime/hasOwnProperty shorthand */
  /******/

  /******/ /******/ ;(() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
    /******/
  })() /* webpack/runtime/make namespace object */
  /******/

  /******/ /******/ ;(() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = exports => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        })
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true })
      /******/
    }
    /******/
  })() // startup // Load entry module and return exports // This entry module can't be inlined because the eval devtool is used.
  /******/

  /************************************************************************/
  /******/

  /******/ /******/ /******/ /******/ var __webpack_exports__ = __webpack_require__(
    './src/index.js'
  )
  /******/
  /******/
})()
```

精简注释后：

```js
;(() => {
  // webpack 启动
  'use strict'
  var webpackmodules = {
    './src/a.js': (unusedmodule, exports, require) => {
      //为exports打标记，__esModules
      require.r(exports)
      //将原始js导出的内容映射到exports上
      require.d(exports, { str: () => str })
      const str = 'a.js'
    },

    './src/index.js': (unusedmodule, exports, require) => {
      require.r(exports)
      var a = require('./src/a.js')
      console.log(a.str)
    },
  }
  // 模块缓存
  var modulecache = {}

  // The require function
  function require(moduleId) {
    // 尝试取缓存
    var cachedModule = modulecache[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    // 创建一个模块，写入缓存
    var module = (modulecache[moduleId] = {
      exports: {},
    })

    // 执行模块
    webpackmodules[moduleId](module, module.exports, require)

    // 返回模块
    return module.exports
  }

  ;(() => {
    //definition就是原始模块的具体内容（即a.js export的内容）
    //调用require会得到一个module，module中有一个exports
    //将definition中的每一个key映射到exports中
    require.d = (exports, definition) => {
      for (var key in definition) {
        if (require.o(definition, key) && !require.o(exports, key)) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
        }
      }
    }
  })()

  // 就是hasOwnProperty方法
  ;(() => {
    require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
  })()

  // 为exports定义__esModules属性
  ;(() => {
    require.r = exports => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        // Symbol.toStringTag:内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里
        // 即：某个exports调用toString()会返回 "[object Module]"
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      }
      Object.defineProperty(exports, '__esModule', { value: true })
    }
  })()

  //入口js
  //这里的./src/index.js只是一个key
  var exports = require('./src/index.js')
})()
```

### sourcemap

```js
{
  devtool: 'eval-cheap-module-source-map' //开发
  //devtool:'cheap-module-source-map'    //生产
}
```

## 简易 webpack 实现

入口文件 index.js,依赖 a.js,b.js

index.js

```js
import { str as stra } from './a'
import { str as strb } from './b'
console.log('index.js', stra, strb)
```

a.js

```js
export const str = 'a.js'
```

b.js

```javascript
export const str = 'b.js'
```

执行打包文件，bundle.js

```js
const MiniWebpack = require('./lib/miniwebpack')
const config = require('./webpack.config')
new MiniWebpack(config).run()
```

webpack 配置文件，webpack.config.js

```js
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: { path: path.resolve(__dirname, './dist'), filename: 'main.js' },
}
```

miniwebpack 具体实现,miniwebpack.js

```js
//babel使用的JavaScript解析器，得到ast
const parser = require('@babel/parser')
//遍历ast，解析出依赖
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
const path = require('path')
const fs = require('fs')
class MiniWebpack {
  constructor(options) {
    //入口
    this.entry = options.entry
    //出口
    this.output = options.output
    //模块
    this.modules = []
  }
  run() {
    //解析
    const info = this.parse(this.entry)
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const { dependencies } = this.modules[i]
      if (dependencies) {
        //遍历依赖，解析依赖
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]))
        }
      }
    }
    //modules中就保存了所有的模块，并且知道每个模块依赖那些模块
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = { dependencies: item.dependencies, code: item.code }
    })
    // 生成出口文件
    this.file(obj)
  }
  file(code) {
    const filepath = path.join(this.output.path, this.output.filename)
    //转为字符串
    const newcode = JSON.stringify(code)
    const bundle = `;(function(graph){
        //自定义require
        function require(module){
            function otherRequire(relativePath){
                return require(graph[module].dependencies[relativePath])
            }
            var exports = {}
            ;(function(require,exports,code){
                //动态执行代码
                eval(code)
            })(otherRequire,exports,graph[module].code)
            return exports
        }
        //先获取入口文件
        require('${this.entry}')
    })(${newcode})`
    //写到指定的出口文件
    fs.writeFileSync(filepath, bundle)
  }
  //解析入口文件
  parse(entryFile) {
    //读取文件
    const content = fs.readFileSync(entryFile).toString()
    //转化为ast
    const ast = parser.parse(content, {
      sourceType: 'module',
    })

    const dependencies = {}
    //遍历ast,解析出依赖那些模块
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        // 将依赖收集到dependencies
        dependencies[node.source.value] =
          './' + path.join(path.dirname(entryFile), node.source.value) + '.js'
      },
    })
    // 从ast转换出代码,
    // 允许您使用最新的 JavaScript，而无需对目标环境需要哪些语法转换（以及可选的浏览器 polyfill）进行微观管理
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    return {
      entryFile,
      dependencies,
      code,
    }
  }
}

module.exports = MiniWebpack
```

输出文件 main.js

```js
;(function (graph) {
  //自定义require
  function require(module) {
    function otherRequire(relativePath) {
      return require(graph[module].dependencies[relativePath])
    }
    var exports = {}
    ;(function (require, exports, code) {
      //动态执行代码
      eval(code)
    })(otherRequire, exports, graph[module].code)
    return exports
  }
  //先获取入口文件
  require('./src/index.js')
})({
  './src/index.js': {
    dependencies: { './a': './src/a.js', './b': './src/b.js' },
    code: '"use strict";\n\nvar _a = require("./a");\n\nvar _b = require("./b");\n\nconsole.log(\'index.js\', _a.str, _b.str);',
  },
  './src/a.js': {
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.str = void 0;\nvar str = \'a.js\';\nexports.str = str;',
  },
  './src/b.js': {
    dependencies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.str = void 0;\nvar str = \'b.js\';\nexports.str = str;',
  },
})vite
```

## roadhog react-app-rewired

roadhog > af-webpack
react-app-rewired > customize-cra

## css-loader

现象：

```css
body {
  background-image: url('./a.png');
}
```

报错：`Module not found: Error: Can't resolve './a.png' in 'xxx'`
实际 enhanced-resolve Resolver.resolve 报错

```css
body {
  background-image: url('/a.png');
}
```

正常

老版本(<=3.x)的 css-loader 中，用 loader-utils 包的 isUrlRequest 方法判断 url 是否需要 require
loader-utils <= 2.x
/ 开头不require
<https://github.com/webpack/loader-utils/blob/6688b5028106f144ee9f543bebc8e6a87b57829f/lib/isUrlRequest.js#L24>
