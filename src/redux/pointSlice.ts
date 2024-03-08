import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Point } from '@models/point'

interface PointState {
  points: Point | null
}

const initialState: PointState = {
  points: null,
}

const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<Point | null>) => {
      state.points = action.payload
    },
  },
})

export const { setPoints } = pointSlice.actions

export default pointSlice.reducer
