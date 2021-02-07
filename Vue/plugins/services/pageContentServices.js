import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

export default {
  /**
   * Get page data
   * @param {string} lang
   * @param {number|string} id
   * @returns {Promise<T | never>}
   */
  get ({ lang, id }) {
    return Request
      .get(endpoints.PAGE_CONTENT.replace('{{lang}}', lang).replace('{{id}}', id))
      .then((response) => {
        return response
      })
  }
}
