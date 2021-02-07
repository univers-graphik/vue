import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

export default {
  /**
   * Get data news list
   * @param {string} lang
   * @param {number|string} page
   * @returns {Promise<T | never>}
   */
  getNewsList ({ lang, page }) {
    return Request
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
    return Request
      .get(endpoints.NEWS.replace('{{lang}}', lang).replace('{{id}}', id))
      .then((response) => {
        return response
      })
  },
  /**
   * Get data news star list
   * @param {string} lang
   * @returns {Promise<T | never>}
   */
  getNewsStar (lang) {
    return Request
      .get(endpoints.NEWS_STAR.replace('{{lang}}', lang))
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
    return Request
      .get(endpoints.NEWS_PAGINATION.replace('{{lang}}', lang).replace('{{id}}', id))
      .then((response) => {
        return response
      })
  }
}
