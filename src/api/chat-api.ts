import {Chat} from '@/interfaces/chat-interfaces'
import {AxiosResponse} from 'axios'
import axiosInstance from './axios-instance'

export const findAllChats = async (): Promise<AxiosResponse<{chats: Chat[]}>> =>
  await axiosInstance.get('/chat/find-all')
