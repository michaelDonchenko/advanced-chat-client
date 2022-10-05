import axiosInstance from './axios-instance'
import {AxiosResponse} from 'axios'
import {ConversationResponse, CreateContactResponse, GetContactsResponse} from '@/interfaces/user-interfaces'
import {getLocalStorage} from '@/utils/localStorage'

const defaultHeaders = () => {
  return {
    Authorization: `Bearer ${getLocalStorage('jwt')}`,
    'Content-type': 'application/json',
  }
}

export const getContacts = (): Promise<GetContactsResponse> =>
  axiosInstance.get('/contact/get', {headers: defaultHeaders()}).then((response) => response.data)

export const createContact = (username: string): Promise<CreateContactResponse> =>
  axiosInstance.post('/contact/create', {username}, {headers: defaultHeaders()}).then((response) => response.data)

export const getConversation = (id: number | null): Promise<ConversationResponse> =>
  axiosInstance.get(`/conversation/${id}`, {headers: defaultHeaders()}).then((response) => response.data)
