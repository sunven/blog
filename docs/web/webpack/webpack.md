# webpack



## main.js

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
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"str\": () => (/* binding */ str)\n/* harmony export */ });\nconst str = 'a.js'\n\n\n//# sourceURL=webpack://demo/./src/a.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \"./src/a.js\");\n\nconsole.log(_a__WEBPACK_IMPORTED_MODULE_0__.str)\n\n\n//# sourceURL=webpack://demo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
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



## sourcemap



```js
{
  devtool:'eval-cheap-module-source-map' //开发
  //devtool:'cheap-module-source-map'    //生产
}
```

