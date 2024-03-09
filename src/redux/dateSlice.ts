import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DateState {
  date: {
    checkIn?: string | undefined
    checkOut?: string | undefined
    nights: number
  }
}

const initialState: DateState = {
  date: {
    checkIn: undefined,
    checkOut: undefined,
    nights: 0,
  },
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<DateState['date']>) => {
      state.date = action.payload
    },
    resetDate: () => {
      return initialState
    },
  },
})

export const { setDate, resetDate } = dateSlice.actions

export default dateSlice.reducer
