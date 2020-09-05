import Home from '../views/Home.vue'
import About from '../views/About.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false,
      navi: {
        icon: 'home'
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      auth: true,
      navi: {
        icon: null
      }
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      auth: false,
      hidden: true,
      navi: {
        icon: null
      }
    }
  }
]
