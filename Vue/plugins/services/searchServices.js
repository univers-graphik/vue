import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

export default {
  /**
   * Get data sidebar
   * @param {string} lang
   * @param {object} params
   * @returns {Promise<T | never>}
   */
  get ({ lang, params }) {
    return Request
      .get(endpoints.SEARCH.replace('{{lang}}', lang), { params })
      .then((response) => {
        return response
      })
  }
}
