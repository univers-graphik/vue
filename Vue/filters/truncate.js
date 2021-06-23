/**
 * Truncate string
 * @param {string} string
 * @param {number} max
 * @param {string} clamp
 * @returns {string}
 */
export default function (string, max, clamp) {
  return string.slice(0, max).trim() + (max < string.length ? clamp || '...' : '')
}
