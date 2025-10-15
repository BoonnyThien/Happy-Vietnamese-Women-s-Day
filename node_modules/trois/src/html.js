/**
 * Escape HTML special characters
 *
 * @param {string} str
 * @returns {string}
 */


function htmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Unescape HTML special characters
 *
 * @param {string} str
 * @returns {string}
 */


function htmlUnescape(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

export default {
  htmlEscape,
  htmlUnescape,
};
