import { i18n } from '@Plugins/i18n'
import enums from '@Plugins/enums'
import store from '@Plugins/store'

export default {
  namespaced: true,
  state: {
    urlLang: Object.values(enums.lang).includes(i18n.locale) ? i18n.locale.substring(0, 2) : process.env.DEFAULT_LANGUAGE.substring(0, 2),
    headerHeight: 0,
    openNavmain: false,
    browserName: ''
  },
  mutations: {
    setUrlLang (state, urlLang) {
      state.urlLang = urlLang
    },
    setHeaderHeight (state, headerHeight) {
      state.headerHeight = headerHeight
    },
    setOpenNavmain (state, openNavmain) {
      state.openNavmain = openNavmain
      store.commit('accessibility/setFocusToNavmain', openNavmain)
      // Display window scroll
      if (openNavmain) {
        // Close search engine if openning
        if (store.state.search.openSearch) {
          store.commit('search/setOpenSearch', false)
        }
        document.documentElement.style.height = '100%'
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.removeAttribute('style')
      }
    },
    setBrowserName (state, browserName) {
      state.browserName = browserName
    }
  }
}
