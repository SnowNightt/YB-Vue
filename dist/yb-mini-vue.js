/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/reactive/effect.js":
/*!********************************!*\
  !*** ./src/reactive/effect.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   effect: () => (/* binding */ effect),
/* harmony export */   track: () => (/* binding */ track),
/* harmony export */   trigger: () => (/* binding */ trigger)
/* harmony export */ });
let activeEffectFn;
function effect(fn) {
  const effectFn = () => {
    try {
      activeEffectFn = fn;
      return fn();
    } finally {
      // todo
    }
  };
  effectFn();
  return effectFn; // 不知道为啥要return
}
const targetMap = new WeakMap();
// 依赖收集
function track(target, prop) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(prop);
  if (!deps) {
    depsMap.set(prop, (deps = new Set()));
  }
  deps.add(activeEffectFn);
}
// 依赖触发
function trigger(target, prop) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const deps = depsMap.get(prop);
  if (!deps) {
    return;
  }
  deps.forEach((effect) => {
    effect();
  });
}


/***/ }),

/***/ "./src/reactive/reactive.js":
/*!**********************************!*\
  !*** ./src/reactive/reactive.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reactive: () => (/* binding */ reactive)
/* harmony export */ });
/* harmony import */ var _utils_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/isObject */ "./src/utils/isObject.js");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect */ "./src/reactive/effect.js");


const handler = {
  get(target, prop, receiver) {
    const res = Reflect.get(target, prop, receiver);
    (0,_effect__WEBPACK_IMPORTED_MODULE_1__.track)(target, prop);
    return res;
  },
  set(target, prop, value, receiver) {
    const res = Reflect.set(target, prop, value, receiver);
    (0,_effect__WEBPACK_IMPORTED_MODULE_1__.trigger)(target, prop);
    return res;
  },
};
const proxyMap = new WeakMap();
function reactive(target) {
  // 检测是否传入对象
  if (!(0,_utils_isObject__WEBPACK_IMPORTED_MODULE_0__.isObject)(target)) {
    return target;
  }
  // 检测二次代理
  const isProxy = proxyMap.get(target);
  if (isProxy) {
    return isProxy;
  }
  const proxy = new Proxy(target, handler);
  proxyMap.set(target, proxy);
  return proxy;
}


/***/ }),

/***/ "./src/utils/isObject.js":
/*!*******************************!*\
  !*** ./src/utils/isObject.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isObject: () => (/* binding */ isObject)
/* harmony export */ });
function isObject(tatget) {
  return typeof tatget === "object" && tatget !== null;
}


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reactive_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive/effect */ "./src/reactive/effect.js");
/* harmony import */ var _reactive_reactive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactive/reactive */ "./src/reactive/reactive.js");



