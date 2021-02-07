export default {
  namespaced: true,
  state: {
    delay: 4000,
    warning: [],
    error: [],
    success: [],
    info: [],
    reloadButton: false
  },
  mutations: {
    addWarning (state, message) {
      state.warning.push(message)
    },
    addError (state, message) {
      state.error.push(message)
    },
    addSuccess (state, message) {
      state.success.push(message)
    },
    addInfo (state, message) {
      state.info.push(message)
    },
    removeWarning (state, index = 0) {
      state.warning.splice(index, 1)
    },
    removeError (state, index = 0) {
      state.error.splice(index, 1)
    },
    removeSuccess (state, index = 0) {
      state.success.splice(index, 1)
    },
    removeInfo (state, index = 0) {
      state.info.splice(index, 1)
    },
    setReloadButton (state, reloadButton) {
      state.reloadButton = reloadButton
    },
    removeReloadButton (state) {
      state.reloadButton = false
    }
  },
  actions: {
    warning ({ commit, state }, data) {
      if (!state.warning.length || state.warning[state.warning.length - 1] !== data.msg) {
        commit('addWarning', data)
        setTimeout(() => {
          commit('removeWarning')
        }, state.delay)
      }
    },
    error ({ commit, state }, data) {
      if (!state.error.length || state.error[state.error.length - 1] !== data.msg) {
        commit('addError', data)
        if (!data.reloadButton) {
          setTimeout(() => {
            commit('removeError')
          }, state.delay)
        }

        if (data.reloadButton) commit('setReloadButton', data.reloadButton)
      }
    },
    success ({ commit, state }, data) {
      if (!state.success.length || state.success[state.success.length - 1] !== data.msg) {
        commit('addSuccess', data)
        setTimeout(() => {
          commit('removeSuccess')
        }, state.delay)
      }
    },
    info ({ commit, state }, data) {
      if (!state.info.length || state.info[state.info.length - 1] !== data.msg) {
        commit('addInfo', data)
        setTimeout(() => {
          commit('removeInfo')
        }, state.delay)
      }
    }
  }
}
