import { configureStore } from '@reduxjs/toolkit'
import staySlice from './staySlice'
import userSlice from './userSlice'
import dateSlice from './dateSlice'
import roomSlice from './roomSlice'
import reviewSlice from './reviewSlice'
import pointSlice from './pointSlice'

const reduxStore = configureStore({
  reducer: {
    stay: staySlice,
    user: userSlice,
    date: dateSlice,
    room: roomSlice,
    review: reviewSlice,
    point: pointSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'stay.stays',
          'user.user',
          'date.date',
          'room.room',
          'review.review',
          'point.point',
        ],
      },
    }),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore
