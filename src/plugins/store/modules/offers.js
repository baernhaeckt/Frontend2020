import { OFFERS_LIST, OFFERS_ALLOFFERS } from '../actions/offers'
import { apiCall, ApiRoutes } from '@/plugins/api'

export default {
  state: {
    offers: [],
    inited: false
  },
  getters: {
    getOffers: state => state.offers,
    getSingleOffer: state => {
      return offerId => {
        return state.offers.find(offer => offer.id === offerId)
      }
    },
    offersInitialized: state => state.inited
  },
  actions: {
    [OFFERS_LIST]: ({ commit, dispatch }, interests) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.offers.list,
          method: 'post',
          data: interests,
          dispatch: dispatch
        })
          .then(resp => {
            commit(OFFERS_LIST, resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    [OFFERS_ALLOFFERS]: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.offers.all,
          method: 'get',
          dispatch: dispatch
        })
          .then(resp => {
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
