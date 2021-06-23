import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'
import config from '@Declarations/config'
import pages from '@Declarations/pages'

const request = new Request({})

export default {
  namespaced: true,
  state: {
    key: 0,
    items: [],
    [config.SUB_NAV]: {}
  },
  mutations: {
    setKey (state) {
      state.key++
    },
    setItems (state, items) {
      state.items = items
    },
    setSubNav (state, subNav) {
      state[config.SUB_NAV] = subNav
    }
  },
  actions: {
    /**
     * Get navmain data
     * @param {object} context
     * @param {string} lang
     * @returns {Promise<T | never>}
     */
    get (context, lang) {
      return request
        .get(endpoints.NAVMAIN.replace('{{lang}}', lang))
        .then((response) => {
          const data = response.data.data.items
          /**
           * Create news objects data
           * @param {object} data
           */
          let subNavItems = {}
          const runRecursive = (data) => {
            for (let i = 0; i < data.length; i++) {
              let current = data[i]
              current.index = i
              // Add key routerName
              switch (current.type) {
                case pages.HOMEPAGE:
                  current.routerName = 'HOMEPAGE'
                  break
                case pages.CONTACT:
                  current.routerName = 'CONTACT'
                  break
                case pages.PAGE:
                  current.routerName = 'PAGE'
                  break
                case pages.NEWS_LIST:
                  current.routerName = 'NEWS_LIST'
                  break
                case pages.GALLERIES:
                  current.routerName = 'GALLERIES'
                  break
                case pages.GALLERY:
                  current.routerName = 'GALLERY'
                  break
                default:
                  current.routerName = 'ERROR_404'
              }
              // Keys for vue-slide-toggle
              if (current.children && current.children.length > 0) {
                subNavItems[`${config.SUB_NAV}${current.id}`] = false
                runRecursive(current.children)
              }
            }
          }
          runRecursive(data)

          // Save keys for vue-slide-toggle
          context.commit('setSubNav', subNavItems)
          // Save data
          context.commit('setItems', data)
        })
    }
  }
}
