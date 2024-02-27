# webpack_guide
看一下bundle.js的内容：
```js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => { // webpackBootstrap
"use strict";
var __webpack_modules__ = ({
  "./src/bar.js":((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                  eval(`__webpack_require__.r(__webpack_exports__);
                  __webpack_require__.d(__webpack_exports__, {
                      "default": () => ( bar)
                  });
                  function bar() {
                    const element = document.createElement('div');
                    element.innerHTML = "hello webpack";
                    document.body.appendChild(element)
                  }
                  //# sourceURL=webpack://webpack_guide/./src/bar.js?
                        `);
                }),

  "./src/index.js":((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                        eval(`__webpack_require__.r(__webpack_exports__);
                        var _bar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( "./src/bar.js");
                        (0,_bar_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
                        //# sourceURL=webpack://webpack_guide/./src/index.js?
                        `);
                    })

});
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
## 先看看webpack的打包产物中的2个内置函数
 **__webpack_require__.r**函数的作用是将模块定义为esModule。
 **__webpack_require__.d**函数的作用是在eval中导出default，相当于export default function bar(){}。
可以看出webpack打包后的产物实际上就是一个自执行函数，入口是var __webpack_exports__ = __webpack_require__("./src/index.js");
 **__webpack_require__**这个是用来引用模块的函数,可以看出加载过的模块会放到缓存中，return module.exports;
 **__webpack_modules__**是一个{[moduleId]:模块的执行函数}的结构，moduleId就是文件的引用路径，加载函数有三个参数：__unused_webpack_module：缓存中的模块对象module, __webpack_exports__：module.exports, __webpack_require__:加载模块的函数。
 例如./src/index.js对应的模块执行函数中，会引用./src/bar.js;然后执行模块导出的default；


## index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="bundle.js"></script></head>
  <body>
  </body>
</html>
```
这个布尔属性的设置是为了向浏览器表明，该脚本是要在文档被解析后，但在触发 DOMContentLoaded 事件之前执行的。

包含 defer 属性的脚本将阻塞 DOMContentLoaded 事件触发，直到脚本完成加载并执行。