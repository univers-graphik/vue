import { i18n } from '@Plugins/i18n'
import enums from '@Plugins/enums'

export default {
  namespaced: true,
  state: {
    urlLang: Object.values(enums.lang).indexOf(i18n.locale) !== -1 ? i18n.locale.substring(0, 2) : process.env.DEFAULT_LANGUAGE.substring(0, 2),
    headerHeight: 0,
    openNavmain: false
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
    }
  }
}
