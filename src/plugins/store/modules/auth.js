/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_SIGNUP,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import { apiCall, ApiRoutes } from '@/plugins/api'
import router from '@/plugins/router'

export default {
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    accessToken: state => state.token
  },
  actions: {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST)
        apiCall({
          url: ApiRoutes.user.login,
          data: { email: user.email, password: user.password },
          method: 'post',
          dispatch: dispatch
        })
          .then(resp => {
            localStorage.setItem('user-token', resp.token)
            commit(AUTH_SUCCESS, resp)
            dispatch(USER_REQUEST)
            resolve(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('user-token')
            reject(err)
          })
      })
    },
    [AUTH_SIGNUP]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST)
        apiCall({
          url: ApiRoutes.user.register,
          data: user,
          method: 'post',
          dispatch: dispatch
        })
          .then(resp => {
            localStorage.setItem('user-token', resp.token)
            commit(AUTH_SUCCESS, resp)
            dispatch(AUTH_REQUEST)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      return new Promise(resolve => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token')
        if (router.currentRoute.name !== 'login') {
          router.push('/login')
        }
        resolve()
      })
    }
  },
  mutations: {
    [AUTH_REQUEST]: state => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, resp) => {
      state.status = 'success'
      state.token = resp.token
      state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: state => {
      state.status = 'error'
      state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: state => {
      state.token = ''
    }
  }
}
