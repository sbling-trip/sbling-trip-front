import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  checkInDate: string
  checkOutDate: string
  adultGuestCount: number
  childGuestCount: number
}

const initialState: SearchState = {
  checkInDate: '',
  checkOutDate: '',
  adultGuestCount: 2,
  childGuestCount: 0,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchState>) => {
      return {
        ...state,
        checkIn: action.payload.checkInDate,
        checkOut: action.payload.checkOutDate,
        adultCount: action.payload.adultGuestCount,
        childCount: action.payload.childGuestCount,
      }
    },
    setDates: (
      state,
      action: PayloadAction<{ checkIn: string; checkOut: string }>,
    ) => {
      state.checkInDate = action.payload.checkIn
      state.checkOutDate = action.payload.checkOut
    },
    setGuestCounts: (
      state,
      action: PayloadAction<{ adultCount: number; childCount: number }>,
    ) => {
      state.adultGuestCount = action.payload.adultCount
      state.childGuestCount = action.payload.childCount
    },
    resetDates: (state) => {
      state.checkInDate = initialState.checkInDate
      state.checkOutDate = initialState.checkOutDate
    },
  },
})

export const { setSearch, setDates, setGuestCounts, resetDates } =
  searchSlice.actions

export default searchSlice.reducer
