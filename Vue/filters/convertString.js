export default class ConvertString {
  /**
   * Replace double quotes by single quotes
   * @param {string} string
   * @returns {string}
   */
  replaceDoubleQuotes (string) {
    return string.replace(/"/g, '\'')
  }
}
