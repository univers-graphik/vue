export default {
  namespaced: true,
  state: {
    current: null
  },
  mutations: {
    setCurrent (state, current) {
      state.current = current
    }
  }
}
