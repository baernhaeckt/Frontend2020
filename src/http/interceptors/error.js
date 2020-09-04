import http from '../core'
import responseStateHandler from '@/auth/helpers/response-state-handler'
import { toast } from '@/components/Toaster'

http.interceptors.response.use(
  response => response,
  error => {
    let returnResponse = false

    if (error && error.response) {
      responseStateHandler(error.response, () => {
        const errorResponseData = (error.response || {}).data || {}
        const hasErrors = ((errorResponseData.result || {}).errors || []).length > 0
        const hasErrorMessage = errorResponseData.errorMessage

        if (hasErrors || hasErrorMessage) {
          returnResponse = true

          // hasErrors can by handled in the view
          // request.then(response => {
          //   do whatever you want with response.errors
          // })

          if (hasErrorMessage) {
            toast({
              variant: 'danger',
              title: 'API Error',
              message: error.response.data.errorMessage
            })
          }
        }
      })
    }

    if (returnResponse) {
      return error.response
    }

    return Promise.reject(error)
  }
)
