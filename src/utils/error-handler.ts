import axios from 'axios'

const errorHandler = (error: unknown): string => {
  let message = ''

  if (axios.isAxiosError(error) && error.response) {
    const errorMessage = error.response.data.message as string

    return (message = errorMessage ? errorMessage : 'Unknown error from BE')
  }

  if (error instanceof Error) {
    return (message = error.message)
  }

  return (message = 'something went wrong! ' + String(error))
}

export default errorHandler
