import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'
import Modernizr from 'modernizr'

const request = new Request({})

export default {
  namespaced: true,
  state: {
    loaded: false,
    path: '',
    items: [],
    config: {
      fade: false,
      slideRatio: 1 / 3,
      cube3d: false
    }
  },
  mutations: {
    setLoaded (state, loaded) {
      state.loaded = loaded
    },
    setPath (state, path) {
      state.path = path
    },
    setItems (state, items) {
      state.items = items
    },
    setConfig (state, config) {
      state.config.slideRatio = config.slide_ratio
      switch (config.slide_effect) {
        case 'fade':
          state.config.fade = true
          break
        case 'cube3d':
          if (Modernizr.preserve3d) state.config.cube3d = true
          break
      }
    }
  },
  actions: {
    /**
     * Get data
     * @param {object} context
     * @param {number} id
     * @returns {Promise<T | never>}
     */
    get (context, id) {
      return request
        .get(endpoints.GALLERY_PAGE.replace('{{id}}', id))
        .then((response) => {
          // Save data
          const data = response.data.data
          context.commit('setPath', data.path)
          context.commit('setItems', data.items)
          context.commit('setConfig', data.config)
          context.commit('setLoaded', true)

          return response
        })
    }
  }
}
