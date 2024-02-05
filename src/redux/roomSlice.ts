import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room } from '@models/room'

interface RoomState {
  room: Room | null
}

const initialState: RoomState = {
  room: null,
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room | null>) => {
      state.room = action.payload
    },
  },
})

export const { setRoom } = roomSlice.actions

export default roomSlice.reducer
