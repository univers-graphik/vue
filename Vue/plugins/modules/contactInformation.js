import endpoints from '@Declarations/endpoints'
import statusCode from '@Declarations/statusCode'
import Request from '@Class/Request'

const request = new Request({})

export default {
  namespaced: true,
  state: {
    loaded: false,
    society: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
    fixedPhone: '',
    fax: '',
    twitterUrl: '',
    twitterUser: '',
    facebookUrl: '',
    pinterestUrl: '',
    linkedinUrl: ''
  },
  mutations: {
    setLoaded (state, loaded) {
      state.loaded = loaded
    },
    setUpdate (state, data) {
      if (!data) return
      if (data.society) state.society = data.society
      if (data.email) state.email = data.email
      if (data.address) state.address = data.address
      if (data.postal_code) state.postalCode = data.postal_code
      if (data.city) state.city = data.city
      if (data.country) state.country = data.country
      if (data.phone) state.phone = data.phone
      if (data.fixed_phone) state.fixedPhone = data.fixed_phone
      if (data.fax) state.fax = data.fax
      if (data.twitter_url) state.twitterUrl = data.twitter_url
      if (data.twitter_user) state.twitterUser = data.twitter_user
      if (data.facebook_url) state.facebookUrl = data.facebook_url
      if (data.pinterest_url) state.pinterestUrl = data.pinterest_url
      if (data.linkedin_url) state.linkedinUrl = data.linkedin_url
    }
  },
  actions: {
    /**
     * Get contact information data
     * @param {object} context
     * @returns {Promise<T | never>}
     */
    get (context) {
      return request
        .get(endpoints.CONTACT_INFORMATION)
        .then((response) => {
          if (response.status !== statusCode.OK) return

          // Save data
          context.commit('setUpdate', response.data.data)
        })
        .then(() => context.commit('setLoaded', true))
    }
  }
}
