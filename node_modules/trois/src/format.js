import is from './is';

/**
 * camelize <str>
 *
 * @param {string} str
 * @returns {string}
 */


function camelizeStr(str) {
  return str.replace(/_([A-Za-z0-9]|$)/g, (_, g) => g.toUpperCase());
}

/**
 * camelize <obj>
 *
 * @param {*} obj
 * @returns {*}
 */
function camelizeObj(obj) {
  if (typeof obj !== 'object' || is.isDate(obj) || is.isRegex(obj)) {
    return obj;
  }
  if (is.isArray(obj)) {
    return obj.map(item => camelizeObj(item));
  }
  const newObj = {};
  for (const key of Object.keys(obj)) {
    newObj[camelizeStr(key)] = camelizeObj(obj[key]);
  }
  return newObj;
}

function camelize(obj) {
  if (typeof obj === 'string') {
    return camelizeStr(obj);
  }
  return camelizeObj(obj);
}

export default { camelize };
