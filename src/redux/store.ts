import { configureStore } from '@reduxjs/toolkit'
import staySlice from './staySlice'
import userSlice from './userSlice'
import roomSlice from './roomSlice'
import reviewSlice from './reviewSlice'
import pointSlice from './pointSlice'
import searchSlice from './searchSlice'
import reservationSlice from './reservationSlice'

const reduxStore = configureStore({
  reducer: {
    stay: staySlice,
    user: userSlice,
    room: roomSlice,
    review: reviewSlice,
    point: pointSlice,
    search: searchSlice,
    reservation: reservationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'stay.stays',
          'user.user',
          'room.room',
          'review.review',
          'point.point',
          'search.search',
          'reservation.reservations',
        ],
      },
    }),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore
