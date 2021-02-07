import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

export default {
  namespaced: true,
  state: {
    backgroundColor: '#ffffff',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    cover: '',
    path: '/medias/interface/customization/',
    image: false,
    imageSize: '',
    imageExtension: 'jpg',
    imageNoCache: '',
    imageRetina: false
  },
  getters: {
    path: state => (retina = '') => {
      return `${state.path}background-page${retina}.${state.imageExtension}${state.imageNoCache}`
    }
  },
  mutations: {
    setUpdate (state, data) {
      if (!data) return
      if (data.background_color) state.backgroundColor = data.background_color
      if (data.background_position) state.backgroundPosition = data.background_position
      if (data.background_repeat) state.backgroundRepeat = data.background_repeat
      if (data.background_attachment) state.backgroundAttachment = data.background_attachment
      if (data.cover) state.cover = data.cover
      if (data.image) state.image = data.image
      if (data.image_size) state.imageSize = data.image_size
      if (data.image_extension) state.imageExtension = data.image_extension
      if (data.image_no_cache) state.imageNoCache = data.image_no_cache
      if (data.image_retina) state.imageRetina = data.image_retina
    }
  },
  actions: {
    /**
     * Get customization data
     * @param {object} context
     * @returns {Promise<T | never>}
     */
    get (context) {
      return Request
        .get(endpoints.CUSTOMIZATION)
        .then((response) => {
          // Save data
          context.commit('setUpdate', response.data.data)
        })
    }
  }
}
