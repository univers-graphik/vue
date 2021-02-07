import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import store from '@Plugins/store'

Vue.use(VueScrollTo, {
  offset: -(store.state.parameters.headerHeight + 10) // Header height
})

export default VueScrollTo