const obj = (window.obj = (0,_reactive_reactive__WEBPACK_IMPORTED_MODULE_1__.reactive)({
  count: 1,
}));
(0,_reactive_effect__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
  console.log("count:", obj.count);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWItbWluaS12dWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95Yi12dWUvLi9zcmMvcmVhY3RpdmUvZWZmZWN0LmpzIiwid2VicGFjazovL3liLXZ1ZS8uL3NyYy9yZWFjdGl2ZS9yZWFjdGl2ZS5qcyIsIndlYnBhY2s6Ly95Yi12dWUvLi9zcmMvdXRpbHMvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8veWItdnVlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3liLXZ1ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8veWItdnVlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8veWItdnVlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8veWItdnVlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBhY3RpdmVFZmZlY3RGbjtcclxuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdChmbikge1xyXG4gIGNvbnN0IGVmZmVjdEZuID0gKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYWN0aXZlRWZmZWN0Rm4gPSBmbjtcclxuICAgICAgcmV0dXJuIGZuKCk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICAvLyB0b2RvXHJcbiAgICB9XHJcbiAgfTtcclxuICBlZmZlY3RGbigpO1xyXG4gIHJldHVybiBlZmZlY3RGbjsgLy8g5LiN55+l6YGT5Li65ZWl6KaBcmV0dXJuXHJcbn1cclxuY29uc3QgdGFyZ2V0TWFwID0gbmV3IFdlYWtNYXAoKTtcclxuLy8g5L6d6LWW5pS26ZuGXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFjayh0YXJnZXQsIHByb3ApIHtcclxuICBsZXQgZGVwc01hcCA9IHRhcmdldE1hcC5nZXQodGFyZ2V0KTtcclxuICBpZiAoIWRlcHNNYXApIHtcclxuICAgIHRhcmdldE1hcC5zZXQodGFyZ2V0LCAoZGVwc01hcCA9IG5ldyBNYXAoKSkpO1xyXG4gIH1cclxuICBsZXQgZGVwcyA9IGRlcHNNYXAuZ2V0KHByb3ApO1xyXG4gIGlmICghZGVwcykge1xyXG4gICAgZGVwc01hcC5zZXQocHJvcCwgKGRlcHMgPSBuZXcgU2V0KCkpKTtcclxuICB9XHJcbiAgZGVwcy5hZGQoYWN0aXZlRWZmZWN0Rm4pO1xyXG59XHJcbi8vIOS+nei1luinpuWPkVxyXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlcih0YXJnZXQsIHByb3ApIHtcclxuICBjb25zdCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xyXG4gIGlmICghZGVwc01hcCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCBkZXBzID0gZGVwc01hcC5nZXQocHJvcCk7XHJcbiAgaWYgKCFkZXBzKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGRlcHMuZm9yRWFjaCgoZWZmZWN0KSA9PiB7XHJcbiAgICBlZmZlY3QoKTtcclxuICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gXCIuLi91dGlscy9pc09iamVjdFwiO1xyXG5pbXBvcnQgeyB0cmFjaywgdHJpZ2dlciB9IGZyb20gXCIuL2VmZmVjdFwiO1xyXG5jb25zdCBoYW5kbGVyID0ge1xyXG4gIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XHJcbiAgICBjb25zdCByZXMgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKTtcclxuICAgIHRyYWNrKHRhcmdldCwgcHJvcCk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH0sXHJcbiAgc2V0KHRhcmdldCwgcHJvcCwgdmFsdWUsIHJlY2VpdmVyKSB7XHJcbiAgICBjb25zdCByZXMgPSBSZWZsZWN0LnNldCh0YXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcik7XHJcbiAgICB0cmlnZ2VyKHRhcmdldCwgcHJvcCk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH0sXHJcbn07XHJcbmNvbnN0IHByb3h5TWFwID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0IGZ1bmN0aW9uIHJlYWN0aXZlKHRhcmdldCkge1xyXG4gIC8vIOajgOa1i+aYr+WQpuS8oOWFpeWvueixoVxyXG4gIGlmICghaXNPYmplY3QodGFyZ2V0KSkge1xyXG4gICAgcmV0dXJuIHRhcmdldDtcclxuICB9XHJcbiAgLy8g5qOA5rWL5LqM5qyh5Luj55CGXHJcbiAgY29uc3QgaXNQcm94eSA9IHByb3h5TWFwLmdldCh0YXJnZXQpO1xyXG4gIGlmIChpc1Byb3h5KSB7XHJcbiAgICByZXR1cm4gaXNQcm94eTtcclxuICB9XHJcbiAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkodGFyZ2V0LCBoYW5kbGVyKTtcclxuICBwcm94eU1hcC5zZXQodGFyZ2V0LCBwcm94eSk7XHJcbiAgcmV0dXJuIHByb3h5O1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh0YXRnZXQpIHtcclxuICByZXR1cm4gdHlwZW9mIHRhdGdldCA9PT0gXCJvYmplY3RcIiAmJiB0YXRnZXQgIT09IG51bGw7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi9yZWFjdGl2ZS9lZmZlY3RcIjtcclxuaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tIFwiLi9yZWFjdGl2ZS9yZWFjdGl2ZVwiO1xyXG5cclxuY29uc3Qgb2JqID0gKHdpbmRvdy5vYmogPSByZWFjdGl2ZSh7XHJcbiAgY291bnQ6IDEsXHJcbn0pKTtcclxuZWZmZWN0KCgpID0+IHtcclxuICBjb25zb2xlLmxvZyhcImNvdW50OlwiLCBvYmouY291bnQpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9