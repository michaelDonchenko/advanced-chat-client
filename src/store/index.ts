import {configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import socketSlice from './reducers/socketSlice'

export const store = configureStore({
  reducer: {auth: authSlice, socket: socketSlice},
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
