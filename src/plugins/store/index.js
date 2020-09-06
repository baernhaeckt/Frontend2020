import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import ui from './modules/ui'
import interests from './modules/interests'
import offers from './modules/offers'
import paidOffers from './modules/paidOffers'
import guides from './modules/guides'
import vouchers from './modules/vouchers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    ui,
    interests,
    offers,
    paidOffers,
    guides,
    vouchers
  }
})
