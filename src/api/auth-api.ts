import {AxiosResponse} from 'axios'
import {
  LoginCredentials,
  LoginResponse,
  logoutResponse,
  RegisterCredentials,
  RegisterResponse,
} from '@/interfaces/auth-interfaces'
import axiosInstance from './axios-instance'

export const login = async (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> =>
  await axiosInstance.post('/auth/login', credentials)

export const register = async (credentials: RegisterCredentials): Promise<AxiosResponse<RegisterResponse>> =>
  await axiosInstance.post('/auth/register', credentials)

export const logout = async (): Promise<AxiosResponse<logoutResponse>> => await axiosInstance.get('/auth/logout')
