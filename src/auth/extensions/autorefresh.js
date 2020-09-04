import Vue from 'vue'
import responseStateHandler from '../helpers/response-state-handler'

const options = {
  timeout: null,
  interval: Vue.auth.options.refreshData.interval * 60 * 1000
}

// handle if user leaves or returns to the current browser window
if (document.hidden !== undefined) {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh()
  }, false)
}

autoRefresh()

// execute a authentication token refresh
function refresh () {
  Vue.auth.refresh()
    .then(response => {
      responseStateHandler(response, autoRefresh)
    })
    .catch(error => {
      responseStateHandler(error)
    })
}

// start authrefreshing authentication token
function autoRefresh () {
  clearRefresh()
  options.timeout = setTimeout(refresh, options.interval)
}

// clear refresh timeout
function clearRefresh () {
  if (options.timeout) clearTimeout(options.timeout)
}
