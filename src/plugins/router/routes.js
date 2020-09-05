import Home from '../../views/Home.vue'
import About from '../../views/About.vue'
import Forbidden from '../../views/Forbidden.vue'
import Login from '../../views/Login.vue'
import Register from '../../views/Register.vue'
// import store from '../store'

/*
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}
*/

export default [
  {
    path: '/',
    name: 'home',
    label: 'Home',
    component: Home,
    meta: {
      auth: undefined,
      hidden: true,
      navi: {
        icon: 'home'
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    label: 'Über uns',
    component: About,
    // beforeEnter: ifAuthenticated,
    meta: {
      navi: {
        icon: null
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    label: 'Einloggen',
    component: Login,
    meta: {
      hidden: true,
      navi: {
        icon: null
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    label: 'Registrieren',
    component: Register,
    meta: {
      hidden: true,
      navi: {
        icon: null
      }
    }
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    label: 'Kein Zugriff',
    component: Forbidden,
    meta: {
      hidden: true,
      navi: {
        icon: null
      }
    }
  }
]
