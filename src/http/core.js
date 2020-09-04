import Vue from 'vue'
import axios from 'axios'

const VueAxios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || process.env.BASE_URL,
  withCredentials: true
})

Vue.prototype.$http = VueAxios

export default VueAxios
