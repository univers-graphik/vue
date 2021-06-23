import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

const request = new Request({})

export default {
  /**
   * Get page data
   * @param {string} lang
   * @param {number|string} id
   * @returns {Promise<T | never>}
   */
  get ({ lang, id }) {
    return request
      .get(endpoints.PAGE_CONTENT.replace('{{lang}}', lang).replace('{{id}}', id))
      .then((response) => {
        return response
      })
  }
}
