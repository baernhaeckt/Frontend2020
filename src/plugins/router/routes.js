import Home from '../../views/Home.vue'
import About from '../../views/About.vue'
import Forbidden from '../../views/Forbidden.vue'
import Login from '../../views/Login.vue'
import Register from '../../views/Register.vue'
import Order from '../../views/Order.vue'
import Payment from '../../views/Payment.vue'
import VoucherDetail from '../../views/VoucherDetail.vue'
import store from '../store'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default [
  {
    path: '/',
    name: 'home',
    label: 'Home',
    component: Home,
    meta: {
      hidden: true,
      navi: {
        icon: 'home'
      }
    }
  },
  {
    path: '/order',
    name: 'order',
    label: 'Bestellen',
    component: Order,
    beforeEnter: ifAuthenticated,
    props: true,
    meta: {
      hidden: true,
      navi: {
        icon: null
      }
    }
  },
  {
    path: '/payment',
    name: 'payment',
    label: 'Bezahlen',
    component: Payment,
    beforeEnter: ifAuthenticated,
    props: true,
    meta: {
      hidden: true,
      navi: {
        icon: null
      }
    }
  },
  {
    path: '/voucher/:voucherId',
    name: 'voucherdetail',
    label: 'Voucher Detail',
    component: VoucherDetail,
    beforeEnter: ifAuthenticated,
    props: true,
    meta: {
      hidden: true,
      navi: {
        icon: null
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    label: 'Über uns',
    component: About,
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
