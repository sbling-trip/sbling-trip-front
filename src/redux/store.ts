import { configureStore } from '@reduxjs/toolkit'
import staySlice from './staySlice'
import userSlice from './userSlice'
import dateSlice from './dateSlice'
import roomSlice from './roomSlice'

const reduxStore = configureStore({
  reducer: {
    stay: staySlice,
    user: userSlice,
    date: dateSlice,
    room: roomSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['stay.stays', 'user.user', 'date.date', 'room.room'],
      },
    }),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore
