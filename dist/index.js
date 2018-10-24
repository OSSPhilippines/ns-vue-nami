module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NsVueNami = undefined;

var _nami = __webpack_require__(1);

var NsVueNami = exports.NsVueNami = {
  install: function install(Vue, options) {
    var vm = new Vue();
    Vue.prototype.$nami = (0, _nami.nami)(vm);
  }
};

exports.default = NsVueNami;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nami = __webpack_require__(2);

Object.keys(_nami).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _nami[key];
    }
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nami = exports.authGuard = exports.back = exports.modal = exports.navigate = exports.current = exports.register = exports.init = undefined;

var _utils = __webpack_require__(3);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var routes = [];
var guard = null;
var vm = null;
var currentRoute = '';

var init = exports.init = function init(options) {
  routes = options.routes || [];
  var entry = routes.find(function (route) {
    return route.entry;
  });
  if (!entry) {
    console.warn('No entry component sepecified. Deafaulting to first component in routes array.');
    entry = routes[0];
  }
  return entry.component;
};

var register = exports.register = function register(route) {
  routes.push(route);
};

var current = exports.current = function current() {
  return (0, _utils.getRoute)(currentRoute, routes);
};

var navigate = exports.navigate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(routeName, props) {
    var _getRoute, name, component, meta, noAuth, route;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _getRoute = (0, _utils.getRoute)(routeName, routes), name = _getRoute.name, component = _getRoute.component, meta = _getRoute.meta, noAuth = _getRoute.noAuth;
            route = null;

            if (noAuth) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return new Promise(function (resolve) {
              return guard(resolve);
            });

          case 5:
            route = _context.sent;

          case 6:

            if (route) {
              currentRoute = route.name;
              vm.$nami.navigate(route);
            } else {
              currentRoute = name;
              vm.$navigateTo(component, { props: props });
            }

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function navigate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var modal = exports.modal = function modal(name, props) {
  var _getRoute2 = (0, _utils.getRoute)(name),
      component = _getRoute2.component;

  vm.$showModal(component, { props: props });
};

var back = exports.back = function back() {
  vm.$navigateBack();
};

// Hooks
var authGuard = exports.authGuard = function authGuard(fn) {
  guard = fn;
};

var nami = exports.nami = function nami(vi) {
  vm = vi;
  return {
    init: init,
    register: register,
    current: current,
    navigate: navigate,
    modal: modal,
    back: back,
    authGuard: authGuard
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(4);

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getRoute = exports.getRoute = function getRoute(name, routes) {
  var result = routes.find(function (route) {
    return route.name === name;
  });
  if (!result) return 'not found';
  return result;
};

/***/ })
/******/ ]);