import { PAIDOFFERS_LIST } from '../actions/paidOffers'
import { apiCall, ApiRoutes } from '@/plugins/api'

export default {
  state: {
  },
  getters: {
  },
  actions: {
    [PAIDOFFERS_LIST]: ({ commit, dispatch }, offerId) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.paidOffers.list,
          method: 'post',
          data: { offerId: offerId },
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
  }
}
