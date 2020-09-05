import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import store from '@/store'
import http from '@/http'
import auth from '@/auth'

import * as mdbvue from 'mdbvue'

Vue.config.productionTip = false
for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}

new Vue({
  router,
  store,
  http,
  auth,
  render: h => h(App)
}).$mount('#app')
