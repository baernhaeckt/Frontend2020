import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/plugins/router'
import store from '@/plugins/store'
import componentsRegistrar from '@/componentsRegistrar'

import VueSnackbar from 'vue-snack'
import { VueHammer } from 'vue2-hammer'

import VueToastr from 'vue-toastr'
import websockets from './websockets'

window.websockets = websockets

componentsRegistrar()

require('vue-snack/dist/vue-snack.min.css')

Vue.use(VueSnackbar, {})
Vue.use(VueToastr, {
  defaultPosition: 'toast-top-full-width',
  defaultClassNames: ['mt-5'],
  defaultTimeout: 10000
})
Vue.use(VueHammer)

window.vueInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
