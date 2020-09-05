
export default {
  namespaced: true,
  state: {
    previousRoute: null
  },
  getters: {
    getPreviousRoute: state => state.previousRoute
  },
  mutations: {
    setPreviousRoute (state, route = {}) {
      state.previousRoute = route
    }
  },
  actions: {
  }
}
