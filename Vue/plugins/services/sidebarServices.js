import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

export default {
  /**
   * Get data sidebar
   * @param {string} lang
   * @param {string} target
   * @returns {Promise<T | never>}
   */
  get ({ lang, target }) {
    return Request
      .get(endpoints.SIDEBAR.replace('{{lang}}', lang).replace('{{target}}', target))
      .then((response) => {
        return response
      })
  }
}
