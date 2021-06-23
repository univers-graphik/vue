import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

const request = new Request({})

export default {
  /**
   * Get data news list
   * @param {string} lang
   * @param {number|string} page
   * @returns {Promise<T | never>}
   */
  getNewsList ({ lang, page }) {
    return request
      .get(endpoints.NEWS_LIST.replace('{{lang}}', lang).replace('{{page}}', page))
      .then((response) => {
        return response
      })
  },
  /**
   * Get data news
   * @param {string} lang
   * @param {number|string} id
   * @returns {Promise<T | never>}
   */
  getNews ({ lang, id }) {
    return request
      .get(endpoints.NEWS.replace('{{lang}}', lang).replace('{{id}}', id))
      .then((response) => {
        return response
      })
  },
  /**
   * Get data lead news
   * @param {string} lang
   * @returns {Promise<T | never>}
   */
  getLeadNews (lang) {
    return request
      .get(endpoints.LEAD_NEWS.replace('{{lang}}', lang))
      .then((response) => {
        return response
      })
  },
  /**
   * Get data news pagination
   * @param {string} lang
   * @param {number|string} id
   * @returns {Promise<T | never>}
   */
  getNewsPagination ({ lang, id }) {
    return request
      .get(endpoints.NEWS_PAGINATION.replace('{{lang}}', lang).replace('{{id}}', id))
      .then((response) => {
        return response
      })
  }
}
