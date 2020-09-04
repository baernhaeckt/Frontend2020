import Vue from 'vue'
import store from '@/store'

export default function autologin (callback = function () {}) {
  Vue.auth[Vue.auth.token() ? 'refresh' : 'login']()
    .finally(() => {
      if (Vue.auth.token()) {
        store.dispatch('user/get').finally(callback)
      } else {
        callback()
      }
    })
}
