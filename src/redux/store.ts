import { configureStore } from '@reduxjs/toolkit'
import staySlice from './staySlice'

const reduxStore = configureStore({
  reducer: {
    stay: staySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['stay.stays'],
      },
    }),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore
