import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import parameters from './modules/parameters'
import accessibility from './modules/accessibility'
import route from './modules/route'
import flashMessage from './modules/flashmessage'
import galleryPage from './modules/galleryPage'
import galleryHomepage from './modules/galleryHomepage'
import galleriesExtract from './modules/galleriesExtract'
import configuration from './modules/configuration'
import contactInformation from './modules/contactInformation'
import customization from './modules/customization'
import navmain from './modules/navmain'
import search from './modules/search'
import lastNews from './modules/lastNews'

Vue.use(Vuex)

const storage = sessionStorage

const vuexPersist = new VuexPersistence({
  key: process.env.STORAGE_NAME,
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
    accessibility,
    route,
    flashMessage,
    galleryPage,
    galleryHomepage,
    galleriesExtract,
    configuration,
    contactInformation,
    customization,
    navmain,
    search,
    lastNews
  },
  strict: process.env.NODE_ENV !== 'production',
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    setStoreInitialization (state) {
      // Check if the ID exist
      if (storage.getItem(process.env.STORAGE_NAME)) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(storage.getItem(process.env.STORAGE_NAME)))
        )
      }
    }
  },
  plugins: [vuexPersist.plugin]
})
