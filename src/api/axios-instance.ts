import {getLocalStorage} from '@/utils/localStorage'
import axios from 'axios'

const token = getLocalStorage('jwt') ?? ''

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 2000,
  headers: {Authorization: `Bearer ${token}`, 'Content-type': 'application/json'},
})

export default axiosInstance
