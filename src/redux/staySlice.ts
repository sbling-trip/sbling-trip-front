import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stay } from '@models/stay'

interface StayState {
  stays: Stay[]
}

const initialState: StayState = {
  stays: [],
}

const staySlice = createSlice({
  name: 'stay',
  initialState,
  reducers: {
    setStays: (state, action: PayloadAction<Stay[]>) => {
      state.stays = action.payload
    },
    addStays: (state, action: PayloadAction<Stay[]>) => {
      state.stays = [...state.stays, ...action.payload]
    },
  },
})

export const { setStays, addStays } = staySlice.actions
export default staySlice.reducer
