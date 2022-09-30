import {AxiosResponse} from 'axios'
import {AuthCredentials, AuthResponse, logoutResponse} from '@/interfaces/auth-interfaces'
import axiosInstance from './axios-instance'

export const login = async (credentials: AuthCredentials): Promise<AxiosResponse<AuthResponse>> =>
  await axiosInstance.post('/auth/login', credentials)

export const register = async (credentials: AuthCredentials): Promise<AxiosResponse<AuthResponse>> =>
  await axiosInstance.post('/auth/register', credentials)

export const logout = async (): Promise<AxiosResponse<logoutResponse>> => await axiosInstance.get('/auth/logout')
