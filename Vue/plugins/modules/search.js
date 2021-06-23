export default {
  namespaced: true,
  state: {
    openSearch: false
  },
  mutations: {
    setOpenSearch (state, openSearch) {
      state.openSearch = openSearch
      // Display search engine
      if (openSearch) {
        document.documentElement.style.height = '100%'
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.removeAttribute('style')
      }
    }
  }
}
