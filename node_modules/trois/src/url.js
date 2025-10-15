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
  const urlRegex =
  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:(\/[^?#]*))?(?:(\?[^#]*))?(?:(#.*))?$/;
  const keys = ['url', 'scheme', 'slash', 'host', 'port',
    'path', 'query', 'hash'];
  const values = urlRegex.exec(url);
  const components = {};
  for (let i = 0; i < keys.length; i += 1) {
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
  if (typeof args !== 'object') {
    throw new Error('Expected an object.');
  }
  const qs = Object.keys(args).map(key => `${key}=${args[key]}`).join('&');
  return `?${qs}`;
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
  const q = qs.length > 0 ? qs.slice(1) : '';
  const args = {};
  const items = q.length ? q.split('&') : [];
  for (const item of items) {
    const [key, value] = item.split('=');
    if (key.length) {
      args[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }
  return args;
}

export default {
  getUrlComponents,
  getQueryString,
  getQueryArgs,
};
