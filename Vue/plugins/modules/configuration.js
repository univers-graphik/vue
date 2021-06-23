import endpoints from '@Declarations/endpoints'
import statusCode from '@Declarations/statusCode'
import Request from '@Class/Request'

const request = new Request({})

export default {
  namespaced: true,
  state: {
    metaDescription: '',
    societyDescription: ''
  },
  mutations: {
    setMetaDescription (state, metaDescription) {
      state.metaDescription = metaDescription
    },
    setSocietyDescription (state, societyDescription) {
      state.societyDescription = societyDescription
    }
  },
  actions: {
    /**
     * Get meta description data
     * @param {object} context
     * @param {string} lang
     * @returns {Promise<T | never>}
     */
    getMetaDescription (context, lang) {
      return request
        .get(endpoints.META_DESCRIPTION.replace('{{lang}}', lang))
        .then((response) => {
          if (response.status !== statusCode.OK) return

          // Save data
          context.commit('setMetaDescription', response.data.data.meta_description)
        })
    },
    /**
     * Get society description data
     * @param {object} context
     * @param {string} lang
     * @returns {Promise<T | never>}
     */
    getSocietyDescription (context, lang) {
      return request
        .get(endpoints.SOCIETY_DESCRIPTION.replace('{{lang}}', lang))
        .then((response) => {
          if (response.status !== statusCode.OK) return

          // Save data
          context.commit('setSocietyDescription', response.data.data.society_description)
        })
    }
  }
}
