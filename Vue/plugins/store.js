import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import parameters from './modules/parameters'
import route from './modules/route'
import flashMessage from './modules/flashmessage'
import galleryPage from './modules/galleryPage'
import galleryHomepage from './modules/galleryHomepage'
import gallery from './modules/gallery'
import meta from './modules/meta'
import contactInformation from './modules/contactInformation'
import customization from './modules/customization'
import navmain from './modules/navmain'

Vue.use(Vuex)

const storage = sessionStorage

const vuexPersist = new VuexPersistence({
  key: process.env.NAME_STORAGE,
  strictMode: process.env.NODE_ENV !== 'production',
  storage: storage,
  modules: [
    'parameters',
    'galleryPage'
  ]
})

export default new Vuex.Store({
  modules: {
    parameters,
    route,
    flashMessage,
    galleryPage,
    galleryHomepage,
    gallery,
    meta,
    contactInformation,
    customization,
    navmain
  },
  strict: process.env.NODE_ENV !== 'production',
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    initialiseStore (state) {
      // Check if the ID exist
      if (storage.getItem(process.env.NAME_STORAGE)) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(storage.getItem(process.env.NAME_STORAGE)))
        )
      }
    }
  },
  plugins: [vuexPersist.plugin]
})
