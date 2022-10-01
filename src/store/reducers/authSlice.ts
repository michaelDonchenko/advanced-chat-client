import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {AuthResponse} from '@/interfaces/auth-interfaces'
import {getLocalStorage} from '@/utils/localStorage'
import {User} from '@/interfaces/user-interfaces'

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
    register: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
      state.jwt = action.payload.jwt
      state.isAuthenticated = true
    },
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user
      state.jwt = action.payload.jwt
      state.isAuthenticated = true
    },
    logout: (state, action: PayloadAction) => {
      state.user = null
      state.jwt = null
      state.isAuthenticated = false
    },
  },
  extraReducers: {},
})

export const {register, login, logout} = authSlice.actions

export default authSlice.reducer
