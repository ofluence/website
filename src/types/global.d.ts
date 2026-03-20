interface ErrorResponse {
  success: boolean
  message: string
  code: string
  statusCode: number
  errors?: {
    _errors: string[]
    body?: {
      _errors: string[]
      [key: string]: {
        _errors: string[]
      }
    }
    query?: {
      _errors: string[]
      [key: string]: {
        _errors: string[]
      }
    }
    params?: {
      _errors: string[]
      [key: string]: {
        _errors: string[]
      }
    }
    cookies?: {
      _errors: string[]
      [key: string]: {
        _errors: string[]
      }
    }
    [key: string]: {
      _errors: string[]
    }
  }
  meta: {
    timestamp?: string
    location?: string
  }
}
