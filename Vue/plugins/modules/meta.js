import endpoints from '@Declarations/endpoints'
import statusCode from '@Declarations/statusCode'
import Request from '@Class/Request'

export default {
  namespaced: true,
  state: {
    metaDescription: ''
  },
  mutations: {
    setMetaDescription (state, metaDescription) {
      state.metaDescription = metaDescription
    }
  },
  actions: {
    /**
     * Get meta description data
     * @param {object} context
     * @param {string} lang
     * @returns {Promise<T | never>}
     */
    get (context, lang) {
      return Request
        .get(endpoints.META_DESCRIPTION.replace('{{lang}}', lang))
        .then((response) => {
          if (response.status !== statusCode.OK) return

          // Save data
          context.commit('setMetaDescription', response.data.data.meta_description)
        })
    }
  }
}
