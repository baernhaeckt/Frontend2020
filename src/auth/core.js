import Vue from 'vue'
import './helpers/plugin-provider'
import VueAuth from '@websanova/vue-auth'
import driverAuth from '@websanova/vue-auth/drivers/auth/bearer'
import driverHttp from '@websanova/vue-auth/drivers/http/axios.1.x'
import driverRouter from '@websanova/vue-auth/drivers/router/vue-router.2.x'

Vue.use(VueAuth, {
  auth: driverAuth,
  http: driverHttp,
  router: driverRouter,
  tokenDefaultKey: 'AUTH_TOKEN',
  stores: ['storage', 'cookie'],
  authRedirect: { name: 'Login' },
  forbiddenRedirect: { name: 'Forbidden' },
  loginData: {
    url: 'api/users/Login',
    method: 'post',
    redirect: null,
    fetchUser: false,
    staySignedIn: true
  },
  fetchData: {
    enabled: false
  },
  refreshData: {
    url: 'api/Auth/refreshtoken',
    method: 'post',
    enabled: false,
    interval: 9999
  },
  logoutData: {
    makeRequest: false
  }
})

export default VueAuth
