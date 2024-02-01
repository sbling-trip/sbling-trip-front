import { configureStore } from '@reduxjs/toolkit'
import staySlice from './staySlice'
import userSlice from './userSlice'
import dateSlice from './dateSlice'

const reduxStore = configureStore({
  reducer: {
    stay: staySlice,
    user: userSlice,
    date: dateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['stay.stays', 'user.user', 'date.date'],
      },
    }),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore
