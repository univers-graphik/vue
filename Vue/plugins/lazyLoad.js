import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  listenEvents: ['scroll', 'resize'],
  silent: process.env.NODE_ENV === 'production'
})

export default VueLazyload
