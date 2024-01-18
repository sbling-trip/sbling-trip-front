import { configureStore } from '@reduxjs/toolkit'
import staySlice from './staySlice'
import userSlice from './userSlice'

const reduxStore = configureStore({
  reducer: {
    stay: staySlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['stay.stays', 'user.user'],
      },
    }),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore
