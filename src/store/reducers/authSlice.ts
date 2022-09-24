import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {LoginResponse, RegisterResponse, User} from '@/interfaces/auth-interfaces'
import {getLocalStorage} from '@/utils/localStorage'

export interface AuthSlice {
  user: User | null
  isAuthenticated: boolean
  jwt: string | null
}

const initialState: AuthSlice = {
  user: getLocalStorage('user'),
  isAuthenticated: getLocalStorage('isAuthenticated') ?? false,
  jwt: getLocalStorage('jwt') ?? '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    register: (state, action: PayloadAction<RegisterResponse>) => {
      state.user = action.payload.user
      state.jwt = action.payload.jwt
      state.isAuthenticated = true
    },
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user
      state.jwt = action.payload.jwt
      state.isAuthenticated = true
    },
  },
  extraReducers: {},
})

export const {register, login} = authSlice.actions

export default authSlice.reducer
