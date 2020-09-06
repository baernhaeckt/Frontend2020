import { INTERESTS_LIST, INTERESTS_NEXT } from '../actions/interests'
import { apiCall, ApiRoutes } from '@/plugins/api'

export default {
  state: {
    interests: [],
    inited: false
  },
  getters: {
    getInterests: state => state.interests
  },
  actions: {
    [INTERESTS_LIST]: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.interests.list,
          method: 'get',
          dispatch: dispatch
        })
          .then(resp => {
            commit(INTERESTS_LIST, resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    [INTERESTS_NEXT]: ({ commit, dispatch }, data) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.interests.next,
          method: 'post',
          data: data,
          dispatch: dispatch
        })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  mutations: {
    [INTERESTS_LIST]: (state, resp) => {
      state.interests = resp
      state.inited = true
    }
  }
}
