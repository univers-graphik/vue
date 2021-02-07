import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'
import Modernizr from 'modernizr'

export default {
  namespaced: true,
  state: {
    loaded: false,
    items: [],
    config: {
      fullWidth: false,
      autoplay: true,
      bullets: true,
      fade: false,
      fractions: false,
      slideRatio: 1 / 3,
      cube3d: false
    }
  },
  mutations: {
    setLoaded (state, loaded) {
      state.loaded = loaded
    },
    setItems (state, items) {
      state.items = items
    },
    setConfig (state, config) {
      state.config.slideRatio = config.slide_ratio
      state.config.fullWidth = config.full_width
      state.config.autoplay = config.autoplay
      state.config.bullets = config.bullets
      state.config.fractions = config.fractions

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
     * @returns {Promise<T | never>}
     */
    get (context) {
      return Request
        .get(endpoints.GALLERY_HOMEPAGE)
        .then((response) => {
          // Save data
          const data = response.data.data
          if (data.items.length) {
            context.commit('setItems', data.items)
            context.commit('setConfig', data.config)
            context.commit('setLoaded', true)
          }
        })
    }
  }
}
