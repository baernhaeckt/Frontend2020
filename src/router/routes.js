import Home from '../views/Home.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]
