import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stay } from '@models/stay'

interface StayState {
  stays: Stay[]
  currentStay: Stay | null
  searchResultStays: Stay[]
}

const initialState: StayState = {
  stays: [],
  currentStay: null,
  searchResultStays: [],
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
    setSearchResultStays: (state, action: PayloadAction<Stay[]>) => {
      state.searchResultStays = action.payload
    },
  },
})

export const { setStays, addStays, setCurrentStay, setSearchResultStays } =
  staySlice.actions
export default staySlice.reducer
