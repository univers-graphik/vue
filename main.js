'use strict'

import 'sassFolder/main'
import { appScrollToTop } from 'components/scrollTo/scrollTo'

import Vue from 'vue'
import App from './Vue/App'
// Plugins
import store from '@Plugins/store'
import { i18n } from '@Plugins/i18n'
import enums from '@Plugins/enums'
import router from '@Plugins/router'
import pagesUrl from '@Plugins/locales/pagesUrl/pages-url'
import scrollTo from '@Plugins/scrollTo'
import validate from '@Plugins/validate'
import lazyLoad from '@Plugins/lazyLoad'
import meta from '@Plugins/meta'
import socialSharing from '@Plugins/socialSharing'
// Filters
import cryptMailto from '@Filters/cryptMailto'
import ConvertString from '@Filters/convertString'

// Vue configuration
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
Vue.config.productionTip = !debug // Ne plus avoir la notification de production au démarrage de Vue
Vue.config.silent = !debug // Supprime tous les logs et warnings de Vue.js
Vue.config.devtools = debug // Autorise ou non l’inspection des vue-devtools
Vue.config.performance = debug // Activer le suivi des performances pour l’initialisation, la compilation, le rendu et la mise à jour des composants

Vue.prototype.$enums = enums
Vue.prototype.$pagesUrl = pagesUrl

Vue.filter('cryptMailto', cryptMailto)
Vue.filter('convertString', new ConvertString())
Vue.mixin({
  methods: {
    /**
     * Reinit component navmain
     */
    resetNavmain () {
      setTimeout(() => {
        store.commit('navmain/setKey')
      }, 500)
    }
  }
})

new Vue({
  store,
  i18n,
  router,
  scrollTo,
  validate,
  lazyLoad,
  meta,
  socialSharing,
  components: {
    App
  },
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  render: h => h(App)
}).$mount('#app')

// =================================================================================================================
// Button scroll top
// =================================================================================================================
appScrollToTop({
  duration: 800
})