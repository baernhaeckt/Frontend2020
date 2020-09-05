import Home from '../../views/Home.vue'
import About from '../../views/About.vue'
import Forbidden from '../../views/Forbidden.vue'
import Login from '../../views/Login.vue'
import Register from '../../views/Register.vue'

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
    meta: {
      auth: true,
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
      auth: undefined,
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
      auth: undefined,
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
      auth: undefined,
      hidden: true,
      navi: {
        icon: null
      }
    }
  }
]
