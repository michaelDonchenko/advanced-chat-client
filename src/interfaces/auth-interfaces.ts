export interface User {
  id: number
  username: string
  email: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  email: string
}

export interface LoginResponse {
  user: User
  jwt: string
}

export interface RegisterResponse extends LoginResponse {}

export interface logoutResponse {
  message: string
}
