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

export default {
  isArray,
  isRegex,
  isDate,
};
