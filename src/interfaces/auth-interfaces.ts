export interface User {
  id: number
  username: string
}

export interface AuthCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  jwt: string
}

export interface logoutResponse {
  message: string
}
