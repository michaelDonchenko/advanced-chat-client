import axiosInstance from './axios-instance'
import {AxiosResponse} from 'axios'

export const findUser = async (id: string): Promise<AxiosResponse<any>> => await axiosInstance.get(`/users/${id}`)
