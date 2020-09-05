import router from './core'
import './interceptors/progress'
import './extensions/previousRoute'
import NAVIGATION_ROUTES from './helpers/navigationRoutes'

export {
  router as default,
  NAVIGATION_ROUTES
}
