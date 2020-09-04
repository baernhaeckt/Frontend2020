import router from '../core'
import NProgress from 'nprogress'

router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }

  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})
