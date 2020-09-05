import router from '../core'
import store from '@/plugins/store'

router.beforeEach((to, from, next) => {
  next()
  store.commit('ui/setPreviousRoute', to)
})
