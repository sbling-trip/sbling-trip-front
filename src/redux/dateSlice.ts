import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DateState {
  setDate: {
    checkIn?: string | undefined
    checkOut?: string | undefined
    nights: number
  }
}

const initialState: DateState = {
  setDate: {
    checkIn: undefined,
    checkOut: undefined,
    nights: 0,
  },
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<DateState['setDate']>) => {
      state.setDate = action.payload
    },
    resetDate: () => {
      return initialState
    },
  },
})

export const { setDate, resetDate } = dateSlice.actions

export default dateSlice.reducer
