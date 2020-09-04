
export default {
  namespaced: true,
  state: {
    previousRoute: null
  },
  getters: {
    getPreviousRoute: state => state.previousRoute,
    getLanguage: state => state.language.active,
    getLanguagesAvailable: state => state.language.available
  },
  mutations: {
    setPreviousRoute (state, route = {}) {
      state.previousRoute = route
    }
  },
  actions: {
  }
}
