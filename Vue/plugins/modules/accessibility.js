export default {
  namespaced: true,
  state: {
    focusToContent: false,
    focusToNavmain: false
  },
  mutations: {
    setFocusToContent (state, focusToContent) {
      state.focusToContent = focusToContent
    },
    setFocusToNavmain (state, focusToNavmain) {
      state.focusToNavmain = focusToNavmain
    }
  }
}
