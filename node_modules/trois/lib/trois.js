(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("trois", [], factory);
	else if(typeof exports === 'object')
		exports["trois"] = factory();
	else
		root["trois"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _format = __webpack_require__(1);
	
	var _format2 = _interopRequireDefault(_format);
	
	var _html = __webpack_require__(3);
	
	var _html2 = _interopRequireDefault(_html);
	
	var _is = __webpack_require__(2);
	
	var _is2 = _interopRequireDefault(_is);
	
	var _url = __webpack_require__(4);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  format: _format2.default,
	  html: _html2.default,
	  is: _is2.default,
	  url: _url2.default
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _is = __webpack_require__(2);
	
	var _is2 = _interopRequireDefault(_is);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * camelize <str>
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	
	function camelizeStr(str) {
	  return str.replace(/_([A-Za-z0-9]|$)/g, function (_, g) {
	    return g.toUpperCase();
	  });
	}
	
	/**
	 * camelize <obj>
	 *
	 * @param {*} obj
	 * @returns {*}
	 */
	function camelizeObj(obj) {
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || _is2.default.isDate(obj) || _is2.default.isRegex(obj)) {
	    return obj;
	  }
	  if (_is2.default.isArray(obj)) {
	    return obj.map(function (item) {
	      return camelizeObj(item);
	    });
	  }
	  var newObj = {};
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var key = _step.value;
	
	      newObj[camelizeStr(key)] = camelizeObj(obj[key]);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return newObj;
	}
	
	function camelize(obj) {
	  if (typeof obj === 'string') {
	    return camelizeStr(obj);
	  }
	  return camelizeObj(obj);
	}
	
	exports.default = { camelize: camelize };
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * test if <value> is an array.
	 *
	 * @param {*} value
	 * @returns {boolean}
	 */
	
	function isArray(value) {
	  return Object.prototype.toString.apply(value) === '[object Array]';
	}
	
	/**
	 * test if <value> is an instance of RegExp.
	 *
	 * @param {*} value
	 * @returns {boolean}
	 */
	
	function isRegex(value) {
	  return Object.prototype.toString.apply(value) === '[object RegExp]';
	}
	
	/**
	 * test if <value> is an instance of Date.
	 *
	 * @param {*} value
	 * @returns {boolean}
	 */
	
	function isDate(value) {
	  return Object.prototype.toString.apply(value) === '[object Date]';
	}
	
	exports.default = {
	  isArray: isArray,
	  isRegex: isRegex,
	  isDate: isDate
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Escape HTML special characters
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	
	function htmlEscape(str) {
	  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	
	/**
	 * Unescape HTML special characters
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	
	function htmlUnescape(str) {
	  return str.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
	}
	
	exports.default = {
	  htmlEscape: htmlEscape,
	  htmlUnescape: htmlUnescape
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Convert <url> to an object with its components
	 *
	 * @param {string} url
	 * @returns {object}
	 */
	
	function getUrlComponents(url) {
	  if (typeof url !== 'string') {
	    throw new Error('Expected a string.');
	  }
	  var urlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:(\/[^?#]*))?(?:(\?[^#]*))?(?:(#.*))?$/;
	  var keys = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
	  var values = urlRegex.exec(url);
	  var components = {};
	  for (var i = 0; i < keys.length; i += 1) {
	    if (values[i]) {
	      components[keys[i]] = values[i];
	    }
	  }
	  return components;
	}
	
	/**
	 * Convert <args> to a query string.
	 * The <args> parameter should be an object
	 * like {key1: value1, key2: value2}.
	 *
	 * @param {object} args
	 * @returns {string}
	 */
	
	function getQueryString(args) {
	  if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) !== 'object') {
	    throw new Error('Expected an object.');
	  }
	  var qs = Object.keys(args).map(function (key) {
	    return key + '=' + args[key];
	  }).join('&');
	  return '?' + qs;
	}
	
	/**
	 * Convert <qs> to an object.
	 * The <qs> parameter should be a string.
	 *
	 * @param {string} qs
	 * @returns {object}
	 */
	
	function getQueryArgs(qs) {
	  if (typeof qs !== 'string') {
	    throw new Error('Expected `qs` to be a string.');
	  }
	  var q = qs.length > 0 ? qs.slice(1) : '';
	  var args = {};
	  var items = q.length ? q.split('&') : [];
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var item = _step.value;
	
	      var _item$split = item.split('=');
	
	      var _item$split2 = _slicedToArray(_item$split, 2);
	
	      var key = _item$split2[0];
	      var value = _item$split2[1];
	
	      if (key.length) {
	        args[decodeURIComponent(key)] = decodeURIComponent(value);
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return args;
	}
	
	exports.default = {
	  getUrlComponents: getUrlComponents,
	  getQueryString: getQueryString,
	  getQueryArgs: getQueryArgs
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=trois.js.map