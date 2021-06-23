import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

const request = new Request({})

export default {
  /**
   * Get data galleries list
   * @param {string} lang
   * @param {number|string} page
   * @returns {Promise<T | never>}
   */
  getGalleriesList ({ lang, page }) {
    return request
      .get(endpoints.GALLERIES.replace('{{lang}}', lang).replace('{{page}}', page))
      .then((response) => {
        return response
      })
  },
  /**
   * Get data gallery
   * @param {string} lang
   * @param {number|string} id
   * @returns {Promise<T | never>}
   */
  getGallery ({ lang, id }) {
    return request
      .get(endpoints.GALLERY.replace('{{lang}}', lang).replace('{{id}}', id))
      .then((response) => {
        return response
      })
  }
}
