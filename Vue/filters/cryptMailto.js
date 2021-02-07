/**
 * Encrypt email with mailto
 * @param {string} email (encode in btoa)
 * @param {string} cssClass
 * @param {string} title
 * @returns {string}
 */
export default function (email, cssClass, title) {
  // console.log(btoa('contact@example.com'))

  const linkClass = cssClass ? ` class="${cssClass}"` : ''
  const attrTitle = title ? ` title="${title}"` : ''

  return `<a${linkClass}${attrTitle} href="${atob('bWFpbHRvOg==')}${atob(email)}">${atob(email)}</a>`
}
