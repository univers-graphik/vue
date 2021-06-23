import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

const request = new Request({})

export default {
  /**
   * Get panoramic image data
   * @param {number|string} id
   * @param {object} params
   * @returns {Promise<T | never>}
   */
  get ({ id, params }) {
    return request
      .get(endpoints.PANORAMICS.replace('{{id}}', id), { params })
      .then((response) => {
        return response
      })
  }
}
