import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

export default {
  namespaced: true,
  state: {
    itemsExtract: []
  },
  mutations: {
    setItemsExtract (state, itemsExtract) {
      state.itemsExtract = itemsExtract
    }
  },
  actions: {
    /**
     * Get data galleries
     * @param {object} context
     * @param {string} lang
     * @param {number|string} page
     * @returns {Promise<T | never>}
     */
    getGalleries (context, { lang, page }) {
      return Request
        .get(endpoints.GALLERIES.replace('{{lang}}', lang).replace('{{page}}', page))
        .then((response) => {
          return response
        })
    },
    /**
     * Get data gallery
     * @param {object} context
     * @param {string} lang
     * @param {number|string} id
     * @returns {Promise<T | never>}
     */
    getGallery (context, { lang, id }) {
      return Request
        .get(endpoints.GALLERY.replace('{{lang}}', lang).replace('{{id}}', id))
        .then((response) => {
          return response
        })
    },
    /**
     * Get data galleries extract
     * @param {object} context
     * @param {string} lang
     * @returns {Promise<T | never>}
     */
    getExtract (context, lang) {
      return Request
        .get(endpoints.GALLERIES_EXTRACT.replace('{{lang}}', lang))
        .then((response) => {
          // Save data
          context.commit('setItemsExtract', response.data.data.items)
        })
    }
  }
}
