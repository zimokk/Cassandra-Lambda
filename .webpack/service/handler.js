(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var errors = __webpack_require__(3);

/**
 * Max int that can be accurately represented with 64-bit Number (2^53)
 * @type {number}
 * @const
 */
var maxInt = 9007199254740992;

var emptyObject = Object.freeze({});

function noop() {}

/**
 * Forward-compatible allocation of buffer, filled with zeros.
 * @type {Function}
 */
var allocBuffer = Buffer.alloc || allocBufferFillDeprecated;

/**
 * Forward-compatible unsafe allocation of buffer.
 * @type {Function}
 */
var allocBufferUnsafe = Buffer.allocUnsafe || allocBufferDeprecated;

/**
 * Forward-compatible allocation of buffer to contain a string.
 * @type {Function}
 */
var allocBufferFromString = Buffer.from || allocBufferFromStringDeprecated;

/**
 * Forward-compatible allocation of buffer from an array of bytes
 * @type {Function}
 */
var allocBufferFromArray = Buffer.from || allocBufferFromArrayDeprecated;

function allocBufferDeprecated(size) {
  // eslint-disable-next-line
  return new Buffer(size);
}

function allocBufferFillDeprecated(size) {
  var b = allocBufferDeprecated(size);
  b.fill(0);
  return b;
}

function allocBufferFromStringDeprecated(text, encoding) {
  if (typeof text !== 'string') {
    throw new TypeError('Expected string, obtained ' + util.inspect(text));
  }
  // eslint-disable-next-line
  return new Buffer(text, encoding);
}

function allocBufferFromArrayDeprecated(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected Array, obtained ' + util.inspect(arr));
  }
  // eslint-disable-next-line
  return new Buffer(arr);
}

/**
 * Creates a copy of a buffer
 */
function copyBuffer(buf) {
  var targetBuffer = allocBufferUnsafe(buf.length);
  buf.copy(targetBuffer);
  return targetBuffer;
}

/**
 * Appends the original stack trace to the error after a tick of the event loop
 */
function fixStack(stackTrace, error) {
  if (stackTrace) {
    error.stack += '\n  (event loop)\n' + stackTrace.substr(stackTrace.indexOf("\n") + 1);
  }
  return error;
}

/**
 * Uses the logEmitter to emit log events
 * @param {String} type
 * @param {String} info
 * @param [furtherInfo]
 */
function log(type, info, furtherInfo) {
  if (!this.logEmitter) {
    //noinspection JSUnresolvedVariable
    if (!this.options || !this.options.logEmitter) {
      throw new Error('Log emitter not defined');
    }
    //noinspection JSUnresolvedVariable
    this.logEmitter = this.options.logEmitter;
  }
  this.logEmitter('log', type, this.constructor.name, info, furtherInfo || '');
}

/**
 * Gets the sum of the length of the items of an array
 */
function totalLength (arr) {
  if (arr.length === 1) {
    return arr[0].length;
  }
  var total = 0;
  arr.forEach(function (item) {
    var length = item.length;
    length = length ? length : 0;
    total += length;
  });
  return total;
}

/**
 * Merge the contents of two or more objects together into the first object. Similar to jQuery.extend
 */
function extend(target) {
  var sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function (source) {
    if (!source) {
      return;
    }
    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = source[key];
      if (value === undefined) {
        continue;
      }
      target[key] = value;
    }
  });
  return target;
}

function lowerCaseExtend(target) {
  var sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop.toLowerCase()] = source[prop];
      }
    }
  });
  return target;
}

/**
 * Extends the target by the most inner props of sources
 * @param {Object} target
 * @returns {Object}
 */
function deepExtend(target) {
  var sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      if (!source.hasOwnProperty(prop)) {
        continue;
      }
      var targetProp = target[prop];
      var targetType = (typeof targetProp);
      //target prop is
      // a native single type
      // or not existent
      // or is not an anonymous object (not class instance)
      if (!targetProp ||
        targetType === 'number' ||
        targetType === 'string' ||
        util.isArray(targetProp) ||
        util.isDate(targetProp) ||
        targetProp.constructor.name !== 'Object') {
        target[prop] = source[prop];
      }
      else {
        //inner extend
        target[prop] = deepExtend({}, targetProp, source[prop]);
      }
    }
  });
  return target;
}

function propCompare(propName) {
  return function (a, b) {
    if (a[propName] > b[propName]) {
      return 1;
    }
    if (a[propName] < b[propName]) {
      return -1;
    }
    return 0;
  };
}

function funcCompare(name, argArray) {
  return (function (a, b) {
    if (typeof a[name] === 'undefined') {
      return 0;
    }
    var valA = a[name].apply(a, argArray);
    var valB = b[name].apply(b, argArray);
    if (valA > valB) {
      return 1;
    }
    if (valA < valB) {
      return -1;
    }
    return 0;
  });
}
/**
 * Uses the iterator protocol to go through the items of the Array
 * @param arr
 * @returns {{next: function}}
 */
function arrayIterator (arr) {
  var index = 0;
  return { next : function () {
    if (index >= arr.length) {
      return {done: true};
    }
    return {value: arr[index++], done: false };
  }};
}

/**
 * Convert the iterator values into an array
 * @param iterator
 * @returns {Array}
 */
function iteratorToArray(iterator) {
  var values = [];
  var item = iterator.next();
  while (!item.done) {
    values.push(item.value);
    item = iterator.next();
  }
  return values;
}

/**
 * Searches the specified Array for the provided key using the binary
 * search algorithm.  The Array must be sorted.
 * @param {Array} arr
 * @param key
 * @param {function} compareFunc
 * @returns {number} The position of the key in the Array, if it is found.
 * If it is not found, it returns a negative number which is the bitwise complement of the index of the first element that is larger than key.
 */
function binarySearch(arr, key, compareFunc) {
  var low = 0;
  var high = arr.length-1;

  while (low <= high) {
    var mid = (low + high) >>> 1;
    var midVal = arr[mid];
    var cmp = compareFunc(midVal, key);
    if (cmp < 0) {
      low = mid + 1;
    }
    else if (cmp > 0) {
      high = mid - 1;
    }
    else
    {
      //The key was found in the Array
      return mid;
    }
  }
  // key not found
  return ~low;
}

/**
 * Inserts the value in the position determined by its natural order determined by the compare func
 * @param {Array} arr
 * @param item
 * @param {function} compareFunc
 */
function insertSorted(arr, item, compareFunc) {
  if (arr.length === 0) {
    return arr.push(item);
  }
  var position = binarySearch(arr, item, compareFunc);
  if (position < 0) {
    position = ~position;
  }
  arr.splice(position, 0, item);
}

/**
 * Binds the domain (if any) to the callback
 * @param {Function} callback
 * @param {String} [name]
 * @returns {Function}
 */
function bindDomain(callback, name) {
  if (typeof callback !== 'function') {
    throw new errors.ArgumentError(util.format('%s is not a function', name || 'callback'));
  }
  if (process.domain) {
    callback = process.domain.bind(callback);
  }
  return callback;
}

/**
 * Adapts the parameters based on the prepared metadata.
 * If the params are passed as an associative array (Object),
 * it adapts the object into an array with the same order as columns
 * @param {Array|Object} params
 * @param {Array} columns
 * @returns {{ params: Array, keys: Object}} Returns an array of parameters and the keys as an associative array.
 * @throws {Error} In case a parameter with a specific name is not defined
 */
function adaptNamedParamsPrepared(params, columns) {
  if (!params || util.isArray(params) || !columns || columns.length === 0) {
    //The parameters is an Array or there isn't parameter
    return { params: params, keys: null};
  }
  var paramsArray = new Array(columns.length);
  params = lowerCaseExtend({}, params);
  var keys = {};
  for (var i = 0; i < columns.length; i++) {
    var name = columns[i].name;
    if (!params.hasOwnProperty(name)) {
      throw new errors.ArgumentError(util.format('Parameter "%s" not defined', name));
    }
    paramsArray[i] = params[name];
    keys[name] = i;
  }
  return { params: paramsArray, keys: keys};
}

/**
 * Adapts the associative-array of parameters and hints for simple statements
 * into Arrays based on the (arbitrary) position of the keys.
 * @param {Array|Object} params
 * @param {QueryOptions} options
 * @returns {{ params: Array.<{name, value}>, keys: Object}} Returns an array of parameters and the keys as an associative array.
 */
function adaptNamedParamsWithHints(params, options) {
  if (!params || util.isArray(params)) {
    //The parameters is an Array or there isn't parameter
    return { params: params, keys: null};
  }
  options.namedParameters = true;
  var keys = Object.keys(params);
  var paramsArray = new Array(keys.length);
  var hints = new Array(keys.length);
  var userHints = options.hints || emptyObject;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //As lower cased identifiers
    paramsArray[i] = { name: key.toLowerCase(), value: params[key]};
    hints[i] = userHints[key];
  }
  options.hints = hints;
  return { params: paramsArray, keys: keys};
}

/**
 * Returns a string with a value repeated n times
 * @param {String} val
 * @param {Number} times
 * @returns {String}
 */
function stringRepeat(val, times) {
  if (!times || times < 0) {
    return null;
  }
  if (times === 1) {
    return val;
  }
  return new Array(times + 1).join(val);
}

/**
 * Returns an array containing the values of the Object, similar to Object.values().
 * If obj is null or undefined, it will return an empty array.
 * @param {Object} obj
 * @returns {Array}
 */
function objectValues(obj) {
  if (!obj) {
    return exports.emptyArray;
  }
  var keys = Object.keys(obj);
  var values = new Array(keys.length);
  for (var i = 0; i < keys.length; i++) {
    values[i] = obj[keys[i]];
  }
  return values;
}

/**
 * Wraps the callback-based method. When no originalCallback is not defined, it returns a Promise.
 * @param {ClientOptions} options
 * @param {Function} originalCallback
 * @param {Boolean} allowNoPromiseSupport
 * @param {Function} handler
 * @returns {Promise|undefined}
 */
function promiseWrapper(options, originalCallback, allowNoPromiseSupport, handler) {
  if (allowNoPromiseSupport && !originalCallback && !options.promiseFactory && typeof Promise === 'undefined') {
    // Optional callback on some methods is supported, even for js engines without Promise support
    originalCallback = noop;
  }
  if (typeof originalCallback === 'function') {
    // Callback-based invocation
    handler.call(this, bindDomain(originalCallback));
    return undefined;
  }
  var factory = options.promiseFactory;
  if (!factory) {
    if (typeof Promise === 'undefined') {
      throw new errors.ArgumentError(
        'Callback was not provided and Promise is undefined. See ' +
        'ClientOptions.promiseFactory documentation.');
    }
    factory = defaultPromiseFactory;
  }
  var self = this;
  return factory(function handlerWrapper(callback) {
    handler.call(self, callback);
  });
}

/**
 * @param {Function} handler
 * @returns {Promise}
 */
function defaultPromiseFactory(handler) {
  return new Promise(function executor(resolve, reject) {
    handler(function handlerCallback(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

// Classes

/**
 * Represents a unique set of values.
 * @constructor
 */
function HashSet() {
  this.length = 0;
  this.items = {};
}

/**
 * Adds a new item to the set.
 * @param {Object} key
 * @returns {boolean} Returns true if it was added to the set; false if the key is already present.
 */
HashSet.prototype.add = function (key) {
  if (this.items[key]) {
    return false;
  }
  this.items[key] = true;
  this.length++;
  return true;
};

/**
 * @returns {boolean} Returns true if the key is present in the set.
 */
HashSet.prototype.contains = function (key) {
  return this.items[key] === true;
};

/**
 * Returns an array containing the set items.
 * @returns {Array}
 */
HashSet.prototype.toArray = function () {
  return Object.keys(this.items);
};

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {Function} [callback]
 */
function each(arr, fn, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First parameter is not an Array');
  }
  callback = callback || noop;
  var length = arr.length;
  if (length === 0) {
    return callback();
  }
  var completed = 0;
  for (var i = 0; i < length; i++) {
    fn(arr[i], next);
  }
  function next(err) {
    if (err) {
      var cb = callback;
      callback = noop;
      cb(err);
      return;
    }
    if (++completed !== length) {
      return;
    }
    callback();
  }
}

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {Function} [callback]
 */
function eachSeries(arr, fn, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First parameter is not an Array');
  }
  callback = callback || noop;
  var length = arr.length;
  if (length === 0) {
    return callback();
  }
  var sync;
  var index = 1;
  fn(arr[0], next);
  if (sync === undefined) {
    sync = false;
  }

  function next(err) {
    if (err) {
      return callback(err);
    }
    if (index >= length) {
      return callback();
    }
    if (sync === undefined) {
      sync = true;
    }
    if (sync) {
      return process.nextTick(function () {
        fn(arr[index++], next);
      });
    }
    fn(arr[index++], next);
  }
}

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {Function} [callback]
 */
function forEachOf(arr, fn, callback) {
  return mapEach(arr, fn, true, callback);
}

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {Function} [callback]
 */
function map(arr, fn, callback) {
  return mapEach(arr, fn, false, callback);
}

function mapEach(arr, fn, useIndex, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First parameter must be an Array');
  }
  callback = callback || noop;
  var length = arr.length;
  if (length === 0) {
    return callback(null, []);
  }
  var result = new Array(length);
  var completed = 0;
  var invoke = useIndex ? invokeWithIndex : invokeWithoutIndex;
  for (var i = 0; i < length; i++) {
    invoke(i);
  }

  function invokeWithoutIndex(i) {
    fn(arr[i], function mapItemCallback(err, transformed) {
      result[i] = transformed;
      next(err);
    });
  }

  function invokeWithIndex(i) {
    fn(arr[i], i, function mapItemCallback(err, transformed) {
      result[i] = transformed;
      next(err);
    });
  }

  function next(err) {
    if (err) {
      var cb = callback;
      callback = noop;
      cb(err);
      return;
    }
    if (++completed !== length) {
      return;
    }
    callback(null, result);
  }
}

/**
 * @param {Array} arr
 * @param {Function} fn
 * @param {Function} [callback]
 */
function mapSeries(arr, fn, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First parameter must be an Array');
  }
  callback = callback || noop;
  var length = arr.length;
  if (length === 0) {
    return callback(null, []);
  }
  var result = new Array(length);
  var index = 0;
  var sync;
  invoke(0);
  if (sync === undefined) {
    sync = false;
  }

  function invoke(i) {
    fn(arr[i], function mapItemCallback(err, transformed) {
      result[i] = transformed;
      next(err);
    });
  }

  function next(err) {
    if (err) {
      return callback(err);
    }
    if (++index === length) {
      return callback(null, result);
    }
    if (sync === undefined) {
      sync = true;
    }
    var i = index;
    if (sync) {
      return process.nextTick(function () {
        invoke(i);
      });
    }
    invoke(index);
  }
}

/**
 * @param {Array.<Function>} arr
 * @param {Function} [callback]
 */
function parallel(arr, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First parameter must be an Array');
  }
  callback = callback || noop;
  var length = arr.length;
  var completed = 0;
  for (var i = 0; i < length; i++) {
    arr[i](next);
  }
  function next(err) {
    if (err) {
      var cb = callback;
      callback = noop;
      return cb(err);
    }
    if (++completed !== length) {
      return;
    }
    callback();
  }
}

/**
 * Similar to async.series(), but instead accumulating the result in an Array, it callbacks with the result of the last
 * function in the array.
 * @param {Array.<Function>} arr
 * @param {Function} [callback]
 */
function series(arr, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First parameter must be an Array');
  }
  callback = callback || noop;
  var index = 0;
  var sync;
  next();
  function next(err, result) {
    if (err) {
      return callback(err);
    }
    if (index === arr.length) {
      return callback(null, result);
    }
    if (sync) {
      return process.nextTick(function () {
        //noinspection JSUnusedAssignment
        sync = true;
        arr[index++](next);
        sync = false;
      });
    }
    sync = true;
    arr[index++](next);
    sync = false;
  }
}

/**
 * @param {Number} count
 * @param {Function} iteratorFunc
 * @param {Function} [callback]
 */
function times(count, iteratorFunc, callback) {
  callback = callback || noop;
  count = +count;
  if (isNaN(count) || count === 0) {
    return callback();
  }
  var completed = 0;
  for (var i = 0; i < count; i++) {
    iteratorFunc(i, next);
  }
  function next(err) {
    if (err) {
      var cb = callback;
      callback = noop;
      return cb(err);
    }
    if (++completed !== count) {
      return;
    }
    callback();
  }
}

/**
 * @param {Number} count
 * @param {Number} limit
 * @param {Function} iteratorFunc
 * @param {Function} [callback]
 */
function timesLimit(count, limit, iteratorFunc, callback) {
  callback = callback || noop;
  limit = Math.min(limit, count);
  var index = limit - 1;
  var i;
  var completed = 0;
  for (i = 0; i < limit; i++) {
    iteratorFunc(i, next);
  }
  i = -1;
  var sync = undefined;
  function next(err) {
    if (err) {
      var cb = callback;
      callback = noop;
      cb(err);
      return;
    }
    if (++completed === count) {
      return callback();
    }
    index++;
    if (index >= count) {
      return;
    }
    if (sync === undefined) {
      sync = (i >= 0);
    }
    if (sync) {
      var captureIndex = index;
      return process.nextTick(function () {
        iteratorFunc(captureIndex, next);
      });
    }
    iteratorFunc(index, next);
  }
}

/**
 * @param {Number} count
 * @param {Function} iteratorFunction
 * @param {Function} callback
 */
function timesSeries(count, iteratorFunction, callback) {
  count = +count;
  if (isNaN(count) || count < 1) {
    return callback();
  }
  var index = 1;
  var sync;
  iteratorFunction(0, next);
  if (sync === undefined) {
    sync = false;
  }
  function next(err) {
    if (err) {
      return callback(err);
    }
    if (index === count) {
      return callback();
    }
    if (sync === undefined) {
      sync = true;
    }
    var i = index++;
    if (sync) {
      //Prevent "Maximum call stack size exceeded"
      return process.nextTick(function () {
        iteratorFunction(i, next);
      });
    }
    //do a sync call as the callback is going to call on a future tick
    iteratorFunction(i, next);
  }
}

/**
 * @param {Function} condition
 * @param {Function} fn
 * @param {Function} callback
 */
function whilst(condition, fn, callback) {
  var sync = 0;
  next();
  function next(err) {
    if (err) {
      return callback(err);
    }
    if (!condition()) {
      return callback();
    }
    if (sync === 0) {
      sync = 1;
      fn(function (err) {
        if (sync === 1) {
          //sync function
          sync = 4;
        }
        next(err);
      });
      if (sync === 1) {
        //async function
        sync = 2;
      }
      return;
    }
    if (sync === 4) {
      //Prevent "Maximum call stack size exceeded"
      return process.nextTick(function () {
        fn(next);
      });
    }
    //do a sync call as the callback is going to call on a future tick
    fn(next);
  }
}

exports.adaptNamedParamsPrepared = adaptNamedParamsPrepared;
exports.adaptNamedParamsWithHints = adaptNamedParamsWithHints;
exports.allocBuffer = allocBuffer;
exports.allocBufferUnsafe = allocBufferUnsafe;
exports.allocBufferFromArray = allocBufferFromArray;
exports.allocBufferFromString = allocBufferFromString;
exports.arrayIterator = arrayIterator;
exports.binarySearch = binarySearch;
exports.bindDomain = bindDomain;
exports.copyBuffer = copyBuffer;
exports.deepExtend = deepExtend;
exports.each = each;
exports.eachSeries = eachSeries;
/** @const */
exports.emptyArray = Object.freeze([]);
/** @const */
exports.emptyObject = emptyObject;
exports.extend = extend;
exports.fixStack = fixStack;
exports.forEachOf = forEachOf;
exports.funcCompare = funcCompare;
exports.insertSorted = insertSorted;
exports.iteratorToArray = iteratorToArray;
exports.log = log;
exports.map = map;
exports.mapSeries = mapSeries;
exports.maxInt = maxInt;
exports.noop = noop;
exports.objectValues = objectValues;
exports.parallel = parallel;
exports.promiseWrapper = promiseWrapper;
exports.propCompare = propCompare;
exports.series = series;
exports.stringRepeat = stringRepeat;
exports.times = times;
exports.timesLimit = timesLimit;
exports.timesSeries = timesSeries;
exports.totalLength = totalLength;
exports.whilst = whilst;
exports.HashSet = HashSet;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var errors = __webpack_require__(3);
var TimeUuid = __webpack_require__(30);
var Uuid = __webpack_require__(11);
var protocolVersion = __webpack_require__(31);
var utils = __webpack_require__(1);

/** @module types */
/**
 * Long constructor, wrapper of the internal library used: {@link https://github.com/dcodeIO/long.js Long.js}.
 * @constructor
 */
var Long = __webpack_require__(6);


/**
 * Consistency levels
 * @type {Object}
 * @property {Number} any Writing: A write must be written to at least one node. If all replica nodes for the given row key are down, the write can still succeed after a hinted handoff has been written. If all replica nodes are down at write time, an ANY write is not readable until the replica nodes for that row have recovered.
 * @property {Number} one Returns a response from the closest replica, as determined by the snitch.
 * @property {Number} two Returns the most recent data from two of the closest replicas.
 * @property {Number} three Returns the most recent data from three of the closest replicas.
 * @property {Number} quorum Reading: Returns the record with the most recent timestamp after a quorum of replicas has responded regardless of data center. Writing: A write must be written to the commit log and memory table on a quorum of replica nodes.
 * @property {Number} all Reading: Returns the record with the most recent timestamp after all replicas have responded. The read operation will fail if a replica does not respond. Writing: A write must be written to the commit log and memory table on all replica nodes in the cluster for that row.
 * @property {Number} localQuorum Reading: Returns the record with the most recent timestamp once a quorum of replicas in the current data center as the coordinator node has reported. Writing: A write must be written to the commit log and memory table on a quorum of replica nodes in the same data center as the coordinator node. Avoids latency of inter-data center communication.
 * @property {Number} eachQuorum Reading: Returns the record once a quorum of replicas in each data center of the cluster has responded. Writing: Strong consistency. A write must be written to the commit log and memtable on a quorum of replica nodes in all data centers.
 * @property {Number} serial Achieves linearizable consistency for lightweight transactions by preventing unconditional updates.
 * @property {Number} localSerial Same as serial but confined to the data center. A write must be written conditionally to the commit log and memtable on a quorum of replica nodes in the same data center.
 * @property {Number} localOne Similar to One but only within the DC the coordinator is in.
 */
var consistencies = {
  any:          0x00,
  one:          0x01,
  two:          0x02,
  three:        0x03,
  quorum:       0x04,
  all:          0x05,
  localQuorum:  0x06,
  eachQuorum:   0x07,
  serial:       0x08,
  localSerial:  0x09,
  localOne:     0x0a
};

/**
 * CQL data types
 * @type {Object}
 * @property {Number} custom A custom type.
 * @property {Number} ascii ASCII character string.
 * @property {Number} bigint 64-bit signed long.
 * @property {Number} blob Arbitrary bytes (no validation).
 * @property {Number} boolean true or false.
 * @property {Number} counter Counter column (64-bit signed value).
 * @property {Number} decimal Variable-precision decimal.
 * @property {Number} double 64-bit IEEE-754 floating point.
 * @property {Number} float 32-bit IEEE-754 floating point.
 * @property {Number} int 32-bit signed integer.
 * @property {Number} text UTF8 encoded string.
 * @property {Number} timestamp A timestamp.
 * @property {Number} uuid Type 1 or type 4 UUID.
 * @property {Number} varchar UTF8 encoded string.
 * @property {Number} varint Arbitrary-precision integer.
 * @property {Number} timeuuid  Type 1 UUID.
 * @property {Number} inet An IP address. It can be either 4 bytes long (IPv4) or 16 bytes long (IPv6).
 * @property {Number} date A date without a time-zone in the ISO-8601 calendar system.
 * @property {Number} time A value representing the time portion of the day.
 * @property {Number} smallint 16-bit two's complement integer.
 * @property {Number} tinyint 8-bit two's complement integer.
 * @property {Number} list A collection of elements.
 * @property {Number} map Key/value pairs.
 * @property {Number} set A collection that contains no duplicate elements.
 * @property {Number} udt User-defined type.
 * @property {Number} tuple A sequence of values.
 */
var dataTypes = {
  custom:     0x0000,
  ascii:      0x0001,
  bigint:     0x0002,
  blob:       0x0003,
  boolean:    0x0004,
  counter:    0x0005,
  decimal:    0x0006,
  double:     0x0007,
  float:      0x0008,
  int:        0x0009,
  text:       0x000a,
  timestamp:  0x000b,
  uuid:       0x000c,
  varchar:    0x000d,
  varint:     0x000e,
  timeuuid:   0x000f,
  inet:       0x0010,
  date:       0x0011,
  time:       0x0012,
  smallint:   0x0013,
  tinyint:    0x0014,
  list:       0x0020,
  map:        0x0021,
  set:        0x0022,
  udt:        0x0030,
  tuple:      0x0031,
  /**
   * Returns the typeInfo of a given type name
   * @param name
   * @returns {{code: number, info: *|Object}}
   */
  getByName:  function(name) {
    name = name.toLowerCase();
    if (name.indexOf('<') > 0) {
      var listMatches = /^(list|set)<(.+)>$/.exec(name);
      if (listMatches) {
        return { code: this[listMatches[1]], info: this.getByName(listMatches[2])};
      }
      var mapMatches = /^(map)< *(.+) *, *(.+)>$/.exec(name);
      if (mapMatches) {
        return { code: this[mapMatches[1]], info: [this.getByName(mapMatches[2]), this.getByName(mapMatches[3])]};
      }
      var udtMatches = /^(udt)<(.+)>$/.exec(name);
      if (udtMatches) {
        //udt name as raw string
        return { code: this[udtMatches[1]], info: udtMatches[2]};
      }
      var tupleMatches = /^(tuple)<(.+)>$/.exec(name);
      if (tupleMatches) {
        //tuple info as an array of types
        return { code: this[tupleMatches[1]], info: tupleMatches[2].split(',').map(function (x) {
          return this.getByName(x.trim());
        }, this)};
      }
    }
    var typeInfo = { code: this[name], info: null};
    if (typeof typeInfo.code !== 'number') {
      throw new TypeError('Data type with name ' + name + ' not valid');
    }
    return typeInfo;
  }
};

/**
 * Map of Data types by code
 * @internal
 * @private
 */
var _dataTypesByCode = (function () {
  var result = {};
  for (var key in dataTypes) {
    if (!dataTypes.hasOwnProperty(key)) {
      continue;
    }
    var val = dataTypes[key];
    if (typeof val !== 'number') {
      continue;
    }
    result[val] = key;
  }
  return result;
})();

/**
 * Represents the distance of Cassandra node as assigned by a LoadBalancingPolicy relatively to the driver instance.
 * @type {Object}
 * @property {Number} local A local node.
 * @property {Number} remote A remote node.
 * @property {Number} ignored A node that is meant to be ignored.
 */
var distance = {
  local:    0,
  remote:   1,
  ignored:  2
};

/**
 * An integer byte that distinguish the actual message from and to Cassandra
 * @internal
 * @ignore
 */
var opcodes = {
  error:          0x00,
  startup:        0x01,
  ready:          0x02,
  authenticate:   0x03,
  credentials:    0x04,
  options:        0x05,
  supported:      0x06,
  query:          0x07,
  result:         0x08,
  prepare:        0x09,
  execute:        0x0a,
  register:       0x0b,
  event:          0x0c,
  batch:          0x0d,
  authChallenge:  0x0e,
  authResponse:   0x0f,
  authSuccess:    0x10,

  /**
   * Determines if the code is a valid opcode
   */
  isInRange: function (code) {
    return code > this.error && code > this.event;
  }
};

/**
 * Event types from Cassandra
 * @type {{topologyChange: string, statusChange: string, schemaChange: string}}
 * @internal
 * @ignore
 */
var protocolEvents = {
  topologyChange: 'TOPOLOGY_CHANGE',
  statusChange: 'STATUS_CHANGE',
  schemaChange: 'SCHEMA_CHANGE'
};

/**
 * Server error codes returned by Cassandra
 */
var responseErrorCodes = {
  serverError:            0x0000,
  protocolError:          0x000A,
  badCredentials:         0x0100,
  unavailableException:   0x1000,
  overloaded:             0x1001,
  isBootstrapping:        0x1002,
  truncateError:          0x1003,
  writeTimeout:           0x1100,
  readTimeout:            0x1200,
  readFailure:            0x1300,
  functionFailure:        0x1400,
  writeFailure:           0x1500,
  syntaxError:            0x2000,
  unauthorized:           0x2100,
  invalid:                0x2200,
  configError:            0x2300,
  alreadyExists:          0x2400,
  unprepared:             0x2500
};

/**
 * Type of result included in a response
 * @internal
 * @ignore
 */
var resultKind = {
  voidResult:      0x0001,
  rows:            0x0002,
  setKeyspace:     0x0003,
  prepared:        0x0004,
  schemaChange:    0x0005
};

/**
 * Message frame flags
 * @internal
 * @ignore
 */
var frameFlags = {
  compression:    0x01,
  tracing:        0x02,
  customPayload:  0x04,
  warning:        0x08
};

/**
 * Unset representation.
 * <p>
 *   Use this field if you want to set a parameter to <code>unset</code>. Valid for Cassandra 2.2 and above.
 * </p>
 */
var unset = Object.freeze({'unset': true});

/**
 * A long representing the value 1000
 * @const
 * @private
 */
var _longOneThousand = Long.fromInt(1000);

/**
 * Counter used to generate up to 1000 different timestamp values with the same Date
 * @private
 */
var _timestampTicks = 0;

/**
 * <p><strong>Backward compatibility only, use [TimeUuid]{@link module:types~TimeUuid} instead</strong>.</p>
 * Generates and returns a RFC4122 v1 (timestamp based) UUID in a string representation.
 * @param {{msecs, node, clockseq, nsecs}} [options]
 * @param {Buffer} [buffer]
 * @param {Number} [offset]
 * @deprecated Use [TimeUuid]{@link module:types~TimeUuid} instead
 */
function timeuuid(options, buffer, offset) {
  var date;
  var ticks;
  var nodeId;
  var clockId;
  if (options) {
    if (typeof options.msecs === 'number') {
      date = new Date(options.msecs);
    }
    if (options.msecs instanceof Date) {
      date = options.msecs;
    }
    if (util.isArray(options.node)) {
      nodeId = utils.allocBufferFromArray(options.node);
    }
    if (typeof options.clockseq === 'number') {
      clockId = utils.allocBufferUnsafe(2);
      clockId.writeUInt16BE(options.clockseq, 0);
    }
    if (typeof options.nsecs === 'number') {
      ticks = options.nsecs;
    }
  }
  var uuid = new TimeUuid(date, ticks, nodeId, clockId);
  if (buffer instanceof Buffer) {
    //copy the values into the buffer
    uuid.getBuffer().copy(buffer, offset || 0);
    return buffer;
  }
  return uuid.toString();
}

/**
 * <p><strong>Backward compatibility only, use [Uuid]{@link module:types~Uuid} class instead</strong>.</p>
 * Generate and return a RFC4122 v4 UUID in a string representation.
 * @deprecated Use [Uuid]{@link module:types~Uuid} class instead
 */
function uuid(options, buffer, offset) {
  var uuid;
  if (options) {
    if (util.isArray(options.random)) {
      uuid = new Uuid(utils.allocBufferFromArray(options.random));
    }
  }
  if (!uuid) {
    uuid = Uuid.random();
  }
  if (buffer instanceof Buffer) {
    //copy the values into the buffer
    uuid.getBuffer().copy(buffer, offset || 0);
    return buffer;
  }
  return uuid.toString();
}

/**
 * Gets the data type name for a given type definition
 * @internal
 * @ignore
 * @throws {ArgumentError}
 */
function getDataTypeNameByCode(item) {
  if (!item || typeof item.code !== 'number') {
    throw new errors.ArgumentError('Invalid signature type definition');
  }
  var typeName = _dataTypesByCode[item.code];
  if (!typeName) {
    throw new errors.ArgumentError(util.format('Type with code %d not found', item.code));
  }
  if (!item.info) {
    return typeName;
  }
  if (util.isArray(item.info)) {
    return (typeName +
      '<' +
      item.info.map(function (t) {
        return getDataTypeNameByCode(t);
      }).join(', ') +
      '>');
  }
  if (typeof item.info.code === 'number') {
    return typeName + '<' + getDataTypeNameByCode(item.info) + '>';
  }
  return typeName;
}

//classes

/**
 * Represents a frame header that could be used to read from a Buffer or to write to a Buffer
 * @ignore
 * @param {Number} version Protocol version
 * @param {Number} flags
 * @param {Number} streamId
 * @param {Number} opcode
 * @param {Number} bodyLength
 * @constructor
 */
function FrameHeader(version, flags, streamId, opcode, bodyLength) {
  this.version = version;
  this.flags = flags;
  this.streamId = streamId;
  this.opcode = opcode;
  this.bodyLength = bodyLength;
}

/**
 * The length of the header of the frame based on the protocol version
 * @returns {Number}
 */
FrameHeader.size = function (version) {
  if (protocolVersion.uses2BytesStreamIds(version)) {
    return 9;
  }
  return 8;
};

/**
 * Gets the protocol version based on the first byte of the header
 * @param {Buffer} buffer
 * @returns {Number}
 */
FrameHeader.getProtocolVersion = function (buffer) {
  return buffer[0] & 0x7F;
};

/**
 * @param {Buffer} buf
 * @param {Number} [offset]
 * @returns {FrameHeader}
 */
FrameHeader.fromBuffer = function (buf, offset) {
  var streamId = 0;
  if (!offset) {
    offset = 0;
  }
  var version = buf[offset++] & 0x7F;
  var flags = buf.readUInt8(offset++);
  if (!protocolVersion.uses2BytesStreamIds(version)) {
    streamId = buf.readInt8(offset++);
  }
  else {
    streamId = buf.readInt16BE(offset);
    offset += 2;
  }
  return new FrameHeader(version, flags, streamId, buf.readUInt8(offset++), buf.readUInt32BE(offset));
};

/** @returns {Buffer} */
FrameHeader.prototype.toBuffer = function () {
  var buf = utils.allocBufferUnsafe(FrameHeader.size(this.version));
  buf.writeUInt8(this.version, 0);
  buf.writeUInt8(this.flags, 1);
  var offset = 3;
  if (!protocolVersion.uses2BytesStreamIds(this.version)) {
    buf.writeInt8(this.streamId, 2);
  }
  else {
    buf.writeInt16BE(this.streamId, 2);
    offset = 4;
  }
  buf.writeUInt8(this.opcode, offset++);
  buf.writeUInt32BE(this.bodyLength, offset);
  return buf;
};
/**
 * Returns a long representation.
 * Used internally for deserialization
 */
Long.fromBuffer = function (value) {
  if (!(value instanceof Buffer)) {
    throw new TypeError('Expected Buffer, obtained ' + util.inspect(value));
  }
  return new Long(value.readInt32BE(4), value.readInt32BE(0));
};

/**
 * Returns a big-endian buffer representation of the Long instance
 * @param {Long} value
 */
Long.toBuffer = function (value) {
  if (!(value instanceof Long)) {
    throw new TypeError('Expected Long, obtained ' + util.inspect(value));
  }
  var buffer = utils.allocBufferUnsafe(8);
  buffer.writeUInt32BE(value.getHighBitsUnsigned(), 0);
  buffer.writeUInt32BE(value.getLowBitsUnsigned(), 4);
  return buffer;
};

//noinspection JSUnresolvedVariable
/**
 * Provide the name of the constructor and the string representation
 * @returns {string}
 */
Long.prototype.inspect = function () {
  return 'Long: ' + this.toString();
};

//noinspection JSUnresolvedVariable
/**
 * Returns the string representation.
 * Method used by the native JSON.stringify() to serialize this instance
 */
Long.prototype.toJSON = function () {
  return this.toString();
};

/**
 * Generates a value representing the timestamp for the query in microseconds based on the date and the microseconds provided
 * @param {Date} [date] The date to generate the value, if not provided it will use the current date.
 * @param {Number} [microseconds] A number from 0 to 999 used to build the microseconds part of the date.
 * @returns {Long}
 */
function generateTimestamp(date, microseconds) {
  if (!date) {
    date = new Date();
  }
  //noinspection JSUnresolvedVariable
  var longMicro = Long.ZERO;
  if (typeof microseconds === 'number' && microseconds >= 0 && microseconds < 1000) {
    longMicro = Long.fromInt(microseconds);
  }
  else {
    if (_timestampTicks > 999) {
      _timestampTicks = 0;
    }
    longMicro = Long.fromInt(_timestampTicks);
    _timestampTicks++;
  }
  return Long
    .fromNumber(date.getTime())
    .multiply(_longOneThousand)
    .add(longMicro);
}

//error classes

/** @private */
function QueryParserError(e) {
  QueryParserError.super_.call(this, e.message, this.constructor);
  this.internalError = e;
}
util.inherits(QueryParserError, errors.DriverError);

/** @private */
function TimeoutError (message) {
  TimeoutError.super_.call(this, message, this.constructor);
  this.info = 'Represents an error that happens when the maximum amount of time for an operation passed.';
}
util.inherits(TimeoutError, errors.DriverError);

exports.opcodes = opcodes;
exports.consistencies = consistencies;
exports.dataTypes = dataTypes;
exports.getDataTypeNameByCode = getDataTypeNameByCode;
exports.distance = distance;
exports.frameFlags = frameFlags;
exports.protocolEvents = protocolEvents;
exports.protocolVersion = protocolVersion;
exports.responseErrorCodes = responseErrorCodes;
exports.resultKind = resultKind;
exports.timeuuid = timeuuid;
exports.uuid = uuid;
exports.BigDecimal = __webpack_require__(32);
exports.Duration = __webpack_require__(33);
exports.FrameHeader = FrameHeader;
exports.InetAddress = __webpack_require__(34);
exports.Integer = __webpack_require__(12);
exports.LocalDate = __webpack_require__(35);
exports.LocalTime = __webpack_require__(36);
exports.Long = Long;
exports.ResultSet = __webpack_require__(37);
exports.ResultStream = __webpack_require__(38);
exports.Row = __webpack_require__(39);
//export DriverError for backward-compatibility
exports.DriverError = errors.DriverError;
exports.TimeoutError = TimeoutError;
exports.TimeUuid = TimeUuid;
exports.Tuple = __webpack_require__(40);
exports.Uuid = Uuid;
exports.unset = unset;
exports.generateTimestamp = generateTimestamp;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
/**
 * Contains the error classes exposed by the driver.
 * @module errors
 */
/**
 * Base Error
 * @private
 */
function DriverError (message, constructor) {
  if (constructor) {
    this.name = constructor.name;
    this.stack = (new Error(message)).stack;
  }
  this.message = message || 'Error';
  this.info = 'Cassandra Driver Error';
}
util.inherits(DriverError, Error);
/**
 * Represents an error when a query cannot be performed because no host is available or could be reached by the driver.
 * @param {Object} innerErrors An object map containing the error per host tried
 * @param {String} [message]
 * @constructor
 */
function NoHostAvailableError(innerErrors, message) {
  this.innerErrors = innerErrors;
  this.info = 'Represents an error when a query cannot be performed because no host is available or could be reached by the driver.';
  this.message = message;
  if (!message) {
    this.message = 'All host(s) tried for query failed.';
    if (innerErrors) {
      var hostList = Object.keys(innerErrors);
      if (hostList.length > 0) {
        var host = hostList[0];
        this.message += util.format(' First host tried, %s: %s. See innerErrors.', host, innerErrors[host]);
      }
    }
  }
}

util.inherits(NoHostAvailableError, DriverError);

/**
 * Represents an error message from the server
 * @param {Number} code Cassandra exception code
 * @param {String} message
 * @constructor
 */
function ResponseError(code, message) {
  ResponseError.super_.call(this, message, this.constructor);
  /**
   * The error code as defined in [responseErrorCodes]{@link module:types~responseErrorCodes}.
   * @type {Number}
   */
  this.code = code;
  this.info = 'Represents an error message from the server';
}

util.inherits(ResponseError, DriverError);

/**
 * Represents a bug inside the driver or in a Cassandra host.
 * @param {String} message
 * @constructor
 */
function DriverInternalError(message) {
  DriverInternalError.super_.call(this, message, this.constructor);
  this.info = 'Represents a bug inside the driver or in a Cassandra host.';
}

util.inherits(DriverInternalError, DriverError);

/**
 * Represents an error when trying to authenticate with auth-enabled host
 * @param {String} message
 * @constructor
 */
function AuthenticationError(message) {
  AuthenticationError.super_.call(this, message, this.constructor);
  this.info = 'Represents an authentication error from the driver or from a Cassandra node.';
}

util.inherits(AuthenticationError, DriverError);

/**
 * Represents an error that is raised when one of the arguments provided to a method is not valid
 * @param {String} message
 * @constructor
 */
function ArgumentError(message) {
  ArgumentError.super_.call(this, message, this.constructor);
  this.info = 'Represents an error that is raised when one of the arguments provided to a method is not valid.';
}

util.inherits(ArgumentError, DriverError);

/**
 * Represents a client-side error that is raised when the client didn't hear back from the server within
 * {@link ClientOptions.socketOptions.readTimeout}.
 * @constructor
 */
function OperationTimedOutError(message) {
  OperationTimedOutError.super_.call(this, message, this.constructor);
  this.info = 'Represents a client-side error that is raised when the client did not hear back from the server ' +
    'within socketOptions.readTimeout';
}

util.inherits(OperationTimedOutError, DriverError);

/**
 * Represents an error that is raised when a feature is not supported in the driver or in the current Cassandra version.
 * @param message
 * @constructor
 */
function NotSupportedError(message) {
  NotSupportedError.super_.call(this, message, this.constructor);
  this.info = 'Represents a feature that is not supported in the driver or in the Cassandra version.';
}

util.inherits(NotSupportedError, DriverError);

exports.ArgumentError = ArgumentError;
exports.AuthenticationError = AuthenticationError;
exports.DriverError = DriverError;
exports.OperationTimedOutError = OperationTimedOutError;
exports.DriverInternalError = DriverInternalError;
exports.NoHostAvailableError = NoHostAvailableError;
exports.NotSupportedError = NotSupportedError;
exports.ResponseError = ResponseError;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var FrameWriter = __webpack_require__(18).FrameWriter;
var types = __webpack_require__(2);
var utils = __webpack_require__(1);

/**
 * Options for the execution of the query / prepared statement
 * @private
 */
var queryFlag = {
  values:                 0x01,
  skipMetadata:           0x02,
  pageSize:               0x04,
  withPagingState:        0x08,
  withSerialConsistency:  0x10,
  withDefaultTimestamp:   0x20,
  withNameForValues:      0x40
};

/**
 * Options for the executing of a batch request from protocol v3 and above
 * @private
 */
var batchFlag = {
  withSerialConsistency:  0x10,
  withDefaultTimestamp:   0x20,
  withNameForValues:      0x40
};

/**
 * Abstract class Request
 * @constructor
 */
function Request() {

}

/**
 * @abstract
 * @param {Encoder} encoder
 * @param {Number} streamId
 * @throws {TypeError}
 * @returns {Buffer}
 */
Request.prototype.write = function (encoder, streamId) {
  throw new Error('Method must be implemented');
};

/**
 * Creates a new instance using the same constructor as the current instance, copying the properties.
 * @return {Request}
 */
Request.prototype.clone = function () {
  var newRequest = new (this.constructor)();
  var keysArray = Object.keys(this);
  for (var i = 0; i < keysArray.length; i++) {
    var key = keysArray[i];
    newRequest[key] = this[key];
  }
  return newRequest;
};

/**
 * Writes a execute query (given a prepared queryId)
 * @param {String} query
 * @param {Buffer} queryId
 * @param {Array} params
 * @param options
 */
function ExecuteRequest(query, queryId, params, options) {
  this.query = query;
  this.queryId = queryId;
  this.params = params;
  this.setOptions(options);
}

util.inherits(ExecuteRequest, Request);

ExecuteRequest.prototype.write = function (encoder, streamId) {
  //v1: <queryId>
  //      <n><value_1>....<value_n><consistency>
  //v2: <queryId>
  //      <consistency><flags>[<n><value_1>...<value_n>][<result_page_size>][<paging_state>][<serial_consistency>]
  //v3: <queryId>
  //      <consistency><flags>[<n>[name_1]<value_1>...[name_n]<value_n>][<result_page_size>][<paging_state>][<serial_consistency>][<timestamp>]
  var frameWriter = new FrameWriter(types.opcodes.execute);
  var headerFlags = this.options.traceQuery ? types.frameFlags.tracing : 0;
  if (this.options.customPayload) {
    //The body may contain the custom payload
    headerFlags |= types.frameFlags.customPayload;
    frameWriter.writeCustomPayload(this.options.customPayload);
  }
  frameWriter.writeShortBytes(this.queryId);
  this.writeQueryParameters(frameWriter, encoder);
  return frameWriter.write(encoder.protocolVersion, streamId, headerFlags);
};

/**
 * Writes v1 and v2 execute query parameters
 * @param {FrameWriter} frameWriter
 * @param {Encoder} encoder
 */
ExecuteRequest.prototype.writeQueryParameters = function (frameWriter, encoder) {
  //v1: <n><value_1>....<value_n><consistency>
  //v2: <consistency><flags>[<n><value_1>...<value_n>][<result_page_size>][<paging_state>][<serial_consistency>]
  //v3: <consistency><flags>[<n>[name_1]<value_1>...[name_n]<value_n>][<result_page_size>][<paging_state>][<serial_consistency>][<timestamp>]
  var flags = 0;
  if (types.protocolVersion.supportsPaging(encoder.protocolVersion)) {
    flags |= (this.params && this.params.length) ? queryFlag.values : 0;
    flags |= (this.options.fetchSize > 0) ? queryFlag.pageSize : 0;
    flags |= this.options.pageState ? queryFlag.withPagingState : 0;
    flags |= this.options.serialConsistency ? queryFlag.withSerialConsistency : 0;
    flags |= this.options.timestamp ? queryFlag.withDefaultTimestamp : 0;
    flags |= this.options.namedParameters ? queryFlag.withNameForValues : 0;
    frameWriter.writeShort(this.consistency);
    frameWriter.writeByte(flags);
  }
  if (this.params && this.params.length) {
    frameWriter.writeShort(this.params.length);
    for (var i = 0; i < this.params.length; i++) {
      var paramValue = this.params[i];
      if (flags & queryFlag.withNameForValues) {
        //parameter is composed by name / value
        frameWriter.writeString(paramValue.name);
        paramValue = paramValue.value;
      }
      frameWriter.writeBytes(encoder.encode(paramValue, this.hints[i]));
    }
  }
  if (!types.protocolVersion.supportsPaging(encoder.protocolVersion)) {
    if (!this.params || !this.params.length) {
      //zero parameters
      frameWriter.writeShort(0);
    }
    frameWriter.writeShort(this.consistency);
    return;
  }
  if (flags & queryFlag.pageSize) {
    frameWriter.writeInt(this.options.fetchSize);
  }
  if (flags & queryFlag.withPagingState) {
    frameWriter.writeBytes(this.options.pageState);
  }
  if (flags & queryFlag.withSerialConsistency) {
    frameWriter.writeShort(this.options.serialConsistency);
  }
  if (flags & queryFlag.withDefaultTimestamp) {
    var timestamp = this.options.timestamp;
    if (typeof timestamp === 'number') {
      timestamp = types.Long.fromNumber(timestamp);
    }
    frameWriter.writeLong(timestamp);
  }
};

ExecuteRequest.prototype.setOptions = function (options) {
  this.options = options || utils.emptyObject;
  this.consistency = this.options.consistency || types.consistencies.one;
  this.hints = this.options.hints || utils.emptyArray;
};

function QueryRequest(query, params, options) {
  this.query = query;
  this.params = params;
  this.setOptions(options);
}

util.inherits(QueryRequest, ExecuteRequest);

QueryRequest.prototype.write = function (encoder, streamId) {
  //v1: <query><consistency>
  //v2: <query>
  //      <consistency><flags>[<n><value_1>...<value_n>][<result_page_size>][<paging_state>][<serial_consistency>]
  //v3: <query>
  //      <consistency><flags>[<n>[name_1]<value_1>...[name_n]<value_n>][<result_page_size>][<paging_state>][<serial_consistency>][<timestamp>]
  var frameWriter = new FrameWriter(types.opcodes.query);
  var headerFlags = this.options.traceQuery ? types.frameFlags.tracing : 0;
  if (this.options.customPayload) {
    //The body may contain the custom payload
    headerFlags |= types.frameFlags.customPayload;
    frameWriter.writeCustomPayload(this.options.customPayload);
  }
  frameWriter.writeLString(this.query);
  if (!types.protocolVersion.supportsPaging(encoder.protocolVersion)) {
    frameWriter.writeShort(this.consistency);
  }
  else {
    //Use the same fields as the execute writer
    this.writeQueryParameters(frameWriter, encoder);
  }
  return frameWriter.write(encoder.protocolVersion, streamId, headerFlags);
};

function PrepareRequest(query) {
  this.query = query;
}

util.inherits(PrepareRequest, Request);

PrepareRequest.prototype.write = function (encoder, streamId) {
  var frameWriter = new FrameWriter(types.opcodes.prepare);
  frameWriter.writeLString(this.query);
  return frameWriter.write(encoder.protocolVersion, streamId);
};

function StartupRequest(cqlVersion) {
  this.cqlVersion = cqlVersion || '3.0.0';
}

util.inherits(StartupRequest, Request);

StartupRequest.prototype.write = function (encoder, streamId) {
  var frameWriter = new FrameWriter(types.opcodes.startup);
  frameWriter.writeStringMap({
    CQL_VERSION: this.cqlVersion
  });
  return frameWriter.write(encoder.protocolVersion, streamId);
};

function RegisterRequest(events) {
  this.events = events;
}

util.inherits(RegisterRequest, Request);

RegisterRequest.prototype.write = function (encoder, streamId) {
  var frameWriter = new FrameWriter(types.opcodes.register);
  frameWriter.writeStringList(this.events);
  return frameWriter.write(encoder.protocolVersion, streamId);
};

/**
 * Represents an AUTH_RESPONSE request
 * @param {Buffer} token
 * @constructor
 */
function AuthResponseRequest(token) {
  this.token = token;
}

util.inherits(AuthResponseRequest, Request);

AuthResponseRequest.prototype.write = function (encoder, streamId) {
  var frameWriter = new FrameWriter(types.opcodes.authResponse);
  frameWriter.writeBytes(this.token);
  return frameWriter.write(encoder.protocolVersion, streamId);
};

/**
 * Represents a protocol v1 CREDENTIALS request message
 * @constructor
 */
function CredentialsRequest(username, password) {
  this.username = username;
  this.password = password;
}

util.inherits(CredentialsRequest, Request);

CredentialsRequest.prototype.write = function (encoder, streamId) {
  var frameWriter = new FrameWriter(types.opcodes.credentials);
  frameWriter.writeStringMap({ username:this.username, password:this.password });
  return frameWriter.write(encoder.protocolVersion, streamId);
};

/**
 * Writes a batch request
 * @param {Array.<{query, params, [info]}>} queries Array of objects with the properties query and params
 * @param {QueryOptions} options
 * @constructor
 */
function BatchRequest(queries, options) {
  this.queries = queries;
  /** @type {QueryOptions} */
  this.options = options;
  this.type = options.logged ? 0 : 1;
  this.type = options.counter ? 2 : this.type;
  this.hints = options.hints || utils.emptyArray;
}

util.inherits(BatchRequest, Request);

BatchRequest.prototype.write = function (encoder, streamId) {
  //v2: <type><n><query_1>...<query_n><consistency>
  //v3: <type><n><query_1>...<query_n><consistency><flags>[<serial_consistency>][<timestamp>]
  if (!this.queries || !(this.queries.length > 0)) {
    throw new TypeError(util.format('Invalid queries provided %s', this.queries));
  }
  var frameWriter = new FrameWriter(types.opcodes.batch);
  var headerFlags = this.options.traceQuery ? types.frameFlags.tracing : 0;
  if (this.options.customPayload) {
    //The body may contain the custom payload
    headerFlags |= types.frameFlags.customPayload;
    frameWriter.writeCustomPayload(this.options.customPayload);
  }
  frameWriter.writeByte(this.type);
  frameWriter.writeShort(this.queries.length);
  var self = this;
  this.queries.forEach(function eachQuery(item, i) {
    var hints = self.hints[i];
    var params = item.params || utils.emptyArray;
    if (item.queryId) {
      // Contains prepared queries
      frameWriter.writeByte(1);
      frameWriter.writeShortBytes(item.queryId);
      hints = item.meta.columns.map(function (c) { return c.type; });
      var paramsInfo = utils.adaptNamedParamsPrepared(params, item.meta.columns);
      params = paramsInfo.params;
    }
    else {
      // Contains string queries
      frameWriter.writeByte(0);
      frameWriter.writeLString(item.query);
    }
    frameWriter.writeShort(params.length);
    params.forEach(function (param, paramIndex) {
      frameWriter.writeBytes(encoder.encode(param, hints ? hints[paramIndex] : null));
    });
  }, this);
  frameWriter.writeShort(this.options.consistency);
  if (types.protocolVersion.supportsTimestamp(encoder.protocolVersion)) {
    //Batch flags
    var flags = this.options.serialConsistency ? batchFlag.withSerialConsistency : 0;
    flags |= this.options.timestamp ? batchFlag.withDefaultTimestamp : 0;
    frameWriter.writeByte(flags);
    if (this.options.serialConsistency) {
      frameWriter.writeShort(this.options.serialConsistency);
    }
    if (this.options.timestamp) {
      var timestamp = this.options.timestamp;
      if (typeof timestamp === 'number') {
        timestamp = types.Long.fromNumber(timestamp);
      }
      frameWriter.writeLong(timestamp);
    }
  }
  return frameWriter.write(encoder.protocolVersion, streamId, headerFlags);
};

BatchRequest.prototype.clone = function () {
  return new BatchRequest(this.queries, this.options);
};

exports.AuthResponseRequest = AuthResponseRequest;
exports.BatchRequest = BatchRequest;
exports.CredentialsRequest = CredentialsRequest;
exports.ExecuteRequest = ExecuteRequest;
exports.PrepareRequest = PrepareRequest;
exports.QueryRequest = QueryRequest;
exports.Request = Request;
exports.RegisterRequest = RegisterRequest;
exports.StartupRequest = StartupRequest;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license Long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/Long.js for details
 */
(function(global, factory) {

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* CommonJS */ else if (typeof require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

})(this, function() {
    "use strict";

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    function Long(low, high, unsigned) {

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         * @expose
         */
        this.low = low|0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         * @expose
         */
        this.high = high|0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         * @expose
         */
        this.unsigned = !!unsigned;
    }

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @expose
     * @private
     */
    Long.__isLong__;

    Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
     * Tests if the specified object is a Long.
     * @param {*} obj Object
     * @returns {boolean}
     * @expose
     */
    Long.isLong = function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
    };

    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromInt = function fromInt(value, unsigned) {
        var obj, cachedObj;
        if (!unsigned) {
            value = value | 0;
            if (-128 <= value && value < 128) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = new Long(value, value < 0 ? -1 : 0, false);
            if (-128 <= value && value < 128)
                INT_CACHE[value] = obj;
            return obj;
        } else {
            value = value >>> 0;
            if (0 <= value && value < 256) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = new Long(value, (value | 0) < 0 ? -1 : 0, true);
            if (0 <= value && value < 256)
                UINT_CACHE[value] = obj;
            return obj;
        }
    };

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromNumber = function fromNumber(value, unsigned) {
        unsigned = !!unsigned;
        if (isNaN(value) || !isFinite(value))
            return Long.ZERO;
        if (!unsigned && value <= -TWO_PWR_63_DBL)
            return Long.MIN_VALUE;
        if (!unsigned && value + 1 >= TWO_PWR_63_DBL)
            return Long.MAX_VALUE;
        if (unsigned && value >= TWO_PWR_64_DBL)
            return Long.MAX_UNSIGNED_VALUE;
        if (value < 0)
            return Long.fromNumber(-value, unsigned).negate();
        return new Long((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    };

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromBits = function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    };

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromString = function fromString(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('number format error: empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return Long.ZERO;
        if (typeof unsigned === 'number') // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw Error('radix out of range: ' + radix);

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('number format error: interior "-" character: ' + str);
        else if (p === 0)
            return Long.fromString(str.substring(1), unsigned, radix).negate();

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Math.pow(radix, 8));

        var result = Long.ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i);
            var value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = Long.fromNumber(Math.pow(radix, size));
                result = result.multiply(power).add(Long.fromNumber(value));
            } else {
                result = result.multiply(radixToPower);
                result = result.add(Long.fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    };

    /**
     * Converts the specified value to a Long.
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     * @expose
     */
    Long.fromValue = function fromValue(val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === 'number')
            return Long.fromNumber(val);
        if (typeof val === 'string')
            return Long.fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return new Long(val.low, val.high, val.unsigned);
    };

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    var TWO_PWR_24 = Long.fromInt(TWO_PWR_24_DBL);

    /**
     * Signed zero.
     * @type {!Long}
     * @expose
     */
    Long.ZERO = Long.fromInt(0);

    /**
     * Unsigned zero.
     * @type {!Long}
     * @expose
     */
    Long.UZERO = Long.fromInt(0, true);

    /**
     * Signed one.
     * @type {!Long}
     * @expose
     */
    Long.ONE = Long.fromInt(1);

    /**
     * Unsigned one.
     * @type {!Long}
     * @expose
     */
    Long.UONE = Long.fromInt(1, true);

    /**
     * Signed negative one.
     * @type {!Long}
     * @expose
     */
    Long.NEG_ONE = Long.fromInt(-1);

    /**
     * Maximum signed value.
     * @type {!Long}
     * @expose
     */
    Long.MAX_VALUE = Long.fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     * @expose
     */
    Long.MAX_UNSIGNED_VALUE = Long.fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Minimum signed value.
     * @type {!Long}
     * @expose
     */
    Long.MIN_VALUE = Long.fromBits(0, 0x80000000|0, false);

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     * @expose
     */
    Long.prototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     * @expose
     */
    Long.prototype.toNumber = function toNumber() {
        if (this.unsigned) {
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        }
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     * @expose
     */
    Long.prototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix out of range: ' + radix);
        if (this.isZero())
            return '0';
        var rem;
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.equals(Long.MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = Long.fromNumber(radix);
                var div = this.divide(radixLong);
                rem = div.multiply(radixLong).subtract(this);
                return div.toString(radix) + rem.toInt().toString(radix);
            } else
                return '-' + this.negate().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Math.pow(radix, 6), this.unsigned);
        rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.divide(radixToPower),
                intval = rem.subtract(remDiv.multiply(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     * @expose
     */
    Long.prototype.getHighBits = function getHighBits() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     * @expose
     */
    Long.prototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     * @expose
     */
    Long.prototype.getLowBits = function getLowBits() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     * @expose
     */
    Long.prototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     * @expose
     */
    Long.prototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.equals(Long.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isEven = function isEven() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.equals = function equals(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.eq = Long.prototype.equals;

    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.notEquals = function notEquals(other) {
        return !this.equals(/* validates */ other);
    };

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.neq = Long.prototype.notEquals;

    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.lessThan = function lessThan(other) {
        return this.compare(/* validates */ other) < 0;
    };

    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.lt = Long.prototype.lessThan;

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.compare(/* validates */ other) <= 0;
    };

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.lte = Long.prototype.lessThanOrEqual;

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.greaterThan = function greaterThan(other) {
        return this.compare(/* validates */ other) > 0;
    };

    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.gt = Long.prototype.greaterThan;

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.compare(/* validates */ other) >= 0;
    };

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.gte = Long.prototype.greaterThanOrEqual;

    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     * @expose
     */
    Long.prototype.compare = function compare(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        if (this.equals(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.subtract(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     * @expose
     */
    Long.prototype.negate = function negate() {
        if (!this.unsigned && this.equals(Long.MIN_VALUE))
            return Long.MIN_VALUE;
        return this.not().add(Long.ONE);
    };

    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @function
     * @returns {!Long} Negated Long
     * @expose
     */
    Long.prototype.neg = Long.prototype.negate;

    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     * @expose
     */
    Long.prototype.add = function add(addend) {
        if (!Long.isLong(addend))
            addend = Long.fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     * @expose
     */
    Long.prototype.subtract = function subtract(subtrahend) {
        if (!Long.isLong(subtrahend))
            subtrahend = Long.fromValue(subtrahend);
        return this.add(subtrahend.negate());
    };

    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @function
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     * @expose
     */
    Long.prototype.sub = Long.prototype.subtract;

    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     * @expose
     */
    Long.prototype.multiply = function multiply(multiplier) {
        if (this.isZero())
            return Long.ZERO;
        if (!Long.isLong(multiplier))
            multiplier = Long.fromValue(multiplier);
        if (multiplier.isZero())
            return Long.ZERO;
        if (this.equals(Long.MIN_VALUE))
            return multiplier.isOdd() ? Long.MIN_VALUE : Long.ZERO;
        if (multiplier.equals(Long.MIN_VALUE))
            return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.negate().multiply(multiplier.negate());
            else
                return this.negate().multiply(multiplier).negate();
        } else if (multiplier.isNegative())
            return this.multiply(multiplier.negate()).negate();

        // If both longs are small, use float multiplication
        if (this.lessThan(TWO_PWR_24) && multiplier.lessThan(TWO_PWR_24))
            return Long.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @function
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     * @expose
     */
    Long.prototype.mul = Long.prototype.multiply;

    /**
     * Returns this Long divided by the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     * @expose
     */
    Long.prototype.divide = function divide(divisor) {
        if (!Long.isLong(divisor))
            divisor = Long.fromValue(divisor);
        if (divisor.isZero())
            throw(new Error('division by zero'));
        if (this.isZero())
            return this.unsigned ? Long.UZERO : Long.ZERO;
        var approx, rem, res;
        if (this.equals(Long.MIN_VALUE)) {
            if (divisor.equals(Long.ONE) || divisor.equals(Long.NEG_ONE))
                return Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.equals(Long.MIN_VALUE))
                return Long.ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shiftRight(1);
                approx = halfThis.divide(divisor).shiftLeft(1);
                if (approx.equals(Long.ZERO)) {
                    return divisor.isNegative() ? Long.ONE : Long.NEG_ONE;
                } else {
                    rem = this.subtract(divisor.multiply(approx));
                    res = approx.add(rem.divide(divisor));
                    return res;
                }
            }
        } else if (divisor.equals(Long.MIN_VALUE))
            return this.unsigned ? Long.UZERO : Long.ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.negate().divide(divisor.negate());
            return this.negate().divide(divisor).negate();
        } else if (divisor.isNegative())
            return this.divide(divisor.negate()).negate();

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        res = Long.ZERO;
        rem = this;
        while (rem.greaterThanOrEqual(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = Long.fromNumber(approx),
                approxRem = approxRes.multiply(divisor);
            while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
                approx -= delta;
                approxRes = Long.fromNumber(approx, this.unsigned);
                approxRem = approxRes.multiply(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = Long.ONE;

            res = res.add(approxRes);
            rem = rem.subtract(approxRem);
        }
        return res;
    };

    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     * @expose
     */
    Long.prototype.div = Long.prototype.divide;

    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     * @expose
     */
    Long.prototype.modulo = function modulo(divisor) {
        if (!Long.isLong(divisor))
            divisor = Long.fromValue(divisor);
        return this.subtract(this.divide(divisor).multiply(divisor));
    };

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     * @expose
     */
    Long.prototype.mod = Long.prototype.modulo;

    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     * @expose
     */
    Long.prototype.not = function not() {
        return Long.fromBits(~this.low, ~this.high, this.unsigned);
    };

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    Long.prototype.and = function and(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    Long.prototype.or = function or(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    Long.prototype.xor = function xor(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shiftLeft = function shiftLeft(numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return Long.fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shl = Long.prototype.shiftLeft;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shiftRight = function shiftRight(numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return Long.fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shr = Long.prototype.shiftRight;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return Long.fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            } else if (numBits === 32)
                return Long.fromBits(high, 0, this.unsigned);
            else
                return Long.fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shru = Long.prototype.shiftRightUnsigned;

    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     * @expose
     */
    Long.prototype.toSigned = function toSigned() {
        if (!this.unsigned)
            return this;
        return new Long(this.low, this.high, false);
    };

    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     * @expose
     */
    Long.prototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
            return this;
        return new Long(this.low, this.high, true);
    };

    return Long;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var policies = __webpack_require__(9);
var types = __webpack_require__(2);
var utils = __webpack_require__(1);
var errors = __webpack_require__(3);

/**
 * @returns {ClientOptions}
 */
function defaultOptions () {
  return ({
    policies: {
      addressResolution: policies.defaultAddressTranslator(),
      loadBalancing: policies.defaultLoadBalancingPolicy(),
      reconnection: policies.defaultReconnectionPolicy(),
      retry: policies.defaultRetryPolicy(),
      speculativeExecution: policies.defaultSpeculativeExecutionPolicy(),
      timestampGeneration: policies.defaultTimestampGenerator()
    },
    queryOptions: {
      consistency: types.consistencies.localOne,
      fetchSize: 5000,
      prepare: false,
      retryOnTimeout: true,
      captureStackTrace: false
    },
    protocolOptions: {
      port: 9042,
      maxSchemaAgreementWaitSeconds: 10,
      maxVersion: 0
    },
    pooling: {
      heartBeatInterval: 30000
    },
    socketOptions: {
      connectTimeout: 5000,
      defunctReadTimeoutThreshold: 64,
      keepAlive: true,
      keepAliveDelay: 0,
      readTimeout: 12000,
      tcpNoDelay: true,
      coalescingThreshold: 8000
    },
    authProvider: null,
    maxPrepared: 500,
    refreshSchemaDelay: 1000,
    isMetadataSyncEnabled: true,
    prepareOnAllHosts: true,
    rePrepareOnUp: true,
    encoding: {
      copyBuffer: true,
      useUndefinedAsUnset: true
    }
  });
}

/**
 * Extends and validates the user options
 * @param {Object} [baseOptions] The source object instance that will be overridden
 * @param {Object} userOptions
 * @returns {Object}
 */
function extend(baseOptions, userOptions) {
  if (arguments.length === 1) {
    userOptions = arguments[0];
    baseOptions = {};
  }
  var options = utils.deepExtend(baseOptions, defaultOptions(), userOptions);
  if (!util.isArray(options.contactPoints) || options.contactPoints.length === 0) {
    throw new TypeError('Contacts points are not defined.');
  }
  for (var i = 0; i < options.contactPoints.length; i++) {
    var hostName = options.contactPoints[i];
    if (!hostName) {
      throw new TypeError(util.format('Contact point %s (%s) is not a valid host name, ' +
        'the following values are valid contact points: ipAddress, hostName or ipAddress:port', i, hostName));
    }
  }
  if (!options.logEmitter) {
    options.logEmitter = function () {};
  }
  if (!options.queryOptions) {
    throw new TypeError('queryOptions not defined in options');
  }
  validatePoliciesOptions(options.policies);
  validateProtocolOptions(options.protocolOptions);
  validateSocketOptions(options.socketOptions);
  options.encoding = options.encoding || {};
  validateEncodingOptions(options.encoding);
  if (options.profiles && !util.isArray(options.profiles)) {
    throw new TypeError('profiles must be an Array of ExecutionProfile instances');
  }
  return options;
}

/**
 * Validates the policies from the client options.
 * @param {ClientOptions.policies} policiesOptions
 * @private
 */
function validatePoliciesOptions(policiesOptions) {
  if (!policiesOptions) {
    throw new TypeError('policies not defined in options');
  }
  if (!(policiesOptions.loadBalancing instanceof policies.loadBalancing.LoadBalancingPolicy)) {
    throw new TypeError('Load balancing policy must be an instance of LoadBalancingPolicy');
  }
  if (!(policiesOptions.reconnection instanceof policies.reconnection.ReconnectionPolicy)) {
    throw new TypeError('Reconnection policy must be an instance of ReconnectionPolicy');
  }
  if (!(policiesOptions.retry instanceof policies.retry.RetryPolicy)) {
    throw new TypeError('Retry policy must be an instance of RetryPolicy');
  }
  if (!(policiesOptions.addressResolution instanceof policies.addressResolution.AddressTranslator)) {
    throw new TypeError('Address resolution policy must be an instance of AddressTranslator');
  }
  if (policiesOptions.timestampGeneration !== null &&
    !(policiesOptions.timestampGeneration instanceof policies.timestampGeneration.TimestampGenerator)) {
    throw new TypeError('Timestamp generation policy must be an instance of TimestampGenerator');
  }
}

/**
 * Validates the protocol options.
 * @param {ClientOptions.protocolOptions} protocolOptions
 * @private
 */
function validateProtocolOptions(protocolOptions) {
  if (!protocolOptions) {
    throw new TypeError('protocolOptions not defined in options');
  }
  var version = protocolOptions.maxVersion;
  if (version && (typeof version !== 'number' || !types.protocolVersion.isSupported(version))) {
    throw new TypeError(util.format('protocolOptions.maxVersion provided (%s) is invalid', version));
  }
}

/**
 * Validates the socket options.
 * @param {ClientOptions.socketOptions} socketOptions
 * @private
 */
function validateSocketOptions(socketOptions) {
  if (!socketOptions) {
    throw new TypeError('socketOptions not defined in options');
  }
  if (typeof socketOptions.readTimeout !== 'number') {
    throw new TypeError('socketOptions.readTimeout must be a Number');
  }
  if (typeof socketOptions.coalescingThreshold !== 'number' || socketOptions.coalescingThreshold <= 0) {
    throw new TypeError('socketOptions.coalescingThreshold must be a positive Number');
  }
}

/**
 * Validates the encoding options.
 * @param {ClientOptions.encoding} encodingOptions
 * @private
 */
function validateEncodingOptions(encodingOptions) {
  if (encodingOptions.map) {
    var mapConstructor = encodingOptions.map;
    if (typeof mapConstructor !== 'function' ||
      typeof mapConstructor.prototype.forEach !== 'function' ||
      typeof mapConstructor.prototype.set !== 'function') {
      throw new TypeError('Map constructor not valid');
    }
  }
  if (encodingOptions.set) {
    var setConstructor = encodingOptions.set;
    if (typeof setConstructor !== 'function' ||
      typeof setConstructor.prototype.forEach !== 'function' ||
      typeof setConstructor.prototype.add !== 'function') {
      throw new TypeError('Set constructor not valid');
    }
  }
}

/**
 * Creates a new instance of query options with the values from the user.
 * When some values are not defined, it takes the default values from
 * - {@link ExecutionProfile}.
 * - {@link QueryOptions} from the default options.
 * @param {Client} client
 * @param {QueryOptions|function} userOptions
 * @param {Function} [rowCallback]
 * @param {Boolean} [logged]
 * @returns {Object|Error} Returns a new instance of an object with the query options or returns an Error
 * instance (doesn't throw the Error).
 */
function createQueryOptions(client, userOptions, rowCallback, logged) {
  var profile =
    client.profileManager.getProfile(userOptions && userOptions.executionProfile);
  if (!profile) {
    return new errors.ArgumentError(util.format('Execution profile "%s" not found', userOptions.executionProfile));
  }
  // userOptions can be undefined and could be of type function (is an optional parameter)
  userOptions = (!userOptions || typeof userOptions === 'function') ? utils.emptyObject : userOptions;
  var defaultQueryOptions = client.options.queryOptions;

  // Using fixed property names is 2 order of magnitude faster than dynamically shallow clone objects
  var result = {
    autoPage: ifUndefined(userOptions.autoPage, defaultQueryOptions.autoPage),
    captureStackTrace: ifUndefined(userOptions.captureStackTrace, defaultQueryOptions.captureStackTrace),
    consistency: ifUndefined3(userOptions.consistency, profile.consistency, defaultQueryOptions.consistency),
    customPayload: ifUndefined(userOptions.customPayload, defaultQueryOptions.customPayload),
    executionProfile: profile,
    fetchSize: ifUndefined(userOptions.fetchSize, defaultQueryOptions.fetchSize),
    hints: userOptions.hints,
    isIdempotent: ifUndefined(userOptions.isIdempotent, defaultQueryOptions.isIdempotent),
    keyspace: userOptions.keyspace,
    logged: ifUndefined(userOptions.logged, logged),
    pageState: userOptions.pageState,
    prepare: ifUndefined(userOptions.prepare, defaultQueryOptions.prepare),
    readTimeout: ifUndefined3(userOptions.readTimeout, profile.readTimeout, client.options.socketOptions.readTimeout),
    retry: ifUndefined3(userOptions.retry, profile.retry, client.options.policies.retry),
    retryOnTimeout: ifUndefined3(
      userOptions.retryOnTimeout, profile.retryOnTimeout, defaultQueryOptions.retryOnTimeout),
    routingIndexes: userOptions.routingIndexes,
    routingKey: userOptions.routingKey,
    routingNames: userOptions.routingNames,
    serialConsistency: ifUndefined3(
      userOptions.serialConsistency, profile.serialConsistency, defaultQueryOptions.serialConsistency),
    timestamp: getTimestamp(client, userOptions, defaultQueryOptions.timestamp),
    traceQuery: ifUndefined(userOptions.traceQuery, defaultQueryOptions.traceQuery),
    // not part of query options
    rowCallback: rowCallback
  };
  if (userOptions === utils.emptyObject) {
    return result;
  }
  var userOptionsKeys = Object.keys(userOptions);
  var key, value;
  // Use the fastest iteration of array
  var i = userOptionsKeys.length;
  while (i--) {
    key = userOptionsKeys[i];
    if (key === 'executionProfile') {
      // Execution profile was the only value that could has been "replaced"
      continue;
    }
    value = userOptions[key];
    if (value === undefined) {
      continue;
    }
    result[key] = value;
  }
  return result;
}

function ifUndefined(v1, v2) {
  return v1 !== undefined ? v1 : v2;
}

function ifUndefined3(v1, v2, v3) {
  if (v1 !== undefined) {
    return v1;
  }
  return v2 !== undefined ? v2 : v3;
}

function getTimestamp(client, userOptions, defaultValue) {
  if (typeof userOptions.timestamp !== 'undefined') {
    return userOptions.timestamp;
  }
  var timestampGenerator = client.options.policies.timestampGeneration;
  if (types.protocolVersion.supportsTimestamp(client.controlConnection.protocolVersion) && timestampGenerator) {
    return timestampGenerator.next(client);
  }
  return defaultValue;
}

/**
 * Core connections per host for protocol versions 1 and 2
 */
var coreConnectionsPerHostV2 = {};
coreConnectionsPerHostV2[types.distance.local] = 2;
coreConnectionsPerHostV2[types.distance.remote] = 1;
coreConnectionsPerHostV2[types.distance.ignored] = 0;
/**
 * Core connections per host for protocol version 3 and above
 */
var coreConnectionsPerHostV3 = {};
coreConnectionsPerHostV3[types.distance.local] = 1;
coreConnectionsPerHostV3[types.distance.remote] = 1;
coreConnectionsPerHostV3[types.distance.ignored] = 0;

exports.extend = extend;
exports.defaultOptions = defaultOptions;
exports.coreConnectionsPerHostV2 = coreConnectionsPerHostV2;
exports.coreConnectionsPerHostV3 = coreConnectionsPerHostV3;
exports.createQueryOptions = createQueryOptions;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Contains driver tuning policies to determine [load balancing]{@link module:policies/loadBalancing},
 *  [retrying]{@link module:policies/retry} queries, [reconnecting]{@link module:policies/reconnection} to a node,
 *  [address resolution]{@link module:policies/addressResolution},
 *  [timestamp generation]{@link module:policies/timestampGeneration} and
 *  [speculative execution]{@link module:policies/speculativeExecution}.
 * @module policies
 */
var addressResolution = exports.addressResolution = __webpack_require__(28);
var loadBalancing = exports.loadBalancing = __webpack_require__(29);
var reconnection = exports.reconnection = __webpack_require__(41);
var retry = exports.retry = __webpack_require__(14);
var speculativeExecution = exports.speculativeExecution = __webpack_require__(42);
var timestampGeneration = exports.timestampGeneration = __webpack_require__(43);

/**
 * Returns a new instance of the default address translator policy used by the driver.
 * @returns {AddressTranslator}
 */
exports.defaultAddressTranslator = function () {
  return new addressResolution.AddressTranslator();
};

/**
 * Returns a new instance of the default load-balancing policy used by the driver.
 * @returns {LoadBalancingPolicy}
 */
exports.defaultLoadBalancingPolicy = function () {
  return new loadBalancing.TokenAwarePolicy(new loadBalancing.DCAwareRoundRobinPolicy());
};

/**
 * Returns a new instance of the default retry policy used by the driver.
 * @returns {RetryPolicy}
 */
exports.defaultRetryPolicy = function () {
  return new retry.RetryPolicy();
};

/**
 * Returns a new instance of the default reconnection policy used by the driver.
 * @returns {ReconnectionPolicy}
 */
exports.defaultReconnectionPolicy = function () {
  return new reconnection.ExponentialReconnectionPolicy(1000, 10 * 60 * 1000, false);
};


/**
 * Returns a new instance of the default speculative execution policy used by the driver.
 * @returns {SpeculativeExecutionPolicy}
 */
exports.defaultSpeculativeExecutionPolicy = function () {
  return new speculativeExecution.NoSpeculativeExecutionPolicy();
};

/**
 * Returns a new instance of the default timestamp generator used by the driver.
 * @returns {TimestampGenerator}
 */
exports.defaultTimestampGenerator = function () {
  return new timestampGeneration.MonotonicTimestampGenerator();
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("dns");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = __webpack_require__(8);
var utils = __webpack_require__(1);

/** @module types */

/**
 * Creates a new instance of Uuid based on a Buffer
 * @class
 * @classdesc Represents an immutable universally unique identifier (UUID). A UUID represents a 128-bit value.
 * @param {Buffer} buffer The 16-length buffer.
 * @constructor
 */
function Uuid(buffer) {
  if (!buffer || buffer.length !== 16) {
    throw new Error('You must provide a buffer containing 16 bytes');
  }
  this.buffer = buffer;
}

/**
 * Parses a string representation of a Uuid
 * @param {String} value
 * @returns {Uuid}
 */
Uuid.fromString = function (value) {
  //36 chars: 32 + 4 hyphens
  if (typeof value !== 'string' || value.length !== 36) {
    throw new Error('Invalid string representation of Uuid, it should be in the 00000000-0000-0000-0000-000000000000');
  }
  return new Uuid(utils.allocBufferFromString(value.replace(/-/g, ''), 'hex'));
};

/**
 * Creates a new random (version 4) Uuid.
 * @param {function} [callback] Optional callback to be invoked with the error as first parameter and the created Uuid as
 * second parameter.
 * @returns {Uuid}
 */
Uuid.random = function (callback) {
  if (callback) {
    getRandomBytes(function(err, buffer) {
      if (err) {
        return callback(err);
      }
      return callback(null, createUuidFromBuffer(buffer));
    });
  } else {
    var buffer = getRandomBytes();
    return createUuidFromBuffer(buffer);
  }
};

/**
 * Gets the bytes representation of a Uuid
 * @returns {Buffer}
 */
Uuid.prototype.getBuffer = function () {
  return this.buffer;
};
/**
 * Compares this object to the specified object.
 * The result is true if and only if the argument is not null, is a UUID object, and contains the same value, bit for bit, as this UUID.
 * @param {Uuid} other The other value to test for equality.
 */
Uuid.prototype.equals = function (other) {
  return !!(other instanceof Uuid && this.buffer.toString('hex') === other.buffer.toString('hex'));
};

/**
 * Returns a string representation of the value of this Uuid instance.
 * 32 hex separated by hyphens, in the form of 00000000-0000-0000-0000-000000000000.
 * @returns {String}
 */
Uuid.prototype.toString = function () {
  //32 hex representation of the Buffer
  var hexValue = getHex(this);
  return (
    hexValue.substr(0, 8) + '-' +
    hexValue.substr(8, 4) + '-' +
    hexValue.substr(12, 4) + '-' +
    hexValue.substr(16, 4) + '-' +
    hexValue.substr(20, 12));
};

/**
 * Provide the name of the constructor and the string representation
 * @returns {string}
 */
Uuid.prototype.inspect = function () {
  return this.constructor.name + ': ' + this.toString();
};

/**
 * Returns the string representation.
 * Method used by the native JSON.stringify() to serialize this instance.
 */
Uuid.prototype.toJSON = function () {
  return this.toString();
};


/**
 * Returns new Uuid
 * @private
 * @returns {Uuid}
 */
function createUuidFromBuffer (buffer) {
  //clear the version
  buffer[6] &= 0x0f;
  //set the version 4
  buffer[6] |= 0x40;
  //clear the variant
  buffer[8] &= 0x3f;
  //set the IETF variant
  buffer[8] |= 0x80;
  return new Uuid(buffer);
}

/**
 * @private
 * @returns {String} 32 hex representation of the instance, without separators
 */
function getHex (uuid) {
  return uuid.buffer.toString('hex');
}

/**
 * Gets a crypto generated 16 bytes
 * @private
 * @returns {Buffer}
 */
function getRandomBytes (cb) {
  return crypto.randomBytes(16, cb);
}

module.exports = Uuid;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** @module types */

var utils = __webpack_require__(1);

/**
 * Constructs a two's-complement integer an array containing bits of the
 * integer in 32-bit (signed) pieces, given in little-endian order (i.e.,
 * lowest-order bits in the first piece), and the sign of -1 or 0.
 *
 * See the from* functions below for other convenient ways of constructing
 * Integers.
 *
 * The internal representation of an integer is an array of 32-bit signed
 * pieces, along with a sign (0 or -1) that indicates the contents of all the
 * other 32-bit pieces out to infinity.  We use 32-bit pieces because these are
 * the size of integers on which Javascript performs bit-operations.  For
 * operations like addition and multiplication, we split each number into 16-bit
 * pieces, which can easily be multiplied within Javascript's floating-point
 * representation without overflow or change in sign.
 *
 * @constructor
 * @param {Array.<number>} bits Array containing the bits of the number.
 * @param {number} sign The sign of the number: -1 for negative and 0 positive.
 * @final
 */
function Integer (bits, sign) {
  /**
   * @type {!Array.<number>}
   * @private
   */
  this.bits_ = [];

  /**
   * @type {number}
   * @private
   */
  this.sign_ = sign;

  // Copy the 32-bit signed integer values passed in.  We prune out those at the
  // top that equal the sign since they are redundant.
  var top = true;
  for (var i = bits.length - 1; i >= 0; i--) {
    var val = bits[i] | 0;
    if (!top || val != sign) {
      this.bits_[i] = val;
      top = false;
    }
  }
}


// NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
// from* methods on which they depend.


/**
 * A cache of the Integer representations of small integer values.
 * @type {!Object}
 * @private
 */
Integer.IntCache_ = {};


/**
 * Returns an Integer representing the given (32-bit) integer value.
 * @param {number} value A 32-bit integer value.
 * @return {!Integer} The corresponding Integer value.
 */
Integer.fromInt = function(value) {
  if (-128 <= value && value < 128) {
    var cachedObj = Integer.IntCache_[value];
    if (cachedObj) {
      return cachedObj;
    }
  }

  var obj = new Integer([value | 0], value < 0 ? -1 : 0);
  if (-128 <= value && value < 128) {
    Integer.IntCache_[value] = obj;
  }
  return obj;
};


/**
 * Returns an Integer representing the given value, provided that it is a finite
 * number.  Otherwise, zero is returned.
 * @param {number} value The value in question.
 * @return {!Integer} The corresponding Integer value.
 */
Integer.fromNumber = function(value) {
  if (isNaN(value) || !isFinite(value)) {
    return Integer.ZERO;
  } else if (value < 0) {
    return Integer.fromNumber(-value).negate();
  } else {
    var bits = [];
    var pow = 1;
    for (var i = 0; value >= pow; i++) {
      bits[i] = (value / pow) | 0;
      pow *= Integer.TWO_PWR_32_DBL_;
    }
    return new Integer(bits, 0);
  }
};


/**
 * Returns a Integer representing the value that comes by concatenating the
 * given entries, each is assumed to be 32 signed bits, given in little-endian
 * order (lowest order bits in the lowest index), and sign-extending the highest
 * order 32-bit value.
 * @param {Array.<number>} bits The bits of the number, in 32-bit signed pieces,
 *     in little-endian order.
 * @return {!Integer} The corresponding Integer value.
 */
Integer.fromBits = function(bits) {
  var high = bits[bits.length - 1];
  //noinspection JSBitwiseOperatorUsage
  return new Integer(bits, high & (1 << 31) ? -1 : 0);
};


/**
 * Returns an Integer representation of the given string, written using the
 * given radix.
 * @param {string} str The textual representation of the Integer.
 * @param {number=} opt_radix The radix in which the text is written.
 * @return {!Integer} The corresponding Integer value.
 */
Integer.fromString = function(str, opt_radix) {
  if (str.length == 0) {
    throw TypeError('number format error: empty string');
  }

  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  if (str.charAt(0) == '-') {
    return Integer.fromString(str.substring(1), radix).negate();
  } else if (str.indexOf('-') >= 0) {
    throw TypeError('number format error: interior "-" character');
  }

  // Do several (8) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = Integer.fromNumber(Math.pow(radix, 8));

  var result = Integer.ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i);
    var value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = Integer.fromNumber(Math.pow(radix, size));
      result = result.multiply(power).add(Integer.fromNumber(value));
    } else {
      result = result.multiply(radixToPower);
      result = result.add(Integer.fromNumber(value));
    }
  }
  return result;
};

/**
 * Returns an Integer representation of a given big endian Buffer.
 * The internal representation of bits contains bytes in groups of 4
 * @param {Buffer} buf
 * @returns {Integer}
 */
Integer.fromBuffer = function (buf) {
  var bits = new Array(Math.ceil(buf.length / 4));
  //noinspection JSBitwiseOperatorUsage
  var sign = buf[0] & (1 << 7) ? -1 : 0;
  for (var i = 0; i < bits.length; i++) {
    var offset = buf.length - ((i + 1) * 4);
    var value;
    if (offset < 0) {
      //The buffer length is not multiple of 4
      offset = offset + 4;
      value = 0;
      for (var j = 0; j < offset; j++) {
        var byte = buf[j];
        if (sign === -1) {
          //invert the bits
          byte = ~byte & 0xff;
        }
        value = value | (byte << (offset - j - 1) * 8);
      }
      if (sign === -1) {
        //invert all the bits
        value = ~value;
      }
    }
    else {
      value = buf.readInt32BE(offset);
    }
    bits[i] = value;
  }
  return new Integer(bits, sign);
};

/**
 * Returns a big endian buffer representation of an Integer.
 * Internally the bits are represented using 4 bytes groups (numbers),
 * in the Buffer representation there might be the case where we need less than the 4 bytes.
 * For example: 0x00000001 -> '01', 0xFFFFFFFF -> 'FF', 0xFFFFFF01 -> 'FF01'
 * @param {Integer} value
 * @returns {Buffer}
*/
Integer.toBuffer = function (value) {
  var sign = value.sign_;
  var bits = value.bits_;
  if (bits.length === 0) {
    //[0] or [0xffffffff]
    return utils.allocBufferFromArray([value.sign_]);
  }
  //the high bits might need to be represented in less than 4 bytes
  var highBits = bits[bits.length-1];
  if (sign === -1) {
    highBits = ~highBits;
  }
  var high = [];
  if (highBits >>> 24 > 0) {
    high.push((highBits >> 24) & 0xff);
  }
  if (highBits >>> 16 > 0) {
    high.push((highBits >> 16) & 0xff);
  }
  if (highBits >>> 8 > 0) {
    high.push((highBits >> 8) & 0xff);
  }
  high.push(highBits & 0xff);
  if (sign === -1) {
    //The byte containing the sign bit got removed
    if (high[0] >> 7 !== 0) {
      //it is going to be negated
      high.unshift(0);
    }
  }
  else if (high[0] >> 7 !== 0) {
    //its positive but it lost the byte containing the sign bit
    high.unshift(0);
  }
  var buf = utils.allocBufferUnsafe(high.length + ((bits.length-1) * 4));
  for (var j = 0; j < high.length; j++) {
    var b = high[j];
    if (sign === -1) {
      buf[j] = ~b;
    }
    else {
      buf[j] = b;
    }
  }
  for (var i = 0; i < bits.length - 1; i++) {
    var group = bits[bits.length - 2 - i];
    var offset = high.length + i * 4;
    buf.writeInt32BE(group, offset);
  }
  return buf;
};


/**
 * A number used repeatedly in calculations.  This must appear before the first
 * call to the from* functions below.
 * @type {number}
 * @private
 */
Integer.TWO_PWR_32_DBL_ = (1 << 16) * (1 << 16);


/** @type {!Integer} */
Integer.ZERO = Integer.fromInt(0);


/** @type {!Integer} */
Integer.ONE = Integer.fromInt(1);


/**
 * @type {!Integer}
 * @private
 */
Integer.TWO_PWR_24_ = Integer.fromInt(1 << 24);


/**
 * Returns the value, assuming it is a 32-bit integer.
 * @return {number} The corresponding int value.
 */
Integer.prototype.toInt = function() {
  return this.bits_.length > 0 ? this.bits_[0] : this.sign_;
};


/** @return {number} The closest floating-point representation to this value. */
Integer.prototype.toNumber = function() {
  if (this.isNegative()) {
    return -this.negate().toNumber();
  } else {
    var val = 0;
    var pow = 1;
    for (var i = 0; i < this.bits_.length; i++) {
      val += this.getBitsUnsigned(i) * pow;
      pow *= Integer.TWO_PWR_32_DBL_;
    }
    return val;
  }
};


/**
 * @param {number=} opt_radix The radix in which the text should be written.
 * @return {string} The textual representation of this value.
 * @override
 */
Integer.prototype.toString = function(opt_radix) {
  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  if (this.isZero()) {
    return '0';
  } else if (this.isNegative()) {
    return '-' + this.negate().toString(radix);
  }

  // Do several (6) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = Integer.fromNumber(Math.pow(radix, 6));

  var rem = this;
  var result = '';
  while (true) {
    var remDiv = rem.divide(radixToPower);
    var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
    var digits = intval.toString(radix);

    rem = remDiv;
    if (rem.isZero()) {
      return digits + result;
    } else {
      while (digits.length < 6) {
        digits = '0' + digits;
      }
      result = '' + digits + result;
    }
  }
};


/**
 * Returns the index-th 32-bit (signed) piece of the Integer according to
 * little-endian order (i.e., index 0 contains the smallest bits).
 * @param {number} index The index in question.
 * @return {number} The requested 32-bits as a signed number.
 */
Integer.prototype.getBits = function(index) {
  if (index < 0) {
    return 0;  // Allowing this simplifies bit shifting operations below...
  } else if (index < this.bits_.length) {
    return this.bits_[index];
  } else {
    return this.sign_;
  }
};


/**
 * Returns the index-th 32-bit piece as an unsigned number.
 * @param {number} index The index in question.
 * @return {number} The requested 32-bits as an unsigned number.
 */
Integer.prototype.getBitsUnsigned = function(index) {
  var val = this.getBits(index);
  return val >= 0 ? val : Integer.TWO_PWR_32_DBL_ + val;
};


/** @return {number} The sign bit of this number, -1 or 0. */
Integer.prototype.getSign = function() {
  return this.sign_;
};


/** @return {boolean} Whether this value is zero. */
Integer.prototype.isZero = function() {
  if (this.sign_ != 0) {
    return false;
  }
  for (var i = 0; i < this.bits_.length; i++) {
    if (this.bits_[i] != 0) {
      return false;
    }
  }
  return true;
};


/** @return {boolean} Whether this value is negative. */
Integer.prototype.isNegative = function() {
  return this.sign_ == -1;
};


/** @return {boolean} Whether this value is odd. */
Integer.prototype.isOdd = function() {
  return (this.bits_.length == 0) && (this.sign_ == -1) ||
    (this.bits_.length > 0) && ((this.bits_[0] & 1) != 0);
};


/**
 * @param {Integer} other Integer to compare against.
 * @return {boolean} Whether this Integer equals the other.
 */
Integer.prototype.equals = function(other) {
  if (this.sign_ != other.sign_) {
    return false;
  }
  var len = Math.max(this.bits_.length, other.bits_.length);
  for (var i = 0; i < len; i++) {
    if (this.getBits(i) != other.getBits(i)) {
      return false;
    }
  }
  return true;
};


/**
 * @param {Integer} other Integer to compare against.
 * @return {boolean} Whether this Integer does not equal the other.
 */
Integer.prototype.notEquals = function(other) {
  return !this.equals(other);
};


/**
 * @param {Integer} other Integer to compare against.
 * @return {boolean} Whether this Integer is greater than the other.
 */
Integer.prototype.greaterThan = function(other) {
  return this.compare(other) > 0;
};


/**
 * @param {Integer} other Integer to compare against.
 * @return {boolean} Whether this Integer is greater than or equal to the other.
 */
Integer.prototype.greaterThanOrEqual = function(other) {
  return this.compare(other) >= 0;
};


/**
 * @param {Integer} other Integer to compare against.
 * @return {boolean} Whether this Integer is less than the other.
 */
Integer.prototype.lessThan = function(other) {
  return this.compare(other) < 0;
};


/**
 * @param {Integer} other Integer to compare against.
 * @return {boolean} Whether this Integer is less than or equal to the other.
 */
Integer.prototype.lessThanOrEqual = function(other) {
  return this.compare(other) <= 0;
};


/**
 * Compares this Integer with the given one.
 * @param {Integer} other Integer to compare against.
 * @return {number} 0 if they are the same, 1 if the this is greater, and -1
 *     if the given one is greater.
 */
Integer.prototype.compare = function(other) {
  var diff = this.subtract(other);
  if (diff.isNegative()) {
    return -1;
  } else if (diff.isZero()) {
    return 0;
  } else {
    return +1;
  }
};


/**
 * Returns an integer with only the first numBits bits of this value, sign
 * extended from the final bit.
 * @param {number} numBits The number of bits by which to shift.
 * @return {!Integer} The shorted integer value.
 */
Integer.prototype.shorten = function(numBits) {
  var arr_index = (numBits - 1) >> 5;
  var bit_index = (numBits - 1) % 32;
  var bits = [];
  for (var i = 0; i < arr_index; i++) {
    bits[i] = this.getBits(i);
  }
  var sigBits = bit_index == 31 ? 0xFFFFFFFF : (1 << (bit_index + 1)) - 1;
  var val = this.getBits(arr_index) & sigBits;
  //noinspection JSBitwiseOperatorUsage
  if (val & (1 << bit_index)) {
    val |= 0xFFFFFFFF - sigBits;
    bits[arr_index] = val;
    return new Integer(bits, -1);
  } else {
    bits[arr_index] = val;
    return new Integer(bits, 0);
  }
};


/** @return {!Integer} The negation of this value. */
Integer.prototype.negate = function() {
  return this.not().add(Integer.ONE);
};


/**
 * Returns the sum of this and the given Integer.
 * @param {Integer} other The Integer to add to this.
 * @return {!Integer} The Integer result.
 */
Integer.prototype.add = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  var carry = 0;

  for (var i = 0; i <= len; i++) {
    var a1 = this.getBits(i) >>> 16;
    var a0 = this.getBits(i) & 0xFFFF;

    var b1 = other.getBits(i) >>> 16;
    var b0 = other.getBits(i) & 0xFFFF;

    var c0 = carry + a0 + b0;
    var c1 = (c0 >>> 16) + a1 + b1;
    carry = c1 >>> 16;
    c0 &= 0xFFFF;
    c1 &= 0xFFFF;
    arr[i] = (c1 << 16) | c0;
  }
  return Integer.fromBits(arr);
};


/**
 * Returns the difference of this and the given Integer.
 * @param {Integer} other The Integer to subtract from this.
 * @return {!Integer} The Integer result.
 */
Integer.prototype.subtract = function(other) {
  return this.add(other.negate());
};


/**
 * Returns the product of this and the given Integer.
 * @param {Integer} other The Integer to multiply against this.
 * @return {!Integer} The product of this and the other.
 */
Integer.prototype.multiply = function(other) {
  if (this.isZero()) {
    return Integer.ZERO;
  } else if (other.isZero()) {
    return Integer.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().multiply(other.negate());
    } else {
      return this.negate().multiply(other).negate();
    }
  } else if (other.isNegative()) {
    return this.multiply(other.negate()).negate();
  }

  // If both numbers are small, use float multiplication
  if (this.lessThan(Integer.TWO_PWR_24_) &&
    other.lessThan(Integer.TWO_PWR_24_)) {
    return Integer.fromNumber(this.toNumber() * other.toNumber());
  }

  // Fill in an array of 16-bit products.
  var len = this.bits_.length + other.bits_.length;
  var arr = [];
  for (var i = 0; i < 2 * len; i++) {
    arr[i] = 0;
  }
  for (var i = 0; i < this.bits_.length; i++) {
    for (var j = 0; j < other.bits_.length; j++) {
      var a1 = this.getBits(i) >>> 16;
      var a0 = this.getBits(i) & 0xFFFF;

      var b1 = other.getBits(j) >>> 16;
      var b0 = other.getBits(j) & 0xFFFF;

      arr[2 * i + 2 * j] += a0 * b0;
      Integer.carry16_(arr, 2 * i + 2 * j);
      arr[2 * i + 2 * j + 1] += a1 * b0;
      Integer.carry16_(arr, 2 * i + 2 * j + 1);
      arr[2 * i + 2 * j + 1] += a0 * b1;
      Integer.carry16_(arr, 2 * i + 2 * j + 1);
      arr[2 * i + 2 * j + 2] += a1 * b1;
      Integer.carry16_(arr, 2 * i + 2 * j + 2);
    }
  }

  // Combine the 16-bit values into 32-bit values.
  for (var i = 0; i < len; i++) {
    arr[i] = (arr[2 * i + 1] << 16) | arr[2 * i];
  }
  for (var i = len; i < 2 * len; i++) {
    arr[i] = 0;
  }
  return new Integer(arr, 0);
};


/**
 * Carries any overflow from the given index into later entries.
 * @param {Array.<number>} bits Array of 16-bit values in little-endian order.
 * @param {number} index The index in question.
 * @private
 */
Integer.carry16_ = function(bits, index) {
  while ((bits[index] & 0xFFFF) != bits[index]) {
    bits[index + 1] += bits[index] >>> 16;
    bits[index] &= 0xFFFF;
  }
};


/**
 * Returns this Integer divided by the given one.
 * @param {Integer} other Th Integer to divide this by.
 * @return {!Integer} This value divided by the given one.
 */
Integer.prototype.divide = function(other) {
  if (other.isZero()) {
    throw Error('division by zero');
  } else if (this.isZero()) {
    return Integer.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().divide(other.negate());
    } else {
      return this.negate().divide(other).negate();
    }
  } else if (other.isNegative()) {
    return this.divide(other.negate()).negate();
  }

  // Repeat the following until the remainder is less than other:  find a
  // floating-point that approximates remainder / other *from below*, add this
  // into the result, and subtract it from the remainder.  It is critical that
  // the approximate value is less than or equal to the real value so that the
  // remainder never becomes negative.
  var res = Integer.ZERO;
  var rem = this;
  while (rem.greaterThanOrEqual(other)) {
    // Approximate the result of division. This may be a little greater or
    // smaller than the actual value.
    var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

    // We will tweak the approximate result by changing it in the 48-th digit or
    // the smallest non-fractional digit, whichever is larger.
    var log2 = Math.ceil(Math.log(approx) / Math.LN2);
    var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

    // Decrease the approximation until it is smaller than the remainder.  Note
    // that if it is too large, the product overflows and is negative.
    var approxRes = Integer.fromNumber(approx);
    var approxRem = approxRes.multiply(other);
    while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
      approx -= delta;
      approxRes = Integer.fromNumber(approx);
      approxRem = approxRes.multiply(other);
    }

    // We know the answer can't be zero... and actually, zero would cause
    // infinite recursion since we would make no progress.
    if (approxRes.isZero()) {
      approxRes = Integer.ONE;
    }

    res = res.add(approxRes);
    rem = rem.subtract(approxRem);
  }
  return res;
};


/**
 * Returns this Integer modulo the given one.
 * @param {Integer} other The Integer by which to mod.
 * @return {!Integer} This value modulo the given one.
 */
Integer.prototype.modulo = function(other) {
  return this.subtract(this.divide(other).multiply(other));
};


/** @return {!Integer} The bitwise-NOT of this value. */
Integer.prototype.not = function() {
  var len = this.bits_.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = ~this.bits_[i];
  }
  return new Integer(arr, ~this.sign_);
};


/**
 * Returns the bitwise-AND of this Integer and the given one.
 * @param {Integer} other The Integer to AND with this.
 * @return {!Integer} The bitwise-AND of this and the other.
 */
Integer.prototype.and = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = this.getBits(i) & other.getBits(i);
  }
  return new Integer(arr, this.sign_ & other.sign_);
};


/**
 * Returns the bitwise-OR of this Integer and the given one.
 * @param {Integer} other The Integer to OR with this.
 * @return {!Integer} The bitwise-OR of this and the other.
 */
Integer.prototype.or = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = this.getBits(i) | other.getBits(i);
  }
  return new Integer(arr, this.sign_ | other.sign_);
};


/**
 * Returns the bitwise-XOR of this Integer and the given one.
 * @param {Integer} other The Integer to XOR with this.
 * @return {!Integer} The bitwise-XOR of this and the other.
 */
Integer.prototype.xor = function(other) {
  var len = Math.max(this.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = this.getBits(i) ^ other.getBits(i);
  }
  return new Integer(arr, this.sign_ ^ other.sign_);
};


/**
 * Returns this value with bits shifted to the left by the given amount.
 * @param {number} numBits The number of bits by which to shift.
 * @return {!Integer} This shifted to the left by the given amount.
 */
Integer.prototype.shiftLeft = function(numBits) {
  var arr_delta = numBits >> 5;
  var bit_delta = numBits % 32;
  var len = this.bits_.length + arr_delta + (bit_delta > 0 ? 1 : 0);
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (bit_delta > 0) {
      arr[i] = (this.getBits(i - arr_delta) << bit_delta) |
      (this.getBits(i - arr_delta - 1) >>> (32 - bit_delta));
    } else {
      arr[i] = this.getBits(i - arr_delta);
    }
  }
  return new Integer(arr, this.sign_);
};


/**
 * Returns this value with bits shifted to the right by the given amount.
 * @param {number} numBits The number of bits by which to shift.
 * @return {!Integer} This shifted to the right by the given amount.
 */
Integer.prototype.shiftRight = function(numBits) {
  var arr_delta = numBits >> 5;
  var bit_delta = numBits % 32;
  var len = this.bits_.length - arr_delta;
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (bit_delta > 0) {
      arr[i] = (this.getBits(i + arr_delta) >>> bit_delta) |
      (this.getBits(i + arr_delta + 1) << (32 - bit_delta));
    } else {
      arr[i] = this.getBits(i + arr_delta);
    }
  }
  return new Integer(arr, this.sign_);
};

/**
 * Provide the name of the constructor and the string representation
 * @returns {string}
 */
Integer.prototype.inspect = function () {
  return this.constructor.name + ': ' + this.toString();
};

/**
 * Returns a Integer whose value is the absolute value of this
 * @returns {Integer}
 */
Integer.prototype.abs = function () {
  return this.sign_ === 0 ? this : this.negate();
};

/**
 * Returns the string representation.
 * Method used by the native JSON.stringify() to serialize this instance.
 */
Integer.prototype.toJSON = function () {
  return this.toString();
};

module.exports = Integer;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var errors = __webpack_require__(3);

/** @module policies/retry */
/**
 * Base and default RetryPolicy.
 * Determines what to do when the drivers runs into an specific Cassandra exception
 * @constructor
 */
function RetryPolicy() {

}

//noinspection JSUnusedLocalSymbols
/**
 * Determines what to do when the driver gets an UnavailableException response from a Cassandra node.
 * @param {OperationInfo} info
 * @param {Number} consistency The [consistency]{@link module:types~consistencies} level of the query that triggered
 * the exception.
 * @param {Number} required The number of replicas whose response is required to achieve the
 * required [consistency]{@link module:types~consistencies}.
 * @param {Number} alive The number of replicas that were known to be alive when the request had been processed
 * (since an unavailable exception has been triggered, there will be alive &lt; required)
 * @returns {DecisionInfo}
 */
RetryPolicy.prototype.onUnavailable = function (info, consistency, required, alive) {
  if (info.nbRetry > 0) {
    return this.rethrowResult();
  }
  return this.retryResult(undefined, false);
};

/**
 * Determines what to do when the driver gets a ReadTimeoutException response from a Cassandra node.
 * @param {OperationInfo} info
 * @param {Number} consistency The [consistency]{@link module:types~consistencies} level of the query that triggered
 * the exception.
 * @param {Number} received The number of nodes having answered the request.
 * @param {Number} blockFor The number of replicas whose response is required to achieve the
 * required [consistency]{@link module:types~consistencies}.
 * @param {Boolean} isDataPresent When <code>false</code>, it means the replica that was asked for data has not responded.
 * @returns {DecisionInfo}
 */
RetryPolicy.prototype.onReadTimeout = function (info, consistency, received, blockFor, isDataPresent) {
  if (info.nbRetry > 0) {
    return this.rethrowResult();
  }
  return ((received >= blockFor && !isDataPresent) ?
    this.retryResult() :
    this.rethrowResult());
};

/**
 * Determines what to do when the driver gets a WriteTimeoutException response from a Cassandra node.
 * @param {OperationInfo} info
 * @param {Number} consistency The [consistency]{@link module:types~consistencies} level of the query that triggered
 * the exception.
 * @param {Number} received The number of nodes having acknowledged the request.
 * @param {Number} blockFor The number of replicas whose acknowledgement is required to achieve the required
 * [consistency]{@link module:types~consistencies}.
 * @param {String} writeType A <code>string</code> that describes the type of the write that timed out ("SIMPLE"
 * / "BATCH" / "BATCH_LOG" / "UNLOGGED_BATCH" / "COUNTER").
 * @returns {DecisionInfo}
 */
RetryPolicy.prototype.onWriteTimeout = function (info, consistency, received, blockFor, writeType) {
  if (info.nbRetry > 0) {
    return this.rethrowResult();
  }
  // If the batch log write failed, retry the operation as this might just be we were unlucky at picking candidates
  return writeType === "BATCH_LOG" ? this.retryResult() : this.rethrowResult();
};

/**
 * Defines whether to retry and at which consistency level on an unexpected error.
 * <p>
 * This method might be invoked in the following situations:
 * </p>
 * <ol>
 * <li>On a client timeout, while waiting for the server response
 * (see [socketOptions.readTimeout]{@link ClientOptions}), being the error an instance of
 * [OperationTimedOutError]{@link module:errors~OperationTimedOutError}.</li>
 * <li>On a connection error (socket closed, etc.).</li>
 * <li>When the contacted host replies with an error, such as <code>overloaded</code>, <code>isBootstrapping</code>,
 * </code>serverError, etc. In this case, the error is instance of [ResponseError]{@link module:errors~ResponseError}.
 * </li>
 * </ol>
 * <p>
 * Note that when this method is invoked, <em>the driver cannot guarantee that the mutation has been effectively
 * applied server-side</em>; a retry should only be attempted if the request is known to be idempotent.
 * </p>
 * @param {OperationInfo} info
 * @param {Number|undefined} consistency The [consistency]{@link module:types~consistencies} level of the query that triggered
 * the exception.
 * @param {Error} err The error that caused this request to fail.
 * @returns {DecisionInfo}
 */
RetryPolicy.prototype.onRequestError = function (info, consistency, err) {
  if (err instanceof errors.OperationTimedOutError && !info.options.retryOnTimeout) {
    return this.rethrowResult();
  }
  // The default implementation triggers a retry on the next host in the query plan with the same consistency level,
  // regardless of the statement's idempotence, for historical reasons.
  return this.retryResult(undefined, false);
};

/**
 * Returns a {@link DecisionInfo} to retry the request with the given [consistency]{@link module:types~consistencies}.
 * @param {Number|undefined} [consistency] When specified, it retries the request with the given consistency.
 * @param {Boolean} [useCurrentHost] When specified, determines if the retry should be made using the same coordinator.
 * Default: true.
 * @returns {DecisionInfo}
 */
RetryPolicy.prototype.retryResult = function (consistency, useCurrentHost) {
  return {
    decision: RetryPolicy.retryDecision.retry,
    consistency: consistency,
    useCurrentHost: useCurrentHost !== false
  };
};

/**
 * Returns a {@link DecisionInfo} to callback in error when a err is obtained for a given request.
 * @returns {DecisionInfo}
 */
RetryPolicy.prototype.rethrowResult = function () {
  return { decision: RetryPolicy.retryDecision.rethrow };
};

/**
 * Determines the retry decision for the retry policies.
 * @type {Object}
 * @property {Number} rethrow
 * @property {Number} retry
 * @property {Number} ignore
 * @static
 */
RetryPolicy.retryDecision = {
  rethrow:  0,
  retry:    1,
  ignore:   2
};

/**
 * Creates a new instance of <code>IdempotenceAwareRetryPolicy</code>.
 * @classdesc
 * A retry policy that avoids retrying non-idempotent statements.
 * <p>
 * In case of write timeouts or unexpected errors, this policy will always return
 * [rethrowResult()]{@link module:policies/retry~RetryPolicy#rethrowResult} if the statement is deemed non-idempotent
 * (see [QueryOptions.isIdempotent]{@link QueryOptions}).
 * <p/>
 * For all other cases, this policy delegates the decision to the child policy.
 * @param {RetryPolicy} [childPolicy] The child retry policy to wrap. When not defined, it will use an instance of
 * [RetryPolicy]{@link module:policies/retry~RetryPolicy} as child policy.
 * @extends module:policies/retry~RetryPolicy
 * @constructor
 */
function IdempotenceAwareRetryPolicy(childPolicy) {
  this._childPolicy = childPolicy || new RetryPolicy();
}

util.inherits(IdempotenceAwareRetryPolicy, RetryPolicy);

IdempotenceAwareRetryPolicy.prototype.onReadTimeout = function (info, consistency, received, blockFor, isDataPresent) {
  return this._childPolicy.onReadTimeout(info, consistency, received, blockFor, isDataPresent);
};

/**
 * If the query is not idempotent, it returns a rethrow decision. Otherwise, it relies on the child policy to decide.
 */
IdempotenceAwareRetryPolicy.prototype.onRequestError = function (info, consistency, err) {
  if (info.options.isIdempotent) {
    return this._childPolicy.onRequestError(info, consistency, err);
  }
  return this.rethrowResult();
};

IdempotenceAwareRetryPolicy.prototype.onUnavailable = function (info, consistency, required, alive) {
  return this._childPolicy.onUnavailable(info, consistency, required, alive);
};

/**
 * If the query is not idempotent, it return a rethrow decision. Otherwise, it relies on the child policy to decide.
 */
IdempotenceAwareRetryPolicy.prototype.onWriteTimeout = function (info, consistency, received, blockFor, writeType) {
  if (info.options.isIdempotent) {
    return this._childPolicy.onWriteTimeout(info, consistency, received, blockFor, writeType);
  }
  return this.rethrowResult();
};

/**
 * Decision information
 * @typedef {Object} DecisionInfo
 * @property {Number} decision The decision as specified in
 * [retryDecision]{@link module:policies/retry~RetryPolicy.retryDecision}.
 * @property {Number} [consistency] The [consistency level]{@link module:types~consistencies}.
 * @property {useCurrentHost} [useCurrentHost] Determines if it should use the same host to retry the request.
 */

/**
 * Request information.
 * @typedef {Object} OperationInfo
 * @property {String} query The query that was executed.
 * @property {QueryOptions} options The options for the query that was executed.
 * @property {Number} nbRetry The number of retries already performed for this operation.
 * @property {Object} handler DEPRECATED: it will be removed in the next major version. The request handler.
 * @property {Object} request DEPRECATED: it will be removed in the next major version. Represents the request that
 * was executed.
 * @property {Boolean} retryOnTimeout. DEPRECATED: it will be removed in the next major version. The value as
 * specified in the {@link QueryOptions} for this operation. Use <code>OperationInfo.options</code> value instead.
 */

exports.RetryPolicy = RetryPolicy;
exports.IdempotenceAwareRetryPolicy = IdempotenceAwareRetryPolicy;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var events = __webpack_require__(4);

var utils = __webpack_require__(1);
var types = __webpack_require__(2);
var HostConnectionPool = __webpack_require__(46);
var PrepareHandler = __webpack_require__(19);

/**
 * Creates a new Host instance.
 * @classdesc
 * Represents a Cassandra node.
 * @extends EventEmitter
 * @constructor
 */
function Host(address, protocolVersion, options, metadata) {
  events.EventEmitter.call(this);
  /**
   * Gets ip address and port number of the node separated by `:`.
   * @type {String}
   */
  this.address = address;
  this.setDownAt = 0;
  Object.defineProperty(this, 'options', { value: options, enumerable: false, writable: false});
  /**
   * @type {HostConnectionPool}
   */
  Object.defineProperty(this, 'pool', { value: new HostConnectionPool(this, protocolVersion), enumerable: false});
  var self = this;
  this.pool.on('open', this._onNewConnectionOpen.bind(this));
  this.pool.on('remove', function onConnectionRemovedFromPool() {
    self._checkPoolState();
  });
  /**
   * Gets string containing the Cassandra version.
   * @type {String}
   */
  this.cassandraVersion = null;
  /**
   * Gets data center name of the node.
   * @type {String}
   */
  this.datacenter = null;
  /**
   * Gets rack name of the node.
   * @type {String}
   */
  this.rack = null;
  /**
   * Gets the tokens assigned to the node.
   * @type {Array}
   */
  this.tokens = null;
  // the distance as last set using the load balancing policy
  this._distance = types.distance.ignored;
  Object.defineProperty(this, '_metadata', { value: metadata, enumerable: false });
  this.reconnectionSchedule = this.options.policies.reconnection.newSchedule();
}

util.inherits(Host, events.EventEmitter);

/**
 * Marks this host as not available for query coordination.
 * @internal
 * @ignore
 */
Host.prototype.setDown = function() {
  // multiple events signaling that a host is failing could cause multiple calls to this method
  if (this.setDownAt !== 0) {
    // the host is already marked as Down
    return;
  }
  if (this.pool.isClosing()) {
    // the pool is being closed/shutdown, don't mind
    return;
  }
  this.setDownAt = Date.now();
  if (this._distance !== types.distance.ignored) {
    this.log('warning',
      util.format('Host %s considered as DOWN. Reconnection delay %dms.', this.address, this.reconnectionDelay));
  }
  else {
    this.log('info', util.format('Host %s considered as DOWN.', this.address));
  }
  this.emit('down');
  this._checkPoolState();
};

/**
 * Marks this host as available for querying.
 * @param {Boolean} [clearReconnection]
 * @internal
 * @ignore
 */
Host.prototype.setUp = function (clearReconnection) {
  if (!this.setDownAt) {
    //The host is already marked as UP
    return;
  }
  this.log('info', util.format('Setting host %s as UP', this.address));
  this.setDownAt = 0;
  //if it was unhealthy and now it is not, lets reset the reconnection schedule.
  this.reconnectionSchedule = this.options.policies.reconnection.newSchedule();
  if (clearReconnection) {
    this.pool.clearNewConnectionAttempt();
  }
  this.emit('up');
};

/**
 * Resets the reconnectionSchedule and tries to issue a reconnection immediately.
 * @internal
 * @ignore
 */
Host.prototype.checkIsUp = function () {
  if (this.isUp()) {
    return;
  }
  this.reconnectionSchedule = this.options.policies.reconnection.newSchedule();
  this.reconnectionDelay = 0;
  this.pool.attemptNewConnectionImmediate();
};

/**
 * @param {Boolean} waitForPending When true, it waits for in-flight operations to be finish before closing the
 * connections.
 * @param {Function} [callback]
 * @internal
 * @ignore
 */
Host.prototype.shutdown = function (waitForPending, callback) {
  callback = callback || utils.noop;
  if (waitForPending) {
    this.pool.drainAndShutdown();
    // Gracefully draining and shutting down the pool is being done in the background, it's not required
    // for the shutting down to be over to callback
    return callback();
  }
  this.pool.shutdown(callback);
};

/**
 * Determines if the node is UP now (seen as UP by the driver).
 * @returns {boolean}
 */
Host.prototype.isUp = function () {
  return !this.setDownAt;
};

/**
 * Determines if the host can be considered as UP
 * @returns {boolean}
 */
Host.prototype.canBeConsideredAsUp = function () {
  var self = this;
  function hasTimePassed() {
    return new Date().getTime() - self.setDownAt >= self.reconnectionDelay;
  }
  return !this.setDownAt || hasTimePassed();
};

/**
 * Sets the distance of the host relative to the client using the load balancing policy.
 * @param {Number} distance
 * @internal
 * @ignore
 */
Host.prototype.setDistance = function (distance) {
  var previousDistance = this._distance;
  this._distance = distance || types.distance.local;
  if (this.options.pooling.coreConnectionsPerHost) {
    this.pool.coreConnectionsLength = this.options.pooling.coreConnectionsPerHost[this._distance] || 0;
  }
  else {
    this.pool.coreConnectionsLength = 1;
  }
  if (this._distance === previousDistance) {
    return this._distance;
  }
  if (this._distance === types.distance.ignored) {
    // this host was local/remote and now must be ignored
    this.emit('ignore');
    this.pool.drainAndShutdown();
  }
  else if (!this.isUp()) {
    this.checkIsUp();
  }
  return this._distance;
};

/**
 * Changes the protocol version of a given host
 * @param {Number} value
 * @internal
 * @ignore
 */
Host.prototype.setProtocolVersion = function (value) {
  this.pool.protocolVersion = value;
};

/**
 * It gets an open connection to the host.
 * If there isn't an available connections, it will open a new one according to the pooling options.
 * @param {Function} callback
 * @internal
 * @ignore
 */
Host.prototype.borrowConnection = function (callback) {
  this.pool.borrowConnection(callback);
};

/**
 * Creates all the connection in the pool.
 * @param {Function} callback
 * @internal
 * @ignore
 */
Host.prototype.warmupPool = function (callback) {
  this.pool.create(true, callback);
};

/**
 * Gets any connection that is already opened or null if not found.
 * @returns {Connection}
 * @internal
 * @ignore
 */
Host.prototype.getActiveConnection = function () {
  if (!this.isUp() || !this.pool.connections.length) {
    return null;
  }
  return this.pool.connections[0];
};

/**
 * Checks the health of a connection in the pool
 * @param {Connection} connection
 * @internal
 * @ignore
 */
Host.prototype.checkHealth = function (connection) {
  if (connection.timedOutOperations <= this.options.socketOptions.defunctReadTimeoutThreshold) {
    return;
  }
  this.removeFromPool(connection);
};

/**
 * @param {Connection} connection
 * @internal
 * @ignore
 */
Host.prototype.removeFromPool = function (connection) {
  this.pool.remove(connection);
  this._checkPoolState();
};

/**
 * Validates that the internal state of the connection pool.
 * If the pool size is smaller than expected, schedule a new connection attempt.
 * If the amount of connections is 0 for not ignored hosts, the host must be down.
 * @private
 */
Host.prototype._checkPoolState = function () {
  if (this.pool.isClosing()) {
    return;
  }
  if (this.pool.connections.length < this.pool.coreConnectionsLength) {
    // the pool still needs to grow
    if (!this.pool.hasScheduledNewConnection()) {
      this.reconnectionDelay = this.reconnectionSchedule.next().value;
      this.pool.scheduleNewConnectionAttempt(this.reconnectionDelay);
    }
  }
  if (this._distance !== types.distance.ignored &&
      this.pool.connections.length === 0 &&
      this.pool.coreConnectionsLength > 0) {
    this.setDown();
  }
};

/**
 * Executed after an scheduled new connection attempt finished
 * @private
 */
Host.prototype._onNewConnectionOpen = function (err) {
  if (err) {
    this._checkPoolState();
    return;
  }
  var self = this;
  function setUpAndContinue(err) {
    if (err) {
      self.log('warning', util.format('Failed re-preparing on host %s: %s', self.address, err), err);
    }
    self.setUp();
    self.pool.increaseSize();
  }
  if (this.isUp() || !this.options.rePrepareOnUp) {
    return setUpAndContinue();
  }
  this.log('info', util.format('Re-preparing all queries on host %s before setting it as UP', this.address));
  var allPrepared = this._metadata.getAllPrepared();
  PrepareHandler.prepareAllQueries(this, allPrepared, setUpAndContinue);
};

/**
 * Returns an array containing the Cassandra Version as an Array of Numbers having the major version in the first
 * position.
 * @returns {Array.<Number>}
 */
Host.prototype.getCassandraVersion = function () {
  if (!this.cassandraVersion) {
    return utils.emptyArray;
  }
  return this.cassandraVersion.split('-')[0].split('.').map(function eachMap(x) {
    return parseInt(x, 10);
  });
};

Host.prototype.log = utils.log;

/**
 * Represents an associative-array of {@link Host hosts} that can be iterated.
 * It creates an internal copy when adding or removing, making it safe to iterate using the values() method within async operations.
 * @extends events.EventEmitter
 * @constructor
 */
function HostMap() {
  events.EventEmitter.call(this);
  this._items = {};
  this._values = null;
  Object.defineProperty(this, 'length', { get: function () { return this.values().length; }, enumerable: true });
}

util.inherits(HostMap, events.EventEmitter);

/**
 * Emitted when a host is added to the map
 * @event HostMap#add
 */
/**
 * Emitted when a host is removed from the map
 * @event HostMap#remove
 */

/**
 * Executes a provided function once per map element.
 * @param callback
 */
HostMap.prototype.forEach = function (callback) {
  //Use a new reference, allowing the map to be modified.
  var items = this._items;
  for (var key in items) {
    if (!items.hasOwnProperty(key)) {
      continue;
    }
    callback(items[key], key);
  }
};

/**
 * Gets a {@link Host host} by key or undefined if not found.
 * @param {String} key
 * @returns {Host}
 */
HostMap.prototype.get = function (key) {
  return this._items[key];
};

/**
 * Returns an array of host addresses.
 * @returns {Array.<String>}
 */
HostMap.prototype.keys = function () {
  return Object.keys(this._items);
};

/**
 * Removes an item from the map.
 * @param {String} key The key of the host
 * @fires HostMap#remove
 */
HostMap.prototype.remove = function (key) {
  if (!this._items.hasOwnProperty(key)) {
    //it's not part of it, do nothing
    return;
  }
  //clear cache
  this._values = null;
  //copy the values
  var copy = utils.extend({}, this._items);
  var h = copy[key];
  delete copy[key];
  this._items = copy;
  this.emit('remove', h);
};

/**
 * Removes multiple hosts from the map.
 * @param {Array.<String>} keys
 * @fires HostMap#remove
 */
HostMap.prototype.removeMultiple = function (keys) {
  //clear value cache
  this._values = null;
  //copy the values
  var copy = utils.extend({}, this._items);
  var removedHosts = [];
  for (var i = 0; i < keys.length; i++) {
    var h = copy[keys[i]];
    if (!h) {
      continue;
    }
    removedHosts.push(h);
    delete copy[keys[i]];
  }
  this._items = copy;
  removedHosts.forEach(function (h) {
    this.emit('remove', h);
  }, this);
};

/**
 * Adds a new item to the map.
 * @param {String} key The key of the host
 * @param {Host} value The host to be added
 * @fires HostMap#remove
 * @fires HostMap#add
 */
HostMap.prototype.set = function (key, value) {
  //clear values cache
  this._values = null;
  var originalValue = this._items[key];
  if (originalValue) {
    //The internal structure does not change
    this._items[key] = value;
    //emit a remove followed by a add
    this.emit('remove', originalValue);
    this.emit('add', value);
    return;
  }
  //copy the values
  var copy = utils.extend({}, this._items);
  copy[key] = value;
  this._items = copy;
  this.emit('add', value);
  return value;
};

/**
 * Returns a shallow copy of a portion of the items into a new array object.
 * Backward-compatibility.
 * @param {Number} [begin]
 * @param {Number} [end]
 * @returns {Array}
 * @ignore
 */
HostMap.prototype.slice = function (begin, end) {
  if (!begin && !end) {
    //avoid making a copy of the copy
    return this.values();
  }
  begin = begin || 0;
  return this.values().slice(begin, end);
};
//Backward-compatibility
HostMap.prototype.push = HostMap.prototype.set;

/**
 * Returns a shallow copy of the values of the map.
 * @returns {Array.<Host>}
 */
HostMap.prototype.values = function () {
  if (!this._values) {
    //cache the values
    var values = [];
    for (var key in this._items) {
      if (!this._items.hasOwnProperty(key)) {
        continue;
      }
      values.push(this._items[key]);
    }
    this._values = Object.freeze(values);
  }
  return this._values;
};

/**
 * Removes all items from the map.
 * @returns {Array.<Host>} The previous items
 */
HostMap.prototype.clear = function () {
  var previousItems = this.values();
  // Clear cache
  this._values = null;
  // Clear items
  this._items = {};
  for (var i = 0; i < previousItems.length; i++) {
    this.emit('remove', previousItems[i]);
  }
  return previousItems;
};

HostMap.prototype.inspect = function() {
  return this._items;
};

HostMap.prototype.toJSON = function() {
  return this._items;
};

exports.Host = Host;
exports.HostMap = HostMap;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var types = __webpack_require__(2);
var dataTypes = types.dataTypes;
var Long = types.Long;
var Integer = types.Integer;
var BigDecimal = types.BigDecimal;
var utils = __webpack_require__(1);

var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
var int16Zero = utils.allocBufferFromArray([0, 0]);
var int32Zero = utils.allocBufferFromArray([0, 0, 0, 0]);
var complexTypeNames = Object.freeze({
  list      : 'org.apache.cassandra.db.marshal.ListType',
  set       : 'org.apache.cassandra.db.marshal.SetType',
  map       : 'org.apache.cassandra.db.marshal.MapType',
  udt       : 'org.apache.cassandra.db.marshal.UserType',
  tuple     : 'org.apache.cassandra.db.marshal.TupleType',
  frozen    : 'org.apache.cassandra.db.marshal.FrozenType',
  reversed  : 'org.apache.cassandra.db.marshal.ReversedType',
  composite : 'org.apache.cassandra.db.marshal.CompositeType',
  empty     : 'org.apache.cassandra.db.marshal.EmptyType',
  collection: 'org.apache.cassandra.db.marshal.ColumnToCollectionType'
});
var cqlNames = Object.freeze({
  frozen: 'frozen',
  list: 'list',
  'set': 'set',
  map: 'map',
  tuple: 'tuple',
  empty: 'empty',
  duration: 'duration'
});
var singleTypeNames = Object.freeze({
  'org.apache.cassandra.db.marshal.UTF8Type':           dataTypes.varchar,
  'org.apache.cassandra.db.marshal.AsciiType':          dataTypes.ascii,
  'org.apache.cassandra.db.marshal.UUIDType':           dataTypes.uuid,
  'org.apache.cassandra.db.marshal.TimeUUIDType':       dataTypes.timeuuid,
  'org.apache.cassandra.db.marshal.Int32Type':          dataTypes.int,
  'org.apache.cassandra.db.marshal.BytesType':          dataTypes.blob,
  'org.apache.cassandra.db.marshal.FloatType':          dataTypes.float,
  'org.apache.cassandra.db.marshal.DoubleType':         dataTypes.double,
  'org.apache.cassandra.db.marshal.BooleanType':        dataTypes.boolean,
  'org.apache.cassandra.db.marshal.InetAddressType':    dataTypes.inet,
  'org.apache.cassandra.db.marshal.SimpleDateType':     dataTypes.date,
  'org.apache.cassandra.db.marshal.TimeType':           dataTypes.time,
  'org.apache.cassandra.db.marshal.ShortType':          dataTypes.smallint,
  'org.apache.cassandra.db.marshal.ByteType':           dataTypes.tinyint,
  'org.apache.cassandra.db.marshal.DateType':           dataTypes.timestamp,
  'org.apache.cassandra.db.marshal.TimestampType':      dataTypes.timestamp,
  'org.apache.cassandra.db.marshal.LongType':           dataTypes.bigint,
  'org.apache.cassandra.db.marshal.DecimalType':        dataTypes.decimal,
  'org.apache.cassandra.db.marshal.IntegerType':        dataTypes.varint,
  'org.apache.cassandra.db.marshal.CounterColumnType':  dataTypes.counter
});
var singleFqTypeNamesLength = Object.keys(singleTypeNames).reduce(function (previous, current) {
  return current.length > previous ? current.length : previous;
}, 0);
var durationTypeName = 'org.apache.cassandra.db.marshal.DurationType';
var nullValueBuffer = utils.allocBufferFromArray([255, 255, 255, 255]);
var unsetValueBuffer = utils.allocBufferFromArray([255, 255, 255, 254]);

/**
 * Serializes and deserializes to and from a CQL type and a Javascript Type.
 * @param {Number} protocolVersion
 * @param {ClientOptions} options
 * @constructor
 */
function Encoder(protocolVersion, options) {
  this.encodingOptions = options.encoding || utils.emptyObject;
  defineInstanceMembers.call(this);
  this.setProtocolVersion(protocolVersion);
  setEncoders.call(this);
  if (this.encodingOptions.copyBuffer) {
    this.handleBuffer = handleBufferCopy;
  }
  else {
    this.handleBuffer = handleBufferRef;
  }
}

/**
 * Declares the privileged instance members.
 * @private
 */
function defineInstanceMembers() {
  /**
   * Sets the protocol version and the encoding/decoding methods depending on the protocol version
   * @param {Number} value
   * @ignore
   * @internal
   */
  this.setProtocolVersion = function (value) {
    this.protocolVersion = value;
    //Set the collection serialization based on the protocol version
    this.decodeCollectionLength = decodeCollectionLengthV3;
    this.getLengthBuffer = getLengthBufferV3;
    this.collectionLengthSize = 4;
    if (!types.protocolVersion.uses4BytesCollectionLength(this.protocolVersion)) {
      this.decodeCollectionLength = decodeCollectionLengthV2;
      this.getLengthBuffer = getLengthBufferV2;
      this.collectionLengthSize = 2;
    }
  };
  var customDecoders = {};
  var customEncoders = {};
  // Decoding methods
  this.decodeBlob = function (bytes) {
    return this.handleBuffer(bytes);
  };
  this.decodeCustom = function (bytes, typeName) {
    var handler = customDecoders[typeName];
    if (handler) {
      return handler.call(this, bytes);
    }
    return this.handleBuffer(bytes);
  };
  this.decodeDuration = function (bytes) {
    return types.Duration.fromBuffer(bytes);
  };
  this.decodeUtf8String = function (bytes) {
    return bytes.toString('utf8');
  };
  this.decodeAsciiString = function (bytes) {
    return bytes.toString('ascii');
  };
  this.decodeBoolean = function (bytes) {
    return !!bytes.readUInt8(0);
  };
  this.decodeDouble = function (bytes) {
    return bytes.readDoubleBE(0);
  };
  this.decodeFloat = function (bytes) {
    return bytes.readFloatBE(0);
  };
  this.decodeInt = function (bytes) {
    return bytes.readInt32BE(0);
  };
  this.decodeSmallint = function (bytes) {
    return bytes.readInt16BE(0);
  };
  this.decodeTinyint = function (bytes) {
    return bytes.readInt8(0);
  };
  this.decodeLong = function (bytes) {
    return Long.fromBuffer(bytes);
  };
  this.decodeVarint = function (bytes) {
    return Integer.fromBuffer(bytes);
  };
  this.decodeDecimal = function(bytes) {
    return BigDecimal.fromBuffer(bytes);
  };
  this.decodeTimestamp = function(bytes) {
    return new Date(this.decodeLong(bytes).toNumber());
  };
  this.decodeDate = function (bytes) {
    return types.LocalDate.fromBuffer(bytes);
  };
  this.decodeTime = function (bytes) {
    return types.LocalTime.fromBuffer(bytes);
  };
  /*
   * Reads a list from bytes
   */
  this.decodeList = function (bytes, subtype) {
    var totalItems = this.decodeCollectionLength(bytes, 0);
    var offset = this.collectionLengthSize;
    var list = new Array(totalItems);
    for(var i = 0; i < totalItems; i++) {
      //bytes length of the item
      var length = this.decodeCollectionLength(bytes, offset);
      offset += this.collectionLengthSize;
      //slice it
      list[i] = this.decode(bytes.slice(offset, offset+length), subtype);
      offset += length;
    }
    return list;
  };
  /*
   * Reads a Set from bytes
   */
  this.decodeSet = function (bytes, subtype) {
    var arr = this.decodeList(bytes, subtype);
    if (this.encodingOptions.set) {
      var setConstructor = this.encodingOptions.set;
      return new setConstructor(arr);
    }
    return arr;
  };
  /*
   * Reads a map (key / value) from bytes
   */
  this.decodeMap = function (bytes, subtypes) {
    var map;
    var totalItems = this.decodeCollectionLength(bytes, 0);
    var offset = this.collectionLengthSize;
    var self = this;
    function readValues(callback, thisArg) {
      for (var i = 0; i < totalItems; i++) {
        var keyLength = self.decodeCollectionLength(bytes, offset);
        offset += self.collectionLengthSize;
        var key = self.decode(bytes.slice(offset, offset + keyLength), subtypes[0]);
        offset += keyLength;
        var valueLength = self.decodeCollectionLength(bytes, offset);
        offset += self.collectionLengthSize;
        if (valueLength < 0) {
          callback.call(thisArg, key, null);
          continue;
        }
        var value = self.decode(bytes.slice(offset, offset + valueLength), subtypes[1]);
        offset += valueLength;
        callback.call(thisArg, key, value);
      }
    }
    if (this.encodingOptions.map) {
      var mapConstructor = this.encodingOptions.map;
      map = new mapConstructor();
      readValues(map.set, map);
    }
    else {
      map = {};
      readValues(function (key, value) {
        map[key] = value;
      });
    }
    return map;
  };
  this.decodeUuid = function (bytes) {
    return new types.Uuid(this.handleBuffer(bytes));
  };
  this.decodeTimeUuid = function (bytes) {
    return new types.TimeUuid(this.handleBuffer(bytes));
  };
  this.decodeInet = function (bytes) {
    return new types.InetAddress(this.handleBuffer(bytes));
  };
  /**
   * Decodes a user defined type into an object
   * @param {Buffer} bytes
   * @param {{fields: Array}} udtInfo
   * @private
   */
  this.decodeUdt = function (bytes, udtInfo) {
    var result = {};
    var offset = 0;
    for (var i = 0; i < udtInfo.fields.length && offset < bytes.length; i++) {
      //bytes length of the field value
      var length = bytes.readInt32BE(offset);
      offset += 4;
      //slice it
      var field = udtInfo.fields[i];
      if (length < 0) {
        result[field.name] = null;
        continue;
      }
      result[field.name] = this.decode(bytes.slice(offset, offset+length), field.type);
      offset += length;
    }
    return result;
  };
  this.decodeTuple = function (bytes, tupleInfo) {
    var elements = new Array(tupleInfo.length);
    var offset = 0;
    for (var i = 0; i < tupleInfo.length; i++) {
      var length = bytes.readInt32BE(offset);
      offset += 4;
      if (length < 0) {
        elements[i] = null;
        continue;
      }
      elements[i] = this.decode(bytes.slice(offset, offset+length), tupleInfo[i]);
      offset += length;
    }
    return new types.Tuple(elements);
  };
  //Encoding methods
  this.encodeFloat = function (value) {
    if (typeof value !== 'number') {
      throw new TypeError('Expected Number, obtained ' + util.inspect(value));
    }
    var buf = utils.allocBufferUnsafe(4);
    buf.writeFloatBE(value, 0);
    return buf;
  };
  this.encodeDouble = function (value) {
    if (typeof value !== 'number') {
      throw new TypeError('Expected Number, obtained ' + util.inspect(value));
    }
    var buf = utils.allocBufferUnsafe(8);
    buf.writeDoubleBE(value, 0);
    return buf;
  };
  /**
   * @param {Date|String|Long|Number} value
   * @private
   */
  this.encodeTimestamp = function (value) {
    var originalValue = value;
    if (typeof value === 'string') {
      value = new Date(value);
    }
    if (value instanceof Date) {
      //milliseconds since epoch
      value = value.getTime();
      if (isNaN(value)) {
        throw new TypeError('Invalid date: ' + originalValue);
      }
    }
    //noinspection JSCheckFunctionSignatures
    return this.encodeLong(value);
  };
  /**
   * @param {Date|String|LocalDate} value
   * @returns {Buffer}
   * @throws {TypeError}
   * @private
   */
  this.encodeDate = function (value) {
    var originalValue = value;
    try {
      if (typeof value === 'string') {
        value = types.LocalDate.fromString(value);
      }
      if (value instanceof Date) {
        value = types.LocalDate.fromDate(value);
      }
    }
    catch (err) {
      //Wrap into a TypeError
      throw new TypeError('LocalDate could not be parsed ' + err);
    }
    if (!(value instanceof types.LocalDate)) {
      throw new TypeError('Expected Date/String/LocalDate, obtained ' + util.inspect(originalValue));
    }
    return value.toBuffer();
  };
  /**
   * @param {String|LocalDate} value
   * @returns {Buffer}
   * @throws {TypeError}
   * @private
   */
  this.encodeTime = function (value) {
    var originalValue = value;
    try {
      if (typeof value === 'string') {
        value = types.LocalTime.fromString(value);
      }
    }
    catch (err) {
      //Wrap into a TypeError
      throw new TypeError('LocalTime could not be parsed ' + err);
    }
    if (!(value instanceof types.LocalTime)) {
      throw new TypeError('Expected String/LocalTime, obtained ' + util.inspect(originalValue));
    }
    return value.toBuffer();
  };
  /**
   * @param {Uuid|String|Buffer} value
   * @private
   */
  this.encodeUuid = function (value) {
    if (typeof value === 'string') {
      try {
        value = types.Uuid.fromString(value);
      }
      catch (err) {
        throw new TypeError(err.message);
      }
    }
    if (value instanceof types.Uuid) {
      value = value.getBuffer();
    }
    if (!(value instanceof Buffer)) {
      throw new TypeError('Not a valid Uuid, expected Uuid/String/Buffer, obtained ' + util.inspect(value));
    }
    return value;
  };
  /**
   * @param {String|InetAddress|Buffer} value
   * @returns {Buffer}
   * @private
   */
  this.encodeInet = function (value) {
    if (typeof value === 'string') {
      value = types.InetAddress.fromString(value);
    }
    if (value instanceof types.InetAddress) {
      value = value.getBuffer();
    }
    if (!(value instanceof Buffer)) {
      throw new TypeError('Not a valid Inet, expected InetAddress/Buffer, obtained ' + util.inspect(value));
    }
    return value;
  };
  /**
   * @param {Long|Buffer|String|Number} value
   * @private
   */
  this.encodeLong = function (value) {
    if (typeof value === 'number') {
      value = Long.fromNumber(value);
    }
    if (typeof value === 'string') {
      value = Long.fromString(value);
    }
    var buf = null;
    if (value instanceof Buffer) {
      buf = value;
    }
    if (value instanceof Long) {
      //noinspection JSCheckFunctionSignatures
      buf = Long.toBuffer(value);
    }
    if (buf === null) {
      throw new TypeError('Not a valid bigint, expected Long/Number/String/Buffer, obtained ' + util.inspect(value));
    }
    return buf;
  };
  /**
   * @param {Integer|Buffer|String|Number} value
   * @returns {Buffer}
   * @private
   */
  this.encodeVarint = function (value) {
    if (typeof value === 'number') {
      value = Integer.fromNumber(value);
    }
    if (typeof value === 'string') {
      value = Integer.fromString(value);
    }
    var buf = null;
    if (value instanceof Buffer) {
      buf = value;
    }
    if (value instanceof Integer) {
      buf = Integer.toBuffer(value);
    }
    if (buf === null) {
      throw new TypeError('Not a valid varint, expected Integer/Number/String/Buffer, obtained ' + util.inspect(value));
    }
    return buf;
  };
  /**
   * @param {BigDecimal|Buffer|String|Number} value
   * @returns {Buffer}
   * @private
   */
  this.encodeDecimal = function (value) {
    if (typeof value === 'number') {
      value = BigDecimal.fromNumber(value);
    }
    if (typeof value === 'string') {
      value = BigDecimal.fromString(value);
    }
    var buf = null;
    if (value instanceof Buffer) {
      buf = value;
    }
    if (value instanceof BigDecimal) {
      buf = BigDecimal.toBuffer(value);
    }
    if (buf === null) {
      throw new TypeError('Not a valid varint, expected BigDecimal/Number/String/Buffer, obtained ' + util.inspect(value));
    }
    return buf;
  };
  this.encodeString = function (value, encoding) {
    if (typeof value !== 'string') {
      throw new TypeError('Not a valid text value, expected String obtained ' + util.inspect(value));
    }
    return utils.allocBufferFromString(value, encoding);
  };
  this.encodeUtf8String = function (value) {
    return this.encodeString(value, 'utf8');
  };
  this.encodeAsciiString = function (value) {
    return this.encodeString(value, 'ascii');
  };
  this.encodeBlob = function (value) {
    if (!(value instanceof Buffer)) {
      throw new TypeError('Not a valid blob, expected Buffer obtained ' + util.inspect(value));
    }
    return value;
  };
  this.encodeCustom = function (value, name) {
    if (value instanceof Buffer) {
      return value;
    }
    var handler = customEncoders[name];
    if (handler) {
      return handler.call(this, value);
    }
    throw new TypeError('No encoding handler found for type ' + name);
  };
  this.encodeDuration = function (value) {
    if (!(value instanceof types.Duration)) {
      throw new TypeError('Not a valid duration, expected Duration/Buffer obtained ' + util.inspect(value));
    }
    return value.toBuffer();
  };
  /**
   * @param {Boolean} value
   * @returns {Buffer}
   * @private
   */
  this.encodeBoolean = function (value) {
    return utils.allocBufferFromArray([(value ? 1 : 0)]);
  };
  /**
   * @param {Number|String} value
   * @private
   */
  this.encodeInt = function (value) {
    if (isNaN(value)) {
      throw new TypeError('Expected Number, obtained ' + util.inspect(value));
    }
    var buf = utils.allocBufferUnsafe(4);
    buf.writeInt32BE(value, 0);
    return buf;
  };
  /**
   * @param {Number|String} value
   * @private
   */
  this.encodeSmallint = function (value) {
    if (isNaN(value)) {
      throw new TypeError('Expected Number, obtained ' + util.inspect(value));
    }
    var buf = utils.allocBufferUnsafe(2);
    buf.writeInt16BE(value, 0);
    return buf;
  };
  /**
   * @param {Number|String} value
   * @private
   */
  this.encodeTinyint = function (value) {
    if (isNaN(value)) {
      throw new TypeError('Expected Number, obtained ' + util.inspect(value));
    }
    var buf = utils.allocBufferUnsafe(1);
    buf.writeInt8(value, 0);
    return buf;
  };
  this.encodeList = function (value, subtype) {
    if (!util.isArray(value)) {
      throw new TypeError('Not a valid list value, expected Array obtained ' + util.inspect(value));
    }
    if (value.length === 0) {
      return null;
    }
    var parts = [];
    parts.push(this.getLengthBuffer(value));
    for (var i=0;i < value.length;i++) {
      var val = value[i];
      if (val === null || typeof val === 'undefined' || val === types.unset) {
        throw new TypeError('A collection can\'t contain null or unset values');
      }
      var bytes = this.encode(val, subtype);
      //include item byte length
      parts.push(this.getLengthBuffer(bytes));
      //include item
      parts.push(bytes);
    }
    return Buffer.concat(parts);
  };
  this.encodeSet = function (value, subtype) {
    if (this.encodingOptions.set && value instanceof this.encodingOptions.set) {
      var arr = [];
      value.forEach(function (x) {
        arr.push(x);
      });
      return this.encodeList(arr, subtype);
    }
    return this.encodeList(value, subtype);
  };
  /**
   * Serializes a map into a Buffer
   * @param value
   * @param {Array} [subtypes]
   * @returns {Buffer}
   * @private
   */
  this.encodeMap = function (value, subtypes) {
    var parts = [];
    var propCounter = 0;
    var keySubtype = null;
    var valueSubtype = null;
    var self = this;
    if (subtypes) {
      keySubtype = subtypes[0];
      valueSubtype = subtypes[1];
    }
    function addItem(val, key) {
      if (key === null || typeof key === 'undefined' || key === types.unset) {
        throw new TypeError('A map can\'t contain null or unset keys');
      }
      if (val === null || typeof val === 'undefined' || val === types.unset) {
        throw new TypeError('A map can\'t contain null or unset values');
      }
      var keyBuffer = self.encode(key, keySubtype);
      //include item byte length
      parts.push(self.getLengthBuffer(keyBuffer));
      //include item
      parts.push(keyBuffer);
      //value
      var valueBuffer = self.encode(val, valueSubtype);
      //include item byte length
      parts.push(self.getLengthBuffer(valueBuffer));
      //include item
      if (valueBuffer !== null) {
        parts.push(valueBuffer);
      }
      propCounter++;
    }
    if (this.encodingOptions.map && value instanceof this.encodingOptions.map) {
      //Use Map#forEach() method to iterate
      value.forEach(addItem);
    }
    else {
      //Use object
      for (var key in value) {
        if (!value.hasOwnProperty(key)) {
          continue;
        }
        var val = value[key];
        addItem(val, key);
      }
    }

    parts.unshift(this.getLengthBuffer(propCounter));
    return Buffer.concat(parts);
  };
  this.encodeUdt = function (value, udtInfo) {
    var parts = [];
    var totalLength = 0;
    for (var i = 0; i < udtInfo.fields.length; i++) {
      var field = udtInfo.fields[i];
      var item = this.encode(value[field.name], field.type);
      if (!item) {
        parts.push(nullValueBuffer);
        totalLength += 4;
        continue;
      }
      if (item === types.unset) {
        parts.push(unsetValueBuffer);
        totalLength += 4;
        continue;
      }
      var lengthBuffer = utils.allocBufferUnsafe(4);
      lengthBuffer.writeInt32BE(item.length, 0);
      parts.push(lengthBuffer);
      parts.push(item);
      totalLength += item.length + 4;
    }
    return Buffer.concat(parts, totalLength);
  };
  this.encodeTuple = function (value, tupleInfo) {
    var parts = [];
    var totalLength = 0;
    for (var i = 0; i < tupleInfo.length; i++) {
      var type = tupleInfo[i];
      var item = this.encode(value.get(i), type);
      if (!item) {
        parts.push(nullValueBuffer);
        totalLength += 4;
        continue;
      }
      if (item === types.unset) {
        parts.push(unsetValueBuffer);
        totalLength += 4;
        continue;
      }
      var lengthBuffer = utils.allocBufferUnsafe(4);
      lengthBuffer.writeInt32BE(item.length, 0);
      parts.push(lengthBuffer);
      parts.push(item);
      totalLength += item.length + 4;
    }
    return Buffer.concat(parts, totalLength);
  };

  /**
   * If not provided, it uses the array of buffers or the parameters and hints to build the routingKey
   * @param {Array} params
   * @param {QueryOptions} options
   * @param [keys] parameter keys and positions
   * @throws TypeError
   * @internal
   * @ignore
   */
  this.setRoutingKey = function (params, options, keys) {
    var totalLength;
    if (util.isArray(options.routingKey)) {
      if (options.routingKey.length === 1) {
        options.routingKey = options.routingKey[0];
        return;
      }
      //Is a Composite key
      totalLength = 0;
      for (var i = 0; i < options.routingKey.length; i++) {
        var item = options.routingKey[i];
        if (!item) {
          //An routing key part may be null/undefined if provided by user
          //Or when there is a hardcoded parameter in the query
          //Clear the routing key
          options.routingKey = null;
          return;
        }
        totalLength += item.length + 3;
      }
      //Set the buffer containing the contents of the previous Array of buffers as routing key
      options.routingKey = concatRoutingKey(options.routingKey, totalLength);
      return;
    }
    if (options.routingKey instanceof Buffer || !params || params.length === 0) {
      //There is already a routing key
      // or no parameter indexes for routing were provided
      // or there are no parameters to build the routing key
      return;
    }
    var parts = [];
    totalLength = 0;
    if (options.routingIndexes) {
      totalLength = this._encodeRoutingKeyParts(parts, options.routingIndexes, params, options.hints);
    }
    if (options.routingNames && keys) {
      totalLength = this._encodeRoutingKeyParts(parts, options.routingNames, params, options.hints, keys);
    }
    if (totalLength === 0) {
      options.routingKey = null;
      return;
    }
    if (parts.length === 1) {
      options.routingKey = parts[0];
      return;
    }
    //its a composite partition key
    options.routingKey = concatRoutingKey(parts, totalLength);
  };

  /**
   * @param {Array} parts
   * @param {Array} routingIndexes
   * @param {Array} params
   * @param {Array} hints
   * @param {Object} [keys]
   * @returns {Number} The total length
   * @private
   */
  this._encodeRoutingKeyParts = function (parts, routingIndexes, params, hints, keys) {
    hints = hints || utils.emptyArray;
    var totalLength = 0;
    for (var i = 0; i < routingIndexes.length; i++) {
      var paramIndex = routingIndexes[i];
      if (typeof paramIndex === 'undefined') {
        //probably undefined (parameter not found) or bad input from the user
        return 0;
      }
      if (keys) {
        //is composed of parameter names
        paramIndex = keys[paramIndex];
      }
      var item = this.encode(params[paramIndex], hints[paramIndex]);
      if (!item) {
        //bad input from the user
        return 0;
      }
      totalLength += item.length + 3;
      parts.push(item);
    }
    return totalLength;
  };
  /**
   * Parses a CQL name string into data type information
   * @param {String} keyspace
   * @param {String} typeName
   * @param {Number} startIndex
   * @param {Number|null} length
   * @param {Function} udtResolver
   * @param {Function} callback Callback invoked with err and  {{code: number, info: Object|Array|null, options: {frozen: Boolean}}}
   * @internal
   * @ignore
   */
  this.parseTypeName = function (keyspace, typeName, startIndex, length, udtResolver, callback) {
    startIndex = startIndex || 0;
    if (!length) {
      length = typeName.length;
    }
    var dataType = {
      code: 0,
      info: null,
      options: {
        frozen: false
      }
    };
    var innerTypes;
    if (typeName.indexOf("'", startIndex) === startIndex) {
      //If quoted, this is a custom type.
      dataType.info = typeName.substr(startIndex+1, length-2);
      return callback(null, dataType);
    }
    if (!length) {
      length = typeName.length;
    }
    if (typeName.indexOf(cqlNames.frozen, startIndex) === startIndex) {
      //Remove the frozen token
      startIndex += cqlNames.frozen.length + 1;
      length -= cqlNames.frozen.length + 2;
      dataType.options.frozen = true;
    }
    if (typeName.indexOf(cqlNames.list, startIndex) === startIndex) {
      //move cursor across the name and bypass the angle brackets
      startIndex += cqlNames.list.length + 1;
      length -= cqlNames.list.length + 2;
      innerTypes = parseParams(typeName, startIndex, length, '<', '>');
      if (innerTypes.length !== 1) {
        return callback(new TypeError('Not a valid type ' + typeName));
      }
      dataType.code = dataTypes.list;
      return this.parseTypeName(keyspace, innerTypes[0], 0, null, udtResolver, function (err, childType) {
        if (err) {
          return callback(err);
        }
        dataType.info = childType;
        callback(null, dataType);
      });
    }
    if (typeName.indexOf(cqlNames.set, startIndex) === startIndex) {
      //move cursor across the name and bypass the angle brackets
      startIndex += cqlNames.set.length + 1;
      length -= cqlNames.set.length + 2;
      innerTypes = parseParams(typeName, startIndex, length, '<', '>');
      if (innerTypes.length !== 1) {
        return callback(new TypeError('Not a valid type ' + typeName));
      }
      dataType.code = dataTypes.set;
      return this.parseTypeName(keyspace, innerTypes[0], 0, null, udtResolver, function (err, childType) {
        if (err) {
          return callback(err);
        }
        dataType.info = childType;
        callback(null, dataType);
      });
    }
    if (typeName.indexOf(cqlNames.map, startIndex) === startIndex) {
      //move cursor across the name and bypass the angle brackets
      startIndex += cqlNames.map.length + 1;
      length -= cqlNames.map.length + 2;
      innerTypes = parseParams(typeName, startIndex, length, '<', '>');
      //It should contain the key and value types
      if (innerTypes.length !== 2) {
        return callback(new TypeError('Not a valid type ' + typeName));
      }
      dataType.code = dataTypes.map;
      return this._parseChildTypes(keyspace, dataType, innerTypes, udtResolver, callback);
    }
    if (typeName.indexOf(cqlNames.tuple, startIndex) === startIndex) {
      //move cursor across the name and bypass the angle brackets
      startIndex += cqlNames.tuple.length + 1;
      length -= cqlNames.tuple.length + 2;
      innerTypes = parseParams(typeName, startIndex, length, '<', '>');
      if (innerTypes.length < 1) {
        throw new TypeError('Not a valid type ' + typeName);
      }
      dataType.code = dataTypes.tuple;
      return this._parseChildTypes(keyspace, dataType, innerTypes, udtResolver, callback);
    }
    var quoted = typeName.indexOf('"', startIndex) === startIndex;
    if (quoted) {
      //Remove quotes
      startIndex++;
      length -= 2;
    }
    //Quick check if its a single type
    if (startIndex > 0) {
      typeName = typeName.substr(startIndex, length);
    }
    // Un-escape double quotes if quoted.
    if (quoted) {
      typeName = typeName.replace('""', '"');
    }
    var typeCode = dataTypes[typeName];
    if (typeof typeCode === 'number') {
      dataType.code = typeCode;
      return callback(null, dataType);
    }
    if (typeName === cqlNames.duration) {
      dataType.info = durationTypeName;
      return callback(null, dataType);
    }
    if (typeName === cqlNames.empty) {
      //set as custom
      dataType.info = 'empty';
      return callback(null, dataType);
    }
    udtResolver(keyspace, typeName, function (err, udtInfo) {
      if (err) {
        return callback(err);
      }
      if (udtInfo) {
        dataType.code = dataTypes.udt;
        dataType.info = udtInfo;
        return callback(null, dataType);
      }
      callback(new TypeError('Not a valid type "' + typeName + '"'));
    });
  };
  /**
   * @param {String} keyspace
   * @param dataType
   * @param {Array} typeNames
   * @param {Function} udtResolver
   * @param {Function} callback
   * @private
   */
  this._parseChildTypes = function (keyspace, dataType, typeNames, udtResolver, callback) {
    var self = this;
    utils.mapSeries(typeNames, function (name, next) {
      self.parseTypeName(keyspace, name.trim(), 0, null, udtResolver, next);
    }, function (err, childTypes) {
      if (err) {
        return callback(err);
      }
      dataType.info = childTypes;
      callback(null, dataType);
    });
  };

  /**
   * Parses a Cassandra fully-qualified class name string into data type information
   * @param {String} typeName
   * @param {Number} [startIndex]
   * @param {Number} [length]
   * @throws TypeError
   * @returns {{code: number, info: Object|Array|null, options: {frozen: Boolean, reversed: Boolean}}}
   * @internal
   * @ignore
   */
  this.parseFqTypeName = function (typeName, startIndex, length) {
    var dataType = {
      code: 0,
      info: null,
      options: {
        reversed: false,
        frozen: false
      }
    };
    startIndex = startIndex || 0;
    var innerTypes;
    if (!length) {
      length = typeName.length;
    }
    if (length > complexTypeNames.reversed.length && typeName.indexOf(complexTypeNames.reversed) === startIndex) {
      //Remove the reversed token
      startIndex += complexTypeNames.reversed.length + 1;
      length -= complexTypeNames.reversed.length + 2;
      dataType.options.reversed = true;
    }
    if (length > complexTypeNames.frozen.length &&
        typeName.indexOf(complexTypeNames.frozen, startIndex) === startIndex) {
      //Remove the frozen token
      startIndex += complexTypeNames.frozen.length + 1;
      length -= complexTypeNames.frozen.length + 2;
      dataType.options.frozen = true;
    }
    if (typeName === complexTypeNames.empty) {
      //set as custom
      dataType.info = 'empty';
      return dataType;
    }
    //Quick check if its a single type
    if (length <= singleFqTypeNamesLength) {
      if (startIndex > 0) {
        typeName = typeName.substr(startIndex, length);
      }
      var typeCode = singleTypeNames[typeName];
      if (typeof typeCode === 'number') {
        dataType.code = typeCode;
        return dataType;
      }
      throw new TypeError('Not a valid type "' + typeName + '"');
    }
    if (typeName.indexOf(complexTypeNames.list, startIndex) === startIndex) {
      //Its a list
      //org.apache.cassandra.db.marshal.ListType(innerType)
      //move cursor across the name and bypass the parenthesis
      startIndex += complexTypeNames.list.length + 1;
      length -= complexTypeNames.list.length + 2;
      innerTypes = parseParams(typeName, startIndex, length);
      if (innerTypes.length !== 1) {
        throw new TypeError('Not a valid type ' + typeName);
      }
      dataType.code = dataTypes.list;
      dataType.info = this.parseFqTypeName(innerTypes[0]);
      return dataType;
    }
    if (typeName.indexOf(complexTypeNames.set, startIndex) === startIndex) {
      //Its a set
      //org.apache.cassandra.db.marshal.SetType(innerType)
      //move cursor across the name and bypass the parenthesis
      startIndex += complexTypeNames.set.length + 1;
      length -= complexTypeNames.set.length + 2;
      innerTypes = parseParams(typeName, startIndex, length);
      if (innerTypes.length !== 1)
      {
        throw new TypeError('Not a valid type ' + typeName);
      }
      dataType.code = dataTypes.set;
      dataType.info = this.parseFqTypeName(innerTypes[0]);
      return dataType;
    }
    if (typeName.indexOf(complexTypeNames.map, startIndex) === startIndex) {
      //org.apache.cassandra.db.marshal.MapType(keyType,valueType)
      //move cursor across the name and bypass the parenthesis
      startIndex += complexTypeNames.map.length + 1;
      length -= complexTypeNames.map.length + 2;
      innerTypes = parseParams(typeName, startIndex, length);
      //It should contain the key and value types
      if (innerTypes.length !== 2) {
        throw new TypeError('Not a valid type ' + typeName);
      }
      dataType.code = dataTypes.map;
      dataType.info = [this.parseFqTypeName(innerTypes[0]), this.parseFqTypeName(innerTypes[1])];
      return dataType;
    }
    if (typeName.indexOf(complexTypeNames.udt, startIndex) === startIndex) {
      //move cursor across the name and bypass the parenthesis
      startIndex += complexTypeNames.udt.length + 1;
      length -= complexTypeNames.udt.length + 2;
      return this._parseUdtName(typeName, startIndex, length);
    }
    if (typeName.indexOf(complexTypeNames.tuple, startIndex) === startIndex) {
      //move cursor across the name and bypass the parenthesis
      startIndex += complexTypeNames.tuple.length + 1;
      length -= complexTypeNames.tuple.length + 2;
      innerTypes = parseParams(typeName, startIndex, length);
      if (innerTypes.length < 1) {
        throw new TypeError('Not a valid type ' + typeName);
      }
      dataType.code = dataTypes.tuple;
      dataType.info = innerTypes.map(function (x) {
        return this.parseFqTypeName(x);
      }, this);
      return dataType;
    }

    // Assume custom type if cannot be parsed up to this point.
    dataType.info = typeName.substr(startIndex, length);
    return dataType;
  };
  /**
   * Parses type names with composites
   * @param {String} typesString
   * @returns {{types: Array, isComposite: Boolean, hasCollections: Boolean}}
   * @internal
   * @ignore
   */
  this.parseKeyTypes = function (typesString) {
    var i = 0;
    var length = typesString.length;
    var isComposite = typesString.indexOf(complexTypeNames.composite) === 0;
    if (isComposite) {
      i = complexTypeNames.composite.length + 1;
      length--;
    }
    var types = [];
    var startIndex = i;
    var nested = 0;
    var inCollectionType = false;
    var hasCollections = false;
    //as collection types are not allowed, it is safe to split by ,
    while (++i < length) {
      switch (typesString[i]) {
        case ',':
          if (nested > 0) {
            break;
          }
          if (inCollectionType) {
            //remove type id
            startIndex = typesString.indexOf(':', startIndex) + 1;
          }
          types.push(typesString.substring(startIndex, i));
          startIndex = i + 1;
          break;
        case '(':
          if (nested === 0 && typesString.indexOf(complexTypeNames.collection, startIndex) === startIndex) {
            inCollectionType = true;
            hasCollections = true;
            //skip collection type
            i++;
            startIndex = i;
            break;
          }
          nested++;
          break;
        case ')':
          if (inCollectionType && nested === 0){
            types.push(typesString.substring(typesString.indexOf(':', startIndex) + 1, i));
            startIndex = i + 1;
            break;
          }
          nested--;
          break;
      }
    }
    if (startIndex < length) {
      types.push(typesString.substring(startIndex, length));
    }
    return {
      types: types.map(function (name) {
        return this.parseFqTypeName(name);
      }, this),
      hasCollections: hasCollections,
      isComposite: isComposite
    };
  };
  this._parseUdtName = function (typeName, startIndex, length) {
    var udtParams = parseParams(typeName, startIndex, length);
    if (udtParams.length < 2) {
      //It should contain at least the keyspace, name of the udt and a type
      throw new TypeError('Not a valid type ' + typeName);
    }
    var dataType = {
      code: dataTypes.udt,
      info: null
    };
    var udtInfo = {
      keyspace: udtParams[0],
      name: utils.allocBufferFromString(udtParams[1], 'hex').toString(),
      fields: []
    };
    for (var i = 2; i < udtParams.length; i++) {
      var p = udtParams[i];
      var separatorIndex = p.indexOf(':');
      var fieldType = this.parseFqTypeName(p, separatorIndex + 1, p.length - (separatorIndex + 1));
      udtInfo.fields.push({
        name: utils.allocBufferFromString(p.substr(0, separatorIndex), 'hex').toString(),
        type: fieldType
      });
    }
    dataType.info = udtInfo;
    return dataType;
  };

  customDecoders[durationTypeName] = this.decodeDuration;
  customEncoders[durationTypeName] = this.encodeDuration;
}

/**
 * Sets the encoder and decoder methods for this instance
 * @private
 */
function setEncoders() {
  //decoders
  var d = {};
  d[dataTypes.custom] = this.decodeCustom;
  d[dataTypes.ascii] = this.decodeAsciiString;
  d[dataTypes.bigint] = this.decodeLong;
  d[dataTypes.blob] = this.decodeBlob;
  d[dataTypes.boolean] = this.decodeBoolean;
  d[dataTypes.counter] = this.decodeLong;
  d[dataTypes.decimal] = this.decodeDecimal;
  d[dataTypes.double] = this.decodeDouble;
  d[dataTypes.float] = this.decodeFloat;
  d[dataTypes.int] = this.decodeInt;
  d[dataTypes.text] = this.decodeUtf8String;
  d[dataTypes.timestamp] = this.decodeTimestamp;
  d[dataTypes.uuid] = this.decodeUuid;
  d[dataTypes.varchar] = this.decodeUtf8String;
  d[dataTypes.varint] = this.decodeVarint;
  d[dataTypes.timeuuid] = this.decodeTimeUuid;
  d[dataTypes.inet] = this.decodeInet;
  d[dataTypes.date] = this.decodeDate;
  d[dataTypes.time] = this.decodeTime;
  d[dataTypes.smallint] = this.decodeSmallint;
  d[dataTypes.tinyint] = this.decodeTinyint;
  d[dataTypes.list] = this.decodeList;
  d[dataTypes.map] = this.decodeMap;
  d[dataTypes.set] = this.decodeSet;
  d[dataTypes.udt] = this.decodeUdt;
  d[dataTypes.tuple] = this.decodeTuple;

  //encoders
  var e = {};
  e[dataTypes.custom] = this.encodeCustom;
  e[dataTypes.ascii] = this.encodeAsciiString;
  e[dataTypes.bigint] = this.encodeLong;
  e[dataTypes.blob] = this.encodeBlob;
  e[dataTypes.boolean] = this.encodeBoolean;
  e[dataTypes.counter] = this.encodeLong;
  e[dataTypes.decimal] = this.encodeDecimal;
  e[dataTypes.double] = this.encodeDouble;
  e[dataTypes.float] = this.encodeFloat;
  e[dataTypes.int] = this.encodeInt;
  e[dataTypes.text] = this.encodeUtf8String;
  e[dataTypes.timestamp] = this.encodeTimestamp;
  e[dataTypes.uuid] = this.encodeUuid;
  e[dataTypes.varchar] = this.encodeUtf8String;
  e[dataTypes.varint] = this.encodeVarint;
  e[dataTypes.timeuuid] = this.encodeUuid;
  e[dataTypes.inet] = this.encodeInet;
  e[dataTypes.date] = this.encodeDate;
  e[dataTypes.time] = this.encodeTime;
  e[dataTypes.smallint] = this.encodeSmallint;
  e[dataTypes.tinyint] = this.encodeTinyint;
  e[dataTypes.list] = this.encodeList;
  e[dataTypes.map] = this.encodeMap;
  e[dataTypes.set] = this.encodeSet;
  e[dataTypes.udt] = this.encodeUdt;
  e[dataTypes.tuple] = this.encodeTuple;

  this.decoders = d;
  this.encoders = e;
}

/**
 * Decodes Cassandra bytes into Javascript values.
 * <p>
 * This is part of an <b>experimental</b> API, this can be changed future releases.
 * </p>
 * @param {Buffer} buffer Raw buffer to be decoded.
 * @param {Object} type An object containing the data type <code>code</code> and <code>info</code>.
 * @param {Number} type.code Type code.
 * @param {Object} [type.info] Additional information on the type for complex / nested types.
 */
Encoder.prototype.decode = function (buffer, type) {
  if (buffer === null) {
    return null;
  }
  var decoder = this.decoders[type.code];
  if (!decoder) {
    throw new Error('Unknown data type: ' + type.code);
  }
  return decoder.call(this, buffer, type.info);
};

/**
 * Encodes Javascript types into Buffer according to the Cassandra protocol.
 * <p>
 * This is part of an <b>experimental</b> API, this can be changed future releases.
 * </p>
 * @param {*} value The value to be converted.
 * @param {{code: number, info: *|Object}|String|Number} [typeInfo] The type information.
 * <p>It can be either a:</p>
 * <ul>
 *   <li>A <code>String</code> representing the data type.</li>
 *   <li>A <code>Number</code> with one of the values of {@link module:types~dataTypes dataTypes}.</li>
 *   <li>An <code>Object</code> containing the <code>type.code</code> as one of the values of
 *   {@link module:types~dataTypes dataTypes} and <code>type.info</code>.
 *   </li>
 * </ul>
 * @returns {Buffer}
 * @throws {TypeError} When there is an encoding error
 */
Encoder.prototype.encode = function (value, typeInfo) {
  if (value === undefined) {
    //defaults to null
    value = null;
    if (this.encodingOptions.useUndefinedAsUnset && this.protocolVersion >= 4) {
      //use undefined as unset
      value = types.unset;
    }
  }
  if (value === null) {
    return value;
  }
  if (value === types.unset) {
    if (!types.protocolVersion.supportsUnset(this.protocolVersion)) {
      throw new TypeError('Unset value can not be used for this version of Cassandra, protocol version: ' +
        this.protocolVersion);
    }
    return value;
  }
  /** @type {{code: Number, info: object}} */
  var type = {
    code: null,
    info: null
  };
  if (typeInfo) {
    if (typeof typeInfo === 'number') {
      type.code = typeInfo;
    }
    else if (typeof typeInfo === 'string') {
      type = dataTypes.getByName(typeInfo);
    }
    if (typeof typeInfo.code === 'number') {
      type.code = typeInfo.code;
      type.info = typeInfo.info;
    }
    if (typeof type.code !== 'number') {
      throw new TypeError('Type information not valid, only String and Number values are valid hints');
    }
  }
  else {
    //Lets guess
    type = Encoder.guessDataType(value);
    if (!type) {
      throw new TypeError('Target data type could not be guessed, you should use prepared statements for accurate type mapping. Value: ' + util.inspect(value));
    }
  }
  var encoder = this.encoders[type.code];
  if (!encoder) {
    throw new Error('Type not supported ' + type.code);
  }
  return encoder.call(this, value, type.info);
};

/**
 * Try to guess the Cassandra type to be stored, based on the javascript value type
 * @param value
 * @returns {{code: number, info: object}|null}
 * @ignore
 * @internal
 */
Encoder.guessDataType = function (value) {
  var code = null;
  var info = null;
  var esTypeName = (typeof value);
  if (esTypeName === 'number') {
    code = dataTypes.double;
  }
  else if (esTypeName === 'string') {
    code = dataTypes.text;
    if (value.length === 36 && uuidRegex.test(value)){
      code = dataTypes.uuid;
    }
  }
  else if (esTypeName === 'boolean') {
    code = dataTypes.boolean;
  }
  else if (value instanceof Buffer) {
    code = dataTypes.blob;
  }
  else if (value instanceof Date) {
    code = dataTypes.timestamp;
  }
  else if (value instanceof Long) {
    code = dataTypes.bigint;
  }
  else if (value instanceof Integer) {
    code = dataTypes.varint;
  }
  else if (value instanceof BigDecimal) {
    code = dataTypes.decimal;
  }
  else if (value instanceof types.Uuid) {
    code = dataTypes.uuid;
  }
  else if (value instanceof types.InetAddress) {
    code = dataTypes.inet;
  }
  else if (value instanceof types.Tuple) {
    code = dataTypes.tuple;
  }
  else if (value instanceof types.LocalDate) {
    code = dataTypes.date;
  }
  else if (value instanceof types.LocalTime) {
    code = dataTypes.time;
  }
  else if (value instanceof types.Duration) {
    code = dataTypes.custom;
    info = durationTypeName;
  }
  else if (util.isArray(value)) {
    code = dataTypes.list;
  }
  if (code === null) {
    return null;
  }
  return { code: code, info: info };
};

/**
 * Gets a buffer containing with the bytes (BE) representing the collection length for protocol v2 and below
 * @param {Buffer|Number} value
 * @returns {Buffer}
 * @private
 */
function getLengthBufferV2(value) {
  if (!value) {
    return int16Zero;
  }
  var lengthBuffer = utils.allocBufferUnsafe(2);
  if (typeof value === 'number') {
    lengthBuffer.writeUInt16BE(value, 0);
  }
  else {
    lengthBuffer.writeUInt16BE(value.length, 0);
  }
  return lengthBuffer;
}

/**
 * Gets a buffer containing with the bytes (BE) representing the collection length for protocol v3 and above
 * @param {Buffer|Number} value
 * @returns {Buffer}
 * @private
 */
function getLengthBufferV3(value) {
  if (!value) {
    return int32Zero;
  }
  var lengthBuffer = utils.allocBufferUnsafe(4);
  if (typeof value === 'number') {
    lengthBuffer.writeInt32BE(value, 0);
  }
  else {
    lengthBuffer.writeInt32BE(value.length, 0);
  }
  return lengthBuffer;
}

/**
 * @param {Buffer} buffer
 * @private
 */
function handleBufferCopy(buffer) {
  if (buffer === null) {
    return null;
  }
  return utils.copyBuffer(buffer);
}

/**
 * @param {Buffer} buffer
 * @private
 */
function handleBufferRef(buffer) {
  return buffer;
}
/**
 * Decodes collection length for protocol v3 and above
 * @param bytes
 * @param offset
 * @returns {Number}
 * @private
 */
function decodeCollectionLengthV3(bytes, offset) {
  return bytes.readInt32BE(offset);
}
/**
 * Decodes collection length for protocol v2 and below
 * @param bytes
 * @param offset
 * @returns {Number}
 * @private
 */
function decodeCollectionLengthV2(bytes, offset) {
  return bytes.readUInt16BE(offset);
}

/**
 * @param {String} value
 * @param {Number} startIndex
 * @param {Number} length
 * @param {String} [open]
 * @param {String} [close]
 * @returns {Array}
 * @private
 */
function parseParams(value, startIndex, length, open, close) {
  open = open || '(';
  close = close || ')';
  var types = [];
  var paramStart = startIndex;
  var level = 0;
  for (var i = startIndex; i < startIndex + length; i++) {
    var c = value[i];
    if (c === open) {
      level++;
    }
    if (c === close) {
      level--;
    }
    if (level === 0 && c === ',') {
      types.push(value.substr(paramStart, i - paramStart));
      paramStart = i + 1;
    }
  }
  //Add the last one
  types.push(value.substr(paramStart, length - (paramStart - startIndex)));
  return types;
}

/**
 * @param {Array.<Buffer>} parts
 * @param {Number} totalLength
 * @returns {Buffer}
 * @private
 */
function concatRoutingKey(parts, totalLength) {
  var routingKey = utils.allocBufferUnsafe(totalLength);
  var offset = 0;
  for (var i = 0; i < parts.length; i++) {
    var item = parts[i];
    routingKey.writeUInt16BE(item.length, offset);
    offset += 2;
    item.copy(routingKey, offset);
    offset += item.length;
    routingKey[offset] = 0;
    offset++;
  }
  return routingKey;
}

module.exports = Encoder;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var events = __webpack_require__(4);
var util = __webpack_require__(0);

var types = __webpack_require__(2);
var utils = __webpack_require__(1);
var FrameHeader = types.FrameHeader;

/**
 * Contains the logic to write all the different types to the frame.
 * @param {Number} opcode
 * @constructor
 */
function FrameWriter(opcode) {
  if (!opcode) {
    throw new Error('Opcode not provided');
  }
  this.buffers = [];
  this.opcode = opcode;
  this.bodyLength = 0;
}

FrameWriter.prototype.add = function(buf) {
  this.buffers.push(buf);
  this.bodyLength += buf.length;
};

FrameWriter.prototype.writeShort = function(num) {
  var buf = utils.allocBufferUnsafe(2);
  buf.writeUInt16BE(num, 0);
  this.add(buf);
};

FrameWriter.prototype.writeInt = function(num) {
  var buf = utils.allocBufferUnsafe(4);
  buf.writeInt32BE(num, 0);
  this.add(buf);
};

/** @param {Long} num */
FrameWriter.prototype.writeLong = function(num) {
  this.add(types.Long.toBuffer(num));
};

/**
 * Writes bytes according to Cassandra <int byteLength><bytes>
 * @param {Buffer|null|types.unset} bytes
 */
FrameWriter.prototype.writeBytes = function(bytes) {
  if (bytes === null) {
    //Only the length buffer containing -1
    this.writeInt(-1);
    return;
  }
  if (bytes === types.unset) {
    this.writeInt(-2);
    return;
  }
  //Add the length buffer
  this.writeInt(bytes.length);
  //Add the actual buffer
  this.add(bytes);
};

/**
 * Writes a buffer according to Cassandra protocol: bytes.length (2) + bytes
 * @param {Buffer} bytes
 */
FrameWriter.prototype.writeShortBytes = function(bytes) {
  if(bytes === null) {
    //Only the length buffer containing -1
    this.writeShort(-1);
    return;
  }
  //Add the length buffer
  this.writeShort(bytes.length);
  //Add the actual buffer
  this.add(bytes);
};

/**
 * Writes a single byte
 * @param {Number} num Value of the byte, a number between 0 and 255.
 */
FrameWriter.prototype.writeByte = function (num) {
  this.add(utils.allocBufferFromArray([num]));
};

FrameWriter.prototype.writeString = function(str) {
  if (typeof str === "undefined") {
    throw new Error("can not write undefined");
  }
  var len = Buffer.byteLength(str, 'utf8');
  var buf = utils.allocBufferUnsafe(2 + len);
  buf.writeUInt16BE(len, 0);
  buf.write(str, 2, buf.length-2, 'utf8');
  this.add(buf);
};

FrameWriter.prototype.writeLString = function(str) {
  var len = Buffer.byteLength(str, 'utf8');
  var buf = utils.allocBufferUnsafe(4 + len);
  buf.writeInt32BE(len, 0);
  buf.write(str, 4, buf.length-4, 'utf8');
  this.add(buf);
};

FrameWriter.prototype.writeStringList = function (values) {
  this.writeShort(values.length);
  values.forEach(this.writeString, this);
};

FrameWriter.prototype.writeCustomPayload = function (payload) {
  var keys = Object.keys(payload);
  this.writeShort(keys.length);
  keys.forEach(function (k) {
    this.writeString(k);
    this.writeBytes(payload[k]);
  }, this);
};

FrameWriter.prototype.writeStringMap = function (map) {
  var keys = [];
  for (var k in map) {
    if (map.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  this.writeShort(keys.length);

  for(var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this.writeString(key);
    this.writeString(map[key]);
  }
};

/**
 * @param {Number} version
 * @param {Number} streamId
 * @param {Number} [flags] Header flags
 * @returns {Buffer}
 * @throws {TypeError}
 */
FrameWriter.prototype.write = function (version, streamId, flags) {
  var header = new FrameHeader(version, flags || 0, streamId, this.opcode, this.bodyLength);
  var headerBuffer = header.toBuffer();
  this.buffers.unshift(headerBuffer);
  return Buffer.concat(this.buffers, headerBuffer.length + this.bodyLength);
};

/**
 * Represents a queue that process one write at a time (FIFO).
 * @param {Socket} netClient
 * @param {Encoder} encoder
 * @param {ClientOptions} options
 * @extends {EventEmitter}
 */
function WriteQueue (netClient, encoder, options) {
  WriteQueue.super_.call(this);
  this.netClient = netClient;
  this.encoder = encoder;
  this.isRunning = false;
  /** @type {Array<{operation: OperationState, callback: Function}>} */
  this.queue = [];
  this.coalescingThreshold = options.socketOptions.coalescingThreshold;
  this.error = null;
}

util.inherits(WriteQueue, events.EventEmitter);
/**
 * Enqueues a new request
 * @param {OperationState} operation
 * @param {Function} callback The write callback.
 */
WriteQueue.prototype.push = function (operation, callback) {
  var self = this;
  if (this.error) {
    // There was a write error, there is no point in further trying to write to the socket.
    return process.nextTick(function writePushError() {
      callback(self.error);
    });
  }
  this.queue.push({ operation: operation, callback: callback});
  this.run();
};

WriteQueue.prototype.run = function () {
  if (!this.isRunning) {
    this.process();
  }
};

WriteQueue.prototype.process = function () {
  var self = this;
  utils.whilst(
    function condition() {
      return self.queue.length > 0;
    },
    function whileProcess(next) {
      self.isRunning = true;
      var buffers = [];
      var callbacks = [];
      var totalLength = 0;
      while (totalLength < self.coalescingThreshold && self.queue.length > 0) {
        var writeItem = self.queue.shift();
        try {
          var data = writeItem.operation.request.write(self.encoder, writeItem.operation.streamId);
          totalLength += data.length;
          buffers.push(data);
          callbacks.push(writeItem.callback);
        }
        catch (err) {
          writeItem.callback(err);
          // Break and flush what we have
          break;
        }
      }
      if (buffers.length === 0) {
        // No need to invoke socket.write()
        return next();
      }
      // Before invoking socket.write(), mark that the request has been written to avoid race conditions.
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i]();
      }
      self.netClient.write(Buffer.concat(buffers, totalLength), function socketWriteCallback(err) {
        if (err) {
          self.setWriteError(err);
        }
        // Allow IO between writes
        setImmediate(next);
      });
    },
    function loopFinished() {
      // The queue is now empty
      self.isRunning = false;
    }
  );
};

/**
 * Emits the 'error' event and callbacks items that haven't been written and clears them from the queue.
 * @param err
 */
WriteQueue.prototype.setWriteError = function (err) {
  err.isSocketError = true;
  this.error = new types.DriverError('Socket was closed');
  this.error.isSocketError = true;
  // Use an special flag for items that haven't been written
  this.error.requestNotWritten = true;
  this.error.innerError = err;
  var q = this.queue;
  // Not more items can be added to the queue.
  this.queue = utils.emptyArray;
  for (var i = 0; i < q.length; i++) {
    var item = q[i];
    // Use the error marking that it was not written
    item.callback(this.error);
  }
};

exports.WriteQueue = WriteQueue;
exports.FrameWriter = FrameWriter;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var errors = __webpack_require__(3);
var utils = __webpack_require__(1);
var RequestHandler = __webpack_require__(20);

/**
 * Encapsulates the logic for dealing with the different prepare request and response flows, including failover when
 * trying to prepare a query.
 * @param {Client} client
 * @param {LoadBalancingPolicy} loadBalancing
 * @constructor
 */
function PrepareHandler(client, loadBalancing) {
  this._client = client;
  this.logEmitter = client.options.logEmitter;
  this._loadBalancing = loadBalancing;
}

/**
 * @param {Client} client
 * @param {LoadBalancingPolicy} loadBalancing
 * @param {String} query
 * @param {String} keyspace
 * @param {Function} callback
 * @static
 */
PrepareHandler.getPrepared = function (client, loadBalancing, query, keyspace, callback) {
  var info = client.metadata.getPreparedInfo(keyspace, query);
  if (info.queryId) {
    return callback(null, info.queryId, info.meta);
  }
  info.once('prepared', callback);
  if (info.preparing) {
    // It's already being prepared
    return;
  }
  var instance = new PrepareHandler(client, loadBalancing);
  instance._prepare(info, query, keyspace);
};

/**
 * @param {Client} client
 * @param {LoadBalancingPolicy} loadBalancing
 * @param {Array} queries
 * @param {String} keyspace
 * @param {Function} callback
 * @static
 */
PrepareHandler.getPreparedMultiple = function (client, loadBalancing, queries, keyspace, callback) {
  var result = new Array(queries.length);
  utils.forEachOf(queries, function eachQuery(item, index, next) {
    var query;
    if (item) {
      query = typeof item === 'string' ? item : item.query;
    }
    if (typeof query !== 'string') {
      return next(new errors.ArgumentError('Query item should be a string'));
    }
    PrepareHandler.getPrepared(client, loadBalancing, query, keyspace, function getPrepareCb(err, id, meta) {
      result[index] = {
        query: query,
        params: item.params,
        queryId: id,
        meta: meta
      };
      next();
    });
  }, function eachEnded(err) {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

/**
 * Prepares the query on a single host or on all hosts depending on the options.
 * Uses the info 'prepared' event to emit the result.
 * @param {Object} info
 * @param {String} query
 * @param {String} keyspace
 */
PrepareHandler.prototype._prepare = function (info, query, keyspace) {
  info.preparing = true;
  var self = this;
  this._loadBalancing.newQueryPlan(keyspace, null, function (err, iterator) {
    if (err) {
      info.preparing = false;
      return info.emit('prepared', err);
    }
    self._prepareWithQueryPlan(info, iterator, null, query, keyspace);
  });
};

/**
 * @param {Object} info
 * @param {Iterator} iterator
 * @param {Object|null} triedHosts
 * @param {String} query
 * @param {String} keyspace
 * @private
 */
PrepareHandler.prototype._prepareWithQueryPlan = function (info, iterator, triedHosts, query, keyspace) {
  triedHosts = triedHosts || {};
  var self = this;
  RequestHandler.borrowNextConnection(iterator, triedHosts, this._client.profileManager, keyspace,
    function borrowCallback(err, connection, host) {
      if (err) {
        return self._onPrepareError(err, host, triedHosts, info, iterator, query, keyspace);
      }
      connection.prepareOnce(query, function prepareOnceCallback(err, response) {
        if (err) {
          return self._onPrepareError(err, host, triedHosts, info, iterator, query, keyspace);
        }
        if (self._client.options.prepareOnAllHosts) {
          return self._prepareOnAllHosts(info, response, host, iterator, query, keyspace);
        }
        self._onPrepareSuccess(info, response);
      });
    });
};

PrepareHandler.prototype._onPrepareSuccess = function (info, response) {
  info.preparing = false;
  info.queryId = response.id;
  info.meta = response.meta;
  this._client.metadata.setPreparedById(info);
  info.emit('prepared', null, info.queryId, info.meta);
};

PrepareHandler.prototype._onPrepareError = function (err, host, triedHosts, info, iterator, query, keyspace) {
  if (err.isSocketError || err instanceof errors.OperationTimedOutError) {
    var self = this;
    triedHosts[host.address] = err;
    return self._prepareWithQueryPlan(info, iterator, triedHosts, query, keyspace);
  }
  info.preparing = false;
  err.query = query;
  return info.emit('prepared', err);
};

/**
 * Prepares all queries on a single host.
 * @param {Host} host
 * @param {Array} allPrepared
 * @param {Function} callback
 */
PrepareHandler.prepareAllQueries = function (host, allPrepared, callback) {
  var anyKeyspaceQueries = [];
  var queriesByKeyspace = {};
  allPrepared.forEach(function (info) {
    var arr = anyKeyspaceQueries;
    if (info.keyspace) {
      arr = queriesByKeyspace[info.keyspace] = (queriesByKeyspace[info.keyspace] || []);
    }
    arr.push(info.query);
  });
  utils.eachSeries(Object.keys(queriesByKeyspace), function eachKeyspace(keyspace, next) {
    PrepareHandler._borrowAndPrepare(host, keyspace, queriesByKeyspace[keyspace], next);
  }, function (err) {
    if (err) {
      return callback(err);
    }
    PrepareHandler._borrowAndPrepare(host, null, anyKeyspaceQueries, callback);
  });
};

/**
 * Borrows a connection from the host and prepares the queries provided.
 * @param {Host} host
 * @param {String} keyspace
 * @param {Array} queries
 * @param {Function} callback
 * @private
 */
PrepareHandler._borrowAndPrepare = function (host, keyspace, queries, callback) {
  if (queries.length === 0) {
    return callback();
  }
  RequestHandler.borrowFromHost(host, keyspace, function borrowCallback(err, connection) {
    if (err) {
      return callback(err);
    }
    utils.each(queries, function prepareEach(query, next) {
      connection.prepareOnce(query, next);
    }, callback);
  });
};

PrepareHandler.prototype.log = utils.log;

/**
 * Prepares the provided query on all hosts, except the host provided.
 * @param {Object} info
 * @param {Object} response
 * @param {Host} hostToAvoid
 * @param {Iterator} iterator
 * @param {String} query
 * @param {String} keyspace
 * @private
 */
PrepareHandler.prototype._prepareOnAllHosts = function (info, response, hostToAvoid, iterator, query, keyspace) {
  var self = this;
  utils.each(utils.iteratorToArray(iterator), function (host, next) {
    if (host.address === hostToAvoid.address) {
      return next();
    }
    RequestHandler.borrowFromHost(host, keyspace, function borrowCallback(err, connection) {
      if (err) {
        // Don't mind about issues with the pool in this case
        return next();
      }
      connection.prepareOnce(query, function (err) {
        if (err) {
          // There has been error
          self.log('verbose', util.format('Unexpected error while preparing query (%s) on %s', query, host.address));
        }
        return next();
      });
    });
  }, function eachEnded() {
    self._onPrepareSuccess(info, response);
  });
};

module.exports = PrepareHandler;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var errors = __webpack_require__(3);
var types = __webpack_require__(2);
var utils = __webpack_require__(1);
var RequestExecution = __webpack_require__(53);

/**
 * Handles a request to Cassandra, dealing with host fail-over and retries on error
 * @param {Request} request
 * @param {QueryOptions} options
 * @param {Client} client Client instance used to retrieve and set the keyspace.
 * @constructor
 */
function RequestHandler(request, options, client) {
  this.client = client;
  this.loadBalancingPolicy = options.executionProfile.loadBalancing;
  this.retryPolicy = options.retry;
  this._speculativeExecutionPlan = client.options.policies.speculativeExecution.newPlan(
    client.keyspace, request.query || request.queries);
  this.logEmitter = client.options.logEmitter;
  this.request = request;
  this.requestOptions = options;
  this.stackContainer = null;
  this.triedHosts = {};
  // start at -1 as first request does not count.
  this.speculativeExecutions = -1;
  this._hostIterator = null;
  this._callback = null;
  this._newExecutionTimeout = null;
  this._executions = [];
}

/**
 * Borrows a connection iterating from the query plan one or more times, until finding an open connection with the
 * keyspace set.
 * It invokes the callback with the err, connection and host as parameters.
 * The error can only be a NoHostAvailableError instance.
 * @param {Iterator} iterator
 * @param {Object} triedHosts
 * @param {ProfileManager} profileManager
 * @param {String} keyspace
 * @param {Function} callback
 */
RequestHandler.borrowNextConnection = function(iterator, triedHosts, profileManager, keyspace, callback) {
  triedHosts = triedHosts || {};
  var host = getNextHost(iterator, profileManager, triedHosts);
  if (host === null) {
    return callback(new errors.NoHostAvailableError(triedHosts));
  }

  RequestHandler.borrowFromHost(host, keyspace, function borrowFromHostCallback(err, connection) {
    if (err) {
      triedHosts[host.address] = err;
      if (connection) {
        host.removeFromPool(connection);
      }
      // The error occurred on a different tick, so there is no risk of issuing a large number sync recursive calls
      return RequestHandler.borrowNextConnection(iterator, triedHosts, profileManager, keyspace, callback);
    }
    triedHosts[host.address] = null;
    callback(null, connection, host);
  });
};

/**
 * Borrows a connection from the provided host, changing the current keyspace, if necessary.
 * @param {Host} host
 * @param {String} keyspace
 * @param {Function} callback
 */
RequestHandler.borrowFromHost = function (host, keyspace, callback) {
  host.borrowConnection(function (err, connection) {
    if (err) {
      return callback(err);
    }
    if (!keyspace || keyspace === connection.keyspace) {
      // Connection is ready to be used
      return callback(null, connection);
    }
    connection.changeKeyspace(keyspace, function (err) {
      if (err) {
        return callback(err, connection);
      }
      callback(null, connection);
    });
  });
};

/**
 * Gets the next host from the query plan.
 * @param {Iterator} iterator
 * @param {ProfileManager} profileManager
 * @param {Object} triedHosts
 * @return {Host|null}
 * @private
 */
function getNextHost(iterator, profileManager, triedHosts) {
  var host;
  // Get a host that is UP in a sync loop
  while (true) {
    var item = iterator.next();
    if (item.done) {
      return null;
    }
    host = item.value;
    // set the distance relative to the client first
    var distance = profileManager.getDistance(host);
    if (distance === types.distance.ignored) {
      //If its marked as ignore by the load balancing policy, move on.
      continue;
    }
    if (host.isUp()) {
      break;
    }
    triedHosts[host.address] = 'Host considered as DOWN';
  }
  return host;
}

/**
 * Gets a connection from the next host according to the query plan or a NoHostAvailableError.
 * @param {Function} callback
 */
RequestHandler.prototype.getNextConnection = function (callback) {
  RequestHandler.borrowNextConnection(
    this._hostIterator, this.triedHosts, this.client.profileManager, this.client.keyspace, callback);
};

RequestHandler.prototype.log = utils.log;

/**
 * Gets an available connection and sends the request
 * @param {Function} callback
 */
RequestHandler.prototype.send = function (callback) {
  if (this.requestOptions.captureStackTrace) {
    Error.captureStackTrace(this.stackContainer = {});
  }
  var self = this;
  this.loadBalancingPolicy.newQueryPlan(this.client.keyspace, this.requestOptions, function newPlanCb(err, iterator) {
    if (err) {
      return callback(err);
    }
    self._hostIterator = iterator;
    self._callback = callback;
    self._startNewExecution();
  });
};

RequestHandler.prototype._startNewExecution = function () {
  var execution = new RequestExecution(this);
  this._executions.push(execution);
  var self = this;
  execution.start(function hostAcquired(host) {
    // This function is called when a connection to a host was successfully acquired and
    // the execution was not yet cancelled
    if (!self.requestOptions.isIdempotent) {
      return;
    }
    var delay = self._speculativeExecutionPlan.nextExecution(host);
    if (typeof delay !== 'number' || delay < 0) {
      return;
    }
    if (delay === 0) {
      // Multiple parallel executions
      return process.nextTick(function startNextInParallel() {
        // Unlike timers process.nextTick() handlers can't be cleared so we must be sure that the
        // the previous execution wasn't cancelled before issuing the next one.
        if (execution.wasCancelled()) {
          return;
        }
        self._startNewExecution();
      });
    }
    self._newExecutionTimeout = setTimeout(function startNextAfterDelay() {
      self._startNewExecution();
    }, delay);
  });
};

/**
 * Sets the keyspace in any connection that is already opened.
 * @param {Client} client
 * @param {Function} callback
 */
RequestHandler.setKeyspace = function (client, callback) {
  var connection;
  var hosts = client.hosts.values();
  for (var i = 0; i < hosts.length; i++) {
    var host = hosts[i];
    connection = host.getActiveConnection();
    if (connection) {
      break;
    }
  }
  if (!connection) {
    return callback(new errors.DriverInternalError('No active connection found'));
  }
  connection.changeKeyspace(client.keyspace, callback);
};

/**
 * @param {Error} err
 * @param {ResultSet} [result]
 */
RequestHandler.prototype.setCompleted = function (err, result) {
  if (this._newExecutionTimeout !== null) {
    clearTimeout(this._newExecutionTimeout);
  }
  // Mark all executions as cancelled
  for (var i = 0; i < this._executions.length; i++) {
    this._executions[i].cancel();
  }
  if (err) {
    if (this.requestOptions.captureStackTrace) {
      utils.fixStack(this.stackContainer.stack, err);
    }
    return this._callback(err);
  }
  if (result.info.warnings) {
    // Log the warnings from the response
    result.info.warnings.forEach(function (message, i, warnings) {
      this.log('warning', util.format(
        'Received warning (%d of %d) "%s" for "%s"',
        i + 1,
        warnings.length,
        message,
        this.request.query || 'batch'));
    }, this);
  }
  this._callback(null, result);
};

/**
 * @param {NoHostAvailableError} err
 * @param {RequestExecution} sender
 */
RequestHandler.prototype.handleNoHostAvailable = function (err, sender) {
  // Remove the execution
  var index = this._executions.indexOf(sender);
  this._executions.splice(index, 1);
  if (this._executions.length === 0) {
    // There aren't any other executions, we should report back to the user that there isn't
    // a host available for executing the request
    this.setCompleted(err);
  }
};

module.exports = RequestHandler;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var events = __webpack_require__(4);
var util = __webpack_require__(0);
/**
 * Module containing classes and fields related to metadata.
 * @module metadata
 */
var t = __webpack_require__(54);
var utils = __webpack_require__(1);
var errors = __webpack_require__(3);
var types = __webpack_require__(2);
var requests = __webpack_require__(5);
var schemaParserFactory = __webpack_require__(56);

/**
 * @const
 * @private
 */
var _selectTraceSession = "SELECT * FROM system_traces.sessions WHERE session_id=%s";
/**
 * @const
 * @private
 */
var _selectTraceEvents = "SELECT * FROM system_traces.events WHERE session_id=%s";
/**
 * @const
 * @private
 */
var _selectSchemaVersionPeers = "SELECT schema_version FROM system.peers";
/**
 * @const
 * @private
 */
var _selectSchemaVersionLocal = "SELECT schema_version FROM system.local";
/**
 * @const
 * @private
 */
var _traceMaxAttemps = 5;
/**
 * @const
 * @private
 */
var _traceAttemptDelay = 200;

/**
 * Represents cluster and schema information.
 * The metadata class acts as a internal state of the driver.
 * @param {ClientOptions} options
 * @param {ControlConnection} controlConnection Control connection used to retrieve information.
 * @constructor
 */
function Metadata (options, controlConnection) {
  if (!options) {
    throw new errors.ArgumentError('Options are not defined');
  }
  Object.defineProperty(this, 'options', { value: options, enumerable: false, writable: false});
  Object.defineProperty(this, 'controlConnection', { value: controlConnection, enumerable: false, writable: false});
  this.keyspaces = {};
  this._schemaParser = schemaParserFactory.getByVersion(controlConnection, this.getUdt.bind(this));
  var self = this;
  this._preparedQueries = new PreparedQueries(options.maxPrepared, function () {
    self.log.apply(self, arguments);
  });
}

/**
 * Sets the cassandra version
 * @internal
 * @ignore
 * @param {Array.<Number>} version
 */
Metadata.prototype.setCassandraVersion = function (version) {
  this._schemaParser = schemaParserFactory.getByVersion(
    this.controlConnection, this.getUdt.bind(this), version, this._schemaParser);
};

/**
 * @ignore
 * @param {String} partitionerName
 */
Metadata.prototype.setPartitioner = function (partitionerName) {
  if (/RandomPartitioner$/.test(partitionerName)) {
    return this.tokenizer = new t.RandomTokenizer();
  }
  if (/ByteOrderedPartitioner$/.test(partitionerName)) {
    return this.tokenizer = new t.ByteOrderedTokenizer();
  }
  return this.tokenizer = new t.Murmur3Tokenizer();
};

/**
 * Populates the information regarding primary replica per token, datacenters (+ racks) and sorted token ring.
 * @ignore
 * @param {HostMap} hosts
 */
Metadata.prototype.buildTokens = function (hosts) {
  if (!this.tokenizer) {
    return this.log('error', 'Tokenizer could not be determined');
  }
  //Get a sorted array of tokens
  var allSorted = [];
  //Get a map of <token, primaryHost>
  var primaryReplicas = {};
  //Depending on the amount of tokens, this could be an expensive operation
  var hostArray = hosts.values();
  var parser = this.tokenizer.parse;
  var compare = this.tokenizer.compare;
  var stringify = this.tokenizer.stringify;
  var datacenters = {};
  hostArray.forEach(function (h) {
    if (!h.tokens) {
      return;
    }
    h.tokens.forEach(function (tokenString) {
      var token = parser(tokenString);
      utils.insertSorted(allSorted, token, compare);
      primaryReplicas[stringify(token)] = h;
    });
    var dc = datacenters[h.datacenter];
    if (!dc) {
      dc = datacenters[h.datacenter] = {
        hostLength: 0,
        racks: new utils.HashSet()
      };
    }
    dc.hostLength++;
    dc.racks.add(h.rack);
  });
  //Primary replica for given token
  this.primaryReplicas = primaryReplicas;
  //All the tokens in ring order
  this.ring = allSorted;
  //Compute string versions as it's potentially expensive and frequently reused later
  this.ringTokensAsStrings = new Array(allSorted.length);
  for (var i = 0; i < allSorted.length; i++) {
    this.ringTokensAsStrings[i] = stringify(allSorted[i]);
  }
  //Datacenter metadata (host length and racks)
  this.datacenters = datacenters;
};

/**
 * Gets the keyspace metadata information and updates the internal state of the driver.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the keyspaces metadata refresh completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * @param {String} name Name of the keyspace.
 * @param {Function} [callback] Optional callback.
 */
Metadata.prototype.refreshKeyspace = function (name, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, true, function handler(cb) {
    this._refreshKeyspaceCb(name, cb);
  });
};

/**
 * @param {String} name
 * @param {Function} callback
 * @private
 */
Metadata.prototype._refreshKeyspaceCb = function (name, callback) {
  this.log('info', util.format('Retrieving keyspace %s metadata', name));
  var self = this;
  this._schemaParser.getKeyspace(name, function (err, ksInfo) {
    if (err) {
      self.log('error', 'There was an error while trying to retrieve keyspace information', err);
      return callback(err);
    }
    if (!ksInfo) {
      // the keyspace was dropped
      delete self.keyspaces[name];
      return callback();
    }
    // tokens are lazily init on the keyspace, once a replica from that keyspace is retrieved.
    self.keyspaces[ksInfo.name] = ksInfo;
    callback(null, ksInfo);
  });
};

/**
 * Gets the metadata information of all the keyspaces and updates the internal state of the driver.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the keyspace metadata refresh completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * @param {Boolean|Function} [waitReconnect] Determines if it should wait for reconnection in case the control connection is not
 * connected at the moment. Default: true.
 * @param {Function} [callback] Optional callback.
 */
Metadata.prototype.refreshKeyspaces = function (waitReconnect, callback) {
  if (typeof waitReconnect === 'function' || typeof waitReconnect === 'undefined') {
    callback = waitReconnect;
    waitReconnect = true;
  }

  return utils.promiseWrapper.call(this, this.options, callback, true, function handler(cb) {
    this._refreshKeyspacesCb(waitReconnect, cb);
  });
};

/**
 * @param {Boolean} waitReconnect
 * @param {Function} callback
 * @private
 */
Metadata.prototype._refreshKeyspacesCb = function (waitReconnect, callback) {
  this.log('info', 'Retrieving keyspaces metadata');
  var self = this;
  this._schemaParser.getKeyspaces(waitReconnect, function getKeyspacesCallback(err, keyspaces) {
    if (err) {
      self.log('error', 'There was an error while trying to retrieve keyspaces information', err);
      return callback(err);
    }
    self.keyspaces = keyspaces;
    callback(null, keyspaces);
  });
};

/**
 * Gets the host list representing the replicas that contain such partition.
 * <p>
 *   It uses the pre-loaded keyspace metadata to retrieve the replicas for a token for a given keyspace.
 *   When the keyspace metadata has not been loaded, it returns null.
 * </p>
 * @param {String} keyspaceName
 * @param {Buffer} tokenBuffer
 * @returns {Array}
 */
Metadata.prototype.getReplicas = function (keyspaceName, tokenBuffer) {
  if (!this.ring) {
    return null;
  }
  var keyspace;
  if (keyspaceName) {
    keyspace = this.keyspaces[keyspaceName];
    if (!keyspace) {
      // the keyspace was not found, the metadata should be loaded beforehand
      return null;
    }
  }
  var token = this.tokenizer.hash(tokenBuffer);
  var i = utils.binarySearch(this.ring, token, this.tokenizer.compare);
  if (i < 0) {
    i = ~i;
  }
  if (i >= this.ring.length) {
    //it circled back
    i = i % this.ring.length;
  }
  var closestToken = this.ringTokensAsStrings[i];

  if (!keyspaceName) {
    return [this.primaryReplicas[closestToken]];
  }
  if (!keyspace.replicas) {
    //Calculate replicas the first time for the keyspace
    keyspace.replicas =
      keyspace.tokenToReplica(this.tokenizer, this.ringTokensAsStrings, this.primaryReplicas, this.datacenters);
  }
  return keyspace.replicas[closestToken];
};

Metadata.prototype.log = utils.log;

/**
 * Gets the metadata information already stored associated to a prepared statement
 * @param {String} keyspaceName
 * @param {String} query
 * @internal
 * @ignore
 */
Metadata.prototype.getPreparedInfo = function (keyspaceName, query) {
  //overflow protection
  return this._preparedQueries.getOrAdd(keyspaceName, query);
};

/**
 * Clears the internal state related to the prepared statements.
 * Following calls to the Client using the prepare flag will re-prepare the statements.
 */
Metadata.prototype.clearPrepared = function () {
  this._preparedQueries.clear();
};

/** @ignore */
Metadata.prototype.getPreparedById = function (id) {
  return this._preparedQueries.getById(id);
};

/** @ignore */
Metadata.prototype.setPreparedById = function (info) {
  return this._preparedQueries.setById(info);
};

/** @ignore */
Metadata.prototype.getAllPrepared = function () {
  return this._preparedQueries.getAll();
};

/**
 * Gets the definition of an user-defined type.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * <p>
 * When trying to retrieve the same UDT definition concurrently, it will query once and invoke all callbacks
 * with the retrieved information.
 * </p>
 * @param {String} keyspaceName Name of the keyspace.
 * @param {String} name Name of the UDT.
 * @param {Function} [callback] The callback to invoke when retrieval completes.
 */
Metadata.prototype.getUdt = function (keyspaceName, name, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getUdtCb(keyspaceName, name, cb);
  });
};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getUdtCb = function (keyspaceName, name, callback) {
  var cache;
  if (this.options.isMetadataSyncEnabled) {
    var keyspace = this.keyspaces[keyspaceName];
    if (!keyspace) {
      return callback(null, null);
    }
    cache = keyspace.udts;
  }
  this._schemaParser.getUdt(keyspaceName, name, cache, callback);
};

/**
 * Gets the definition of a table.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * <p>
 * When trying to retrieve the same table definition concurrently, it will query once and invoke all callbacks
 * with the retrieved information.
 * </p>
 * @param {String} keyspaceName Name of the keyspace.
 * @param {String} name Name of the Table.
 * @param {Function} [callback] The callback with the err as a first parameter and the {@link TableMetadata} as
 * second parameter.
 */
Metadata.prototype.getTable = function (keyspaceName, name, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getTableCb(keyspaceName, name, cb);
  });
};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getTableCb = function (keyspaceName, name, callback) {
  var cache;
  if (this.options.isMetadataSyncEnabled) {
    var keyspace = this.keyspaces[keyspaceName];
    if (!keyspace) {
      return callback(null, null);
    }
    cache = keyspace.tables;
  }
  this._schemaParser.getTable(keyspaceName, name, cache, callback);
};

/**
 * Gets the definition of CQL functions for a given name.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * <p>
 * When trying to retrieve the same function definition concurrently, it will query once and invoke all callbacks
 * with the retrieved information.
 * </p>
 * @param {String} keyspaceName Name of the keyspace.
 * @param {String} name Name of the Function.
 * @param {Function} [callback] The callback with the err as a first parameter and the array of {@link SchemaFunction}
 * as second parameter.
 */
Metadata.prototype.getFunctions = function (keyspaceName, name, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getFunctionsCb(keyspaceName, name, cb);
  });
};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getFunctionsCb = function (keyspaceName, name, callback) {
  if (typeof callback !== 'function') {
    throw new errors.ArgumentError('Callback is not a function');
  }
  if (!keyspaceName || !name) {
    return callback(
      new errors.ArgumentError('You must provide the keyspace name and cql function name to retrieve the metadata'));
  }
  this._getFunctions(keyspaceName, name, false, function (err, functionsMap) {
    if (err) {
      return callback(err, null);
    }
    callback(null, utils.objectValues(functionsMap));
  });
};

/**
 * Gets a definition of CQL function for a given name and signature.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * <p>
 * When trying to retrieve the same function definition concurrently, it will query once and invoke all callbacks
 * with the retrieved information.
 * </p>
 * @param {String} keyspaceName Name of the keyspace
 * @param {String} name Name of the Function
 * @param {Array.<String>|Array.<{code, info}>} signature Array of types of the parameters.
 * @param {Function} [callback] The callback with the err as a first parameter and the {@link SchemaFunction} as second
 * parameter.
 */
Metadata.prototype.getFunction = function (keyspaceName, name, signature, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getSingleFunctionCb(keyspaceName, name, signature, false, cb);
  });
};

/**
 * Gets the definition of CQL aggregate for a given name.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * <p>
 * When trying to retrieve the same aggregates definition concurrently, it will query once and invoke all callbacks
 * with the retrieved information.
 * </p>
 * @param {String} keyspaceName Name of the keyspace
 * @param {String} name Name of the Function
 * @param {Function} [callback] The callback with the err as a first parameter and the array of {@link Aggregate} as
 * second parameter.
 */
Metadata.prototype.getAggregates = function (keyspaceName, name, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getAggregatesCb(keyspaceName, name, cb);
  });
};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getAggregatesCb = function (keyspaceName, name, callback) {
  if (typeof callback !== 'function') {
    throw new errors.ArgumentError('Callback is not a function');
  }
  if (!keyspaceName || !name) {
    return callback(new errors.ArgumentError('You must provide the keyspace name and cql aggregate name to retrieve the metadata'));
  }
  this._getFunctions(keyspaceName, name, true, function (err, functionsMap) {
    if (err) {
      return callback(err, null);
    }
    callback(null, utils.objectValues(functionsMap));
  });
};

/**
 * Gets a definition of CQL aggregate for a given name and signature.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * <p>
 * When trying to retrieve the same aggregate definition concurrently, it will query once and invoke all callbacks
 * with the retrieved information.
 * </p>
 * @param {String} keyspaceName Name of the keyspace
 * @param {String} name Name of the aggregate
 * @param {Array.<String>|Array.<{code, info}>} signature Array of types of the parameters.
 * @param {Function} [callback] The callback with the err as a first parameter and the {@link Aggregate} as second parameter.
 */
Metadata.prototype.getAggregate = function (keyspaceName, name, signature, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getSingleFunctionCb(keyspaceName, name, signature, true, cb);
  });
};

/**
 * Gets the definition of a CQL materialized view for a given name.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * <p>
 *   Note that, unlike the rest of the {@link Metadata} methods, this method does not cache the result for following
 *   calls, as the current version of the Cassandra native protocol does not support schema change events for
 *   materialized views. Each call to this method will produce one or more queries to the cluster.
 * </p>
 * @param {String} keyspaceName Name of the keyspace
 * @param {String} name Name of the materialized view
 * @param {Function} [callback] The callback with the err as a first parameter and the {@link MaterializedView} as
 * second parameter.
 */
Metadata.prototype.getMaterializedView = function (keyspaceName, name, callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getMaterializedViewCb(keyspaceName, name, cb);
  });
};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getMaterializedViewCb = function (keyspaceName, name, callback) {
  var cache;
  if (this.options.isMetadataSyncEnabled) {
    var keyspace = this.keyspaces[keyspaceName];
    if (!keyspace) {
      return callback(null, null);
    }
    cache = keyspace.views;
  }
  this._schemaParser.getMaterializedView(keyspaceName, name, cache, callback);
};

/**
 * Gets a map of cql function definitions or aggregates based on signature.
 * @param {String} keyspaceName
 * @param {String} name Name of the function or aggregate
 * @param {Boolean} aggregate
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getFunctions = function (keyspaceName, name, aggregate, callback) {
  var cache;
  if (this.options.isMetadataSyncEnabled) {
    var keyspace = this.keyspaces[keyspaceName];
    if (!keyspace) {
      return callback(null, null);
    }
    cache = aggregate ? keyspace.aggregates : keyspace.functions;
  }
  this._schemaParser.getFunctions(keyspaceName, name, aggregate, cache, callback);
};

/**
 * Gets a single cql function or aggregate definition
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Array} signature
 * @param {Boolean} aggregate
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getSingleFunctionCb = function (keyspaceName, name, signature, aggregate, callback) {
  if (typeof callback !== 'function') {
    throw new errors.ArgumentError('Callback is not a function');
  }
  if (!keyspaceName || !name) {
    return callback(
      new errors.ArgumentError('You must provide the keyspace name and cql function name to retrieve the metadata'));
  }
  if (!util.isArray(signature)) {
    return callback(new errors.ArgumentError('Signature must be an array of types'));
  }
  try {
    signature = signature.map(function (item) {
      if (typeof item === 'string') {
        return item;
      }
      return types.getDataTypeNameByCode(item);
    });
  }
  catch (err) {
    return callback(err);
  }
  this._getFunctions(keyspaceName, name, aggregate, function (err, functionsMap) {
    if (err) {
      return callback(err, null);
    }
    var f;
    if (functionsMap) {
      f = functionsMap['(' + signature.join(',') + ')'];
    }
    callback(null, f || null);
  });
};

/**
 * Gets the trace session generated by Cassandra when query tracing is enabled for the
 * query. The trace itself is stored in Cassandra in the <code>sessions</code> and
 * <code>events</code> table in the <code>system_traces</code> keyspace and can be
 * retrieve manually using the trace identifier.
 * <p>
 *   If a <code>callback</code> is provided, the callback is invoked when the metadata retrieval completes.
 *   Otherwise, it returns a <code>Promise</code>.
 * </p>
 * @param {Uuid} traceId Identifier of the trace session.
 * @param {Number} [consistency] The consistency level to obtain the trace.
 * @param {Function} [callback] The callback with the err as first parameter and the query trace as second parameter.
 */
Metadata.prototype.getTrace = function (traceId, consistency, callback) {
  if (!callback && typeof consistency === 'function') {
    // Both callback and consistency are optional parameters
    // In this case, the second parameter is the callback
    callback = consistency;
    consistency = null;
  }
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._getTraceCb(traceId, consistency, cb);
  });
};

/**
 * @param {Uuid} traceId
 * @param {Number} consistency
 * @param {Function} callback
 * @private
 */
Metadata.prototype._getTraceCb = function (traceId, consistency, callback) {
  var trace;
  var attempts = 0;
  var requestOptions = { consistency: consistency };
  var sessionRequest = new requests.QueryRequest(util.format(_selectTraceSession, traceId), null, requestOptions);
  var eventsRequest = new requests.QueryRequest(util.format(_selectTraceEvents, traceId), null, requestOptions);
  var self = this;
  utils.whilst(function condition() {
    return !trace && (attempts++ < _traceMaxAttemps);
  }, function iterator(next) {
    self.controlConnection.query(sessionRequest, function (err, result) {
      if (err) {
        return next(err);
      }
      var sessionRow = result.rows[0];
      if (!sessionRow || !sessionRow['duration']) {
        return setTimeout(next, _traceAttemptDelay);
      }
      trace = {
        requestType: sessionRow['request'],
        coordinator: sessionRow['coordinator'],
        parameters: sessionRow['parameters'],
        startedAt: sessionRow['started_at'],
        duration: sessionRow['duration'],
        clientAddress: sessionRow['client'],
        events: []
      };
      self.controlConnection.query(eventsRequest, function (err, result) {
        if (err) {
          return next(err);
        }
        result.rows.forEach(function (row) {
          trace.events.push({
            id: row['event_id'],
            activity: row['activity'],
            source: row['source'],
            elapsed: row['source_elapsed'],
            thread: row['thread']
          });
        });
        next();
      });
    });
  }, function getTraceEnded(err) {
    if (!err && !trace) {
      err = new Error(util.format('Trace %s could not fully retrieved after %d attempts', traceId, _traceMaxAttemps));
    }
    callback(err, trace);
  });
};

/**
 * Uses the metadata to fill the user provided parameter hints
 * @param {String} keyspace
 * @param {Array} hints
 * @param {Function} callback
 * @internal
 * @ignore
 */
Metadata.prototype.adaptUserHints = function (keyspace, hints, callback) {
  var udts = [];
  //check for udts and get the metadata
  function checkUdtTypes(type) {
    if (type.code === types.dataTypes.udt) {
      var udtName = type.info.split('.');
      type.info = {
        keyspace: udtName[0],
        name: udtName[1]
      };
      if (!type.info.name) {
        if (!keyspace) {
          throw new TypeError('No keyspace specified for udt: ' + udtName.join('.'));
        }
        //use the provided keyspace
        type.info.name = type.info.keyspace;
        type.info.keyspace = keyspace;
      }
      udts.push(type);
      return;
    }
    if (!type.info) {
      return;
    }
    if (type.code === types.dataTypes.list || type.code === types.dataTypes.set) {
      return checkUdtTypes(type.info);
    }
    if (type.code === types.dataTypes.map) {
      checkUdtTypes(type.info[0]);
      checkUdtTypes(type.info[1]);
    }
  }
  for (var i = 0; i < hints.length; i++) {
    var hint = hints[i];
    if (typeof hint !== 'string') {
      continue;
    }
    try {
      var type = types.dataTypes.getByName(hint);
      checkUdtTypes(type);
      hints[i] = type;
    }
    catch (err) {
      return callback(err);
    }
  }
  var self = this;
  utils.each(udts, function (type, next) {
    self.getUdt(type.info.keyspace, type.info.name, function (err, udtInfo) {
      if (err) {
        return next(err);
      }
      if (!udtInfo) {
        return next(new TypeError('User defined type not found: ' + type.info.keyspace + '.' + type.info.name));
      }
      type.info = udtInfo;
      next();
    });
  }, callback);
};

/**
 * Uses the provided connection to query for the local schema version
 * @param {Connection} connection
 * @param {Function} callback
 * @internal
 * @ignore
 */
Metadata.prototype.getLocalSchemaVersion = function (connection, callback) {
  var request = new requests.QueryRequest(_selectSchemaVersionLocal, null, null);
  connection.sendStream(request, utils.emptyObject, function (err, result) {
    var version;
    if (!err && result && result.rows && result.rows.length === 1) {
      version = result.rows[0]['schema_version'];
    }
    callback(err, version);
  });
};

/**
 * Uses the provided connection to query for peers' schema version
 * @param {Connection} connection
 * @param {Function} callback
 * @internal
 * @ignore
 */
Metadata.prototype.getPeersSchemaVersions = function (connection, callback) {
  var request = new requests.QueryRequest(_selectSchemaVersionPeers, null, null);
  connection.sendStream(request, utils.emptyObject, function (err, result) {
    var versions = [];
    if (!err && result && result.rows) {
      for (var i = 0; i < result.rows.length; i++) {
        var schemaVersion = result.rows[i]['schema_version'];
        if (schemaVersion) {
          versions.push(schemaVersion);
        }
      }
    }
    callback(err, versions);
  });
};

/**
 * Allows to store prepared queries and retrieval by query or query id.
 * @param {Number} maxPrepared
 * @param {Function} logger
 * @constructor
 * @ignore
 */
function PreparedQueries(maxPrepared, logger) {
  this.length = 0;
  this._maxPrepared = maxPrepared;
  this._mapByKey = {};
  this._mapById = {};
  this._logger = logger;
}

PreparedQueries.prototype._getKey = function (keyspace, query) {
  return ( keyspace || '' ) + query;
};

PreparedQueries.prototype.getOrAdd = function (keyspace, query) {
  var key = this._getKey(keyspace, query);
  var info = this._mapByKey[key];
  if (info) {
    return info;
  }
  this._validateOverflow();
  info = new events.EventEmitter();
  info.setMaxListeners(0);
  info.query = query;
  // The keyspace in which it was prepared
  info.keyspace = keyspace;
  this._mapByKey[key] = info;
  this.length++;
  return info;
};

PreparedQueries.prototype._validateOverflow = function () {
  if (this.length < this._maxPrepared) {
    return;
  }
  var toRemove = [];
  this._logger('warning',
    'Prepared statements exceeded maximum. This could be caused by preparing queries that contain parameters');
  var existingKeys = Object.keys(this._mapByKey);
  for (var i = 0; i < existingKeys.length && this.length - toRemove.length < this._maxPrepared; i++) {
    var info = this._mapByKey[existingKeys[i]];
    if (!info.queryId) {
      // Only remove queries that contain queryId
      continue;
    }
    toRemove.push(info);
  }
  toRemove.forEach(function (item) {
    delete this._mapByKey[item.query];
    delete this._mapById[item.queryId];
    this.length--;
  }, this);
};

PreparedQueries.prototype.setById = function (info) {
  this._mapById[info.queryId.toString('hex')] = info;
};

PreparedQueries.prototype.getById = function (id) {
  return this._mapById[id.toString('hex')];
};

PreparedQueries.prototype.clear = function () {
  this._mapByKey = {};
  this._mapById = {};
  this.length = 0;
};

PreparedQueries.prototype.getAll = function () {
  return utils.objectValues(this._mapByKey).filter(function (info) {
    return !!info.queryId;
  });
};

module.exports = Metadata;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var events = __webpack_require__(4);
/**
 * Creates a new instance of DataCollection
 * @param {String} name Name of the data object.
 * @classdesc Describes a table or a view
 * @alias module:metadata~DataCollection
 * @constructor
 * @abstract
 */
function DataCollection(name) {
  events.EventEmitter.call(this);
  this.setMaxListeners(0);
  //private
  Object.defineProperty(this, 'loading', { value: false, enumerable: false, writable: true });
  Object.defineProperty(this, 'loaded', { value: false, enumerable: false, writable: true });
  /**
   * Name of the object
   * @type {String}
   */
  this.name = name;
  /**
   * False-positive probability for SSTable Bloom filters.
   * @type {number}
   */
  this.bloomFilterFalsePositiveChance = 0;
  /**
   * Level of caching: all, keys_only, rows_only, none
   * @type {String}
   */
  this.caching = null;
  /**
   * A human readable comment describing the table.
   * @type {String}
   */
  this.comment = null;
  /**
   * Specifies the time to wait before garbage collecting tombstones (deletion markers)
   * @type {number}
   */
  this.gcGraceSeconds = 0;
  /**
   * Compaction strategy class used for the table.
   * @type {String}
   */
  this.compactionClass = null;
  /**
   * Associative-array containing the compaction options keys and values.
   * @type {Object}
   */
  this.compactionOptions = null;
  /**
   * Associative-array containing the compression options.
   * @type {Object}
   */
  this.compression = null;
  /**
   * Specifies the probability of read repairs being invoked over all replicas in the current data center.
   * @type {number}
   */
  this.localReadRepairChance = 0;
  /**
   * Specifies the probability with which read repairs should be invoked on non-quorum reads. The value must be between 0 and 1.
   * @type {number}
   */
  this.readRepairChance = 0;
  /**
   * An associative Array containing extra metadata for the table.
   * <p>
   * For Cassandra versions prior to 3.0.0, this method always returns {@code null}.
   * </p>
   * @type {Object}
   */
  this.extensions = null;
  /**
   * When compression is enabled, this option defines the probability
   * with which checksums for compressed blocks are checked during reads.
   * The default value for this options is 1.0 (always check).
   * <p>
   *   For Cassandra versions prior to 3.0.0, this method always returns {@code null}.
   * </p>
   * @type {Number|null}
   */
  this.crcCheckChance = null;
  /**
   * Whether the populate I/O cache on flush is set on this table.
   * @type {Boolean}
   */
  this.populateCacheOnFlush = false;
  /**
   * Returns the default TTL for this table.
   * <p>
   * Note: this option is not available in Cassandra 1.2 and will return 0 (no default TTL) when connected to 1.2 nodes.
   * </p>
   * @type {Number}
   */
  this.defaultTtl = 0;
  /**
   * * Returns the speculative retry option for this table.
   * <p>
   * Note: this option is not available in Cassandra 1.2 and will return "NONE" (no speculative retry) when connected
   * to 1.2 nodes.
   * </p>
   * @type {String}
   */
  this.speculativeRetry = 'NONE';
  /**
   * Returns the minimum index interval option for this table.
   * <p>
   *   Note: this option is available in Cassandra 2.1 and above, and will return {@code null} for earlier versions.
   * </p>
   * @type {Number|null}
   */
  this.minIndexInterval = 128;
  /**
   * Returns the maximum index interval option for this table.
   * <p>
   * Note: this option is available in Cassandra 2.1 and above, and will return {@code null} for earlier versions.
   * </p>
   * @type {Number|null}
   */
  this.maxIndexInterval = 2048;
  /**
   * Array describing the table columns.
   * @type {Array}
   */
  this.columns = null;
  /**
   * An associative Array of columns by name.
   * @type {Object}
   */
  this.columnsByName = null;
  /**
   * Array describing the columns that are part of the partition key.
   * @type {Array}
   */
  this.partitionKeys = [];
  /**
   * Array describing the columns that form the clustering key.
   * @type {Array}
   */
  this.clusteringKeys = [];
  /**
   * Array describing the clustering order of the columns in the same order as the clusteringKeys.
   * @type {Array}
   */
  this.clusteringOrder = [];
}

util.inherits(DataCollection, events.EventEmitter);

module.exports = DataCollection;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils = __webpack_require__(1);
var types = __webpack_require__(2);

/**
 * Creates a new instance of {@link ExecutionProfile}.
 * @classdesc
 * Represents a set configurations to be used in a statement execution to be used for a single {@link Client} instance.
 * <p>
 *   An {@link ExecutionProfile} instance should not be shared across different {@link Client} instances.
 * </p>
 * @param {String} name Name of the execution profile.
 * <p>
 *   Use <code>'default'</code> to specify that the new instance should be the default {@link ExecutionProfile} if no
 *   profile is specified in the execution.
 * </p>
 * @param {Object} [options] Profile options, when any of the options is not specified the {@link Client} will the use
 * the ones defined in the default profile.
 * @param {Number} [options.consistency] The consistency level to use for this profile.
 * @param {LoadBalancingPolicy} [options.loadBalancing] The load-balancing policy to use for this profile.
 * @param {Number} [options.readTimeout] The client per-host request timeout to use for this profile.
 * @param {RetryPolicy} [options.retry] The retry policy to use for this profile.
 * @param {Number} [options.serialConsistency] The serial consistency level to use for this profile.
 * @constructor
 */
function ExecutionProfile(name, options) {
  if (typeof name !== 'string') {
    throw new TypeError('Execution profile name must be a string');
  }
  options = options || utils.emptyObject;
  /**
   * Name of the execution profile.
   * @type {String}
   */
  this.name = name;
  /**
   * Consistency level.
   * @type {Number}
   */
  this.consistency = options.consistency;
  /**
   * Load-balancing policy
   * @type {LoadBalancingPolicy}
   */
  this.loadBalancing = options.loadBalancing;
  /**
   * Client read timeout.
   * @type {Number}
   */
  this.readTimeout = options.readTimeout;
  /**
   * Retry policy.
   * @type {RetryPolicy}
   */
  this.retry = options.retry;
  /**
   * Serial consistency level.
   * @type {Number}
   */
  this.serialConsistency = options.serialConsistency;
}

/**
 * @param {ClientOptions} options
 * @constructor
 * @ignore
 */
function ProfileManager(options) {
  this._profiles = options.profiles || [];
  this._setDefault(options);
  // A array of unique load balancing policies
  this._loadBalancingPolicies = [];
  // A dictionary of name keys and profile values
  this._profilesMap = {};
  this._profiles.forEach(function (p) {
    this._profilesMap[p.name] = p;
    // Set required properties
    p.loadBalancing = p.loadBalancing || this._defaultProfile.loadBalancing;
    // Using array indexOf is not very efficient (O(n)) but the amount of profiles should be limited
    // and a handful of load-balancing policies (no hashcode for load-Balancing policies)
    if (this._loadBalancingPolicies.indexOf(p.loadBalancing) === -1) {
      this._loadBalancingPolicies.push(p.loadBalancing);
    }
    return p;
  }, this);
}

/**
 * @param {Client} client
 * @param {HostMap} hosts
 * @param {Function} callback
 */
ProfileManager.prototype.init = function (client, hosts, callback) {
  utils.eachSeries(this._loadBalancingPolicies, function (policy, next) {
    policy.init(client, hosts, next);
  }, callback);
};

/**
 * Uses the load-balancing policies to get the relative distance to the host and return the closest one.
 * @param {Host} host
 */
ProfileManager.prototype.getDistance = function (host) {
  var distance = types.distance.ignored;
  // this is performance critical: we can't use any other language features than for-loop :(
  for (var i = 0; i < this._loadBalancingPolicies.length; i++) {
    var d = this._loadBalancingPolicies[i].getDistance(host);
    if (d < distance) {
      distance = d;
      if (distance === types.distance.local) {
        break;
      }
    }
  }
  host.setDistance(distance);
  return distance;
};

/**
 * @param {String|ExecutionProfile} name
 * @returns {ExecutionProfile|undefined} It returns the execution profile by name or the default profile when name is
 * undefined. It returns undefined when the profile does not exist.
 */
ProfileManager.prototype.getProfile = function (name) {
  if (name instanceof ExecutionProfile) {
    return name;
  }
  return this._profilesMap[name || 'default'];
};

/** @returns {ExecutionProfile} */
ProfileManager.prototype.getDefault = function () {
  return this._defaultProfile;
};

/** @returns {LoadBalancingPolicy} */
ProfileManager.prototype.getDefaultLoadBalancing = function () {
  return this._defaultProfile.loadBalancing;
};

/**
 * @private
 * @param {ClientOptions} options
 */
ProfileManager.prototype._setDefault = function (options) {
  this._defaultProfile = this._profiles.filter(function (p) { return p.name === 'default'; })[0];
  if (!this._defaultProfile) {
    this._profiles.push(this._defaultProfile = new ExecutionProfile('default'));
  }
  // set the required properties
  this._defaultProfile.loadBalancing = this._defaultProfile.loadBalancing || options.policies.loadBalancing;
  this._defaultProfile.retry = this._defaultProfile.retry || options.policies.retry;
};

exports.ProfileManager = ProfileManager;
exports.ExecutionProfile = ExecutionProfile;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @classdesc Provides [Authenticator]{@link module:auth~Authenticator} instances to be used when connecting to a host.
 * @constructor
 * @abstract
 * @alias module:auth~AuthProvider
 */
function AuthProvider() {

}

/**
 * Returns an [Authenticator]{@link module:auth~Authenticator} instance to be used when connecting to a host.
 * @param {String} endpoint The ip address and port number in the format ip:port
 * @param {String} name Authenticator name
 * @abstract
 * @returns {Authenticator}
 */
AuthProvider.prototype.newAuthenticator = function (endpoint, name) {
  throw new Error('This is an abstract class, you must implement newAuthenticator method or ' +
    'use another auth provider that inherits from this class');
};

/**
 * @class
 * @classdesc Handles SASL authentication with Cassandra servers.
 * Each time a new connection is created and the server requires authentication,
 * a new instance of this class will be created by the corresponding.
 * @constructor
 * @alias module:auth~Authenticator
 */
function Authenticator() {

}

/**
 * Obtain an initial response token for initializing the SASL handshake.
 * @param {Function} callback
 */
Authenticator.prototype.initialResponse = function (callback) {
  callback(new Error('Not implemented'));
};

/**
 * Evaluates a challenge received from the Server. Generally, this method should callback with
 * no error and no additional params when authentication is complete from the client perspective.
 * @param {Buffer} challenge
 * @param {Function} callback
 */
Authenticator.prototype.evaluateChallenge = function (challenge, callback) {
  callback(new Error('Not implemented'));
};

/**
 * Called when authentication is successful with the last information
 * optionally sent by the server.
 * @param {Buffer} [token]
 */
Authenticator.prototype.onAuthenticationSuccess = function (token) {

};

exports.AuthProvider = AuthProvider;
exports.Authenticator = Authenticator;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var UsersApi_1 = __webpack_require__(26);
function getUsers(event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var userApi = new UsersApi_1["default"]();
        var result = yield userApi.getUsers(event);
        var response = {
            statusCode: 200,
            body: JSON.stringify({
                message: {
                    users: result
                },
                input: event
            })
        };
        callback(null, response);
    });
}
exports.getUsers = getUsers;
//# sourceMappingURL=handler.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cassandra_driver_1 = __webpack_require__(27);
class UsersAPI {
    constructor() {
        this._client = new cassandra_driver_1.Client({ contactPoints: ['54.85.164.35'], keyspace: 'memeni' });
    }
    getUsers(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.extractQueryParams(event);
            let uuidQuery = 'select user from keys_mapping where key=?';
            let params = [this.userName];
            let uuidResult = yield this._client.execute(uuidQuery, [this.userName]);
            let userUuid = uuidResult.rows[0].user;
            let usersQuery = `select * from users where key=?;`;
            let users = yield this._client.execute(usersQuery, [userUuid]);
            return users.rows;
        });
    }
    extractQueryParams(event) {
        if (event.queryStringParameters && event.queryStringParameters.userName) {
            this.userName = event.queryStringParameters.userName || this.userName;
        }
    }
}
exports.UsersAPI = UsersAPI;
exports.default = UsersAPI;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var clientOptions = __webpack_require__(7);
exports.Client = __webpack_require__(44);
exports.ExecutionProfile = __webpack_require__(23).ExecutionProfile;
exports.types = __webpack_require__(2);
exports.errors = __webpack_require__(3);
exports.policies = __webpack_require__(9);
exports.auth = __webpack_require__(64);
exports.metadata = {
  Metadata: __webpack_require__(21)
};
exports.Encoder = __webpack_require__(17);
/**
 * Returns a new instance of the default [options]{@link ClientOptions} used by the driver.
 */
exports.defaultOptions = function () {
  return clientOptions.defaultOptions();
};
exports.version = __webpack_require__(66).version;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dns = __webpack_require__(10);
var util = __webpack_require__(0);
var utils = __webpack_require__(1);
/** @module policies/addressResolution */
/**
 * @class
 * @classdesc
 * Translates IP addresses received from Cassandra nodes into locally queryable
 * addresses.
 * <p>
 * The driver auto-detects new Cassandra nodes added to the cluster through server
 * side pushed notifications and through checking the system tables. For each
 * node, the address received will correspond to the address set as
 * <code>rpc_address</code> in the node yaml file. In most case, this is the correct
 * address to use by the driver and that is what is used by default. However,
 * sometimes the addresses received through this mechanism will either not be
 * reachable directly by the driver or should not be the preferred address to use
 * to reach the node (for instance, the <code>rpc_address</code> set on Cassandra nodes
 * might be a private IP, but some clients  may have to use a public IP, or
 * pass by a router to reach that node). This interface allows to deal with
 * such cases, by allowing to translate an address as sent by a Cassandra node
 * to another address to be used by the driver for connection.
 * <p>
 * Please note that the contact points addresses provided while creating the
 * {@link Client} instance are not "translated", only IP address retrieve from or sent
 * by Cassandra nodes to the driver are.
 * @constructor
 */
function AddressTranslator() {

}

/**
 * Translates a Cassandra <code>rpc_address</code> to another address if necessary.
 * @param {String} address the address of a node as returned by Cassandra.
 * <p>
 * Note that if the <code>rpc_address</code> of a node has been configured to <code>0.0.0.0</code>
 * server side, then the provided address will be the node <code>listen_address</code>,
 * *not* <code>0.0.0.0</code>.
 * </p>
 * @param {Number} port The port number, as specified in the [protocolOptions]{@link ClientOptions} at Client instance creation (9042 by default).
 * @param {Function} callback Callback to invoke with endpoint as first parameter.
 * The endpoint is an string composed of the IP address and the port number in the format <code>ipAddress:port</code>.
 */
AddressTranslator.prototype.translate = function (address, port, callback) {
  callback(address + ':' + port);
};

/**
 * @class
 * @classdesc
 * {@link AddressTranslator} implementation for multi-region EC2 deployments <strong>where clients are also deployed in EC2</strong>.
 * <p>
 * Its distinctive feature is that it translates addresses according to the location of the Cassandra host:
 * </p>
 * <ul>
 *  <li>addresses in different EC2 regions (than the client) are unchanged</li>
 *  <li>addresses in the same EC2 region are <strong>translated to private IPs</strong></li>
 * </ul>
 * <p>
 * This optimizes network costs, because Amazon charges more for communication over public IPs.
 * </p>
 * @constructor
 */
function EC2MultiRegionTranslator() {

}

util.inherits(EC2MultiRegionTranslator, AddressTranslator);

/**
 * Addresses in the same EC2 region are translated to private IPs and addresses in
 * different EC2 regions (than the client) are unchanged
 */
EC2MultiRegionTranslator.prototype.translate = function (address, port, callback) {
  var newAddress = address;
  var self = this;
  var name;
  utils.series([
    function resolve(next) {
      dns.reverse(address, function (err, hostNames) {
        if (err) {
          return next(err);
        }
        if (!hostNames) {
          return next();
        }
        name = hostNames[0];
        next();
      });
    },
    function lookup(next) {
      if (!name) {
        return next();
      }
      dns.lookup(name, function (err, lookupAddress) {
        if (err) {
          return next(err);
        }
        newAddress = lookupAddress;
        next();
      });
    }], function (err) {
    if (err) {
      //there was an issue while doing dns resolution
      self.logError(address, err);
    }
    callback(newAddress + ':' + port);
  });
};

/**
 * Log method called to log errors that occurred while performing dns resolution.
 * You can assign your own method to the class instance to do proper logging.
 * @param {String} address
 * @param {Error} err
 */
EC2MultiRegionTranslator.prototype.logError = function (address, err) {
  //Do nothing by default
};

exports.AddressTranslator = AddressTranslator;
exports.EC2MultiRegionTranslator = EC2MultiRegionTranslator;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var types = __webpack_require__(2);
var utils = __webpack_require__(1);
var errors = __webpack_require__(3);

var doneIteratorObject = Object.freeze({ done: true });

/** @module policies/loadBalancing */
/**
 * Base class for Load Balancing Policies
 * @constructor
 */
function LoadBalancingPolicy() {

}

/**
 * Initializes the load balancing policy, called after the driver obtained the information of the cluster.
 * @param {Client} client
 * @param {HostMap} hosts
 * @param {Function} callback
 */
LoadBalancingPolicy.prototype.init = function (client, hosts, callback) {
  this.client = client;
  this.hosts = hosts;
  callback();
};

//noinspection JSUnusedLocalSymbols
/**
 * Returns the distance assigned by this policy to the provided host.
 * @param {Host} host
 */
LoadBalancingPolicy.prototype.getDistance = function (host) {
  return types.distance.local;
};

/**
 * Returns an iterator with the hosts for a new query.
 * Each new query will call this method. The first host in the result will
 * then be used to perform the query.
 * @param {String} keyspace Name of currently logged keyspace at <code>Client</code> level.
 * @param {QueryOptions|null} queryOptions Options related to this query execution.
 * @param {Function} callback The function to be invoked with the error as first parameter and the host iterator as
 * second parameter.
 */
LoadBalancingPolicy.prototype.newQueryPlan = function (keyspace, queryOptions, callback) {
  callback(new Error('You must implement a query plan for the LoadBalancingPolicy class'));
};

/**
 * This policy yield nodes in a round-robin fashion.
 * @extends LoadBalancingPolicy
 * @constructor
 */
function RoundRobinPolicy() {
  this.index = 0;
}

util.inherits(RoundRobinPolicy, LoadBalancingPolicy);

/**
 * Returns an iterator with the hosts to be used as coordinator for a query.
 * @param {String} keyspace Name of currently logged keyspace at <code>Client</code> level.
 * @param {QueryOptions} queryOptions Options related to this query execution.
 * @param {Function} callback The function to be invoked with the error as first parameter and the host iterator as
 * second parameter.
 */
RoundRobinPolicy.prototype.newQueryPlan = function (keyspace, queryOptions, callback) {
  if (!this.hosts) {
    return callback(new Error('Load balancing policy not initialized'));
  }
  var hosts = this.hosts.values();
  var self = this;
  var counter = 0;

  var planIndex = self.index % hosts.length;
  self.index += 1;
  if (self.index >= utils.maxInt) {
    self.index = 0;
  }

  callback(null, {
    next: function () {
      if (++counter > hosts.length) {
        return doneIteratorObject;
      }
      return {value: hosts[planIndex++ % hosts.length], done: false};
    }
  });
};

/**
 * A data-center aware Round-robin load balancing policy.
 * This policy provides round-robin queries over the node of the local
 * data center. It also includes in the query plans returned a configurable
 * number of hosts in the remote data centers, but those are always tried
 * after the local nodes. In other words, this policy guarantees that no
 * host in a remote data center will be queried unless no host in the local
 * data center can be reached.
 * @param {?String} [localDc] local datacenter name.
 * @param {Number} [usedHostsPerRemoteDc] the number of host per remote datacenter that the policy will yield \
 * in a newQueryPlan after the local nodes.
 * @extends {LoadBalancingPolicy}
 * @constructor
 */
function DCAwareRoundRobinPolicy(localDc, usedHostsPerRemoteDc) {
  this.localDc = localDc;
  this.usedHostsPerRemoteDc = usedHostsPerRemoteDc || 0;
  this.index = 0;
  /** @type {Array} */
  this.localHostsArray = null;
  /** @type {Array} */
  this.remoteHostsArray = null;
}

util.inherits(DCAwareRoundRobinPolicy, LoadBalancingPolicy);

/**
 * Initializes the load balancing policy.
 * @param {Client} client
 * @param {HostMap} hosts
 * @param {Function} callback
 */
DCAwareRoundRobinPolicy.prototype.init = function (client, hosts, callback) {
  this.client = client;
  this.hosts = hosts;
  hosts.on('add', this._cleanHostCache.bind(this));
  hosts.on('remove', this._cleanHostCache.bind(this));
  if (!this.localDc) {
    //get the first alive local, it should be local on top
    var hostsArray = hosts.values();
    for (var i = 0; i < hostsArray.length; i++) {
      var h = hostsArray[i];
      if (h.datacenter) {
        this.localDc = h.datacenter;
        break;
      }
    }
    //this should never happen but it does not hurt
    if (!this.localDc) {
      return callback(new errors.DriverInternalError('Local datacenter could not be determined'));
    }
  }
  callback();
};

/**
 * Returns the distance depending on the datacenter.
 * @param {Host} host
 */
DCAwareRoundRobinPolicy.prototype.getDistance = function (host) {
  if (!host.datacenter) {
    return types.distance.ignored;
  }
  if (host.datacenter === this.localDc) {
    return types.distance.local;
  }
  return types.distance.remote;
};

DCAwareRoundRobinPolicy.prototype._cleanHostCache = function () {
  this.localHostsArray = null;
  this.remoteHostsArray = null;
};

DCAwareRoundRobinPolicy.prototype._sliceNodesByDc = function() {
  var hosts = this.hosts.values();
  if (this.remoteHostsArray) {
    //there were already calculated
    return;
  }
  //do a full lookup to cache the remote hosts by dc
  var remoteHostsByDc = {};
  this.localHostsArray = [];
  this.remoteHostsArray = [];
  hosts.forEach(function (h) {
    if (!h.datacenter) {
      //not a remote dc node
      return;
    }
    if (h.datacenter === this.localDc) {
      this.localHostsArray.push(h);
      return;
    }
    if (this.usedHostsPerRemoteDc === 0) {
      return;
    }
    var hostPerDc = remoteHostsByDc[h.datacenter];
    if (!hostPerDc) {
      remoteHostsByDc[h.datacenter] = hostPerDc = [];
    }
    if (hostPerDc.length < this.usedHostsPerRemoteDc) {
      hostPerDc.push(h);
      this.remoteHostsArray.push(h);
    }
  }, this);
};

/**
 * It returns an iterator that yields local nodes first and remotes nodes afterwards.
 * The amount of remote nodes returned will depend on the usedHostsPerRemoteDc
 * @param {String} keyspace Name of currently logged keyspace at <code>Client</code> level.
 * @param {QueryOptions} queryOptions Options related to this query execution.
 * @param {Function} callback The function to be invoked with the error as first parameter and the host iterator as
 * second parameter.
 */
DCAwareRoundRobinPolicy.prototype.newQueryPlan = function (keyspace, queryOptions, callback) {
  if (!this.hosts) {
    return callback(new Error('Load balancing policy not initialized'));
  }
  this.index += 1;
  if (this.index >= utils.maxInt) {
    this.index = 0;
  }
  this._sliceNodesByDc();
  // Use a local reference of hosts
  var localHostsArray = this.localHostsArray;
  var remoteHostsArray = this.remoteHostsArray;
  var planLocalIndex = this.index;
  var planRemoteIndex = this.index;
  var counter = 0;
  var remoteCounter = 0;
  callback(null, {
    next: function () {
      var host;
      if (counter++ < localHostsArray.length) {
        host = localHostsArray[planLocalIndex++ % localHostsArray.length];
        return { value: host, done: false };
      }
      if (remoteCounter++ < remoteHostsArray.length) {
        host = remoteHostsArray[planRemoteIndex++ % remoteHostsArray.length];
        return { value: host, done: false };
      }
      return doneIteratorObject;
    }
  });
};

/**
 * A wrapper load balancing policy that add token awareness to a child policy.
 * @param {LoadBalancingPolicy} childPolicy
 * @extends LoadBalancingPolicy
 * @constructor
 */
function TokenAwarePolicy (childPolicy) {
  if (!childPolicy) {
    throw new Error("You must specify a child load balancing policy");
  }
  this.childPolicy = childPolicy;
}

util.inherits(TokenAwarePolicy, LoadBalancingPolicy);

TokenAwarePolicy.prototype.init = function (client, hosts, callback) {
  this.client = client;
  this.hosts = hosts;
  this.childPolicy.init(client, hosts, callback);
};

TokenAwarePolicy.prototype.getDistance = function (host) {
  return this.childPolicy.getDistance(host);
};

/**
 * Returns the hosts to use for a new query.
 * The returned plan will return local replicas first, if replicas can be determined, followed by the plan of the
 * child policy.
 * @param {String} keyspace Name of currently logged keyspace at <code>Client</code> level.
 * @param {QueryOptions} queryOptions Options related to this query execution.
 * @param {Function} callback The function to be invoked with the error as first parameter and the host iterator as
 * second parameter.
 */
TokenAwarePolicy.prototype.newQueryPlan = function (keyspace, queryOptions, callback) {
  var routingKey;
  if (queryOptions) {
    routingKey = queryOptions.routingKey;
    if (queryOptions.keyspace) {
      keyspace = queryOptions.keyspace;
    }
  }
  var replicas;
  if (routingKey) {
    replicas = this.client.getReplicas(keyspace, routingKey);
  }
  if (!routingKey || !replicas) {
    return this.childPolicy.newQueryPlan(keyspace, queryOptions, callback);
  }
  var iterator = new TokenAwareIterator(keyspace, queryOptions, replicas, this.childPolicy);
  iterator.iterate(callback);
};

/**
 * An iterator that holds the context for the subsequent next() calls
 * @param {String} keyspace
 * @param queryOptions
 * @param {Array} replicas
 * @param childPolicy
 * @constructor
 * @ignore
 */
function TokenAwareIterator(keyspace, queryOptions, replicas, childPolicy) {
  this.keyspace = keyspace;
  this.childPolicy = childPolicy;
  this.queryOptions = queryOptions;
  this.localReplicas = [];
  this.replicaIndex = 0;
  this.replicaMap = {};
  this.childIterator = null;
  // Memoize the local replicas
  // The amount of local replicas should be defined before start iterating, in order to select an
  // appropriate (pseudo random) startIndex
  for (var i = 0; i < replicas.length; i++) {
    var host = replicas[i];
    if (this.childPolicy.getDistance(host) !== types.distance.local) {
      continue;
    }
    this.replicaMap[host.address] = true;
    this.localReplicas.push(host);
  }
  // We use a PRNG to set the replica index
  // We only care about proportional fair scheduling between replicas of a given token
  // Math.random() has an extremely short permutation cycle length but we don't care about collisions
  this.startIndex = Math.floor(Math.random() * this.localReplicas.length);
}

TokenAwareIterator.prototype.iterate = function (callback) {
  //Load the child policy hosts
  var self = this;
  this.childPolicy.newQueryPlan(this.keyspace, this.queryOptions, function (err, iterator) {
    if (err) {
      return callback(err);
    }
    //get the iterator of the child policy in case is needed
    self.childIterator = iterator;
    callback(null, {
      next: function () { return self.computeNext(); }
    });
  });
};

TokenAwareIterator.prototype.computeNext = function () {
  var host;
  if (this.replicaIndex < this.localReplicas.length) {
    host = this.localReplicas[(this.startIndex + (this.replicaIndex++)) % this.localReplicas.length];
    return { value: host, done: false };
  }
  // Return hosts from child policy
  var item;
  while ((item = this.childIterator.next()) && !item.done) {
    if (this.replicaMap[item.value.address]) {
      // Avoid yielding local replicas from the child load balancing policy query plan
      continue;
    }
    return item;
  }
  return doneIteratorObject;
};

/**
 * Create a new policy that wraps the provided child policy but only "allow" hosts
 * from the provided while list.
 * @class
 * @classdesc
 * A load balancing policy wrapper that ensure that only hosts from a provided
 * white list will ever be returned.
 * <p>
 * This policy wraps another load balancing policy and will delegate the choice
 * of hosts to the wrapped policy with the exception that only hosts contained
 * in the white list provided when constructing this policy will ever be
 * returned. Any host not in the while list will be considered ignored
 * and thus will not be connected to.
 * <p>
 * This policy can be useful to ensure that the driver only connects to a
 * predefined set of hosts. Keep in mind however that this policy defeats
 * somewhat the host auto-detection of the driver. As such, this policy is only
 * useful in a few special cases or for testing, but is not optimal in general.
 * If all you want to do is limiting connections to hosts of the local
 * data-center then you should use DCAwareRoundRobinPolicy and *not* this policy
 * in particular.
 * @param {LoadBalancingPolicy} childPolicy the wrapped policy.
 * @param {Array.<string>}  whiteList the white listed hosts address in the format ipAddress:port.
 * Only hosts from this list may get connected
 * to (whether they will get connected to or not depends on the child policy).
 * @extends LoadBalancingPolicy
 * @constructor
 */
function WhiteListPolicy (childPolicy, whiteList) {
  if (!childPolicy) {
    throw new Error("You must specify a child load balancing policy");
  }
  if (!util.isArray(whiteList)) {
    throw new Error("You must provide the white list of host addresses");
  }
  this.childPolicy = childPolicy;
  var map = {};
  whiteList.forEach(function (address) {
    map[address] = true;
  });
  this.whiteList = map;
}

util.inherits(WhiteListPolicy, LoadBalancingPolicy);

WhiteListPolicy.prototype.init = function (client, hosts, callback) {
  this.childPolicy.init(client, hosts, callback);
};

/**
 * Uses the child policy to return the distance to the host if included in the white list.
 * Any host not in the while list will be considered ignored.
 * @param host
 */
WhiteListPolicy.prototype.getDistance = function (host) {
  if (!this._contains(host)) {
    return types.distance.ignored;
  }
  return this.childPolicy.getDistance(host);
};

/**
 * @param {Host} host
 * @returns {boolean}
 * @private
 */
WhiteListPolicy.prototype._contains = function (host) {
  return !!this.whiteList[host.address];
};

/**
 * Returns the hosts to use for a new query filtered by the white list.
 */
WhiteListPolicy.prototype.newQueryPlan = function (keyspace, queryOptions, callback) {
  var self = this;
  this.childPolicy.newQueryPlan(keyspace, queryOptions, function (err, iterator) {
    if (err) {
      return callback(err);
    }
    callback(null, self._filter(iterator));
  });
};

WhiteListPolicy.prototype._filter = function (childIterator) {
  var self = this;
  return {
    next: function () {
      var item = childIterator.next();
      if (!item.done && !self._contains(item.value)) {
        return this.next();
      }
      return item;
    }
  };
};


exports.DCAwareRoundRobinPolicy = DCAwareRoundRobinPolicy;
exports.LoadBalancingPolicy = LoadBalancingPolicy;
exports.RoundRobinPolicy = RoundRobinPolicy;
exports.TokenAwarePolicy = TokenAwarePolicy;
exports.WhiteListPolicy = WhiteListPolicy;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var crypto = __webpack_require__(8);
var Long = __webpack_require__(6);

var Uuid = __webpack_require__(11);
var utils = __webpack_require__(1);

/** @module types */
/**
 * Oct 15, 1582 in milliseconds since unix epoch
 * @const
 * @private
 */
var _unixToGregorian = 12219292800000;
/**
 * 10,000 ticks in a millisecond
 * @const
 * @private
 */
var _ticksInMs = 10000;
/**
 * Counter used to generate up to 10000 different timeuuid values with the same Date
 * @private
 * @type {number}
 */
var _ticks = 0;
/**
 * Counter used to generate ticks for the current time
 * @private
 * @type {number}
 */
var _ticksForCurrentTime = 0;
/**
 * Remember the last time when a ticks for the current time so that it can be reset
 * @private
 * @type {number}
 */
var _lastTimestamp = 0;
/**
 * Creates a new instance of Uuid based on the parameters provided according to rfc4122.
 * If any of the arguments is not provided, it will be randomly generated, except for the date that will use the current date.
 * @class
 * @classdesc Represents an immutable version 1 universally unique identifier (UUID). A UUID represents a 128-bit value.
 * <p>Usage: <code>TimeUuid.now()</code></p>
 * @extends module:types~Uuid
 * @param {Date} [value] The datetime for the instance, if not provided, it will use the current Date.
 * @param {Number} [ticks] A number from 0 to 10000 representing the 100-nanoseconds units for this instance to fill in the information not available in the Date,
 * as Ecmascript Dates have only milliseconds precision.
 * @param {String|Buffer} [nodeId] A 6-length Buffer or string of 6 ascii characters representing the node identifier, ie: 'host01'.
 * @param {String|Buffer} [clockId] A 2-length Buffer or string of 6 ascii characters representing the clock identifier.
 * @constructor
 */
function TimeUuid(value, ticks, nodeId, clockId) {
  var buffer;
  if (value instanceof Buffer) {
    if (value.length !== 16) {
      throw new Error('Buffer for v1 uuid not valid');
    }
    buffer = value;
  }
  else {
    buffer = generateBuffer(value, ticks, nodeId, clockId);
  }
  Uuid.call(this, buffer);
}

util.inherits(TimeUuid, Uuid);

/**
 * Generates a TimeUuid instance based on the Date provided using random node and clock values.
 * @param {Date} date Date to generate the v1 uuid.
 * @param {Number} [ticks] A number from 0 to 10000 representing the 100-nanoseconds units for this instance to fill in the information not available in the Date,
 * as Ecmascript Dates have only milliseconds precision.
 * @param {String|Buffer} [nodeId] A 6-length Buffer or string of 6 ascii characters representing the node identifier, ie: 'host01'.
 * If not provided, a random nodeId will be generated.
 * @param {String|Buffer} [clockId] A 2-length Buffer or string of 6 ascii characters representing the clock identifier.
 * If not provided a random clockId will be generated.
 */
TimeUuid.fromDate = function (date, ticks, nodeId, clockId) {
  return new TimeUuid(date, ticks, nodeId, clockId);
};

/**
 * Parses a string representation of a TimeUuid
 * @param {String} value
 * @returns {TimeUuid}
 */
TimeUuid.fromString = function (value) {
  return new TimeUuid(Uuid.fromString(value).getBuffer());
};

/**
 * Returns the smaller possible type 1 uuid with the provided Date.
 */
TimeUuid.min = function (date, ticks) {
  return new TimeUuid(
    date, ticks, utils.allocBufferFromString('808080808080', 'hex'), utils.allocBufferFromString('8080', 'hex'));
};

/**
 * Returns the biggest possible type 1 uuid with the provided Date.
 */
TimeUuid.max = function (date, ticks) {
  return new TimeUuid(
    date, ticks, utils.allocBufferFromString('7f7f7f7f7f7f', 'hex'), utils.allocBufferFromString('7f7f', 'hex'));
};

/**
 * Generates a TimeUuid instance based on the current date using random node and clock values.
 * @param {String|Buffer} [nodeId] A 6-length Buffer or string of 6 ascii characters representing the node identifier, ie: 'host01'.
 * If not provided, a random nodeId will be generated.
 * @param {String|Buffer} [clockId] A 2-length Buffer or string of 6 ascii characters representing the clock identifier.
 * If not provided a random clockId will be generated.
 */
TimeUuid.now = function (nodeId, clockId) {
  return new TimeUuid(null, null, nodeId, clockId);
};


/**
 * Gets the Date and 100-nanoseconds units representation of this instance.
 * @returns {{date: Date, ticks: Number}}
 */
TimeUuid.prototype.getDatePrecision = function () {
  var timeLow = this.buffer.readUInt32BE(0);

  var timeHigh = 0;
  timeHigh |= ( this.buffer[4] & 0xff ) << 8;
  timeHigh |= this.buffer[5] & 0xff;
  timeHigh |= ( this.buffer[6] & 0x0f ) << 24;
  timeHigh |= ( this.buffer[7] & 0xff ) << 16;

  var val = Long.fromBits(timeLow, timeHigh);
  var ticksInMsLong = Long.fromNumber(_ticksInMs);
  var ticks = val.modulo(ticksInMsLong);
  var time = val
    .div(ticksInMsLong)
    .subtract(Long.fromNumber(_unixToGregorian));
  return { date: new Date(time.toNumber()), ticks: ticks.toNumber()};
};

/**
 * Gets the Date representation of this instance.
 * @returns {Date}
 */
TimeUuid.prototype.getDate = function () {
  return this.getDatePrecision().date;
};

/**
 * Returns the node id this instance
 * @returns {Buffer}
 */
TimeUuid.prototype.getNodeId = function () {
  return this.buffer.slice(10);
};

/**
 * Returns the node id this instance as an ascii string
 * @returns {String}
 */
TimeUuid.prototype.getNodeIdString = function () {
  return this.buffer.slice(10).toString('ascii');
};

function writeTime(buffer, time, ticks) {
  //value time expressed in ticks precision
  var val = Long
    .fromNumber(time + _unixToGregorian)
    .multiply(Long.fromNumber(10000))
    .add(Long.fromNumber(ticks));
  var timeHigh = val.getHighBitsUnsigned();
  buffer.writeUInt32BE(val.getLowBitsUnsigned(), 0, true);
  buffer.writeUInt16BE(timeHigh & 0xffff, 4, true);
  buffer.writeUInt16BE(timeHigh >>> 16 & 0xffff, 6, true);
}

/**
 * Returns a buffer of length 2 representing the clock identifier
 * @param {String|Buffer} clockId
 * @returns {Buffer}
 * @private
 */
function getClockId(clockId) {
  var buffer = clockId;
  if (typeof clockId === 'string') {
    buffer = utils.allocBufferFromString(clockId, 'ascii');
  }
  if (!(buffer instanceof Buffer)) {
    //Generate
    buffer = getRandomBytes(2);
  }
  else if (buffer.length !== 2) {
    throw new Error('Clock identifier must have 2 bytes');
  }
  return buffer;
}

/**
 * Returns a buffer of length 6 representing the clock identifier
 * @param {String|Buffer} nodeId
 * @returns {Buffer}
 * @private
 */
function getNodeId(nodeId) {
  var buffer = nodeId;
  if (typeof nodeId === 'string') {
    buffer = utils.allocBufferFromString(nodeId, 'ascii');
  }
  if (!(buffer instanceof Buffer)) {
    //Generate
    buffer = getRandomBytes(6);
  }
  else if (buffer.length !== 6) {
    throw new Error('Node identifier must have 6 bytes');
  }
  return buffer;
}

/**
 * Returns the ticks portion of a timestamp.  If the ticks are not provided an internal counter is used that gets reset at 10000.
 * @private
 * @param {Number} [ticks] 
 * @returns {Number} 
 */
function getTicks(ticks) {
  if (typeof ticks !== 'number'|| ticks >= _ticksInMs) {
    _ticks++;
    if (_ticks >= _ticksInMs) {
      _ticks = 0;
    }
    ticks = _ticks;
  }
  return ticks;
}

/**
 * Returns an object with the time representation of the date expressed in milliseconds since unix epoch 
 * and a ticks property for the 100-nanoseconds precision.
 * @private
 * @returns {{time: Number, ticks: Number}} 
 */
function getTimeWithTicks(date, ticks) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    // time with ticks for the current time
    date = new Date();
    var time = date.getTime();
    _ticksForCurrentTime++;
    if(_ticksForCurrentTime > _ticksInMs || time > _lastTimestamp) {
      _ticksForCurrentTime = 0;
      _lastTimestamp = time;
    }
    ticks = _ticksForCurrentTime;
  }
  return {
    time: date.getTime(),
    ticks: getTicks(ticks)
  };
}

function getRandomBytes(length) {
  return crypto.randomBytes(length);
}

/**
 * Generates a 16-length Buffer instance
 * @private
 * @param {Date} date
 * @param {Number} ticks
 * @param {String|Buffer} nodeId
 * @param {String|Buffer} clockId
 * @returns {Buffer}
 */
function generateBuffer(date, ticks, nodeId, clockId) {
  var timeWithTicks = getTimeWithTicks(date, ticks);
  nodeId = getNodeId(nodeId);
  clockId = getClockId(clockId);
  var buffer = utils.allocBufferUnsafe(16);
  //Positions 0-7 Timestamp
  writeTime(buffer, timeWithTicks.time, timeWithTicks.ticks);
  //Position 8-9 Clock
  clockId.copy(buffer, 8, 0);
  //Positions 10-15 Node
  nodeId.copy(buffer, 10, 0);
  //Version Byte: Time based
  //0001xxxx
  //turn off first 4 bits
  buffer[6] = buffer[6] & 0x0f;
  //turn on fifth bit
  buffer[6] = buffer[6] | 0x10;

  //IETF Variant Byte: 1.0.x
  //10xxxxxx
  //turn off first 2 bits
  buffer[8] = buffer[8] & 0x3f;
  //turn on first bit
  buffer[8] = buffer[8] | 0x80;
  return buffer;
}

module.exports = TimeUuid;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Contains information for the different protocol versions supported by the driver.
 * @type {Object}
 * @property {Number} v1 Cassandra protocol v1, supported in Apache Cassandra 1.2-->2.2.
 * @property {Number} v2 Cassandra protocol v2, supported in Apache Cassandra 2.0-->2.2.
 * @property {Number} v3 Cassandra protocol v3, supported in Apache Cassandra 2.1-->3.x.
 * @property {Number} v4 Cassandra protocol v4, supported in Apache Cassandra 2.2-->3.x.
 * @property {Number} v5 Cassandra protocol v5, in beta from Apache Cassandra 3.x+. Currently not supported by the
 * driver.
 * @property {Number} maxSupported Returns the higher protocol version that is supported by this driver.
 * @property {Number} minSupported Returns the lower protocol version that is supported by this driver.
 * @property {Function} isSupported A function that returns a boolean determining whether a given protocol version
 * is supported.
 * @alias module:types~protocolVersion
 */
var protocolVersion = {
  // Strict equality operators to compare versions are allowed, other comparison operators are discouraged. Instead,
  // use a function that checks if a functionality is present on a certain version, for maintainability purposes.
  v1: 0x01,
  v2: 0x02,
  v3: 0x03,
  v4: 0x04,
  v5: 0x05,
  maxSupported: 0x04,
  minSupported: 0x01,
  isSupported: function (version) {
    return (version <= 0x04 && version >= 0x01);
  },
  /**
   * Determines whether the protocol supports partition key indexes in the `prepared` RESULT responses.
   * @param {Number} version
   * @returns {Boolean}
   * @ignore
   */
  supportsPreparedPartitionKey: function (version) {
    return (version >= this.v4);
  },
  /**
   * Determines whether the protocol supports up to 4 strings (ie: change_type, target, keyspace and table) in the
   * schema change responses.
   * @param version
   * @return {boolean}
   * @ignore
   */
  supportsSchemaChangeFullMetadata: function (version) {
    return (version >= this.v3);
  },
  /**
   * Determines whether the protocol supports paging state and serial consistency parameters in QUERY and EXECUTE
   * requests.
   * @param version
   * @return {boolean}
   * @ignore
   */
  supportsPaging: function (version) {
    return (version >= this.v2);
  },
  /**
   * Determines whether the protocol supports timestamps parameters in BATCH, QUERY and EXECUTE requests.
   * @param {Number} version
   * @return {boolean}
   * @ignore
   */
  supportsTimestamp: function (version) {
    return (version >= this.v3);
  },
  /**
   * Determines whether the protocol supports named parameters in QUERY and EXECUTE requests.
   * @param {Number} version
   * @return {boolean}
   * @ignore
   */
  supportsNamedParameters: function (version) {
    return (version >= this.v3);
  },
  /**
   * Determines whether the protocol supports unset parameters.
   * @param {Number} version
   * @return {boolean}
   * @ignore
   */
  supportsUnset: function (version) {
    return (version >= this.v4);
  },
  /**
   * Determines whether the protocol supports timestamp and serial consistency parameters in BATCH requests.
   * @param {Number} version
   * @return {boolean}
   * @ignore
   */
  uses2BytesStreamIds: function (version) {
    return (version >= this.v3);
  },
  /**
   * Determines whether the collection length is encoded using 32 bits.
   * @param {Number} version
   * @return {boolean}
   * @ignore
   */
  uses4BytesCollectionLength: function (version) {
    return (version >= this.v3);
  },
  /**
   * Startup responses using protocol v4+ can be a SERVER_ERROR wrapping a ProtocolException, this method returns true
   * when is possible to receive such error.
   * @param {Number} version
   * @return {boolean}
   * @ignore
   */
  canStartupResponseErrorBeWrapped: function (version) {
    return (version >= this.v4);
  },
  /**
   * Gets the first version number that is supported, lower than the one provided.
   * Returns zero when there isn't a lower supported version.
   * @param {Number} version
   * @return {Number}
   * @ignore
   */
  getLowerSupported: function (version) {
    if (version >= this.v5) {
      return this.v4;
    }
    if (version <= this.v1) {
      return 0;
    }
    return version - 1;
  }
};

module.exports = protocolVersion;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Integer = __webpack_require__(12);
var utils = __webpack_require__(1);

/** @module types */
/**
 * Constructs an immutable arbitrary-precision signed decimal number.
 * A <code>BigDecimal</code> consists of an [arbitrary precision integer]{@link module:types~Integer}
 * <i>unscaled value</i> and a 32-bit integer <i>scale</i>.  If zero
 * or positive, the scale is the number of digits to the right of the
 * decimal point.  If negative, the unscaled value of the number is
 * multiplied by ten to the power of the negation of the scale.  The
 * value of the number represented by the <code>BigDecimal</code> is
 * therefore <tt>(unscaledValue &times; 10<sup>-scale</sup>)</tt>.
 * @class
 * @classdesc The <code>BigDecimal</code> class provides operations for
 * arithmetic, scale manipulation, rounding, comparison and
 * format conversion.  The {@link #toString} method provides a
 * canonical representation of a <code>BigDecimal</code>.
 * @param {Integer|Number} unscaledValue The integer part of the decimal.
 * @param {Number} scale The scale of the decimal.
 * @constructor
 */
function BigDecimal(unscaledValue, scale) {
  if (typeof unscaledValue === 'number') {
    unscaledValue = Integer.fromNumber(unscaledValue);
  }
  /**
   * @type {Integer}
   * @private
   */
  this._intVal = unscaledValue;
  /**
   * @type {Number}
   * @private
   */
  this._scale = scale;
}

/**
 * Returns the BigDecimal representation of a buffer composed of the scale (int32BE) and the unsigned value (varint BE)
 * @param {Buffer} buf
 * @returns {BigDecimal}
 */
BigDecimal.fromBuffer = function (buf) {
  var scale = buf.readInt32BE(0);
  var unscaledValue = Integer.fromBuffer(buf.slice(4));
  return new BigDecimal(unscaledValue, scale);
};

/**
 * Returns a buffer representation composed of the scale as a BE int 32 and the unsigned value as a BE varint
 * @param {BigDecimal} value
 * @returns {Buffer}
 */
BigDecimal.toBuffer = function (value) {
  var unscaledValueBuffer = Integer.toBuffer(value._intVal);
  var scaleBuffer = utils.allocBufferUnsafe(4);
  scaleBuffer.writeInt32BE(value._scale, 0);
  return Buffer.concat([scaleBuffer, unscaledValueBuffer], scaleBuffer.length + unscaledValueBuffer.length);
};

/**
 * Returns a BigDecimal representation of the string
 * @param {String} value
 * @returns {BigDecimal}
 */
BigDecimal.fromString = function (value) {
  if (!value) {
    throw new TypeError('Invalid null or undefined value');
  }
  value = value.trim();
  var scaleIndex = value.indexOf('.');
  var scale = 0;
  if (scaleIndex >= 0) {
    scale = value.length - 1 - scaleIndex;
    value = value.substr(0, scaleIndex) + value.substr(scaleIndex + 1);
  }
  return new BigDecimal(Integer.fromString(value), scale);
};

/**
 * Returns a BigDecimal representation of the Number
 * @param {Number} value
 * @returns {BigDecimal}
 */
BigDecimal.fromNumber = function (value) {
  if (isNaN(value)) {
    return new BigDecimal(Integer.ZERO, 0);
  }
  var textValue = value.toString();
  if (textValue.indexOf('e') >= 0) {
    //get until scale 20
    textValue = value.toFixed(20);
  }
  return BigDecimal.fromString(textValue);
};

/**
 * Returns true if the value of the BigDecimal instance and other are the same
 * @param {BigDecimal} other
 * @returns {Boolean}
 */
BigDecimal.prototype.equals = function (other) {
  return ((other instanceof BigDecimal) && this.compare(other) === 0);
};

BigDecimal.prototype.inspect = function () {
  return this.constructor.name + ': ' + this.toString();
};

/**
 * @param {BigDecimal} other
 * @returns {boolean}
 */
BigDecimal.prototype.notEquals = function (other) {
  return !this.equals(other);
};

/**
 * Compares this BigDecimal with the given one.
 * @param {BigDecimal} other Integer to compare against.
 * @return {number} 0 if they are the same, 1 if the this is greater, and -1
 *     if the given one is greater.
 */
BigDecimal.prototype.compare = function (other) {
  var diff = this.subtract(other);
  if (diff.isNegative()) {
    return -1;
  }
  if (diff.isZero()) {
    return 0;
  }
  return +1;
};

/**
 * Returns the difference of this and the given BigDecimal.
 * @param {BigDecimal} other The BigDecimal to subtract from this.
 * @return {!BigDecimal} The BigDecimal result.
 */
BigDecimal.prototype.subtract = function (other) {
  var first = this;
  if (first._scale === other._scale) {
    return new BigDecimal(first._intVal.subtract(other._intVal), first._scale);
  }
  var diffScale;
  var unscaledValue;
  if (first._scale < other._scale) {
    //The scale of this is lower
    diffScale = other._scale - first._scale;
    //multiple this unScaledValue to compare in the same scale
    unscaledValue = first._intVal
      .multiply(Integer.fromNumber(Math.pow(10, diffScale)))
      .subtract(other._intVal);
    return new BigDecimal(unscaledValue, other._scale);
  }
  //The scale of this is higher
  diffScale = first._scale - other._scale;
  //multiple this unScaledValue to compare in the same scale
  unscaledValue = first._intVal
    .subtract(
      other._intVal.multiply(Integer.fromNumber(Math.pow(10, diffScale))));
  return new BigDecimal(unscaledValue, first._scale);
};

/**
 * Returns the sum of this and the given <code>BigDecimal</code>.
 * @param {BigDecimal} other The BigDecimal to sum to this.
 * @return {!BigDecimal} The BigDecimal result.
 */
BigDecimal.prototype.add = function (other) {
  var first = this;
  if (first._scale === other._scale) {
    return new BigDecimal(first._intVal.add(other._intVal), first._scale);
  }
  var diffScale;
  var unscaledValue;
  if (first._scale < other._scale) {
    //The scale of this is lower
    diffScale = other._scale - first._scale;
    //multiple this unScaledValue to compare in the same scale
    unscaledValue = first._intVal
      .multiply(Integer.fromNumber(Math.pow(10, diffScale)))
      .add(other._intVal);
    return new BigDecimal(unscaledValue, other._scale);
  }
  //The scale of this is higher
  diffScale = first._scale - other._scale;
  //multiple this unScaledValue to compare in the same scale
  unscaledValue = first._intVal
    .add(
      other._intVal.multiply(Integer.fromNumber(Math.pow(10, diffScale))));
  return new BigDecimal(unscaledValue, first._scale);
};

/**
 * Returns true if the current instance is greater than the other
 * @param {BigDecimal} other
 * @returns {boolean}
 */
BigDecimal.prototype.greaterThan = function (other) {
  return this.compare(other) === 1;
};

/** @return {boolean} Whether this value is negative. */
BigDecimal.prototype.isNegative = function () {
  return this._intVal.isNegative();
};

/** @return {boolean} Whether this value is zero. */
BigDecimal.prototype.isZero = function () {
  return this._intVal.isZero();
};

/**
 * Returns the string representation of this <code>BigDecimal</code>
 * @returns {string}
 */
BigDecimal.prototype.toString = function () {
  var intString = this._intVal.toString();
  if (this._scale === 0) {
    return intString;
  }
  var signSymbol = '';
  if (intString.charAt(0) === '-') {
    signSymbol = '-';
    intString = intString.substr(1);
  }
  var separatorIndex = intString.length - this._scale;
  if (separatorIndex <= 0) {
    //add zeros at the beginning, plus an additional zero
    intString = utils.stringRepeat('0', (-separatorIndex) + 1) + intString;
    separatorIndex = intString.length - this._scale;
  }
  return signSymbol + intString.substr(0, separatorIndex) + '.' + intString.substr(separatorIndex);
};

/**
 * Returns a Number representation of this <code>BigDecimal</code>.
 * @returns {Number}
 */
BigDecimal.prototype.toNumber = function () {
  return parseFloat(this.toString());
};

/**
 * Returns the string representation.
 * Method used by the native JSON.stringify() to serialize this instance.
 */
BigDecimal.prototype.toJSON = function () {
  return this.toString();
};


module.exports = BigDecimal;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Long = __webpack_require__(6);
var util = __webpack_require__(0);
var utils = __webpack_require__(1);

/** @module types */

// Reuse the same buffers that should perform slightly better than built-in buffer pool
var reusableBuffers = {
  months: utils.allocBuffer(9),
  days: utils.allocBuffer(9),
  nanoseconds: utils.allocBuffer(9)
};

var maxInt32 = 0x7FFFFFFF;
var longOneThousand = Long.fromInt(1000);
var nanosPerMicro = longOneThousand;
var nanosPerMilli = longOneThousand.multiply(nanosPerMicro);
var nanosPerSecond = longOneThousand.multiply(nanosPerMilli);
var nanosPerMinute = Long.fromInt(60).multiply(nanosPerSecond);
var nanosPerHour = Long.fromInt(60).multiply(nanosPerMinute);
var daysPerWeek = 7;
var monthsPerYear = 12;
var standardRegex = /(\d+)(y|mo|w|d|h|s|ms|us|µs|ns|m)/gi;
var iso8601Regex = /P((\d+)Y)?((\d+)M)?((\d+)D)?(T((\d+)H)?((\d+)M)?((\d+)S)?)?/;
var iso8601WeekRegex = /P(\d+)W/;
var iso8601AlternateRegex = /P(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

/**
 * Creates a new instance of {@link Duration}.
 * @classdesc
 * Represents a duration. A duration stores separately months, days, and seconds due to the fact that the number of
 * days in a month varies, and a day can have 23 or 25 hours if a daylight saving is involved.
 * @param {Number} months The number of months.
 * @param {Number} days The number of days.
 * @param {Number|Long} nanoseconds The number of nanoseconds.
 * @constructor
 */
function Duration(months, days, nanoseconds) {
  /**
   * Gets the number of months.
   * @type {Number}
   */
  this.months = months;
  /**
   * Gets the number of days.
   * @type {Number}
   */
  this.days = days;
  /**
   * Gets the number of nanoseconds represented as a <code>int64</code>.
   * @type {Long}
   */
  this.nanoseconds = typeof nanoseconds === 'number' ? Long.fromNumber(nanoseconds) : nanoseconds;
}

Duration.prototype.equals = function (other) {
  if (!(other instanceof Duration)) {
    return false;
  }
  return this.months === other.months &&
    this.days === other.days &&
    this.nanoseconds.equals(other.nanoseconds);
};

/**
 * Serializes the duration and returns the representation of the value in bytes.
 * @returns {Buffer}
 */
Duration.prototype.toBuffer = function () {
  var lengthMonths = VIntCoding.writeVInt(Long.fromNumber(this.months), reusableBuffers.months);
  var lengthDays = VIntCoding.writeVInt(Long.fromNumber(this.days), reusableBuffers.days);
  var lengthNanoseconds = VIntCoding.writeVInt(this.nanoseconds, reusableBuffers.nanoseconds);
  var buffer = utils.allocBufferUnsafe(lengthMonths + lengthDays + lengthNanoseconds);
  reusableBuffers.months.copy(buffer, 0, 0, lengthMonths);
  var offset = lengthMonths;
  reusableBuffers.days.copy(buffer, offset, 0, lengthDays);
  offset += lengthDays;
  reusableBuffers.nanoseconds.copy(buffer, offset, 0, lengthNanoseconds);
  return buffer;
};

/**
 * Returns the string representation of the value.
 * @return {string}
 */
Duration.prototype.toString = function () {
  var value = '';
  function append(dividend, divisor, unit) {
    if (dividend === 0 || dividend < divisor) {
      return dividend;
    }
    // string concatenation is supposed to be fasted than join()
    value += (dividend / divisor).toFixed(0) + unit;
    return dividend % divisor;
  }
  function append64(dividend, divisor, unit) {
    if (dividend.equals(Long.ZERO) || dividend.lessThan(divisor)) {
      return dividend;
    }
    // string concatenation is supposed to be fasted than join()
    value += dividend.divide(divisor).toString() + unit;
    return dividend.modulo(divisor);
  }
  if (this.months < 0 || this.days < 0 || this.nanoseconds.isNegative()) {
    value = '-';
  }
  var remainder = append(Math.abs(this.months), monthsPerYear, "y");
  append(remainder, 1, "mo");
  append(Math.abs(this.days), 1, "d");

  if (!this.nanoseconds.equals(Long.ZERO)) {
    var nanos = this.nanoseconds.isNegative() ? this.nanoseconds.negate() : this.nanoseconds;
    remainder = append64(nanos, nanosPerHour, "h");
    remainder = append64(remainder, nanosPerMinute, "m");
    remainder = append64(remainder, nanosPerSecond, "s");
    remainder = append64(remainder, nanosPerMilli, "ms");
    remainder = append64(remainder, nanosPerMicro, "us");
    append64(remainder, Long.ONE, "ns");
  }
  return value;
};

/**
 * Creates a new {@link Duration} instance from the binary representation of the value.
 * @param {Buffer} buffer
 * @returns {Duration}
 */
Duration.fromBuffer = function (buffer) {
  var offset = { value: 0 };
  var months = VIntCoding.readVInt(buffer, offset).toNumber();
  var days = VIntCoding.readVInt(buffer, offset).toNumber();
  var nanoseconds = VIntCoding.readVInt(buffer, offset);
  return new Duration(months, days, nanoseconds);
};

/**
 * Creates a new {@link Duration} instance from the string representation of the value.
 * <p>
 *   Accepted formats:
 * </p>
 * <ul>
 * <li>multiple digits followed by a time unit like: 12h30m where the time unit can be:
 *   <ul>
 *     <li>{@code y}: years</li>
 *     <li>{@code m}: months</li>
 *     <li>{@code w}: weeks</li>
 *     <li>{@code d}: days</li>
 *     <li>{@code h}: hours</li>
 *     <li>{@code m}: minutes</li>
 *     <li>{@code s}: seconds</li>
 *     <li>{@code ms}: milliseconds</li>
 *     <li>{@code us} or {@code µs}: microseconds</li>
 *     <li>{@code ns}: nanoseconds</li>
 *   </ul>
 * </li>
 * <li>ISO 8601 format:  <code>P[n]Y[n]M[n]DT[n]H[n]M[n]S or P[n]W</code></li>
 * <li>ISO 8601 alternative format: <code>P[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss]</code></li>
 * </ul>
 * @param {String} input
 * @returns {Duration}
 */
Duration.fromString = function (input) {
  var isNegative = input.charAt(0) === '-';
  var source = isNegative ? input.substr(1) : input;
  if (source.charAt(0) === 'P') {
    if (source.charAt(source.length - 1) === 'W') {
      return parseIso8601WeekFormat(isNegative, source);
    }
    if (source.indexOf('-') > 0) {
      return parseIso8601AlternativeFormat(isNegative, source);
    }
    return parseIso8601Format(isNegative, source);
  }
  return parseStandardFormat(isNegative, source);
};

/**
 * @param {Boolean} isNegative
 * @param {String} source
 * @returns {Duration}
 * @private
 */
function parseStandardFormat(isNegative, source) {
  var builder = new Builder(isNegative);
  standardRegex.lastIndex = 0;
  var matches;
  while ((matches = standardRegex.exec(source)) && matches.length <= 3) {
    builder.add(matches[1], matches[2]);
  }
  return builder.build();
}

/**
 * @param {Boolean} isNegative
 * @param {String} source
 * @returns {Duration}
 * @private
 */
function parseIso8601Format(isNegative, source) {
  var matches = iso8601Regex.exec(source);
  if (!matches || matches[0] !== source) {
    throw new TypeError(util.format("Unable to convert '%s' to a duration", source));
  }
  var builder = new Builder(isNegative);
  if (matches[1]) {
    builder.addYears(matches[2]);
  }
  if (matches[3]) {
    builder.addMonths(matches[4]);
  }
  if (matches[5]) {
    builder.addDays(matches[6]);
  }
  if (matches[7]) {
    if (matches[8]) {
      builder.addHours(matches[9]);
    }
    if (matches[10]) {
      builder.addMinutes(matches[11]);
    }
    if (matches[12]) {
      builder.addSeconds(matches[13]);
    }
  }
  return builder.build();
}

/**
 * @param {Boolean} isNegative
 * @param {String} source
 * @returns {Duration}
 * @private
 */
function parseIso8601WeekFormat(isNegative, source) {
  var matches = iso8601WeekRegex.exec(source);
  if (!matches || matches[0] !== source) {
    throw new TypeError(util.format("Unable to convert '%s' to a duration", source));
  }
  return new Builder(isNegative)
    .addWeeks(matches[1])
    .build();
}

/**
 * @param {Boolean} isNegative
 * @param {String} source
 * @returns {Duration}
 * @private
 */
function parseIso8601AlternativeFormat(isNegative, source) {
  var matches = iso8601AlternateRegex.exec(source);
  if (!matches || matches[0] !== source) {
    throw new TypeError(util.format("Unable to convert '%s' to a duration", source));
  }
  return new Builder(isNegative).addYears(matches[1])
    .addMonths(matches[2])
    .addDays(matches[3])
    .addHours(matches[4])
    .addMinutes(matches[5])
    .addSeconds(matches[6])
    .build();
}

/**
 * @param {Boolean} isNegative
 * @private
 * @constructor
 */
function Builder(isNegative) {
  this._isNegative = isNegative;
  this._unitIndex = 0;
  this._months = 0;
  this._days = 0;
  this._nanoseconds = Long.ZERO;
  this._addMethods = {
    'y': this.addYears,
    'mo': this.addMonths,
    'w': this.addWeeks,
    'd': this.addDays,
    'h': this.addHours,
    'm': this.addMinutes,
    's': this.addSeconds,
    'ms': this.addMillis,
    // µs
    '\u00B5s': this.addMicros,
    'us': this.addMicros,
    'ns': this.addNanos
  };
  this._unitByIndex = [
    null, 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds',
    'nanoseconds'
  ];
}

Builder.prototype._validateOrder = function (unitIndex) {
  if (unitIndex === this._unitIndex) {
    throw new TypeError(util.format("Invalid duration. The %s are specified multiple times", this._getUnitName(unitIndex)));
  }

  if (unitIndex <= this._unitIndex) {
    throw new TypeError(util.format("Invalid duration. The %s should be after %s",
      this._getUnitName(this._unitIndex),
      this._getUnitName(unitIndex)));
  }
  this._unitIndex = unitIndex;
};

/**
 * @param {Number} units
 * @param {Number} monthsPerUnit
 */
Builder.prototype._validateMonths = function(units, monthsPerUnit) {
  this._validate32(units, (maxInt32 - this._months) / monthsPerUnit, "months");
};

/**
 * @param {Number} units
 * @param {Number} daysPerUnit
 */
Builder.prototype._validateDays = function(units, daysPerUnit) {
  this._validate32(units, (maxInt32 - this._days) / daysPerUnit, "days");
};

/**
 * @param {Long} units
 * @param {Long} nanosPerUnit
 */
Builder.prototype._validateNanos = function(units, nanosPerUnit) {
  this._validate64(units, Long.MAX_VALUE.subtract(this._nanoseconds).divide(nanosPerUnit), "nanoseconds");
};

/**
 * @param {Number} units
 * @param {Number} limit
 * @param {String} unitName
 */
Builder.prototype._validate32 = function(units, limit, unitName) {
  if (units > limit) {
    throw new TypeError(util.format('Invalid duration. The total number of %s must be less or equal to %s',
      unitName,
      maxInt32));
  }
};

/**
 * @param {Long} units
 * @param {Long} limit
 * @param {String} unitName
 */
Builder.prototype._validate64 = function(units, limit, unitName) {
  if (units.greaterThan(limit)) {
    throw new TypeError(util.format('Invalid duration. The total number of %s must be less or equal to %s',
      unitName,
      Long.MAX_VALUE.toString()));
  }
};

Builder.prototype._getUnitName = function(unitIndex) {
  var name = this._unitByIndex[+unitIndex];
  if (!name) {
    throw new Error('unknown unit index: ' + unitIndex);
  }
  return name;
};

Builder.prototype.add = function (textValue, symbol) {
  var addMethod = this._addMethods[symbol.toLowerCase()];
  if (!addMethod) {
    throw new TypeError(util.format("Unknown duration symbol '%s'", symbol));
  }
  return addMethod.call(this, textValue);
};

/**
 * @param {String|Number} years
 * @return {Builder}
 */
Builder.prototype.addYears = function (years) {
  var value = +years;
  this._validateOrder(1);
  this._validateMonths(value, monthsPerYear);
  this._months += value * monthsPerYear;
  return this;
};

/**
 * @param {String|Number} months
 * @return {Builder}
 */
Builder.prototype.addMonths = function(months) {
  var value = +months;
  this._validateOrder(2);
  this._validateMonths(value, 1);
  this._months += value;
  return this;
};

/**
 * @param {String|Number} weeks
 * @return {Builder}
 */
Builder.prototype.addWeeks = function(weeks) {
  var value = +weeks;
  this._validateOrder(3);
  this._validateDays(value, daysPerWeek);
  this._days += value * daysPerWeek;
  return this;
};

/**
 * @param {String|Number} days
 * @return {Builder}
 */
Builder.prototype.addDays = function(days) {
  var value = +days;
  this._validateOrder(4);
  this._validateDays(value, 1);
  this._days += value;
  return this;
};

/**
 * @param {String|Long} hours
 * @return {Builder}
 */
Builder.prototype.addHours = function(hours) {
  var value = typeof hours === 'string' ? Long.fromString(hours) : hours;
  this._validateOrder(5);
  this._validateNanos(value, nanosPerHour);
  this._nanoseconds = this._nanoseconds.add(value.multiply(nanosPerHour));
  return this;
};

/**
 * @param {String|Long} minutes
 * @return {Builder}
 */
Builder.prototype.addMinutes = function(minutes) {
  var value = typeof minutes === 'string' ? Long.fromString(minutes) : minutes;
  this._validateOrder(6);
  this._validateNanos(value, nanosPerMinute);
  this._nanoseconds = this._nanoseconds.add(value.multiply(nanosPerMinute));
  return this;
};

/**
 * @param {String|Long} seconds
 * @return {Builder}
 */
Builder.prototype.addSeconds = function(seconds) {
  var value = typeof seconds === 'string' ? Long.fromString(seconds) : seconds;
  this._validateOrder(7);
  this._validateNanos(value, nanosPerSecond);
  this._nanoseconds = this._nanoseconds.add(value.multiply(nanosPerSecond));
  return this;
};

/**
 * @param {String|Long} millis
 * @return {Builder}
 */
Builder.prototype.addMillis = function(millis) {
  var value = typeof millis === 'string' ? Long.fromString(millis) : millis;
  this._validateOrder(8);
  this._validateNanos(value, nanosPerMilli);
  this._nanoseconds = this._nanoseconds.add(value.multiply(nanosPerMilli));
  return this;
};

/**
 * @param {String|Long} micros
 * @return {Builder}
 */
Builder.prototype.addMicros = function(micros) {
  var value = typeof micros === 'string' ? Long.fromString(micros) : micros;
  this._validateOrder(9);
  this._validateNanos(value, nanosPerMicro);
  this._nanoseconds = this._nanoseconds.add(value.multiply(nanosPerMicro));
  return this;
};

/**
 * @param {String|Long} nanos
 * @return {Builder}
 */
Builder.prototype.addNanos = function(nanos) {
  var value = typeof nanos === 'string' ? Long.fromString(nanos) : nanos;
  this._validateOrder(10);
  this._validateNanos(value, Long.ONE);
  this._nanoseconds = this._nanoseconds.add(value);
  return this;
};

/** @return {Duration} */
Builder.prototype.build = function () {
  return (this._isNegative ?
    new Duration(-this._months, -this._days, this._nanoseconds.negate()) :
    new Duration(this._months, this._days, this._nanoseconds));
};

/**
 * Contains the methods for reading and writing vints into binary format.
 * Exposes only 2 internal methods, the rest are hidden.
 * @private
 */
var VIntCoding = (function () {
  /** @param {Long} n */
  function encodeZigZag64(n) {
    //     (n << 1) ^ (n >> 63);
    return n.toUnsigned().shiftLeft(1).xor(n.shiftRight(63));
  }

  /** @param {Long} n */
  function decodeZigZag64(n) {
    //     (n >>> 1) ^ -(n & 1);
    return n.shiftRightUnsigned(1).xor(n.and(Long.ONE).negate());
  }

  /**
   * @param {Long} value
   * @param {Buffer} buffer
   * @returns {Number}
   */
  function writeVInt(value, buffer) {
    return writeUnsignedVInt(encodeZigZag64(value), buffer);
  }

  /**
   * @param {Long} value
   * @param {Buffer} buffer
   * @returns {number}
   */
  function writeUnsignedVInt(value, buffer) {
    var size = computeUnsignedVIntSize(value);
    if (size === 1) {
      buffer[0] = value.getLowBits();
      return 1;
    }
    encodeVInt(value, size, buffer);
    return size;
  }

  /**
   * @param {Long} value
   * @returns {number}
   */
  function computeUnsignedVIntSize(value) {
    var magnitude = numberOfLeadingZeros(value.or(Long.ONE));
    return (639 - magnitude * 9) >> 6;
  }

  /**
   * @param {Long} value
   * @param {Number} size
   * @param {Buffer} buffer
   */
  function encodeVInt(value, size, buffer) {
    var extraBytes = size - 1;
    var intValue = value.getLowBits();
    var i;
    var intBytes = 4;
    for (i = extraBytes; i >= 0 && (intBytes--) > 0; i--) {
      buffer[i] = 0xFF & intValue;
      intValue >>= 8;
    }
    intValue = value.getHighBits();
    for (; i >= 0; i--) {
      buffer[i] = 0xFF & intValue;
      intValue >>= 8;
    }
    buffer[0] |= encodeExtraBytesToRead(extraBytes);
  }
  /**
   * Returns the number of zero bits preceding the highest-order one-bit in the binary representation of the value.
   * @param {Long} value
   * @returns {Number}
   */
  function numberOfLeadingZeros(value) {
    if (value.equals(Long.ZERO)) {
      return 64;
    }
    var n = 1;
    var x = value.getHighBits();
    if (x === 0) {
      n += 32;
      x = value.getLowBits();
    }
    if (x >>> 16 === 0) {
      n += 16;
      x <<= 16;
    }
    if (x >>> 24 === 0) {
      n += 8;
      x <<= 8;
    }
    if (x >>> 28 === 0) {
      n += 4;
      x <<= 4;
    }
    if (x >>> 30 === 0) {
      n += 2;
      x <<= 2;
    }
    n -= x >>> 31;
    return n;
  }


  function encodeExtraBytesToRead(extraBytesToRead) {
    return ~(0xff >> extraBytesToRead);
  }

  /**
   * @param {Buffer} buffer
   * @param {{value: number}} offset
   * @returns {Long}
   */
  function readVInt(buffer, offset) {
    return decodeZigZag64(readUnsignedVInt(buffer, offset));
  }

  /**
   * @param {Buffer} input
   * @param {{ value: number}} offset
   * @returns {Long}
   */
  function readUnsignedVInt(input, offset) {
    var firstByte = input[offset.value++];
    if ((firstByte & 0x80) === 0) {
      return Long.fromInt(firstByte);
    }
    var sByteInt = fromSignedByteToInt(firstByte);
    var size = numberOfExtraBytesToRead(sByteInt);
    var result = Long.fromInt(sByteInt & firstByteValueMask(size));
    for (var ii = 0; ii < size; ii++) {
      var b = Long.fromInt(input[offset.value++]);
      //       (result << 8) | b
      result = result.shiftLeft(8).or(b);
    }
    return result;
  }

  function fromSignedByteToInt(value) {
    if (value > 0x7f) {
      return value - 0x0100;
    }
    return value;
  }

  function numberOfLeadingZerosInt32(i) {
    if (i === 0) {
      return 32;
    }
    var n = 1;
    if (i >>> 16 === 0) {
      n += 16;
      i <<= 16;
    }
    if (i >>> 24 === 0) {
      n += 8;
      i <<= 8;
    }
    if (i >>> 28 === 0) {
      n += 4;
      i <<= 4;
    }
    if (i >>> 30 === 0) {
      n += 2;
      i <<= 2;
    }
    n -= i >>> 31;
    return n;
  }

  /**
   * @param {Number} firstByte
   * @returns {Number}
   */
  function numberOfExtraBytesToRead(firstByte) {
    // Instead of counting 1s of the byte, we negate and count 0 of the byte
    return numberOfLeadingZerosInt32(~firstByte) - 24;
  }

  /**
   * @param {Number} extraBytesToRead
   * @returns {Number}
   */
  function firstByteValueMask(extraBytesToRead) {
    return 0xff >> extraBytesToRead;
  }

  return {
    readVInt: readVInt,
    writeVInt: writeVInt
  };
})();

module.exports = Duration;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

/** @module types */
/**
 * Creates a new instance of InetAddress
 * @class
 * @classdesc Represents an v4 or v6 Internet Protocol (IP) address.
 * @param {Buffer} buffer
 * @constructor
 */
function InetAddress(buffer) {
  if (!(buffer instanceof Buffer) || (buffer.length !== 4 && buffer.length !== 16)) {
    throw new TypeError('The ip address must contain 4 or 16 bytes');
  }
  this.buffer = buffer;
  /**
   * Returns the length of the underlying buffer
   * @name length
   * @type Number
   * @memberof module:types~InetAddress#
   */
  Object.defineProperty(this, 'length', {get: function () { return buffer.length; }, enumerable: true});
  /**
   * Returns the Ip version (4 or 6)
   * @name version
   * @type Number
   * @memberof module:types~InetAddress#
   */
  Object.defineProperty(this, 'version', {get: function () { return buffer.length === 4 ? 4 : 6; }, enumerable: true});
}

/**
 * Parses the string representation and returns an Ip address
 * @param {String} value
 */
InetAddress.fromString = function (value) {
  if (!value) {
    return new InetAddress(utils.allocBufferFromArray([0, 0, 0, 0]));
  }
  var ipv4Pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  var ipv6Pattern = /^[\da-f:.]+$/i;
  var parts;
  if (ipv4Pattern.test(value)) {
    parts = value.split('.');
    return new InetAddress(utils.allocBufferFromArray(parts));
  }
  if (!ipv6Pattern.test(value)) {
    throw new TypeError('Value could not be parsed as InetAddress: ' + value);
  }
  parts = value.split(':');
  if (parts.length < 3) {
    throw new TypeError('Value could not be parsed as InetAddress: ' + value);
  }
  var buffer = utils.allocBufferUnsafe(16);
  var filling = 8 - parts.length + 1;
  var applied = false;
  var offset = 0;
  var embeddedIp4 = ipv4Pattern.test(parts[parts.length - 1]);
  if (embeddedIp4) {
    // Its IPv6 address with an embedded IPv4 address:
    // subtract 1 from the potential empty filling as ip4 contains 4 bytes instead of 2 of a ipv6 section
    filling -= 1;
  }
  function writeItem(uIntValue) {
    buffer.writeUInt8(+uIntValue, offset++);
  }
  for (var i = 0; i < parts.length; i++) {
    var item = parts[i];
    if (item) {
      if (embeddedIp4 && i === parts.length - 1) {
        item.split('.').forEach(writeItem);
        break;
      }
      buffer.writeUInt16BE(parseInt(item, 16), offset);
      offset = offset + 2;
      continue;
    }
    //its an empty string
    if (applied) {
      //there could be 2 occurrences of empty string
      filling = 1;
    }
    applied = true;
    for (var j = 0; j < filling; j++) {
      buffer[offset++] = 0;
      buffer[offset++] = 0;
    }
  }
  if (embeddedIp4 && !isValidIPv4Mapped(buffer)) {
    throw new TypeError('Only IPv4-Mapped IPv6 addresses are allowed as IPv6 address with embedded IPv4 address');
  }
  return new InetAddress(buffer);
};

/**
 * Compares 2 addresses and returns true if the underlying bytes are the same
 * @param {InetAddress} other
 * @returns {Boolean}
 */
InetAddress.prototype.equals = function (other) {
  if (!(other instanceof InetAddress)) {
    return false;
  }
  return (this.buffer.length === other.buffer.length &&
    this.buffer.toString('hex') === other.buffer.toString('hex'));
};

/**
 * Returns the underlying buffer
 * @returns {Buffer}
 */
InetAddress.prototype.getBuffer = function () {
  return this.buffer;
};

/**
 * Provide the name of the constructor and the string representation
 * @returns {string}
 */
InetAddress.prototype.inspect = function () {
  return this.constructor.name + ': ' + this.toString();
};

/**
 * Returns the string representation of the IP address.
 * <p>For v4 IP addresses, a string in the form of d.d.d.d is returned.</p>
 * <p>
 *   For v6 IP addresses, a string in the form of x:x:x:x:x:x:x:x is returned, where the 'x's are the hexadecimal
 *   values of the eight 16-bit pieces of the address, according to rfc5952.
 *   In cases where there is more than one field of only zeros, it can be shortened. For example, 2001:0db8:0:0:0:1:0:1
 *   will be expressed as 2001:0db8::1:0:1.
 * </p>
 * @param {String} [encoding]
 * @returns {String}
 */
InetAddress.prototype.toString = function (encoding) {
  if (encoding === 'hex') {
    //backward compatibility: behave in the same way as the buffer
    return this.buffer.toString('hex');
  }
  if (this.buffer.length === 4) {
    return (
      this.buffer[0] + '.' +
      this.buffer[1] + '.' +
      this.buffer[2] + '.' +
      this.buffer[3]
    );
  }
  var start = -1;
  var longest = { length: 0, start: -1};
  function checkLongest (i) {
    if (start >= 0) {
      //close the group
      var length = i - start;
      if (length > longest.length) {
        longest.length = length;
        longest.start = start;
        start = -1;
      }
    }
  }
  //get the longest 16-bit group of zeros
  for (var i = 0; i < this.buffer.length; i = i + 2) {
    if (this.buffer[i] === 0 && this.buffer[i + 1] === 0) {
      //its a group of zeros
      if (start < 0) {
        start = i;
      }

      // at the end of the buffer, make a final call to checkLongest.
      if(i === this.buffer.length - 2) {
        checkLongest(i+2);
      }
      continue;
    }
    //its a group of non-zeros
    checkLongest(i);
  }

  var address = '';
  for (var h = 0; h < this.buffer.length; h = h + 2) {
    if (h === longest.start) {
      address += ':';
      continue;
    }
    if (h < (longest.start + longest.length) && h > longest.start) {
      //its a group of zeros
      continue;
    }
    if (address.length > 0) {
      address += ':';
    }
    address += ((this.buffer[h] << 8) | this.buffer[h+1]).toString(16);
  }
  if (address.charAt(address.length-1) === ':') {
    address += ':';
  }
  return address;
};

/**
 * Returns the string representation.
 * Method used by the native JSON.stringify() to serialize this instance.
 */
InetAddress.prototype.toJSON = function () {
  return this.toString();
};

/**
 * Validates for a IPv4-Mapped IPv6 according to https://tools.ietf.org/html/rfc4291#section-2.5.5
 * @private
 * @param {Buffer} buffer
 */
function isValidIPv4Mapped(buffer) {
  // check the form
  // |      80 bits   | 16 |   32 bits
  // +----------------+----+-------------
  // |0000........0000|FFFF| IPv4 address

  for (var i = 0; i < buffer.length - 6; i++) {
    if (buffer[i] !== 0) {
      return false;
    }
  }
  return !(buffer[10] !== 255 || buffer[11] !== 255);
}

module.exports = InetAddress;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var utils = __webpack_require__(1);
/** @module types */

/**
 * @private
 * @const
 */
var millisecondsPerDay = 86400000;
/**
 * @private
 */
var dateCenter = Math.pow(2,31);
/**
 *
 * Creates a new instance of LocalDate.
 * @class
 * @classdesc A date without a time-zone in the ISO-8601 calendar system, such as 2010-08-05.
 * <p>
 *   LocalDate is an immutable object that represents a date, often viewed as year-month-day. For example, the value "1st October 2014" can be stored in a LocalDate.
 * </p>
 * <p>
 *   This class does not store or represent a time or time-zone. Instead, it is a description of the date, as used for birthdays. It cannot represent an instant on the time-line without additional information such as an offset or time-zone.
 * </p>
 * <p>
 *   Note that this type can represent dates in the range [-5877641-06-23; 5881580-07-17] while the ES5 date type can only represent values in the range of [-271821-04-20; 275760-09-13].
 *   In the event that year, month, day parameters do not fall within the ES5 date range an Error will be thrown.  If you wish to represent a date outside of this range, pass a single
 *   parameter indicating the days since epoch.  For example, -1 represents 1969-12-31.
 * </p>
 * @param {Number} year The year or days since epoch.  If days since epoch, month and day should not be provided.
 * @param {Number} month Between 1 and 12 inclusive.
 * @param {Number} day Between 1 and the number of days in the given month of the given year.
 *
 * @property {Date} date The date representation if falls within a range of an ES5 data type, otherwise an invalid date.
 *
 * @constructor
 */
function LocalDate(year, month, day) {
  //implementation detail: internally uses a UTC based date
  if (typeof year === 'number' && typeof month === 'number' && typeof day === 'number') {
    //Use setUTCFullYear as if there is a 2 digit year, Date.UTC() assumes
    //that is the 20th century.  Thanks ECMAScript!
    //noinspection JSValidateTypes
    this.date = new Date();
    this.date.setUTCHours(0, 0, 0, 0);
    this.date.setUTCFullYear(year, month-1, day);
    if(isNaN(this.date.getTime())) {
      throw new Error(util.format('%d-%d-%d does not form a valid ES5 date!',
        year, month, day));
    }
  }
  else if (typeof month === 'undefined' && typeof day === 'undefined') {
    if (typeof year === 'number') {
      //in days since epoch.
      if(year < -2147483648 || year > 2147483647) {
        throw new Error('You must provide a valid value for days since epoch (-2147483648 <= value <= 2147483647).');
      }
      //noinspection JSValidateTypes
      this.date = new Date(year * millisecondsPerDay);
    }
  }

  if (typeof this.date === 'undefined') {
    throw new Error('You must provide a valid year, month and day');
  }

  //If date cannot be represented yet given a valid days since epoch, track
  //it internally.
  var value = isNaN(this.date.getTime()) ? year : null;
  Object.defineProperty(this, '_value', { enumerable: false, value: value });

  var self = this;

  /**
   * A number representing the year.  May return NaN if cannot be represented as
   * a Date.
   * @name year
   * @type Number
   * @memberof module:types~LocalDate#
   */
  /**
   * A number between 1 and 12 inclusive representing the month.  May return
   * NaN if cannot be represented as a Date.
   * @name month
   * @type Number
   * @memberof module:types~LocalDate#
   */
  /**
   * A number between 1 and the number of days in the given month of the given year (28, 29, 30, 31).
   * May return NaN if cannot be represented as a Date.
   * @name day
   * @type Number
   * @memberof module:types~LocalDate#
   */
  Object.defineProperties(this, {
    'year': { enumerable: true, get: function () {
      return self.date.getUTCFullYear();
    }},
    'month': { enumerable: true, get: function () {
      return self.date.getUTCMonth() + 1;
    }},
    'day': { enumerable: true, get: function () {
      return self.date.getUTCDate();
    }}
  });
}

/**
 * Creates a new instance of LocalDate using the current year, month and day from the system clock in the default time-zone.
 */
LocalDate.now = function () {
  //noinspection JSCheckFunctionSignatures
  return LocalDate.fromDate(new Date());
};

/**
 * Creates a new instance of LocalDate using the current date from the system clock at UTC.
 */
LocalDate.utcNow = function () {
  //noinspection JSCheckFunctionSignatures
  return new LocalDate(Date.now());
};


/**
 * Creates a new instance of LocalDate using the year, month and day from the provided local date time.
 * @param {Date} date
 */
LocalDate.fromDate = function (date) {
  if (isNaN(date.getTime())) {
    throw new TypeError('Invalid date: ' + date);
  }
  return new LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

/**
 * Creates a new instance of LocalDate using the year, month and day provided in the form: yyyy-mm-dd or
 * days since epoch (i.e. -1 for Dec 31, 1969).
 * @param {String} value
 */
LocalDate.fromString = function (value) {
  var dashCount = (value.match(/-/g) || []).length;
  if(dashCount >= 2) {
    var multiplier = 1;
    if (value[0] === '-') {
      value = value.substring(1);
      multiplier = -1;
    }
    var parts = value.split('-');
    return new LocalDate(multiplier * parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
  }
  if(value.match(/^-?\d+$/)) {
    // Parse as days since epoch.
    return new LocalDate(parseInt(value, 10));
  }
  throw new Error("Invalid input '" + value + "'.");
};

/**
 * Creates a new instance of LocalDate using the bytes representation.
 * @param {Buffer} buffer
 */
LocalDate.fromBuffer = function (buffer) {
  //move to unix epoch: 0.
  //noinspection JSCheckFunctionSignatures
  return new LocalDate((buffer.readUInt32BE(0) - dateCenter));
};

/**
 * Compares this LocalDate with the given one.
 * @param {LocalDate} other date to compare against.
 * @return {number} 0 if they are the same, 1 if the this is greater, and -1
 * if the given one is greater.
 */
LocalDate.prototype.compare = function (other) {
  var thisValue = isNaN(this.date.getTime()) ? this._value * millisecondsPerDay : this.date.getTime();
  var otherValue = isNaN(other.date.getTime()) ? other._value * millisecondsPerDay : other.date.getTime();
  var diff = thisValue - otherValue;
  if (diff < 0) {
    return -1;
  }
  if (diff > 0) {
    return 1;
  }
  return 0;
};

/**
 * Returns true if the value of the LocalDate instance and other are the same
 * @param {LocalDate} other
 * @returns {Boolean}
 */
LocalDate.prototype.equals = function (other) {
  return ((other instanceof LocalDate)) && this.compare(other) === 0;
};

LocalDate.prototype.inspect = function () {
  return this.constructor.name + ': ' + this.toString();
};

/**
 * Gets the bytes representation of the instance.
 * @returns {Buffer}
 */
LocalDate.prototype.toBuffer = function () {
  //days since unix epoch
  var daysSinceEpoch = isNaN(this.date.getTime()) ? this._value : Math.floor(this.date.getTime() / millisecondsPerDay);
  var value = daysSinceEpoch + dateCenter;
  var buf = utils.allocBufferUnsafe(4);
  buf.writeUInt32BE(value, 0);
  return buf;
};

/**
 * Gets the string representation of the instance in the form: yyyy-mm-dd if
 * the value can be parsed as a Date, otherwise days since epoch.
 * @returns {String}
 */
LocalDate.prototype.toString = function () {
  var result;
  //if cannot be parsed as date, return days since epoch representation.
  if (isNaN(this.date.getTime())) {
    return this._value.toString();
  }
  var year = this.date.getUTCFullYear();
  var month = this.date.getUTCMonth() + 1;
  var day = this.date.getUTCDate();
  if (year < 0) {
    result = '-' + fillZeros((year * -1).toString(), 4);
  }
  else {
    result = fillZeros(year.toString(), 4);
  }
  result += '-' + fillZeros(month.toString(), 2) + '-' + fillZeros(day.toString(), 2);
  return result;
};

/**
 * Gets the string representation of the instance in the form: yyyy-mm-dd, valid for JSON.
 * @returns {String}
 */
LocalDate.prototype.toJSON = function () {
  return this.toString();
};

/**
 * @param {String} value
 * @param {Number} amount
 * @private
 */
function fillZeros(value, amount) {
  if (value.length >= amount) {
    return value;
  }
  return utils.stringRepeat('0', amount - value.length) + value;
}

module.exports = LocalDate;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Long = __webpack_require__(6);
var util = __webpack_require__(0);
var utils = __webpack_require__(1);
/** @module types */

/**
 * @const
 * @private
 * */
var maxNanos = Long.fromString('86399999999999');
/**
 * Nanoseconds in a second
 * @const
 * @private
 * */
var nanoSecInSec = Long.fromNumber(1000000000);
/**
 * Nanoseconds in a millisecond
 * @const
 * @private
 * */
var nanoSecInMillis = Long.fromNumber(1000000);
/**
 * Milliseconds in day
 * @const
 * @private
 * */
var millisInDay = 86400000;
/**
 *
 * Creates a new instance of LocalTime.
 * @class
 * @classdesc A time without a time-zone in the ISO-8601 calendar system, such as 10:30:05.
 * <p>
 *   LocalTime is an immutable date-time object that represents a time, often viewed as hour-minute-second. Time is represented to nanosecond precision. For example, the value "13:45.30.123456789" can be stored in a LocalTime.
 * </p>
 * @param {Long} totalNanoseconds Total nanoseconds since midnight.
 * @constructor
 */
function LocalTime(totalNanoseconds) {
  if (!(totalNanoseconds instanceof Long)) {
    throw new Error('You must specify a Long value as totalNanoseconds');
  }
  if (totalNanoseconds.lessThan(Long.ZERO) || totalNanoseconds.greaterThan(maxNanos)) {
    throw new Error('Total nanoseconds out of range');
  }
  this.value = totalNanoseconds;
  var self = this;
  /**
   * Gets the hour component of the time represented by the current instance, a number from 0 to 23.
   * @name hour
   * @type Number
   * @memberof module:types~LocalTime#
   */
  /**
   * Gets the minute component of the time represented by the current instance, a number from 0 to 59.
   * @name minute
   * @type Number
   * @memberof module:types~LocalTime#
   */
  /**
   * Gets the second component of the time represented by the current instance, a number from 0 to 59.
   * @name day
   * @type Number
   * @memberof module:types~LocalTime#
   */
  /**
   * Gets the nanoseconds component of the time represented by the current instance, a number from 0 to 999999999.
   * @name nanosecond
   * @type Number
   * @memberof module:types~LocalTime#
   */
  Object.defineProperties(this, {
    'hour': { enumerable: true, get: function () {
      return self._getParts()[0];
    }},
    'minute': { enumerable: true, get: function () {
      return self._getParts()[1];
    }},
    'second': { enumerable: true, get: function () {
      return self._getParts()[2];
    }},
    'nanosecond': { enumerable: true, get: function () {
      return self._getParts()[3];
    }}
  });
}

/**
 * Parses an string representation and returns a new LocalDate.
 * @param {String} value
 * @returns {LocalTime}
 */
LocalTime.fromString = function (value) {
  if (typeof value !== 'string') {
    throw new Error('Argument type invalid: ' + util.inspect(value));
  }
  var parts = value.split(':');
  var millis = parseInt(parts[0], 10) * 3600000 + parseInt(parts[1], 10) * 60000;
  var nanos;
  if (parts.length === 3) {
    var secParts = parts[2].split('.');
    millis += parseInt(secParts[0], 10) * 1000;
    if (secParts.length === 2) {
      nanos = secParts[1];
      //add zeros at the end
      nanos = nanos + utils.stringRepeat('0', 9 - nanos.length);
    }
  }
  return LocalTime.fromMilliseconds(millis, parseInt(nanos, 10) || 0);
};

/**
 * Uses the current local time (in milliseconds) and the nanoseconds to create a new instance of LocalTime
 * @param {Number} [nanoseconds] A Number from 0 to 999,999, representing the time nanosecond portion.
 * @returns {LocalTime}
 */
LocalTime.now = function (nanoseconds) {
  return LocalTime.fromDate(new Date(), nanoseconds);
};

/**
 * Uses the provided local time (in milliseconds) and the nanoseconds to create a new instance of LocalTime
 * @param {Date} date Local date portion to extract the time passed since midnight.
 * @param {Number} [nanoseconds] A Number from 0 to 999,999, representing the nanosecond time portion.
 * @returns {LocalTime}
 */
LocalTime.fromDate = function (date, nanoseconds) {
  if (!util.isDate(date)) {
    throw new Error('Not a valid date');
  }
  //Use the local representation
  var millis = date.getTime() + date.getTimezoneOffset() * -60000;
  //Only the milliseconds part
  millis = millis % millisInDay;
  return LocalTime.fromMilliseconds(millis, nanoseconds);
};

/**
 * Uses the provided local time (in milliseconds) and the nanoseconds to create a new instance of LocalTime
 * @param {Number} milliseconds A Number from 0 to 86,399,999.
 * @param {Number} [nanoseconds] A Number from 0 to 999,999, representing the time nanosecond portion.
 * @returns {LocalTime}
 */
LocalTime.fromMilliseconds = function (milliseconds, nanoseconds) {
  if (typeof nanoseconds !== 'number') {
    nanoseconds = 0;
  }
  return new LocalTime(Long
    .fromNumber(milliseconds)
    .multiply(nanoSecInMillis)
    .add(Long.fromNumber(nanoseconds)));
};

/**
 * Creates a new instance of LocalTime from the bytes representation.
 * @param {Buffer} value
 * @returns {LocalTime}
 */
LocalTime.fromBuffer = function (value) {
  if (!(value instanceof Buffer)) {
    throw new TypeError('Expected Buffer, obtained ' + util.inspect(value));
  }
  return new LocalTime(new Long(value.readInt32BE(4), value.readInt32BE(0)));
};

/**
 * Compares this LocalTime with the given one.
 * @param {LocalTime} other time to compare against.
 * @return {number} 0 if they are the same, 1 if the this is greater, and -1
 * if the given one is greater.
 */
LocalTime.prototype.compare = function (other) {
  return this.value.compare(other.value);
};

/**
 * Returns true if the value of the LocalTime instance and other are the same
 * @param {LocalTime} other
 * @returns {Boolean}
 */
LocalTime.prototype.equals = function (other) {
  return ((other instanceof LocalTime)) && this.compare(other) === 0;
};

/**
 * Gets the total amount of nanoseconds since midnight for this instance.
 * @returns {Long}
 */
LocalTime.prototype.getTotalNanoseconds = function () {
  return this.value;
};

LocalTime.prototype.inspect = function () {
  return this.constructor.name + ': ' + this.toString();
};

/**
 * Returns a big-endian bytes representation of the instance
 * @returns {Buffer}
 */
LocalTime.prototype.toBuffer = function () {
  var buffer = utils.allocBufferUnsafe(8);
  buffer.writeUInt32BE(this.value.getHighBitsUnsigned(), 0);
  buffer.writeUInt32BE(this.value.getLowBitsUnsigned(), 4);
  return buffer;
};

/**
 * Returns the string representation of the instance in the form of hh:MM:ss.ns
 * @returns {String}
 */
LocalTime.prototype.toString = function () {
  return formatTime(this._getParts());
};

/**
 * Gets the string representation of the instance in the form: hh:MM:ss.ns
 * @returns {String}
 */
LocalTime.prototype.toJSON = function () {
  return this.toString();
};

/**
 * @returns {Array.<Number>}
 * @ignore
 */
LocalTime.prototype._getParts = function () {
  if (!this._partsCache) {
    //hours, minutes, seconds and nanos
    var parts = [0, 0, 0, 0];
    var secs = this.value.div(nanoSecInSec);
    //faster modulo
    //total nanos
    parts[3] = this.value.subtract(secs.multiply(nanoSecInSec)).toNumber();
    //seconds
    parts[2] = secs.toNumber();
    if (parts[2] >= 60) {
      //minutes
      parts[1] = Math.floor(parts[2] / 60);
      parts[2] = parts[2] % 60;
    }
    if (parts[1] >= 60) {
      //hours
      parts[0] = Math.floor(parts[1] / 60);
      parts[1] = parts[1] % 60;
    }
    this._partsCache = parts;
  }
  return this._partsCache;
};

/**
 * @param {Array.<Number>} values
 * @private
 */
function formatTime(values) {
  var result;
  if (values[0] < 10) {
    result = '0' + values[0] + ':';
  }
  else {
    result = values[0] + ':';
  }
  if (values[1] < 10) {
    result += '0' + values[1] + ':';
  }
  else {
    result += values[1] + ':';
  }
  if (values[2] < 10) {
    result += '0' + values[2];
  }
  else {
    result += values[2];
  }
  if (values[3] > 0) {
    var nanos = values[3].toString();
    //nine digits
    if (nanos.length < 9) {
      nanos = utils.stringRepeat('0', 9 - nanos.length) + nanos;
    }
    var lastPosition;
    for (var i = nanos.length - 1; i > 0; i--) {
      if (nanos[i] !== '0') {
        break;
      }
      lastPosition = i;
    }
    if (lastPosition) {
      nanos = nanos.substring(0, lastPosition);
    }
    result += '.' + nanos;
  }
  return result;
}

module.exports = LocalTime;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils = __webpack_require__(1);

/** @module types */

/**
 * Creates a new instance of ResultSet.
 * @class
 * @classdesc Represents the result of a query.
 * @param {Object} response
 * @param {String} host
 * @param {Object} triedHosts
 * @param {Number} consistency
 * @constructor
 */
function ResultSet(response, host, triedHosts, speculativeExecutions, consistency) {
  // if no execution was made at all, set to 0.
  if (speculativeExecutions === -1) {
    speculativeExecutions = 0;
  }
  /**
   * Information on the execution of a successful query:
   * @member {Object}
   * @property {Number} achievedConsistency The consistency level that has been actually achieved by the query.
   * @property {String} queriedHost The Cassandra host that coordinated this query.
   * @property {Object} triedHosts Gets the associative array of host that were queried before getting a valid response,
   * being the last host the one that replied correctly.
   * @property {Object} speculativeExecutions The number of speculative executions (not including the first) executed before
   * getting a valid response.
   * @property {Uuid} traceId Identifier of the trace session.
   * @property {Array.<string>} warnings Warning messages generated by the server when executing the query.
   */
  this.info = {
    queriedHost: host,
    triedHosts: triedHosts,
    speculativeExecutions: speculativeExecutions,
    achievedConsistency: consistency,
    traceId: null,
    warnings: null,
    customPayload: null
  };
  if (response.flags) {
    this.info.traceId = response.flags.traceId;
    this.info.warnings = response.flags.warnings;
    this.info.customPayload = response.flags.customPayload;
  }
  /**
   * Gets an array rows returned by the query, in case the result was buffered.
   * @type {Array.<Row>}
   */
  this.rows = response.rows;
  /**
   * Gets the row length of the result, regardless if the result has been buffered or not
   * @type {Number}
   */
  this.rowLength = this.rows ? this.rows.length : response.rowLength;
  /**
   * Gets the columns returned in this ResultSet.
   * @type {Array.<{name, type}>}
   * @default null
   */
  this.columns = null;
  /**
   * A string token representing the current page state of query. It can be used in the following executions to
   * continue paging and retrieve the remained of the result for the query.
   * @type String
   * @default null
   */
  this.pageState = null;
  /**
   * Method used to manually fetch the next page of results.
   * This method is only exposed when using the {@link Client#eachRow} method and there are more rows available in
   * following pages.
   * @type Function
   */
  this.nextPage = undefined;

  var meta = response.meta;
  if (meta) {
    this.columns = meta.columns;
    if (meta.pageState) {
      this.pageState = meta.pageState.toString('hex');
    }
  }
  if (response.id) {
    // internal properties for prepared responses
    Object.defineProperty(this, 'id', { value: response.id, enumerable: false});
    Object.defineProperty(this, 'meta', { value: response.meta, enumerable: false});
  }
  else if (this.pageState !== null) {
    // page state was exposed in version 1 via result.meta.pageState as a Buffer.
    // it was not specified in the upgrade guide to v2, we must wait for a next major to remove it
    Object.defineProperty(this, 'meta', { value: response.meta, enumerable: false});
  }
}

/**
 * Returns the first row or null if the result rows are empty.
 */
ResultSet.prototype.first = function () {
  if (this.rows && this.rows.length) {
    return this.rows[0];
  }
  return null;
};

ResultSet.prototype.getPageState = function () {
  // backward-compatibility
  return this.pageState;
};

ResultSet.prototype.getColumns = function () {
  // backward-compatibility
  return this.columns;
};

/**
 * When this instance is the result of a conditional update query, it returns whether it was successful.
 * Otherwise, it returns <code>true</code>.
 * <p>
 *   For consistency, this method always returns <code>true</code> for non-conditional queries (although there is
 *   no reason to call the method in that case). This is also the case for conditional DDL statements
 *   (CREATE KEYSPACE... IF NOT EXISTS, CREATE TABLE... IF NOT EXISTS), for which the server doesn't return
 *   information whether it was applied or not.
 * </p>
 */
ResultSet.prototype.wasApplied = function () {
  if (!this.rows || this.rows.length === 0) {
    return true;
  }
  var firstRow = this.rows[0];
  var applied = firstRow['[applied]'];
  return typeof applied === 'boolean' ? applied : true;
};

if (typeof Symbol !== 'undefined' && typeof Symbol.iterator === 'symbol') {
  /**
   * Gets the iterator function.
   * <p>
   *   Retrieves the iterator of the underlying fetched rows and will not cause the driver to fetch the following
   *   result pages. For more information on result paging,
   *   [visit the documentation]{@link http://docs.datastax.com/en/developer/nodejs-driver/latest/features/paging/}.
   * </p>
   * @alias module:types~ResultSet#@@iterator
   * @example <caption>Using for...of statement</caption>
   * const query = 'SELECT name, email, address FROM users WHERE id = ?';
   * const result = await client.execute(query, [ id ], { prepare: true });
   * for (let row of result) {
   *   console.log(row['email']);
   * }
   * @returns {Iterator.<Row>}
   */
  ResultSet.prototype[Symbol.iterator] = function getIterator() {
    if (!this.rows) {
      return utils.emptyArray[Symbol.iterator]();
    }
    return this.rows[Symbol.iterator]();
  };
}

module.exports = ResultSet;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var stream = __webpack_require__(13);

/** @module types */
/**
 * Readable stream using to yield data from a result or a field
 * @constructor
 */
function ResultStream(opt) {
  stream.Readable.call(this, opt);
  this.buffer = [];
  this.paused = true;
}

util.inherits(ResultStream, stream.Readable);

ResultStream.prototype._read = function() {
  this.paused = false;
  if (this.buffer.length === 0) {
    this._readableState.reading = false;
  }
  while (!this.paused && this.buffer.length > 0) {
    this.paused = !this.push(this.buffer.shift());
  }
  if ( !this.paused && !this.buffer.length && this._readNext ) {
    this._readNext();
    this._readNext = null;
  }
};

/**
 * Allows for throttling, helping nodejs keep the internal buffers reasonably sized.
 * @param {function} readNext function that triggers reading the next result chunk
 */
ResultStream.prototype._valve = function( readNext ) {
  this._readNext = null;
  if ( !readNext ) {
    return;
  }
  if ( this.paused || this.buffer.length ) {
    this._readNext = readNext;
  }
  else {
    readNext();
  }
};

ResultStream.prototype.add = function (chunk) {
  this.buffer.push(chunk);
  this.read(0);
};

module.exports = ResultStream;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module types */
/**
 * Represents a result row
 * @param {Array} columns
 * @constructor
 */
function Row(columns) {
  if (!columns) {
    throw new Error('Columns not defined');
  }
  //Private non-enumerable properties, with double underscore to avoid interfering with column names
  Object.defineProperty(this, '__columns', { value: columns, enumerable: false, writable: false});
}

/**
 * Returns the cell value.
 * @param {String|Number} columnName Name or index of the column
 */
Row.prototype.get = function (columnName) {
  if (typeof columnName === 'number') {
    //its an index
    return this[this.__columns[columnName].name];
  }
  return this[columnName];
};

/**
 * Returns an array of the values of the row
 * @returns {Array}
 */
Row.prototype.values = function () {
  var valuesArray = [];
  this.forEach(function (val) {
    valuesArray.push(val);
  });
  return valuesArray;
};

/**
 * Returns an array of the column names of the row
 * @returns {Array}
 */
Row.prototype.keys = function () {
  var keysArray = [];
  this.forEach(function (val, key) {
    keysArray.push(key);
  });
  return keysArray;
};

/**
 * Executes the callback for each field in the row, containing the value as first parameter followed by the columnName
 * @param {Function} callback
 */
Row.prototype.forEach = function (callback) {
  for (var columnName in this) {
    if (!this.hasOwnProperty(columnName)) {
      continue;
    }
    callback(this[columnName], columnName);
  }
};

module.exports = Row;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
/** @module types */
/**
 * Creates a new sequence of immutable objects with the parameters provided.
 * @class
 * @classdesc A tuple is a sequence of immutable objects.
 * Tuples are sequences, just like [Arrays]{@link Array}. The only difference is that tuples can't be changed.
 * <p>
 *   As tuples can be used as a Map keys, the {@link Tuple#toString toString()} method calls toString of each element,
 *   to try to get a unique string key.
 * </p>
 * @param [arguments] The sequence elements as arguments.
 * @constructor
 */
function Tuple() {
  var elements = Array.prototype.slice.call(arguments);
  if (elements.length === 0) {
    throw new TypeError('Tuple must contain at least one value');
  }
  if (elements.length === 1 && util.isArray(elements)) {
    //The first argument is an array of the elements, use a copy of the array
    elements = elements[0];
  }
  Object.defineProperty(this, 'elements', { value: elements, enumerable: false, writable: false });
  /**
   * Returns the number of the elements.
   * @name length
   * @type Number
   * @memberof module:types~Tuple#
   */
  Object.defineProperty(this, 'length', { value: elements.length, enumerable: false, writable: false });
}

/**
 * Creates a new instance of a tuple based on the Array
 * @param {Array} elements
 * @returns {Tuple}
 */
Tuple.fromArray = function (elements) {
  //Use a copy of an array
  return new Tuple(elements.slice(0));
};

/**
 * Returns the value located at the index.
 * @param {Number} index Element index
 */
Tuple.prototype.get = function (index) {
  return this.elements[index || 0];
};

/**
 * Returns the string representation of the sequence surrounded by parenthesis, ie: (1, 2).
 * <p>
 *   The returned value attempts to be a unique string representation of its values.
 * </p>
 * @returns {string}
 */
Tuple.prototype.toString = function () {
  return ('(' +
    this.elements.reduce(function (prev, x, i) {
      return prev + (i > 0 ? ',' : '') + x.toString();
    }, '') +
    ')');
};

/**
 * Returns the Array representation of the sequence.
 * @returns {Array}
 */
Tuple.prototype.toJSON = function () {
  return this.elements;
};

/**
 * Gets the elements as an array
 * @returns {Array}
 */
Tuple.prototype.values = function () {
  return this.elements.slice(0);
};

module.exports = Tuple;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

/** @module policies/reconnection */
/**
 * Base class for Reconnection Policies
 * @constructor
 */
function ReconnectionPolicy() {

}

/**
 * A new reconnection schedule.
 * @returns {{next: function}} An infinite iterator
 */
ReconnectionPolicy.prototype.newSchedule = function () {
  throw new Error('You must implement a new schedule for the Reconnection class');
};

/**
 * A reconnection policy that waits a constant time between each reconnection attempt.
 * @param {Number} delay Delay in ms
 * @constructor
 */
function ConstantReconnectionPolicy(delay) {
  this.delay = delay;
}

util.inherits(ConstantReconnectionPolicy, ReconnectionPolicy);

/**
 * A new reconnection schedule that returns the same next delay value
 * @returns {{next: next}} An infinite iterator
 */
ConstantReconnectionPolicy.prototype.newSchedule = function () {
  var self = this;
  return {
    next: function () {
      return {value: self.delay, done: false};
    }
  };
};

/**
 * A reconnection policy that waits exponentially longer between each
 * reconnection attempt (but keeps a constant delay once a maximum delay is reached).
 * @param {Number} baseDelay Delay in ms that
 * @param {Number} maxDelay the maximum delay in ms to wait between two reconnection attempt
 * @param {Boolean} startWithNoDelay Determines if the first attempt should be zero delay
 * @constructor
 */
function ExponentialReconnectionPolicy(baseDelay, maxDelay, startWithNoDelay) {
  this.baseDelay = baseDelay;
  this.maxDelay = maxDelay;
  this.startWithNoDelay = startWithNoDelay;
}

util.inherits(ExponentialReconnectionPolicy, ReconnectionPolicy);

/**
 * A new schedule that uses an exponentially growing delay between reconnection attempts.
 * @returns {{next: next}} An infinite iterator
 */
ExponentialReconnectionPolicy.prototype.newSchedule = function () {
  var self = this;
  var index = this.startWithNoDelay ? -1 : 0;
  return {
    next: function () {
      index++;
      var delay = 0;
      if (index > 64) {
        delay = self.maxDelay;
      }
      else if (index !== 0) {
        delay = Math.min(Math.pow(2, index) * self.baseDelay, self.maxDelay);
      }
      return { value: delay, done: false };
    }
  };
};

exports.ReconnectionPolicy = ReconnectionPolicy;
exports.ConstantReconnectionPolicy = ConstantReconnectionPolicy;
exports.ExponentialReconnectionPolicy = ExponentialReconnectionPolicy;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var errors = __webpack_require__(3);

/** @module policies/speculativeExecution */

/**
 * @classdesc
 * The policy that decides if the driver will send speculative queries to the next hosts when the current host takes too
 * long to respond.
 * <p>Note that only idempotent statements will be speculatively retried.</p>
 * @constructor
 * @abstract
 */
function SpeculativeExecutionPolicy() {
  
}

/**
 * Initialization method that gets invoked on Client startup.
 * @param {Client} client
 * @abstract
 */
SpeculativeExecutionPolicy.prototype.init = function (client) {

};

/**
 * Gets invoked at client shutdown, giving the opportunity to the implementor to perform cleanup.
 * @abstract
 */
SpeculativeExecutionPolicy.prototype.shutdown = function () {

};

/**
 * Gets the plan to use for a new query.
 * Returns an object with a <code>nextExecution()</code> method, which returns a positive number representing the
 * amount of milliseconds to delay the next execution or a non-negative number to avoid further executions.
 * @param {String} keyspace The currently logged keyspace.
 * @param {String|Array<String>} queryInfo The query, or queries in the case of batches, for which to build a plan.
 * @return {{nextExecution: function}}
 * @abstract
 */
SpeculativeExecutionPolicy.prototype.newPlan = function (keyspace, queryInfo) {
  throw new Error('You must implement newPlan() method in the SpeculativeExecutionPolicy');
};

/**
 * Creates a new instance of NoSpeculativeExecutionPolicy.
 * @classdesc
 * A {@link SpeculativeExecutionPolicy} that never schedules speculative executions.
 * @constructor
 * @extends {SpeculativeExecutionPolicy}
 */
function NoSpeculativeExecutionPolicy() {
  this._plan = {
    nextExecution: function () {
      return -1;
    }
  };
}

util.inherits(NoSpeculativeExecutionPolicy, SpeculativeExecutionPolicy);

NoSpeculativeExecutionPolicy.prototype.newPlan = function () {
  return this._plan;
};


/**
 * Creates a new instance of ConstantSpeculativeExecutionPolicy.
 * @classdesc
 * A {@link SpeculativeExecutionPolicy} that schedules a given number of speculative executions,
 * separated by a fixed delay.
 * @constructor
 * @param {Number} delay The delay between each speculative execution.
 * @param {Number} maxSpeculativeExecutions The amount of speculative executions that should be scheduled after the
 * initial execution. Must be strictly positive.
 * @extends {SpeculativeExecutionPolicy}
 */
function ConstantSpeculativeExecutionPolicy(delay, maxSpeculativeExecutions) {
  if (!(delay >= 0)) {
    throw new errors.ArgumentError('delay must be a positive number or zero');
  }
  if (!(maxSpeculativeExecutions > 0)) {
    throw new errors.ArgumentError('maxSpeculativeExecutions must be a positive number');
  }
  this._delay = delay;
  this._maxSpeculativeExecutions = maxSpeculativeExecutions;
}

util.inherits(ConstantSpeculativeExecutionPolicy, SpeculativeExecutionPolicy);

ConstantSpeculativeExecutionPolicy.prototype.newPlan = function () {
  var executions = 0;
  var self = this;
  return {
    nextExecution: function () {
      if (executions++ < self._maxSpeculativeExecutions) {
        return self._delay;
      }
      return -1;
    }
  };
};

exports.NoSpeculativeExecutionPolicy = NoSpeculativeExecutionPolicy;
exports.SpeculativeExecutionPolicy = SpeculativeExecutionPolicy;
exports.ConstantSpeculativeExecutionPolicy = ConstantSpeculativeExecutionPolicy;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var Long = __webpack_require__(2).Long;
var errors = __webpack_require__(3);

/** @module policies/timestampGeneration */

/**
 * Defines the maximum date in milliseconds that can be represented in microseconds using Number ((2 ^ 53) / 1000)
 * @const
 * @private
 */
var _maxSafeNumberDate = 9007199254740;

/**
 * A long representing the value 1000
 * @const
 * @private
 */
var _longOneThousand = Long.fromInt(1000);

/**
 * Creates a new instance of {@link TimestampGenerator}.
 * @classdesc
 * Generates client-side, microsecond-precision query timestamps.
 * <p>
 *   Given that Cassandra uses those timestamps to resolve conflicts, implementations should generate
 *   monotonically increasing timestamps for successive invocations of {@link TimestampGenerator.next()}.
 * </p>
 * @constructor
 */
function TimestampGenerator() {

}

/**
 * Returns the next timestamp.
 * <p>
 *   Implementors should enforce increasing monotonicity of timestamps, that is,
 *   a timestamp returned should always be strictly greater that any previously returned
 *   timestamp.
 * <p/>
 * <p>
 *   Implementors should strive to achieve microsecond precision in the best possible way,
 *   which is usually largely dependent on the underlying operating system's capabilities.
 * </p>
 * @param {Client} client The {@link Client} instance to generate timestamps to.
 * @returns {Long|Number|null} the next timestamp (in microseconds). If it's equals to <code>null</code>, it won't be
 * sent by the driver, letting the server to generate the timestamp.
 * @abstract
 */
TimestampGenerator.prototype.next = function (client) {
  throw new Error('next() must be implemented');
};

/**
 * A timestamp generator that guarantees monotonically increasing timestamps and logs warnings when timestamps
 * drift in the future.
 * <p>
 *   {@link Date} has millisecond precision and client timestamps require microsecond precision. This generator
 *   keeps track of the last generated timestamp, and if the current time is within the same millisecond as the last,
 *   it fills the microsecond portion of the new timestamp with the value of an incrementing counter.
 * </p>
 * @param {Number} [warningThreshold] Determines how far in the future timestamps are allowed to drift before a
 * warning is logged, expressed in milliseconds. Default: <code>1000</code>.
 * @param {Number} [minLogInterval] In case of multiple log events, it determines the time separation between log
 * events, expressed in milliseconds. Use 0 to disable. Default: <code>1000</code>.
 * @extends {TimestampGenerator}
 * @constructor
 */
function MonotonicTimestampGenerator(warningThreshold, minLogInterval) {
  if (warningThreshold < 0) {
    throw new errors.ArgumentError('warningThreshold can not be lower than 0');
  }
  this._warningThreshold = warningThreshold || 1000;
  this._minLogInterval = 1000;
  if (typeof minLogInterval === 'number') {
    // A value under 1 will disable logging
    this._minLogInterval = minLogInterval;
  }
  this._micros = -1;
  this._lastDate = 0;
  this._lastLogDate = 0;
}

util.inherits(MonotonicTimestampGenerator, TimestampGenerator);

/**
 * Returns the current time in milliseconds since UNIX epoch
 * @returns {Number}
 */
MonotonicTimestampGenerator.prototype.getDate = function () {
  return Date.now();
};

MonotonicTimestampGenerator.prototype.next = function (client) {
  var date = this.getDate();
  var drifted = 0;
  if (date > this._lastDate) {
    this._micros = 0;
    this._lastDate = date;
    return this._generateMicroseconds();
  }

  if (date < this._lastDate) {
    drifted = this._lastDate - date;
    date = this._lastDate;
  }
  if (++this._micros === 1000) {
    this._micros = 0;
    if (date === this._lastDate) {
      // Move date 1 millisecond into the future
      date++;
      drifted++;
    }
  }
  var lastDate = this._lastDate;
  this._lastDate = date;
  var result = this._generateMicroseconds();
  if (drifted >= this._warningThreshold) {
    // Avoid logging an unbounded amount of times within a clock-skew event or during an interval when more than 1
    // query is being issued by microsecond
    var currentLogDate = Date.now();
    if (this._minLogInterval > 0 && this._lastLogDate + this._minLogInterval <= currentLogDate){
      var message = util.format(
        'Timestamp generated using current date was %d milliseconds behind the last generated timestamp (which ' +
        'millisecond portion was %d), the returned value (%s) is being artificially incremented to guarantee ' +
        'monotonicity.',
        drifted, lastDate, result);
      this._lastLogDate = currentLogDate;
      client.log('warning', message);
    }
  }
  return result;
};

/**
 * @private
 * @returns {Number|Long}
 */
MonotonicTimestampGenerator.prototype._generateMicroseconds = function () {
  if (this._lastDate < _maxSafeNumberDate) {
    // We are safe until Jun 06 2255, its faster to perform this operations on Number than on Long
    // We hope to have native int64 by then :)
    return this._lastDate * 1000 + this._micros;
  }
  return Long
    .fromNumber(this._lastDate)
    .multiply(_longOneThousand)
    .add(Long.fromInt(this._micros));
};

exports.TimestampGenerator = TimestampGenerator;
exports.MonotonicTimestampGenerator = MonotonicTimestampGenerator;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var events = __webpack_require__(4);
var util = __webpack_require__(0);

var utils = __webpack_require__(1);
var errors = __webpack_require__(3);
var types = __webpack_require__(2);
var ControlConnection = __webpack_require__(45);
var ProfileManager = __webpack_require__(23).ProfileManager;
var RequestHandler = __webpack_require__(20);
var PrepareHandler = __webpack_require__(19);
var requests = __webpack_require__(5);
var clientOptions = __webpack_require__(7);
var ClientState = __webpack_require__(63);

/**
 * Max amount of pools being warmup in parallel, when warmup is enabled
 * @const {Number}
 * @private
 */
var warmupLimit = 32;


/**
 * Client options
 * @typedef {Object} ClientOptions
 * @property {Array.<string>} contactPoints
 * Array of addresses or host names of the nodes to add as contact points.
 * <p>
 *  Contact points are addresses of Cassandra nodes that the driver uses to discover the cluster topology.
 * </p>
 * <p>
 *  Only one contact point is required (the driver will retrieve the address of the other nodes automatically),
 *  but it is usually a good idea to provide more than one contact point, because if that single contact point is
 *  unavailable, the driver will not be able to initialize correctly.
 * </p>
 * @property {String} keyspace The logged keyspace for all the connections created within the {@link Client} instance.
 * @property {Number} refreshSchemaDelay The default window size in milliseconds used to debounce node list and schema
 * refresh metadata requests. Default: 1000.
 * @property {Boolean} isMetadataSyncEnabled Determines whether client-side schema metadata retrieval and update is
 * enabled.
 * <p>Setting this value to <code>false</code> will cause keyspace information not to be automatically loaded, affecting
 * replica calculation per token in the different keyspaces. When disabling metadata synchronization, use
 * [Metadata.refreshKeyspaces()]{@link module:metadata~Metadata#refreshKeyspaces} to keep keyspace information up to
 * date or token-awareness will not work correctly.</p>
 * Default: <code>true</code>.
 * @property {Boolean} prepareOnAllHosts Determines if the driver should prepare queries on all hosts in the cluster.
 * Default: <code>true</code>.
 * @property {Boolean} rePrepareOnUp Determines if the driver should re-prepare all cached prepared queries on a
 * host when it marks it back up.
 * Default: <code>true</code>.
 * @property {Number} maxPrepared Determines the maximum amount of different prepared queries before evicting items
 * from the internal cache. Reaching a high threshold hints that the queries are not being reused, like when
 * hard-coding parameter values inside the queries.
 * Default: <code>500</code>.
 * @property {Object} policies
 * @property {LoadBalancingPolicy} policies.loadBalancing The load balancing policy instance to be used to determine
 * the coordinator per query.
 * @property {RetryPolicy} policies.retry The retry policy.
 * @property {ReconnectionPolicy} policies.reconnection The reconnection policy to be used.
 * @property {AddressTranslator} policies.addressResolution The address resolution policy.
 * @property {SpeculativeExecutionPolicy} policies.speculativeExecution The <code>SpeculativeExecutionPolicy</code>
 * instance to be used to determine if the client should send speculative queries when the selected host takes more
 * time than expected.
 * <p>
 *   Default: <code>[NoSpeculativeExecutionPolicy]{@link
  *   module:policies/speculativeExecution~NoSpeculativeExecutionPolicy}</code>
 * </p>
 * @property {TimestampGenerator} policies.timestampGeneration The client-side
 * [query timestamp generator]{@link module:policies/timestampGeneration~TimestampGenerator}.
 * <p>
 *   Default: <code>[MonotonicTimestampGenerator]{@link module:policies/timestampGeneration~MonotonicTimestampGenerator}
 *   </code>
 * </p>
 * <p>Use <code>null</code> to disable client-side timestamp generation.</p>
 * @property {QueryOptions} queryOptions Default options for all queries.
 * @property {Object} pooling Pooling options.
 * @property {Number} pooling.heartBeatInterval The amount of idle time in milliseconds that has to pass before the
 * driver issues a request on an active connection to avoid idle time disconnections. Default: 30000.
 * @property {Object} pooling.coreConnectionsPerHost Associative array containing amount of connections per host
 * distance.
 * @property {Boolean} pooling.warmup Determines if all connections to hosts in the local datacenter must be opened on
 * connect. Default: false.
 * @property {Object} protocolOptions
 * @property {Number} protocolOptions.port The port to use to connect to the Cassandra host. If not set through this
 * method, the default port (9042) will be used instead.
 * @property {Number} protocolOptions.maxSchemaAgreementWaitSeconds The maximum time in seconds to wait for schema
 * agreement between nodes before returning from a DDL query. Default: 10.
 * @property {Number} protocolOptions.maxVersion When set, it limits the maximum protocol version used to connect to
 * the nodes.
 * Useful for using the driver against a cluster that contains nodes with different major/minor versions of Cassandra.
 * @property {Object} socketOptions
 * @property {Number} socketOptions.connectTimeout Connection timeout in milliseconds. Default: 5000.
 * @property {Number} socketOptions.defunctReadTimeoutThreshold Determines the amount of requests that simultaneously
 * have to timeout before closing the connection. Default: 64.
 * @property {Boolean} socketOptions.keepAlive Whether to enable TCP keep-alive on the socket. Default: true.
 * @property {Number} socketOptions.keepAliveDelay TCP keep-alive delay in milliseconds. Default: 0.
 * @property {Number} socketOptions.readTimeout Per-host read timeout in milliseconds.
 * <p>
 *   Please note that this is not the maximum time a call to {@link Client#execute} may have to wait;
 *   this is the maximum time that call will wait for one particular Cassandra host, but other hosts will be tried if
 *   one of them timeout. In other words, a {@link Client#execute} call may theoretically wait up to
 *   <code>readTimeout * number_of_cassandra_hosts</code> (though the total number of hosts tried for a given query also
 *   depends on the LoadBalancingPolicy in use).
 * <p>When setting this value, keep in mind the following:</p>
 * <ul>
 *   <li>the timeout settings used on the Cassandra side (*_request_timeout_in_ms in cassandra.yaml) should be taken
 *   into account when picking a value for this read timeout. You should pick a value a couple of seconds greater than
 *   the Cassandra timeout settings.
 *   </li>
 *   <li>
 *     the read timeout is only approximate and only control the timeout to one Cassandra host, not the full query.
 *   </li>
 * </ul>
 * Setting a value of 0 disables read timeouts. Default: <code>12000</code>.
 * @property {Boolean} socketOptions.tcpNoDelay When set to true, it disables the Nagle algorithm. Default: true.
 * @property {Number} socketOptions.coalescingThreshold Buffer length in bytes use by the write queue before flushing
 * the frames. Default: 8000.
 * @property {AuthProvider} authProvider Provider to be used to authenticate to an auth-enabled cluster.
 * @property {Object} sslOptions Client-to-node ssl options. When set the driver will use the secure layer.
 * You can specify cert, ca, ... options named after the Node.js <code>tls.connect()</code> options.
 * <p>
 *   It uses the same default values as Node.js <code>tls.connect()</code> except for <code>rejectUnauthorized</code>
 *   which is set to <code>false</code> by default (for historical reasons). This setting is likely to change
 *   in upcoming versions to enable validation by default.
 * </p>
 * @property {Object} encoding
 * @property {Function} encoding.map Map constructor to use for Cassandra map<k,v> type encoding and decoding.
 * If not set, it will default to Javascript Object with map keys as property names.
 * @property {Function} encoding.set Set constructor to use for Cassandra set<k> type encoding and decoding.
 * If not set, it will default to Javascript Array.
 * @property {Boolean} encoding.copyBuffer Determines if the network buffer should be copied for buffer based data
 * types (blob, uuid, timeuuid and inet).
 * <p>
 *   Setting it to true will cause that the network buffer is copied for each row value of those types,
 *   causing additional allocations but freeing the network buffer to be reused.
 *   Setting it to true is a good choice for cases where the Row and ResultSet returned by the queries are long-lived
 *   objects.
 * </p>
 * <p>
 *  Setting it to false will cause less overhead and the reference of the network buffer to be maintained until the row
 *  / result set are de-referenced.
 *  Default: true.
 * </p>
 * @property {Boolean} encoding.useUndefinedAsUnset Valid for Cassandra 2.2 and above. Determines that, if a parameter
 * is set to
 * <code>undefined</code> it should be encoded as <code>unset</code>.
 * <p>
 *  By default, ECMAScript <code>undefined</code> is encoded as <code>null</code> in the driver. Cassandra 2.2
 *  introduced the concept of unset.
 *  At driver level, you can set a parameter to unset using the field <code>types.unset</code>. Setting this flag to
 *  true allows you to use ECMAScript undefined as Cassandra <code>unset</code>.
 * </p>
 * <p>
 *   Default: true.
 * </p>
 * @property {Array.<ExecutionProfile>} profiles The array of [execution profiles]{@link ExecutionProfile}.
 * @property {Function} promiseFactory Function to be used to create a <code>Promise</code> from a
 * callback-style function.
 * <p>
 *   Promise libraries often provide different methods to create a promise. For example, you can use Bluebird's
 *   <code>Promise.fromCallback()</code> method.
 * </p>
 * <p>
 *   By default, the driver will use the
 *   [Promise constructor]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise}.
 * </p>
 */

/**
 * Query options
 * @typedef {Object} QueryOptions
 * @property {Boolean} [autoPage] Determines if the driver must retrieve the following result pages automatically.
 * <p>
 *   This setting is only considered by the [Client#eachRow()]{@link Client#eachRow} method. For more information,
 *   check the
 *   [paging results documentation]{@link http://docs.datastax.com/en/developer/nodejs-driver/latest/features/paging/}.
 * </p>
 * @property {Boolean} [captureStackTrace] Determines if the stack trace before the query execution should be
 * maintained.
 * <p>
 *   Useful for debugging purposes, it should be set to <code>false</code> under production environment as it adds an
 *   unnecessary overhead to each execution.
 * </p>
 * Default: false.
 * @property {Number} [consistency] [Consistency level]{@link module:types~consistencies}. Default: localOne.
 * @property {Object} [customPayload] Key-value payload to be passed to the server. On the Cassandra side, 
 * implementations of QueryHandler can use this data.
 * @property {String|ExecutionProfile} [executionProfile] Name or instance of the [profile]{@link ExecutionProfile} to
 * be used for this execution. If not set, it will the use "default" execution profile.
 * @property {Number} [fetchSize] Amount of rows to retrieve per page.
 * @property {Array|Array<Array>} [hints] Type hints for parameters given in the query, ordered as for the parameters.
 * <p>For batch queries, an array of such arrays, ordered as with the queries in the batch.</p>
 * @property {Boolean} [isIdempotent] Defines whether the query can be applied multiple times without changing the result
 * beyond the initial application.
 * <p>
 *   The query execution idempotence can be used at [RetryPolicy]{@link module:policies/retry~RetryPolicy} level to
 *   determine if an statement can be retried in case of request error or write timeout.
 * </p>
 * <p>Default: <code>false</code>.</p>
 * @property {String} [keyspace] Specifies the keyspace for the query. Used for routing within the driver, this
 * property is suitable when the query operates on a different keyspace than the current {@link Client#keyspace}.
 * <p>
 *   This property should only be set manually by the user when the query operates on a different keyspace than
 *   the current {@link Client#keyspace} and using either batch or non-prepared query executions.
 * </p>
 * @property {Boolean} [logged] Determines if the batch should be written to the batchlog. Only valid for
 * [Client#batch()]{@link Client#batch}, it will be ignored by other methods. Default: true.
 * @property {Buffer|String} [pageState] Buffer or string token representing the paging state.
 * <p>Useful for manual paging, if provided, the query will be executed starting from a given paging state.</p>
 * @property {Boolean} [prepare] Determines if the query must be executed as a prepared statement.
 * @property {Number} [readTimeout] When defined, it overrides the default read timeout
 * (<code>socketOptions.readTimeout</code>) in milliseconds for this execution per coordinator.
 * <p>
 *   Suitable for statements for which the coordinator may allow a longer server-side timeout, for example aggregation
 *   queries.
 * </p>
 * <p>
 *   A value of <code>0</code> disables client side read timeout for the execution. Default: <code>undefined</code>.
 * </p>
 * @property {RetryPolicy} [retry] Retry policy for the query.
 * <p>
 *   This property can be used to specify a different [retry policy]{@link module:policies/retry} to the one specified
 *   in the {@link ClientOptions}.policies.
 * </p>
 * @property {Boolean} [retryOnTimeout] Determines if the client should retry when it didn't hear back from a host
 * within <code>socketOptions.readTimeout</code>. Default: true.
 * @property {Array} [routingIndexes] Index of the parameters that are part of the partition key to determine
 * the routing.
 * @property {Buffer|Array} [routingKey] Partition key(s) to determine which coordinator should be used for the query.
 * @property {Array} [routingNames] Array of the parameters names that are part of the partition key to determine the
 * routing.
 * @property {Number} [serialConsistency] Serial consistency is the consistency level for the serial phase of
 * conditional updates.
 * This option will be ignored for anything else that a conditional update/insert.
 * @property {Number|Long} [timestamp] The default timestamp for the query in microseconds from the unix epoch
 * (00:00:00, January 1st, 1970).
 * <p>If provided, this will replace the server side assigned timestamp as default timestamp.</p>
 * <p>Use [generateTimestamp()]{@link module:types~generateTimestamp} utility method to generate a valid timestamp
 * based on a Date and microseconds parts.</p>
 * @property {Boolean} [traceQuery] Enable query tracing for the execution. Use query tracing to diagnose performance
 * problems related to query executions. Default: false.
 * <p>To retrieve trace, you can call [Metadata.getTrace()]{@link module:metadata~Metadata#getTrace} method.</p>
 */

/**
 * Creates a new instance of {@link Client}.
 * @classdesc
 * A Client holds connections to a Cassandra cluster, allowing it to be queried.
 * Each Client instance maintains multiple connections to the cluster nodes,
 * provides [policies]{@link module:policies} to choose which node to use for each query,
 * and handles [retries]{@link module:policies/retry} for failed query (when it makes sense), etc...
 * <p>
 * Client instances are designed to be long-lived and usually a single instance is enough
 * per application. As a given Client can only be "logged" into one keyspace at
 * a time (where the "logged" keyspace is the one used by query if the query doesn't
 * explicitly use a fully qualified table name), it can make sense to create one
 * client per keyspace used. This is however not necessary to query multiple keyspaces
 * since it is always possible to use a single session with fully qualified table name
 * in queries.
 * </p>
 * @extends EventEmitter
 * @param {ClientOptions} options The options for this instance.
 * @example <caption>Creating a new client instance</caption>
 * const client = new Client({ contactPoints: ['192.168.1.100'] });
 * client.connect(function (err) {
 *   if (err) return console.error(err);
 *   console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
 * });
 * @example <caption>Executing a query</caption>
 * // calling #execute() can be made without previously calling #connect(), as internally
 * // it will ensure it's connected before attempting to execute the query
 * client.execute('SELECT key FROM system.local', function (err, result) {
 *   if (err) return console.error(err);
 *   const row = result.first();
 *   console.log(row['key']);
 * });
 * @example <caption>Executing a query with promise-based API</caption>
 * const result = await client.execute('SELECT key FROM system.local');
 * const row = result.first();
 * console.log(row['key']);
 * @constructor
 */
function Client(options) {
  events.EventEmitter.call(this);
  this.options = clientOptions.extend({ logEmitter: this.emit.bind(this) }, options);
  Object.defineProperty(this, 'profileManager', { value: new ProfileManager(this.options) });
  Object.defineProperty(this, 'controlConnection', {
    value: new ControlConnection(this.options, this.profileManager), writable: true }
  );
  //Unlimited amount of listeners for internal event queues by default
  this.setMaxListeners(0);
  this.connected = false;
  this.isShuttingDown = false;
  /**
   * Gets the name of the active keyspace.
   * @type {String}
   */
  this.keyspace = options.keyspace;
  /**
   * Gets the schema and cluster metadata information.
   * @type {Metadata}
   */
  this.metadata = this.controlConnection.metadata;
  /**
   * Gets an associative array of cluster hosts.
   * @type {HostMap}
   */
  this.hosts = this.controlConnection.hosts;
}

util.inherits(Client, events.EventEmitter);

/**
 * Emitted when a new host is added to the cluster.
 * <ul>
 *   <li>{@link Host} The host being added.</li>
 * </ul>
 * @event Client#hostAdd
 */
/**
 * Emitted when a host is removed from the cluster
 * <ul>
 *   <li>{@link Host} The host being removed.</li>
 * </ul>
 * @event Client#hostRemove
 */
/**
 * Emitted when a host in the cluster changed status from down to up.
 * <ul>
 *   <li>{@link Host host} The host that changed the status.</li>
 * </ul>
 * @event Client#hostUp
 */
/**
 * Emitted when a host in the cluster changed status from up to down.
 * <ul>
 *   <li>{@link Host host} The host that changed the status.</li>
 * </ul>
 * @event Client#hostDown
 */

/**
 * Tries to connect to one of the [contactPoints]{@link ClientOptions} and discovers the rest the nodes of the cluster.
 * <p>
 *   If a <code>callback</code> is provided, it will invoke the callback when the client is connected. Otherwise,
 *   it will return a <code>Promise</code>.
 * </p>
 * <p>
 *   If the {@link Client} is already connected, it invokes callback immediately (when provided) or the promise is
 *   fulfilled .
 * </p>
 * @example <caption>Callback-based execution</caption>
 * client.connect(function (err) {
 *   if (err) return console.error(err);
 *   console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
 * });
 * @example <caption>Promise-based execution</caption>
 * await client.connect();
 * @param {function} [callback] The callback is invoked when the pool is connected it failed to connect.
 */
Client.prototype.connect = function (callback) {
  return utils.promiseWrapper.call(this, this.options, callback, false, this._connectCb);
};

/**
 * @param {Function} callback
 * @private
 */
Client.prototype._connectCb = function (callback) {
  if (this.connected) {
    return callback();
  }
  if (this.isShuttingDown) {
    //it is being shutdown, don't allow further calls to connect()
    return callback(new errors.NoHostAvailableError(null, 'Connecting after shutdown is not supported'));
  }
  this.once('connected', callback);
  if (this.connecting) {
    //the listener to connect was added, move on
    return;
  }
  this.connecting = true;
  var self = this;
  utils.series([
    function initControlConnection(next) {
      self.controlConnection.init(next);
    },
    function initLoadBalancingPolicy(next) {
      self.hosts = self.controlConnection.hosts;
      self.profileManager.init(self, self.hosts, next);
    },
    function setKeyspace(next) {
      if (!self.keyspace) {
        return next();
      }
      RequestHandler.setKeyspace(self, next);
    },
    function setPoolOptionsAndWarmup(next) {
      //Set the pooling options depending on the protocol version
      var coreConnectionsPerHost = clientOptions.coreConnectionsPerHostV3;
      if (!types.protocolVersion.uses2BytesStreamIds(self.controlConnection.protocolVersion)) {
        coreConnectionsPerHost = clientOptions.coreConnectionsPerHostV2;
      }
      self.options.pooling = utils.deepExtend(
        {}, { coreConnectionsPerHost: coreConnectionsPerHost }, self.options.pooling);
      if (!self.options.pooling.warmup) {
        return next();
      }
      self._warmup(next);
    }
  ], function connectFinished(err) {
    if (err) {
      // We should close the pools (if any) and reset the state to allow successive calls to connect()
      return self.controlConnection.reset(function () {
        self.connected = false;
        self.connecting = false;
        self.emit('connected', err);
      });
    }
    self._setHostListeners();
    // Set the distance of the control connection host relatively to this instance
    self.profileManager.getDistance(self.controlConnection.host);
    self.connected = true;
    self.connecting = false;
    self.emit('connected');
  });
};

/**
 * Executes a query on an available connection.
 * <p>
 *   If a <code>callback</code> is provided, it will invoke the callback when the execution completes. Otherwise,
 *   it will return a <code>Promise</code>.
 * </p>
 * <p>The query can be prepared (recommended) or not depending on {@link QueryOptions}.prepare flag.</p>
 * <p>
 *   Some executions failures can be handled transparently by the driver, according to the
 *   [RetryPolicy]{@link module:policies/retry~RetryPolicy} defined at {@link ClientOptions} or {@link QueryOptions}
 *   level.
 * </p>
 * @param {String} query The query to execute.
 * @param {Array|Object} [params] Array of parameter values or an associative array (object) containing parameter names
 * as keys and its value.
 * @param {QueryOptions} [options] The query options for the execution.
 * @param {ResultCallback} [callback] Executes callback(err, result) when execution completed. When not defined, the
 * method will return a promise.
 * @example <caption>Callback-based API</caption>
 * const query = 'SELECT name, email FROM users WHERE id = ?';
 * client.execute(query, [ id ], { prepare: true }, function (err, result) {
 *   assert.ifError(err);
 *   const row = result.first();
 *   console.log('%s: %s', row.name, row.email);
 * });
 * @example <caption>Promise-based API, using async/await</caption>
 * const query = 'SELECT name, email FROM users WHERE id = ?';
 * const result = await client.execute(query, [ id ], { prepare: true });
 * const row = result.first();
 * console.log('%s: %s', row.name, row.email);
 * @see {@link ExecutionProfile} to reuse a set of options across different query executions.
 */
Client.prototype.execute = function (query, params, options, callback) {
  // set default argument values for optional parameters
  callback = callback || (options ? options : params);
  if (typeof callback === 'function') {
    params = typeof params !== 'function' ? params : null;
  }
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    options = clientOptions.createQueryOptions(this, options);
    this._innerExecute(query, params, options, cb);
  });
};

/**
 * Executes the query and calls rowCallback for each row as soon as they are received. Calls final callback after all
 * rows have been sent, or when there is an error.
 * <p>
 *   The query can be prepared (recommended) or not depending on {@link QueryOptions}.prepare flag. Retries on multiple
 *   hosts if needed.
 * </p>
 * @param {String} query The query to execute
 * @param {Array|Object} [params] Array of parameter values or an associative array (object) containing parameter names
 * as keys and its value.
 * @param {QueryOptions} [options]
 * @param {function} rowCallback Executes <code>rowCallback(n, row)</code> per each row received, where n is the row
 * index and row is the current Row.
 * @param {function} [callback] Executes <code>callback(err, result)</code> after all rows have been received.
 * <p>
 *   When dealing with paged results, [ResultSet#nextPage()]{@link module:types~ResultSet#nextPage} method can be used
 *   to retrieve the following page. In that case, <code>rowCallback()</code> will be again called for each row and
 *   the final callback will be invoked when all rows in the following page has been retrieved.
 * </p>
 * @example <caption>Using per-row callback and arrow functions</caption>
 * client.eachRow(query, params, { prepare: true }, (n, row) => console.log(n, row), err => console.error(err));
 * @example <caption>Overloads</caption>
 * client.eachRow(query, rowCallback);
 * client.eachRow(query, params, rowCallback);
 * client.eachRow(query, params, options, rowCallback);
 * client.eachRow(query, params, rowCallback, callback);
 * client.eachRow(query, params, options, rowCallback, callback);
 */
Client.prototype.eachRow = function (query, params, options, rowCallback, callback) {
  if (!callback && rowCallback && typeof options === 'function') {
    callback = utils.bindDomain(rowCallback);
    rowCallback = utils.bindDomain(options);
  }
  else {
    callback = utils.bindDomain(callback || utils.noop);
    rowCallback = utils.bindDomain(rowCallback || options || params);
  }
  params = typeof params !== 'function' ? params : null;
  options = clientOptions.createQueryOptions(this, options, rowCallback);
  var self = this;
  var rowLength = 0;
  function nextPage() {
    self._innerExecute(query, params, options, pageCallback);
  }
  function pageCallback (err, result) {
    if (err) {
      return callback(err);
    }
    // Next requests in case paging (auto or explicit) is used
    rowLength += result.rowLength;
    if (result.meta && result.meta.pageState) {
      // Use new page state as next request page state
      options.pageState = result.meta.pageState;
      if (options.autoPage) {
        // Issue next request for the next page
        return nextPage();
      }
      // Allows for explicit (manual) paging, in case the caller needs it
      result.nextPage = nextPage;
    }
    // Finished auto-paging
    result.rowLength = rowLength;
    callback(null, result);
  }
  this._innerExecute(query, params, options, pageCallback);
};

/**
 * Executes the query and pushes the rows to the result stream
 *  as soon as they received.
 * Calls callback after all rows have been sent, or when there is an error.
 * <p>
 * The stream is a [Readable Streams2]{@link http://nodejs.org/api/stream.html#stream_class_stream_readable} object
 *  that contains the raw bytes of the field value.
 *  It can be piped downstream and provides automatic pause/resume logic (it buffers when not read).
 * </p>
 * <p>
 *   The query can be prepared (recommended) or not depending on {@link QueryOptions}.prepare flag. Retries on multiple
 *   hosts if needed.
 * </p>
 * @param {String} query The query to prepare and execute
 * @param {Array|Object} [params] Array of parameter values or an associative array (object) containing parameter names
 * as keys and its value
 * @param {QueryOptions} [options]
 * @param {function} [callback], executes callback(err) after all rows have been received or if there is an error
 * @returns {types.ResultStream}
 */
Client.prototype.stream = function (query, params, options, callback) {
  callback = utils.bindDomain(callback || utils.noop);
  // NOTE: the nodejs stream maintains yet another internal buffer 
  // we rely on the default stream implementation to keep memory 
  // usage reasonable.
  var resultStream = new types.ResultStream({ objectMode: 1 });
  function onFinish(err, result) {
    if (err) {
      resultStream.emit('error', err);
    }
    if (result && result.nextPage ) {
      // allows for throttling as per the
      // default nodejs stream implementation
      resultStream._valve(function pageValve() {
        try {
          result.nextPage();
        }
        catch( ex ) {
          resultStream.emit('error', ex );
        }
      });
      return;
    }
    // Explicitly dropping the valve (closure)
    resultStream._valve(null);
    resultStream.add(null);
    callback(err);
  }
  var sync = true;
  this.eachRow(query, params, options, function rowCallback(n, row) {
    resultStream.add(row);
  }, function eachRowFinished(err, result) {
    if (sync) {
      // Prevent sync callback
      return setImmediate(function eachRowFinishedImmediate() {
        onFinish(err, result);
      });
    }
    onFinish(err, result);
  });
  sync = false;
  return resultStream;
};

/**
 * Executes batch of queries on an available connection to a host.
 * <p>
 *   If a <code>callback</code> is provided, it will invoke the callback when the execution completes. Otherwise,
 *   it will return a <code>Promise</code>.
 * </p>
 * @param {Array.<string>|Array.<{query, params}>} queries The queries to execute as an Array of strings or as an array
 * of object containing the query and params
 * @param {QueryOptions} [options]
 * @param {ResultCallback} [callback] Executes callback(err, result) when the batch was executed
 */
Client.prototype.batch = function (queries, options, callback) {
  callback = callback || options;
  return utils.promiseWrapper.call(this, this.options, callback, false, function handler(cb) {
    this._batchCb(queries, options, cb);
  });
};

/**
 * @param {Array.<string>|Array.<{query, params}>}queries
 * @param {QueryOptions} options
 * @param {ResultCallback} callback
 * @private
 */
Client.prototype._batchCb = function (queries, options, callback) {
  var self = this;
  if (!Array.isArray(queries)) {
    // We should throw (not callback) for an unexpected type
    throw new errors.ArgumentError('Queries should be an Array');
  }
  if (queries.length === 0) {
    return callback(new errors.ArgumentError('Queries array can not be empty'));
  }
  options = clientOptions.createQueryOptions(this, options, null, true);
  if (options.message && options instanceof Error) {
    return callback(options);
  }

  utils.series([
    function connect(next) {
      self.connect(next);
    },
    function adaptQueries(next) {
      if (options.prepare) {
        return PrepareHandler.getPreparedMultiple(
          self, options.executionProfile.loadBalancing, queries, self.keyspace, next);
      }
      var parsedQueries = new Array(queries.length);
      for (var i = 0; i < queries.length; i++) {
        var item = queries[i];
        if (!item) {
          return next(new errors.ArgumentError(util.format('Invalid query at index %d', i)));
        }
        var query = typeof item === 'string' ? item : item.query;
        if (!query) {
          return next(errors.ArgumentError(util.format('Invalid query at index %d', i)));
        }
        parsedQueries[i] = { query: query, params: item.params };
      }
      next(null, parsedQueries);
    }
  ], function seriesEnd(err, queryItems) {
    if (err) {
      return callback(err);
    }
    var request = new requests.BatchRequest(queryItems, options);
    var handler = new RequestHandler(request, options, self);
    handler.send(callback);
  });
};

/**
 * Gets the host list representing the replicas that contain such partition.
 * @param {String} keyspace
 * @param {Buffer} token
 * @returns {Array}
 */
Client.prototype.getReplicas = function (keyspace, token) {
  return this.metadata.getReplicas(keyspace, token);
};

/**
 * Gets a snapshot containing information on the connections pools held by this Client at the current time.
 * <p>
 *   The information provided in the returned object only represents the state at the moment this method was called and
 *   it's not maintained in sync with the driver metadata.
 * </p>
 * @return module:metadata~ClientState
 */
Client.prototype.getState = function () {
  return ClientState.from(this);
};

Client.prototype.log = utils.log;

/**
 * Closes all connections to all hosts.
 * <p>
 *   If a <code>callback</code> is provided, it will invoke the callback when the client is disconnected. Otherwise,
 *   it will return a <code>Promise</code>.
 * </p>
 * @param {Function} [callback] Optional callback to be invoked when finished closing all connections.
 */
Client.prototype.shutdown = function (callback) {
  return utils.promiseWrapper.call(this, this.options, callback, true, this._shutdownCb);
};

/**
 * @param {Function} callback
 * @private
 */
Client.prototype._shutdownCb = function (callback) {
  var self = this;
  function doShutdown() {
    self.connected = false;
    self.isShuttingDown = true;
    var hosts = self.hosts.values();
    // Shutdown the ControlConnection before shutting down the pools
    self.controlConnection.shutdown();
    self.options.policies.speculativeExecution.shutdown();
    // go through all the host and shut down their pools
    utils.each(hosts, function (h, next) {
      h.shutdown(false, next);
    }, callback);
  }
  this.log('info', 'Shutting down');
  callback = callback || utils.noop;
  if (!this.hosts || !this.connected) {
    // not initialized
    this.connected = false;
    return callback();
  }
  if (this.connecting) {
    this.log('warning', 'Shutting down while connecting');
    // wait until finish connecting for easier troubleshooting
    return this.once('connected', doShutdown);
  }
  doShutdown();
};

/**
 * Waits until that the schema version in all nodes is the same or the waiting time passed.
 * @param {Connection} connection
 * @param {Function} callback
 * @ignore
 */
Client.prototype._waitForSchemaAgreement = function (connection, callback) {
  if (this.hosts.length === 1) {
    return setImmediate(callback);
  }
  var self = this;
  var start = new Date();
  var maxWaitTime = this.options.protocolOptions.maxSchemaAgreementWaitSeconds * 1000;
  this.log('info', 'Waiting for schema agreement');
  var versionsMatch;
  var peerVersions;
  utils.whilst(function condition() {
    return !versionsMatch && (new Date() - start) < maxWaitTime;
  }, function fn(next) {
    utils.series([
      function (next) {
        self.metadata.getPeersSchemaVersions(connection, function (err, result) {
          peerVersions = result;
          next(err);
        });
      },
      function (next) {
        self.metadata.getLocalSchemaVersion(connection, next);
      }
    ], function seriesEnded(err, localVersion) {
      if (err) {
        return next(err);
      }
      //check the different versions
      versionsMatch = true;
      localVersion = localVersion.toString();
      for (var i = 0; i < peerVersions.length; i++) {
        if (peerVersions[i].toString() !== localVersion) {
          versionsMatch = false;
          break;
        }
      }
      if (versionsMatch) {
        self.log('info', 'Schema versions match');
      }
      //let some time pass before the next check
      setTimeout(next, 500);
    });
  }, callback);
};

/**
 * Waits for schema agreements and schedules schema metadata refresh.
 * @param {Connection} connection
 * @param event
 * @param {Function} callback
 * @ignore
 * @internal
 */
Client.prototype.handleSchemaAgreementAndRefresh = function (connection, event, callback) {
  var self = this;
  this._waitForSchemaAgreement(connection, function agreementCb(err) {
    if (err) {
      //we issue a warning but we continue with the normal flow
      self.log('warning', 'There was an error while waiting for the schema agreement between nodes', err);
    }
    if (!self.options.isMetadataSyncEnabled) {
      return callback();
    }
    // schedule metadata refresh immediately and the callback will be invoked once it was refreshed
    self.controlConnection.handleSchemaChange(event, true, callback);
  });
};

/**
 * Connects and handles the execution of prepared and simple statements. All parameters are mandatory.
 * @param {string} query
 * @param {Array} params
 * @param {Object} options Options, contained already all the required QueryOptions.
 * @param {Function} callback
 * @private
 */
Client.prototype._innerExecute = function (query, params, options, callback) {
  // Use Error#message property because is faster than checking prototypes
  if (options.message && options instanceof Error) {
    return callback(options);
  }
  if (options.prepare) {
    return this._executeAsPrepared(query, params, options, callback);
  }
  var self = this;
  utils.series([
    function connecting(next) {
      self.connect(next);
    },
    function settingOptions(next) {
      self._setQueryOptions(options, params, null, function setOptionsCallback(err, p) {
        params = p;
        next(err);
      });
    },
    function sendingQuery(next) {
      var request = new requests.QueryRequest(
        query,
        params,
        options);
      var handler = new RequestHandler(request, options, self);
      handler.send(next);
    }
  ], callback);
};

/**
 * Prepares (the first time) and executes the prepared query, retrying on multiple hosts if needed.
 * @param {String} query The query to prepare and execute
 * @param {Array|Object} params Array of params or params object with the name as keys
 * @param {Object} options
 * @param {ResultCallback} callback Executes callback(err, result) when finished
 * @private
 */
Client.prototype._executeAsPrepared = function (query, params, options, callback) {
  var queryId;
  var meta;
  var self = this;
  utils.series([
    function connecting(next) {
      self.connect(next);
    },
    function preparing(next) {
      var lbp = options.executionProfile.loadBalancing;
      PrepareHandler.getPrepared(self, lbp, query, self.keyspace, function (err, id, m) {
        queryId = id;
        meta = m;
        next(err);
      });
    },
    function settingOptions(next) {
      self._setQueryOptions(options, params, meta, function (err, p) {
        params = p;
        next(err);
      });
    },
    function sendingExecute(next) {
      var request = new requests.ExecuteRequest(
        query,
        queryId,
        params,
        options);
      request.query = query;
      var handler = new RequestHandler(request, options, self);
      handler.send(next);
    }
  ], callback);
};

/**
 * Sets the listeners for the nodes.
 * @private
 */
Client.prototype._setHostListeners = function () {
  var self = this;
  function getHostUpListener(emitter, h) {
    return (function hostUpListener() {
      emitter.emit('hostUp', h);
    });
  }
  function getHostDownListener(emitter, h) {
    return (function hostDownListener() {
      emitter.emit('hostDown', h);
    });
  }
  //Add status listeners when new nodes are added and emit hostAdd
  this.hosts.on('add', function hostAddedListener(h) {
    h.on('up', getHostUpListener(self, h));
    h.on('down', getHostDownListener(self, h));
    self.emit('hostAdd', h);
  });
  //Remove all listeners and emit hostRemove
  this.hosts.on('remove', function hostRemovedListener(h) {
    h.removeAllListeners();
    self.emit('hostRemove', h);
  });
  //Add status listeners for existing hosts
  this.hosts.forEach(function (h) {
    h.on('up', getHostUpListener(self, h));
    h.on('down', getHostDownListener(self, h));
  });
};

Client.prototype._warmup = function (callback) {
  var self = this;
  var hosts = this.hosts.values();
  utils.timesLimit(hosts.length, warmupLimit, function warmupEachCallback(i, next) {
    var h = hosts[i];
    var distance = self.profileManager.getDistance(h);
    if (distance !== types.distance.local) {
      //do not warmup pool for remote or ignored hosts
      return next();
    }
    h.warmupPool(function (err) {
      if (err) {
        //An error while trying to create a connection
        //To 1 host is not an issue, warn the user and move on
        self.log('warning', util.format('Connection pool to host %s could not be created: %s', h.address, err));
      }
      next();
    });
  }, callback);
};

/**
 * @returns {Encoder}
 * @private
 */
Client.prototype._getEncoder = function () {
  var encoder;
  encoder = this.controlConnection.getEncoder();
  if (!encoder) {
    throw new errors.DriverInternalError('Encoder is not defined');
  }
  return encoder;
};

/**
 * Validates the values and sets the default values for the {@link QueryOptions} to be used in the query.
 * @param {QueryOptions} options Options specified by the user
 * @param params
 * @param [meta] Prepared statement metadata
 * @param {Function} callback
 * @private
 */
Client.prototype._setQueryOptions = function (options, params, meta, callback) {
  var version = this.controlConnection.protocolVersion;
  if (!options.prepare && params && !util.isArray(params) && !types.protocolVersion.supportsNamedParameters(version)) {
    //Only Cassandra 2.1 and above supports named parameters
    return callback(
      new errors.ArgumentError('Named parameters for simple statements are not supported, use prepare flag'));
  }
  var paramsInfo;
  var self = this;
  utils.series([
    function fillRoutingKeys(next) {
      if (options.routingKey || options.routingIndexes || options.routingNames || !meta) {
        //it is filled by the user
        //or it is not prepared
        return next();
      }
      if (!options.keyspace && meta.keyspace) {
        options.keyspace = meta.keyspace;
      }
      if (util.isArray(meta.partitionKeys)) {
        //the partition keys are provided as part of the metadata
        options.routingIndexes = meta.partitionKeys;
        return next();
      }
      self.metadata.getTable(meta.keyspace, meta.table, function (err, tableInfo) {
        if (err) {
          self.log('warning', util.format('Table %s.%s metadata could not be retrieved', meta.keyspace, meta.table));
          //execute without a routing key
          return next();
        }
        if (!tableInfo) {
          //The data is not there, maybe it is being recreated
          return next();
        }
        options.routingIndexes = tableInfo.partitionKeys.map(function (c) {
          return meta.columnsByName[c.name];
        });
        //Skip parsing metadata next time
        meta.partitionKeys = options.routingIndexes;
        next();
      });
    },
    function adaptParameterNames(next) {
      try {
        if (options.prepare) {
          paramsInfo = utils.adaptNamedParamsPrepared(params, meta.columns);
          //Add the type information provided by the prepared metadata
          options.hints = meta.columns.map(function (c) {
            return c.type;
          });
        }
        else {
          paramsInfo = utils.adaptNamedParamsWithHints(params, options);
        }
      }
      catch (err) {
        return next(err);
      }
      next();
    },
    function adaptParameterTypes(next) {
      if (options.prepare || !util.isArray(options.hints)) {
        return next();
      }
      //Only not prepared with hints
      //Adapting user hints is an async op
      self.metadata.adaptUserHints(self.keyspace, options.hints, next);
    }
  ], function finishSettingOptions(err) {
    if (err) {
      //There was an error setting the query options
      return callback(err);
    }
    try {
      if (typeof options.pageState === 'string') {
        //pageState can be a hex string
        options.pageState = utils.allocBufferFromString(options.pageState, 'hex');
      }
      //noinspection JSAccessibilityCheck
      self._getEncoder().setRoutingKey(paramsInfo.params, options, paramsInfo.keys);
    }
    catch (err) {
      return callback(err);
    }
    callback(null, paramsInfo.params);
  });
};

/**
 * Callback used by execution methods.
 * @callback ResultCallback
 * @param {Error} err Error occurred in the execution of the query.
 * @param {ResultSet} [result] Result of the execution of the query.
 */

module.exports = Client;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var events = __webpack_require__(4);
var util = __webpack_require__(0);
var dns = __webpack_require__(10);
var net = __webpack_require__(15);

var errors = __webpack_require__(3);
var Host = __webpack_require__(16).Host;
var HostMap = __webpack_require__(16).HostMap;
var Metadata = __webpack_require__(21);
var EventDebouncer = __webpack_require__(62);
var requests = __webpack_require__(5);
var utils = __webpack_require__(1);
var types = __webpack_require__(2);
var f = util.format;

var selectPeers = "SELECT peer,data_center,rack,tokens,rpc_address,release_version FROM system.peers";
var selectLocal = "SELECT * FROM system.local WHERE key='local'";
var newNodeDelay = 1000;
var metadataQueryAbortTimeout = 2000;
var schemaChangeTypes = {
  created: 'CREATED',
  updated: 'UPDATED',
  dropped: 'DROPPED'
};

/**
 * Creates a new instance of <code>ControlConnection</code>.
 * @classdesc
 * Represents a connection used by the driver to receive events and to check the status of the cluster.
 * <p>It uses an existing connection from the hosts' connection pool to maintain the driver metadata up-to-date.</p>
 * @param {Object} options
 * @param {ProfileManager} profileManager
 * @param {{borrowHostConnection: function}} [context] An object containing methods to allow dependency injection.
 * @extends EventEmitter
 * @constructor
 */
function ControlConnection(options, profileManager, context) {
  this.protocolVersion = null;
  this.hosts = new HostMap();
  //noinspection JSUnresolvedFunction
  this.setMaxListeners(0);
  Object.defineProperty(this, "options", { value: options, enumerable: false, writable: false});
  /**
   * Cluster metadata that is going to be shared between the Client and ControlConnection
   */
  this.metadata = new Metadata(this.options, this);
  this.addressTranslator = this.options.policies.addressResolution;
  this.reconnectionPolicy = this.options.policies.reconnection;
  this.reconnectionSchedule = this.reconnectionPolicy.newSchedule();
  this.initialized = false;
  this.isShuttingDown = false;
  /**
   * Host used by the control connection
   * @type {Host|null}
   */
  this.host = null;
  /**
   * Connection used to retrieve metadata and subscribed to events
   * @type {Connection|null}
   */
  this.connection = null;
  /**
   * Reference to the encoder of the last valid connection
   * @type {Encoder|null}
   */
  this.encoder = null;
  this.debouncer = new EventDebouncer(options.refreshSchemaDelay, this.log.bind(this));
  this.profileManager = profileManager;
  /** Timeout used for delayed handling of topology changes */
  this.topologyChangeTimeout = null;
  /** Timeout used for delayed handling of node status changes */
  this.nodeStatusChangeTimeout = null;
  this.reconnectionTimeout = null;
  this.hostIterator = null;
  this.triedHosts = null;
  if (context && context.borrowHostConnection) {
    this.borrowHostConnection = context.borrowHostConnection;
  }
}

util.inherits(ControlConnection, events.EventEmitter);

/**
 * Tries to determine a suitable protocol version to be used.
 * Tries to retrieve the hosts in the Cluster.
 * @param {Function} callback
 */
ControlConnection.prototype.init = function (callback) {
  if (this.initialized) {
    //prevent multiple serial initializations
    return callback();
  }
  var self = this;
  function addHost(address, port, cb) {
    var endPoint = address + ':' + (port || self.options.protocolOptions.port);
    var h = new Host(endPoint, self.protocolVersion, self.options, self.metadata);
    self.hosts.set(endPoint, h);
    self.log('info', 'Adding host ' + endPoint);
    if (cb) {
      cb();
    }
  }
  utils.series([
    function resolveNames(next) {
      utils.each(self.options.contactPoints, function eachResolve(name, eachNext) {
        if (name.indexOf('[') === 0 && name.indexOf(']:') > 1) {
          // IPv6 host notation [ip]:port (RFC 3986 section 3.2.2)
          var portSeparatorIndex = name.lastIndexOf(']:');
          return addHost(name.substr(1, portSeparatorIndex - 1), name.substr(portSeparatorIndex + 2), eachNext);
        }
        var host = name;
        var port = null;
        if (name.indexOf(':') > 0) {
          // IPv4 or host name with port notation
          var parts = name.split(':');
          if (parts.length === 2) {
            host = parts[0];
            port = parts[1];
          }
        }
        if (net.isIP(host)) {
          return addHost(host, port, eachNext);
        }
        resolveAll(host, function (err, addresses) {
          if (err) {
            self.log('error', 'Host with name ' + host + ' could not be resolved', err);
            return eachNext();
          }
          addresses.forEach(function (address) {
            addHost(address, port);
          });
          eachNext();
        });
      }, function (err) {
        if (!err && self.hosts.length === 0) {
          err = new errors.NoHostAvailableError(null, 'No host could be resolved');
        }
        next(err);
      });
    },
    function startRefresh(next) {
      self.refresh(false, next);
    }
  ], function seriesFinished(err) {
    self.initialized = !err;
    callback(err);
  });
};

ControlConnection.prototype.setHealthListeners = function () {
  var host = this.host;
  var connection = this.connection;
  var self = this;
  var wasRefreshCalled = 0;

  function removeListeners() {
    host.removeListener('down', downOrIgnoredHandler);
    host.removeListener('ignore', downOrIgnoredHandler);
    connection.removeListener('socketClose', socketClosedHandler);
  }

  function startReconnecting(hostDown) {
    if (wasRefreshCalled++ !== 0) {
      // Prevent multiple calls to reconnect
      return;
    }
    removeListeners();
    if (self.isShuttingDown) {
      // Don't attempt to reconnect when the ControlConnection is being shutdown
      return;
    }
    if (hostDown) {
      self.log('warning', f('Host %s used by the ControlConnection DOWN', host.address));
    }
    else {
      self.log('warning', f('Connection to %s used by the ControlConnection was closed', host.address));
    }
    self.host = null;
    self.connection = null;
    self.refresh();
  }

  function downOrIgnoredHandler() {
    startReconnecting(true);
  }

  function socketClosedHandler() {
    startReconnecting(false);
  }

  host.once('down', downOrIgnoredHandler);
  host.once('ignore', downOrIgnoredHandler);
  connection.once('socketClose', socketClosedHandler);
};

/**
 * Iterates through the hostIterator and gets the following open connection.
 * @param callback
 */
ControlConnection.prototype.borrowAConnection = function (callback) {
  var self = this;
  var host;
  var connection = null;
  utils.whilst(
    function condition() {
      // while there isn't a valid connection
      if (connection) {
        return false;
      }
      var item = self.hostIterator.next();
      host = item.value;
      return (!item.done);
    },
    function whileIterator(next) {
      if (self.initialized) {
        // Only check distance once the load-balancing policies have been initialized
        var distance = self.profileManager.getDistance(host);
        if (!host.isUp() || distance === types.distance.ignored) {
          return next();
        }
      }
      self.borrowHostConnection(host, function borrowConnectionCallback(err, c) {
        self.triedHosts[host.address] = err;
        connection = c;
        next();
      });
    },
    function whilstEnded() {
      if (!connection) {
        return callback(new errors.NoHostAvailableError(self.triedHosts));
      }
      if (!self.initialized) {
        self.protocolVersion = connection.protocolVersion;
        self.encoder = connection.encoder;
      }
      self.host = host;
      self.connection = connection;
      callback();
    });
};

/** Default implementation for borrowing connections, that can be injected at constructor level */
ControlConnection.prototype.borrowHostConnection = function (host, callback) {
  host.borrowConnection(callback);
};

/**
 * Gets the info from local and peer metadata, reloads the keyspaces metadata and rebuilds tokens.
 * @param {Boolean} newNodesUp
 * @param {Function} [callback]
 */
ControlConnection.prototype.refreshHosts = function (newNodesUp, callback) {
  callback = callback || utils.noop;
  // it's possible that this was called as a result of a topology change, but the connection was lost
  // between scheduling time and now.
  if (!this.connection) {
    callback();
    // this will be called again when there is a new connection.
    return;
  }
  var self = this;
  if (!this.host.protocolVersion) {
    this.hosts.forEach(function (h) {
      h.setProtocolVersion(self.protocolVersion);
    });
  }
  this.log('info', 'Refreshing local and peers info');
  var c = this.connection;
  var host = this.host;
  utils.series([
    function getLocalInfo(next) {
      var request = new requests.QueryRequest(selectLocal, null, null);
      c.sendStream(request, null, function (err, result) {
        self.setLocalInfo(c.endpoint, result);
        next(err);
      });
    },
    function getPeersInfo(next) {
      var request = new requests.QueryRequest(selectPeers, null, null);
      c.sendStream(request, null, function (err, result) {
        self.setPeersInfo(newNodesUp, err, result, next);
      });
    },
    function getKeyspaces(next) {
      // to acquire metadata we need to specify the cassandra version
      self.metadata.setCassandraVersion(host.getCassandraVersion());
      self.metadata.buildTokens(self.hosts);
      if (!self.options.isMetadataSyncEnabled) {
        return next();
      }
      self.metadata.refreshKeyspaces(false, next);
    }
  ], callback);
};

/**
 * Acquires a connection and refreshes topology and keyspace metadata.
 * <p>If it fails obtaining a connection:</p>
 * <ul>
 *   <li>
 *     When its initializing, it should:
 *     <ul>
 *       <li>Continue iterating through the hosts</li>
 *       <li>When there aren't any more hosts, it should invoke callback with the inner errors</li>
 *     </ul>
 *   </li>
 *   <li>
 *     When its running in the background, it should:
 *     <ul>
 *       <li>Continue iterating through the hosts</li>
 *       <li>
 *         When there aren't any more hosts, it should:
 *         <ul>
 *           <li>Schedule reconnection</li>
 *           <li>Invoke callback with the inner errors</li>
 *         </ul>
 *       </li>
 *     </ul>
 *   </li>
 * </ul>
 * <p>If it fails obtaining the metadata, it should:</p>
 * <ul>
 *   <li>It should mark connection and/or host unusable</li>
 *   <li>Retry using the same iterator from query plan / host list</li>
 * </ul>
 * @param {Boolean} [reuseQueryPlan]
 * @param {Function} [callback]
 */
ControlConnection.prototype.refresh = function (reuseQueryPlan, callback) {
  var initializing = !this.initialized;
  callback = callback || utils.noop;
  // Reset the state of the host field, that way we can identify when the query plan was exhausted
  this.host = null;
  var self = this;
  utils.series([
    function getHostIterator(next) {
      if (reuseQueryPlan) {
        return next();
      }
      self.triedHosts = {};
      if (initializing) {
        self.log('info', 'Getting first connection');
        self.hostIterator = utils.arrayIterator(self.hosts.values());
        return next();
      }
      self.log('info', 'Trying to acquire a connection to a new host');
      self.profileManager.getDefaultLoadBalancing().newQueryPlan(null, null, function onNewPlan(err, iterator) {
        if (err) {
          self.log('error', 'ControlConnection could not retrieve a query plan to determine which hosts to use', err);
          return next(err);
        }
        self.hostIterator = iterator;
        next();
      });
    },
    function getConnectionTask(next) {
      self.borrowAConnection(next);
    },
    function getLocalAndPeersInfo(next) {
      if (initializing) {
        self.log('info', f('ControlConnection using protocol version %d, connected to %s',
          self.protocolVersion, self.host.address));
      }
      else {
        self.log('info', f('ControlConnection connected to %s', self.host.address));
      }
      self.refreshHosts(initializing, next);
    },
    function subscribeConnectionEvents(next) {
      self.connection.on('nodeTopologyChange', self.nodeTopologyChangeHandler.bind(self));
      self.connection.on('nodeStatusChange', self.nodeStatusChangeHandler.bind(self));
      self.connection.on('nodeSchemaChange', self.nodeSchemaChangeHandler.bind(self));
      var request = new requests.RegisterRequest(['TOPOLOGY_CHANGE', 'STATUS_CHANGE', 'SCHEMA_CHANGE']);
      self.connection.sendStream(request, null, next);
    }
  ], function refreshSeriesEnd(err) {
    if (!err) {
      if (!self.connection.connected) {
        // Before refreshSeriesEnd() was invoked, the connection changed to a "not connected" state.
        // We have to avoid subscribing to 'down' or 'socketClosed' events after it was down / connection closed.
        // The connection is no longer valid and we should retry the whole thing
        self.log('info', f('Connection to %s was closed before finishing refresh', self.host.address));
        return self.refresh(false, callback);
      }
      self.setHealthListeners();
      self.reconnectionSchedule = self.reconnectionPolicy.newSchedule();
      self.emit('newConnection', null, self.connection, self.host);
      self.log('info', f('ControlConnection connected to %s and up to date', self.host.address));
      return callback();
    }
    if (!self.host) {
      self.log('error', 'ControlConnection failed to acquire a connection', err);
      if (!initializing) {
        self.noOpenConnectionHandler();
      }
      self.emit('newConnection', err);
      return callback(err);
    }
    self.log('error', 'ControlConnection failed to retrieve topology and keyspaces information', err);
    self.triedHosts[self.host.address] = err;
    if (err && err.isSocketError) {
      self.host.removeFromPool(self.connection);
    }
    self.connection = null;
    // Retry the whole thing with the same query plan, in the background or foreground
    self.refresh(true, callback);
  });
};

/**
 * There isn't an open connection at the moment, try again later.
 */
ControlConnection.prototype.noOpenConnectionHandler = function () {
  var delay = this.reconnectionSchedule.next().value;
  this.log('warning', f('ControlConnection could not reconnect, scheduling reconnection in %dms', delay));
  var self = this;
  setTimeout(function controlConnectionReconnection() {
    self.refresh();
  }, delay);
};

/**
 * @param {String} type
 * @param {String} info
 * @param [furtherInfo]
 */
ControlConnection.prototype.log = utils.log;

/**
 * Handles a TOPOLOGY_CHANGE event
 */
ControlConnection.prototype.nodeTopologyChangeHandler = function (event) {
  this.log('info', 'Received topology change', event);
  // all hosts information needs to be refreshed as tokens might have changed
  var self = this;
  clearTimeout(this.topologyChangeTimeout);
  // Use an additional timer to make sure that the refresh hosts is executed only AFTER the delay
  // In this case, the event debouncer doesn't help because it could not honor the sliding delay (ie: processNow)
  this.topologyChangeTimeout = setTimeout(function nodeTopologyDelayedHandler() {
    self.scheduleRefreshHosts();
  }, newNodeDelay);
};

/**
 * Handles a STATUS_CHANGE event
 */
ControlConnection.prototype.nodeStatusChangeHandler = function (event) {
  var self = this;
  var addressToTranslate = event.inet.address.toString();
  var port = this.options.protocolOptions.port;
  this.addressTranslator.translate(addressToTranslate, port, function translateCallback(endPoint) {
    var host = self.hosts.get(endPoint);
    if (!host) {
      self.log('warning', 'Received status change event but host was not found: ' + addressToTranslate);
      return;
    }
    var distance = self.profileManager.getDistance(host);
    if (event.up) {
      if (distance === types.distance.ignored) {
        return host.setUp(true);
      }
      clearTimeout(self.nodeStatusChangeTimeout);
      // Waits a couple of seconds before marking it as UP
      self.nodeStatusChangeTimeout = setTimeout(function delayCheckIsUp() {
        host.checkIsUp();
      }, newNodeDelay);
      return;
    }
    // marked as down
    if (distance === types.distance.ignored) {
      return host.setDown();
    }
    self.log('warning', 'Received status change to DOWN for host ' + host.address);
  });
};

/**
 * Handles a SCHEMA_CHANGE event
 */
ControlConnection.prototype.nodeSchemaChangeHandler = function (event) {
  this.log('info', 'Schema change', event);
  if (!this.options.isMetadataSyncEnabled) {
    return;
  }
  this.handleSchemaChange(event, false);
};

/**
 * @param {{keyspace: string, isKeyspace: boolean, schemaChangeType, table, udt, functionName, aggregate}} event
 * @param {Boolean} processNow
 * @param {Function} [callback]
 */
ControlConnection.prototype.handleSchemaChange = function (event, processNow, callback) {
  var self = this;
  var handler, cqlObject;
  if (event.isKeyspace) {
    if (event.schemaChangeType === schemaChangeTypes.dropped) {
      handler = function removeKeyspace() {
        // if on the same event queue there is a creation, this handler is not going to be executed
        // it is safe to remove the keyspace metadata
        delete self.metadata.keyspaces[event.keyspace];
      };
      return this.scheduleObjectRefresh(handler, event.keyspace, null, processNow, callback);
    }
    return this.scheduleKeyspaceRefresh(event.keyspace, processNow, callback);
  }
  var ksInfo = this.metadata.keyspaces[event.keyspace];
  if (!ksInfo) {
    // it hasn't been loaded and it is not part of the metadata, don't mind
    return;
  }
  if (event.table) {
    cqlObject = event.table;
    handler = function clearTableState() {
      delete ksInfo.tables[event.table];
      delete ksInfo.views[event.table];
    };
  }
  else if (event.udt) {
    cqlObject = event.udt;
    handler = function clearUdtState() {
      delete ksInfo.udts[event.udt];
    };
  }
  else if (event.functionName) {
    cqlObject = event.functionName;
    handler = function clearFunctionState() {
      delete ksInfo.functions[event.functionName];
    };
  }
  else if (event.aggregate) {
    cqlObject = event.aggregate;
    handler = function clearKeyspaceState() {
      delete ksInfo.aggregates[event.aggregate];
    };
  }
  if (handler) {
    // is a cql object change clean the internal cache
    this.scheduleObjectRefresh(handler, event.keyspace, cqlObject, processNow, callback);
  }
};

/**
 * @param {Function} handler
 * @param {String} keyspaceName
 * @param {String} cqlObject
 * @param {Boolean} processNow
 * @param {Function} [callback]
 */
ControlConnection.prototype.scheduleObjectRefresh = function (handler, keyspaceName, cqlObject, processNow, callback) {
  this.debouncer.eventReceived(
    { handler: handler, keyspace: keyspaceName, cqlObject: cqlObject, callback: callback },
    processNow
  );
};

/**
 * @param {String} keyspaceName
 * @param {Boolean} processNow
 * @param {Function} [callback]
 */
ControlConnection.prototype.scheduleKeyspaceRefresh = function (keyspaceName, processNow, callback) {
  var self = this;
  var handler = function keyspaceRefreshHandler(cb) {
    self.metadata.refreshKeyspace(keyspaceName, cb);
  };
  this.debouncer.eventReceived({ handler: handler, keyspace: keyspaceName, callback: callback}, processNow);
};

/**
 * @param {Function} [callback]
 */
ControlConnection.prototype.scheduleRefreshHosts = function (callback) {
  var self = this;
  var handler = function hostsRefreshHandler(cb) {
    self.refreshHosts(false, cb);
  };
  this.debouncer.eventReceived({ handler: handler, all: true, callback: callback }, false);
};

ControlConnection.prototype.setLocalInfo = function (endPoint, result) {
  if (!result || !result.rows || !result.rows.length) {
    this.log('warning', 'No local info provided');
    return;
  }
  var row = result.rows[0];
  var localHost = this.hosts.get(endPoint);
  if (!localHost) {
    this.log('error', 'Localhost could not be found');
    return;
  }
  localHost.datacenter = row['data_center'];
  localHost.rack = row['rack'];
  localHost.tokens = row['tokens'];
  localHost.cassandraVersion = row['release_version'];
  this.metadata.setPartitioner(row['partitioner']);
  this.log('info', 'Local info retrieved');
};

/**
 * @param {Boolean} newNodesUp
 * @param {Error} err
 * @param {ResultSet} result
 * @param {Function} callback
 */
ControlConnection.prototype.setPeersInfo = function (newNodesUp, err, result, callback) {
  if (!result || !result.rows || err) {
    return callback(err);
  }
  var self = this;
  //A map of peers, could useful for in case there are discrepancies
  var peers = {};
  var port = this.options.protocolOptions.port;
  utils.eachSeries(result.rows, function eachPeer(row, next) {
    self.getAddressForPeerHost(row, port, function getAddressForPeerCallback(endPoint) {
      if (!endPoint) {
        return next();
      }
      peers[endPoint] = true;
      var host = self.hosts.get(endPoint);
      if (!host) {
        host = new Host(endPoint, self.protocolVersion, self.options, self.metadata);
        if (!newNodesUp) {
          host.setDown();
        }
        self.log('info', 'Adding host ' + endPoint);
        self.hosts.set(endPoint, host);
      }
      host.datacenter = row['data_center'];
      host.rack = row['rack'];
      host.tokens = row['tokens'];
      host.cassandraVersion = row['release_version'];
      next();
    });
  }, function (err) {
    if (err) {
      return callback(err);
    }
    //Is there a difference in number between peers + local != hosts
    if (self.hosts.length > result.rows.length + 1) {
      //There are hosts in the current state that don't belong (nodes removed or wrong contactPoints)
      self.log('info', 'Removing nodes from the pool');
      var toRemove = [];
      self.hosts.forEach(function (h) {
        //It is not a peer and it is not local host
        if (!peers[h.address] && h !== self.host) {
          self.log('info', 'Removing host ' + h.address);
          toRemove.push(h.address);
          h.shutdown(true);
        }
      });
      self.hosts.removeMultiple(toRemove);
    }
    self.log('info', 'Peers info retrieved');
    callback();
  });
};

/**
 * @param {Object|Row} row
 * @param {Number} defaultPort
 * @param {Function} callback The callback to invoke with the string representation of the host endpoint,
 *  containing the ip address and port.
 */
ControlConnection.prototype.getAddressForPeerHost = function (row, defaultPort, callback) {
  var address = row['rpc_address'];
  var peer = row['peer'];
  var bindAllAddress = '0.0.0.0';
  if (!address) {
    this.log('error', f('No rpc_address found for host %s in %s\'s peers system table. %s will be ignored.',
      peer, this.host.address, peer));
    return callback(null);
  }
  if (address.toString() === bindAllAddress) {
    this.log('warning', f('Found host with 0.0.0.0 as rpc_address, using listen_address (%s) to contact it instead.' +
      ' If this is incorrect you should avoid the use of 0.0.0.0 server side.', peer));
    address = peer;
  }
  this.addressTranslator.translate(address.toString(), defaultPort, callback);
};

/**
 * Waits for a connection to be available. If timeout expires before getting a connection it callbacks in error.
 * @param {Function} callback
 */
ControlConnection.prototype.waitForReconnection = function (callback) {
  var timeout;
  var self = this;
  function newConnectionListener(err) {
    clearTimeout(timeout);
    callback(err);
  }
  this.once('newConnection', newConnectionListener);
  timeout = setTimeout(function waitTimeout() {
    self.removeListener('newConnection', newConnectionListener);
    callback(new errors.OperationTimedOutError('A connection could not be acquired before timeout.'));
  }, metadataQueryAbortTimeout);
};

/**
 * Executes a query using the active connection
 * @param {String|Request} cqlQuery
 * @param {Boolean} [waitReconnect] Determines if it should wait for reconnection in case the control connection is not
 * connected at the moment. Default: true.
 * @param {Function} callback
 */
ControlConnection.prototype.query = function (cqlQuery, waitReconnect, callback) {
  var self = this;
  if (typeof waitReconnect === 'function') {
    callback = waitReconnect;
    waitReconnect = true;
  }
  function queryOnConnection() {
    var request = typeof cqlQuery === 'string' ? new requests.QueryRequest(cqlQuery, null, null) : cqlQuery;
    self.connection.sendStream(request, null, callback);
  }
  if (!this.connection) {
    if (!waitReconnect) {
      return callback(new errors.NoHostAvailableError(null));
    }
    // Wait until its reconnected (or timer elapses)
    return this.waitForReconnection(function waitCallback(err) {
      if (err) {
        //it was not able to reconnect in time
        return callback(err);
      }
      queryOnConnection();
    });
  }
  queryOnConnection();
};

/** @returns {Encoder} The encoder used by the current connection */
ControlConnection.prototype.getEncoder = function () {
  if (!this.encoder) {
    throw new errors.DriverInternalError('Encoder is not defined');
  }
  return this.encoder;
};

ControlConnection.prototype.shutdown = function () {
  // no need for callback as it all sync
  this.isShuttingDown = true;
  this.debouncer.shutdown();
  // Emit a "newConnection" event with Error, as it may clear timeouts that were waiting new connections
  this.emit('newConnection', new errors.DriverError('ControlConnection is being shutdown'));
  // Cancel timers
  clearTimeout(this.topologyChangeTimeout);
  clearTimeout(this.nodeStatusChangeTimeout);
  clearTimeout(this.reconnectionTimeout);
};

/**
 * Resets the Connection to its initial state.
 */
ControlConnection.prototype.reset = function (callback) {
  // Reset the internal state of the ControlConnection for future initialization attempts
  var currentHosts = this.hosts.clear();
  // Set the shutting down flag temporarily to avoid reconnects.
  this.isShuttingDown = true;
  var self = this;
  utils.each(currentHosts, function forEachHost(h, next) {
    h.shutdown(false, function () {
      // Ignore any shutdown error
      next();
    });
  }, function shuttingDownFinished() {
    self.initialized = false;
    self.isShuttingDown = false;
    callback();
  });
};

/**
 * Uses the DNS protocol to resolve a IPv4 and IPv6 addresses (A and AAAA records) for the hostname
 * @private
 * @param name
 * @param callback
 */
function resolveAll(name, callback) {
  var addresses = [];
  utils.parallel([
    function resolve4(next) {
      dns.resolve4(name, function resolve4Callback(err, arr) {
        if (arr) {
          addresses.push.apply(addresses, arr);
        }
        // Ignore error
        next();
      });
    },
    function resolve6(next) {
      dns.resolve6(name, function resolve6Callback(err, arr) {
        if (arr) {
          addresses.push.apply(addresses, arr);
        }
        // Ignore error
        next();
      });
    }
  ], function resolveAllCallback() {
    if (addresses.length === 0) {
      // In case dns.resolve*() methods don't yield a valid address for the host name
      // Use system call getaddrinfo() that might resolve according to host system definitions
      return dns.lookup(name, function (err, addr) {
        if (err) {
          return callback(err);
        }
        addresses.push(addr);
        callback(null, addresses);
      });
    }
    callback(null, addresses);
  });
}

module.exports = ControlConnection;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var events = __webpack_require__(4);

var Connection = __webpack_require__(47);
var utils = __webpack_require__(1);
var defaultOptions = __webpack_require__(7).defaultOptions();

// Used to get the index of the connection with less in-flight requests
var connectionIndex = 0;
var connectionIndexOverflow = Math.pow(2, 15);

/**
 * Represents the possible states of the pool.
 * Possible state transitions:
 *  - From initial to closing: The pool must be closed because the host is ignored.
 *  - From initial to shuttingDown: The pool is being shutdown as a result of a client shutdown.
 *  - From closing to initial state: The pool finished closing connections (is now ignored) and it resets to
 *    initial state in case the host is marked as local/remote in the future.
 *  - From closing to shuttingDown (rare): It was marked as ignored, now the client is being shutdown.
 *  - From shuttingDown to shutdown: Finished shutting down, the pool should not be reused.
 * @private
 */
var state = {
  // Initial state: open / opening / ready to be opened
  initial: 0,
  // When the pool is being closed as part of a distance change
  closing: 1,
  // When the pool is being shutdown for good
  shuttingDown: 2,
  // When the pool has being shutdown
  shutDown: 4
};

/**
 * Represents a pool of connections to a host
 * @param {Host} host
 * @param {Number} protocolVersion Initial protocol version
 * @extends EventEmitter
 * @constructor
 */
function HostConnectionPool(host, protocolVersion) {
  events.EventEmitter.call(this);
  this._address = host.address;
  this._newConnectionTimeout = null;
  this._creating = false;
  this._state = state.initial;
  this.options = host.options;
  this.protocolVersion = protocolVersion;
  this.coreConnectionsLength = 1;
  /**
   * An immutable array of connections
   * @type {Array.<Connection>}
   */
  this.connections = utils.emptyArray;
  this.setMaxListeners(0);
}

util.inherits(HostConnectionPool, events.EventEmitter);

/**
 * @param {Function} callback
 */
HostConnectionPool.prototype.borrowConnection = function (callback) {
  var self = this;
  this.create(false, function afterCreating(err) {
    if (err) {
      return callback(err);
    }
    if (self.connections.length === 0) {
      // Normally it should have callback in error, but better to handle this possibility
      return callback(new Error('No connection available'));
    }
    var c = HostConnectionPool.minInFlight(self.connections);
    callback(null, c);
  });
};

/**
 * Gets the connection with the minimum number of in-flight requests.
 * Only checks for index + 1 and index, to avoid a loop through all the connections.
 * @param {Array.<Connection>} connections
 * @returns {Connection}
 */
HostConnectionPool.minInFlight = function(connections) {
  var length = connections.length;
  if (length === 1) {
    return connections[0];
  }
  var index = ++connectionIndex;
  if (connectionIndex >= connectionIndexOverflow) {
    connectionIndex = 0;
  }
  var current = connections[index % length];
  var previous = connections[(index - 1) % length];
  if (previous.getInFlight() < current.getInFlight()) {
    return previous;
  }
  return current;
};

/**
 * Create the min amount of connections, if the pool is empty.
 * @param {Boolean} warmup Determines if all connections must be created before invoking the callback
 * @param {Function} callback
 */
HostConnectionPool.prototype.create = function (warmup, callback) {
  if (this.isClosing()) {
    return callback(new Error('Pool is being closed when calling create'));
  }
  // The value of this.coreConnectionsLength can change over time
  // when an existing pool is being resized (by setting the distance).
  if (this.connections.length >= this.coreConnectionsLength) {
    return callback();
  }
  if (!warmup && this.connections.length > 0) {
    // we already have a valid connection
    // let the connection grow continue in the background
    this.increaseSize();
    return callback();
  }
  this.once('creation', callback);
  if (this._creating) {
    // wait for the pool to be creating
    return;
  }
  this._creating = true;
  var connectionsToCreate = this.coreConnectionsLength;
  if (!warmup) {
    connectionsToCreate = 1;
  }
  var self = this;
  utils.whilst(
    function condition() {
      return self.connections.length < connectionsToCreate;
    },
    function iterator(next) {
      self._attemptNewConnection(next);
    }, function whilstEnded(err) {
      self._creating = false;
      if (err) {
        if (self.isClosing()) {
          self.log('info', 'Connection pool created but it was being closed');
          self._closeAllConnections();
          err = new Error('Pool is being closed');
        }
        else {
          // there was an error and no connections could be successfully opened
          self.log('warning', util.format('Connection pool to host %s could not be created', self._address), err);
        }
        return self.emit('creation', err);
      }
      self.log('info', util.format('Connection pool to host %s created with %d connection(s)',
        self._address, self.connections.length));
      self.emit('creation');
      self.increaseSize();
    });
};

/** @returns {Connection} */
HostConnectionPool.prototype._createConnection = function () {
  var c = new Connection(this._address, this.protocolVersion, this.options);
  var self = this;
  function connectionErrorCallback() {
    // The socket is not fully open / can not send heartbeat
    self.remove(c);
  }
  c.on('idleRequestError', connectionErrorCallback);
  c.on('socketClose', connectionErrorCallback);
  return c;
};

/**
 * Prevents reconnection timeout from triggering
 */
HostConnectionPool.prototype.clearNewConnectionAttempt = function () {
  if (!this._newConnectionTimeout) {
    return;
  }
  clearTimeout(this._newConnectionTimeout);
  this._newConnectionTimeout = null;
};

/**
 * @param {Function} callback
 */
HostConnectionPool.prototype._attemptNewConnection = function (callback) {
  var c = this._createConnection();
  var self = this;
  this.once('open', callback);
  if (this._opening) {
    // wait for the event to fire
    return;
  }
  this._opening = true;
  c.open(function attemptOpenCallback(err) {
    self._opening = false;
    if (err) {
      self.log('warning', util.format('Connection to %s could not be created: %s', self._address, err), err);
      c.close();
      return self.emit('open', err);
    }
    if (self.isClosing()) {
      self.log('info', util.format('Connection to %s opened successfully but pool was being closed', self._address));
      c.close();
      return self.emit('open', new Error('Connection closed'));
    }
    // use a copy of the connections array
    var newConnections = self.connections.slice(0);
    newConnections.push(c);
    self.connections = newConnections;
    self.log('info', util.format('Connection to %s opened successfully', self._address));
    self.emit('open', null, c);
  });
};

HostConnectionPool.prototype.attemptNewConnectionImmediate = function () {
  var self = this;
  function openConnection() {
    self.clearNewConnectionAttempt();
    self.scheduleNewConnectionAttempt(0);
  }
  if (this._state === state.initial) {
    return openConnection();
  }
  if (this._state === state.closing) {
    return this.once('close', openConnection);
  }
  // In the case the pool its being / has been shutdown for good
  // Do not attempt to create a new connection.
};

/**
 * Closes the connection and removes a connection from the pool.
 * @param {Connection} connection
 */
HostConnectionPool.prototype.remove = function (connection) {
  // locating an object by position in the array is O(n), but normally there should be between 1 to 8 connections.
  var index = this.connections.indexOf(connection);
  if (index < 0) {
    // it was already removed from the connections and it's closing
    return;
  }
  // remove the connection from the pool, using an pool copy
  var newConnections = this.connections.slice(0);
  newConnections.splice(index, 1);
  this.connections = newConnections;
  // close the connection
  setImmediate(function removeClose() {
    connection.close();
  });
  this.emit('remove');
};

/**
 * @param {Number} delay
 */
HostConnectionPool.prototype.scheduleNewConnectionAttempt = function (delay) {
  if (this.isClosing()) {
    return;
  }
  var self = this;
  this._newConnectionTimeout = setTimeout(function newConnectionTimeoutExpired() {
    self._newConnectionTimeout = null;
    if (self.connections.length >= self.coreConnectionsLength) {
      // new connection can be scheduled while a new connection is being opened
      // the pool has the appropriate size
      return;
    }
    self._attemptNewConnection(utils.noop);
  }, delay);
};

HostConnectionPool.prototype.hasScheduledNewConnection = function () {
  return !!this._newConnectionTimeout || this._opening;
};

/**
 * Increases the size of the connection pool in the background, if needed.
 */
HostConnectionPool.prototype.increaseSize = function () {
  if (this.connections.length < this.coreConnectionsLength && !this.hasScheduledNewConnection()) {
    // schedule the next connection in the background
    this.scheduleNewConnectionAttempt(0);
  }
};

/**
 * Gets a boolean indicating if the pool is being closed / shutting down or has been shutdown.
 */
HostConnectionPool.prototype.isClosing = function () {
  return this._state !== state.initial;
};

/**
 * Gracefully waits for all in-flight requests to finish and closes the pool.
 */
HostConnectionPool.prototype.drainAndShutdown = function () {
  if (this.isClosing()) {
    // Its already closing / shutting down
    return;
  }
  this._state = state.closing;
  this.clearNewConnectionAttempt();
  var self = this;
  if (this.connections.length === 0) {
    return this._afterClosing();
  }
  var connections = this.connections;
  this.connections = utils.emptyArray;
  var closedConnections = 0;
  this.log('info', util.format('Draining and closing %d connections to %s', connections.length, this._address));
  for (var i = 0; i < connections.length; i++) {
    var c = connections[i];
    if (c.getInFlight() === 0) {
      getDelayedClose(c)();
      continue;
    }
    c.emitDrain = true;
    c.once('drain', getDelayedClose(c));
  }
  var wasClosed = false;
  var checkShutdownTimeout;
  function getDelayedClose(connection) {
    return (function delayedClose() {
      connection.close();
      if (++closedConnections < connections.length) {
        return;
      }
      if (wasClosed) {
        return;
      }
      wasClosed = true;
      if (checkShutdownTimeout) {
        clearTimeout(checkShutdownTimeout);
      }
      self._afterClosing();
    });
  }
  // Check that after sometime (readTimeout + 100ms) the connections have been drained
  var delay = (this.options.socketOptions.readTimeout || defaultOptions.socketOptions.readTimeout) + 100;
  checkShutdownTimeout = setTimeout(function checkShutdown() {
    wasClosed = true;
    connections.forEach(function connectionEach(c) {
      c.close();
    });
    self._afterClosing();
  }, delay);
};

HostConnectionPool.prototype._afterClosing = function () {
  var self = this;
  function resetState() {
    if (self._state === state.shuttingDown) {
      self._state = state.shutDown;
    }
    else {
      self._state = state.initial;
    }
    self.emit('close');
  }
  if (this._creating) {
    // The pool is being created, reset the state back to init once the creation finished (without any new connection)
    return this.once('creation', resetState);
  }
  if (this._opening) {
    // The pool is growing, reset the state back to init once the open finished (without any new connection)
    return this.once('open', resetState);
  }
  resetState();
};

/**
 * @param {Function} callback
 */
HostConnectionPool.prototype.shutdown = function (callback) {
  this.clearNewConnectionAttempt();
  if (!this.connections.length) {
    this._state = state.shutDown;
    return callback();
  }
  var previousState = this._state;
  this._state = state.shuttingDown;
  if (previousState === state.closing) {
    return this.once('close', callback);
  }
  this.once('shutdown', callback);
  if (previousState === state.shuttingDown) {
    // Its going to be emitted
    return;
  }
  var self = this;
  this._closeAllConnections(function closeAllCallback() {
    self._state = state.shutDown;
    self.emit('shutdown');
  });
};

/** @param {Function} [callback] */
HostConnectionPool.prototype._closeAllConnections = function (callback) {
  callback = callback || utils.noop;
  var connections = this.connections;
  // point to an empty array
  this.connections = utils.emptyArray;
  if (connections.length === 0) {
    return callback();
  }
  this.log('info', util.format('Closing %d connections to %s', connections.length, this._address));
  utils.each(connections, function closeEach(c, next) {
    c.close(function closedCallback() {
      //ignore errors
      next();
    });
  }, callback);
};

HostConnectionPool.prototype.log = utils.log;

module.exports = HostConnectionPool;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var net = __webpack_require__(15);
var events = __webpack_require__(4);
var util = __webpack_require__(0);
var tls = __webpack_require__(48);

var Encoder = __webpack_require__(17);
var WriteQueue = __webpack_require__(18).WriteQueue;
var requests = __webpack_require__(5);
var streams = __webpack_require__(49);
var utils = __webpack_require__(1);
var types = __webpack_require__(2);
var errors = __webpack_require__(3);
var StreamIdStack = __webpack_require__(51);
var OperationState = __webpack_require__(52);

/**  @const */
var idleQuery = 'SELECT key from system.local';

/**
 * Represents a connection to a Cassandra node
 * @param {String} endpoint An string containing ip address and port of the host
 * @param {Number|null} protocolVersion
 * @param {ClientOptions} options
 * @extends EventEmitter
 * @constructor
 */
function Connection(endpoint, protocolVersion, options) {
  events.EventEmitter.call(this);
  this.setMaxListeners(0);
  if (!endpoint || endpoint.indexOf(':') < 0) {
    throw new Error('EndPoint must contain the ip address and port separated by : symbol');
  }
  this.endpoint = endpoint;
  var portSeparatorIndex = endpoint.lastIndexOf(':');
  this.address = endpoint.substr(0, portSeparatorIndex);
  this.port = endpoint.substr(portSeparatorIndex + 1);
  Object.defineProperty(this, "options", { value: options, enumerable: false, writable: false});
  if (protocolVersion === null) {
    // Set initial protocol version
    protocolVersion = types.protocolVersion.maxSupported;
    if (options.protocolOptions.maxVersion) {
      // User provided the protocol version
      protocolVersion = options.protocolOptions.maxVersion;
    }
    // Allow to check version using this connection instance
    this._checkingVersion = true;
  }
  this.protocolVersion = protocolVersion;
  /** @type {Object.<String, OperationState>} */
  this._operations = {};
  this._pendingWrites = [];
  this._preparing = {};
  /**
   * The timeout state for the idle request (heartbeat)
   */
  this._idleTimeout = null;
  this.timedOutOperations = 0;
  this._streamIds = new StreamIdStack(this.protocolVersion);
  this.encoder = new Encoder(protocolVersion, options);
  this.keyspace = null;
  this.emitDrain = false;
  /**
   * Determines if the socket is open and startup succeeded, whether the connection can be used to send requests / 
   * receive events
   */
  this.connected = false;
  /**
   * Determines if the socket can be considered as open
   */
  this.isSocketOpen = false;
}

util.inherits(Connection, events.EventEmitter);

Connection.prototype.log = utils.log;

/**
 * Binds the necessary event listeners for the socket
 */
Connection.prototype.bindSocketListeners = function() {
  //Remove listeners that were used for connecting
  this.netClient.removeAllListeners('connect');
  this.netClient.removeAllListeners('timeout');
  // The socket is expected to be open at this point
  this.isSocketOpen = true;
  var self = this;
  this.netClient.on('close', function() {
    self.log('info', 'Connection to ' + self.endpoint + ' closed');
    self.isSocketOpen = false;
    var wasConnected = self.connected;
    self.close();
    if (wasConnected) {
      // Emit only when it was closed unexpectedly
      self.emit('socketClose');
    }
  });

  this.protocol = new streams.Protocol({ objectMode: true });
  this.parser = new streams.Parser({ objectMode: true }, this.encoder);
  var resultEmitter = new streams.ResultEmitter({objectMode: true});
  resultEmitter.on('result', this.handleResult.bind(this));
  resultEmitter.on('row', this.handleRow.bind(this));
  resultEmitter.on('frameEnded', this.freeStreamId.bind(this));
  resultEmitter.on('nodeEvent', this.handleNodeEvent.bind(this));

  this.netClient
    .pipe(this.protocol)
    .pipe(this.parser)
    .pipe(resultEmitter);

  this.writeQueue = new WriteQueue(this.netClient, this.encoder, this.options);
};

/**
 * Connects a socket and sends the startup protocol messages.
 * Note that when open() callbacks in error, the caller should immediately call {@link Connection#close}.
 */
Connection.prototype.open = function (callback) {
  var self = this;
  this.log('info', 'Connecting to ' + this.address + ':' + this.port);
  if (!this.options.sslOptions) {
    this.netClient = new net.Socket();
    this.netClient.connect(this.port, this.address, function connectCallback() {
      self.log('verbose', 'Socket connected to ' + self.address + ':' + self.port);
      self.bindSocketListeners();
      self.startup(callback);
    });
  }
  else {
    //use TLS
    var sslOptions = utils.extend({rejectUnauthorized: false}, this.options.sslOptions);
    this.netClient = tls.connect(this.port, this.address, sslOptions, function tlsConnectCallback() {
      self.log('verbose', 'Secure socket connected to ' + self.address + ':' + self.port);
      self.bindSocketListeners();
      self.startup(callback);
    });
  }
  this.netClient.once('error', function socketError(err) {
    self.errorConnecting(err, false, callback);
  });
  this.netClient.once('timeout', function connectTimedOut() {
    var err = new types.DriverError('Connection timeout');
    self.errorConnecting(err, true, callback);
  });
  this.netClient.setTimeout(this.options.socketOptions.connectTimeout);
  // Improve failure detection with TCP keep-alives
  if (this.options.socketOptions.keepAlive) {
    this.netClient.setKeepAlive(true, this.options.socketOptions.keepAliveDelay);
  }
  this.netClient.setNoDelay(!!this.options.socketOptions.tcpNoDelay);
};

/**
 * Determines the protocol version to use and sends the STARTUP request
 * @param {Function} callback
 */
Connection.prototype.startup = function (callback) {
  if (this._checkingVersion) {
    this.log('info', 'Trying to use protocol version ' + this.protocolVersion);
  }
  var self = this;
  this.sendStream(new requests.StartupRequest(), null, function responseCallback(err, response) {
    if (err && self._checkingVersion) {
      var invalidProtocol = (err instanceof errors.ResponseError &&
        err.code === types.responseErrorCodes.protocolError &&
        err.message.indexOf('Invalid or unsupported protocol version') >= 0);
      if (!invalidProtocol && types.protocolVersion.canStartupResponseErrorBeWrapped(self.protocolVersion)) {
        //For some versions of Cassandra, the error is wrapped into a server error
        //See CASSANDRA-9451
        invalidProtocol = (err instanceof errors.ResponseError &&
          err.code === types.responseErrorCodes.serverError &&
          err.message.indexOf('ProtocolException: Invalid or unsupported protocol version') > 0);
      }
      if (invalidProtocol) {
        // The server can respond with a message using the lower protocol version supported
        // or using the same version as the one provided
        var lowerVersion = self.protocol.version;
        if (lowerVersion === self.protocolVersion) {
          lowerVersion = types.protocolVersion.getLowerSupported(self.protocolVersion);
        }
        if (!lowerVersion) {
          return startupCallback(
            new Error('Connection was unable to STARTUP using protocol version ' + self.protocolVersion));
        }
        self.log('info', 'Protocol v' + self.protocolVersion + ' not supported, using v' + lowerVersion);
        self.decreaseVersion(lowerVersion);
        // The host closed the connection, close the socket and start the connection flow again
        setImmediate(function decreasingVersionClosing() {
          self.close(function decreasingVersionOpening() {
            // Attempt to open with the correct protocol version
            self.open(callback);
          });
        });
        return;
      }
    }
    if (response && response.mustAuthenticate) {
      return self.startAuthenticating(response.authenticatorName, startupCallback);
    }
    startupCallback(err);
  });

  function startupCallback(err) {
    if (err) {
      return self.errorConnecting(err, false, callback);
    }
    //The socket is connected and the connection is authenticated
    return self.connectionReady(callback);
  }
};

Connection.prototype.errorConnecting = function (err, destroy, callback) {
  this.log('warning', 'There was an error when trying to connect to the host ' + this.address, err);
  if (destroy) {
    //there is a TCP connection that should be killed.
    this.netClient.destroy();
  }
  callback(err);
};

/**
 * Sets the connection to ready/connected status
 */
Connection.prototype.connectionReady = function (callback) {
  this.emit('connected');
  this.connected = true;
  // Remove existing error handlers as the connection is now ready.
  this.netClient.removeAllListeners('error');
  this.netClient.on('error', this.handleSocketError.bind(this));
  callback();
};

/** @param {Number} lowerVersion */
Connection.prototype.decreaseVersion = function (lowerVersion) {
  // The response already has the max protocol version supported by the Cassandra host.
  this.protocolVersion = lowerVersion;
  this.encoder.setProtocolVersion(lowerVersion);
  this._streamIds.setVersion(lowerVersion);
};

/**
 * Handle socket errors, if the socket is not readable invoke all pending callbacks
 */
Connection.prototype.handleSocketError = function (err) {
  this.clearAndInvokePending(err);
};

/**
 * Cleans all internal state and invokes all pending callbacks of sent streams
 */
Connection.prototype.clearAndInvokePending = function (innerError) {
  if (this._idleTimeout) {
    //Remove the idle request
    clearTimeout(this._idleTimeout);
    this._idleTimeout = null;
  }
  this._streamIds.clear();
  if (this.emitDrain) {
    this.emit('drain');
  }
  var err = new types.DriverError('Socket was closed');
  err.isSocketError = true;
  if (innerError) {
    err.innerError = innerError;
  }
  //copy all handlers
  var operations = utils.objectValues(this._operations);
  //remove it from the map
  this._operations = {};
  if (operations.length > 0) {
    this.log('info', 'Invoking ' + operations.length + ' pending callbacks');
  }
  // Invoke all handlers
  utils.each(operations, function (operation, next) {
    operation.setResult(err);
    next();
  });

  var pendingWritesCopy = this._pendingWrites;
  this._pendingWrites = [];
  utils.each(pendingWritesCopy, function (operation, next) {
    operation.setResult(err);
    next();
  });
};

/**
 * Starts the SASL flow
 * @param {String} authenticatorName
 * @param {Function} callback
 */
Connection.prototype.startAuthenticating = function (authenticatorName, callback) {
  if (!this.options.authProvider) {
    return callback(new errors.AuthenticationError('Authentication provider not set'));
  }
  var authenticator = this.options.authProvider.newAuthenticator(this.endpoint, authenticatorName);
  var self = this;
  authenticator.initialResponse(function initialResponseCallback(err, token) {
    // Start the flow with the initial token
    if (err) {
      return callback(err);
    }
    self.authenticate(authenticator, token, callback);
  });
};

/**
 * Handles authentication requests and responses.
 * @param {Authenticator} authenticator
 * @param {Buffer} token
 * @param {Function} callback
 */
Connection.prototype.authenticate = function(authenticator, token, callback) {
  var self = this;
  var request = new requests.AuthResponseRequest(token);
  if (this.protocolVersion === 1) {
    //No Sasl support, use CREDENTIALS
    //noinspection JSUnresolvedVariable
    if (!authenticator.username) {
      return callback(new errors.AuthenticationError('Only plain text authenticator providers allowed under protocol v1'));
    }
    //noinspection JSUnresolvedVariable
    request = new requests.CredentialsRequest(authenticator.username, authenticator.password);
  }
  this.sendStream(request, null, function authResponseCallback(err, result) {
    if (err) {
      if (err instanceof errors.ResponseError && err.code === types.responseErrorCodes.badCredentials) {
        var authError = new errors.AuthenticationError(err.message);
        authError.additionalInfo = err;
        err = authError;
      }
      return callback(err);
    }
    if (result.ready) {
      authenticator.onAuthenticationSuccess();
      return callback();
    }
    if (result.authChallenge) {
      return authenticator.evaluateChallenge(result.token, function evaluateCallback(err, t) {
        if (err) {
          return callback(err);
        }
        //here we go again
        self.authenticate(authenticator, t, callback);
      });
    }
    callback(new errors.DriverInternalError('Unexpected response from Cassandra: ' + util.inspect(result)));
  });
};

/**
 * Executes a 'USE ' query, if keyspace is provided and it is different from the current keyspace
 * @param {?String} keyspace
 * @param {Function} callback
 */
Connection.prototype.changeKeyspace = function (keyspace, callback) {
  if (!keyspace || this.keyspace === keyspace) {
    return callback();
  }
  this.once('keyspaceChanged', callback);
  if (this.toBeKeyspace === keyspace) {
    // It will be invoked once the keyspace is changed
    return;
  }
  this.toBeKeyspace = keyspace;
  var query = util.format('USE "%s"', keyspace);
  var self = this;
  this.sendStream(
    new requests.QueryRequest(query, null, null),
    null,
    function changeKeyspaceResponseCallback(err) {
      if (err) {
        self.log('error', util.format('Connection to %s could not switch active keyspace', self.endpoint), err);
      }
      else {
        self.keyspace = keyspace;
      }
      self.toBeKeyspace = null;
      self.emit('keyspaceChanged', err, keyspace);
    });
};

/**
 * Prepares a query on a given connection. If its already being prepared, it queues the callback.
 * @param {String} query
 * @param {function} callback
 */
Connection.prototype.prepareOnce = function (query, callback) {
  var name = ( this.keyspace || '' ) + query;
  var info = this._preparing[name];
  if (this._preparing[name]) {
    //Its being already prepared
    return info.once('prepared', callback);
  }
  info = new events.EventEmitter();
  info.setMaxListeners(0);
  info.once('prepared', callback);
  this._preparing[name] = info;
  var self = this;
  this.sendStream(new requests.PrepareRequest(query), null, function (err, response) {
    info.emit('prepared', err, response);
    delete self._preparing[name];
  });
};

/**
 * Uses the frame writer to write into the wire
 * @param {Request} request
 * @param {QueryOptions|null} options
 * @param {function} callback Function to be called once the response has been received
 * @return {OperationState}
 */
Connection.prototype.sendStream = function (request, options, callback) {
  var self = this;
  var operation = new OperationState(request, options, callback);
  var streamId = this._getStreamId();
  if (streamId === null) {
    self.log('info',
      'Enqueuing ' +
      this._pendingWrites.length +
      ', if this message is recurrent consider configuring more connections per host or lowering the pressure');
    this._pendingWrites.push(operation);
    return operation;
  }
  this._write(operation, streamId);
  return operation;
};

/**
 * Pushes the item into the queue.
 * @param {OperationState} operation
 * @param {Number} streamId
 * @private
 */
Connection.prototype._write = function (operation, streamId) {
  this.log('verbose', 'Sending stream #' + streamId);
  operation.streamId = streamId;
  var self = this;
  this.writeQueue.push(operation, function writeCallback (err) {
    if (err) {
      return operation.setResult(err);
    }
    self.log('verbose', 'Sent stream #' + streamId + ' to ' + self.endpoint);
    if (operation.isByRow()) {
      self.parser.setOptions(streamId, { byRow: true });
    }
    self._setIdleTimeout();
    operation.setRequestTimeout(self.options.socketOptions.readTimeout, self.endpoint,
      function timeoutCallback () {
        self.timedOutOperations++;
      },
      function responseCallback() {
        self.timedOutOperations--;
      });
    self._operations[streamId] = operation;
  });
};

Connection.prototype._setIdleTimeout = function () {
  if (!this.options.pooling.heartBeatInterval) {
    return;
  }
  var self = this;
  // Scheduling the new timeout before de-scheduling the previous performs significantly better
  // than de-scheduling first, see nodejs implementation: https://github.com/nodejs/node/blob/master/lib/timers.js
  var previousTimeout = this._idleTimeout;
  self._idleTimeout = setTimeout(function () {
    self._idleTimeoutHandler();
  }, self.options.pooling.heartBeatInterval);
  if (previousTimeout) {
    //remove the previous timeout for the idle request
    clearTimeout(previousTimeout);
  }
};

/**
 * Function that gets executed once the idle timeout has passed to issue a request to keep the connection alive
 */
Connection.prototype._idleTimeoutHandler = function () {
  var self = this;
  if (this.sendingIdleQuery) {
    //don't issue another
    //schedule for next time
    this._idleTimeout = setTimeout(function () {
      self._idleTimeoutHandler();
    }, this.options.pooling.heartBeatInterval);
    return;
  }
  this.log('verbose', 'Connection idling, issuing a Request to prevent idle disconnects');
  this.sendingIdleQuery = true;
  this.sendStream(new requests.QueryRequest(idleQuery), utils.emptyObject, function (err) {
    self.sendingIdleQuery = false;
    if (!err) {
      //The sending succeeded
      //There is a valid response but we don't care about the response
      return;
    }
    self.log('warning', 'Received heartbeat request error', err);
    self.emit('idleRequestError', err, self);
  });
};

/**
 * Returns an available streamId or null if there isn't any available
 * @returns {Number}
 */
Connection.prototype._getStreamId = function() {
  return this._streamIds.pop();
};

Connection.prototype.freeStreamId = function(header) {
  var streamId = header.streamId;
  if (streamId < 0) {
    return;
  }
  delete this._operations[streamId];
  this._streamIds.push(streamId);
  if (this.emitDrain && this._streamIds.inUse === 0 && this._pendingWrites.length === 0) {
    this.emit('drain');
  }
  this._writeNext();
  this.log('verbose', 'Done receiving frame #' + streamId);
};

Connection.prototype._writeNext = function () {
  if (this._pendingWrites.length === 0) {
    return;
  }
  var streamId = this._getStreamId();
  if (streamId === null) {
    // No streamId available
    return;
  }
  var self = this;
  var operation = this._pendingWrites.shift();
  setImmediate(function writeNextPending() {
    self._write(operation, streamId);
  });
};

/**
 * Returns the number of requests waiting for response
 * @returns {Number}
 */
Connection.prototype.getInFlight = function () {
  return this._streamIds.inUse;
};

/**
 * Handles a result and error response
 */
Connection.prototype.handleResult = function (header, err, result) {
  var streamId = header.streamId;
  if(streamId < 0) {
    return this.log('verbose', 'event received', header);
  }
  var operation = this._operations[streamId];
  if (!operation) {
    return this.log('error', 'The server replied with a wrong streamId #' + streamId);
  }
  this.log('verbose', 'Received frame #' + streamId + ' from ' + this.endpoint);
  operation.setResult(err, result);
};

Connection.prototype.handleNodeEvent = function (header, event) {
  switch (event.eventType) {
    case types.protocolEvents.schemaChange:
      this.emit('nodeSchemaChange', event);
      break;
    case types.protocolEvents.topologyChange:
      this.emit('nodeTopologyChange', event);
      break;
    case types.protocolEvents.statusChange:
      this.emit('nodeStatusChange', event);
      break;
  }
};

/**
 * Handles a row response
 */
Connection.prototype.handleRow = function (header, row, meta, rowLength, flags) {
  var streamId = header.streamId;
  if(streamId < 0) {
    return this.log('verbose', 'Event received', header);
  }
  var operation = this._operations[streamId];
  if (!operation) {
    return this.log('error', 'The server replied with a wrong streamId #' + streamId);
  }
  this.log('verbose', 'Received streaming frame #' + streamId);
  operation.setResultRow(row, meta, rowLength, flags);
};

/**
 * Closes the socket (if not already closed) and cancels all in-flight requests.
 * Multiple calls to this method have no additional side-effects.
 * @param {Function} [callback]
 */
Connection.prototype.close = function (callback) {
  callback = callback || utils.noop;
  if (!this.connected && !this.isSocketOpen) {
    return callback();
  }
  this.connected = false;
  // Drain is never going to be emitted, once it is set to closed
  this.removeAllListeners('drain');
  this.clearAndInvokePending();
  if (!this.isSocketOpen) {
    return callback();
  }
  // Set the socket as closed now (before socket.end() is called) to avoid being invoked more than once
  this.isSocketOpen = false;
  this.log('verbose', 'Closing connection to ' + this.endpoint);
  var self = this;
  this.netClient.once('close', function (hadError) {
    if (hadError) {
      self.log('info', 'The socket closed with a transmission error');
    }
    setImmediate(callback);
  });
  // Prevent 'error' listener to be executed before 'close' listener
  this.netClient.removeAllListeners('error');
  // Add a noop handler for 'error' event to prevent Socket to throw the error
  this.netClient.on('error', utils.noop);
  // Half-close the socket, it will result in 'close' event being fired
  this.netClient.end();
};

module.exports = Connection;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var stream = __webpack_require__(13);
var Transform = stream.Transform;
var Writable = stream.Writable;

var types = __webpack_require__(2);
var utils = __webpack_require__(1);
var errors = __webpack_require__(3);
var FrameHeader = types.FrameHeader;
var FrameReader = __webpack_require__(50).FrameReader;

/**
 * Transforms chunks, emits data objects {header, chunk}
 * @param options Stream options
 * @extends Transform
 */
function Protocol (options) {
  Transform.call(this, options);
  this.header = null;
  this.bodyLength = 0;
  this.clearHeaderChunks();
  this.version = 0;
  this.headerSize = 0;
}

util.inherits(Protocol, Transform);

Protocol.prototype._transform = function (chunk, encoding, callback) {
  var error = null;
  try {
    this.readItems(chunk);
  }
  catch (err) {
    error = err;
  }
  callback(error);
};

/**
 * Parses the chunk into frames (header and body).
 * Emits (push) complete frames or frames with incomplete bodies. Following chunks containing the rest of the body will
 * be emitted using the same frame.
 * It buffers incomplete headers.
 * @param {Buffer} chunk
 */
Protocol.prototype.readItems = function (chunk) {
  if (!chunk || chunk.length === 0) {
    return;
  }
  if (this.version === 0) {
    //The server replies the first message with the max protocol version supported
    this.version = FrameHeader.getProtocolVersion(chunk);
    this.headerSize = FrameHeader.size(this.version);
  }
  var offset = 0;
  var currentHeader = this.header;
  this.header = null;
  if (this.headerChunks.byteLength !== 0) {
    //incomplete header was buffered try to read the header from the buffered chunks
    this.headerChunks.parts.push(chunk);
    if (this.headerChunks.byteLength + chunk.length < this.headerSize) {
      this.headerChunks.byteLength += chunk.length;
      return;
    }
    currentHeader = FrameHeader.fromBuffer(Buffer.concat(this.headerChunks.parts, this.headerSize));
    offset = this.headerSize - this.headerChunks.byteLength;
    this.clearHeaderChunks();
  }
  var items = [];
  while (true) {
    if (!currentHeader) {
      if (this.headerSize > chunk.length - offset) {
        if (chunk.length - offset <= 0) {
          break;
        }
        //the header is incomplete, buffer it until the next chunk
        var headerPart = chunk.slice(offset, chunk.length);
        this.headerChunks.parts.push(headerPart);
        this.headerChunks.byteLength = headerPart.length;
        break;
      }
      //read header
      currentHeader = FrameHeader.fromBuffer(chunk, offset);
      offset += this.headerSize;
    }
    //parse body
    var remaining = chunk.length - offset;
    if (currentHeader.bodyLength <= remaining + this.bodyLength) {
      items.push({ header: currentHeader, chunk: chunk, offset: offset, frameEnded: true });
      offset += currentHeader.bodyLength - this.bodyLength;
      //reset the body length
      this.bodyLength = 0;
    }
    else if (remaining >= 0) {
      //the body is not fully contained in this chunk
      //will continue later
      this.header = currentHeader;
      this.bodyLength += remaining;
      if (remaining > 0) {
        //emit if there is at least a byte to emit
        items.push({ header: currentHeader, chunk: chunk, offset: offset, frameEnded: false });
      }
      break;
    }
    currentHeader = null;
  }
  for (var i = 0; i < items.length; i++) {
    this.push(items[i]);
  }
};

Protocol.prototype.clearHeaderChunks = function () {
  this.headerChunks = { byteLength: 0, parts: [] };
};

/**
 * A stream that gets reads header + body chunks and transforms them into header + (row | error)
 * @param {Object} streamOptions Node.js Stream options
 * @param {Encoder} encoder Encoder instance for the parser to use
 * @extends Transform
 */
function Parser (streamOptions, encoder) {
  Transform.call(this, streamOptions);
  //frames that are streaming, indexed by id
  this.frames = {};
  this.encoder = encoder;
}

util.inherits(Parser, Transform);

Parser.prototype._transform = function (item, encoding, callback) {
  var frameInfo = this.frameState(item);

  var error = null;
  try {
    this.parseBody(frameInfo, item);
  }
  catch (err) {
    error = err;
  }
  callback(error);

  if (item.frameEnded) {
    if (frameInfo.cellBuffer) {
      //Frame was being streamed but an error force it to buffer the result
      this.push({
        header: frameInfo.header,
        error: new errors.DriverInternalError('There was an problem while parsing streaming frame, opcode ' +
          frameInfo.header.opcode)
      });
    }
    //all the parsing finished and it was streamed down
    //emit an item that signals it
    this.push({ header: frameInfo.header, frameEnded: true});
  }
};

/**
 * @param frameInfo
 * @param {{header: FrameHeader, chunk: Buffer, offset: Number}} item
 */
Parser.prototype.parseBody = function (frameInfo, item) {
  frameInfo.isStreaming = frameInfo.byRow && item.header.opcode === types.opcodes.result;
  if (!this.handleFrameBuffers(frameInfo, item)) {
    // Frame isn't complete and we are not streaming the frame
    return;
  }
  var reader = new FrameReader(item.header, item.chunk, item.offset);
  // Check that flags have not been parsed yet for this frame
  if (frameInfo.flagsInfo === undefined) {
    var originalOffset = reader.offset;
    try {
      frameInfo.flagsInfo = reader.readFlagsInfo();
    }
    catch (e) {
      return this.handleParsingError(e, frameInfo, reader, originalOffset);
    }
  }

  //All the body for most operations is already buffered at this stage
  //Except for RESULT
  switch (item.header.opcode) {
    case types.opcodes.result:
      return this.parseResult(frameInfo, reader);
    case types.opcodes.ready:
    case types.opcodes.authSuccess:
      return this.push({ header: frameInfo.header, ready: true });
    case types.opcodes.authChallenge:
      return this.push({ header: frameInfo.header, authChallenge: true, token: reader.readBytes()});
    case types.opcodes.authenticate:
      return this.push({ header: frameInfo.header, mustAuthenticate: true, authenticatorName: reader.readString()});
    case types.opcodes.error:
      return this.push({ header: frameInfo.header, error: reader.readError()});
    case types.opcodes.supported:
      return this.push({ header: frameInfo.header });
    case types.opcodes.event:
      return this.push({ header: frameInfo.header, event: reader.readEvent()});
    default:
      return this.push({ header: frameInfo.header, error: new Error('Received invalid opcode: ' + item.header.opcode) });
  }
};

/**
 * Buffers if needed and returns true if it has all the necessary data to continue parsing the frame.
 * @param frameInfo
 * @param {{header: FrameHeader, chunk: Buffer, offset: Number}} item
 * @returns {Boolean}
 */
Parser.prototype.handleFrameBuffers = function (frameInfo, item) {
  if (!frameInfo.isStreaming) {
    // Handle buffering for complete frame bodies
    var currentLength = (frameInfo.bufferLength || 0) + item.chunk.length - item.offset;
    if (currentLength < item.header.bodyLength) {
      //buffer until the frame is completed
      this.addFrameBuffer(frameInfo, item);
      return false;
    }
    //We have received the full frame body
    if (frameInfo.buffers) {
      item.chunk = this.getFrameBuffer(frameInfo, item);
      item.offset = 0;
    }
    return true;
  }
  if (frameInfo.cellBuffer) {
    // Handle buffering for frame cells (row cells or metadata cells)
    if (item.offset !== 0) {
      throw new errors.DriverInternalError('Following chunks can not have an offset greater than zero');
    }
    frameInfo.cellBuffer.parts.push(item.chunk);
    if (!frameInfo.cellBuffer.expectedLength) {
      //Its a buffer outside a row cell (metadata or other)
      if (frameInfo.cellBuffer.parts.length !== 2) {
        throw new errors.DriverInternalError('Buffer for streaming frame can not contain more than 1 item');
      }
      item.chunk = Buffer.concat(frameInfo.cellBuffer.parts, frameInfo.cellBuffer.byteLength + item.chunk.length);
      frameInfo.cellBuffer = null;
      return true;
    }
    if (frameInfo.cellBuffer.expectedLength > frameInfo.cellBuffer.byteLength + item.chunk.length) {
      //We still haven't got the cell data
      frameInfo.cellBuffer.byteLength += item.chunk.length;
      return false;
    }
    item.chunk = Buffer.concat(frameInfo.cellBuffer.parts, frameInfo.cellBuffer.byteLength + item.chunk.length);
    frameInfo.cellBuffer = null;
  }
  return true;
};

/**
 * Adds this chunk to the frame buffers.
 * @param frameInfo
 * @param {{header: FrameHeader, chunk: Buffer, offset: Number}} item
 */
Parser.prototype.addFrameBuffer = function (frameInfo, item) {
  if (!frameInfo.buffers) {
    frameInfo.buffers = [ item.chunk.slice(item.offset) ];
    frameInfo.bufferLength = item.chunk.length - item.offset;
    return;
  }
  if (item.offset > 0) {
    throw new errors.DriverInternalError('Following chunks can not have an offset greater than zero');
  }
  frameInfo.buffers.push(item.chunk);
  frameInfo.bufferLength += item.chunk.length;
};

/**
 * Adds the last chunk and concatenates the frame buffers
 * @param frameInfo
 * @param {{header: FrameHeader, chunk: Buffer, offset: Number}} item
 */
Parser.prototype.getFrameBuffer = function (frameInfo, item) {
  frameInfo.buffers.push(item.chunk);
  var result = Buffer.concat(frameInfo.buffers, frameInfo.bodyLength);
  frameInfo.buffers = null;
  return result;
};

/**
 * Tries to read the result in the body of a message
 * @param frameInfo Frame information, header / metadata
 * @param {FrameReader} reader
 */
Parser.prototype.parseResult = function (frameInfo, reader) {
  var result;
  // As we might be streaming and the frame buffer might not be complete,
  // read the metadata and different types of result values in a try-catch.
  // Store the reader position
  var originalOffset = reader.offset;
  try {
    if (!frameInfo.meta) {
      frameInfo.kind = reader.readInt();
      // Spec 4.2.5
      switch (frameInfo.kind) {
        case types.resultKind.voidResult:
          result = { header: frameInfo.header, flags: frameInfo.flagsInfo };
          break;
        case types.resultKind.rows:
          // Parse the rows metadata, the rest of the response is going to be parsed afterwards
          frameInfo.meta = reader.readMetadata(frameInfo.kind);
          break;
        case types.resultKind.setKeyspace:
          result = { header: frameInfo.header, keyspaceSet: reader.readString(), flags: frameInfo.flagsInfo };
          break;
        case types.resultKind.prepared:
          var preparedId = utils.copyBuffer(reader.readShortBytes());
          frameInfo.meta = reader.readMetadata(frameInfo.kind);
          result = { header: frameInfo.header, id: preparedId, meta: frameInfo.meta, flags: frameInfo.flagsInfo };
          break;
        case types.resultKind.schemaChange:
          result = { header: frameInfo.header, schemaChange: reader.parseSchemaChange(), flags: frameInfo.flagsInfo };
          break;
        default:
          //noinspection ExceptionCaughtLocallyJS
          throw errors.DriverInternalError('Unexpected result kind: ' + frameInfo.kind);
      }
    }
  }
  catch (e) {
    return this.handleParsingError(e, frameInfo, reader, originalOffset);
  }
  if (result) {
    if (frameInfo.emitted) {
      // It may contain additional metadata and info that it's not being parsed
      return;
    }
    frameInfo.emitted = true;
    return this.push(result);
  }
  // Its a `Rows` result
  if (reader.remainingLength() > 0) {
    this.parseRows(frameInfo, reader);
  }
};

/**
 * @param frameInfo
 * @param {FrameReader} reader
 */
Parser.prototype.parseRows = function (frameInfo, reader) {
  if (frameInfo.parsingError) {
    //No more processing on this frame
    return;
  }
  if (frameInfo.rowLength === undefined) {
    try {
      frameInfo.rowLength = reader.readInt();
    }
    catch (e) {
      return this.handleParsingError(e, frameInfo, reader);
    }
  }
  if (frameInfo.rowLength === 0) {
    return this.push({
      header: frameInfo.header,
      result: { rows: utils.emptyArray, meta: frameInfo.meta, flags: frameInfo.flagsInfo }
    });
  }
  var meta = frameInfo.meta;
  frameInfo.rowIndex = frameInfo.rowIndex || 0;
  for (var i = frameInfo.rowIndex; i < frameInfo.rowLength; i++) {
    var rowOffset = reader.offset;
    var row = new types.Row(meta.columns);
    var cellBuffer;
    for (var j = 0; j < meta.columns.length; j++ ) {
      var c = meta.columns[j];
      try {
        cellBuffer = reader.readBytes();
      }
      catch (e) {
        return this.handleParsingError(e, frameInfo, reader, rowOffset, i);
      }
      try {
        row[c.name] = this.encoder.decode(cellBuffer, c.type);
      }
      catch (e) {
        //Something went wrong while decoding, we are not going to be able to recover
        return this.handleParsingError(e, frameInfo, null);
      }
    }
    this.push({
      header: frameInfo.header,
      row: row,
      meta: frameInfo.meta,
      byRow: frameInfo.byRow,
      length: frameInfo.rowLength,
      flags: frameInfo.flagsInfo
    });
  }
};

/**
 * Sets parser options (ie: how to yield the results as they are parsed)
 * @param {Number} id Id of the stream
 * @param options
 */
Parser.prototype.setOptions = function (id, options) {
  if (this.frames[id.toString()]) {
    throw new types.DriverError('There was already state for this frame');
  }
  this.frames[id.toString()] = options;
};

/**
 * Gets the frame info from the internal state.
 * In case it is not there, it creates it.
 * In case the frame ended
 */
Parser.prototype.frameState = function (item) {
  var frameInfo = this.frames[item.header.streamId];
  if (!frameInfo) {
    frameInfo = {};
    if (!item.frameEnded) {
      //store it in the frames
      this.frames[item.header.streamId] = frameInfo;
    }
  }
  else if (item.frameEnded) {
    //if it was already stored, remove it
    delete this.frames[item.header.streamId];
  }
  frameInfo.header = item.header;
  return frameInfo;
};

/**
 * Handles parsing error: pushing an error if its unexpected or buffer the cell if its streaming
 * @param {Error} e
 * @param frameInfo
 * @param {FrameReader} reader
 * @param {Number} [originalOffset]
 * @param {Number} [rowIndex]
 */
Parser.prototype.handleParsingError = function (e, frameInfo, reader, originalOffset, rowIndex) {
  if (reader && frameInfo.isStreaming && (e instanceof RangeError)) {
    //A controlled error, buffer from offset and move on
    return this.bufferResultCell(frameInfo, reader, originalOffset, rowIndex, e.expectedLength);
  }
  frameInfo.parsingError = true;
  frameInfo.cellBuffer = null;
  this.push({ header: frameInfo.header, error: e });
};

/**
 * When streaming, it buffers data since originalOffset.
 * @param frameInfo
 * @param {FrameReader} reader
 * @param {Number} [originalOffset]
 * @param {Number} [rowIndex]
 * @param {Number} [expectedLength]
 */
Parser.prototype.bufferResultCell = function (frameInfo, reader, originalOffset, rowIndex, expectedLength) {
  if (!originalOffset && originalOffset !== 0) {
    originalOffset = reader.offset;
  }
  frameInfo.rowIndex = rowIndex;
  var buffer = reader.slice(originalOffset);
  frameInfo.cellBuffer = {
    parts: [ buffer ],
    byteLength: buffer.length,
    expectedLength: expectedLength
  };
};

/**
 * Represents a writable streams that emits results
 */
function ResultEmitter(options) {
  Writable.call(this, options);
  /**
   * Stores the rows for frames that needs to be yielded as one result with many rows
   */
  this.rowBuffer = {};
}

util.inherits(ResultEmitter, Writable);

ResultEmitter.prototype._write = function (item, encoding, callback) {
  var error = null;
  try {
    this.each(item);
  }
  catch (err) {
    error = err;
  }
  callback(error);
};


/**
 * Analyzes the item and emit the corresponding event
 */
ResultEmitter.prototype.each = function (item) {
  if (item.error || item.result) {
    //Its either an error or an empty array rows
    //no transformation needs to be made
    return this.emit('result', item.header, item.error, item.result);
  }
  if (item.frameEnded) {
    return this.emit('frameEnded', item.header);
  }
  if (item.byRow) {
    //it should be yielded by row
    return this.emit('row', item.header, item.row, item.meta, item.length, item.flags);
  }
  if (item.row) {
    //it should be yielded as a result
    //it needs to be buffered to an array of rows
    return this.bufferAndEmit(item);
  }
  if (item.event) {
    //its an event from Cassandra
    return this.emit('nodeEvent', item.header, item.event);
  }
  //its a raw response (object with flags)
  return this.emit('result', item.header, null, item);
};

/**
 * Buffers the rows until the result set is completed and emits the result event.
 */
ResultEmitter.prototype.bufferAndEmit = function (item) {
  var rows = this.rowBuffer[item.header.streamId];
  if (!rows) {
    rows = this.rowBuffer[item.header.streamId] = [];
  }
  rows.push(item.row);
  if (rows.length === item.length) {
    this.emit('result', item.header, null, { rows: rows, meta: item.meta, flags: item.flags});
    delete this.rowBuffer[item.header.streamId];
  }
};

exports.Protocol = Protocol;
exports.Parser = Parser;
exports.ResultEmitter = ResultEmitter;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var types = __webpack_require__(2);
var errors = __webpack_require__(3);

/**
 * Information on the formatting of the returned rows
 */
var resultFlag = {
  globalTablesSpec:   0x0001,
  hasMorePages:       0x0002,
  noMetadata:         0x0004
};

/**
 * Buffer forward reader of CQL binary frames
 * @param {FrameHeader} header
 * @param {Buffer} body
 * @param {Number} [offset]
 */
function FrameReader(header, body, offset) {
  this.header = header;
  this.opcode = header.opcode;
  this.offset = offset || 0;
  this.buf = body;
}

FrameReader.prototype.remainingLength = function () {
  return this.buf.length - this.offset;
};

FrameReader.prototype.getBuffer = function () {
  return this.buf;
};

/**
 * Slices the underlining buffer
 * @param {Number} begin
 * @param {Number} [end]
 * @returns {Buffer}
 */
FrameReader.prototype.slice = function (begin, end) {
  if (typeof end === 'undefined') {
    end = this.buf.length;
  }
  return this.buf.slice(begin, end);
};

/**
 * Modifies the underlying buffer, it concatenates the given buffer with the original (internalBuffer = concat(bytes, internalBuffer)
 */
FrameReader.prototype.unshift = function (bytes) {
  if (this.offset > 0) {
    throw new Error('Can not modify the underlying buffer if already read');
  }
  this.buf = Buffer.concat([bytes, this.buf], bytes.length + this.buf.length);
};

/**
 * Reads any number of bytes and moves the offset.
 * if length not provided or it's larger than the remaining bytes, reads to end.
 * @param length
 * @returns {Buffer}
 */
FrameReader.prototype.read = function (length) {
  var end = this.buf.length;
  if (typeof length !== 'undefined' && this.offset + length < this.buf.length) {
    end = this.offset + length;
  }
  var bytes = this.slice(this.offset, end);
  this.offset = end;
  return bytes;
};

/**
 * Moves the reader cursor to the end
 */
FrameReader.prototype.toEnd = function () {
  this.offset = this.buf.length;
};

/**
 * Reads a BE Int and moves the offset
 * @returns {Number}
 */
FrameReader.prototype.readInt = function() {
  var result = this.buf.readInt32BE(this.offset);
  this.offset += 4;
  return result;
};

/** @returns {Number} */
FrameReader.prototype.readShort = function () {
  var result = this.buf.readUInt16BE(this.offset);
  this.offset += 2;
  return result;
};

FrameReader.prototype.readByte = function () {
  var result = this.buf.readUInt8(this.offset);
  this.offset += 1;
  return result;
};

FrameReader.prototype.readString = function () {
  var length = this.readShort();
  this.checkOffset(length);
  var result = this.buf.toString('utf8', this.offset, this.offset+length);
  this.offset += length;
  return result;
};

/**
 * Checks that the new length to read is within the range of the buffer length. Throws a RangeError if not.
 * @param {Number} newLength
 */
FrameReader.prototype.checkOffset = function (newLength) {
  if (this.offset + newLength > this.buf.length) {
    var err = new RangeError('Trying to access beyond buffer length');
    err.expectedLength = newLength;
    throw err;
  }
};

/**
 * Reads a protocol string list
 * @returns {Array}
 */
FrameReader.prototype.readStringList = function () {
  var length = this.readShort();
  var list = new Array(length);
  for (var i = 0; i < length; i++) {
    list[i] = this.readString();
  }
  return list;
};

/**
 * Reads the amount of bytes that the field has and returns them (slicing them).
 * @returns {Buffer}
 */
FrameReader.prototype.readBytes = function () {
  var length = this.readInt();
  if (length < 0) {
    return null;
  }
  this.checkOffset(length);
  return this.read(length);
};

FrameReader.prototype.readShortBytes = function () {
  var length = this.readShort();
  if (length < 0) {
    return null;
  }
  this.checkOffset(length);
  return this.read(length);
};

/**
 * Reads an associative array of strings as keys and bytes as values
 * @returns {Object}
 */
FrameReader.prototype.readBytesMap = function () {
  //A [short] n, followed by n pair <k><v> where <k> is a
  //[string] and <v> is a [bytes].
  var length = this.readShort();
  if (length < 0) {
    return null;
  }
  var map = {};
  for (var i = 0; i < length; i++) {
    map[this.readString()] = this.readBytes();
  }
  return map;
};

/**
 * Reads a data type definition
 * @returns {{code: Number, info: Object|null}} An array of 2 elements
 */
FrameReader.prototype.readType = function () {
  var i;
  var type = {
    code: this.readShort(),
    type: null
  };
  switch (type.code) {
    case types.dataTypes.custom:
      type.info = this.readString();
      break;
    case types.dataTypes.list:
    case types.dataTypes.set:
      type.info = this.readType();
      break;
    case types.dataTypes.map:
      type.info = [this.readType(), this.readType()];
      break;
    case types.dataTypes.udt:
      type.info = {
        keyspace: this.readString(),
        name: this.readString(),
        fields: new Array(this.readShort())
      };
      for (i = 0; i < type.info.fields.length; i++) {
        type.info.fields[i] = {
          name: this.readString(),
          type: this.readType()
        };
      }
      break;
    case types.dataTypes.tuple:
      type.info = new Array(this.readShort());
      for (i = 0; i < type.info.length; i++) {
        type.info[i] = this.readType();
      }
      break;
  }
  return type;
};

/**
 * Reads an Ip address and port
 * @returns {{address: exports.InetAddress, port: Number}}
 */
FrameReader.prototype.readInet = function () {
  var length = this.readByte();
  var address = this.read(length);
  return {address: new types.InetAddress(address), port: this.readInt()};
};

/**
 * Reads the body bytes corresponding to the flags
 * @returns {{traceId: Uuid, warnings: Array, customPayload}}
 * @throws {RangeError}
 */
FrameReader.prototype.readFlagsInfo = function () {
  if (this.header.flags === 0) {
    return utils.emptyObject;
  }
  var result = {};
  if (this.header.flags & types.frameFlags.tracing) {
    this.checkOffset(16);
    result.traceId = new types.Uuid(utils.copyBuffer(this.read(16)));
  }
  if (this.header.flags & types.frameFlags.warning) {
    result.warnings = this.readStringList();
  }
  if (this.header.flags & types.frameFlags.customPayload) {
    result.customPayload = this.readBytesMap();
  }
  return result;
};

/**
 * Reads the metadata from a row or a prepared result response
 * @param {Number} kind
 * @returns {Object}
 * @throws {RangeError}
 */
FrameReader.prototype.readMetadata = function (kind) {
  var i;
  //Determines if its a prepared metadata
  var isPrepared = (kind === types.resultKind.prepared);
  var meta = {};
  //as used in Rows and Prepared responses
  var flags = this.readInt();

  var columnLength = this.readInt();
  if (types.protocolVersion.supportsPreparedPartitionKey(this.header.version) && isPrepared) {
    //read the pk columns
    meta.partitionKeys = new Array(this.readInt());
    for (i = 0; i < meta.partitionKeys.length; i++) {
      meta.partitionKeys[i] = this.readShort();
    }
  }
  if (flags & resultFlag.hasMorePages) {
    meta.pageState = utils.copyBuffer(this.readBytes());
  }
  if (flags & resultFlag.globalTablesSpec) {
    meta.global_tables_spec = true;
    meta.keyspace = this.readString();
    meta.table = this.readString();
  }
  meta.columns = new Array(columnLength);
  meta.columnsByName = utils.emptyObject;
  if (isPrepared) {
    //for prepared metadata, we will need a index of the columns (param) by name
    meta.columnsByName = {};
  }
  for (i = 0; i < columnLength; i++) {
    var col = {};
    if(!meta.global_tables_spec) {
      col.ksname = this.readString();
      col.tablename = this.readString();
    }
    col.name = this.readString();
    col.type = this.readType();
    meta.columns[i] = col;
    if (isPrepared) {
      meta.columnsByName[col.name] = i;
    }
  }

  return meta;
};

/**
 * Reads the error from the frame
 * @throws {RangeError}
 * @returns {exports.ResponseError}
 */
FrameReader.prototype.readError = function () {
  var code = this.readInt();
  var message = this.readString();
  var err = new errors.ResponseError(code, message);
  //read extra info
  switch (code) {
    case types.responseErrorCodes.unavailableException:
      err.consistencies = this.readShort();
      err.required = this.readInt();
      err.alive = this.readInt();
      break;
    case types.responseErrorCodes.readTimeout:
    case types.responseErrorCodes.readFailure:
      err.consistencies = this.readShort();
      err.received = this.readInt();
      err.blockFor = this.readInt();
      if (code === types.responseErrorCodes.readFailure) {
        err.failures = this.readInt();
      }
      err.isDataPresent = this.readByte();
      break;
    case types.responseErrorCodes.writeTimeout:
    case types.responseErrorCodes.writeFailure:
      err.consistencies = this.readShort();
      err.received = this.readInt();
      err.blockFor = this.readInt();
      if (code === types.responseErrorCodes.writeFailure) {
        err.failures = this.readInt();
      }
      err.writeType = this.readString();
      break;
    case types.responseErrorCodes.unprepared:
      err.queryId = utils.copyBuffer(this.readShortBytes());
      break;
    case types.responseErrorCodes.functionFailure:
      err.keyspace = this.readString();
      err.functionName = this.readString();
      err.argTypes = this.readStringList();
      break;
  }
  return err;
};

/**
 * Reads an event from Cassandra and returns the detail
 * @returns {{eventType: String, inet: {address: Buffer, port: Number}}, *}
 */
FrameReader.prototype.readEvent = function () {
  var eventType = this.readString();
  switch (eventType) {
    case types.protocolEvents.topologyChange:
      return {
        added: this.readString() === 'NEW_NODE',
        inet: this.readInet(),
        eventType: eventType};
    case types.protocolEvents.statusChange:
      return {
        up: this.readString() === 'UP',
        inet: this.readInet(),
        eventType: eventType};
    case types.protocolEvents.schemaChange:
      return this.parseSchemaChange();
  }
  //Forward compatibility
  return { eventType: eventType};
};

FrameReader.prototype.parseSchemaChange = function () {
  var result;
  if (!types.protocolVersion.supportsSchemaChangeFullMetadata(this.header.version)) {
    //v1/v2: 3 strings, the table value can be empty
    result = {
      eventType: types.protocolEvents.schemaChange,
      schemaChangeType: this.readString(),
      keyspace: this.readString(),
      table: this.readString()
    };
    result.isKeyspace = !result.table;
    return result;
  }
  //v3+: 3 or 4 strings: change_type, target, keyspace and (table, type, functionName or aggregate)
  result = {
    eventType: types.protocolEvents.schemaChange,
    schemaChangeType: this.readString(),
    target: this.readString(),
    keyspace: this.readString(),
    table: null,
    udt: null,
    signature: null
  };
  result.isKeyspace = result.target === 'KEYSPACE';
  switch (result.target) {
    case 'TABLE':
      result.table = this.readString();
      break;
    case 'TYPE':
      result.udt = this.readString();
      break;
    case 'FUNCTION':
      result.functionName = this.readString();
      result.signature = this.readStringList();
      break;
    case 'AGGREGATE':
      result.aggregate = this.readString();
      result.signature = this.readStringList();
  }
  return result;
};

exports.FrameReader = FrameReader;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = __webpack_require__(2);

/**
 * Group size
 * @type {number}
 */
var groupSize = 128;
/**
 * Number used to right shift ids to allocate them into groups
 * @const
 * @type {number}
 */
var shiftToGroup = 7;
/**
 * Amount of groups that can be released per time
 * If it grows larger than 4 groups (128 * 4), groups can be released
 * @const
 * @type {number}
 */
var releasableSize = 4;
/**
 * 32K possible stream ids depending for protocol v3 and above
 * @const
 * @type {number}
 */
var maxGroupsFor2Bytes = 256;
/**
 * Delay used to check if groups can be released
 * @const
 * @type {number}
 */
var releaseDelay = 5000;
/**
 * Represents a queue of ids from 0 to maximum stream id supported by the protocol version.
 * Clients can dequeue a stream id using {@link StreamIdStack#shift()} and enqueue (release) using {@link StreamIdStack#push()}
 * @param {Number} version Protocol version
 * @constructor
 */
function StreamIdStack(version) {
  //Ecmascript Number is 64-bit double, it can be optimized by the engine into a 32-bit int, but nothing below that.
  //We try to allocate as few as possible in arrays of 128
  this.currentGroup = generateGroup(0);
  this.groupIndex = 0;
  this.groups = [this.currentGroup];
  this.releaseTimeout = null;
  this.setVersion(version);
  /**
   * Returns the amount of ids currently in use
   * @member {number}
   */
  this.inUse = 0;
}

/**
 * Sets the protocol version
 * @param {Number} version
 */
StreamIdStack.prototype.setVersion = function (version) {
  //128 or 32K stream ids depending on the protocol version
  this.maxGroups = types.protocolVersion.uses2BytesStreamIds(version) ? maxGroupsFor2Bytes : 1;
};

/**
 * Dequeues an id.
 * Similar to {@link Array#pop()}.
 * @returns {Number} Returns an id or null
 */
StreamIdStack.prototype.pop = function () {
  var id = this.currentGroup.pop();
  if (typeof id !== 'undefined') {
    this.inUse++;
    return id;
  }
  //try to use the following groups
  while (this.groupIndex < this.groups.length - 1) {
    //move to the following group
    this.currentGroup = this.groups[++this.groupIndex];
    //try dequeue
    id = this.currentGroup.pop();
    if (typeof id !== 'undefined') {
      this.inUse++;
      return id;
    }
  }
  return this._tryCreateGroup();
};
/**
 * Enqueue an id for future use.
 * Similar to {@link Array#push()}.
 * @param {Number} id
 */
StreamIdStack.prototype.push = function (id) {
  this.inUse--;
  var groupIndex = id >> shiftToGroup;
  var group = this.groups[groupIndex];
  group.push(id);
  if (groupIndex < this.groupIndex) {
    //Set the lower group to be used to dequeue from
    this.groupIndex = groupIndex;
    this.currentGroup = group;
  }
  this._tryIssueRelease();
};

/**
 * Clears all timers
 */
StreamIdStack.prototype.clear = function () {
  if (this.releaseTimeout) {
    clearTimeout(this.releaseTimeout);
    this.releaseTimeout = null;
  }
};

/**
 * Tries to create an additional group and returns a new id
 * @returns {Number} Returns a new id or null if it's not possible to create a new group
 * @private
 */
StreamIdStack.prototype._tryCreateGroup = function () {
  if (this.groups.length === this.maxGroups) {
    //we can have an additional group
    return null;
  }
  //Add a new group at the last position
  this.groupIndex = this.groups.length;
  //Using 128 * groupIndex as initial value
  this.currentGroup = generateGroup(this.groupIndex << shiftToGroup);
  this.groups.push(this.currentGroup);
  this.inUse++;
  return this.currentGroup.pop();
};

StreamIdStack.prototype._tryIssueRelease = function () {
  if (this.releaseTimeout || this.groups.length <= releasableSize) {
    //Nothing to release or a release delay has been issued
    return;
  }
  var self = this;
  this.releaseTimeout = setTimeout(function () {
    self._releaseGroups();
  }, releaseDelay);
};

StreamIdStack.prototype._releaseGroups = function () {
  var counter = 0;
  var index = this.groups.length - 1;
  //only release up to n groups (n = releasable size)
  //shrink back up to n groups not all the way up to 1
  while (counter++ < releasableSize && this.groups.length > releasableSize && index > this.groupIndex) {
    if (this.groups[index].length !== groupSize) {
      //the group is being used
      break;
    }
    this.groups.pop();
    index--;
  }
  this.releaseTimeout = null;
  //Issue next release if applies
  this._tryIssueRelease();
};

function generateGroup(initialValue) {
  var arr = new Array(groupSize);
  var upperBound = initialValue + groupSize - 1;
  for (var i = 0; i < groupSize; i++) {
    arr[i] = upperBound - i;
  }
  return arr;
}

module.exports = StreamIdStack;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var utils = __webpack_require__(1);
var errors = __webpack_require__(3);
var requests = __webpack_require__(5);
var ExecuteRequest = requests.ExecuteRequest;
var QueryRequest = requests.QueryRequest;

var state = {
  init: 0,
  completed: 1,
  timedOut: 2,
  cancelled: 3
};

/**
 * Maintains the state information of a request inside a Connection.
 * @param {Request} request
 * @param {QueryOptions} options
 * @param {Function} callback
 */
function OperationState(request, options, callback) {
  this.request = request;
  this._options = options;
  this._rowCallback = options && options.rowCallback;
  this._callback = callback;
  this._timeout = null;
  this._state = state.init;
  this._rowIndex = 0;
  /**
   * Stream id that is set right before being written.
   * @type {number}
   */
  this.streamId = -1;
}

/**
 * Marks the operation as cancelled, clearing all callbacks and timeouts.
 */
OperationState.prototype.cancel = function () {
  if (this._state !== state.init) {
    return;
  }
  if (this._timeout !== null) {
    clearTimeout(this._timeout);
  }
  this._state = state.cancelled;
  this._callback = utils.noop;
};

/**
 * Determines if the response is going to be yielded by row.
 * @return {boolean}
 */
OperationState.prototype.isByRow = function () {
  return this._rowCallback && (this.request instanceof ExecuteRequest || this.request instanceof QueryRequest);
};

/**
 * Creates the timeout for the request.
 * @param {Number} defaultReadTimeout
 * @param {String} address
 * @param {Function} onTimeout The callback to be invoked when it times out.
 * @param {Function} onResponse The callback to be invoked if a response is obtained after it timed out.
 */
OperationState.prototype.setRequestTimeout = function (defaultReadTimeout, address, onTimeout, onResponse) {
  if (this._state !== state.init) {
    // No need to set the timeout
    return;
  }
  var millis = (this._options && this._options.readTimeout !== undefined) ?
    this._options.readTimeout : defaultReadTimeout;
  if (!(millis > 0)) {
    // Read timeout disabled
    return;
  }
  var self = this;
  this._timeout = setTimeout(function requestTimedOut() {
    onTimeout();
    var message = util.format('The host %s did not reply before timeout %d ms', address, millis);
    self._markAsTimedOut(new errors.OperationTimedOutError(message), onResponse);
  }, millis);
};

OperationState.prototype.setResultRow = function (row, meta, rowLength, flags) {
  this._markAsCompleted();
  if (!this._rowCallback) {
    return this.setResult(new errors.DriverInternalError('RowCallback not found for streaming frame handler'));
  }
  this._rowCallback(this._rowIndex++, row, rowLength);
  if (this._rowIndex === rowLength) {
    this._swapCallbackAndInvoke(null, { rowLength: rowLength, meta: meta, flags: flags });
  }
};

/**
 * Marks the current operation as timed out.
 * @param {Error} err
 * @param {Function} onResponse
 * @private
 */
OperationState.prototype._markAsTimedOut = function (err, onResponse) {
  if (this._state !== state.init) {
    return;
  }
  this._state = state.timedOut;
  this._swapCallbackAndInvoke(err, null, onResponse);
};

OperationState.prototype._markAsCompleted = function () {
  if (this._state !== state.init) {
    return;
  }
  if (this._timeout !== null) {
    clearTimeout(this._timeout);
  }
  this._state = state.completed;
};

/**
 * Sets the result of this operation, declaring that no further input will be processed for this operation.
 * @param {Error} err
 * @param {Object} [result]
 */
OperationState.prototype.setResult = function (err, result) {
  this._markAsCompleted();
  this._swapCallbackAndInvoke(err, result);
};

OperationState.prototype._swapCallbackAndInvoke = function (err, result, newCallback) {
  var callback = this._callback;
  this._callback = newCallback || utils.noop;
  callback(err, result);
};

module.exports = OperationState;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var errors = __webpack_require__(3);
var requests = __webpack_require__(5);
var retry = __webpack_require__(14);
var types = __webpack_require__(2);
var utils = __webpack_require__(1);

var retryOnNextHostDecision = Object.freeze({
  decision: retry.RetryPolicy.retryDecision.retry,
  useCurrentHost: false,
  consistency: undefined
});

/**
 * Encapsulates a single flow of execution against a coordinator, handling individual retries and failover.
 * @param {RequestHandler} parent
 * @constructor
 */
function RequestExecution(parent) {
  this._parent = parent;
  /** @type {OperationState} */
  this._operation = null;
  this._host = null;
  this._cancelled = false;
  this._retryCount = 0;
  // The streamId information is not included in the request.
  // A pointer to the parent request can be used, except when changing the consistency level from the retry policy
  this._request = this._parent.request;
}

/**
 * Starts the execution by borrowing the next connection available using the query plan.
 * It invokes the callback when a connection is acquired, if any.
 * @param {Function} [getHostCallback] Callback to be invoked when a connection to a host was successfully acquired.
 */
RequestExecution.prototype.start = function (getHostCallback) {
  var self = this;
  getHostCallback = getHostCallback || utils.noop;
  this._parent.getNextConnection(function nextConnectionCallback(err, connection, host) {
    if (self._cancelled) {
      // No need to send the request or invoke any callback
      return;
    }
    if (err) {
      return self._parent.handleNoHostAvailable(err, self);
    }
    self._connection = connection;
    self._host = host;
    getHostCallback(host);
    if (self._retryCount === 0) {
      self._parent.speculativeExecutions++;
    }
    self._sendOnConnection();
  });
};

RequestExecution.prototype._sendOnConnection = function () {
  var self = this;
  this._operation =
    this._connection.sendStream(this._request, this._parent.requestOptions, function responseCb(err, response) {
      if (self._cancelled) {
        // Avoid handling the response / err
        return;
      }
      if (err) {
        return self._handleError(err);
      }
      var result = self._getResultSet(response);
      if (response.schemaChange) {
        return self._parent.client.handleSchemaAgreementAndRefresh(
          self._connection, response.schemaChange, function schemaCb(){
            if (self._cancelled) {
              // After the schema agreement method was started, this execution was cancelled
              return;
            }
            self._parent.setCompleted(null, result);
          });
      }
      if (response.keyspaceSet) {
        self._parent.client.keyspace = response.keyspaceSet;
      }
      self._parent.setCompleted(null, result);
    });
};

RequestExecution.prototype._getResultSet = function (response) {
  return new types.ResultSet(response, this._host.address, this._parent.triedHosts, this._parent.speculativeExecutions,
    this._request.consistency);
};

/**
 * Allows the handler to cancel the current request.
 * When the request has been already written, we can unset the callback and forget about it.
 */
RequestExecution.prototype.cancel = function () {
  this._cancelled = true;
  if (this._operation === null) {
    return;
  }
  this._operation.cancel();
};

/**
 * Determines if the current execution was cancelled.
 */
RequestExecution.prototype.wasCancelled = function () {
  return this._cancelled;
};

RequestExecution.prototype._handleError = function (err) {
  this._parent.triedHosts[this._host.address] = err;
  err['coordinator'] = this._host.address;
  if (err.code === types.responseErrorCodes.unprepared && (err instanceof errors.ResponseError)) {
    return this._prepareAndRetry(err.queryId);
  }
  var decisionInfo = this._getDecision(err);
  if (err.isSocketError) {
    this._host.removeFromPool(this._connection);
  }
  if (!decisionInfo || decisionInfo.decision === retry.RetryPolicy.retryDecision.rethrow) {
    if (this._request instanceof requests.QueryRequest || this._request instanceof requests.ExecuteRequest) {
      err['query'] = this._request.query;
    }
    return this._parent.setCompleted(err);
  }
  if (decisionInfo.decision === retry.RetryPolicy.retryDecision.ignore) {
    // Return an empty ResultSet
    return this._parent.setCompleted(null, this._getResultSet(utils.emptyObject));
  }
  return this._retry(decisionInfo.consistency, decisionInfo.useCurrentHost);
};

/**
 * Gets a decision whether or not to retry based on the error information.
 * @param {Error} err
 * @returns {{decision, useCurrentHost, consistency}}
 */
RequestExecution.prototype._getDecision = function (err) {
  var operationInfo = {
    query: this._request && this._request.query,
    options: this._parent.requestOptions,
    nbRetry: this._retryCount,
    // handler, request and retryOnTimeout properties are deprecated and should be removed in the next major version
    handler: this,
    request: this._request,
    retryOnTimeout: false
  };
  var self = this;
  function onRequestError() {
    return self._parent.retryPolicy.onRequestError(operationInfo, self._request.consistency, err);
  }
  if (err.isSocketError) {
    if (err.requestNotWritten) {
      // The request was definitely not applied, it's safe to retry
      return retryOnNextHostDecision;
    }
    return onRequestError();
  }
  if (err instanceof errors.OperationTimedOutError) {
    this._parent.log('warning', err.message);
    this._host.checkHealth(this._connection);
    operationInfo.retryOnTimeout = this._parent.requestOptions.retryOnTimeout !== false;
    return onRequestError();
  }
  if (err instanceof errors.ResponseError) {
    switch (err.code) {
      case types.responseErrorCodes.overloaded:
      case types.responseErrorCodes.isBootstrapping:
      case types.responseErrorCodes.truncateError:
        return onRequestError();
      case types.responseErrorCodes.unavailableException:
        return this._parent.retryPolicy.onUnavailable(operationInfo, err.consistencies, err.required, err.alive);
      case types.responseErrorCodes.readTimeout:
        return this._parent.retryPolicy.onReadTimeout(
          operationInfo, err.consistencies, err.received, err.blockFor, err.isDataPresent);
      case types.responseErrorCodes.writeTimeout:
        return this._parent.retryPolicy.onWriteTimeout(
          operationInfo, err.consistencies, err.received, err.blockFor, err.writeType);
    }
  }
  return { decision: retry.RetryPolicy.retryDecision.rethrow };
};

/**
 * @param {Number|undefined} consistency
 * @param {Boolean} useCurrentHost
 * @private
 */
RequestExecution.prototype._retry = function (consistency, useCurrentHost) {
  if (this._cancelled) {
    // No point in retrying
    return;
  }
  this._parent.log('info', 'Retrying request');
  this._retryCount++;
  if (typeof consistency === 'number' && this._request.consistency !== consistency) {
    this._request = this._request.clone();
    this._request.consistency = consistency;
  }
  if (useCurrentHost !== false) {
    // Use existing host (default)
    return this._sendOnConnection();
  }
  // Use the next host in the query plan to send the request
  this.start();
};



/**
 * Issues a PREPARE request on the current connection.
 * If there's a socket or timeout issue, it moves to next host and executes the original request.
 * @param {Buffer} queryId
 * @private
 */
RequestExecution.prototype._prepareAndRetry = function (queryId) {
  this._parent.log('info', util.format('Query 0x%s not prepared on host %s, preparing and retrying',
    queryId.toString('hex'), this._host.address));
  var info = this._parent.client.metadata.getPreparedById(queryId);
  if (!info) {
    return this._parent.setCompleted(
      new errors.DriverInternalError(util.format('Unprepared response invalid, id: %s', queryId.toString('hex'))));
  }
  if (info.keyspace && info.keyspace !== this._connection.keyspace) {
    return this._parent.setCompleted(
      new Error(util.format('Query was prepared on keyspace %s, can\'t execute it on %s (%s)',
        info.keyspace, this._connection.keyspace, info.query)));
  }
  var self = this;
  this._connection.prepareOnce(info.query, function (err) {
    if (err) {
      if (!err.isSocketError && err instanceof errors.OperationTimedOutError) {
        self._parent.log('warning', util.format('Unexpected error when re-preparing query on host %s'));
      }
      // There was a failure re-preparing on this connection.
      // Execute the original request on the next connection and forget about the PREPARE-UNPREPARE flow.
      return self._retry(undefined, false);
    }
    self._retry(undefined, true);
  });
};

module.exports = RequestExecution;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var types = __webpack_require__(2);
var utils = __webpack_require__(1);
var MutableLong = __webpack_require__(55);
var Integer = types.Integer;

// Murmur3 constants
//-0x783C846EEEBDAC2B
var mconst1 = new MutableLong(0x53d5, 0x1142, 0x7b91, 0x87c3);
//0x4cf5ad432745937f
var mconst2 = new MutableLong(0x937f, 0x2745, 0xad43, 0x4cf5);
var mlongFive = MutableLong.fromNumber(5);
//0xff51afd7ed558ccd
var mconst3 = new MutableLong(0x8ccd, 0xed55, 0xafd7, 0xff51);
//0xc4ceb9fe1a85ec53
var mconst4 = new MutableLong(0xec53, 0x1a85, 0xb9fe, 0xc4ce);
var mconst5 = MutableLong.fromNumber(0x52dce729);
var mconst6 = MutableLong.fromNumber(0x38495ab5);

/**
 * Represents a set of methods that are able to generate and parse tokens for the C* partitioner
 * @constructor
 */
function Tokenizer() {

}

//noinspection JSUnusedLocalSymbols
/**
 * Creates a token based on the Buffer value provided
 * @param {Buffer|Array} value
 */
Tokenizer.prototype.hash = function (value) {
  throw new Error('You must implement a hash function for the tokenizer');
};

//noinspection JSUnusedLocalSymbols
/**
 * Parses a token string and returns a representation of the token
 * @param {String} value
 */
Tokenizer.prototype.parse = function (value) {
  throw new Error('You must implement a parse function for the tokenizer');
};

/**
 * Returns 0 if the values are equal, 1 if val1 is greater then val2 and -1 if val2 is greater than val1
 * @param val1
 * @param val2
 * @returns {number}
 */
Tokenizer.prototype.compare = function (val1, val2) {
  if (val1 > val2) {
    return 1;
  }
  if (val1 < val2) {
    return -1;
  }
  return 0;
};

Tokenizer.prototype.stringify = function (value) {
  return value.toString();
};

/**
 * Uniformly distributes data across the cluster based on Cassandra flavored Murmur3 hashed values.
 * @constructor
 */
function Murmur3Tokenizer() {

}

util.inherits(Murmur3Tokenizer, Tokenizer);

Murmur3Tokenizer.prototype.hash = function hash(value) {
  // This is an adapted version of the MurmurHash.hash3_x64_128 from Cassandra used
  // for M3P. Compared to that methods, there's a few inlining of arguments and we
  // only return the first 64-bits of the result since that's all M3 partitioner uses.

  var data = value;
  var offset = 0;
  var length = data.length;

  var nblocks = length >> 4; // Process as 128-bit blocks.

  var h1 = new MutableLong();
  var h2 = new MutableLong();
  var k1 = new MutableLong();
  var k2 = new MutableLong();

  for (var i = 0; i < nblocks; i++) {
    k1 = this.getBlock(data, offset, i * 2);
    k2 = this.getBlock(data, offset, i * 2 + 1);

    k1.multiply(mconst1);
    this.rotl64(k1, 31);
    k1.multiply(mconst2);

    h1.xor(k1);
    this.rotl64(h1, 27);
    h1.add(h2);
    h1.multiply(mlongFive).add(mconst5);

    k2.multiply(mconst2);
    this.rotl64(k2, 33);
    k2.multiply(mconst1);
    h2.xor(k2);
    this.rotl64(h2, 31);
    h2.add(h1);
    h2.multiply(mlongFive).add(mconst6);
  }
  //----------
  // tail

  // Advance offset to the unprocessed tail of the data.
  offset += nblocks * 16;

  k1 = new MutableLong();
  k2 = new MutableLong();

  /* eslint-disable no-fallthrough */
  switch(length & 15) {
    case 15:
      k2.xor(fromSignedByte(data[offset+14]).shiftLeft(48));
    case 14:
      k2.xor(fromSignedByte(data[offset+13]).shiftLeft(40));
    case 13:
      k2.xor(fromSignedByte(data[offset+12]).shiftLeft(32));
    case 12:
      k2.xor(fromSignedByte(data[offset+12]).shiftLeft(24));
    case 11:
      k2.xor(fromSignedByte(data[offset+10]).shiftLeft(16));
    case 10:
      k2.xor(fromSignedByte(data[offset+9]).shiftLeft(8));
    case 9:
      k2.xor(fromSignedByte(data[offset+8]));
      k2.multiply(mconst2);
      this.rotl64(k2, 33);
      k2.multiply(mconst1);
      h2.xor(k2);
    case 8:
      k1.xor(fromSignedByte(data[offset+7]).shiftLeft(56));
    case 7:
      k1.xor(fromSignedByte(data[offset+6]).shiftLeft(48));
    case 6:
      k1.xor(fromSignedByte(data[offset+5]).shiftLeft(40));
    case 5:
      k1.xor(fromSignedByte(data[offset+4]).shiftLeft(32));
    case 4:
      k1.xor(fromSignedByte(data[offset+3]).shiftLeft(24));
    case 3:
      k1.xor(fromSignedByte(data[offset+2]).shiftLeft(16));
    case 2:
      k1.xor(fromSignedByte(data[offset+1]).shiftLeft(8));
    case 1:
      k1.xor(fromSignedByte(data[offset]));
      k1.multiply(mconst1);
      this.rotl64(k1,31);
      k1.multiply(mconst2);
      h1.xor(k1);
  }
  /* eslint-enable no-fallthrough */

  h1.xor(MutableLong.fromNumber(length));
  h2.xor(MutableLong.fromNumber(length));

  h1.add(h2);
  h2.add(h1);


  this.fmix(h1);
  this.fmix(h2);

  h1.add(h2);

  return h1;
};

/**
 * @param {Number} value
 * @return {MutableLong}
 */
function fromSignedByte(value) {
  if (value < 128) {
    return new MutableLong(value, 0, 0, 0);
  }
  return new MutableLong((value - 256) & 0xffff, 0xffff, 0xffff, 0xffff);
}

/**
 *
 * @param {Array<Number>} key
 * @param {Number} offset
 * @param {Number} index
 * @return {MutableLong}
 */
Murmur3Tokenizer.prototype.getBlock = function (key, offset, index) {
  var i8 = index << 3;
  var blockOffset = offset + i8;
  return new MutableLong(
    (key[blockOffset]) | (key[blockOffset + 1] << 8),
    (key[blockOffset + 2]) | (key[blockOffset + 3] << 8),
    (key[blockOffset + 4]) | (key[blockOffset + 5] << 8),
    (key[blockOffset + 6]) | (key[blockOffset + 7] << 8)
  );
};

/**
 * @param {MutableLong} v
 * @param {Number} n
 */
Murmur3Tokenizer.prototype.rotl64 = function (v, n) {
  var left = v.clone().shiftLeft(n);
  v.shiftRightUnsigned(64 - n).or(left);
};

/** @param {MutableLong} k */
Murmur3Tokenizer.prototype.fmix = function (k) {
  k.xor(new MutableLong(k.getUint16(2) >>> 1 | ((k.getUint16(3) << 15) & 0xffff), k.getUint16(3) >>> 1, 0, 0));
  k.multiply(mconst3);
  var other = new MutableLong(
    (k.getUint16(2) >>> 1) | ((k.getUint16(3) << 15) & 0xffff),
    k.getUint16(3) >>> 1,
    0,
    0
  );
  k.xor(other);
  k.multiply(mconst4);
  k.xor(new MutableLong(k.getUint16(2) >>> 1 | (k.getUint16(3) << 15 & 0xffff), k.getUint16(3) >>> 1, 0, 0));
};

/**
 * Parses a int64 decimal string representation into a MutableLong.
 * @param {String} value
 * @returns {MutableLong}
 */
Murmur3Tokenizer.prototype.parse = function (value) {
  return MutableLong.fromString(value);
};

/**
 * @param {MutableLong} val1
 * @param {MutableLong} val2
 * @returns {number}
 */
Murmur3Tokenizer.prototype.compare = function (val1, val2) {
  return val1.compare(val2);
};

/**
 * @param {MutableLong} value
 * @return {String}
 */
Murmur3Tokenizer.prototype.stringify = function (value) {
  // We need a way to uniquely represent a token, it doesn't have to be the decimal string representation
  // Using the uint16 avoids divisions and other expensive operations on the longs
  return value.getUint16(0) + ',' + value.getUint16(1) + ',' + value.getUint16(2) + ',' + value.getUint16(3);
};

/**
 * Uniformly distributes data across the cluster based on MD5 hash values.
 * @constructor
 */
function RandomTokenizer() {
  // eslint-disable-next-line
  this._crypto = __webpack_require__(8);
}

util.inherits(RandomTokenizer, Tokenizer);

/**
 * @param {Buffer|Array} value
 * @returns {Integer}
 */
RandomTokenizer.prototype.hash = function (value) {
  if (util.isArray(value)) {
    value = utils.allocBufferFromArray(value);
  }
  var hashedValue = this._crypto.createHash('md5').update(value).digest();
  return Integer.fromBuffer(hashedValue).abs();
};

/**
 * @returns {Integer}
 */
RandomTokenizer.prototype.parse = function (value) {
  return Integer.fromString(value);
};

/**
 * @param {Integer} val1
 * @param {Integer} val2
 * @returns {number}
 */
RandomTokenizer.prototype.compare = function (val1, val2) {
  return val1.compare(val2);
};

function ByteOrderedTokenizer() {

}

util.inherits(ByteOrderedTokenizer, Tokenizer);

/**
 * @param {Buffer|Array} value
 * @returns {Buffer}
 */
ByteOrderedTokenizer.prototype.hash = function (value) {
  return value;
};

ByteOrderedTokenizer.prototype.stringify = function (value) {
  return value.toString('hex');
};

ByteOrderedTokenizer.prototype.parse = function (value) {
  return utils.allocBufferFromString(value);
};

exports.Murmur3Tokenizer = Murmur3Tokenizer;
exports.RandomTokenizer = RandomTokenizer;
exports.ByteOrderedTokenizer = ByteOrderedTokenizer;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Long = __webpack_require__(6);

var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var one = new MutableLong(1, 0, 0, 0);

/**
 * Constructs a signed int64 representation.
 * @constructor
 * @ignore
 */
function MutableLong(b00, b16, b32, b48) {
  // Use an array of uint16
  this._arr = [ b00 & 0xffff, b16 & 0xffff, b32 & 0xffff, b48 & 0xffff ];
}

MutableLong.fromNumber = function fromNumber(value) {
  if (isNaN(value) || !isFinite(value)) {
    return new MutableLong();
  }
  if (value < 0) {
    return MutableLong.fromNumber(-value).negate();
  }
  var low32Bits = value % TWO_PWR_32_DBL;
  var high32Bits = value / TWO_PWR_32_DBL;
  return MutableLong.fromBits(low32Bits, high32Bits);
};

MutableLong.fromBits = function fromBits(low32Bits, high32Bits) {
  return new MutableLong(low32Bits, low32Bits >>> 16, high32Bits, high32Bits >>> 16);
};

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @param {String} str
 * @param {Number} [radix]
 * @return {MutableLong}
 */
MutableLong.fromString = function fromString(str, radix) {
  if (typeof str !== 'string') {
    throw new Error('String format is not valid: ' + str);
  }
  if (str.length === 0) {
    throw Error('number format error: empty string');
  }
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") {
    return new MutableLong();
  }
  radix = radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  var p;
  if ((p = str.indexOf('-')) > 0) {
    throw Error('number format error: interior "-" character: ' + str);
  }
  if (p === 0) {
    return MutableLong.fromString(str.substring(1), radix).negate();
  }

  // Do several (8) digits each time through the loop
  var radixToPower = MutableLong.fromNumber(Math.pow(radix, 8));

  var result = new MutableLong();
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i);
    var value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = MutableLong.fromNumber(Math.pow(radix, size));
      result.multiply(power).add(MutableLong.fromNumber(value));
      break;
    }
    result.multiply(radixToPower);
    result.add(MutableLong.fromNumber(value));
  }
  return result;
};

/**
 * Compares this value with the provided value.
 * @param {MutableLong} other
 * @return {number}
 */
MutableLong.prototype.compare = function (other) {
  var thisNeg = this.isNegative();
  var otherNeg = other.isNegative();
  if (thisNeg && !otherNeg) {
    return -1;
  }
  if (!thisNeg && otherNeg) {
    return 1;
  }
  // At this point the sign bits are the same
  return this._compareBits(other);
};

MutableLong.prototype._compareBits = function(other) {
  for (var i = 3; i >= 0; i--) {
    if (this._arr[i] > other._arr[i]) {
      return 1;
    }
    if (this._arr[i] < other._arr[i]) {
      return -1;
    }
  }
  return 0;
};

MutableLong.prototype.getUint16 = function (index) {
  return this._arr[index];
};

MutableLong.prototype.getLowBitsUnsigned = function () {
  return (this._arr[0] | ((this._arr[1] & 0xffff) << 16)) >>> 0;
};

MutableLong.prototype.getHighBitsUnsigned = function () {
  return (this._arr[2] | (this._arr[3] << 16)) >>> 0;
};

MutableLong.prototype.toNumber = function () {
  return (this._arr[3] << 16 | this._arr[2]) * TWO_PWR_32_DBL + ((this._arr[1] << 16 | this._arr[0]) >>> 0);
};

/**
 * Performs the bitwise NOT of this value.
 * @return {MutableLong}
 */
MutableLong.prototype.not = function () {
  this._arr[0] = ~this._arr[0] & 0xffff;
  this._arr[1] = ~this._arr[1] & 0xffff;
  this._arr[2] = ~this._arr[2] & 0xffff;
  this._arr[3] = ~this._arr[3] & 0xffff;
  return this;
};

MutableLong.prototype.add = function (addend) {
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += this._arr[0] + addend._arr[0];
  this._arr[0] = c00 & 0xffff;

  c16 += c00 >>> 16;
  c16 += this._arr[1] + addend._arr[1];
  this._arr[1] = c16 & 0xffff;

  c32 += c16 >>> 16;
  c32 += this._arr[2] + addend._arr[2];
  this._arr[2] = c32 & 0xffff;

  c48 += c32 >>> 16;
  c48 += this._arr[3] + addend._arr[3];
  this._arr[3] = c48 & 0xffff;
  return this;
};

MutableLong.prototype.shiftLeft = function (numBits) {
  if (numBits === 0) {
    return this;
  }
  if (numBits >= 64) {
    return this.toZero();
  }
  var remainingBits = numBits % 16;
  var pos = Math.floor(numBits / 16);
  if (pos > 0) {
    this._arr[3] = this._arr[3 - pos];
    this._arr[2] = pos > 2 ? 0 : this._arr[2 - pos];
    this._arr[1] = pos > 1 ? 0 : this._arr[0];
    this._arr[0] = 0;
  }
  if (remainingBits > 0) {
    // shift left within the int16 and the next one
    this._arr[3] = ((this._arr[3] << remainingBits) | (this._arr[2] >>> (16 - remainingBits))) & 0xffff;
    this._arr[2] = ((this._arr[2] << remainingBits) | (this._arr[1] >>> (16 - remainingBits))) & 0xffff;
    this._arr[1] = ((this._arr[1] << remainingBits) | (this._arr[0] >>> (16 - remainingBits))) & 0xffff;
    this._arr[0] = (this._arr[0] << remainingBits) & 0xffff;
  }
  return this;
};

MutableLong.prototype.shiftRightUnsigned = function (numBits) {
  if (numBits === 0) {
    return this;
  }
  if (numBits >= 64) {
    return this.toZero();
  }
  var remainingBits = numBits % 16;
  var pos = Math.floor(numBits / 16);
  if (pos > 0) {
    this._arr[0] = this._arr[pos];
    this._arr[1] = pos > 2 ? 0 : this._arr[1 + pos];
    this._arr[2] = pos > 1 ? 0 : this._arr[3];
    this._arr[3] = 0;
  }
  if (remainingBits > 0) {
    this._arr[0] = (this._arr[0] >>> remainingBits) | ((this._arr[1] << (16 - remainingBits)) & 0xffff);
    this._arr[1] = (this._arr[1] >>> remainingBits) | ((this._arr[2] << (16 - remainingBits)) & 0xffff);
    this._arr[2] = (this._arr[2] >>> remainingBits) | ((this._arr[3] << (16 - remainingBits)) & 0xffff);
    this._arr[3] = this._arr[3] >>> remainingBits;
  }
  return this;
};

MutableLong.prototype.or = function (other) {
  this._arr[0] |= other._arr[0];
  this._arr[1] |= other._arr[1];
  this._arr[2] |= other._arr[2];
  this._arr[3] |= other._arr[3];
  return this;
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {MutableLong} other
 * @returns {MutableLong} this instance.
 */
MutableLong.prototype.xor = function (other) {
  this._arr[0] ^= other._arr[0];
  this._arr[1] ^= other._arr[1];
  this._arr[2] ^= other._arr[2];
  this._arr[3] ^= other._arr[3];
  return this;
};

MutableLong.prototype.clone = function () {
  return new MutableLong(this._arr[0], this._arr[1], this._arr[2], this._arr[3]);
};

/**
 * Performs the product of this and the specified Long.
 * @param {MutableLong} multiplier
 * @returns {MutableLong} this instance.
 */
MutableLong.prototype.multiply = function multiply(multiplier) {
  if (this.isZero() || multiplier.isZero()) {
    return this.toZero();
  }
  if (this.isNegative()) {
    if (multiplier.isNegative()) {
      return this.negate().multiply(multiplier.clone().negate());
    }
    return this.negate().multiply(multiplier).negate();
  }
  else if (multiplier.isNegative()) {
    return this.multiply(multiplier.clone().negate()).negate();
  }
  // We can skip products that would overflow.
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += this._arr[0] * multiplier._arr[0];
  c16 += c00 >>> 16;

  c16 += this._arr[1] * multiplier._arr[0];
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c16 += this._arr[0] * multiplier._arr[1];
  c32 += c16 >>> 16;

  c32 += this._arr[2] * multiplier._arr[0];
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += this._arr[1] * multiplier._arr[1];
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += this._arr[0] * multiplier._arr[2];
  c48 += c32 >>> 16;
  c48 += this._arr[3] * multiplier._arr[0] + this._arr[2] * multiplier._arr[1] +
    this._arr[1] * multiplier._arr[2] + this._arr[0] * multiplier._arr[3];

  this._arr[0] = c00 & 0xffff;
  this._arr[1] = c16 & 0xffff;
  this._arr[2] = c32 & 0xffff;
  this._arr[3] = c48 & 0xffff;
  return this;
};

MutableLong.prototype.toZero = function () {
  this._arr[3] = this._arr[2] = this._arr[1] =this._arr[0] = 0;
  return this;
};

MutableLong.prototype.isZero = function () {
  return (this._arr[3] === 0 && this._arr[2] === 0 && this._arr[1] === 0 && this._arr[0] === 0);
};

MutableLong.prototype.isNegative = function () {
  // most significant bit turned on
  return (this._arr[3] & 0x8000) > 0;
};


/**
 * Negates this value.
 * @return {MutableLong}
 */
MutableLong.prototype.negate = function () {
  return this.not().add(one);
};

MutableLong.prototype.equals = function (other) {
  if (!(other instanceof MutableLong)) {
    return false;
  }
  return (
    this._arr[0] === other._arr[0] && this._arr[1] === other._arr[1] &&
    this._arr[2] === other._arr[2] && this._arr[3] === other._arr[3]);
};

MutableLong.prototype.toImmutable = function () {
  return Long.fromBits(this.getLowBitsUnsigned(), this.getHighBitsUnsigned(), false);
};

module.exports = MutableLong;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var events = __webpack_require__(4);
var types = __webpack_require__(2);
var utils = __webpack_require__(1);
var errors = __webpack_require__(3);
var TableMetadata = __webpack_require__(57);
var Aggregate = __webpack_require__(58);
var SchemaFunction = __webpack_require__(59);
var Index = __webpack_require__(60);
var MaterializedView = __webpack_require__(61);
/**
 * @module metadata/schemaParser
 * @ignore
 */

var _selectAllKeyspacesV1 = "SELECT * FROM system.schema_keyspaces";
var _selectSingleKeyspaceV1 = "SELECT * FROM system.schema_keyspaces where keyspace_name = '%s'";
var _selectAllKeyspacesV2 = "SELECT * FROM system_schema.keyspaces";
var _selectSingleKeyspaceV2 = "SELECT * FROM system_schema.keyspaces where keyspace_name = '%s'";
var _selectTableV1 = "SELECT * FROM system.schema_columnfamilies WHERE keyspace_name='%s' AND columnfamily_name='%s'";
var _selectTableV2 = "SELECT * FROM system_schema.tables WHERE keyspace_name='%s' AND table_name='%s'";
var _selectColumnsV1 = "SELECT * FROM system.schema_columns WHERE keyspace_name='%s' AND columnfamily_name='%s'";
var _selectColumnsV2 = "SELECT * FROM system_schema.columns WHERE keyspace_name='%s' AND table_name='%s'";
var _selectIndexesV2 = "SELECT * FROM system_schema.indexes WHERE keyspace_name='%s' AND table_name='%s'";
var _selectUdtV1 = "SELECT * FROM system.schema_usertypes WHERE keyspace_name='%s' AND type_name='%s'";
var _selectUdtV2 = "SELECT * FROM system_schema.types WHERE keyspace_name='%s' AND type_name='%s'";
var _selectFunctionsV1 = "SELECT * FROM system.schema_functions WHERE keyspace_name = '%s' AND function_name = '%s'";
var _selectFunctionsV2 = "SELECT * FROM system_schema.functions WHERE keyspace_name = '%s' AND function_name = '%s'";
var _selectAggregatesV1 = "SELECT * FROM system.schema_aggregates WHERE keyspace_name = '%s' AND aggregate_name = '%s'";
var _selectAggregatesV2 = "SELECT * FROM system_schema.aggregates WHERE keyspace_name = '%s' AND aggregate_name = '%s'";
var _selectMaterializedViewV2 = "SELECT * FROM system_schema.views WHERE keyspace_name = '%s' AND view_name = '%s'";

/**
 * @abstract
 * @param {ControlConnection} cc
 * @constructor
 * @ignore
 */
function SchemaParser(cc) {
  this.cc = cc;
  this.selectTable = null;
  this.selectColumns = null;
  this.selectIndexes = null;
  this.selectUdt = null;
  this.selectAggregates = null;
  this.selectFunctions = null;
}

/**
 * @param name
 * @param durableWrites
 * @param strategy
 * @param strategyOptions
 * @returns {{name, durableWrites, strategy, strategyOptions, tokenToReplica, udts, tables, functions, aggregates}|null}
 * @protected
 */
SchemaParser.prototype._createKeyspace = function (name, durableWrites, strategy, strategyOptions) {
  var ksInfo = {
    name: name,
    durableWrites: durableWrites,
    strategy: strategy,
    strategyOptions: strategyOptions,
    tokenToReplica: null,
    udts: {},
    tables: {},
    functions: {},
    aggregates: {},
    views: {}
  };
  ksInfo.tokenToReplica = getTokenToReplicaMapper(strategy, strategyOptions);
  return ksInfo;
};

/**
 * @abstract
 * @param {String} name
 * @param {Function} callback
 */
SchemaParser.prototype.getKeyspace = function (name, callback) {
};

/**
 * @abstract
 * @param {Boolean} waitReconnect
 * @param {Function} callback
 */
SchemaParser.prototype.getKeyspaces = function (waitReconnect, callback) {
};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Object} cache
 * @param {Function} callback
 */
SchemaParser.prototype.getTable = function (keyspaceName, name, cache, callback) {
  var tableInfo = cache && cache[name];
  if (!tableInfo) {
    tableInfo = new TableMetadata(name);
    if (cache) {
      cache[name] = tableInfo;
    }
  }
  if (tableInfo.loaded) {
    return callback(null, tableInfo);
  }
  tableInfo.once('load', callback);
  if (tableInfo.loading) {
    //It' already queued, it will be emitted
    return;
  }
  // its not cached and not being retrieved
  tableInfo.loading = true;
  var tableRow, columnRows, indexRows;
  var self = this;
  utils.series([
    function getTableRow(next) {
      var query = util.format(self.selectTable, keyspaceName, name);
      self.cc.query(query, function (err, response) {
        if (err) {
          return next(err);
        }
        tableRow = response.rows[0];
        next();
      });
    },
    function getColumnRows (next) {
      if (!tableRow) {
        return next(null, null, null);
      }
      var query = util.format(self.selectColumns, keyspaceName, name);
      self.cc.query(query, function (err, response) {
        if (err) {
          return next(err);
        }
        columnRows = response.rows;
        next();
      });
    },
    function getIndexes(next) {
      if (!tableRow || !self.selectIndexes) {
        //either the table does not exists or it does not support indexes schema table
        return next();
      }
      var query = util.format(self.selectIndexes, keyspaceName, name);
      self.cc.query(query, function (err, response) {
        if (err) {
          return next(err);
        }
        indexRows = response.rows;
        next();
      });
    }
  ], function afterQuery (err) {
    if (err || !tableRow) {
      tableInfo.loading = false;
      return tableInfo.emit('load', err, null);
    }
    self._parseTableOrView(tableInfo, tableRow, columnRows, indexRows, function (err) {
      tableInfo.loading = false;
      tableInfo.loaded = !err;
      tableInfo.emit('load', err, tableInfo);
    });
  });
};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Object} cache
 * @param {Function} callback
 */
SchemaParser.prototype.getUdt = function (keyspaceName, name, cache, callback) {
  var udtInfo = cache && cache[name];
  if (!udtInfo) {
    udtInfo = new events.EventEmitter();
    if (cache) {
      cache[name] = udtInfo;
    }
    udtInfo.setMaxListeners(0);
    udtInfo.loading = false;
    udtInfo.name = name;
    udtInfo.fields = null;
  }
  if (udtInfo.fields) {
    return callback(null, udtInfo);
  }
  udtInfo.once('load', callback);
  if (udtInfo.loading) {
    //It' already queued, it will be emitted
    return;
  }
  udtInfo.loading = true;
  //it is not cached, try to query for it
  var query = util.format(this.selectUdt, keyspaceName, name);
  var self = this;
  this.cc.query(query, function (err, response) {
    if (err) {
      return udtInfo.emit('load', err);
    }
    var row = response.rows[0];
    if (!row) {
      udtInfo.loading = false;
      return udtInfo.emit('load', null, null);
    }
    self._parseUdt(udtInfo, row, function (err) {
      udtInfo.loading = false;
      if (err) {
        return udtInfo.emit('load', err);
      }
      return udtInfo.emit('load', null, udtInfo);
    });
  });
};

/**
 * Parses the udt information from the row
 * @param udtInfo
 * @param {Row} row
 * @param {Function} callback Callback to be invoked with the err and {{fields: Array}}|null
 * @abstract
 */
SchemaParser.prototype._parseUdt = function (udtInfo, row, callback) {
};

//noinspection JSValidateJSDoc
/**
 * Builds the metadata based on the table and column rows
 * @abstract
 * @param {module:metadata~TableMetadata} tableInfo
 * @param {Row} tableRow
 * @param {Array.<Row>} columnRows
 * @param {Array.<Row>} indexRows
 * @param {Function} callback
 * @throws {Error}
 */
SchemaParser.prototype._parseTableOrView = function (tableInfo, tableRow, columnRows, indexRows, callback) {
};


/**
 * @abstract
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Object} cache
 * @param {Function} callback
 */
SchemaParser.prototype.getMaterializedView = function (keyspaceName, name, cache, callback) {

};

/**
 * @param {String} keyspaceName
 * @param {String} name
 * @param {Boolean} aggregate
 * @param {Object} cache
 * @param {Function} callback
 */
SchemaParser.prototype.getFunctions = function (keyspaceName, name, aggregate, cache, callback) {
  /** @type {String} */
  var query = this.selectFunctions;
  var parser = this._parseFunction.bind(this);
  if (aggregate) {
    query = this.selectAggregates;
    parser = this._parseAggregate.bind(this);
  }
  //if not already loaded
  //get all functions with that name
  //cache it by name and, within name, by signature
  var functionsInfo = cache && cache[name];
  if (!functionsInfo) {
    functionsInfo = new events.EventEmitter();
    if (cache) {
      cache[name] = functionsInfo;
    }
    functionsInfo.setMaxListeners(0);
  }
  if (functionsInfo.values) {
    return callback(null, functionsInfo.values);
  }
  functionsInfo.once('load', callback);
  if (functionsInfo.loading) {
    //It' already queued, it will be emitted
    return;
  }
  functionsInfo.loading = true;
  //it is not cached, try to query for it
  query = util.format(query, keyspaceName, name);
  this.cc.query(query, function (err, response) {
    functionsInfo.loading = false;
    if (err || response.rows.length === 0) {
      return functionsInfo.emit('load', err, null);
    }
    if (response.rows.length > 0) {
      functionsInfo.values = {};
    }
    utils.each(response.rows, function (row, next) {
      parser(row, function (err, func) {
        if (err) {
          return next(err);
        }
        functionsInfo.values['(' + func.signature.join(',') + ')'] = func;
        next();
      });
    }, function (err) {
      if (err) {
        return functionsInfo.emit('load', err);
      }
      functionsInfo.emit('load', null, functionsInfo.values);
    });
  });
};

/**
 * @abstract
 * @param {Row} row
 * @param {Function} callback
 */
SchemaParser.prototype._parseAggregate = function (row, callback) {
};

/**
 * @abstract
 * @param {Row} row
 * @param {Function} callback
 */
SchemaParser.prototype._parseFunction = function (row, callback) {
};

/**
 * Used to parse schema information for Cassandra versions 1.2.x, and 2.x
 * @param {ControlConnection} cc
 * @constructor
 * @ignore
 */
function SchemaParserV1(cc) {
  SchemaParser.call(this, cc);
  this.selectTable = _selectTableV1;
  this.selectColumns = _selectColumnsV1;
  this.selectUdt = _selectUdtV1;
  this.selectAggregates = _selectAggregatesV1;
  this.selectFunctions = _selectFunctionsV1;
}

util.inherits(SchemaParserV1, SchemaParser);

/** @override */
SchemaParserV1.prototype.getKeyspaces = function (waitReconnect, callback) {
  var self = this;
  var keyspaces = {};
  this.cc.query(_selectAllKeyspacesV1, waitReconnect, function (err, result) {
    if (err) {
      return callback(err);
    }
    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows[i];
      var ksInfo = self._createKeyspace(
        row['keyspace_name'],
        row['durable_writes'],
        row['strategy_class'],
        JSON.parse(row['strategy_options'] || null));
      keyspaces[ksInfo.name] = ksInfo;
    }
    callback(null, keyspaces);
  });
};

/** @override */
SchemaParserV1.prototype.getKeyspace = function (name, callback) {
  var self = this;
  this.cc.query(util.format(_selectSingleKeyspaceV1, name), function (err, result) {
    if (err) {
      return callback(err);
    }
    var row = result.rows[0];
    if (!row) {
      return callback(null, null);
    }
    callback(null, self._createKeyspace(
      row['keyspace_name'],
      row['durable_writes'],
      row['strategy_class'],
      JSON.parse(row['strategy_options'])));
  });
};

//noinspection JSUnusedLocalSymbols
/** @override */
SchemaParserV1.prototype._parseTableOrView = function (tableInfo, tableRow, columnRows, indexRows, callback) {
  var i, c, name, types;
  var encoder = this.cc.getEncoder();
  var columnsKeyed = {};
  var partitionKeys = [];
  var clusteringKeys = [];
  tableInfo.bloomFilterFalsePositiveChance = tableRow['bloom_filter_fp_chance'];
  tableInfo.caching = tableRow['caching'];
  tableInfo.comment = tableRow['comment'];
  tableInfo.compactionClass = tableRow['compaction_strategy_class'];
  tableInfo.compactionOptions = JSON.parse(tableRow['compaction_strategy_options']);
  tableInfo.compression = JSON.parse(tableRow['compression_parameters']);
  tableInfo.gcGraceSeconds = tableRow['gc_grace_seconds'];
  tableInfo.localReadRepairChance = tableRow['local_read_repair_chance'];
  tableInfo.readRepairChance = tableRow['read_repair_chance'];
  tableInfo.populateCacheOnFlush = tableRow['populate_io_cache_on_flush'] || tableInfo.populateCacheOnFlush;
  tableInfo.memtableFlushPeriod = tableRow['memtable_flush_period_in_ms'] || tableInfo.memtableFlushPeriod;
  tableInfo.defaultTtl = tableRow['default_time_to_live'] || tableInfo.defaultTtl;
  tableInfo.speculativeRetry = tableRow['speculative_retry'] || tableInfo.speculativeRetry;
  tableInfo.indexInterval = tableRow['index_interval'] || tableInfo.indexInterval;
  if (typeof tableRow['min_index_interval'] !== 'undefined') {
    //Cassandra 2.1+
    tableInfo.minIndexInterval = tableRow['min_index_interval'] || tableInfo.minIndexInterval;
    tableInfo.maxIndexInterval = tableRow['max_index_interval'] || tableInfo.maxIndexInterval;
  }
  else {
    //set to null
    tableInfo.minIndexInterval = null;
    tableInfo.maxIndexInterval = null;
  }
  if (typeof tableRow['replicate_on_write'] !== 'undefined') {
    //leave the default otherwise
    tableInfo.replicateOnWrite = tableRow['replicate_on_write'];
  }
  tableInfo.columns = [];
  try {
    (function parseColumns() {
      //function context
      for (i = 0; i < columnRows.length; i++) {
        var row = columnRows[i];
        var type = encoder.parseFqTypeName(row['validator']);
        c = {
          name: row['column_name'],
          type: type
        };
        tableInfo.columns.push(c);
        columnsKeyed[c.name] = c;
        switch (row['type']) {
          case 'partition_key':
            partitionKeys.push({c: c, index: (row['component_index'] || 0)});
            break;
          case 'clustering_key':
            clusteringKeys.push({
              c: c,
              index: (row['component_index'] || 0),
              order: c.type.options.reversed ? 'DESC' : 'ASC'
            });
            break;
        }
      }
    })();
    if (partitionKeys.length > 0) {
      tableInfo.partitionKeys = partitionKeys.sort(utils.propCompare('index')).map(function (item) {
        return item.c;
      });
      clusteringKeys.sort(utils.propCompare('index'));
      tableInfo.clusteringKeys = clusteringKeys.map(function (item) {
        return item.c;
      });
      tableInfo.clusteringOrder = clusteringKeys.map(function (item) {
        return item.order;
      });
    }
    //In C* 1.2, keys are not stored on the schema_columns table
    var keysStoredInTableRow = (tableInfo.partitionKeys.length === 0);
    if (keysStoredInTableRow && tableRow['key_aliases']) {
      //In C* 1.2, keys are not stored on the schema_columns table
      partitionKeys = JSON.parse(tableRow['key_aliases']);
      types = encoder.parseKeyTypes(tableRow['key_validator']).types;
      for (i = 0; i < partitionKeys.length; i++) {
        name = partitionKeys[i];
        c = columnsKeyed[name];
        if (!c) {
          c = {
            name: name,
            type: types[i]
          };
          tableInfo.columns.push(c);
        }
        tableInfo.partitionKeys.push(c);
      }
    }
    var comparator = encoder.parseKeyTypes(tableRow['comparator']);
    if (keysStoredInTableRow && tableRow['column_aliases']) {
      clusteringKeys = JSON.parse(tableRow['column_aliases']);
      for (i = 0; i < clusteringKeys.length; i++) {
        name = clusteringKeys[i];
        c = columnsKeyed[name];
        if (!c) {
          c = {
            name: name,
            type: comparator.types[i]
          };
          tableInfo.columns.push(c);
        }
        tableInfo.clusteringKeys.push(c);
        tableInfo.clusteringOrder.push(c.type.options.reversed ? 'DESC' : 'ASC');
      }
    }
    tableInfo.isCompact = !!tableRow['is_dense'];
    if (!tableInfo.isCompact) {
      //is_dense column does not exist in previous versions of Cassandra
      //also, compact pk, ck and val appear as is_dense false
      // clusteringKeys != comparator types - 1
      // or not composite (comparator)
      tableInfo.isCompact = (
        //clustering keys are not marked as composite
        !comparator.isComposite ||
        //only 1 column not part of the partition or clustering keys
        (!comparator.hasCollections && tableInfo.clusteringKeys.length !== comparator.types.length - 1)
      );
    }
    name = tableRow['value_alias'];
    if (tableInfo.isCompact && name && !columnsKeyed[name]) {
      //additional column in C* 1.2 as value_alias
      c = {
        name: name,
        type: encoder.parseFqTypeName(tableRow['default_validator'])
      };
      tableInfo.columns.push(c);
      columnsKeyed[name] = c;
    }
    tableInfo.columnsByName = columnsKeyed;
    tableInfo.indexes = Index.fromColumnRows(columnRows, tableInfo.columnsByName);
  }
  catch (err) {
    return callback(err);
  }
  //All the tableInfo parsing in V1 is sync, it uses a callback because the super defines one
  //to support other versions.
  callback();
};

/** @override */
SchemaParserV1.prototype.getMaterializedView = function (keyspaceName, name, cache, callback) {
  callback(new errors.NotSupportedError('Materialized views are not supported on Cassandra versions below 3.0'));
};

/** @override */
SchemaParserV1.prototype._parseAggregate = function (row, callback) {
  var encoder = this.cc.getEncoder();
  var aggregate = new Aggregate();
  aggregate.name = row['aggregate_name'];
  aggregate.keyspaceName = row['keyspace_name'];
  aggregate.signature = row['signature'] || utils.emptyArray;
  aggregate.stateFunction = row['state_func'];
  aggregate.finalFunction = row['final_func'];
  aggregate.initConditionRaw = row['initcond'];
  try {
    aggregate.argumentTypes = (row['argument_types'] || utils.emptyArray).map(function (name) {
      return encoder.parseFqTypeName(name);
    });
    aggregate.stateType = encoder.parseFqTypeName(row['state_type']);
    var initConditionValue = encoder.decode(aggregate.initConditionRaw, aggregate.stateType);
    if (initConditionValue !== null && typeof initConditionValue !== 'undefined') {
      aggregate.initCondition = initConditionValue.toString();
    }
    aggregate.returnType = encoder.parseFqTypeName(row['return_type']);
  }
  catch (err) {
    return callback(err);
  }
  callback(null, aggregate);
};

/** @override */
SchemaParserV1.prototype._parseFunction = function (row, callback) {
  var encoder = this.cc.getEncoder();
  var func = new SchemaFunction();
  func.name = row['function_name'];
  func.keyspaceName = row['keyspace_name'];
  func.signature = row['signature'] || utils.emptyArray;
  func.argumentNames = row['argument_names'] || utils.emptyArray;
  func.body = row['body'];
  func.calledOnNullInput = row['called_on_null_input'];
  func.language = row['language'];
  try {
    func.argumentTypes = (row['argument_types'] || utils.emptyArray).map(function (name) {
      return encoder.parseFqTypeName(name);
    });
    func.returnType = encoder.parseFqTypeName(row['return_type']);
  }
  catch (err) {
    return callback(err);
  }
  callback(null, func);
};

/** @override */
SchemaParserV1.prototype._parseUdt = function (udtInfo, row, callback) {
  var encoder = this.cc.getEncoder();
  var fieldNames = row['field_names'];
  var fieldTypes = row['field_types'];
  var fields = new Array(fieldNames.length);
  try {
    for (var i = 0; i < fieldNames.length; i++) {
      fields[i] = {
        name: fieldNames[i],
        type: encoder.parseFqTypeName(fieldTypes[i])
      };
    }
  }
  catch (err) {
    return callback(err);
  }
  udtInfo.fields = fields;
  callback(null, udtInfo);
};

/**
 * Used to parse schema information for Cassandra versions 3.x and above
 * @param {ControlConnection} cc The control connection to be used
 * @param {Function} udtResolver The function to be used to retrieve the udts.
 * @constructor
 * @ignore
 */
function SchemaParserV2(cc, udtResolver) {
  SchemaParser.call(this, cc);
  this.udtResolver = udtResolver;
  this.selectTable = _selectTableV2;
  this.selectColumns = _selectColumnsV2;
  this.selectUdt = _selectUdtV2;
  this.selectAggregates = _selectAggregatesV2;
  this.selectFunctions = _selectFunctionsV2;
  this.selectIndexes = _selectIndexesV2;
}

util.inherits(SchemaParserV2, SchemaParser);

/** @override */
SchemaParserV2.prototype.getKeyspaces = function (waitReconnect, callback) {
  var self = this;
  var keyspaces = {};
  this.cc.query(_selectAllKeyspacesV2, waitReconnect, function (err, result) {
    if (err) {
      return callback(err);
    }
    for (var i = 0; i < result.rows.length; i++) {
      var ksInfo = self._parseKeyspace(result.rows[i]);
      keyspaces[ksInfo.name] = ksInfo;
    }
    callback(null, keyspaces);
  });
};

/** @override */
SchemaParserV2.prototype.getKeyspace = function (name, callback) {
  var self = this;
  this.cc.query(util.format(_selectSingleKeyspaceV2, name), function (err, result) {
    if (err) {
      return callback(err);
    }
    var row = result.rows[0];
    if (!row) {
      return callback(null, null);
    }
    callback(null, self._parseKeyspace(row));
  });
};

/** @override */
SchemaParserV2.prototype.getMaterializedView = function (keyspaceName, name, cache, callback) {
  var viewInfo = cache && cache[name];
  if (!viewInfo) {
    viewInfo = new MaterializedView(name);
    if (cache) {
      cache[name] = viewInfo;
    }
  }
  if (viewInfo.loaded) {
    return callback(null, viewInfo);
  }
  viewInfo.once('load', callback);
  if (viewInfo.loading) {
    //It' already queued, it will be emitted
    return;
  }
  viewInfo.loading = true;
  var tableRow, columnRows;
  //it is not cached, try to query for it
  var self = this;
  utils.series([
    function getTableRow(next) {
      var query = util.format(_selectMaterializedViewV2, keyspaceName, name);
      self.cc.query(query, function (err, response) {
        if (err) {
          return next(err);
        }
        tableRow = response.rows[0];
        next();
      });
    },
    function getColumnRows (next) {
      if (!tableRow) {
        return next();
      }
      var query = util.format(self.selectColumns, keyspaceName, name);
      self.cc.query(query, function (err, response) {
        if (err) {
          return next(err);
        }
        columnRows = response.rows;
        next();
      });
    }
  ], function afterQuery (err) {
    viewInfo.loading = false;
    if (err || !tableRow) {
      return viewInfo.emit('load', err, null);
    }
    self._parseTableOrView(viewInfo, tableRow, columnRows, null, function (err) {
      viewInfo.loading = false;
      viewInfo.loaded = !err;
      viewInfo.emit('load', err, viewInfo);
    });
  });

};

SchemaParserV2.prototype._parseKeyspace = function (row) {
  var replication = row['replication'];
  var strategy;
  var strategyOptions;
  if (replication) {
    strategy = replication['class'];
    strategyOptions = {};
    for (var key in replication) {
      if (!replication.hasOwnProperty(key) || key === 'class') {
        continue;
      }
      strategyOptions[key] = replication[key];
    }
  }
  return this._createKeyspace(
    row['keyspace_name'],
    row['durable_writes'],
    strategy,
    strategyOptions);
};

/** @override */
SchemaParserV2.prototype._parseTableOrView = function (tableInfo, tableRow, columnRows, indexRows, callback) {
  var encoder = this.cc.getEncoder();
  var columnsKeyed = {};
  var partitionKeys = [];
  var clusteringKeys = [];
  var isView = tableInfo instanceof MaterializedView;
  tableInfo.bloomFilterFalsePositiveChance = tableRow['bloom_filter_fp_chance'];
  tableInfo.caching = JSON.stringify(tableRow['caching']);
  tableInfo.comment = tableRow['comment'];
  var compaction = tableRow['compaction'];
  if (compaction) {
    tableInfo.compactionOptions = {};
    tableInfo.compactionClass = compaction['class'];
    for (var key in compaction) {
      if (!compaction.hasOwnProperty(key) || key === 'class') {
        continue;
      }
      tableInfo.compactionOptions[key] = compaction[key];
    }
  }
  tableInfo.compression = tableRow['compression'];
  tableInfo.gcGraceSeconds = tableRow['gc_grace_seconds'];
  tableInfo.localReadRepairChance = tableRow['dclocal_read_repair_chance'];
  tableInfo.readRepairChance = tableRow['read_repair_chance'];
  tableInfo.extensions = tableRow['extensions'];
  tableInfo.crcCheckChance = tableRow['crc_check_chance'];
  tableInfo.memtableFlushPeriod = tableRow['memtable_flush_period_in_ms'] || tableInfo.memtableFlushPeriod;
  tableInfo.defaultTtl = tableRow['default_time_to_live'] || tableInfo.defaultTtl;
  tableInfo.speculativeRetry = tableRow['speculative_retry'] || tableInfo.speculativeRetry;
  tableInfo.minIndexInterval = tableRow['min_index_interval'] || tableInfo.minIndexInterval;
  tableInfo.maxIndexInterval = tableRow['max_index_interval'] || tableInfo.maxIndexInterval;
  if (!isView) {
    var cdc = tableRow['cdc'];
    if (cdc !== undefined) {
      tableInfo.cdc = cdc;
    }
  }
  var self = this;
  utils.map(columnRows, function (row, next) {
    encoder.parseTypeName(tableRow['keyspace_name'], row['type'], 0, null, self.udtResolver, function (err, type) {
      if (err) {
        return next(err);
      }
      var c = {
        name: row['column_name'],
        type: type,
        isStatic: false
      };
      columnsKeyed[c.name] = c;
      switch (row['kind']) {
        case 'partition_key':
          partitionKeys.push({ c: c, index: (row['position'] || 0)});
          break;
        case 'clustering':
          clusteringKeys.push({ c: c, index: (row['position'] || 0), order: row['clustering_order'] === 'desc' ? 'DESC' : 'ASC'});
          break;
        case 'static':
          c.isStatic = true;
          break;
      }
      next(null, c);
    });
  }, function (err, columns) {
    if (err) {
      return callback(err);
    }
    tableInfo.columns = columns;
    tableInfo.columnsByName = columnsKeyed;
    tableInfo.partitionKeys = partitionKeys.sort(utils.propCompare('index')).map(function (item) {
      return item.c;
    });
    clusteringKeys.sort(utils.propCompare('index'));
    tableInfo.clusteringKeys = clusteringKeys.map(function (item) {
      return item.c;
    });
    tableInfo.clusteringOrder = clusteringKeys.map(function (item) {
      return item.order;
    });
    if (isView) {
      tableInfo.tableName = tableRow['base_table_name'];
      tableInfo.whereClause = tableRow['where_clause'];
      tableInfo.includeAllColumns = tableRow['include_all_columns'];
      return callback();
    }
    tableInfo.indexes = Index.fromRows(indexRows);
    var flags = tableRow['flags'];
    var isDense = flags.indexOf('dense') >= 0;
    var isSuper = flags.indexOf('super') >= 0;
    var isCompound = flags.indexOf('compound') >= 0;
    tableInfo.isCompact = isSuper || isDense || !isCompound;
    //remove the columns related to Thrift
    var isStaticCompact = !isSuper && !isDense && !isCompound;
    if(isStaticCompact) {
      pruneStaticCompactTableColumns(tableInfo);
    }
    else if (isDense) {
      pruneDenseTableColumns(tableInfo);
    }
    callback();
  });
};

/** @override */
SchemaParserV2.prototype._parseAggregate = function (row, callback) {
  var encoder = this.cc.getEncoder();
  var aggregate = new Aggregate();
  aggregate.name = row['aggregate_name'];
  aggregate.keyspaceName = row['keyspace_name'];
  aggregate.signature = row['argument_types'] || utils.emptyArray;
  aggregate.stateFunction = row['state_func'];
  aggregate.finalFunction = row['final_func'];
  aggregate.initConditionRaw = row['initcond'];
  aggregate.initCondition = aggregate.initConditionRaw;
  var self = this;
  utils.series([
    function parseArguments(next) {
      utils.map(row['argument_types'] || utils.emptyArray, function (name, mapNext) {
        encoder.parseTypeName(row['keyspace_name'], name, 0, null, self.udtResolver, mapNext);
      }, function (err, result) {
        aggregate.argumentTypes = result;
        next(err);
      });
    },
    function parseStateType(next) {
      encoder.parseTypeName(row['keyspace_name'], row['state_type'], 0, null, self.udtResolver, function (err, type) {
        aggregate.stateType = type;
        next(err);
      });
    },
    function parseReturnType(next) {
      encoder.parseTypeName(row['keyspace_name'], row['return_type'], 0, null, self.udtResolver, function (err, type) {
        aggregate.returnType = type;
        next(err);
      });
    }
  ], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, aggregate);
  });
};

/** @override */
SchemaParserV2.prototype._parseFunction = function (row, callback) {
  var encoder = this.cc.getEncoder();
  var func = new SchemaFunction();
  func.name = row['function_name'];
  func.keyspaceName = row['keyspace_name'];
  func.signature = row['argument_types'] || utils.emptyArray;
  func.argumentNames = row['argument_names'] || utils.emptyArray;
  func.body = row['body'];
  func.calledOnNullInput = row['called_on_null_input'];
  func.language = row['language'];
  var self = this;
  utils.series([
    function parseArguments(next) {
      utils.map(row['argument_types'] || utils.emptyArray, function (name, mapNext) {
        encoder.parseTypeName(row['keyspace_name'], name, 0, null, self.udtResolver, mapNext);
      }, function (err, result) {
        func.argumentTypes = result;
        next(err);
      });
    },
    function parseReturnType(next) {
      encoder.parseTypeName(row['keyspace_name'], row['return_type'], 0, null, self.udtResolver, function (err, type) {
        func.returnType = type;
        next(err);
      });
    }
  ], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, func);
  });
};

/** @override */
SchemaParserV2.prototype._parseUdt = function (udtInfo, row, callback) {
  var encoder = this.cc.getEncoder();
  var fieldTypes = row['field_types'];
  var keyspace = row['keyspace_name'];
  var fields = new Array(fieldTypes.length);
  var self = this;
  utils.forEachOf(row['field_names'], function (name, i, next) {
    encoder.parseTypeName(keyspace, fieldTypes[i], 0, null, self.udtResolver, function (err, type) {
      if (err) {
        return next(err);
      }
      fields[i] = {
        name: name,
        type: type
      };
      next();
    });
  }, function (err) {
    if (err) {
      return callback(err);
    }
    udtInfo.fields = fields;
    callback(null, udtInfo);
  });
};

//noinspection JSValidateJSDoc
/**
 * Upon migration from thrift to CQL, we internally create a pair of surrogate clustering/regular columns
 * for compact static tables. These columns shouldn't be exposed to the user but are currently returned by C*.
 * We also need to remove the static keyword for all other columns in the table.
 * @param {module:metadata~TableMetadata} tableInfo
*/
function pruneStaticCompactTableColumns(tableInfo) {
  var i;
  var c;
  //remove "column1 text" clustering column
  for (i = 0; i < tableInfo.clusteringKeys.length; i++) {
    c = tableInfo.clusteringKeys[i];
    var index = tableInfo.columns.indexOf(c);
    tableInfo.columns.splice(index, 1);
    delete tableInfo.columnsByName[c.name];
  }
  tableInfo.clusteringKeys = utils.emptyArray;
  tableInfo.clusteringOrder = utils.emptyArray;
  //remove regular columns and set the static columns to non-static
  i = tableInfo.columns.length;
  while (i--) {
    c = tableInfo.columns[i];
    if (!c.isStatic && tableInfo.partitionKeys.indexOf(c) === -1) {
      // remove "value blob" regular column
      tableInfo.columns.splice(i, 1);
      delete tableInfo.columnsByName[c.name];
      continue;
    }
    c.isStatic = false;
  }
}

//noinspection JSValidateJSDoc
/**
 * Upon migration from thrift to CQL, we internally create a surrogate column "value" of type custom.
 * This column shouldn't be exposed to the user but is currently returned by C*.
 * @param {module:metadata~TableMetadata} tableInfo
 */
function pruneDenseTableColumns(tableInfo) {
  var i = tableInfo.columns.length;
  while (i--) {
    var c = tableInfo.columns[i];
    if (!c.isStatic && c.type.code === types.dataTypes.custom && c.type.info === 'empty') {
      // remove "value blob" regular column
      tableInfo.columns.splice(i, 1);
      delete tableInfo.columnsByName[c.name];
      continue;
    }
    c.isStatic = false;
  }
}

function getTokenToReplicaMapper(strategy, strategyOptions) {
  if (/SimpleStrategy$/.test(strategy)) {
    var rf = parseInt(strategyOptions['replication_factor'], 10);
    if (rf > 1) {
      return getTokenToReplicaSimpleMapper(rf);
    }
  }
  if (/NetworkTopologyStrategy$/.test(strategy)) {
    //noinspection JSUnresolvedVariable
    return getTokenToReplicaNetworkMapper(strategyOptions);
  }
  //default, wrap in an Array
  return (function noStrategy(tokenizer, ring, primaryReplicas) {
    var replicas = {};
    for (var key in primaryReplicas) {
      if (!primaryReplicas.hasOwnProperty(key)) {
        continue;
      }
      replicas[key] = [primaryReplicas[key]];
    }
    return replicas;
  });
}

/**
 * @param {Number} replicationFactor
 * @returns {function}
 */
function getTokenToReplicaSimpleMapper(replicationFactor) {
  return (function tokenSimpleStrategy(tokenizer, ringTokensAsStrings, primaryReplicas) {
    var ringLength = ringTokensAsStrings.length;
    var rf = Math.min(replicationFactor, ringLength);
    var replicas = {};
    for (var i = 0; i < ringLength; i++) {
      var key = ringTokensAsStrings[i];
      var tokenReplicas = [primaryReplicas[key]];
      for (var j = 1; j < rf; j++) {
        var nextReplicaIndex = i + j;
        if (nextReplicaIndex >= ringLength) {
          //circle back
          nextReplicaIndex = nextReplicaIndex % ringLength;
        }
        var nextReplica = primaryReplicas[ringTokensAsStrings[nextReplicaIndex]];
        tokenReplicas.push(nextReplica);
      }
      replicas[key] = tokenReplicas;
    }
    return replicas;
  });
}

/**
 * @param {Object} replicationFactors
 * @returns {Function}
 * @private
 */
function getTokenToReplicaNetworkMapper(replicationFactors) {
  //                A(DC1)
  //
  //           H         B(DC2)
  //                |
  //      G       --+--       C(DC1)
  //                |
  //           F         D(DC2)
  //
  //                E(DC1)
  return (function tokenNetworkStrategy(tokenizer, ringTokensAsStrings, primaryReplicas, datacenters) {
    var replicas = {};
    var ringLength = ringTokensAsStrings.length;

    for (var i = 0; i < ringLength; i++) {
      var key = ringTokensAsStrings[i];
      var tokenReplicas = [];
      var replicasByDc = {};
      var racksPlaced = {};
      var skippedHosts = [];
      for (var j = 0; j < ringLength; j++) {
        var nextReplicaIndex = i + j;
        if (nextReplicaIndex >= ringLength) {
          //circle back
          nextReplicaIndex = nextReplicaIndex % ringLength;
        }
        var h = primaryReplicas[ringTokensAsStrings[nextReplicaIndex]];
        var dc = h.datacenter;
        //Check if the next replica belongs to one of the targeted dcs
        var dcRf = parseInt(replicationFactors[dc], 10);
        if (!dcRf) {
          continue;
        }
        dcRf = Math.min(dcRf, datacenters[dc].hostLength);
        var dcReplicas = replicasByDc[dc] || 0;
        //Amount of replicas per dc is greater than rf or the amount of host in the datacenter
        if (dcReplicas >= dcRf) {
          continue;
        }
        var racksPlacedInDc = racksPlaced[dc];
        if (!racksPlacedInDc) {
          racksPlacedInDc = racksPlaced[dc] = new utils.HashSet();
        }
        if (h.rack &&
            racksPlacedInDc.contains(h.rack) &&
            racksPlacedInDc.length < datacenters[dc].racks.length) {
          // We already selected a replica for this rack
          // Skip until replicas in other racks are added
          if (skippedHosts.length < dcRf - dcReplicas) {
            skippedHosts.push(h);
          }
          continue;
        }
        replicasByDc[h.datacenter] = ++dcReplicas;
        tokenReplicas.push(h);
        if (h.rack && racksPlacedInDc.add(h.rack) && racksPlacedInDc.length === datacenters[dc].racks.length) {
          // We finished placing all replicas for all racks in this dc
          // Add the skipped hosts
          replicasByDc[dc] += addSkippedHosts(dcRf, dcReplicas, tokenReplicas, skippedHosts);
        }
        if (isDoneForToken(replicationFactors, datacenters, replicasByDc)) {
          break;
        }
      }
      replicas[key] = tokenReplicas;
    }
    return replicas;
  });
}

/**
 * @returns {Number} The number of skipped hosts added.
 */
function addSkippedHosts(dcRf, dcReplicas, tokenReplicas, skippedHosts) {
  var i;
  for (i = 0; i < dcRf - dcReplicas && i < skippedHosts.length; i++) {
    tokenReplicas.push(skippedHosts[i]);
  }
  return i;
}

function isDoneForToken(replicationFactors, datacenters, replicasByDc) {
  var keys = Object.keys(replicationFactors);
  for (var i = 0; i < keys.length; i++) {
    var dcName = keys[i];
    var dc = datacenters[dcName];
    if (!dc) {
      // A DC is included in the RF but the DC does not exist in the topology
      continue;
    }
    var rf = Math.min(parseInt(replicationFactors[dcName], 10), dc.hostLength);
    if (rf > 0 && (!replicasByDc[dcName] || replicasByDc[dcName] < rf)) {
      return false;
    }
  }
  return true;
}
/**
 * Creates a new instance if the currentInstance is not valid for the
 * provided Cassandra version
 * @param {ControlConnection} cc The control connection to be used
 * @param {Function} udtResolver The function to be used to retrieve the udts.
 * @param {Array.<Number>} [version] The cassandra version
 * @param {SchemaParser} [currentInstance] The current instance
 * @returns {SchemaParser}
 */
function getByVersion(cc, udtResolver, version, currentInstance) {
  var parserConstructor = SchemaParserV1;
  if (version && version[0] >= 3) {
    parserConstructor = SchemaParserV2;
  }
  if (!currentInstance || !(currentInstance instanceof parserConstructor)){
    return new parserConstructor(cc, udtResolver);
  }
  return currentInstance;
}

exports.getByVersion = getByVersion;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var DataCollection = __webpack_require__(22);
//noinspection JSValidateJSDoc
/**
 * Creates a new instance of TableMetadata
 * @classdesc Describes a table
 * @param {String} name Name of the Table
 * @augments {module:metadata~DataCollection}
 * @alias module:metadata~TableMetadata
 * @constructor
 */
function TableMetadata(name) {
  DataCollection.call(this, name);
  /**
   * Applies only to counter tables.
   * When set to true, replicates writes to all affected replicas regardless of the consistency level specified by
   * the client for a write request. For counter tables, this should always be set to true.
   * @type {Boolean}
   */
  this.replicateOnWrite = true;
  /**
   * Returns the memtable flush period (in milliseconds) option for this table.
   * <p>
   * Note: this option is available only on Cassandra 2.x and will return 0 (no periodic
   * flush) when connected to 1.2 nodes.
   * </p>
   * @type {Number}
   */
  this.memtableFlushPeriod = 0;
  /**
   * Returns the index interval option for this table.
   * <p>
   * Note: this option is only available in Cassandra 2.0. It is deprecated in Cassandra 2.1 and above, and will
   * therefore return {@code null} for 2.1 nodes.
   * </p>
   * @type {Number|null}
   */
  this.indexInterval = null;
  /**
   * Determines  whether the table uses the COMPACT STORAGE option.
   * @type {Boolean}
   */
  this.isCompact = false;
  /**
   *
   * @type {Array.<Index>}
   */
  this.indexes = null;

  /**
   * Determines whether the Change Data Capture (CDC) flag is set for the table.
   * @type {Boolean|null}
   */
  this.cdc = null;
}

//noinspection JSCheckFunctionSignatures
util.inherits(TableMetadata, DataCollection);

module.exports = TableMetadata;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new Aggregate.
 * @classdesc Describes a CQL aggregate.
 * @alias module:metadata~Aggregate
 * @constructor
 */
function Aggregate() {
  /**
   * Name of the aggregate.
   * @type {String}
   */
  this.name = null;
  /**
   * Name of the keyspace where the aggregate is declared.
   */
  this.keyspaceName = null;
  /**
   * Signature of the aggregate.
   * @type {Array.<String>}
   */
  this.signature = null;
  /**
   * List of the CQL aggregate argument types.
   * @type {Array.<{code, info}>}
   */
  this.argumentTypes = null;
  /**
   * State Function.
   * @type {String}
   */
  this.stateFunction = null;
  /**
   * State Type.
   * @type {{code, info}}
   */
  this.stateType = null;
  /**
   * Final Function.
   * @type {String}
   */
  this.finalFunction = null;
  this.initConditionRaw = null;
  /**
   * Initial state value of this aggregate.
   * @type {String}
   */
  this.initCondition = null;
  /**
   * Type of the return value.
   * @type {{code: number, info: (Object|Array|null)}}
   */
  this.returnType = null;
}

module.exports = Aggregate;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new SchemaFunction.
 * @classdesc Describes a CQL function.
 * @alias module:metadata~SchemaFunction
 * @constructor
 */
function SchemaFunction() {
  /**
   * Name of the cql function.
   * @type {String}
   */
  this.name = null;
  /**
   * Name of the keyspace where the cql function is declared.
   */
  this.keyspaceName = null;
  /**
   * Signature of the function.
   * @type {Array.<String>}
   */
  this.signature = null;
  /**
   * List of the function argument names.
   * @type {Array.<String>}
   */
  this.argumentNames = null;
  /**
   * List of the function argument types.
   * @type {Array.<{code, info}>}
   */
  this.argumentTypes = null;
  /**
   * Body of the function.
   * @type {String}
   */
  this.body = null;
  /**
   * Determines if the function is called when the input is null.
   * @type {Boolean}
   */
  this.calledOnNullInput = null;
  /**
   * Name of the programming language, for example: java, javascript, ...
   * @type {String}
   */
  this.language = null;
  /**
   * Type of the return value.
   * @type {{code: number, info: (Object|Array|null)}}
   */
  this.returnType = null;
}

module.exports = SchemaFunction;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var utils = __webpack_require__(1);
var types = __webpack_require__(2);

/** @private */
var kind = {
  custom: 0,
  keys: 1,
  composites: 2
};
/**
 * Creates a new Index instance.
 * @classdesc Describes a CQL index.
 * @param {String} name
 * @param {String} target
 * @param {Number} kind
 * @param {Object} options
 * @alias module:metadata~Index
 * @constructor
 */
function Index(name, target, kind, options) {
  /**
   * Name of the index.
   * @type {String}
   */
  this.name = name;
  /**
   * Target of the index.
   * @type {String}
   */
  this.target = target;
  /**
   * A numeric value representing index kind (0: custom, 1: keys, 2: composite);
   * @type {Number}
   */
  this.kind = kind;
  /**
   * An associative array containing the index options
   * @type {Object}
   */
  this.options = options;
}

/**
 * Determines if the index is of composites kind
 * @returns {Boolean}
 */
Index.prototype.isCompositesKind = function () {
  return this.kind === kind.composites;
};

/**
 * Determines if the index is of keys kind
 * @returns {Boolean}
 */
Index.prototype.isKeysKind = function () {
  return this.kind === kind.keys;
};

/**
 * Determines if the index is of custom kind
 * @returns {Boolean}
 */
Index.prototype.isCustomKind = function () {
  return this.kind === kind.custom;
};

/**
 * Parses Index information from rows in the 'system_schema.indexes' table
 * @param {Array.<Row>} indexRows
 * @returns {Array.<Index>}
 */
Index.fromRows = function (indexRows) {
  if (!indexRows || indexRows.length === 0) {
    return utils.emptyArray;
  }
  return indexRows.map(function (row) {
    var options = row['options'];
    return new Index(row['index_name'], options['target'], getKindByName(row['kind']), options);
  });
};

/**
 * Parses Index information from rows in the legacy 'system.schema_columns' table
 * @param {Array.<Row>} columnRows
 * @param {Object.<String, {name, type}>} columnsByName
 * @returns {Array.<Index>}
 */
Index.fromColumnRows = function (columnRows, columnsByName) {
  var result = [];
  for (var i = 0; i < columnRows.length; i++) {
    var row = columnRows[i];
    var indexName = row['index_name'];
    if (!indexName) {
      continue;
    }
    var c = columnsByName[row['column_name']];
    var target;
    var options = JSON.parse(row['index_options']);
    if (options !== null && options['index_keys'] !== undefined) {
      target = util.format("keys(%s)", c.name);
    }
    else if (options !== null && options['index_keys_and_values'] !== undefined) {
      target = util.format("entries(%s)", c.name);
    }
    else if (c.type.options.frozen && (c.type.code === types.dataTypes.map || c.type.code === types.dataTypes.list ||
      c.type.code === types.dataTypes.set)) {
      target = util.format("full(%s)", c.name);
    }
    else {
      target = c.name;
    }
    result.push(new Index(indexName, target, getKindByName(row['index_type']), options));
  }
  return result;
};

/**
 * Gets the number representing the kind based on the name
 * @param {String} name
 * @returns {Number}
 * @private
 */
function getKindByName(name) {
  if (!name) {
    return kind.custom;
  }
  return kind[name.toLowerCase()];
}

module.exports = Index;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);
var DataCollection = __webpack_require__(22);
//noinspection JSValidateJSDoc
/**
 * Creates a new MaterializedView.
 * @param {String} name Name of the View.
 * @classdesc Describes a CQL materialized view.
 * @alias module:metadata~MaterializedView
 * @augments {module:metadata~DataCollection}
 * @constructor
 */
function MaterializedView(name) {
  DataCollection.call(this, name);
  /**
   * Name of the table.
   * @type {String}
   */
  this.tableName = null;
  /**
   * View where clause.
   * @type {String}
   */
  this.whereClause = null;
  /**
   * Determines if all the table columns where are included in the view.
   * @type {boolean}
   */
  this.includeAllColumns = false;
}

//noinspection JSCheckFunctionSignatures
util.inherits(MaterializedView, DataCollection);

module.exports = MaterializedView;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var utils = __webpack_require__(1);

var _queueOverflowThreshold = 1000;

/**
 * Debounce protocol events by acting on those events with a sliding delay.
 * @param {Number} delay
 * @param {Function} logger
 * @ignore
 * @constructor
 */
function EventDebouncer(delay, logger) {
  this._delay = delay;
  this._logger = logger;
  this._queue = null;
  this._timeout = null;
}

/**
 * Adds a new event to the queue and moves the delay.
 * @param {{ handler: Function, all: boolean|undefined, keyspace: String|undefined, cqlObject: String|null|undefined,
 * callback: Function|undefined }} event
 * @param {Boolean} processNow
 */
EventDebouncer.prototype.eventReceived = function (event, processNow) {
  event.callback = event.callback || utils.noop;
  this._queue = this._queue || { callbacks: [], keyspaces: {} };
  var delay = !processNow ? this._delay : 0;
  if (event.all) {
    // when an event marked with all is received, it supersedes all the rest of events
    // a full update (hosts + keyspaces + tokens) is going to be made
    this._queue.mainEvent = event;
  }
  if (this._queue.callbacks.length === _queueOverflowThreshold) {
    // warn once
    this._logger('warn', util.format('Event debouncer queue exceeded %d events', _queueOverflowThreshold));
  }
  this._queue.callbacks.push(event.callback);
  if (this._queue.mainEvent) {
    // a full refresh is scheduled and the callback was added, nothing else to do.
    return this._slideDelay(delay);
  }
  // Insert at keyspace level
  var keyspaceEvents = this._queue.keyspaces[event.keyspace];
  if (!keyspaceEvents) {
    keyspaceEvents = this._queue.keyspaces[event.keyspace] = { events: [] };
  }
  if (event.cqlObject === undefined) {
    // a full refresh of the keyspace, supersedes all child keyspace events
    keyspaceEvents.mainEvent = event;
  }
  keyspaceEvents.events.push(event);
  this._slideDelay(delay);
};

/**
 * @param {Number} delay
 * @private
 * */
EventDebouncer.prototype._slideDelay = function (delay) {
  var self = this;
  function process() {
    var q = self._queue;
    self._queue = null;
    self._timeout = null;
    processQueue(q);
  }
  if (delay === 0) {
    // no delay, process immediately
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    return process();
  }
  var previousTimeout = this._timeout;
  // add the new timeout before removing the previous one performs better
  this._timeout = setTimeout(process, delay);
  if (previousTimeout) {
    clearTimeout(previousTimeout);
  }
};

/**
 * Clears the timeout and invokes all pending callback.
 */
EventDebouncer.prototype.shutdown = function () {
  if (!this._queue) {
    return;
  }
  this._queue.callbacks.forEach(function (cb) {
    cb();
  });
  this._queue = null;
  clearTimeout(this._timeout);
  this._timeout = null;
};

/**
 * @param {{callbacks: Array, keyspaces: Object, mainEvent: Object}} q
 * @private
 */
function processQueue (q) {
  if (q.mainEvent) {
    // refresh all by invoking 1 handler and invoke all pending callbacks
    return q.mainEvent.handler(function invokeCallbacks(err) {
      for (var i = 0; i < q.callbacks.length; i++) {
        q.callbacks[i](err);
      }
    });
  }
  utils.each(Object.keys(q.keyspaces), function eachKeyspace(name, next) {
    var keyspaceEvents = q.keyspaces[name];
    if (keyspaceEvents.mainEvent) {
      // refresh a keyspace
      return keyspaceEvents.mainEvent.handler(function mainEventCallback(err) {
        for (var i = 0; i < keyspaceEvents.events.length; i++) {
          keyspaceEvents.events[i].callback(err);
        }
        next();
      });
    }
    // deal with individual handlers and callbacks
    keyspaceEvents.events.forEach(function eachEvent(event) {
      // sync handlers
      event.handler();
      event.callback();
    });
    next();
  });
}

module.exports = EventDebouncer;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var errors = __webpack_require__(3);

/**
 * Creates a new instance of <code>ClientState</code>.
 * @classdesc
 * Represents the state of a {@link Client}.
 * <p>
 * Exposes information on the connections maintained by a Client at a specific time.
 * </p>
 * @alias module:metadata~ClientState
 * @param {Array<Host>} hosts
 * @param {Object.<String, Number>} openConnections
 * @param {Object.<String, Number>} inFlightQueries
 * @constructor
 */
function ClientState(hosts, openConnections, inFlightQueries) {
  this._hosts = hosts;
  this._openConnections = openConnections;
  this._inFlightQueries = inFlightQueries;
}

/**
 * Creates a new instance from the provided client.
 * @param {Client} client
 * @internal
 * @ignore
 */
ClientState.from = function (client) {
  var openConnections = {};
  var inFlightQueries = {};
  var hostArray = [];
  client.hosts.forEach(function each(host) {
    if (host.pool.connections.length === 0) {
      return;
    }
    hostArray.push(host);
    openConnections[host.address] = host.pool.connections.length;
    inFlightQueries[host.address] = host.pool.connections.reduce(function (count, connection) {
      return count + connection.getInFlight();
    }, 0);
  });
  return new ClientState(hostArray, openConnections, inFlightQueries);
};

/**
 * Get an array of hosts to which the client is connected to.
 * @return {Array<Host>}
 */
ClientState.prototype.getConnectedHosts = function () {
  return this._hosts;
};

/**
 * Gets the amount of open connections to a given host.
 * @param {Host} host
 * @return {Number}
 */
ClientState.prototype.getOpenConnections = function (host) {
  if (!host) {
    throw new errors.ArgumentError('Host is not defined');
  }
  return this._openConnections[host.address] || 0;
};

/**
 * Gets the amount of queries that are currently being executed through a given host.
 * <p>
 * This corresponds to the number of queries that have been sent by the Client to server Host on one of its connections
 * but haven't yet obtained a response.
 * </p>
 * @param {Host} host
 * @return {Number}
 */
ClientState.prototype.getInFlightQueries = function (host) {
  if (!host) {
    throw new errors.ArgumentError('Host is not defined');
  }
  return this._inFlightQueries[host.address] || 0;
};

/**
 * Returns the string representation of the instance.
 */
ClientState.prototype.toString = function () {
  return util.format(
    '{"hosts": %j, "openConnections": %j, "inFlightQueries": %j}',
    this._hosts.map(function (h) { return h.address; }),
    this._openConnections,
    this._inFlightQueries
  );
};

module.exports = ClientState;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Authentication module.
 * @module auth
 */
var baseProvider = __webpack_require__(24);
exports.AuthProvider = baseProvider.AuthProvider;
exports.Authenticator = baseProvider.Authenticator;
exports.PlainTextAuthProvider = __webpack_require__(65);

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(0);

var provider = __webpack_require__(24);
var utils = __webpack_require__(1);
var AuthProvider = provider.AuthProvider;
var Authenticator = provider.Authenticator;
/**
 * Creates a new instance of the Authenticator provider
 * @classdesc Provides plain text [Authenticator]{@link module:auth~Authenticator} instances to be used when
 * connecting to a host.
 * @extends module:auth~AuthProvider
 * @example
 * var authProvider = new cassandra.auth.PlainTextAuthProvider('my_user', 'p@ssword1!');
 * //Set the auth provider in the clientOptions when creating the Client instance
 * var client = new Client({ contactPoints: contactPoints, authProvider: authProvider });
 * @param {String} username User name in plain text
 * @param {String} password Password in plain text
 * @alias module:auth~PlainTextAuthProvider
 * @constructor
 */
function PlainTextAuthProvider(username, password) {
  this.username = username;
  this.password = password;
}

util.inherits(PlainTextAuthProvider, AuthProvider);

/**
 * Returns a new [Authenticator]{@link module:auth~Authenticator} instance to be used for plain text authentication.
 * @override
 * @returns {Authenticator}
 */
PlainTextAuthProvider.prototype.newAuthenticator = function () {
  return new PlainTextAuthenticator(this.username, this.password);
};

/**
 * @ignore
 */
function PlainTextAuthenticator(username, password) {
  this.username = username;
  this.password = password;
}

util.inherits(PlainTextAuthenticator, Authenticator);

PlainTextAuthenticator.prototype.initialResponse = function (callback) {
  var initialToken = Buffer.concat([
    utils.allocBufferFromArray([0]),
    utils.allocBufferFromString(this.username, 'utf8'),
    utils.allocBufferFromArray([0]),
    utils.allocBufferFromString(this.password, 'utf8')
  ]);
  callback(null, initialToken);
};

PlainTextAuthenticator.prototype.evaluateChallenge = function (challenge, callback) {
  //noop
  callback();
};

module.exports = PlainTextAuthProvider;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = {"_args":[[{"raw":"cassandra-driver","scope":null,"escapedName":"cassandra-driver","name":"cassandra-driver","rawSpec":"","spec":"latest","type":"tag"},"D:\\wot\\my-service"]],"_from":"cassandra-driver@latest","_id":"cassandra-driver@3.3.0","_inCache":true,"_location":"/cassandra-driver","_nodeVersion":"4.6.0","_npmOperationalInternal":{"host":"s3://npm-registry-packages","tmp":"tmp/cassandra-driver-3.3.0.tgz_1505827958242_0.7815157293807715"},"_npmUser":{"name":"jorgebay","email":"jorgebaygondra@gmail.com"},"_npmVersion":"3.10.8","_phantomChildren":{},"_requested":{"raw":"cassandra-driver","scope":null,"escapedName":"cassandra-driver","name":"cassandra-driver","rawSpec":"","spec":"latest","type":"tag"},"_requiredBy":["#USER","/memeni-core-sdk","/memeni-lambda"],"_resolved":"https://registry.npmjs.org/cassandra-driver/-/cassandra-driver-3.3.0.tgz","_shasum":"7a4d27a364e39bd125e4b4564d30c36145d7635e","_shrinkwrap":null,"_spec":"cassandra-driver","_where":"D:\\wot\\my-service","author":{"name":"DataStax"},"bugs":{"url":"https://groups.google.com/a/lists.datastax.com/forum/#!forum/nodejs-driver-user"},"dependencies":{"long":"^2.2.0"},"description":"DataStax Node.js Driver for Apache Cassandra","devDependencies":{"mocha":">= 1.14.0","mocha-appveyor-reporter":">= 0.2.1","mocha-jenkins-reporter":">= 0.1.9","mocha-multi":">= 0.8.0","rewire":">= 2.1.0"},"directories":{},"dist":{"shasum":"7a4d27a364e39bd125e4b4564d30c36145d7635e","tarball":"https://registry.npmjs.org/cassandra-driver/-/cassandra-driver-3.3.0.tgz"},"engines":{"node":">=0.10.0"},"gitHead":"10c4412bb81a426f069bd2890b186c5ff49efc7c","homepage":"https://github.com/datastax/nodejs-driver#readme","keywords":["cassandra","cql","cql3","connection","pool","datastax","nosql","driver","database"],"license":"Apache-2.0","maintainers":[{"name":"jorgebay","email":"jorgebaygondra@gmail.com"}],"name":"cassandra-driver","optionalDependencies":{},"readme":"ERROR: No README data found!","repository":{"type":"git","url":"git+https://github.com/datastax/nodejs-driver.git"},"scripts":{"ci":"mocha test/unit test/integration/short -R mocha-multi","ci_unit":"mocha test/unit -R mocha-multi","eslint":"eslint lib test --ignore-pattern '/lib/types/integer.js'","test":"mocha test/unit -R spec -t 5000"},"version":"3.3.0"}

/***/ })
/******/ ])));