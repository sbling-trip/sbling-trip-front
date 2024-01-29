import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stay } from '@models/stay'

interface StayState {
  stays: Stay[]
  currentStay: Stay | null
}

const initialState: StayState = {
  stays: [],
  currentStay: null,
}

const staySlice = createSlice({
  name: 'stay',
  initialState,
  reducers: {
    setCurrentStay: (state, action: PayloadAction<Stay | null>) => {
      state.currentStay = action.payload
    },
    setStays: (state, action: PayloadAction<Stay[]>) => {
      state.stays = action.payload
    },
    addStays: (state, action: PayloadAction<Stay[]>) => {
      state.stays = [...state.stays, ...action.payload]
    },
  },
})

export const { setStays, addStays, setCurrentStay } = staySlice.actions
export default staySlice.reducer
