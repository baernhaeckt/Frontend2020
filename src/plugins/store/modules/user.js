import {
  USER_REQUEST,
  USER_UPDATE,
  USER_PASSWORD_CHANGE,
  USER_ERROR,
  USER_SUCCESS
} from '../actions/user'
import { apiCall, ApiRoutes } from '@/plugins/api'
import { AUTH_LOGOUT } from '../actions/auth'

export default {
  state: { status: '', profile: {} },
  getters: {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.email
  },
  actions: {
    [USER_REQUEST]: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        commit(USER_REQUEST)
        apiCall({ url: ApiRoutes.user.profile, dispatch: dispatch })
          .then(resp => {
            commit(USER_SUCCESS, resp)
            resolve()
          })
          .catch(err => {
            commit(USER_ERROR)
            if (err.unauthorized) {
              dispatch(AUTH_LOGOUT)
            }
            reject(err)
          })
      })
    },
    [USER_UPDATE]: ({ commit, dispatch }, profile) => {
      return new Promise((resolve, reject) => {
        apiCall({
          url: ApiRoutes.user.register,
          data: profile,
          method: 'patch',
          dispatch: dispatch
        })
          .then(resp => {
            dispatch(USER_REQUEST).then(() => {
              resolve()
            })
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    [USER_PASSWORD_CHANGE]: ({ commit, dispatch }, passwordChange) => {
      return new Promise((resolve, reject) => {
        apiCall({
          url: ApiRoutes.user.passwordupdate,
          data: { oldPassword: passwordChange.oldPassword, newPassword: passwordChange.newPassword },
          method: 'patch',
          dispatch: dispatch
        })
          .then(resp => {
            resolve()
          })
          .catch(err => {
            commit(USER_ERROR)
            reject(err)
          })
      })
    }
  },
  mutations: {
    [USER_REQUEST]: state => {
      state.status = 'loading'
    },
    [USER_SUCCESS]: (state, resp) => {
      state.status = 'success'
      state.profile = resp
    },
    [USER_ERROR]: state => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: state => {
      state.profile = {}
    }
  }
}
