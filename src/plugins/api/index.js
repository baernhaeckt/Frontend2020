import axios from 'axios'
import { settings } from '@/settings'
import { handleError } from './errorhandling'
import { AUTH_LOGOUT } from '../store/actions/auth'

const ApiServer = settings.API_SERVER

export const ApiRoutes = {
  user: {
    login: ApiServer + 'api/users/Login',
    register: ApiServer + 'api/users/Register',
    profile: ApiServer + 'api/profile'
  },
  interests: {
    list: ApiServer + 'api/Interests',
    next: ApiServer + 'api/Interests/next'
  },
  offers: {
    list: ApiServer + 'api/Offers/suggest',
    all: ApiServer + 'api/Offers'
  },
  paidOffers: {
    list: ApiServer + 'api/PaidOffers/suggest'
  },
  guides: {
    list: ApiServer + 'api/Guides'
  },
  vouchers: {
    order: ApiServer + 'api/Vouchers/{offerId}',
    list: ApiServer + 'api/Vouchers',
    single: ApiServer + 'api/Vouchers/{voucherId}',
    redeem: ApiServer + 'api/Vouchers/{voucherId}'
  }
}

const urlReplace = (url, urlData) => {
  for (const prop in urlData) {
    url = url.replace(`{${prop}}`, urlData[prop])
  }
  return url
}

export const apiCall = ({ url, method, urlData, dispatch, ...args }) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem('user-token') || ''

    if (token) { axios.defaults.headers.common.Authorization = 'Bearer ' + token }

    try {
      if (urlData) {
        url = urlReplace(url, urlData)
      }

      axios({
        method: method || 'get',
        url: url,
        ...args
      })
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          const result = handleError(error)
          if (result.unauthorized && dispatch) {
            dispatch(AUTH_LOGOUT)
          }

          reject(result)
        })
    } catch (err) {
      reject(new Error(err))
    }
  })
