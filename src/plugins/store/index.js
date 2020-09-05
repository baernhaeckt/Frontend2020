import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import ui from './modules/ui'
import interests from './modules/interests'
import offers from './modules/offers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    ui,
    interests,
    offers
  }
})
