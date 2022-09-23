import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {User} from '@/interfaces/auth-interfaces'
import {getLocalStorage} from '@/utils/localStorage'

export interface AuthSlice {
  user: User | null
  isAuthenticated: boolean
}

const initialState: AuthSlice = {
  user: getLocalStorage('user'),
  isAuthenticated: getLocalStorage('isAuthenticated') ?? false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: {},
})

export const {} = authSlice.actions

export default authSlice.reducer
