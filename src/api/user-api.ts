import axiosInstance from './axios-instance'
import {AxiosResponse} from 'axios'
import {CreateContactResponse, GetContactsResponse} from '@/interfaces/user-interfaces'
import {getLocalStorage} from '@/utils/localStorage'

const defaultHeaders = () => {
  return {
    Authorization: `Bearer ${getLocalStorage('jwt')}`,
    'Content-type': 'application/json',
  }
}

export const getContacts = async (): Promise<AxiosResponse<GetContactsResponse>> =>
  await axiosInstance.get('/contact/get', {headers: defaultHeaders()})

export const createContact = async (username: string): Promise<AxiosResponse<CreateContactResponse>> =>
  await axiosInstance.post('/contact/create', {username}, {headers: defaultHeaders()})
