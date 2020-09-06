import { VOUCHERS_ORDER, VOUCHERS_LIST, VOUCHERS_SINGLE } from '../actions/vouchers'
import { apiCall, ApiRoutes } from '@/plugins/api'

export default {
  state: {
    vouchers: [],
    inited: false
  },
  getters: {
    getVouchers: state => state.vouchers
  },
  actions: {
    [VOUCHERS_ORDER]: ({ commit, dispatch }, offerId) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.vouchers.order.replace('{offerId}', offerId),
          method: 'post',
          dispatch: dispatch
        })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    [VOUCHERS_LIST]: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.vouchers.list,
          method: 'get',
          dispatch: dispatch
        })
          .then(resp => {
            dispatch(VOUCHERS_LIST, resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    [VOUCHERS_SINGLE]: ({ commit, dispatch }, voucherId) => {
      return new Promise((resolve, reject) => {
        return apiCall({
          url: ApiRoutes.vouchers.single.replace('{voucherId}', voucherId),
          method: 'get',
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
    [VOUCHERS_LIST]: (state, resp) => {
      state.vouchers = resp
      state.inited = true
    }
  }
}
