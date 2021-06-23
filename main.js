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
// Filters
import cryptMailto from '@Filters/cryptMailto'
import ConvertString from '@Filters/convertString'
import Truncate from '@Filters/truncate'
// Global mixin
import Global from '@Mixins/global'

// Vue configuration
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
Vue.config.productionTip = !debug // To prevent the production tip on Vue startup
Vue.config.silent = !debug // Suppress all Vue logs and warnings
Vue.config.devtools = debug // Authorizes inspection vue-devtools
Vue.config.performance = debug // Enable component init, compile, render and patch performance

Vue.prototype.$enums = enums
Vue.prototype.$pagesUrl = pagesUrl

Vue.filter('cryptMailto', cryptMailto)
Vue.filter('convertString', new ConvertString())
Vue.filter('truncate', Truncate)

Vue.mixin(Global)

new Vue({
  store,
  i18n,
  router,
  scrollTo,
  validate,
  lazyLoad,
  meta,
  components: {
    App
  },
  beforeCreate () {
    this.$store.commit('setStoreInitialization')
  },
  render: h => h(App)
}).$mount('#app')

/**
 * Button scroll top
 */
appScrollToTop({
  duration: 800
})
