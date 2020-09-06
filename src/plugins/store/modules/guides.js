import { GUIDES_LIST } from '../actions/guides'
import { apiCall, ApiRoutes } from '@/plugins/api'

export default {
  state: {
    guides: [],
    inited: false
  },
  getters: {
    getGuides: state => state.guides,
    guidesLoaded: state => state.inited
  },
  actions: {
    [GUIDES_LIST]: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.guides.list,
          method: 'get',
          dispatch: dispatch
        })
          .then(resp => {
            commit(GUIDES_LIST, resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  mutations: {
    [GUIDES_LIST]: (state, resp) => {
      state.guides = resp
      state.inited = true
    }
  }
}
