import Vue from 'vue'
import router from '@/router/core'

export default function responseStateHandler (response = {}, callback = function () {}) {
  if (response.status === 401) {
    if (router.app && router.app.$route ? router.app.$route.matched.find(r => r.meta && r.meta.auth) : false) {
      router.push(Vue.auth.options.authRedirect)
    } else {
      callback()
    }
  } else if (response.status === 403) {
    router.push(Vue.auth.options.forbiddenRedirect)
  } else {
    callback()
  }
}
