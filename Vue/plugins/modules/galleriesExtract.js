import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

const request = new Request({})

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    }
  },
  actions: {
    /**
     * Get data galleries extract
     * @param {object} context
     * @param {string} lang
     * @returns {Promise<T | never>}
     */
    get (context, lang) {
      return request
        .get(endpoints.GALLERIES_EXTRACT.replace('{{lang}}', lang))
        .then((response) => {
          // Save data
          context.commit('setItems', response.data.data.items)
        })
    }
  }
}
