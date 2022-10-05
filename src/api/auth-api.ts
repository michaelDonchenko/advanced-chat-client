import {AuthCredentials, AuthResponse, logoutResponse} from '@/interfaces/auth-interfaces'
import axiosInstance from './axios-instance'

export const login = (credentials: AuthCredentials): Promise<AuthResponse> =>
  axiosInstance.post('/auth/login', credentials).then((response) => response.data)

export const register = (credentials: AuthCredentials): Promise<AuthResponse> =>
  axiosInstance.post('/auth/register', credentials).then((response) => response.data)

export const logout = (): Promise<logoutResponse> => axiosInstance.get('/auth/logout').then((response) => response.data)
