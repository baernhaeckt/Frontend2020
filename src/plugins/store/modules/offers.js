import { OFFERS_LIST } from '../actions/offers'
import { apiCall, ApiRoutes } from '@/plugins/api'

export default {
  state: {
    offers: [],
    inited: false
  },
  getters: {
    getOffers: state => state.offers
  },
  actions: {
    [OFFERS_LIST]: ({ commit, dispatch }, interests) => {
      return new Promise((resolve, reject) => {
        apiCall({
          url: ApiRoutes.offers.list,
          method: 'get',
          dispatch: dispatch
        })
          .then(resp => {
            console.log(resp)
            commit(OFFERS_LIST, resp.offers)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  mutations: {
    [OFFERS_LIST]: (state, resp) => {
      state.offers = resp
      state.inited = true
    }
  }
}
