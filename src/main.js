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

componentsRegistrar()

require('vue-snack/dist/vue-snack.min.css')

Vue.use(VueSnackbar, {})
Vue.use(VueHammer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
