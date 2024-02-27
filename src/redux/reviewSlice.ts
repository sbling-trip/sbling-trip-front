import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Review } from '@models/review'

interface ReviewState {
  reviews: Review[]
  totalReviewCount: number
}

const initialState: ReviewState = {
  reviews: [],
  totalReviewCount: 0,
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews: (
      state,
      action: PayloadAction<{ reviews: Review[]; totalReviewCount?: number }>,
    ) => {
      state.reviews = action.payload.reviews
      if (action.payload.totalReviewCount !== undefined) {
        state.totalReviewCount = action.payload.totalReviewCount
      }
    },
  },
})

export const { setReviews } = reviewSlice.actions

export default reviewSlice.reducer
