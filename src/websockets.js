import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import { settings } from '@/settings'

let connection = null

const startConnection = apiToken => {
  connection = new HubConnectionBuilder()
    .withUrl(settings.API_SERVER + 'newsfeed', {
      accessTokenFactory: () => apiToken
    })
    // .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build()

  connection.on('newEvent', event => {
    window.vueInstance.$toastr.Add({
      name: 'WebSocketToast',
      title: event.title,
      msg: event.message,
      type: 'success'
    })
  })

  connection.start()
}

const stopConnection = () => {
  connection.stop()
}

export default {
  startConnection,
  stopConnection
}
