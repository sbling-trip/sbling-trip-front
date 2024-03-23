import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Reservation } from '@models/reservation'

interface ReservationState {
  reservations: Reservation[]
}

const initialState: ReservationState = {
  reservations: [],
}

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservations(state, action: PayloadAction<Reservation[]>) {
      state.reservations = action.payload
    },
    addReservation(state, action: PayloadAction<Reservation>) {
      state.reservations.push(action.payload)
    },
  },
})

export const { setReservations, addReservation } = reservationSlice.actions
export default reservationSlice.reducer
